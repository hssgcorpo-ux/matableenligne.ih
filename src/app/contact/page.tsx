import { submitContactMessage } from "@/app/actions";
import { SubmitButton } from "@/components/SubmitButton";

export default function ContactPage({
  searchParams,
}: {
  searchParams: { error?: string; success?: string };
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-cream px-6 py-16">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="font-serif text-2xl font-bold">Nous contacter</h1>
        <p className="mt-1 text-sm text-brand-dark/60">
          Une question, un problème ? Écrivez-nous, on répond rapidement.
        </p>

        {searchParams.error && (
          <p className="mt-4 rounded-lg border-2 border-red-400 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            ⚠️ {searchParams.error}
          </p>
        )}
        {searchParams.success && (
          <p className="mt-4 rounded-lg border-2 border-green-400 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
            ✅ Message envoyé, merci ! On revient vers vous rapidement.
          </p>
        )}

        <form action={submitContactMessage} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Nom</label>
            <input
              name="name"
              required
              className="mt-1 w-full rounded-lg border border-brand-dark/15 px-3 py-2 outline-none focus:border-brand"
            />
          </div>
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
            <label className="block text-sm font-medium">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              className="mt-1 w-full rounded-lg border border-brand-dark/15 px-3 py-2 outline-none focus:border-brand"
            />
          </div>

          <SubmitButton
            pendingText="Envoi en cours..."
            className="w-full rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand/90 disabled:opacity-60"
          >
            Envoyer
          </SubmitButton>
        </form>
      </div>
    </main>
  );
}
