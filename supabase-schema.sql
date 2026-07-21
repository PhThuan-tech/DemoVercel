create extension if not exists pgcrypto;

create table if not exists public.briefs (
  id uuid primary key default gen_random_uuid(),
  reference_id text not null unique,
  project text not null,
  email text,
  style text not null check (style in ('modern', 'minimal', 'dynamic')),
  goal text,
  language text not null check (language in ('vi', 'en')),
  summary text not null,
  next_steps jsonb not null default '[]'::jsonb,
  design_direction jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.briefs enable row level security;

create policy "service role can manage briefs"
on public.briefs
for all
to service_role
using (true)
with check (true);
