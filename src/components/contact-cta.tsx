"use client";

import { ArrowUpRight } from "lucide-react";
import { openContactForm } from "@/lib/tally";

/**
 * CTA padrão do site ("texto sublinhado + seta") — usado em Inteligência de
 * Marca, cada passo do Workflow e nas páginas de case. Abre o formulário do
 * Tally em vez de ir direto pro WhatsApp (ver src/lib/tally.ts).
 */
export function ContactCta({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={openContactForm}
      className={`group inline-flex items-center gap-2 py-2 text-xs uppercase tracking-[0.16em] text-ghost ${className}`}
    >
      <span className="border-b border-ghost/40 pb-1 transition-colors group-hover:border-ghost">
        {children}
      </span>
      <ArrowUpRight
        className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={1.25}
      />
    </button>
  );
}
