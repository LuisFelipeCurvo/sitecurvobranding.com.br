"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Headline da hero com efeito máquina de escrever.
 *
 * "Construímos as marcas mais" fica FIXO desde o load. Depois que a headline
 * faz o fade-in, "f*das e estruturadas do mercado" é digitado caractere por
 * caractere, segura ~2s cheio, apaga, e redigita — em loop. O cursor `|`
 * pisca durante e depois.
 *
 * `onFirstComplete` dispara UMA vez, quando a primeira escrita termina — a hero
 * usa isso pra revelar as tags no rodapé.
 *
 * Layout (2026-08-27): headline **centralizada na tela** (vertical + horizontal)
 * e com o texto **alinhado ao centro**, em três linhas com quebra fixa:
 *   linha 1 (fixa):     CONSTRUÍMOS AS MARCAS MAIS
 *   linha 2 (digitada): F*DAS E ESTRUTURADAS
 *   linha 3 (digitada): DO MERCADO
 * O `<br>` entra quando a digitação passa de "estruturadas" — "DO" nunca fica
 * sozinho no fim da linha 2. Em tela bem estreita cada linha ainda pode quebrar
 * sozinha; a fonte só reduz por `clamp`.
 *
 * Uma camada "fantasma" (texto completo, `invisible`) reserva a altura das 3
 * linhas; a camada visível é `absolute top-0`. Assim a headline NÃO encolhe ao
 * apagar — a 1ª linha fica imóvel e o botão do Hero logo abaixo não sobe/desce.
 *
 * `prefers-reduced-motion`: mostra a frase inteira, estática, sem cursor.
 */

const STATIC_TEXT = "Construímos as marcas mais";
const TYPED_LINE_1 = "f*das e estruturadas";
const TYPED_LINE_2 = "do mercado";
// string única usada pelo loop de digitação e pelo aria-label; o render abaixo
// insere a quebra entre as duas metades
const TYPED_TEXT = `${TYPED_LINE_1} ${TYPED_LINE_2}`;

const TYPE_MS = 70;
const DELETE_MS = 40;
const HOLD_FULL_MS = 2000;
const HOLD_EMPTY_MS = 550;
const START_DELAY_MS = 800; // deixa o fade-in da headline terminar antes de digitar

export function TypewriterHeadline({
  onFirstComplete,
}: {
  onFirstComplete?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState("");

  // ref pattern: mantém o callback fresco sem re-disparar o efeito (e reiniciar
  // o typewriter) toda vez que o pai re-renderiza
  const onFirstCompleteRef = useRef(onFirstComplete);
  onFirstCompleteRef.current = onFirstComplete;

  useEffect(() => {
    const firstDone = { fired: false };
    const fireFirst = () => {
      if (!firstDone.fired) {
        firstDone.fired = true;
        onFirstCompleteRef.current?.();
      }
    };

    if (reduceMotion) {
      setTyped(TYPED_TEXT);
      fireFirst();
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    (async () => {
      await wait(START_DELAY_MS);
      let firstPass = true;
      while (!cancelled) {
        for (let i = 1; i <= TYPED_TEXT.length; i++) {
          if (cancelled) return;
          setTyped(TYPED_TEXT.slice(0, i));
          await wait(TYPE_MS);
        }
        if (firstPass) {
          fireFirst();
          firstPass = false;
        }
        await wait(HOLD_FULL_MS);
        for (let i = TYPED_TEXT.length - 1; i >= 0; i--) {
          if (cancelled) return;
          setTyped(TYPED_TEXT.slice(0, i));
          await wait(DELETE_MS);
        }
        await wait(HOLD_EMPTY_MS);
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reduceMotion]);

  return (
    <motion.h1
      aria-label={`${STATIC_TEXT} ${TYPED_TEXT}`}
      className="relative mx-auto max-w-[100rem] text-center text-[clamp(38px,5vw,64px)] font-medium uppercase leading-[0.98] tracking-[-0.03em]"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* camada fantasma — reserva a altura das 3 linhas cheias (5 no mobile,
          onde a linha 1 e a "estruturadas" quebram). Trava a altura da headline
          pra digitar/apagar não empurrar o botão que vem abaixo. */}
      <span aria-hidden className="invisible block">
        {STATIC_TEXT}
        <br />
        {TYPED_LINE_1}
        <br />
        {TYPED_LINE_2}
      </span>

      {/* camada visível — ancorada no topo do bloco reservado */}
      <span aria-hidden className="absolute inset-x-0 top-0 block">
        {/* linha 1 — fixa. text-balance evita órfã quando ela quebra */}
        <span className="block text-balance">{STATIC_TEXT}</span>
        <span className="block">
          {reduceMotion ? (
            <>
              {TYPED_LINE_1}
              <br />
              {TYPED_LINE_2}
            </>
          ) : typed.length <= TYPED_LINE_1.length ? (
            <>
              {typed}
              <Caret />
            </>
          ) : (
            <>
              {typed.slice(0, TYPED_LINE_1.length)}
              <br />
              {typed.slice(TYPED_LINE_1.length + 1)}
              <Caret />
            </>
          )}
        </span>
      </span>
    </motion.h1>
  );
}

function Caret() {
  return (
    <span
      aria-hidden
      className="ml-[0.04em] inline-block h-[0.74em] w-[0.05em] translate-y-[0.08em] animate-caret-blink bg-ghost align-baseline motion-reduce:hidden"
    />
  );
}
