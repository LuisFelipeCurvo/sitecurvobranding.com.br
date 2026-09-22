/** Nome do evento usado pra abrir o modal de contato (ver contact-form-modal.tsx). */
const OPEN_EVENT = "curvo:open-contact-form";

/**
 * Abre o modal de contato (formulário próprio, sem depender de serviço
 * externo). O modal fica montado uma vez em layout.tsx e escuta esse evento.
 */
export function openContactForm() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenContactForm(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}

/** Estágio atual do negócio/marca da pessoa — mesmas opções do form antigo. */
export const STAGE_OPTIONS = [
  { value: "comecando", label: "Estou começando agora" },
  { value: "1-ano", label: "Tenho operação há mais de 1 ano" },
  { value: "1-5-anos", label: "Tenho operação entre 1 e 5 anos" },
  { value: "5-anos", label: "Meu negócio já tem mais de 5 anos" },
] as const;

/** Expectativa de faturamento pros próximos 12 meses — mesmas opções do form antigo. */
export const REVENUE_OPTIONS = [
  { value: "ate-1mi", label: "Até R$1 milhão" },
  { value: "1-5mi", label: "De 1 até R$5 milhões" },
  { value: "5-10mi", label: "De 5 até R$10 milhões" },
  { value: "10-20mi", label: "De 10 até R$20 milhões" },
  { value: "acima-20mi", label: "Acima de 20 milhões" },
] as const;
