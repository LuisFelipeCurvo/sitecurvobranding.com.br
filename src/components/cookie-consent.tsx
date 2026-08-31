"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const STORAGE_KEY = "curvo-cookie-consent";
const CLARITY_ID = "y9sekz06xv";

type Consent = "accepted" | "rejected" | null;

/**
 * Aviso de cookies (LGPD). O Vercel Analytics/Speed Insights é sem cookie e
 * segue sempre ligado (layout.tsx). O **Microsoft Clarity** (grava sessão, usa
 * cookie) só carrega DEPOIS do "Aceitar" — é o que este componente controla.
 * A escolha fica no `localStorage`; enquanto não escolher, a faixa aparece.
 */
export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stored: Consent = null;
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "accepted" || v === "rejected") stored = v;
    } catch {
      /* localStorage indisponível — trata como sem escolha */
    }
    setConsent(stored);
    setReady(true);
  }, []);

  function choose(value: "accepted" | "rejected") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignora */
    }
    setConsent(value);
  }

  return (
    <>
      {consent === "accepted" && (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");`}
        </Script>
      )}

      {ready && consent === null && (
        <div
          role="dialog"
          aria-label="Aviso de cookies"
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-ash/25 bg-obsidian"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-14">
            <p className="text-xs leading-[1.6] text-ghost/75 sm:text-[13px]">
              Usamos cookies pra entender como as pessoas navegam no site e
              melhorar a experiência.{" "}
              <a
                href="/privacidade"
                className="underline underline-offset-2 transition-colors hover:text-ghost"
              >
                Política de privacidade
              </a>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => choose("rejected")}
                className="border border-ash/40 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-ghost transition-colors hover:border-ghost"
              >
                Recusar
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="bg-ghost px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-obsidian transition-opacity hover:opacity-90"
              >
                Aceitar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
