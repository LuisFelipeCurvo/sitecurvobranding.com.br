# Design System — Curvo Branding (redesign)

> **Stack (2026-08-26):** migrado de HTML/CSS/JS puro para Next.js (App Router)
> + TypeScript + Tailwind CSS v4 + shadcn/ui + framer-motion, a pedido do
> usuário para suportar o carrossel de clientes (drag/arrows via framer-motion).
> Tokens de cor abaixo vivem em `src/app/globals.css` como CSS variables
> (`--obsidian`, `--ash`, `--ghost`, `--coral`), mapeadas para classes Tailwind
> `bg-obsidian`, `text-ash`, etc. via `@theme inline`.

> **INVERTIDO (2026-08-27):** o usuário pediu pra inverter as cores do site —
> **fundo branco, texto preto**, mesh/traços pretos, **coral inalterado**. Feito
> pelo caminho mais barato: os valores de `--obsidian` e `--ghost` foram
> **trocados** em `globals.css` (`--obsidian: #fff` é o fundo, `--ghost: #000` é
> o texto). Os nomes dos tokens ficaram o oposto do que dizem — não confie no
> nome, confie no papel. Tudo que usa `bg-obsidian` / `text-ghost` / `bg-ghost`
> inverteu sozinho. A direção "midnight gallery" abaixo continua válida em
> estrutura/tipografia/motivos — só o preto e o branco trocaram de lugar.

> v2 — substitui a v1 inteira. Pivô de direção decidido em 2026-08-26: o usuário
> rejeitou a linha "coral + violeta em bloco" e pediu a adoção da referência
> **"Minimal Collective" (gallery wall)** — um tom só (preto **ou** branco, ver
> nota de inversão acima), tipografia com contraste de peso, zero cor crominática
> exceto o "+" coral do wordmark, com o motivo de constelação animado. Este é o
> arquivo que o "system critic" usa.

## Cores

> Valores abaixo são o **papel**, não o hex literal (que inverteu — ver nota no topo).

| Token | Papel | Hex atual (invertido) |
|------|-------|------|
| `--obsidian` | **Fundo** da página | `#FFFFFF` (branco) |
| `--ghost` | **Texto** primário, títulos, hairlines, o traço do wordmark | `#000000` (preto) |
| `--ash` `#5A5A5A` | Único cinza médio: divisores, bordas, labels/contadores secundários. (Inalterado — funciona nos dois fundos.) |  |
| `--coral` `#FC635B` | **Única exceção cromática.** Uso exclusivo: o "+" do wordmark. **Inalterado na inversão.** Não aparece em mais nada. |  |

- **Constelação / "traços":** pretos (`MESH_RGB = "0,0,0"`, `FIELD_OPACITY 0.34`),
  sobre o fundo branco. As ilustrações do workflow também são preto puro
  (`filter: brightness(0)`).
- **Botão sólido do hero:** inverteu junto — agora **fundo preto, texto branco**
  (segue `bg-ghost` / `text-obsidian`).

**Violeta (`#6755D1`) foi descontinuado nesta direção.** O estado ativo de navegação
e qualquer outro acento que antes usava violeta agora usa branco/ash (hairline,
ghost pill, ou peso de texto) — a regra da nova referência é "strictly black, ash,
and white" além da única exceção de marca acima.

## Tipografia

> **v3 (2026-08-27):** adotada a **Optika** (geométrica minimalista) como fonte
> única de todo o site — substitui a pilha Helvetica Neue. `next/font/local`
> (`src/app/fonts.ts`, arquivos `.otf` em `src/app/fonts/`), exposta via
> `--font-optika` → `--font-sans`. A regra antiga "peso 400 único, nunca bold"
> **caiu**: agora há contraste de peso.

**Escala de pesos** (só estes 4 carregados — Light/Bold/itálicos não são usados):

