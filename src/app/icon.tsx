import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";

// Favicon — o "C" da Optika Black em preto com o "+" coral sobrescrito,
// mesmo desenho do wordmark. Renderizado com a fonte real (mesma técnica
// do opengraph-image).
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const optika = readFileSync(
  join(process.cwd(), "src/app/fonts/Optika-Black.otf"),
);

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          fontFamily: "Optika",
          fontWeight: 900,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div
            style={{
              display: "flex",
              fontSize: 52,
              lineHeight: 1,
              color: "#000000",
            }}
          >
            C
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              lineHeight: 1,
              marginTop: -4,
              marginLeft: 1,
              color: "#fc635b",
            }}
          >
            +
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Optika", data: optika, weight: 900, style: "normal" }],
    },
  );
}
