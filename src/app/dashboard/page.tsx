import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { addMenuItem, deleteMenuItem, signOut, updateRestaurant } from "@/app/actions";
import type { MenuItem, Restaurant } from "@/lib/types";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { error?: string; success?: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("user_id", user.id)
    .single<Restaurant>();

  if (!restaurant) {
    redirect("/login?error=Restaurant%20introuvable%2C%20contactez%20le%20support.");
  }

  const { data: menuItems } = await supabase
    .from("menu_items")
    .select("*")
    .eq("restaurant_id", restaurant.id)
    .order("category", { ascending: true })
    .order("position", { ascending: true })
    .returns<MenuItem[]>();

  const publicUrl = `/${restaurant.slug}`;

  return (
    <main className="min-h-screen bg-brand-cream pb-24">
      {/* Top bar */}
      <header className="border-b border-brand-dark/10 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div>
            <p className="font-serif text-lg font-bold">{restaurant.name}</p>
            <a
              href={publicUrl}
              target="_blank"
              className="text-sm text-brand hover:underline"
            >
              Voir ma page publique →
            </a>
          </div>
          <form action={signOut}>
            <button className="text-sm text-brand-dark/60 hover:text-brand-dark">
              Se déconnecter
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto mt-8 max-w-4xl space-y-8 px-6">
        {searchParams.error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {searchParams.error}
          </p>
        )}
        {searchParams.success && (
          <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            Modifications enregistrées.
          </p>
        )}

        {/* Infos générales */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl font-bold">
            Informations du restaurant
          </h2>
          <p className="mt-1 text-sm text-brand-dark/60">
            Ces informations apparaissent sur votre page publique.
          </p>

          <form action={updateRestaurant} className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="Nom du restaurant" name="name" defaultValue={restaurant.name} />
            <Field label="Accroche" name="tagline" defaultValue={restaurant.tagline ?? ""} />
            <Field
              label="Description"
              name="description"
              defaultValue={restaurant.description ?? ""}
              textarea
              className="sm:col-span-2"
            />
            <Field label="Adresse" name="address" defaultValue={restaurant.address ?? ""} />
            <Field label="Téléphone" name="phone" defaultValue={restaurant.phone ?? ""} />
            <Field label="Email de contact" name="email" defaultValue={restaurant.email ?? ""} />
            <Field
              label="Horaires"
              name="opening_hours"
              defaultValue={restaurant.opening_hours ?? ""}
              textarea
              placeholder={"Lun-Ven : 12h-14h / 19h-22h\nSam-Dim : 19h-23h"}
            />
            <Field
              label="Image de couverture (URL)"
              name="cover_image_url"
              defaultValue={restaurant.cover_image_url ?? ""}
            />
            <Field
              label="Logo (URL)"
              name="logo_url"
              defaultValue={restaurant.logo_url ?? ""}
            />

            <div className="sm:col-span-2">
              <button className="rounded-full bg-brand px-6 py-2.5 font-semibold text-white transition hover:bg-brand/90">
                Enregistrer
              </button>
            </div>
          </form>
        </section>

        {/* Menu */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="font-serif text-xl font-bold">Menu</h2>
          <p className="mt-1 text-sm text-brand-dark/60">
            Ajoutez, enlevez vos plats. Ils apparaissent dans l&apos;ordre d&apos;ajout, groupés par catégorie.
          </p>

          <ul className="mt-6 divide-y divide-brand-dark/5">
            {(menuItems ?? []).map((item) => (
              <li key={item.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-brand/80">
                    {item.category}
                  </p>
                  <p className="font-medium">{item.name}</p>
                  {item.description && (
                    <p className="text-sm text-brand-dark/60">{item.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">{Number(item.price).toFixed(2)} €</span>
                  <form action={deleteMenuItem}>
                    <input type="hidden" name="id" value={item.id} />
                    <button className="text-sm text-red-500 hover:underline">
                      Supprimer
                    </button>
                  </form>
                </div>
              </li>
            ))}
            {(!menuItems || menuItems.length === 0) && (
              <li className="py-4 text-sm text-brand-dark/50">
                Aucun plat pour l&apos;instant — ajoutez-en un ci-dessous.
              </li>
            )}
          </ul>

          <form
            action={addMenuItem}
            className="mt-6 grid gap-3 rounded-xl bg-brand-cream p-4 sm:grid-cols-4"
          >
            <input
              name="category"
              placeholder="Catégorie (ex: Entrées)"
              className="rounded-lg border border-brand-dark/15 px-3 py-2 text-sm outline-none focus:border-brand"
            />
            <input
              name="name"
              required
              placeholder="Nom du plat"
              className="rounded-lg border border-brand-dark/15 px-3 py-2 text-sm outline-none focus:border-brand"
            />
            <input
              name="description"
              placeholder="Description (optionnel)"
              className="rounded-lg border border-brand-dark/15 px-3 py-2 text-sm outline-none focus:border-brand"
            />
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="Prix €"
              className="rounded-lg border border-brand-dark/15 px-3 py-2 text-sm outline-none focus:border-brand"
            />
            <button className="rounded-full bg-brand-dark px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark/90 sm:col-span-4 sm:w-fit">
              Ajouter au menu
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  defaultValue,
  textarea,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  defaultValue: string;
  textarea?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium">{label}</label>
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          rows={3}
          className="mt-1 w-full rounded-lg border border-brand-dark/15 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      ) : (
        <input
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="mt-1 w-full rounded-lg border border-brand-dark/15 px-3 py-2 text-sm outline-none focus:border-brand"
        />
      )}
    </div>
  );
}
