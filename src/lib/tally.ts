import { WHATSAPP_NUMBER } from "@/lib/contact";

/** ID do formulário em tally.so/r/<id> — usado pra todos os CTAs de contato. */
export const TALLY_FORM_ID = "w2GoVA";

type TallySubmission = {
  fields?: { title?: string; type?: string; answer?: { value?: unknown } }[];
};

declare global {
  interface Window {
    Tally?: {
      openPopup: (
        formId: string,
        options?: {
          layout?: "default" | "modal";
          onSubmit?: (payload: TallySubmission) => void;
          [key: string]: unknown;
        },
      ) => void;
    };
  }
}

/** Vira texto legível qualquer formato de resposta do Tally (texto, número,
 *  lista de opções). */
function answerText(value: unknown): string {
  if (value == null) return "";
  if (Array.isArray(value)) return value.map(answerText).filter(Boolean).join(", ");
  if (typeof value === "object") {
    const v = value as { text?: unknown; name?: unknown };
    return String(v.text ?? v.name ?? "");
  }
  return String(value);
}

/** Monta a primeira mensagem do WhatsApp com as respostas do formulário, pra
 *  conversa já começar com o contexto do lead. */
export function whatsappUrlFromSubmission(payload?: TallySubmission): string {
  const lines = (payload?.fields ?? [])
    .filter((f) => f.type !== "HIDDEN_FIELDS")
    .map((f) => [f.title?.trim(), answerText(f.answer?.value).trim()])
    .filter(([title, answer]) => title && answer)
    .map(([title, answer]) => `*${title}*\n${answer}`);
  const text = [
    "Olá! Acabei de preencher o formulário no site da Curvo.",
    ...lines,
  ].join("\n\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Abre o formulário do Tally num popup; quando a pessoa envia, redireciona
 * pro WhatsApp já com as respostas na mensagem (em vez de ir direto pro WhatsApp como os CTAs faziam antes).
 * O script do Tally (`widgets/embed.js`) é carregado globalmente no layout.
 */
export function openContactForm() {
  window.Tally?.openPopup(TALLY_FORM_ID, {
    layout: "modal",
    onSubmit: (payload) => {
      window.location.href = whatsappUrlFromSubmission(payload);
    },
  });
}
