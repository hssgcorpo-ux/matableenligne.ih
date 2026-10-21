"use client";

import { useEffect, useState } from "react";

// Un seul grand moment au chargement de la page d'accueil : deux pans
// couleur charbon s'écartent comme un rideau, avec un éclat doré au centre,
// pour révéler le site en dessous. Ne se rejoue pas si on revient sur la
// page pendant la même session, et respecte "réduire les animations".
export function CurtainReveal({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"closed" | "opening" | "open" | "skip">(
    "closed"
  );

  useEffect(() => {
    let reduce = false;
    let already = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      already = sessionStorage.getItem("tel_intro_played") === "1";
    } catch {}

    if (reduce || already) {
      setPhase("skip");
      return;
    }

    const t1 = setTimeout(() => setPhase("opening"), 250);
    const t2 = setTimeout(() => {
      setPhase("open");
      try {
        sessionStorage.setItem("tel_intro_played", "1");
      } catch {}
    }, 1150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const opening = phase === "opening" || phase === "open";

  return (
    <div className="relative">
      {phase !== "skip" && phase !== "open" && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 w-1/2"
            style={{
              background: "#231C16",
              transform: opening ? "translateX(-100%)" : "translateX(0)",
              transition: "transform 900ms cubic-bezier(0.76, 0, 0.24, 1)",
              borderRight: "1px solid rgba(180,137,79,0.4)",
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/2"
            style={{
              background: "#231C16",
              transform: opening ? "translateX(100%)" : "translateX(0)",
              transition: "transform 900ms cubic-bezier(0.76, 0, 0.24, 1)",
              borderLeft: "1px solid rgba(180,137,79,0.4)",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "rgba(180,137,79,0.9)",
              boxShadow:
                phase === "opening"
                  ? "0 0 260px 180px rgba(180,137,79,0.35)"
                  : "0 0 0px 0px rgba(180,137,79,0)",
              opacity: phase === "opening" ? 1 : 0,
              transition: "box-shadow 750ms ease-out, opacity 750ms ease-out",
            }}
          />
        </div>
      )}
      {children}
    </div>
  );
}
