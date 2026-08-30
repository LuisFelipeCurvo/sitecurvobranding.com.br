import { ArrowUpRight } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";

const ADDRESS_LINES = ["Av. Isaac Póvoas, 546 — Goiabeiras", "Cuiabá — MT, 78032-015"];
const MAPS_QUERY = "Av. Isaac Póvoas, 546 - Goiabeiras, Cuiabá - MT, 78032-015";
const MAPS_EMBED = `https://maps.google.com/maps?hl=pt-BR&q=${encodeURIComponent(
  MAPS_QUERY
)}&z=16&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  MAPS_QUERY
)}`;

const LINKS = [
  { label: "WhatsApp", href: WHATSAPP_URL },
  { label: "Instagram", href: "https://www.instagram.com/curvobranding/" },
  { label: "Behance", href: "https://www.behance.net/curvobranding" },
];

/**
 * Rodapé site-wide (montado no `layout.tsx`). Fecha a página com contato,
 * endereço, redes e o mapa da sede. `z-[45] bg-obsidian` pra tapar a
 * constelação, igual as seções de cima.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contato"
      className="relative z-[45] mt-auto bg-obsidian"
    >
      <div className="grid gap-12 px-6 pb-14 pt-24 sm:px-14 sm:pt-28 md:grid-cols-[1fr_minmax(0,1fr)] md:gap-20">
        {/* marca + contato */}
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.16em] text-ash">
            &gt;&gt; Contato
          </p>
          <div className="flex flex-col text-lg font-black uppercase leading-[1.05] tracking-[-0.02em] sm:text-[19px]">
            <span className="flex items-baseline">
              Curvo<span className="ml-[6px] text-coral">+</span>
            </span>
            <span>Branding</span>
          </div>

          <address className="mt-8 text-sm not-italic leading-[1.7] text-ghost/70">
            {ADDRESS_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>

          <ul className="mt-8 flex flex-col gap-3">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 py-1 text-xs uppercase tracking-[0.16em] text-ghost"
                >
                  <span className="border-b border-ghost/40 pb-1 transition-colors group-hover:border-ghost">
                    {link.label}
                  </span>
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.25}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* mapa da sede — P&B, ganha cor no hover; abre no Google Maps */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-ash/25 md:aspect-[3/2]">
            <iframe
              src={MAPS_EMBED}
              title="Localização da Curvo Branding em Cuiabá"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full grayscale transition-[filter] duration-500 hover:grayscale-0 [filter:grayscale(1)_contrast(1.05)] hover:[filter:none]"
            />
          </div>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start text-[11px] uppercase tracking-[0.16em] text-ash transition-colors hover:text-ghost"
          >
            <span className="border-b border-ash/40 pb-1 transition-colors group-hover:border-ghost">
              Ver no Google Maps
            </span>
            <ArrowUpRight className="size-3.5" strokeWidth={1.25} />
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-ash/15 px-6 py-6 text-[11px] uppercase tracking-[0.14em] text-ash sm:flex-row sm:items-center sm:justify-between sm:px-14">
        <span>© {year} Curvo Branding</span>
        <span>Cuiabá — MT · Brasil</span>
      </div>
    </footer>
  );
}
