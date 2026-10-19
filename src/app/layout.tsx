import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TableEnLigne — Le site de votre restaurant, en ligne en 5 minutes",
  description:
    "Créez la page web de votre restaurant : menu, horaires, contact. Simple, rapide, sans compétence technique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased text-brand-dark">{children}</body>
    </html>
  );
}
