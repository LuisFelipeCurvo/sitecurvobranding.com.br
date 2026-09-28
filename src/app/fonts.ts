import localFont from "next/font/local";

/**
 * Optika — tipografia oficial do site (2026-08-27, substitui a pilha Helvetica
 * Neue). Geométrica minimalista. Pesos carregados: Regular (400, corpo),
 * Medium (500, títulos grandes), SemiBold (600, frases em destaque do
 * workflow). woff2 (~35% menor que o .otf). Black saiu — o wordmark virou
 * imagem (`public/brand/logo.png`); o .otf dele segue só pro opengraph-image. Light/Bold/itálicos não são usados.
 */
export const optika = localFont({
  src: [
    { path: "./fonts/Optika-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Optika-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Optika-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-optika",
  display: "swap",
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});
