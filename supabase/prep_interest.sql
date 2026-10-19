-- Waitlist for exam prep and courses. Run in the Supabase SQL editor.
-- The app writes with SUPABASE_SERVICE_ROLE_KEY, so anonymous users cannot read the list.

create table if not exists public.prep_interest (
  id bigint generated always as identity primary key,
  email text not null,
  kind text not null check (kind in ('exam', 'course')),
  slug text not null,
  name text not null,
  created_at timestamptz not null default now()
);

create index if not exists prep_interest_slug_idx on public.prep_interest (kind, slug);
create index if not exists prep_interest_email_idx on public.prep_interest (email);

alter table public.prep_interest enable row level security;
