import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { Reveal } from "@/components/Reveal";
import { CurtainReveal } from "@/components/CurtainReveal";
import { StaggerText } from "@/components/StaggerText";
import { Logo } from "@/components/Logo";

const CHARCOAL = "#231C16";
const WINE = "#6E2430";
const GOLD = "#B4894F";
const CREAM = "#F6EFE2";

const FEATURES = [
  {
    icon: "📸",
    title: "Photos & menu à jour",
    desc: "Ajoutez vos photos et votre carte vous-même, en quelques clics, depuis votre téléphone.",
  },
  {
    icon: "🎨",
    title: "Un design qui en jette",
    desc: "Plusieurs thèmes élégants au choix — votre page a l'air d'avoir coûté cher, sans l'être.",
  },
  {
    icon: "🖼️",
    title: "Galerie d'ambiance",
    desc: "Montrez votre salle, votre terrasse, vos plats : une vraie vitrine, pas juste une fiche.",
  },
  {
    icon: "📱",
    title: "Aucune compétence technique",
    desc: "Pas de code, pas de logiciel à installer. Si vous savez remplir un formulaire, vous savez gérer votre page.",
  },
];

const STEPS = [
  { n: "1", title: "Vous créez votre compte", text: "Nom du restaurant, email, mot de passe — ça prend 30 secondes." },
  { n: "2", title: "Votre site est en ligne", text: "Ajoutez votre menu, vos photos, choisissez un thème. C'est déjà publié." },
  { n: "3", title: "Vous gérez seul, ensuite", text: "Changez un prix ou une photo en 30 secondes, quand vous voulez." },
];

export default function HomePage() {
  return (
    <CurtainReveal>
    <main style={{ background: CREAM, color: CHARCOAL }}>
      {/* Nav */}
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <span className="flex items-center gap-2 font-serif text-lg font-bold" style={{ color: WINE }}>
          <Logo color={WINE} size={20} />
          TableEnLigne
        </span>
        <Link href="/login" className="text-sm font-medium hover:underline">
          Se connecter
        </Link>
      </div>

      {/* Hero */}
      <section className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-10 sm:grid-cols-[1.1fr_0.9fr] sm:py-16">
        <div>
          <FadeIn delay={1.1}>
          <p
            className="mb-5 inline-block rounded-full px-3 py-1 text-xs font-semibold"
            style={{ color: WINE, background: "rgba(110,36,48,0.08)" }}
          >
            Pensé pour les restaurants indépendants
          </p>
          </FadeIn>
          <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            <StaggerText text="Votre restaurant mérite mieux qu'une page Facebook." />
          </h1>
          <FadeIn delay={2.0}>
          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed opacity-70">
            Un site élégant que vous gérez vous-même — menu, photos, thème —
            en ligne en quelques minutes. 19€/mois, sans engagement.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="rounded-lg px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              style={{ background: WINE }}
            >
              Créer mon site gratuitement
            </Link>
            <Link
              href="/login"
              className="rounded-lg border px-7 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
              style={{ borderColor: "rgba(35,28,22,0.2)" }}
            >
              J&apos;ai déjà un compte
            </Link>
          </div>
          </FadeIn>
        </div>

        {/* Carte illustrative */}
        <FadeIn delay={1.35}>
        <div
          className="rounded-2xl p-7 shadow-xl transition hover:-translate-y-1"
          style={{ background: CHARCOAL, transform: "rotate(1.2deg)" }}
        >
          <p className="font-serif text-xs italic" style={{ color: GOLD }}>
            Bienvenue chez
          </p>
          <p className="mb-4 font-serif text-xl font-semibold" style={{ color: CREAM }}>
            Le Petit Chêne
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              ["Bavette, échalotes confites", "19€"],
              ["Volaille rôtie, jus corsé", "18€"],
              ["Tarte fine aux pommes", "7€"],
            ].map(([n, p]) => (
              <div key={n} className="flex items-baseline gap-2">
                <span className="text-sm" style={{ color: CREAM }}>
                  {n}
                </span>
                <span className="flex-1 border-b border-dotted" style={{ borderColor: "rgba(255,255,255,0.25)" }} />
                <span className="font-serif text-sm" style={{ color: GOLD }}>
                  {p}
                </span>
              </div>
            ))}
          </div>
          <div
            className="mt-5 flex items-center gap-2 border-t pt-4 text-xs"
            style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(246,239,226,0.75)" }}
          >
            ✨ Page publique en ligne, modifiable par vous
          </div>
        </div>
        </FadeIn>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="flex flex-col">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div
                className="flex items-start gap-4 py-4 transition hover:translate-x-1"
                style={i > 0 ? { borderTop: "1px solid rgba(35,28,22,0.08)" } : undefined}
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base"
                  style={{ background: "rgba(110,36,48,0.08)" }}
                >
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-[14.5px] font-semibold">{f.title}</h3>
                  <p className="mt-0.5 text-[13px] leading-relaxed opacity-60">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="mb-6 font-serif text-xl italic">Comment ça marche</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div
                className="rounded-xl bg-white p-5 transition hover:-translate-y-1"
                style={{ border: "1px solid rgba(35,28,22,0.08)" }}
              >
                <div
                  className="mb-3 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: WINE }}
                >
                  {s.n}
                </div>
                <h3 className="text-[13.5px] font-semibold">{s.title}</h3>
                <p className="mt-1 text-xs leading-relaxed opacity-60">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16" style={{ background: CHARCOAL, color: CREAM }}>
        <div className="mx-auto max-w-sm px-6 text-center">
          <h2 className="font-serif text-2xl italic">Un tarif simple</h2>
          <p className="mt-2 text-sm opacity-60">Sans engagement. Résiliable à tout moment.</p>
          <Reveal>
          <div
            className="mt-6 rounded-xl p-7 transition hover:-translate-y-1"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <p className="text-4xl font-bold">
              19€<span className="text-sm font-normal opacity-60">/mois</span>
            </p>
            <p className="mt-1 text-xs opacity-50">+ 49€ de mise en service, une seule fois</p>
            <ul className="mt-5 flex flex-col gap-2 text-left text-[13px] opacity-85">
              {[
                "Page web dédiée à votre restaurant",
                "Menu, photos et galerie modifiables à volonté",
                "Plusieurs thèmes élégants au choix",
                "Hébergement inclus",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span style={{ color: GOLD }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="mt-6 block rounded-lg px-6 py-3 text-sm font-bold"
              style={{ background: GOLD, color: CHARCOAL }}
            >
              Je me lance
            </Link>
          </div>
          </Reveal>
        </div>
      </section>

      <footer className="py-8 text-center text-xs opacity-40">
        <p>
          © {new Date().getFullYear()} TableEnLigne — fait pour les restaurants indépendants.
        </p>
        <p className="mt-2 flex items-center justify-center gap-3">
          <Link href="/contact" className="hover:underline">Contact</Link>
          <span>·</span>
          <Link href="/mentions-legales" className="hover:underline">Mentions légales</Link>
          <span>·</span>
          <Link href="/cgv" className="hover:underline">CGV</Link>
        </p>
      </footer>
    </main>
    </CurtainReveal>
  );
}
