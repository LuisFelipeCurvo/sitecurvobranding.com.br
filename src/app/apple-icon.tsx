import { ImageResponse } from "next/og";

// Ícone de tela inicial (iOS/Android) — mesmo desenho do favicon (icon.svg):
// "C" preto + "+" coral sobre fundo branco.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        }}
      >
        <svg width="180" height="180" viewBox="0 0 64 64">
          <path
            d="M35.61 42.61 A15 15 0 1 1 35.61 21.39"
            fill="none"
            stroke="#0a0a0a"
            strokeWidth="8.5"
          />
          <rect x="44" y="28.5" width="16" height="7" rx="1.5" fill="#fc635b" />
          <rect x="48.5" y="24" width="7" height="16" rx="1.5" fill="#fc635b" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
