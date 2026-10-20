import Link from "next/link";
import { signIn } from "@/app/actions";
import { SubmitButton } from "@/components/SubmitButton";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-cream px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="font-serif text-2xl font-bold">Connexion</h1>
        <p className="mt-1 text-sm text-brand-dark/60">
          Accédez à l&apos;espace de gestion de votre restaurant.
        </p>

        {searchParams.error && (
          <p className="mt-4 rounded-lg border-2 border-red-400 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            ⚠️ {searchParams.error}
          </p>
        )}

        <form action={signIn} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full rounded-lg border border-brand-dark/15 px-3 py-2 outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 w-full rounded-lg border border-brand-dark/15 px-3 py-2 outline-none focus:border-brand"
            />
          </div>

          <SubmitButton
            pendingText="Connexion en cours..."
            className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand/90 disabled:opacity-60"
          >
            Se connecter
          </SubmitButton>
        </form>

        <p className="mt-6 text-center text-sm text-brand-dark/60">
          Pas encore de compte ?{" "}
          <Link href="/signup" className="font-medium text-brand">
            Créez votre site
          </Link>
        </p>
      </div>
    </main>
  );
}
