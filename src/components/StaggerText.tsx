// Révèle un texte mot par mot avec un léger flou qui se dissipe, synchronisé
// pour apparaître juste après l'ouverture du rideau (voir CurtainReveal).
export function StaggerText({
  text,
  startDelay = 1.25,
}: {
  text: string;
  startDelay?: number;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span
          key={i}
          className="stagger-word"
          style={{ animationDelay: `${startDelay + i * 0.06}s` }}
        >
          {w}&nbsp;
        </span>
      ))}
    </>
  );
}
