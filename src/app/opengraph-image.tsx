import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#231C16",
          color: "#F6EFE2",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#B4894F",
            letterSpacing: 2,
            marginBottom: 18,
          }}
        >
          TABLEENLIGNE
        </div>
        <div
          style={{
            fontSize: 58,
            fontFamily: "serif",
            fontWeight: 600,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.25,
          }}
        >
          Votre restaurant mérite mieux qu&apos;une page Facebook.
        </div>
        <div style={{ fontSize: 24, color: "#B4894F", marginTop: 28 }}>
          19€/mois · sans engagement
        </div>
      </div>
    ),
    { ...size }
  );
}
