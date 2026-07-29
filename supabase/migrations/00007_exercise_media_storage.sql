-- Exercise media storage for admin photo/video uploads
-- Apply after 00006_admin_role.sql

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'exercise-media',
  'exercise-media',
  true,
  52428800, -- 50 MB (videos); images should stay much smaller in the app
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Exercise media is publicly readable"
  on storage.objects for select
  to public
  using (bucket_id = 'exercise-media');

create policy "Admins can upload exercise media"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'exercise-media'
    and exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.role = 'admin'
    )
  );

create policy "Admins can update exercise media"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'exercise-media'
    and exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    bucket_id = 'exercise-media'
    and exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.role = 'admin'
    )
  );

create policy "Admins can delete exercise media"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'exercise-media'
    and exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.role = 'admin'
    )
  );
