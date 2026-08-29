"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";

interface Step {
  tag: string;
  title: string[];
  body: string[];
  cta: string;
  image: string;
  /** índices de parágrafos que ficam inteiros em SemiBold */
  boldParagraphs?: number[];
  /** trecho inicial de um parágrafo em SemiBold (o resto segue Regular) */
  boldLeadIn?: string;
}

const STEPS: Step[] = [
  {
    tag: "Estratégia de Negócio",
    title: ["Modelagem de negócio", "+ Lentes de futuro"],
    body: [
      "Antes de pensar em marca, a gente entende o raciocínio por trás dela: formas de monetização, recursos chave, canais de distribuição e por aí vai.",
      "Esta fase é onde investigamos o modelo de negócio com uma lupa crítica e lentes de futuro.",
      "Questionamos o óbvio, mapeamos oportunidades invisíveis, tensionamos futuros e redesenhamos a engrenagem para que ela seja viável, escalável ou não, mas com consciência — e viva.",
      "Pra quê? Pra buscar a geração de uma receita financeira mais eficiente. Não acreditamos em estratégias genéricas.",
      "Cada projeto é uma engenharia sob medida entre valor percebido, estrutura interna, posicionamento de mercado e comportamento do público.",
      "Aqui, definimos o que realmente é viável, desejável e sustentável do ponto de vista de negócio.",
      "E se não for, a gente resolve antes que entre no mercado.",
    ],
    boldLeadIn:
      "Antes de pensar em marca, a gente entende o raciocínio por trás dela",
    cta: "Me conta o que está pensando :)",
    image: "/workflow/step-1.svg",
  },
  {
    tag: "Design de Marcas",
    title: ["Posicionamento", "+ Design de marcas"],
    body: [
      "Não criamos “só logotipos”. Criamos lógica, linguagem e lugar.",
      "Pra gente, design de marca é sobre dar forma ao pensamento estratégico do negócio.",
      "Criamos nomes que refletem o posicionamento, identidade visual, verbal, todos os pontos de contato que realmente são relevantes, etc., etc., etc. e ações que, provavelmente, ainda nem foram inventadas.",
      "Mas antes de tudo isso, mapeamos a essência, o mercado, os desejos, os ruídos e os silêncios.",
      "Nosso design não é “um tchan”.",
      "É engenharia emocional.",
      "É a síntese entre diferenciação e coerência.",
      "É um sistema vivo que conecta design com estratégia, comportamento com negócio, futuro com agora.",
      "Acredite: se parece simples, é porque deu um trabalho danado!",
    ],
    boldParagraphs: [0, 5, 8],
    cta: "Crie sua marca",
    image: "/workflow/step-2.svg",
  },
  {
    tag: "Comunicação",
    title: ["Comunicação estratégica"],
    body: [
      "Do digital ao offline. Do orgânico ao pago.",
      "A comunicação é o pulmão da marca. Se não respira com o mundo, asfixia.",
      "E cá pra nós que vivemos uma era de infoxicação, certo?",
      "Estamos intoxicados de informação e buscar relevância dentro disso tudo é um grande desafio.",
      "Por isso, criamos sistemas de comunicação que conectam estratégia, contexto e cultura.",
      "Nosso foco está em construir narrativas verdadeiras que atravessam plataformas e permanecem consistentes.",
      "Estratégias para mídias digitais, campanhas, roteiros, pautas, ações, ativações, fluxos, jornadas em qualquer formato: tudo nasce de um mesmo lugar: um posicionamento claro.",
      "E tudo converge para um mesmo fim: relevância.",
    ],
    boldParagraphs: [0, 7],
    cta: "Vamos por em prática?",
    image: "/workflow/step-3.svg",
  },
  {
    tag: "Tecnologias Emergentes",
    title: ["Tecnologias emergentes"],
    body: [
      "Contra a obsolescência dos modelos de negócio.",
      "Tecnologia, pra gente, não é “departamento”.",
      "É um eixo estratégico capaz de evitar que um negócio já nasça defasado.",
      "Antes de pensar em produto, serviço, formato ou canal, olhamos para o sistema por trás: como esse modelo opera?",
      "Ele é escalável? Como? Não é? O que pode ser automatizado, integrado, previsto ou transformado?",
      "Nossa fase de Tecnologias Emergentes atua como um radar colocando sua marca no circuito, detectando gargalos invisíveis, oportunidades latentes e lógicas ultrapassadas.",
      "Usamos IA, Data Science, criamos apps, automações e plataformas para reconfigurar o negócio com inteligência e elasticidade. Mas não pelo hype e sim pela ressonância.",
      "Porque inovação de verdade não é colocar uma “buzzword” no “pitch”.",
      "É evitar que o mercado te ultrapasse no segundo trimestre.",
      "É sobre continuar fazendo sentido, mesmo quando tudo muda.",
    ],
    boldParagraphs: [0, 8],
    cta: "Chama que eu te explico :)",
    image: "/workflow/step-4.svg",
  },
];

