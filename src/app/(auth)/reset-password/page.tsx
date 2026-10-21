import { updatePassword } from "@/app/actions";
import { SubmitButton } from "@/components/SubmitButton";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-cream px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="font-serif text-2xl font-bold">Nouveau mot de passe</h1>
        <p className="mt-1 text-sm text-brand-dark/60">
          Choisissez votre nouveau mot de passe.
        </p>

        {searchParams.error && (
          <p className="mt-4 rounded-lg border-2 border-red-400 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            ⚠️ {searchParams.error}
          </p>
        )}

        <form action={updatePassword} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              className="mt-1 w-full rounded-lg border border-brand-dark/15 px-3 py-2 outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Confirmez le mot de passe
            </label>
            <input
              type="password"
              name="confirm"
              required
              minLength={6}
              className="mt-1 w-full rounded-lg border border-brand-dark/15 px-3 py-2 outline-none focus:border-brand"
            />
          </div>

          <SubmitButton
            pendingText="Enregistrement..."
            className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand/90 disabled:opacity-60"
          >
            Changer le mot de passe
          </SubmitButton>
        </form>
      </div>
    </main>
  );
}
