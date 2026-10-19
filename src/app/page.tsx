import Link from "next/link";

const FEATURES = [
  {
    title: "Votre site en 5 minutes",
    desc: "Nom, menu, horaires, contact : remplissez un formulaire, votre page est en ligne immédiatement.",
  },
  {
    title: "Modifiable à tout moment",
    desc: "Changez vos plats ou vos prix vous-même, depuis votre téléphone, sans jamais rappeler un développeur.",
  },
  {
    title: "Aucune compétence technique",
    desc: "Pas de code, pas de logiciel à installer. Si vous savez remplir un formulaire, vous savez gérer votre page.",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-brand-dark text-white">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <p className="mb-4 text-sm uppercase tracking-widest text-brand">
            TableEnLigne
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl">
            Le site de votre restaurant,
            <br className="hidden sm:block" /> en ligne en 5 minutes.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">
            Une page web simple et élégante pour présenter votre menu, vos
            horaires et votre adresse — que vous mettez à jour vous-même, en
            quelques clics.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-full bg-brand px-8 py-3 font-semibold text-white transition hover:bg-brand/90"
            >
              Créer mon site gratuitement
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-white/30 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              J&apos;ai déjà un compte
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-10 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title}>
              <h3 className="font-serif text-xl font-semibold text-brand-dark">
                {f.title}
              </h3>
              <p className="mt-2 text-brand-dark/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-md px-6 text-center">
          <h2 className="font-serif text-3xl font-bold">Un tarif simple</h2>
          <div className="mt-8 rounded-2xl border border-brand-dark/10 p-8 shadow-sm">
            <p className="text-5xl font-bold">
              19€<span className="text-base font-normal text-brand-dark/60">/mois</span>
            </p>
            <p className="mt-2 text-brand-dark/60">
              + 49€ de mise en service, une seule fois
            </p>
            <ul className="mt-6 space-y-2 text-left text-brand-dark/80">
              <li>✓ Page web dédiée à votre restaurant</li>
              <li>✓ Menu modifiable à volonté</li>
              <li>✓ Hébergement et nom de domaine inclus</li>
              <li>✓ Support par email</li>
            </ul>
            <Link
              href="/signup"
              className="mt-8 block rounded-full bg-brand px-8 py-3 font-semibold text-white transition hover:bg-brand/90"
            >
              Je me lance
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-brand-dark/10 py-8 text-center text-sm text-brand-dark/50">
        © {new Date().getFullYear()} TableEnLigne
      </footer>
    </main>
  );
}
