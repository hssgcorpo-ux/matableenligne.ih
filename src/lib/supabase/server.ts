import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Client Supabase utilisé dans les Server Components / Server Actions.
// Lit et écrit la session via les cookies Next.js.
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignoré : appelé depuis un Server Component, le middleware
            // se charge déjà du rafraîchissement de session.
          }
        },
      },
    }
  );
}
