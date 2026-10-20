import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { MenuItem, Restaurant, RestaurantPhoto } from "@/lib/types";
import { getTheme } from "@/lib/themes";

export const revalidate = 60;

export default async function RestaurantPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("slug", params.slug)
    .single<Restaurant>();

  if (!restaurant) notFound();

  const { data: menuItems } = await supabase
    .from("menu_items")
    .select("*")
    .eq("restaurant_id", restaurant.id)
    .order("category", { ascending: true })
    .order("position", { ascending: true })
    .returns<MenuItem[]>();

  const { data: photos } = await supabase
    .from("restaurant_photos")
    .select("*")
    .eq("restaurant_id", restaurant.id)
    .order("position", { ascending: true })
    .returns<RestaurantPhoto[]>();

  const groups = new Map<string, MenuItem[]>();
  for (const item of menuItems ?? []) {
    const list = groups.get(item.category) ?? [];
    list.push(item);
    groups.set(item.category, list);
  }

  const theme = getTheme(restaurant.theme);

  return (
    <main className={`min-h-screen ${theme.pageBg}`}>
      {/* Hero */}
      <section
        className={`flex min-h-[40vh] flex-col items-center justify-center ${theme.heroBg} px-6 text-center text-white`}
        style={
          restaurant.cover_image_url
            ? {
                backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${restaurant.cover_image_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {restaurant.logo_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={restaurant.logo_url}
            alt={restaurant.name}
            className="mb-4 h-16 w-16 rounded-full object-cover"
          />
        )}
        <h1 className="font-serif text-4xl font-bold sm:text-5xl">
          {restaurant.name}
        </h1>
        {restaurant.tagline && (
          <p className="mt-3 text-lg text-white/80">{restaurant.tagline}</p>
        )}
      </section>

      {restaurant.description && (
        <section className="mx-auto max-w-2xl px-6 py-12 text-center">
          <p className="text-brand-dark/80">{restaurant.description}</p>
        </section>
      )}

      {/* Menu */}
      {groups.size > 0 && (
        <section className="mx-auto max-w-2xl px-6 py-8">
          <h2 className="mb-6 text-center font-serif text-3xl font-bold">
            Notre carte
          </h2>
          <div className="space-y-10">
            {Array.from(groups.entries()).map(([category, items]) => (
              <div key={category}>
                <h3 className={`mb-3 text-sm font-semibold uppercase tracking-widest ${theme.accent}`}>
                  {category}
                </h3>
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-4">
                      <div className="flex items-start gap-3">
                        {item.image_url && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="h-16 w-16 shrink-0 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium">{item.name}</p>
                          {item.description && (
                            <p className="text-sm text-brand-dark/60">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="whitespace-nowrap font-semibold">
                        {Number(item.price).toFixed(2)} €
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Galerie */}
      {photos && photos.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-8">
          <h2 className="mb-6 text-center font-serif text-3xl font-bold">
            Galerie
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {photos.map((photo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={photo.id}
                src={photo.image_url}
                alt=""
                className="h-40 w-full rounded-xl object-cover sm:h-52"
              />
            ))}
          </div>
        </section>
      )}

      {/* Infos pratiques */}
      <section className="mx-auto max-w-2xl px-6 py-12">
        <div className="grid gap-6 rounded-2xl bg-white p-6 shadow-sm sm:grid-cols-2">
          {restaurant.address && (
            <div>
              <p className={`text-sm font-semibold uppercase tracking-wide ${theme.accent}`}>
                Adresse
              </p>
              <p className="mt-1">{restaurant.address}</p>
            </div>
          )}
          {restaurant.opening_hours && (
            <div>
              <p className={`text-sm font-semibold uppercase tracking-wide ${theme.accent}`}>
                Horaires
              </p>
              <p className="mt-1 whitespace-pre-line">{restaurant.opening_hours}</p>
            </div>
          )}
          {restaurant.phone && (
            <div>
              <p className={`text-sm font-semibold uppercase tracking-wide ${theme.accent}`}>
                Téléphone
              </p>
              <p className="mt-1">{restaurant.phone}</p>
            </div>
          )}
          {restaurant.email && (
            <div>
              <p className={`text-sm font-semibold uppercase tracking-wide ${theme.accent}`}>
                Email
              </p>
              <p className="mt-1">{restaurant.email}</p>
            </div>
          )}
        </div>
      </section>

      <footer className="pb-10 text-center text-xs text-brand-dark/40">
        Site propulsé par TableEnLigne
      </footer>
    </main>
  );
}
