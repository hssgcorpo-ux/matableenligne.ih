import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

type CookieToSet = { name: string; value: string; options: CookieOptions };

// Rafraîchit automatiquement la session Supabase sur chaque requête,
// pour que l'utilisateur ne soit jamais déconnecté en plein usage.
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Si la requête arrive sur un nom de domaine personnalisé (pas le domaine
  // Vercel principal), on cherche à quel restaurant il appartient et on
  // affiche directement sa page publique, sans changer l'URL dans le
  // navigateur du visiteur.
  const host = request.headers.get("host") || "";
  const isAppHost = host.endsWith("vercel.app") || host.includes("localhost");

  if (!isAppHost && request.nextUrl.pathname === "/") {
    const { data: restaurant } = await supabase
      .from("restaurants")
      .select("slug")
      .eq("custom_domain", host)
      .maybeSingle();

    if (restaurant) {
      return NextResponse.rewrite(new URL(`/${restaurant.slug}`, request.url));
    }
  }

  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
