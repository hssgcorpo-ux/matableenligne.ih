// Marque simple : une assiette tenue par deux couverts, en trait fin doré.
// Remplace l'emoji 🍽️ par un vrai mark cohérent avec l'identité du site.
export function Logo({ color = "#B4894F", size = 22 }: { color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="7.25" stroke={color} strokeWidth="1.3" />
      <circle cx="12" cy="12" r="3.1" stroke={color} strokeWidth="1" />
      <path d="M4.2 3.5 V9.3 M3 3.5 V7.6 a1.2 1.2 0 0 0 2.4 0 V3.5" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M4.2 9.3 V20.5" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
      <path d="M20.2 3.5 c-1.4 0-2.3 1.6-2.3 3.4 0 1.5.7 2.6 1.7 3 v10.6" stroke={color} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
