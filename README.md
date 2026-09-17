# Cabaret da Cecília · O Cabaret renasce (conceito)

Página conceitual **privada e não oficial**, criada pela Alevum para apresentação aos proprietários do Cabaret da Cecília, sobre a reabertura em 15 de outubro de 2026 na Rua Nestor Pestana, 189, São Paulo.

> Esta página não é oficial e está configurada para **não ser indexada** (meta `robots`, `googlebot` e cabeçalho `X-Robots-Tag`).

## Conceito: "a fresta"

O vídeo termina com as cortinas se abrindo em torno de uma lâmina vertical de luz. A página inteira se organiza nesse eixo do palco:

- **Herói:** "O CABARET" se recolhe em direção ao centro pela esquerda e "RENASCE." parte dele pela direita, como duas metades de cortina. A fresta de luz do vídeo aparece exatamente entre elas.
- **Manifesto:** pendurado num fio de ouro que desce pelo eixo.
- **Nova casa:** os dados divulgados montados num painel em arco com lâmpadas de letreiro, ecoando o proscênio do vídeo.
- **Em cena:** o cartão ativo é marcado pela mesma lâmina de luz.
- **Convite final:** duas cortinas de veludo que se abrem ao entrar na tela.

O ouro é raro e reservado à luz: filetes, lâmpadas e a fresta.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint (Next 16 não roda lint no build)
npx tsc --noEmit   # TypeScript
npm run build && npm start
```

Requer Node.js 20.9 ou superior.

## Estrutura

```
src/
  app/            layout (fontes, metadados noindex), página, CSS global, ícone, fontes locais
  sections/       hero, manifesto, new-house, on-stage, invitation, site-header, site-footer
  components/     hero-video, launch-list-dialog, curtain-reveal, ornaments (SVGs locais)
  components/ui/  button, stage-words, program-accordion, countdown
  data/site.ts    TODO o conteúdo editável
  lib/            utils (cn), time (fuso horário), launch-list (integração), use-media-query
public/
  video/          vídeo original + versões otimizadas
  images/         pôster e quadro estático extraídos do vídeo
  ornaments/      estrela em SVG
