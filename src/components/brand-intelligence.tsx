"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";

const PARAGRAPHS = [
  "Os negócios crescem mais rápido e de forma mais inteligente quando partem de um bom posicionamento e de uma base bem construída.",
  "E sinceramente, todas as marcas pensadas hoje precisam se plugar à inovação, à clareza e ao design. Não estamos falando em serem super disruptivas, futuristas, criativóides, não!",
  "Defendemos que gestores que sabem exatamente o que estão construindo, onde estão e conhecem o seu futuro desejável, tomam decisões com mais assertividade.",
  "É por isso que estamos aqui.",
  "A Curvo Branding existe para traduzir os ideais de empresários ambiciosos que ousam construir algo maior do que eles próprios com inteligência de marca.",
  "Cada decisão e investimento deve trabalhar em uma mesma direção, transformando tempo e esforço em avanço real.",
  "Nossa proposta vai (muito) além de um nome, logotipo ou identidade visual: entregamos um “Ponto B”: um lugar claro onde sua marca deve se posicionar no mercado na direção do seu futuro desejável.",
  "Nossa pensadoria e nossa fazedoria agem juntas para te levar até lá.",
];

/**
 * "Inteligência de marca" — bloco de manifesto entre os Cases e o Workflow
 * (content.md, "Seção — Inteligência de Marca"). Texto à esquerda, 3 fotos à
 * direita (placeholder por enquanto — arranjo real quando as fotos chegarem).
 * Fluxo normal com fade-in ao entrar; nada de pin.
 */
export function BrandIntelligence() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="por-que-fazemos"
      className="relative overflow-hidden px-6 py-28 sm:px-14 sm:py-40"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={
          reduceMotion ? undefined : { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
        }
        className="grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16 lg:gap-20"
      >
        {/* texto — esquerda. Plate branco (`bg-obsidian`) atrás só do texto pra a
            constelação seguir aparecendo na seção mas não cruzar as letras.
            O `-m` cancela o `p` pra não empurrar o layout do grid. */}
        <div className="relative z-[45] max-w-[46ch] bg-obsidian p-5 -m-5 sm:p-7 sm:-m-7">
          <p className="mb-4 text-xs uppercase tracking-[0.16em] text-ash">
            &gt;&gt; Por que fazemos
          </p>
          <h2 className="text-[clamp(30px,4.6vw,52px)] font-medium uppercase leading-[1] tracking-[-0.02em]">
            Inteligência
            <br />
            de marca
          </h2>

          <div className="mt-8 space-y-5 text-base leading-[1.6] text-ghost/75 sm:text-[17px]">
            {PARAGRAPHS.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-9 inline-flex items-center gap-2 py-2 text-xs uppercase tracking-[0.16em] text-ghost"
          >
            <span className="border-b border-ghost/40 pb-1 transition-colors group-hover:border-ghost">
              Vem trocar uma ideia com a gente
            </span>
            <ArrowUpRight
              className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.25}
            />
          </a>
        </div>

        {/* fotos — direita. Recortes P&B em fundo transparente: sentam direto no
            branco, sem moldura (bar.md — "fotografia sangrando o frame"). As
            duas espelhadas (`-scale-x-100`); o João "sai" pela beirada direita
            da tela (`translate-x` + `-mr` quebrando o padding + section
            `overflow-hidden`). Sticky no desktop enquanto o texto rola. */}
        <div className="-mr-6 flex items-end justify-end gap-0 self-start sm:-mr-14 sm:gap-2 md:sticky md:top-20">
          <Image
            src="/brand/founders.png"
            alt="Luis e Carola, sócios da Curvo Branding"
            width={1204}
            height={1920}
            sizes="(max-width: 768px) 52vw, 340px"
            className="w-[54%] shrink-0 -scale-x-100 md:w-[260px] lg:w-[340px]"
          />
          <Image
            src="/brand/joao.png"
            alt="João, da Curvo Branding"
            width={1432}
            height={1920}
            sizes="(max-width: 768px) 40vw, 210px"
            className="w-[40%] shrink-0 translate-x-[10%] -scale-x-100 md:w-[175px] md:translate-x-[18%] lg:w-[215px]"
          />
        </div>
      </motion.div>
    </section>
  );
}
