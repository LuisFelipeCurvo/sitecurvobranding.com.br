import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { optika } from "./fonts";
import { ConstellationCanvas } from "@/components/constellation-canvas";
import { Footer } from "@/components/footer";

const CLARITY_PROJECT_ID = "y9sekz06xv";
// endereço canônico = com "www" — é o único domínio ligado ao projeto na
// Vercel; `curvobranding.com.br` (sem www) redireciona 307 pra cá.
const SITE_URL = "https://www.curvobranding.com.br";
const TITLE = "Curvo Branding | Inteligência de marca";
const DESCRIPTION =
  "Construímos as marcas mais estruturadas do mercado. Estratégia de negócio, design de marcas, comunicação e tecnologias emergentes.";

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
  "@type": "Organization",
  name: "Curvo Branding",
  url: SITE_URL,
  logo: `${SITE_URL}/opengraph-image`,
  description: DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Isaac Póvoas, 546 - Goiabeiras",
    addressLocality: "Cuiabá",
    addressRegion: "MT",
    postalCode: "78032-015",
    addressCountry: "BR",
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
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`}
        </Script>
      </body>
    </html>
  );
}
