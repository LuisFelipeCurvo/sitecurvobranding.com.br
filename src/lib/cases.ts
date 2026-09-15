export interface CaseImage {
  src: string;
  width: number;
  height: number;
}

export interface CaseStudy {
  slug: string;
  name: string;
  year?: string;
  /** capa usada no card da home (client-surfer) */
  cover: string;
  /** galeria da página do case, em ordem de leitura */
  images: CaseImage[];
}

// Pra adicionar/editar um case: joga as imagens em `public/cases/<slug>/` e
// lista aqui, na ordem em que devem aparecer na página.
export const CASES: CaseStudy[] = [
  {
    slug: "phytosfera",
    name: "Phytosfera",
    cover: "/cases/phytosfera.jpg",
    images: [{ src: "/cases/phytosfera.jpg", width: 1080, height: 1350 }],
  },
  {
    slug: "haru",
    name: "Haru Oriental",
    year: "2014",
    cover: "/cases/haru.jpg",
    images: [
      { src: "/cases/haru/01.jpg", width: 2200, height: 2043 },
      { src: "/cases/haru/02.jpg", width: 2200, height: 1164 },
      { src: "/cases/haru/03.jpg", width: 2200, height: 1571 },
      { src: "/cases/haru/04.jpg", width: 2200, height: 1571 },
      { src: "/cases/haru/05.jpg", width: 1949, height: 2200 },
      { src: "/cases/haru/06.jpg", width: 2200, height: 1371 },
      { src: "/cases/haru/07.jpg", width: 1820, height: 2200 },
      { src: "/cases/haru/08.jpg", width: 2200, height: 1427 },
      { src: "/cases/haru/09.jpg", width: 2200, height: 1571 },
      { src: "/cases/haru/10.jpg", width: 1083, height: 2200 },
      { src: "/cases/haru/11.jpg", width: 2200, height: 1237 },
      { src: "/cases/haru/12.jpg", width: 2200, height: 1237 },
      { src: "/cases/haru/13.jpg", width: 2200, height: 2198 },
      { src: "/cases/haru/14.jpg", width: 2200, height: 2047 },
    ],
  },
  {
    slug: "fernando-perez",
    name: "Fernando Perez",
    year: "2020",
    cover: "/cases/fernando-perez.jpg",
    images: [
      { src: "/cases/fernando-perez.jpg", width: 1440, height: 1800 },
    ],
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}
