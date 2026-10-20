"use client";

import { useEffect, useState } from "react";

export function Gallery({
  photos,
  accent,
}: {
  photos: { id: string; image_url: string }[];
  accent: string;
}) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((photo) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={photo.id}
            src={photo.image_url}
            alt=""
            onClick={() => setLightbox(photo.image_url)}
            className="aspect-square w-full cursor-zoom-in rounded-lg object-cover transition hover:scale-[1.03]"
          />
        ))}
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
          style={{ animation: "fadeIn .15s ease" }}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-5 top-5 text-2xl text-white/80 hover:text-white"
            style={{ color: accent }}
          >
            ✕
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt=""
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </>
  );
}
