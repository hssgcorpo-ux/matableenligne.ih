// Thèmes visuels disponibles pour la page publique d'un restaurant.
// Chaque thème définit juste quelques classes Tailwind qui changent
// l'ambiance générale (fond, couleur d'accent, fond du bandeau du haut).
export const THEMES = {
  classique: {
    label: "Classique (terracotta)",
    pageBg: "bg-brand-cream",
    heroBg: "bg-brand-dark",
    accent: "text-brand",
  },
  elegant: {
    label: "Élégant (noir & or)",
    pageBg: "bg-neutral-100",
    heroBg: "bg-black",
    accent: "text-amber-600",
  },
  frais: {
    label: "Frais (vert nature)",
    pageBg: "bg-emerald-50",
    heroBg: "bg-emerald-950",
    accent: "text-emerald-600",
  },
  moderne: {
    label: "Moderne (bleu épuré)",
    pageBg: "bg-slate-50",
    heroBg: "bg-slate-900",
    accent: "text-sky-600",
  },
} as const;

export type ThemeName = keyof typeof THEMES;

export function getTheme(name: string | null | undefined) {
  if (name && name in THEMES) {
    return THEMES[name as ThemeName];
  }
  return THEMES.classique;
}