const COUNT = STEPS.length;

/**
 * "Entenda o nosso workflow" — acordeão pinado (2026-08-27, pedido do usuário
 * via print). A seção trava na tela e o scroll faz o scrub pelas 4 etapas: os
 * 4 cabeçalhos ficam sempre empilhados e visíveis; só a etapa ativa abre
 * (título + corpo + ilustração), as outras ficam recolhidas. Ao rolar, a atual
 * fecha e a próxima abre.
 *
 * `prefers-reduced-motion`: sem pin, sem scrub — todas as etapas abertas,
 * empilhadas, estáticas (fluxo normal).
 */
export function Workflow() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActiveIndex(Math.min(COUNT - 1, Math.max(0, Math.floor(p * COUNT))));
  });

  if (reduceMotion) {
    return (
      <section
        id="o-que-fazemos"
        className="relative z-[45] bg-obsidian px-6 pb-32 pt-28 sm:px-14 sm:pb-40 sm:pt-36"
      >
        <Eyebrow />
        <ol className="border-t border-ash/25">
          {STEPS.map((step, i) => (
            <AccordionStep key={step.tag} step={step} index={i} open reduced />
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section
      id="o-que-fazemos"
      ref={sectionRef}
      style={{ height: `${COUNT * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 z-[45] grid h-screen grid-rows-[auto_1fr] overflow-hidden bg-obsidian px-6 pb-[4vh] pt-[7vh] sm:px-14 sm:pt-[9vh]">
        <Eyebrow />
        {/* rola internamente só se a etapa aberta não couber (raro; etapas
            longas no mobile) — no desktop cabe e nunca aparece scrollbar */}
        <div className="min-h-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ol className="flex min-h-full flex-col justify-center border-t border-ash/25">
            {STEPS.map((step, i) => (
              <AccordionStep
                key={step.tag}
                step={step}
                index={i}
                open={i === activeIndex}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Eyebrow() {
  return (
    <header className="mb-8 shrink-0 sm:mb-12">
      <p className="mb-3 text-xs uppercase tracking-[0.16em] text-ash">
        &gt;&gt; Processo
      </p>
      <h2 className="text-[clamp(26px,4vw,42px)] font-medium uppercase leading-[1] tracking-[-0.02em]">
        Entenda o nosso workflow
      </h2>
    </header>
  );
}

function AccordionStep({
  step,
  index,
  open,
  reduced = false,
}: {
  step: Step;
  index: number;
  open: boolean;
  reduced?: boolean;
}) {
  return (
    <li className="border-b border-ash/25">
      {/* cabeçalho — sempre visível */}
      <div className="flex items-center gap-4 py-4 sm:py-5">
        <motion.span
          className="flex shrink-0"
          animate={reduced ? undefined : { rotate: open ? 0 : -90 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          <ArrowDown className="size-5 sm:size-6" strokeWidth={1.25} />
        </motion.span>
        <span
          className={`text-xs uppercase tracking-[0.16em] transition-colors duration-300 sm:text-[13px] ${
            open ? "text-ghost" : "text-ash"
          }`}
        >
          {step.tag}
        </span>
        <span className="ml-auto font-mono text-[11px] tabular-nums text-ash/70">
          {String(index + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
        </span>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-8 md:grid-cols-[1fr_minmax(0,0.72fr)] md:gap-12">
              <div className="min-w-0">
                <h3 className="text-[clamp(19px,2.6vw,26px)] font-medium uppercase leading-[1.1] tracking-[-0.01em]">
                  {step.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>

                <div className="mt-4 max-w-[58ch] space-y-2.5 text-[13px] leading-[1.5] text-ghost/75">
                  {step.body.map((p, pi) => {
                    const whole = step.boldParagraphs?.includes(pi);
                    const lead =
                      step.boldLeadIn && p.startsWith(step.boldLeadIn)
                        ? step.boldLeadIn
                        : null;
                    return (
                      <p key={pi}>
                        {whole ? (
                          <strong className="font-semibold text-ghost">
                            {p}
                          </strong>
                        ) : lead ? (
                          <>
                            <strong className="font-semibold text-ghost">
                              {lead}
                            </strong>
                            {p.slice(lead.length)}
                          </>
                        ) : (
                          p
                        )}
                      </p>
                    );
                  })}
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-5 inline-flex items-center gap-2 py-2 text-xs uppercase tracking-[0.16em] text-ghost"
                >
                  <span className="border-b border-ghost/40 pb-1 transition-colors group-hover:border-ghost">
                    {step.cta}
                  </span>
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.25}
                  />
                </a>
              </div>

              {/* ilustração — escondida no mobile */}
              <div className="hidden self-start md:block">
                <img
                  src={step.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="w-full max-w-[300px] [filter:brightness(0)]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