```

`components.json` segue o formato do shadcn/ui, então `npx shadcn add <componente>` funciona.

## Editar conteúdo

Tudo fica em **`src/data/site.ts`**: data e fuso da abertura, endereço, números da casa, categorias e linhas de campanha, textos de CTA, textos e modo da lista de lançamento, caminhos do vídeo e o aviso de conceito do rodapé. Nenhum componente contém texto de negócio fixo.

Regra do conceito: só entram fatos divulgados. Não há preços, atrações, horários da casa nova, patrocinadores, depoimentos, fotos da casa nova ou planta.

## Vídeo

| Arquivo | Uso | Tamanho |
|---|---|---|
| `cabaret-opening.mp4` | **Original, intacto** (byte a byte). Último fallback. | 5,2 MB |
| `cabaret-opening-1080.webm` | Desktop (VP9, sem áudio) | 2,3 MB |
| `cabaret-opening-1080.mp4` | Desktop, Safari antigo (H.264, faststart) | 3,8 MB |
| `cabaret-opening-720.webm` | Mobile (VP9) | 1,0 MB |
| `cabaret-opening-720.mp4` | Mobile (H.264, faststart) | 1,5 MB |

**Por que existem as versões otimizadas:**

- O arquivo original tem o índice (`moov`) no **final**, então o navegador precisa buscar o fim do arquivo antes de começar a tocar.
- O original também tem uma faixa de áudio que nunca é usada.
- As versões novas corrigem as duas coisas.

Para regenerar as versões a partir de um novo original:

```bash
IN=cabaret-opening.mp4
ffmpeg -i $IN -an -c:v libx264 -preset slow -crf 22 -profile:v high -pix_fmt yuv420p -g 48 -movflags +faststart cabaret-opening-1080.mp4
ffmpeg -i $IN -an -vf scale=-2:720 -c:v libx264 -preset slow -crf 23 -profile:v high -pix_fmt yuv420p -g 48 -movflags +faststart cabaret-opening-720.mp4
ffmpeg -i $IN -an -c:v libvpx-vp9 -crf 33 -b:v 0 -row-mt 1 -deadline good -cpu-used 3 -g 48 cabaret-opening-1080.webm
ffmpeg -i $IN -an -vf scale=-2:720 -c:v libvpx-vp9 -crf 35 -b:v 0 -row-mt 1 -deadline good -cpu-used 3 -g 48 cabaret-opening-720.webm
ffmpeg -i $IN -frames:v 1 -q:v 3 ../images/cabaret-opening-poster.jpg
ffmpeg -ss 6.9 -i $IN -frames:v 1 -q:v 3 ../images/cabaret-opening-still.jpg
```

**Comportamento no navegador:**

- O pôster (quadro 0, idêntico ao início do vídeo) é renderizado no HTML do servidor com `fetchPriority="high"`.
- O `<video>` só é montado no cliente, com `autoplay`, `muted`, `loop` e `playsInline`. A fonte (720p ou 1080p) é escolhida pela largura da tela.
- O vídeo entra por fade no evento `playing`. Se o autoplay for bloqueado (ex.: modo de pouca energia do iOS), o pôster permanece.
- **Movimento reduzido** ou **economia de dados / 2G:** o vídeo nem é baixado. Com movimento reduzido, o herói mostra o quadro com a cortina entreaberta.
- O vídeo pausa quando o herói sai da tela.
- Na virada do loop há um blecaute curto de palco (0,4 s), que disfarça o corte entre o fim (cortina aberta) e o início (plano aberto).
- Nenhum estado do React muda durante a reprodução.

## Lista de lançamento (demonstração)

O modal não envia nem armazena nada: `site.launchList.mode = "demo"`. Para conectar:

1. Defina `mode: "endpoint"` e `endpoint: "/api/lista"` (ou a URL do serviço) em `src/data/site.ts`.
2. A função `submitLaunchListSignup` em `src/lib/launch-list.ts` já faz o `POST` com `{ name, email }` em JSON. Se o serviço esperar outro formato, ajuste só esse arquivo.
3. Remova o aviso de demonstração e ajuste a mensagem de sucesso.

## Contagem regressiva

- **Alvo:** 15/10/2026 00:00 em `America/Sao_Paulo`. O horário das portas não foi divulgado; ajuste `opening.date.hour` quando for.
- **Fuso:** a conversão usa `Intl`, então a contagem é a mesma de qualquer lugar do mundo.
- **Hidratação:** segura (`useSyncExternalStore`). O servidor renderiza "––".
- **Atualização:** a cada 15 s, sem segundos na tela, e nunca mostra valores negativos.
- **Após a data:** exibe "AS CORTINAS ESTÃO ABERTAS."

Para testar outros momentos, use o parâmetro `?simular=`:

- `/?simular=2026-10-14T23:59:30-03:00` mostra 1 minuto restante.
- `/?simular=2026-10-16T12:00:00-03:00` mostra o estado pós-abertura.

## Não indexação

- `metadata.robots` em `src/app/layout.tsx` gera exatamente `<meta name="robots" content="noindex, nofollow"/>` e um `googlebot` com `noimageindex`.
- `next.config.ts` envia `X-Robots-Tag: noindex, nofollow, noimageindex` em todas as respostas, incluindo vídeo e imagens.
- **Não** há `robots.txt` bloqueando o site, de propósito: um `Disallow` impediria os buscadores de ler o `noindex` e a URL poderia aparecer sem descrição se alguém a linkasse.
- Para uma apresentação realmente privada, publique com proteção por senha (ex.: Vercel Deployment Protection).

## Deploy privado (Vercel)

1. Suba o repositório e importe na Vercel. Não há variáveis de ambiente necessárias.
2. Em *Settings → Deployment Protection*, ative a proteção por senha ou Vercel Authentication.
3. O otimizador de imagens do Next funciona nativamente na Vercel. Em outro host, rode `npm start` num servidor Node.

## Decisões técnicas

**Adaptação das referências do 21st.dev**

- **PrismaHero → herói:**
  - Mantidos: vídeo em tela cheia, título gigante na base, texto de apoio com CTA e a barra de navegação suspensa no topo (que virou a "bambolina" do palco).
  - Trocados: todo o conteúdo, a paleta, a tipografia e a composição (título dividido no eixo).
- **WordsPullUp → `StageWords`:** a animação por palavra foi reescrita em CSS. O Framer Motion renderiza `opacity:0` inline no HTML do servidor, o que esconderia o `<h1>` se o JavaScript falhasse e atrasaria o LCP. Com CSS, o título é visível sem JS e só anima quando o sistema permite movimento.
- **Interactive Image Accordion → `ProgramAccordion`:**
  - Mantido: faixas que se expandem no hover.
  - Acrescentados: hover com intenção (140 ms), clique, teclado (setas, Home, End), padrão ARIA de acordeão com `aria-expanded` e regiões `inert`.
  - Mobile: acordeão vertical só por toque.
  - Imagens: substituídas por ornamentos Art Déco em SVG local, sem fotos inventadas.
- **Framer Motion não foi instalado:** nenhuma interação aqui ficava melhor com ele do que com CSS, e isso mantém o JavaScript enxuto.

**Tipografia**

- Bodoni Moda (variável, com tamanho óptico) para títulos e Manrope para informação. Ambas são auto-hospedadas via `next/font/local` (licença OFL em `src/app/fonts`).
- **Armadilha documentada:** o `next/font` escreve os fallbacks sem aspas. Um nome como `Bodoni 72` é inválido sem aspas e derruba a pilha `font-family` inteira, então ele foi removido.

**Acessibilidade**

- Link "Pular para o conteúdo" e hierarquia de títulos correta.
- Foco visível em dourado de ribalta.
- Modal nativo (`<dialog>`) com foco preso, Esc, clique fora, foco inicial no campo Nome e devolução do foco ao botão.
- Contagem com texto falado completo.
- Nenhuma função depende de hover.
- `prefers-reduced-motion` respeitado em tudo: sem vídeo, sem animações, cortinas já abertas.

## Validação realizada

Testado com Playwright (Chromium) contra o build de produção:

**Build e código**
- ESLint sem erros, TypeScript sem erros, `next build` concluído (página estática).
- Nenhum erro ou aviso no console (desktop e mobile).

**Vídeo**
- Autoplay mudo e em loop no desktop (1080p WebM) e no mobile (720p WebM).
- Pausa fora da tela; blecaute do loop ativa perto do fim e desativa após reiniciar.
- Movimento reduzido: vídeo não montado e quadro estático exibido.
- Sem JavaScript: título visível, pôster exibido e cortinas finais abertas.

**Interações**
- Acordeão: clique, hover, setas e Enter; 5 regiões inertes por vez; toque no mobile com alvos de 64 px.
- Ordem de tabulação lógica.
- Modal: abre com foco em Nome, Tab preso (6/6), Esc fecha e devolve o foco, erros com foco no primeiro campo inválido, sucesso sem nenhuma requisição `POST`, fecha pelo botão e pelo fundo.
- Contagem: estado atual, 30 s antes (1 minuto), exatamente na hora e após a data. Navegador em Tóquio calcula corretamente pelo horário de São Paulo.

**Layout**
- Sem rolagem horizontal em 360, 390, 768, 1024 e 1440 px.
- Altura total entre ~4.400 e 4.600 px (cerca de 5 telas no desktop).

**Metadados**
- `noindex, nofollow` confirmado no HTML e no cabeçalho.

## Fontes das informações

- **Site oficial** (cabaretdacecilia.com.br): novo endereço Rua Nestor Pestana, 189.
- **Imprensa** (Guia Gay São Paulo e Catraca Livre): oito anos na Rua Fortunato e mudança para a Nestor Pestana.
- **Folha de S.Paulo, coluna Mônica Bergamo** (via briefing): data de 15/10, cerca de 500 pessoas, 3 bares, mezanino VIP, salas privativas, salão de eventos, cerca de 10 artistas por noite e linguagens da programação.
