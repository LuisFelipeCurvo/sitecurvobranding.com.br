import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 só libera qualidade 75 por padrão — as galerias de case
    // (src/app/cases/[slug]/page.tsx) pedem 90 pra ficar mais nítido em
    // telas grandes, já que as fotos ocupam a largura inteira da tela.
    qualities: [75, 90],
  },
};

export default nextConfig;
