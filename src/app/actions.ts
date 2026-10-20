"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// --- AUTH ---------------------------------------------------

export async function signUp(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const restaurantName = String(formData.get("restaurantName") || "");

  const supabase = createClient();

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError || !authData.user) {
    const message = authError?.message || "Impossible de créer le compte.";
    console.error("SIGNUP signUp error:", authError);
    redirect(`/signup?error=${encodeURIComponent(message)}`);
  }

  // Filet de sécurité : si aucune session n'a été ouverte automatiquement
  // (selon la configuration Supabase), on se connecte explicitement pour
  // que les requêtes suivantes passent bien en tant qu'utilisateur authentifié.
  if (!authData.session) {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signInError) {
      console.error("SIGNUP fallback signIn error:", signInError);
      redirect(
        `/signup?error=${encodeURIComponent(
          "Compte créé, mais la connexion automatique a échoué : " +
            signInError.message
        )}`
      );
    }
  }

  // Génère un slug unique pour la page publique du restaurant
  const baseSlug = slugify(restaurantName) || "restaurant";
  let slug = baseSlug;
  let suffix = 1;
  // Boucle simple pour éviter les doublons de slug
  while (true) {
    const { data: existing } = await supabase
      .from("restaurants")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!existing) break;
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }

  const { error: insertError } = await supabase.from("restaurants").insert({
    user_id: authData.user.id,
    slug,
    name: restaurantName,
    email,
  });

  if (insertError) {
    console.error("SIGNUP restaurant insert error:", insertError);
    redirect(`/signup?error=${encodeURIComponent(insertError.message)}`);
  }

  redirect("/dashboard");
}

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}

// --- RESTAURANT -----------------------------------------------

export async function updateRestaurant(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const payload = {
    name: String(formData.get("name") || ""),
    tagline: String(formData.get("tagline") || ""),
    description: String(formData.get("description") || ""),
    address: String(formData.get("address") || ""),
    phone: String(formData.get("phone") || ""),
    email: String(formData.get("email") || ""),
    opening_hours: String(formData.get("opening_hours") || ""),
    cover_image_url: String(formData.get("cover_image_url") || ""),
    logo_url: String(formData.get("logo_url") || ""),
    theme: String(formData.get("theme") || "classique"),
    custom_domain:
      String(formData.get("custom_domain") || "")
        .trim()
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/\/$/, "") || null,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("restaurants")
    .update(payload)
    .eq("user_id", user.id);

  if (error) {
    if (error.message.includes("duplicate key") || error.message.includes("custom_domain")) {
      redirect(
        `/dashboard?error=${encodeURIComponent(
          "Ce nom de domaine est déjà utilisé par un autre restaurant."
        )}`
      );
    }
    redirect(`/dashboard?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/dashboard");
  redirect("/dashboard?success=1");
}

// --- MENU ----------------------------------------------------

export async function addMenuItem(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!restaurant) {
    redirect("/dashboard?error=Restaurant%20introuvable.");
  }

  const { error } = await supabase.from("menu_items").insert({
    restaurant_id: restaurant.id,
    category: String(formData.get("category") || "Plats"),
    name: String(formData.get("name") || ""),
    description: String(formData.get("description") || ""),
    price: Number(formData.get("price") || 0),
    image_url: String(formData.get("image_url") || "") || null,
  });

  if (error) {
    redirect(`/dashboard?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/dashboard");
}

export async function deleteMenuItem(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const id = String(formData.get("id") || "");
  const { error } = await supabase.from("menu_items").delete().eq("id", id);

  if (error) {
    redirect(`/dashboard?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/dashboard");
}

// --- GALERIE PHOTO ---------------------------------------------

export async function addRestaurantPhoto(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!restaurant) {
    redirect("/dashboard?error=Restaurant%20introuvable.");
  }

  const imageUrl = String(formData.get("image_url") || "");
  if (!imageUrl) {
    redirect("/dashboard?error=Choisissez%20une%20image%20avant%20d'ajouter.");
  }

  const { error } = await supabase.from("restaurant_photos").insert({
    restaurant_id: restaurant.id,
    image_url: imageUrl,
  });

  if (error) {
    redirect(`/dashboard?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/dashboard");
}

export async function deleteRestaurantPhoto(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const id = String(formData.get("id") || "");
  const { error } = await supabase
    .from("restaurant_photos")
    .delete()
    .eq("id", id);

  if (error) {
    redirect(`/dashboard?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/dashboard");
}
