-- Accessibility preferences on profiles
-- Apply after 00001–00003

alter table public.profiles
  add column if not exists accessibility_settings jsonb not null
  default '{"theme":"system","high_contrast":false,"font_scale":"default","reduce_motion":false}'::jsonb;

comment on column public.profiles.accessibility_settings is
  'User accessibility preferences: theme, high contrast, font scale, reduce motion.';
