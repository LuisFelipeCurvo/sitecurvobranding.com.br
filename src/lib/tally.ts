import { WHATSAPP_URL } from "@/lib/contact";

/** ID do formulário em tally.so/r/<id> — usado pra todos os CTAs de contato. */
export const TALLY_FORM_ID = "w2GoVA";

declare global {
  interface Window {
    Tally?: {
      openPopup: (
        formId: string,
        options?: {
          layout?: "default" | "modal";
          onSubmit?: () => void;
          [key: string]: unknown;
        },
      ) => void;
    };
  }
}

/**
 * Abre o formulário do Tally num popup; quando a pessoa envia, redireciona
 * pro WhatsApp (em vez de ir direto pro WhatsApp como os CTAs faziam antes).
 * O script do Tally (`widgets/embed.js`) é carregado globalmente no layout.
 */
export function openContactForm() {
  window.Tally?.openPopup(TALLY_FORM_ID, {
    layout: "modal",
    onSubmit: () => {
      window.location.href = WHATSAPP_URL;
    },
  });
}
