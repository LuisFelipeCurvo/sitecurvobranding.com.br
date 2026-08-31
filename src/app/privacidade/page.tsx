import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como o site da Curvo Branding coleta e usa dados de navegação, quais cookies utiliza e quais são os seus direitos sob a LGPD.",
  alternates: { canonical: "/privacidade" },
};

const UPDATED = "29 de agosto de 2026";

export default function PrivacidadePage() {
  return (
    <main className="relative z-[45] min-h-screen bg-obsidian px-6 pb-32 pt-24 sm:px-14 sm:pt-32">
      <div className="mx-auto max-w-[68ch]">
        <Link
          href="/"
          className="group mb-12 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-ash transition-colors hover:text-ghost"
        >
          <ArrowLeft
            className="size-4 transition-transform group-hover:-translate-x-0.5"
            strokeWidth={1.25}
          />
          Voltar
        </Link>

        <p className="mb-3 text-xs uppercase tracking-[0.16em] text-ash">
          &gt;&gt; Privacidade
        </p>
        <h1 className="text-[clamp(28px,4.6vw,44px)] font-medium uppercase leading-[1.05] tracking-[-0.02em]">
          Política de privacidade
        </h1>
        <p className="mt-4 text-xs uppercase tracking-[0.14em] text-ash">
          Atualizada em {UPDATED}
        </p>

        <div className="mt-12 space-y-8 text-[15px] leading-[1.7] text-ghost/80">
          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-ghost">
              Quem é responsável
            </h2>
            <p>
              Este site é operado pela <strong className="text-ghost">Curvo
              Branding</strong>, com sede na Av. Isaac Póvoas, 546 — Goiabeiras,
              Cuiabá — MT, 78032-015. Para qualquer assunto relacionado aos seus
              dados, fale com a gente pelo{" "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-ghost"
              >
                WhatsApp
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-ghost">
              O que coletamos
            </h2>
            <p>
              <strong className="text-ghost">Dados de navegação (anônimos):</strong>{" "}
              páginas visitadas, tempo na página, tipo de dispositivo, navegador,
              localização aproximada (cidade/país) e de onde você chegou ao site.
              Não usamos esses dados para identificar você pessoalmente.
            </p>
            <p>
              <strong className="text-ghost">Dados que você envia:</strong> se
              você nos contatar pelo WhatsApp, ficamos com o que você mandar na
              conversa (nome, mensagem, o que for). O site em si não tem
              formulário e não coleta e-mail, telefone ou documento.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-ghost">
              Cookies e ferramentas de medição
            </h2>
            <ul className="space-y-3">
              <li>
                <strong className="text-ghost">Vercel Analytics e Speed
                Insights</strong> — medem visitas e velocidade do site de forma
                agregada. <em>Não usam cookies</em> e não guardam identificador
                permanente. Ficam sempre ativos.
              </li>
              <li>
                <strong className="text-ghost">Microsoft Clarity</strong> — grava
                a sessão de navegação (movimento do mouse, cliques, rolagem) e
                monta mapas de calor, para a gente entender onde melhorar o site.
                Usa cookies. <em>Só é carregado se você clicar em
                &ldquo;Aceitar&rdquo;</em> no aviso de cookies.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-ghost">
              Por que usamos (base legal)
            </h2>
            <p>
              As medições anônimas se apoiam no <strong className="text-ghost">
              legítimo interesse</strong> de manter e melhorar o site. A gravação
              de sessão pelo Clarity só acontece com o seu{" "}
              <strong className="text-ghost">consentimento</strong>, que você dá
              (ou não) no aviso de cookies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-ghost">
              Com quem compartilhamos
            </h2>
            <p>
              Apenas com os provedores das ferramentas acima (Vercel e Microsoft),
              que processam os dados em nosso nome. Não vendemos nem cedemos seus
              dados para terceiros.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-ghost">
              Seus direitos (LGPD)
            </h2>
            <p>
              Você pode pedir acesso, correção, exclusão ou portabilidade dos seus
              dados, e retirar o consentimento a qualquer momento. Para isso, é só
              nos chamar no{" "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-ghost"
              >
                WhatsApp
              </a>
              .
            </p>
            <p>
              Para <strong className="text-ghost">mudar sua escolha de
              cookies</strong>: apague os dados deste site no seu navegador — o
              aviso volta a aparecer na próxima visita.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-ghost">
              Mudanças nesta política
            </h2>
            <p>
              Se algo mudar na forma como tratamos os dados, atualizamos esta
              página e a data no topo.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
