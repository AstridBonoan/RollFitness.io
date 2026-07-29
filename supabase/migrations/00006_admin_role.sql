-- Admin role: assignable only via Supabase SQL / dashboard (not signup or app)
-- Apply after 00001–00005

create type public.app_role as enum ('member', 'admin');

alter table public.profiles
  add column if not exists role public.app_role not null default 'member';

create index if not exists profiles_role_idx on public.profiles (role);

comment on column public.profiles.role is
  'App role. Defaults to member on signup. Promote to admin only with Supabase SQL (never via the client app).';

-- Force member on every insert; block role changes when an authenticated user session is present.
create or replace function public.enforce_profile_role_immutability()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    new.role := 'member';
    return new;
  end if;

  if new.role is distinct from old.role and auth.uid() is not null then
    raise exception
      'Forbidden: profile role can only be changed in the Supabase SQL editor, not from the app.';
  end if;

  return new;
end;
$$;

drop trigger if exists profiles_enforce_role on public.profiles;

create trigger profiles_enforce_role
  before insert or update on public.profiles
  for each row
  execute function public.enforce_profile_role_immutability();

-- Column-level grants: clients cannot update `role` even if they craft a request.
revoke update on table public.profiles from authenticated, anon;

grant update (
  display_name,
  bio,
  avatar_url,
  fitness_interests,
  equipment_preferences,
  mobility_level,
  workout_experience,
  onboarding_completed_at,
  privacy_settings,
  accessibility_settings
) on table public.profiles to authenticated;

-- Tighten insert so clients cannot self-insert as admin.
drop policy if exists "Users can insert own profile" on public.profiles;

create policy "Users can insert own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = user_id and role = 'member');

-- Admins can manage the exercise catalog (members remain read-only).
create policy "Admins can insert exercises"
  on public.exercises for insert
  to authenticated
  with check (
    exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.role = 'admin'
    )
  );

create policy "Admins can update exercises"
  on public.exercises for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.role = 'admin'
    )
  );

create policy "Admins can delete exercises"
  on public.exercises for delete
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.role = 'admin'
    )
  );

-- How to promote yourself (run in Supabase SQL editor only):
-- update public.profiles
-- set role = 'admin'
-- where user_id = (select id from auth.users where email = 'your@email.com');
