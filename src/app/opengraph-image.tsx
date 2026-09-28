import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "Curvo Branding — inteligência de marca";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontData = readFileSync(
    join(process.cwd(), "src/app/fonts/Optika-Black.otf")
  );

  const logo = `data:image/png;base64,${readFileSync(
    join(process.cwd(), "public/brand/logo.png")
  ).toString("base64")}`;

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
          background: "#ffffff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={558} height={210} alt="" />
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontFamily: "Optika",
            fontSize: 30,
            color: "#5a5a5a",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Inteligência de marca
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Optika", data: fontData, weight: 900, style: "normal" }],
    }
  );
}
