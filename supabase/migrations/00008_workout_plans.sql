-- Workout plans: media columns, exercise list, admin policies, seed templates
-- Apply after 00001–00007

alter table public.workouts
  add column if not exists slug text,
  add column if not exists image_url text,
  add column if not exists video_url text,
  add column if not exists equipment text[] not null default '{}',
  add column if not exists exercise_slugs text[] not null default '{}';

create unique index if not exists workouts_slug_key on public.workouts (slug);

create index if not exists workouts_exercise_slugs_gin_idx
  on public.workouts using gin (exercise_slugs);

comment on column public.workouts.slug is
  'Stable key for deep links and media filenames (e.g. seated-upper-starter).';

comment on column public.workouts.image_url is
  'Optional plan photo URL. Null until an admin uploads or pastes a URL.';

comment on column public.workouts.video_url is
  'Optional plan overview video URL. Null until an admin uploads or pastes a URL.';

comment on column public.workouts.exercise_slugs is
  'Ordered list of exercise catalog slugs included in this plan.';

-- Admins manage template workouts
create policy "Admins can insert workout templates"
  on public.workouts for insert
  to authenticated
  with check (
    exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.role = 'admin'
    )
  );

create policy "Admins can update any workout"
  on public.workouts for update
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

create policy "Admins can delete workouts"
  on public.workouts for delete
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.role = 'admin'
    )
  );

-- Seed templates (media left null). Idempotent on slug.
insert into public.workouts as w (
  slug, title, description, goal_type, difficulty, estimated_duration_minutes,
  mobility_level, equipment, exercise_slugs, is_template, image_url, video_url, created_by
)
values
  ('seated-upper-starter', 'Seated Upper-Body Starter',
   'A gentle seated session for building shoulder and back strength with bands or light weights.',
   'strength', 'beginner', 25, 'seated',
   array['resistance_bands','wheelchair_accessible'],
   array['seated-row-band','seated-chest-press-band','seated-shoulder-press','seated-bicep-curl'],
   true, null, null, null),
  ('seated-core-mobility', 'Seated Core & Mobility',
   'Core control and torso mobility from a chair or wheelchair—no floor work required.',
   'mobility', 'beginner', 20, 'seated',
   array['none','wheelchair_accessible'],
   array['seated-torso-rotation','seated-dead-bug','scapular-retraction'],
   true, null, null, null),
  ('seated-cardio-boost', 'Seated Cardio Boost',
   'Low-impact cardio using marching and shadow boxing from a seated base.',
   'endurance', 'beginner', 15, 'seated',
   array['none','wheelchair_accessible'],
   array['seated-march','seated-shadow-boxing'],
   true, null, null, null),
  ('limited-lower-foundations', 'Limited Lower-Body Foundations',
   'Supported sit-to-stand and hip work for members with limited lower-body mobility.',
   'strength', 'beginner', 25, 'limited_lower',
   array['none'],
   array['chair-supported-sit-to-stand','supported-calf-raise','standing-hip-abduction-support'],
   true, null, null, null),
  ('limited-upper-push-pull', 'Limited Upper Push & Pull',
   'Wall push-ups and posture drills when overhead or floor pressing is limited.',
   'strength', 'beginner', 20, 'limited_upper',
   array['none','resistance_bands'],
   array['wall-push-up','scapular-retraction','band-pull-apart'],
   true, null, null, null),
  ('assisted-daily-strength', 'Assisted Daily Strength',
   'Partner- or rail-assisted fundamentals for safe practice with support.',
   'mobility', 'beginner', 20, 'assisted',
   array['none'],
   array['assisted-sit-to-stand-partner','assisted-arm-raise'],
   true, null, null, null),
  ('full-body-foundations', 'Full-Body Foundations',
   'Squat, hinge, and core basics for members with full mobility.',
   'strength', 'beginner', 30, 'full',
   array['none'],
   array['bodyweight-squat','glute-bridge','bird-dog'],
   true, null, null, null),
  ('strength-bands-dumbbells', 'Bands & Dumbbells Strength',
   'Loaded strength with goblet squats, RDLs, and upper-back work.',
   'strength', 'intermediate', 35, 'full',
   array['dumbbells','resistance_bands'],
   array['dumbbell-goblet-squat','dumbbell-romanian-deadlift','band-pull-apart','cable-face-pull-adaptive'],
   true, null, null, null),
  ('seated-strength-progress', 'Seated Strength Progression',
   'Intermediate seated pressing and pulling for members ready for more volume.',
   'strength', 'intermediate', 30, 'seated',
   array['dumbbells','resistance_bands','wheelchair_accessible'],
   array['seated-shoulder-press','seated-lat-pulldown-band','seated-overhead-tricep-extension','seated-row-band'],
   true, null, null, null),
  ('weight-management-move', 'Move for Weight Management',
   'Mix of seated cardio and full-mobility basics to support consistent activity.',
   'weight_management', 'beginner', 25, 'full',
   array['none'],
   array['seated-march','bodyweight-squat','glute-bridge','seated-shadow-boxing'],
   true, null, null, null)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  goal_type = excluded.goal_type,
  difficulty = excluded.difficulty,
  estimated_duration_minutes = excluded.estimated_duration_minutes,
  mobility_level = excluded.mobility_level,
  equipment = excluded.equipment,
  exercise_slugs = excluded.exercise_slugs,
  is_template = true,
  updated_at = now();
