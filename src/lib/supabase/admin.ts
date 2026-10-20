import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Client Supabase avec la clé "service_role" (secrète), utilisé UNIQUEMENT
// côté serveur dans le webhook Stripe : à ce moment il n'y a pas
// d'utilisateur connecté, donc il faut contourner les règles RLS pour
// pouvoir mettre à jour l'abonnement du bon restaurant.
// Ne jamais importer ce fichier dans un composant client.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
