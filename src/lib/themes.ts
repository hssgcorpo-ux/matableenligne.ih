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
  chaleureux: {
    label: "Chaleureux (orange brûlé)",
    pageBg: "bg-orange-50",
    heroBg: "bg-orange-900",
    accent: "text-orange-600",
  },
  romantique: {
    label: "Romantique (bordeaux)",
    pageBg: "bg-rose-50",
    heroBg: "bg-rose-950",
    accent: "text-rose-600",
  },
  ocean: {
    label: "Océan (bleu-vert)",
    pageBg: "bg-teal-50",
    heroBg: "bg-teal-900",
    accent: "text-teal-600",
  },
  rustique: {
    label: "Rustique (bois & pierre)",
    pageBg: "bg-stone-100",
    heroBg: "bg-stone-800",
    accent: "text-stone-600",
  },
} as const;

export type ThemeName = keyof typeof THEMES;

export function getTheme(name: string | null | undefined) {
  if (name && name in THEMES) {
    return THEMES[name as ThemeName];
  }
  return THEMES.classique;
}
