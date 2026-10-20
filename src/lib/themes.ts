// Palettes visuelles sombres et élégantes pour la page publique d'un
// restaurant, inspirées d'une vraie carte de restaurant : fond sombre,
// touche dorée, typographie serif.
export const THEMES = {
  bistrot: {
    label: "Bistrot (bordeaux)",
    bg: "#231C16",
    accent: "#B4894F",
    wine: "#6E2430",
  },
  terroir: {
    label: "Terroir (vert sombre)",
    bg: "#1E2620",
    accent: "#C9A876",
    wine: "#3C4A3A",
  },
  azur: {
    label: "Bord de mer (bleu nuit)",
    bg: "#132228",
    accent: "#D8B36A",
    wine: "#1F4E5F",
  },
  noir: {
    label: "Élégant (noir & or)",
    bg: "#14110F",
    accent: "#D4AF37",
    wine: "#2A2520",
  },
  passion: {
    label: "Passion (rouge profond)",
    bg: "#1A0E0E",
    accent: "#E8B86D",
    wine: "#7A1F2B",
  },
  violette: {
    label: "Violette (aubergine)",
    bg: "#1C1420",
    accent: "#C9A3D4",
    wine: "#4A2E57",
  },
} as const;

export type ThemeName = keyof typeof THEMES;

export function getTheme(name: string | null | undefined) {
  if (name && name in THEMES) {
    return THEMES[name as ThemeName];
  }
  return THEMES.bistrot;
}

export function rgba(hex: string, alpha: number) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}