| Peso | Papel |
|------|-------|
| **Regular 400** | corpo, nav, tags, labels, CTAs, contadores — o padrão de tudo |
| **Medium 500** | **todos os títulos grandes** — headline do hero, `h2` de seção ("ENTENDA O NOSSO WORKFLOW", "+1000 MARCAS"), `h3` das etapas do workflow |
| **SemiBold 600** | **frases em destaque no corpo do workflow** (`<strong>`, em branco cheio) — ver `boldParagraphs` / `boldLeadIn` em `Workflow` |
| **Black 900** | **exclusivo do wordmark** "CURVO + BRANDING" (o "super bold" da foto). O "+" segue coral. |

- Optika é mais aberta/geométrica que a Helvetica — o tracking negativo dos
  títulos foi afrouxado (de `~-0.045em` pra `~-0.02/-0.03em`).
- Corpo: line-height ~1.43–1.5, sem tracking.
- Caixa alta reservada para nav, tags/badges, labels e títulos — não para corpo.

### Escala
| Papel | Tamanho | Line-height | Tracking |
|-------|---------|-------------|----------|
| caption | 14px | 1.43 | 0 |
| body | 16px | 1.43 | 0 |
| subheading | 18px | 1.2 | -0.36px |
| heading-sm | 23px | 1.2 | -0.67px |
| heading | 27px | 1.2 | -0.86px |
| heading-lg | 32px | 1.0 | -1.18px |
| display | 50px | 1.0 | -2.2px |
| display-xl | 77px | 0.9 | -4.31px |

## Espaçamento

Escala: 5, 6, 7, 9, 14, 18, 45, 54, 144, 173, 216px.
Gap entre seções grandes: 144–173px. Padding de card: 18px. Gap entre elementos: 14px.

## Raio e elevação

- Cards, imagens: `0px` — nunca arredondado.
- Badges/pills, botões: `4.5px` — única exceção arredondada do sistema.
- **Zero sombra, zero glow, zero elevação.** Relação espacial vem de sobreposição
  (overlap de 10–30px entre imagens) e posição, nunca de shadow/tint de superfície.

## Motivos visuais (herdados do site atual — preservar, agora em monocromático)

1. **Wordmark "CURVO + BRANDING"**, branco sobre preto, Optika Black, em duas
   linhas: `CURVO +` / `BRANDING` (o "+" coral fica ao lado de CURVO, não de
   BRANDING).
2. **Motivo de constelação — "infestação"** (v4, 2026-08-27: o usuário pediu que
   a malha "infestasse o site inteiro como um vírus" e depois, a partir da
   referência 21st.dev "constellation-field", que fosse **coral** com os efeitos
   dela). É **um único campo denso, fixo ao viewport, por cima de todo o
   conteúdo** (`ConstellationCanvas` mora no `layout.tsx`, `position: fixed`,
   `z-40`, `pointer-events-none`).
   - **Cor**: nós **e** linhas em ash `#5A5A5A` (constante `MESH_RGB`) — malha
     100% monocromática (o usuário reverteu o coral dos nós em 2026-08-27).
     Opacidade global do canvas `~0.58` (constante `FIELD_OPACITY` — único botão
     de "quão infestado").
   - **Efeitos portados da referência** (nativos, sem iframe/CDN): nós pulsam
     (seno) e têm halo suave (`r·2.4` em alpha baixo) → "respiram"/brilham;
     alpha das linhas `0.22 → ~0.77` conforme a proximidade; nós quicam nas
     bordas (não dão wrap).
   - **Pointer gravity sutil**: nós no anel entre `POINTER_INNER 70px` e
     `POINTER_RADIUS 200px` do cursor são levemente puxados (`POINTER_PULL
     0.0022`) — juntam **um pouco**, nunca colapsam num nó (dentro de 70px não
     há força). Só age enquanto o mouse se move; parou, relaxa de volta.
     (Revisão da decisão anterior de "só scroll".)
   - **Boost de scroll** (nosso, mantido): a velocidade do drift cresce com a
     velocidade de rolagem e decai de volta ao drift base.
   - **Cobre o texto**: renderiza **na frente** do conteúdo. Legível por
     construção — dissolve contra texto/headline brancos e "aparece" contra as
     áreas pretas. Requisito: pode passar por cima da escrita, mas o conteúdo
     continua legível.
   - **Contínuo, sem costura**: fixo ao viewport → a página inteira rola por
     baixo de uma malha só (mesmo campo no Hero, nos pilares e no footer).
   - **Densidade**: `count = clamp(round(w·h / 18000), 40, 95)` (~40 mobile /
     ~85 desktop, alinhado à referência).
   - `prefers-reduced-motion`: desenha um frame estático, sem rAF.
