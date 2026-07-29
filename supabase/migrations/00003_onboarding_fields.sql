-- Onboarding fields on profiles
-- Apply after 00001_initial_schema.sql (and optionally 00002)

create type public.workout_experience as enum (
  'beginner',
  'some_experience',
  'experienced'
);

alter table public.profiles
  add column if not exists workout_experience public.workout_experience,
  add column if not exists onboarding_completed_at timestamptz;

comment on column public.profiles.workout_experience is
  'Self-reported workout experience collected during onboarding. Not a medical field.';

comment on column public.profiles.onboarding_completed_at is
  'Set when the member finishes guided onboarding.';
