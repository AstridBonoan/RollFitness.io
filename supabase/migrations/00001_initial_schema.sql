-- RollnFitness initial schema
-- Production-oriented PostgreSQL schema with RLS for Supabase Auth.

-- Extensions
create extension if not exists "pgcrypto";

-- Enums
create type public.fitness_goal as enum (
  'strength',
  'weight_management',
  'mobility',
  'endurance'
);

create type public.mobility_level as enum (
  'full',
  'limited_lower',
  'limited_upper',
  'seated',
  'assisted'
);

create type public.difficulty as enum (
  'beginner',
  'intermediate',
  'advanced'
);

create type public.friendship_status as enum (
  'pending',
  'accepted',
  'declined',
  'blocked'
);

create type public.partner_status as enum (
  'pending',
  'active',
  'paused',
  'ended'
);

-- Profiles (1:1 with auth.users)
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  display_name text,
  bio text,
  avatar_url text,
  fitness_interests text[] default '{}',
  equipment_preferences text[] default '{}',
  mobility_level public.mobility_level,
  privacy_settings jsonb not null default '{"profile_visibility":"friends","activity_visibility":"friends"}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_user_id_idx on public.profiles (user_id);
create index profiles_mobility_level_idx on public.profiles (mobility_level);

-- Goals
create table public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  goal_type public.fitness_goal not null,
  target_description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index goals_user_id_idx on public.goals (user_id);
create index goals_user_active_idx on public.goals (user_id, is_active);

-- Exercises (adaptive workout library)
create table public.exercises (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  instructions text not null,
  video_url text,
  difficulty public.difficulty not null,
  equipment text[] not null default '{}',
  target_muscles text[] not null default '{}',
  mobility_category public.mobility_level not null,
  safety_notes text,
  variations jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index exercises_difficulty_idx on public.exercises (difficulty);
create index exercises_mobility_category_idx on public.exercises (mobility_category);
create index exercises_equipment_gin_idx on public.exercises using gin (equipment);
create index exercises_target_muscles_gin_idx on public.exercises using gin (target_muscles);

-- Workouts / plans
create table public.workouts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  goal_type public.fitness_goal,
  difficulty public.difficulty not null,
  estimated_duration_minutes integer check (estimated_duration_minutes is null or estimated_duration_minutes > 0),
  mobility_level public.mobility_level,
  created_by uuid references auth.users (id) on delete set null,
  is_template boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index workouts_goal_type_idx on public.workouts (goal_type);
create index workouts_difficulty_idx on public.workouts (difficulty);
create index workouts_mobility_level_idx on public.workouts (mobility_level);
create index workouts_created_by_idx on public.workouts (created_by);

-- Workout history / tracking
create table public.workout_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  workout_id uuid references public.workouts (id) on delete set null,
  started_at timestamptz not null,
  completed_at timestamptz,
  duration_seconds integer check (duration_seconds is null or duration_seconds >= 0),
  notes text,
  created_at timestamptz not null default now(),
  constraint workout_history_completed_after_start check (
    completed_at is null or completed_at >= started_at
  )
);

create index workout_history_user_id_idx on public.workout_history (user_id);
create index workout_history_user_completed_idx on public.workout_history (user_id, completed_at desc);
create index workout_history_workout_id_idx on public.workout_history (workout_id);

