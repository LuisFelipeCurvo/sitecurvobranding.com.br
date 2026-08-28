"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TypewriterHeadline } from "@/components/typewriter-headline";
import { WHATSAPP_URL } from "@/lib/contact";

const NAV_ITEMS = [
  { label: "Home", href: "#", active: true },
  { label: "Projetos", href: "#" },
  { label: "Por que fazemos", href: "#" },
  { label: "O que fazemos", href: "#" },
  { label: "Como fazemos", href: "#" },
  { label: "Contato", href: "#" },
];

const TAGS = [
  "Estratégia de Negócio",
  "Design de Marcas",
  "Comunicação",
  "Tecnologias Emergentes",
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  // o CTA e as tags do rodapé só revelam quando o typewriter termina a 1ª escrita
  const [revealed, setRevealed] = useState(false);

  const hiddenTag = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 8 };

  return (
    <div className="relative z-[3] flex min-h-screen flex-col">
      <header className="flex flex-col gap-4 px-6 pt-7 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:px-14 sm:pt-9">
        <div className="flex shrink-0 flex-col text-lg font-black uppercase leading-[1.05] tracking-[-0.02em] sm:text-[19px]">
          <span className="flex items-baseline">
            Curvo<span className="ml-[6px] text-coral">+</span>
          </span>
          <span>Branding</span>
        </div>
        <nav>
          <ul className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-[18px] lg:gap-x-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="whitespace-nowrap">
                <a
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className="group -my-2 inline-block py-2 text-[11px] uppercase tracking-[0.02em] sm:text-xs"
                >
                  <span
                    className={`relative inline-block pb-[9px] transition-colors duration-200 ${
                      item.active
                        ? "text-ghost after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-ghost"
                        : "text-ghost/72 group-hover:text-ghost"
                    }`}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* headline + CTA, centralizados na tela (vertical + horizontal) */}
      <div className="flex flex-1 flex-col items-center justify-center gap-9 px-6 py-10 sm:gap-12 sm:px-14">
        <TypewriterHeadline onFirstComplete={() => setRevealed(true)} />
        {revealed && (
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="inline-block bg-ghost px-8 py-4 text-center text-xs uppercase tracking-[0.16em] text-obsidian transition-opacity duration-200 hover:opacity-90 focus-visible:outline-obsidian sm:tracking-[0.18em] sm:text-[13px]"
          >
            Vem trocar uma ideia com a gente
          </motion.a>
        )}
      </div>

      {/* rodapé da hero, preso na base: tags (revelam após a 1ª escrita) + scroll */}
      <div className="flex shrink-0 flex-col gap-5 px-6 pb-9 sm:px-14 sm:pb-12">
        <div className="h-px bg-ash/50" />
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <motion.ul
            initial={false}
            animate={revealed ? "shown" : "hidden"}
            variants={{
              hidden: {},
              shown: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
            }}
            className="flex flex-wrap gap-x-6 gap-y-1.5 text-[11px] uppercase tracking-[0.14em] text-ghost/60 sm:text-xs"
          >
            {TAGS.map((tag) => (
              <motion.li
                key={tag}
                variants={{ hidden: hiddenTag, shown: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              >
                &gt;&gt; {tag}
              </motion.li>
            ))}
          </motion.ul>

          <div className="flex shrink-0 items-center gap-[10px] text-xs uppercase tracking-[0.14em] text-ghost/55">
            <span className="relative h-[38px] w-px overflow-hidden bg-ash">
              <span className="absolute inset-x-0 top-[-100%] h-full animate-scroll-drip bg-ghost motion-reduce:top-0 motion-reduce:animate-none" />
            </span>
            Scroll
          </div>
        </div>
      </div>
    </div>
  );
}
