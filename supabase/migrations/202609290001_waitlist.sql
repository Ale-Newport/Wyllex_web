-- Apply once through the Supabase SQL editor or `supabase db push`.
-- Anonymous callers may only insert; they can never read, update or delete subscribers.
begin;
create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  university text,
  created_at timestamptz not null default now(),
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  constraint email_normalized check (email = lower(btrim(email))),
  constraint email_valid check (
    char_length(email) between 3 and 254
    and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    and email !~ '[[:cntrl:]]'
  ),
  constraint university_length check (char_length(university) <= 160),
  constraint referrer_length check (char_length(referrer) <= 253),
  constraint source_length check (char_length(utm_source) <= 120),
  constraint medium_length check (char_length(utm_medium) <= 120),
  constraint campaign_length check (char_length(utm_campaign) <= 120)
);
alter table public.waitlist enable row level security;
revoke all on table public.waitlist from anon, authenticated;
grant insert (email, university, referrer, utm_source, utm_medium, utm_campaign) on public.waitlist to anon;
create policy "Anonymous visitors can join the waitlist"
  on public.waitlist for insert to anon with check (true);
comment on table public.waitlist is 'Early access signups. Public API permits insert only. No public read access.';
commit;
