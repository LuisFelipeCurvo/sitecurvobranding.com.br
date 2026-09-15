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
      { src: "/cases/phytosfera/01.jpg", width: 3200, height: 2057 },
      { src: "/cases/phytosfera/02.jpg", width: 3200, height: 1692 },
      { src: "/cases/phytosfera/03.jpg", width: 3200, height: 2116 },
      { src: "/cases/phytosfera/04.jpg", width: 3200, height: 2521 },
      { src: "/cases/phytosfera/05.jpg", width: 1639, height: 3200 },
      { src: "/cases/phytosfera/06.jpg", width: 3200, height: 1721 },
      { src: "/cases/phytosfera/07.jpg", width: 3200, height: 1798 },
      { src: "/cases/phytosfera/08.jpg", width: 3200, height: 2133 },
      { src: "/cases/phytosfera/09.jpg", width: 3200, height: 1798 },
      { src: "/cases/phytosfera/10.jpg", width: 3200, height: 2150 },
      { src: "/cases/phytosfera/11.jpg", width: 2967, height: 3200 },
      { src: "/cases/phytosfera/12.jpg", width: 3200, height: 1844 },
      { src: "/cases/phytosfera/13.jpg", width: 3200, height: 1800 },
    ],
  },
  {
    slug: "haru",
    name: "Haru Oriental",
    year: "2014",
    cover: "/cases/haru.jpg",
    images: [
      { src: "/cases/haru/01.jpg", width: 3200, height: 2971 },
      { src: "/cases/haru/02.jpg", width: 3200, height: 1693 },
      { src: "/cases/haru/03.jpg", width: 3200, height: 2286 },
      { src: "/cases/haru/04.jpg", width: 3200, height: 2286 },
      { src: "/cases/haru/05.jpg", width: 2836, height: 3200 },
      { src: "/cases/haru/06.jpg", width: 3200, height: 1994 },
      { src: "/cases/haru/07.jpg", width: 2647, height: 3200 },
      { src: "/cases/haru/08.jpg", width: 3200, height: 2076 },
      { src: "/cases/haru/09.jpg", width: 3200, height: 2286 },
      { src: "/cases/haru/10.jpg", width: 1575, height: 3200 },
      { src: "/cases/haru/11.jpg", width: 3200, height: 1800 },
      { src: "/cases/haru/12.jpg", width: 3200, height: 1800 },
      { src: "/cases/haru/13.jpg", width: 3200, height: 3197 },
      { src: "/cases/haru/14.jpg", width: 3200, height: 2977 },
    ],
  },
  {
    slug: "fernando-perez",
    name: "Fernando Perez",
    year: "2020",
    cover: "/cases/fernando-perez.jpg",
    images: [
      { src: "/cases/fernando-perez/01.jpg", width: 3200, height: 1802 },
      { src: "/cases/fernando-perez/02.jpg", width: 3200, height: 1143 },
      { src: "/cases/fernando-perez/03.jpg", width: 3200, height: 2011 },
      { src: "/cases/fernando-perez/04.jpg", width: 2740, height: 3200 },
      { src: "/cases/fernando-perez/05.jpg", width: 3200, height: 2292 },
      { src: "/cases/fernando-perez/06.jpg", width: 2451, height: 3200 },
      { src: "/cases/fernando-perez/07.jpg", width: 3200, height: 2911 },
      { src: "/cases/fernando-perez/08.jpg", width: 2200, height: 3200 },
      { src: "/cases/fernando-perez/09.jpg", width: 2507, height: 3200 },
      { src: "/cases/fernando-perez/10.jpg", width: 1680, height: 3200 },
    ],
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}
