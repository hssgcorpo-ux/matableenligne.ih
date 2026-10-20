import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { MenuItem, Restaurant, RestaurantPhoto } from "@/lib/types";
import { getTheme, rgba } from "@/lib/themes";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";

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
  const cream = "#F6EFE2";

  return (
    <main
      className="min-h-screen font-sans"
      style={{ background: theme.bg, color: cream }}
    >
      {/* Barre de navigation sticky */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 backdrop-blur"
        style={{ background: rgba(theme.bg, 0.85), borderBottom: `1px solid ${rgba(cream, 0.08)}` }}
      >
        <span className="font-serif text-sm font-semibold" style={{ color: theme.accent }}>
          {restaurant.name}
        </span>
        <div className="flex gap-5 text-xs">
          {photos && photos.length > 0 && (
            <a href="#galerie" className="opacity-70 hover:opacity-100">
              Galerie
            </a>
          )}
          {groups.size > 0 && (
            <a href="#carte" className="opacity-70 hover:opacity-100">
              La carte
            </a>
          )}
          <a href="#contact" className="opacity-70 hover:opacity-100">
            Contact
          </a>
        </div>
      </div>

      <Hero
        name={restaurant.name}
        tagline={restaurant.tagline}
        logoUrl={restaurant.logo_url}
        coverUrl={restaurant.cover_image_url}
        accent={theme.accent}
        wine={theme.wine}
      />

      <div className="mx-auto max-w-2xl px-6 py-10">
        {restaurant.description && (
          <p className="max-w-lg text-[15px] opacity-75">{restaurant.description}</p>
        )}

        {/* Galerie */}
        {photos && photos.length > 0 && (
          <section id="galerie" className="mt-14 scroll-mt-20">
            <h2 className="mb-5 font-serif text-lg italic" style={{ color: theme.accent }}>
              L&apos;ambiance
            </h2>
            <Gallery photos={photos} accent={theme.accent} />
          </section>
        )}

        {/* Menu */}
        {groups.size > 0 && (
          <section id="carte" className="mt-16 scroll-mt-20">
            <h2 className="mb-6 text-center font-serif text-3xl font-semibold">
              Notre carte
            </h2>
            <div className="space-y-10">
              {Array.from(groups.entries()).map(([category, items]) => (
                <div key={category}>
                  <h3
                    className="mb-3 text-sm font-semibold uppercase tracking-widest"
                    style={{ color: theme.accent }}
                  >
                    {category}
                  </h3>
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li key={item.id} className="flex items-baseline gap-4">
                        {item.image_url && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="h-14 w-14 shrink-0 rounded-lg object-cover"
                          />
                        )}
                        <span className="font-medium">{item.name}</span>
                        <span
                          className="flex-1 border-b border-dotted"
                          style={{ borderColor: rgba(cream, 0.25), position: "relative", top: -3 }}
                        />
                        <span className="whitespace-nowrap font-serif" style={{ color: theme.accent }}>
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

        {/* Contact */}
        <section
          id="contact"
          className="mt-16 flex flex-wrap gap-6 border-t pt-8 text-sm opacity-80 scroll-mt-20"
          style={{ borderColor: rgba(cream, 0.1) }}
        >
          {restaurant.address && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                restaurant.address
              )}`}
              target="_blank"
              className="underline-offset-4 hover:underline"
            >
              📍 {restaurant.address}
            </a>
          )}
          {restaurant.phone && (
            <a href={`tel:${restaurant.phone.replace(/\s+/g, "")}`} className="underline-offset-4 hover:underline">
              📞 {restaurant.phone}
            </a>
          )}
          {restaurant.email && <span>✉️ {restaurant.email}</span>}
          {restaurant.opening_hours && (
            <span className="whitespace-pre-line">🕐 {restaurant.opening_hours}</span>
          )}
        </section>
      </div>

      <footer className="pb-10 text-center text-xs opacity-40">
        Site propulsé par TableEnLigne
      </footer>
    </main>
  );
}
