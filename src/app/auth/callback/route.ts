import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Supabase redirige ici après qu'un utilisateur a cliqué sur le lien
// "mot de passe oublié" reçu par email. On échange le code contre une
// vraie session connectée, puis on l'envoie vers la page de
// réinitialisation du mot de passe.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/reset-password";

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
