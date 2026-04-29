create table links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  slug text unique not null,
  target_url text not null,
  created_at timestamptz default now()
);

create index links_user_id_idx on links(user_id);

alter table links enable row level security;

-- Short URLs are public by design: anyone with the slug can resolve it.
create policy "public read links"
  on links for select using (true);

create policy "users insert their own links"
  on links for insert with check (auth.uid() = user_id);

create policy "users delete their own links"
  on links for delete using (auth.uid() = user_id);