3. **Tags de categoria com prefixo ">>"** — texto caixa alta, Regular, em
   `text-ghost/60` (cinza legível, passa no AA — não usa mais `text-ash`).
   Ecoam os 4 pilares do processo. **Posição (2026-08-27):** saíram do topo do
   hero e viraram uma faixa horizontal no **rodapé do hero**, presa na base,
   que **só revela (stagger) depois que o typewriter termina a 1ª escrita** —
   ver `TypewriterHeadline` + `Hero`. Badges tipo "ghost pill" seguem
   disponíveis pra Projetos/Comunicação.
4. **Fotografia**: adiada — sem fotos reais disponíveis ainda. Em vez de placeholder
   de "foto", o hero desta rodada usa a constelação animada como único elemento
   visual de fundo (decisão explícita do usuário: "a constelação se mexendo atrás").

## Componentes

- **Headline da hero (máquina de escrever)** — `TypewriterHeadline`
  (2026-08-27): "CONSTRUÍMOS AS MARCAS MAIS" fica fixo desde o load; após o
  fade-in, "F*DAS E ESTRUTURADAS DO MERCADO" é digitado (~70ms/caractere),
  segura ~2s, apaga (~40ms/caractere) e redigita — **loop infinito**. Cursor `|`
  (barra branca ~3px, `caret-blink` 1s step-end) pisca durante e depois.
  - **Layout:** a headline fica **centralizada na tela** — vertical (`flex-1
    items-center`) **e horizontal** (`justify-center` + `mx-auto`), com o texto
    **alinhado ao centro** (`text-center`). É a **única exceção** à direção
    editorial-à-esquerda do sistema; decisão explícita do usuário via mockup
    desenhado. **Três linhas com quebra fixa:**
    `CONSTRUÍMOS AS MARCAS MAIS` / `F*DAS E ESTRUTURADAS` / `DO MERCADO`.
    Linha 1 é um `span.block` (`text-balance` pra não deixar órfã se quebrar);
    linhas 2–3 saem do texto digitado com um `<br>` inserido depois de
    "estruturadas" — "DO" nunca fica sozinho no fim da linha 2. Em tela bem
    estreita cada linha ainda pode quebrar; a fonte só reduz por `clamp`.
  - **Tamanho:** `clamp(38px, 5vw, 64px)` (era `77px` — reduzido pra "Construímos
    as marcas mais" caber em uma linha só em laptop, como no mockup),
    `leading-[0.98]`, `tracking-[-0.04em]`. Em ≥1280px: 3 linhas limpas.
  - **Altura travada:** uma camada "fantasma" (`span.invisible` com o texto
    completo, quebrado igual) reserva as 3 linhas (5 no mobile, onde a linha 1 e
    a "estruturadas" quebram); a camada visível é `absolute top-0`. Assim a
    headline **não encolhe ao apagar** — a 1ª linha fica imóvel e o **botão
    logo abaixo não sobe/desce** (medido: bob 0). O custo: quando o texto
    digitado está curto, sobra uma linha vazia entre ele e o botão.
  - **`onFirstComplete`:** dispara uma única vez quando a 1ª escrita termina —
    o `Hero` usa isso pra revelar as tags do rodapé.
  - `aria-label` carrega a frase inteira; a animação é `aria-hidden`.
    `prefers-reduced-motion`: frase completa estática, sem cursor, e
    `onFirstComplete` dispara na hora.
- **Rodapé do hero** (`Hero`): wordmark + nav no topo, headline + CTA
  centralizados no meio, e **preso na base** a faixa: hairline + tags `>>`
  (revelam após a 1ª escrita) à esquerda / indicador de scroll à direita.
- **Botão sólido (CTA do hero)** — exceção ao "CTA de texto" abaixo, pedida pelo
  usuário: caixa **branca sólida `bg-ghost`, texto preto `text-obsidian`**
  (contraste máximo), retangular (raio 0), sem sombra, caixa alta
  `tracking-[0.16–0.18em]`, `px-8 py-4`. Hover = `opacity-90`. Foco:
  `focus-visible:outline-obsidian` (o anel branco global sumiria no botão
  branco). Fica abaixo da headline, centralizado, **parado** (a headline tem
  altura travada e não empurra o botão), e **revela junto com as tags** (depois
  da 1ª escrita do typewriter). Abre o WhatsApp (`WHATSAPP_URL` em
  `src/lib/contact.ts`). Texto: "Vem trocar uma ideia com a gente".
- **CTA de texto** (demais seções): sem botão preenchido; texto branco com
  seta/underline hairline.
- **Ghost pill**: borda 1px branca, fundo transparente, raio 4.5px, padding
  5px/6px, texto 14px caixa alta peso 400 — para badges de categoria em seções
  futuras (Projetos, Comunicação).
- **Divisor hairline**: linha 1px branca, full-width, 0px de raio — separador de
  seção usado com moderação (o separador principal é o espaço em branco de
  144–173px, não a linha).
- **Seção "Inteligência de marca"** (`BrandIntelligence`, **entre os Cases e o
  Workflow** — 2026-08-27): bloco de manifesto do `content.md`. Grid 2 col no
  `md` (texto `1.05fr` à esquerda / fotos `minmax(0,0.78fr)` à direita), 1 col
  no mobile. Eyebrow `>> Por que fazemos` + `h2` "INTELIGÊNCIA / DE MARCA"
  (Medium) + 8 parágrafos (`text-base`/`sm:17px`, `leading-1.6`, `space-y-5` —
  mais respirado que o workflow porque é manifesto) + CTA de texto "Vem trocar
  uma ideia com a gente" (→ WhatsApp). Fade-in ao entrar, **sem pin**. À
  direita, **dois recortes P&B** (`public/brand/founders.png` Luis&Carola +
  `public/brand/joao.png`) via `next/image`, fundo transparente, **sem moldura**
  (bar.md, "fotografia sangrando o frame"). Ambos **espelhados** (`-scale-x-100`)
  a pedido do usuário; o João **"sai" pela beirada direita da tela**
  (`translate-x` + `-mr` quebrando o padding + `section overflow-hidden` que
  corta o excedente). **Founders é a foto grande** (`md:w-[260px] lg:w-[340px]`),
  **João é menor** (`md:w-[175px] lg:w-[215px]`); `items-end` no grupo deixa a
  cabeça do João ~na altura da cabeça do Luis (o agachado). `md:sticky top-20`
  enquanto o texto rola.
- **Seção "Entenda o nosso workflow"** (`Workflow`, depois dos cases) —
  **acordeão pinado** (v2, 2026-08-27, pedido do usuário via print; substitui a
  v1 "fade-in cumulativo"):
  - A `<section>` é alta (`COUNT * 100vh`); dentro dela um painel
    `sticky top-0 h-screen` **trava na tela**. `useScroll` +
    `useMotionValueEvent` mapeiam o progresso → `activeIndex = floor(p * COUNT)`.
  - Os **4 cabeçalhos ficam sempre empilhados e visíveis** (seta + rótulo curto
    + contador `01 / 04`). Só a etapa **ativa abre** (`AnimatePresence`,
    `height 0→auto`) mostrando título + corpo + ilustração; as outras ficam só
    o cabeçalho. Ao rolar, a atual fecha e a próxima abre. A seta gira
    `-90°` (fechada, aponta →) / `0°` (aberta, aponta ↓); rótulo ativo em
    `text-ghost`, inativo em `text-ash`.
  - Layout do corpo aberto: grid 2 col no `md` (texto / ilustração
    `max-w-[300px]`), 1 col no mobile **sem ilustração**. Corpo compacto
    (`text-[13px]`) pra caber no painel. O container do acordeão é
    `overflow-y-auto` (scrollbar escondida): no desktop cabe e nunca rola; no
    mobile as etapas longas (9–10 parágrafos) rolam internamente antes do pin
    soltar.
  - CTA = CTA de texto padrão (underline + `ArrowUpRight`), abre `WHATSAPP_URL`.
  - Ilustrações: SVGs em `public/workflow/step-{1..4}.svg`, tingidos ash via
    `filter: brightness(0) invert(0.353)`.
  - `prefers-reduced-motion`: **sem pin, sem scrub** — as 4 etapas abertas,
    empilhadas, estáticas (fluxo normal).
- **Card de vídeo de cliente**: `0px` de raio, sem sombra (só `border`, nunca
  `ring`/`box-shadow`) — placeholder atual é um retângulo tonal preto/ash (sem
  cor), ícone de play outline branco centralizado, nome do cliente + ano em
  caption sobre o card (contra-rotacionado para ficar legível — ver "Surf de
  clientes" abaixo).
- **Surf de clientes (scroll 3D finito)** — v3, substitui a versão anterior de
  "carrossel controlado por setas/arraste": adaptado da referência
  `CollectionSurfer` (React/framer-motion) fornecida pelo usuário, com duas
  diferenças deliberadas:
  - **Finito, não infinito**: a seção tem exatamente `nº de clientes × largura
    de scroll por card` de altura; o progresso é lido via `useScroll({target,
    offset:["start start","end end"]})` local à seção (não `window.scrollY`
    global com módulo). Não há duplicação de itens nem loop — ao passar do
    último card, o pin libera e o scroll normal da página continua.
  - **Placeholder, não fotografia**: cada card é o mesmo retângulo tonal
    preto/ash com ícone de play, não uma foto colorida.
  - Mecânica preservada da referência: pilha de cards em 3D (`perspective` +
    `rotateY` fixo, um "shelf" inclinado), zoom magnético no card mais
    próximo do mouse (`scale` até ~1.32, spring), texto (índice + nome/ano)
    contra-rotacionado para ficar de frente pra câmera apesar do tilt do card.
  - Sem setas, sem dots, sem autoplay — a navegação é 100% scroll (+ mouse
    para o zoom magnético). Em touch/mobile o zoom magnético não é acionado
    (sem `mousemove`), mas o scroll finito funciona normalmente.

## O que este redesign NÃO deve virar

- Qualquer cor crominática além do coral — nada de azul, verde, ou reintrodução
  do violeta. Coral **só** no "+" do wordmark.
- Peso fora da escala definida (400 / 500 / 600 / 900). Nada de Light, nada de
  Bold-700, nada de itálico. Cada peso tem um papel fixo (ver Tipografia) —
  Black **só** no wordmark, SemiBold **só** nas frases marcadas do workflow.
- Sombra, glow ou cantos muito arredondados em cards/imagens (raio 0 é regra, 4.5px
  só em badge/botão). O glow/halo é exclusivo dos nós da constelação — não migra
  pra UI.
- Um dashboard SaaS ou um site lúdico/colorido — direção é editorial, silenciosa,
  "gallery wall à meia-noite".

## Acessibilidade (baseline em `globals.css`)

- **Foco**: `:focus-visible` global = contorno 1.5px `--ghost`, offset 3px, raio
  1px. É o único tratamento de foco do sistema — nada de anel azul, nada de
  `outline: none` sem substituto.
- **`prefers-reduced-motion: reduce`**: bloco global no `globals.css` zera
  `animation`/`transition`/`scroll-behavior`. Além disso, cada peça com
  movimento próprio gate individualmente — constelação (não roda rAF, 1 frame
  estático), Workflow (`useReducedMotion` → sem pin/scrub, tudo aberto), Hero scroll-drip
  (`motion-reduce:animate-none`). **Pendente**: o Surf de clientes ainda não
  degrada sob reduced-motion (o scrub 3D continua) — item conhecido.
- **Alvos de toque**: links de nav e CTAs de texto usam `py-2` (+ `-my-2` onde
  precisa manter o layout) pra caixa de clique ~37–41px sem alterar o visual.
