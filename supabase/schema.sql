-- ============================================================
-- TableEnLigne — schéma de base de données
-- À coller dans Supabase > SQL Editor > New query > Run
-- ============================================================

-- Table des restaurants (1 restaurant = 1 compte utilisateur propriétaire)
create table if not exists public.restaurants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  slug text not null unique,
  name text not null,
  tagline text,
  description text,
  address text,
  phone text,
  email text,
  opening_hours text,
  cover_image_url text,
  logo_url text,
  theme text not null default 'classique',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Ajoute la colonne thème si la table existait déjà sans elle
alter table public.restaurants add column if not exists theme text not null default 'classique';

-- Table des plats / éléments de menu, rattachés à un restaurant
create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  category text not null default 'Plats',
  name text not null,
  description text,
  price numeric(10, 2) not null default 0,
  position integer not null default 0,
  image_url text,
  created_at timestamptz not null default now()
);

-- Ajoute la colonne photo si la table existait déjà sans elle
alter table public.menu_items add column if not exists image_url text;

-- Table de la galerie photo du restaurant (plusieurs photos libres)
create table if not exists public.restaurant_photos (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.restaurants(id) on delete cascade,
  image_url text not null,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists menu_items_restaurant_id_idx on public.menu_items(restaurant_id);
create index if not exists restaurants_slug_idx on public.restaurants(slug);
create index if not exists restaurant_photos_restaurant_id_idx on public.restaurant_photos(restaurant_id);

-- ============================================================
-- Sécurité (Row Level Security) : chacun ne gère que SON restaurant,
-- mais tout le monde peut lire les pages publiques.
-- ============================================================

alter table public.restaurants enable row level security;
alter table public.menu_items enable row level security;
alter table public.restaurant_photos enable row level security;

-- Tout le monde peut voir les restaurants (page publique)
create policy "restaurants_public_read"
  on public.restaurants for select
  using (true);

-- Seul le propriétaire peut créer son restaurant
create policy "restaurants_owner_insert"
  on public.restaurants for insert
  with check (auth.uid() = user_id);

-- Seul le propriétaire peut modifier son restaurant
create policy "restaurants_owner_update"
  on public.restaurants for update
  using (auth.uid() = user_id);

-- Seul le propriétaire peut supprimer son restaurant
create policy "restaurants_owner_delete"
  on public.restaurants for delete
  using (auth.uid() = user_id);

-- Tout le monde peut voir le menu (page publique)
create policy "menu_items_public_read"
  on public.menu_items for select
  using (true);

-- Seul le propriétaire du restaurant peut ajouter des plats
create policy "menu_items_owner_insert"
  on public.menu_items for insert
  with check (
    exists (
      select 1 from public.restaurants r
      where r.id = restaurant_id and r.user_id = auth.uid()
    )
  );

-- Seul le propriétaire du restaurant peut modifier ses plats
create policy "menu_items_owner_update"
  on public.menu_items for update
  using (
    exists (
      select 1 from public.restaurants r
      where r.id = restaurant_id and r.user_id = auth.uid()
    )
  );

-- Seul le propriétaire du restaurant peut supprimer ses plats
create policy "menu_items_owner_delete"
  on public.menu_items for delete
  using (
    exists (
      select 1 from public.restaurants r
      where r.id = restaurant_id and r.user_id = auth.uid()
    )
  );

-- Tout le monde peut voir la galerie (page publique)
create policy "restaurant_photos_public_read"
  on public.restaurant_photos for select
  using (true);

-- Seul le propriétaire du restaurant peut ajouter des photos
create policy "restaurant_photos_owner_insert"
  on public.restaurant_photos for insert
  with check (
    exists (
      select 1 from public.restaurants r
      where r.id = restaurant_id and r.user_id = auth.uid()
    )
  );

-- Seul le propriétaire du restaurant peut supprimer des photos
create policy "restaurant_photos_owner_delete"
  on public.restaurant_photos for delete
  using (
    exists (
      select 1 from public.restaurants r
      where r.id = restaurant_id and r.user_id = auth.uid()
    )
  );

-- ============================================================
-- Stockage des images (logo, photo de couverture)
-- ============================================================

insert into storage.buckets (id, name, public)
values ('restaurant-media', 'restaurant-media', true)
on conflict (id) do nothing;

-- Tout le monde peut voir les images (nécessaire pour la page publique)
create policy "restaurant_media_public_read"
  on storage.objects for select
  using (bucket_id = 'restaurant-media');

-- Chacun ne peut déposer des fichiers que dans son propre dossier
-- (nommé d'après son identifiant utilisateur)
create policy "restaurant_media_owner_insert"
  on storage.objects for insert
  with check (
    bucket_id = 'restaurant-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "restaurant_media_owner_update"
  on storage.objects for update
  using (
    bucket_id = 'restaurant-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "restaurant_media_owner_delete"
  on storage.objects for delete
  using (
    bucket_id = 'restaurant-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