-- Meals / nutrition library
create table public.meals (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  calories integer not null check (calories >= 0),
  protein_g numeric(8, 2) not null check (protein_g >= 0),
  carbs_g numeric(8, 2) not null check (carbs_g >= 0),
  fat_g numeric(8, 2) not null check (fat_g >= 0),
  ingredients text[] not null default '{}',
  preparation_time_minutes integer check (preparation_time_minutes is null or preparation_time_minutes >= 0),
  category text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index meals_category_idx on public.meals (category);
create index meals_calories_idx on public.meals (calories);

-- Nutrition preferences
create table public.nutrition_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  dietary_restrictions text[] not null default '{}',
  calorie_target integer check (calorie_target is null or calorie_target > 0),
  protein_target_g integer check (protein_target_g is null or protein_target_g >= 0),
  preferred_categories text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index nutrition_preferences_user_id_idx on public.nutrition_preferences (user_id);

-- Communities
create table public.communities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  goal_type public.fitness_goal,
  interest_tag text,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index communities_goal_type_idx on public.communities (goal_type);
create index communities_interest_tag_idx on public.communities (interest_tag);

-- Community posts
create table public.community_posts (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references public.communities (id) on delete cascade,
  author_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index community_posts_community_id_idx on public.community_posts (community_id);
create index community_posts_author_id_idx on public.community_posts (author_id);
create index community_posts_created_at_idx on public.community_posts (created_at desc);

-- Comments
create table public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts (id) on delete cascade,
  author_id uuid not null references auth.users (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index comments_post_id_idx on public.comments (post_id);
create index comments_author_id_idx on public.comments (author_id);

-- Friends
create table public.friends (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references auth.users (id) on delete cascade,
  addressee_id uuid not null references auth.users (id) on delete cascade,
  status public.friendship_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint friends_no_self check (requester_id <> addressee_id),
  constraint friends_unique_pair unique (requester_id, addressee_id)
);

create index friends_requester_id_idx on public.friends (requester_id);
create index friends_addressee_id_idx on public.friends (addressee_id);
create index friends_status_idx on public.friends (status);

-- Accountability partners
create table public.accountability_partners (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  partner_id uuid not null references auth.users (id) on delete cascade,
  status public.partner_status not null default 'pending',
  shared_goal text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint accountability_no_self check (user_id <> partner_id),
  constraint accountability_unique_pair unique (user_id, partner_id)
);

create index accountability_partners_user_id_idx on public.accountability_partners (user_id);
create index accountability_partners_partner_id_idx on public.accountability_partners (partner_id);
create index accountability_partners_status_idx on public.accountability_partners (status);

-- Messages
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references auth.users (id) on delete cascade,
  recipient_id uuid not null references auth.users (id) on delete cascade,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  constraint messages_no_self check (sender_id <> recipient_id)
);

create index messages_sender_id_idx on public.messages (sender_id);
create index messages_recipient_id_idx on public.messages (recipient_id);
create index messages_recipient_unread_idx on public.messages (recipient_id, read_at)
  where read_at is null;

-- Badges / achievements
create table public.badges (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text not null,
  criteria jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  badge_id uuid not null references public.badges (id) on delete cascade,
  earned_at timestamptz not null default now(),
  constraint user_badges_unique unique (user_id, badge_id)
);

create index user_badges_user_id_idx on public.user_badges (user_id);
create index user_badges_badge_id_idx on public.user_badges (badge_id);

-- Notifications
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  metadata jsonb not null default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index notifications_user_id_idx on public.notifications (user_id);
create index notifications_user_unread_idx on public.notifications (user_id, read_at)
  where read_at is null;
create index notifications_created_at_idx on public.notifications (created_at desc);

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger goals_set_updated_at
  before update on public.goals
  for each row execute function public.set_updated_at();

create trigger exercises_set_updated_at
  before update on public.exercises
  for each row execute function public.set_updated_at();

create trigger workouts_set_updated_at
  before update on public.workouts
  for each row execute function public.set_updated_at();

create trigger meals_set_updated_at
  before update on public.meals
  for each row execute function public.set_updated_at();

create trigger nutrition_preferences_set_updated_at
  before update on public.nutrition_preferences
  for each row execute function public.set_updated_at();

create trigger communities_set_updated_at
  before update on public.communities
  for each row execute function public.set_updated_at();

create trigger community_posts_set_updated_at
  before update on public.community_posts
  for each row execute function public.set_updated_at();

create trigger comments_set_updated_at
  before update on public.comments
  for each row execute function public.set_updated_at();

create trigger friends_set_updated_at
  before update on public.friends
  for each row execute function public.set_updated_at();

create trigger accountability_partners_set_updated_at
  before update on public.accountability_partners
  for each row execute function public.set_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.goals enable row level security;
alter table public.exercises enable row level security;
alter table public.workouts enable row level security;
alter table public.workout_history enable row level security;
alter table public.meals enable row level security;
alter table public.nutrition_preferences enable row level security;
alter table public.communities enable row level security;
alter table public.community_posts enable row level security;
alter table public.comments enable row level security;
alter table public.friends enable row level security;
alter table public.accountability_partners enable row level security;
alter table public.messages enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;
alter table public.notifications enable row level security;

-- Profiles policies
create policy "Profiles are viewable by authenticated users"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can insert own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Goals policies
create policy "Users can manage own goals"
  on public.goals for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Catalog tables: readable by authenticated users
create policy "Exercises are readable by authenticated users"
  on public.exercises for select
  to authenticated
  using (true);

create policy "Workouts are readable by authenticated users"
  on public.workouts for select
  to authenticated
  using (true);

create policy "Users can create personal workouts"
  on public.workouts for insert
  to authenticated
  with check (auth.uid() = created_by);

create policy "Users can update own workouts"
  on public.workouts for update
  to authenticated
  using (auth.uid() = created_by)
  with check (auth.uid() = created_by);

create policy "Meals are readable by authenticated users"
  on public.meals for select
  to authenticated
  using (true);

create policy "Badges are readable by authenticated users"
  on public.badges for select
  to authenticated
  using (true);

-- Workout history
create policy "Users can manage own workout history"
  on public.workout_history for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Nutrition preferences
create policy "Users can manage own nutrition preferences"
  on public.nutrition_preferences for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Communities & social
create policy "Communities are readable by authenticated users"
  on public.communities for select
  to authenticated
  using (true);

create policy "Authenticated users can create communities"
  on public.communities for insert
  to authenticated
  with check (auth.uid() = created_by);

create policy "Community posts are readable by authenticated users"
  on public.community_posts for select
  to authenticated
  using (true);

create policy "Users can create community posts"
  on public.community_posts for insert
  to authenticated
  with check (auth.uid() = author_id);

create policy "Users can update own community posts"
  on public.community_posts for update
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

create policy "Users can delete own community posts"
  on public.community_posts for delete
  to authenticated
  using (auth.uid() = author_id);

create policy "Comments are readable by authenticated users"
  on public.comments for select
  to authenticated
  using (true);

create policy "Users can create comments"
  on public.comments for insert
  to authenticated
  with check (auth.uid() = author_id);

create policy "Users can update own comments"
  on public.comments for update
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

create policy "Users can delete own comments"
  on public.comments for delete
  to authenticated
  using (auth.uid() = author_id);

-- Friends
create policy "Users can view friendships they belong to"
  on public.friends for select
  to authenticated
  using (auth.uid() = requester_id or auth.uid() = addressee_id);

create policy "Users can create friend requests"
  on public.friends for insert
  to authenticated
  with check (auth.uid() = requester_id);

create policy "Participants can update friendships"
  on public.friends for update
  to authenticated
  using (auth.uid() = requester_id or auth.uid() = addressee_id)
  with check (auth.uid() = requester_id or auth.uid() = addressee_id);

create policy "Participants can delete friendships"
  on public.friends for delete
  to authenticated
  using (auth.uid() = requester_id or auth.uid() = addressee_id);

-- Accountability partners
create policy "Users can view own partner connections"
  on public.accountability_partners for select
  to authenticated
  using (auth.uid() = user_id or auth.uid() = partner_id);

create policy "Users can create partner connections"
  on public.accountability_partners for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Participants can update partner connections"
  on public.accountability_partners for update
  to authenticated
  using (auth.uid() = user_id or auth.uid() = partner_id)
  with check (auth.uid() = user_id or auth.uid() = partner_id);

-- Messages
create policy "Users can view own messages"
  on public.messages for select
  to authenticated
  using (auth.uid() = sender_id or auth.uid() = recipient_id);

create policy "Users can send messages"
  on public.messages for insert
  to authenticated
  with check (auth.uid() = sender_id);

create policy "Recipients can mark messages read"
  on public.messages for update
  to authenticated
  using (auth.uid() = recipient_id)
  with check (auth.uid() = recipient_id);

-- User badges
create policy "Users can view own badges"
  on public.user_badges for select
  to authenticated
  using (auth.uid() = user_id);

-- Notifications
create policy "Users can view own notifications"
  on public.notifications for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can update own notifications"
  on public.notifications for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Seed professional achievement badges
insert into public.badges (code, name, description, criteria) values
  ('first_workout', 'First Session Complete', 'Completed your first tracked workout.', '{"type":"workout_count","threshold":1}'),
  ('workouts_10', 'Consistent Training', 'Completed 10 workouts.', '{"type":"workout_count","threshold":10}'),
  ('streak_30', '30-Day Streak', 'Maintained a 30-day training streak.', '{"type":"streak_days","threshold":30}'),
  ('first_friend', 'Connected', 'Accepted your first friend connection.', '{"type":"friend_count","threshold":1}'),
  ('first_message', 'Opened Dialogue', 'Sent your first encouragement message.', '{"type":"message_count","threshold":1}'),
  ('recipe_complete', 'Nutrition in Practice', 'Completed your first healthy recipe.', '{"type":"recipe_count","threshold":1}');
