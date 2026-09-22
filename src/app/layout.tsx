import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { optika } from "./fonts";
import { ConstellationCanvas } from "@/components/constellation-canvas";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { ContactFormModal } from "@/components/contact-form-modal";

// endereço canônico = com "www" — é o único domínio ligado ao projeto na
// Vercel; `curvobranding.com.br` (sem www) redireciona 307 pra cá.
const SITE_URL = "https://www.curvobranding.com.br";
const TITLE = "Curvo Branding | Agência de Branding em Cuiabá";
const DESCRIPTION =
  "Agência de branding em Cuiabá. Construímos as marcas mais estruturadas do mercado: criação de marcas, design de marcas, estratégia de negócio, comunicação e tecnologias emergentes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Curvo Branding",
  },
  description: DESCRIPTION,
  keywords: [
    "branding",
    "agência de branding",
    "agência de branding Cuiabá",
    "criação de marcas",
    "criação de marcas Cuiabá",
    "inteligência de marca",
    "design de marcas",
    "identidade visual",
    "estratégia de negócio",
    "branding Cuiabá",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Curvo Branding",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Curvo Branding",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  logo: `${SITE_URL}/opengraph-image`,
  description: DESCRIPTION,
  telephone: "+55 65 99685-3891",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Isaac Póvoas, 546 - Goiabeiras",
    addressLocality: "Cuiabá",
    addressRegion: "MT",
    postalCode: "78032-015",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -15.5966469,
    longitude: -56.1000608,
  },
  areaServed: ["Cuiabá", "Mato Grosso", "Brasil"],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    opens: "08:00",
    closes: "18:00",
  },
  sameAs: [
    "https://www.behance.net/curvobranding",
    "https://www.instagram.com/curvobranding/",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`h-full antialiased ${optika.variable}`}>
      <body className="min-h-full flex flex-col bg-obsidian text-ghost font-sans">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ConstellationCanvas />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
        <CookieConsent />
        <ContactFormModal />
      </body>
    </html>
  );
}
