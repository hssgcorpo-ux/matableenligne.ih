"use client";

import { useFormStatus } from "react-dom";

// Bouton de formulaire qui se désactive automatiquement pendant l'envoi,
// pour empêcher les doubles soumissions (double-clic, double-tap mobile).
export function SubmitButton({
  children,
  pendingText,
  className,
}: {
  children: React.ReactNode;
  pendingText: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingText : children}
    </button>
  );
}
