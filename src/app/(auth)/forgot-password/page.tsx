import Link from "next/link";
import { requestPasswordReset } from "@/app/actions";
import { SubmitButton } from "@/components/SubmitButton";

export default function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: { error?: string; success?: string };
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-cream px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="font-serif text-2xl font-bold">Mot de passe oublié</h1>
        <p className="mt-1 text-sm text-brand-dark/60">
          Indiquez votre email, on vous envoie un lien pour en choisir un
          nouveau.
        </p>

        {searchParams.error && (
          <p className="mt-4 rounded-lg border-2 border-red-400 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            ⚠️ {searchParams.error}
          </p>
        )}
        {searchParams.success && (
          <p className="mt-4 rounded-lg border-2 border-green-400 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
            ✅ Email envoyé ! Vérifiez votre boîte de réception (et vos
            spams).
          </p>
        )}

        <form action={requestPasswordReset} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full rounded-lg border border-brand-dark/15 px-3 py-2 outline-none focus:border-brand"
            />
          </div>

          <SubmitButton
            pendingText="Envoi en cours..."
            className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand/90 disabled:opacity-60"
          >
            Envoyer le lien
          </SubmitButton>
        </form>

        <p className="mt-6 text-center text-sm text-brand-dark/60">
          <Link href="/login" className="font-medium text-brand">
            ← Retour à la connexion
          </Link>
        </p>
      </div>
    </main>
  );
}
