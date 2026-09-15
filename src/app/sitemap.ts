import type { MetadataRoute } from "next";
import { CASES } from "@/lib/cases";

const BASE = "https://www.curvobranding.com.br";

// Datas fixas, não `new Date()` — `new Date()` mudaria a cada build/deploy,
// mesmo sem a página ter mudado de verdade. Atualiza a data à mão quando o
// conteúdo daquela página muda de fato.
const LAST_MODIFIED = {
  home: "2026-09-15",
  cases: "2026-09-15",
  privacidade: "2026-08-29",
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: LAST_MODIFIED.home,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...CASES.map((c) => ({
      url: `${BASE}/cases/${c.slug}`,
      lastModified: LAST_MODIFIED.cases,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    {
      url: `${BASE}/privacidade`,
      lastModified: LAST_MODIFIED.privacidade,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
