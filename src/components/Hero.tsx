"use client";

import { useEffect, useState } from "react";

export function Hero({
  name,
  tagline,
  logoUrl,
  coverUrl,
  accent,
  wine,
}: {
  name: string;
  tagline: string | null;
  logoUrl: string | null;
  coverUrl: string | null;
  accent: string;
  wine: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative h-[42vh] min-h-[280px] overflow-hidden">
      {coverUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={coverUrl}
          alt={name}
          className="h-full w-full object-cover transition-all duration-[1100ms] ease-out"
          style={{
            transform: visible ? "scale(1)" : "scale(1.08)",
            opacity: visible ? 1 : 0,
          }}
        />
      ) : (
        <div
          className="h-full w-full"
          style={{ background: `linear-gradient(160deg, ${wine}, transparent)` }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.55) 95%)" }}
      />
      <div
        className="absolute bottom-7 left-0 right-0 mx-auto max-w-2xl px-7 transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(14px)",
        }}
      >
        {logoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoUrl}
            alt=""
            className="mb-3 h-14 w-14 rounded-full border-2 object-cover"
            style={{ borderColor: accent }}
          />
        )}
        <p className="font-serif italic" style={{ color: accent }}>
          Bienvenue chez
        </p>
        <h1 className="font-serif text-4xl font-semibold text-white sm:text-5xl">{name}</h1>
        {tagline && <p className="mt-2 text-white/80">{tagline}</p>}
      </div>
    </div>
  );
}
