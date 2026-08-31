import { FaWhatsapp, FaInstagram, FaBehance } from "react-icons/fa6";
import { WHATSAPP_URL } from "@/lib/contact";

const MAPS_QUERY = "Av. Isaac Póvoas, 546 - Goiabeiras, Cuiabá - MT, 78032-015";
const MAPS_EMBED = `https://maps.google.com/maps?hl=pt-BR&q=${encodeURIComponent(
  MAPS_QUERY
)}&z=15&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  MAPS_QUERY
)}`;

const SOCIAL = [
  { label: "WhatsApp", href: WHATSAPP_URL, Icon: FaWhatsapp },
  { label: "Instagram", href: "https://www.instagram.com/curvobranding/", Icon: FaInstagram },
  { label: "Behance", href: "https://www.behance.net/curvobranding", Icon: FaBehance },
];

/**
 * Rodapé site-wide (montado no `layout.tsx`). Uma faixa fina: wordmark +
 * ícones das redes de um lado, mini-mapa da sede do outro. `z-[45] bg-obsidian`
 * pra tapar a constelação.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contato"
      className="relative z-[45] mt-auto border-t border-ash/20 bg-obsidian"
    >
      <div className="flex flex-row items-center gap-5 px-6 py-8 sm:gap-8 sm:px-14">
        {/* mini-mapa QUADRADO à esquerda — P&B, cor no hover; abre no Google Maps */}
        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver localização no Google Maps"
          className="group relative block size-24 shrink-0 overflow-hidden border border-ash/30 transition-colors hover:border-coral sm:size-28"
        >
          <iframe
            src={MAPS_EMBED}
            title="Localização da Curvo Branding em Cuiabá"
            loading="lazy"
            tabIndex={-1}
            className="pointer-events-none h-full w-full [filter:grayscale(1)_contrast(1.05)] transition-[filter] duration-500 group-hover:[filter:none]"
          />
        </a>

        {/* marca + redes + endereço — ao lado do mapa */}
        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex flex-col text-[15px] font-black uppercase leading-[1.05] tracking-[-0.02em]">
            <span className="flex items-baseline">
              Curvo<span className="ml-[5px] text-coral">+</span>
            </span>
            <span>Branding</span>
          </div>

          <ul className="flex items-center gap-2.5">
            {SOCIAL.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-8 items-center justify-center border border-ash/30 text-ghost/80 transition-colors hover:border-coral hover:text-coral"
                >
                  <Icon className="size-[15px]" />
                </a>
              </li>
            ))}
          </ul>

          <p className="text-xs leading-[1.6] text-ash">
            Av. Isaac Póvoas, 546 — Goiabeiras
            <br />
            Cuiabá — MT, 78032-015
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1 border-t border-ash/15 px-6 py-5 text-[11px] uppercase tracking-[0.14em] text-ash sm:flex-row sm:items-center sm:justify-between sm:px-14">
        <span>© {year} Curvo Branding</span>
        <span>Cuiabá — MT · Brasil</span>
      </div>
    </footer>
  );
}
