import localFont from "next/font/local";

/**
 * Optika — tipografia oficial do site (2026-08-27, substitui a pilha Helvetica
 * Neue). Geométrica minimalista. Pesos carregados: Regular (400, corpo),
 * Medium (500, títulos grandes), SemiBold (600, frases em destaque do
 * workflow), Black (900, wordmark). Light/Bold/itálicos não são usados.
 */
export const optika = localFont({
  src: [
    { path: "./fonts/Optika-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/Optika-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/Optika-SemiBold.otf", weight: "600", style: "normal" },
    { path: "./fonts/Optika-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-optika",
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});
