"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

// Champ d'image qui accepte soit un fichier déposé/glissé (envoyé vers
// Supabase Storage), soit une URL collée directement. Le résultat est
// stocké dans un champ caché, envoyé avec le reste du formulaire quand
// l'utilisateur clique sur "Enregistrer".
export function ImageUpload({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const MAX_SIZE_MB = 5;

  async function uploadFile(file: File) {
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image trop lourde (max ${MAX_SIZE_MB} Mo).`);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Seules les images sont acceptées.");
      return;
    }

    setUploading(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Vous devez être connecté.");
      setUploading(false);
      return;
    }

    const ext = file.name.split(".").pop() || "jpg";
    const path = `${user.id}/${name}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("restaurant-media")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("restaurant-media")
      .getPublicUrl(path);

    setUrl(data.publicUrl);
    setUploading(false);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input type="hidden" name={name} value={url} />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`mt-1 flex items-center gap-4 rounded-lg border-2 border-dashed p-3 transition ${
          dragOver ? "border-brand bg-brand/5" : "border-brand-dark/15"
        }`}
      >
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt=""
            className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-brand-dark/5 text-xs text-brand-dark/40">
            Aucune
          </div>
        )}

        <div className="flex-1">
          <label className="inline-block cursor-pointer rounded-full border border-brand-dark/20 px-4 py-1.5 text-xs font-medium hover:bg-brand-dark/5">
            {uploading ? "Envoi en cours..." : "Choisir un fichier"}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <p className="mt-1 text-xs text-brand-dark/40">
            ou glissez-déposez une image ici (max {MAX_SIZE_MB} Mo)
          </p>
        </div>
      </div>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
