import Link from "next/link";
import { signIn } from "@/app/actions";

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

          {searchParams.error && (
            <p className="text-sm text-red-600">{searchParams.error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand/90"
          >
            Se connecter
          </button>
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
