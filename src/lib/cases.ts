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
    images: [
      { src: "/cases/phytosfera/01.jpg", width: 2200, height: 1414 },
      { src: "/cases/phytosfera/02.jpg", width: 2200, height: 1163 },
      { src: "/cases/phytosfera/03.jpg", width: 2200, height: 1454 },
      { src: "/cases/phytosfera/04.jpg", width: 2200, height: 1733 },
      { src: "/cases/phytosfera/05.jpg", width: 1127, height: 2200 },
      { src: "/cases/phytosfera/06.jpg", width: 2200, height: 1183 },
      { src: "/cases/phytosfera/07.jpg", width: 2200, height: 1236 },
      { src: "/cases/phytosfera/08.jpg", width: 2200, height: 1466 },
      { src: "/cases/phytosfera/09.jpg", width: 2200, height: 1236 },
      { src: "/cases/phytosfera/10.jpg", width: 2200, height: 1478 },
      { src: "/cases/phytosfera/11.jpg", width: 2039, height: 2200 },
      { src: "/cases/phytosfera/12.jpg", width: 2200, height: 1267 },
      { src: "/cases/phytosfera/13.jpg", width: 2200, height: 1238 },
    ],
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
      { src: "/cases/fernando-perez/01.jpg", width: 2200, height: 1239 },
      { src: "/cases/fernando-perez/02.jpg", width: 2200, height: 786 },
      { src: "/cases/fernando-perez/03.jpg", width: 2200, height: 1383 },
      { src: "/cases/fernando-perez/04.jpg", width: 1884, height: 2200 },
      { src: "/cases/fernando-perez/05.jpg", width: 2200, height: 1576 },
      { src: "/cases/fernando-perez/06.jpg", width: 1685, height: 2200 },
      { src: "/cases/fernando-perez/07.jpg", width: 2200, height: 2001 },
      { src: "/cases/fernando-perez/08.jpg", width: 1513, height: 2200 },
      { src: "/cases/fernando-perez/09.jpg", width: 1723, height: 2200 },
      { src: "/cases/fernando-perez/10.jpg", width: 1155, height: 2200 },
    ],
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}
