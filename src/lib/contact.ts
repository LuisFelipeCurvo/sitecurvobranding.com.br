/** Número de WhatsApp da Curvo (mesmo do rodapé do site). */
export const WHATSAPP_PHONE = "5565996853891";

/** WhatsApp da Curvo (mesmo número do rodapé do site atual) — destino de todos
 *  os CTAs do site. */
export const WHATSAPP_URL = buildWhatsappUrl(
  "Olá, Quero entender melhor como funciona.",
);

/** Monta um link wa.me com uma mensagem pré-preenchida pro número da Curvo. */
export function buildWhatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}
