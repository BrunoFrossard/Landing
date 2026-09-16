# Alevum

Primeira presença digital da Alevum: uma apresentação editorial em seis capítulos, com galeria espacial, cartões dos fundadores e contato direto por e-mail. Implementada no repositório existente, preservando `landing.md`.

## Desenvolvimento local

Requisitos: Node.js 22.13 ou superior e npm. As versões exatas estão no `package-lock.json`. Não é necessário criar `.env`.

```bash
npm ci
npm run dev
```

Abra [localhost:3000](http://localhost:3000). A entrada `/` redireciona para `/pt` por padrão, ou para o idioma escolhido anteriormente. `/pt` e `/en` são páginas renderizadas no servidor com HTML, conteúdo e metadados próprios.

```bash
npm run lint        # ESLint, sem avisos
npm run typecheck   # Tipos das rotas e TypeScript
npm run build      # Build de produção
npm start          # Servidor de produção
npm run test:e2e    # Playwright + axe-core
```

Os testes usam Chrome instalado, em modo headless. Se não estiver disponível, execute `npx playwright install chrome`. O Playwright inicia o servidor de desenvolvimento se necessário; para validar uma build, inicie `npm start` antes. As capturas ficam em `.qa/` e os relatórios de falhas em `test-results/`, ambos ignorados pelo Git.

## Estrutura

| Caminho | Responsabilidade |
| --- | --- |
| `src/app/[locale]` | Páginas PT/EN, layout, SEO e imagem social |
| `src/app/(entry)` | Escolha do idioma na entrada |
| `src/sections` | Seis capítulos, renderizados no servidor |
| `src/components` | Navegação, galeria, cartões e canvas interativos |
| `src/components/ui` | Primitivos acessíveis, compatíveis com a organização shadcn/ui |
| `src/data/projects.ts` | Casos, contexto, status, mídia e traduções |
| `src/data/founders.ts` | Fundadores, fotos e textos pessoais |
| `src/data/site.ts` | E-mail, domínio e configuração do vídeo |
| `src/i18n` | Tipos e dicionários de toda a interface |
| `public/people`, `public/projects`, `public/video` | Arquivos locais substituíveis |

Stack: Next.js App Router, React, TypeScript, Tailwind CSS 4, Framer Motion, Radix Dialog, next-themes e Lucide. Manrope e Instrument Serif são servidas localmente via `next/font/local`; não há chamadas a Google Fonts no navegador. A direção visual está em `src/app/globals.css`, com tokens de tema e layouts responsivos.

## Trocar fotos dos fundadores

1. Adicione `public/people/bruno.webp` e `public/people/rafael.webp`.
2. Em **ambos os idiomas** de `src/data/founders.ts`, atualize os valores compartilhados `image` e `placeholderAsset: false`; traduza `imageAlt`.
3. Use retratos autorizados de pelo menos **1200 × 900 px**, preferencialmente WebP/AVIF abaixo de **250 KB**. O enquadramento é horizontal e varia de 1,9:1 a 1,5:1; deixe margem ao redor do rosto. Ajuste `object-position` em `.founder-image` se necessário.

Os SVGs atuais são monogramas originais, explicitamente marcados como provisórios. Não são pessoas geradas. Para editar a curiosidade, altere `personalLabel` e `personal` nos dois idiomas. Rafael usa um texto provisório restrito às informações fornecidas (`provisionalBio: true`); substitua-o quando houver uma biografia aprovada.

## Trocar ou adicionar projetos

As ilustrações atuais são estudos visuais originais, não capturas de produtos em produção. Cada caso tem `placeholderAsset: true`, status e contexto explícitos. Os projetos acadêmicos não são apresentados como contratos comerciais da Alevum.

1. Coloque imagens em `public/projects/`. Recomendação: **1600 × 1000 px**, WebP/AVIF abaixo de **350 KB**. A galeria recorta para cerca de 1,85:1; mantenha o conteúdo principal na região central.
2. Em `src/data/projects.ts`, ajuste `image`, `imageAlt`, `placeholderAsset` e, se disponível, `video` (caminho local). Vídeos de projeto têm controles e só aparecem dentro do modal.
3. Para adicionar um caso, crie seu objeto em **`pt` e `en`**, seguindo o tipo `Project` de `src/i18n/types.ts`. Use o mesmo `slug` em ambos.
4. A ordem dos arrays define a navegação. `featured: true` escolhe o projeto inicialmente ativo; mantenha um único destaque. Para remover, remova o caso nos dois idiomas.
5. Informe apenas tecnologias, parceiros e resultados verificados. `partner` e `academicContext` descrevem o contexto; não há logos externos.

## Adicionar o vídeo Higgsfield

O vídeo está **desativado por padrão**. Nenhuma URL de vídeo é solicitada enquanto ele não existir. A composição arquitetônica local permanece como alternativa.

- MP4: `public/video/alevum-hero.mp4`, codec H.264, sem áudio, compatível com reprodução web.
- WebM opcional: `public/video/alevum-hero.webm`, codec VP9.
- Duração sugerida: **6–12 segundos**, loop suave. Resolução máxima sugerida: **1440 × 1080**, 24/30 fps. Prefira **até 4 MB** por arquivo; evite ultrapassar 6 MB.
- Poster: adicione `public/video/alevum-poster.webp`, de até **200 KB**, e ajuste `heroMedia.poster` em `src/data/site.ts`.
- Ative `heroMedia.enabled: true` e faça nova build. O servidor verifica se os arquivos existem e oferece apenas as fontes disponíveis.

O hero usa `muted`, `autoPlay`, `loop`, `playsInline` e `preload="none"`. Carrega o vídeo somente quando o hero está visível em telas a partir de 768 px, respeita `prefers-reduced-motion`, pausa fora da área visível e em abas ocultas, e oferece controle de pausa. Em mobile ou movimento reduzido, mostra o poster/composição. Falhas de mídia mantêm a alternativa local.

## Conteúdo, idioma e tema

Todos os textos públicos ficam em `src/i18n/dictionaries.ts`, `src/data/projects.ts` e `src/data/founders.ts`, com interfaces TypeScript compartilhadas. O markup não é duplicado entre idiomas. O assunto do `mailto:` também acompanha o idioma.

A troca PT/EN usa rotas indexáveis, atualiza o atributo `lang` e os metadados e salva a preferência em cookie e armazenamento local. URLs explícitas sempre respeitam o idioma da URL. A entrada `/` lê o cookie, sem redirecionamento dependente de hidratação.

O tema respeita o sistema na primeira visita e salva a escolha manual com `next-themes`. O script de inicialização aplica o tema antes de pintar a página. Os dois temas têm superfícies, contraste e acentos próprios. Não há analytics, banco de dados, formulários de envio ou scripts de publicidade nesta versão.

## SEO e domínio

Há títulos e descrições PT/EN, Open Graph, Twitter Card, imagens sociais geradas localmente, favicon SVG, ícone Apple, `robots.txt`, `sitemap.xml` e JSON-LD de organização com apenas nome, e-mail e fundadores informados.

**Antes de conectar o domínio final**, defina `site.url` em `src/data/site.ts`, por exemplo com o domínio real aprovado. Não foi inventado um domínio da Alevum. Na Vercel, `VERCEL_PROJECT_PRODUCTION_URL` é utilizado automaticamente se o campo estiver vazio; não é preciso cadastrar uma variável manualmente.

Sem domínio configurado e fora da Vercel, a execução local usa localhost para imagens sociais, omite canonical/hreflang e retorna um sitemap vazio. Após configurar a URL e fazer build, canonical, alternates PT/EN e sitemap passam a usar a URL real. Confira `/robots.txt`, `/sitemap.xml`, `/pt/opengraph-image` e `/en/opengraph-image` na publicação.

## Deploy com GitHub e Vercel

Repositório: [BrunoFrossard/Landing](https://github.com/BrunoFrossard/Landing).

1. Revise a branch `feature/alevum-landing-v1` e abra um pull request para `main`.
2. Na Vercel, escolha **Add New → Project**, importe esse repositório e mantenha o diretório raiz `./` e o preset Next.js.
3. Use `main` como **Production Branch**. As outras branches geram Preview Deployments para revisão.
4. Com os testes aprovados, faça merge do pull request em `main` para a publicação de produção.
5. Em **Settings → Domains**, adicione o domínio autorizado e configure os registros DNS indicados pela Vercel no provedor do domínio. Aguarde a verificação e o certificado HTTPS.
6. Atualize `site.url` com o domínio definitivo e publique novamente.

Nenhum segredo é necessário. `.env*` e `.vercel/` estão ignorados; não versione tokens, chaves ou credenciais. O contato abre o aplicativo de e-mail do visitante e não envia mensagens automaticamente.

## Validação

Os testes verificam 360, 375, 390, 768, 1024 e 1440 px nos dois idiomas e temas; transbordamento horizontal; assets; ausência de erros de console; persistência; galeria por mouse/teclado; foco e Escape no modal; menu mobile; cartões; serviços; movimento reduzido e regras WCAG A/AA pelo axe. As capturas reais complementam a revisão automatizada. Uma auditoria automatizada não substitui validação com leitores de tela e usuários reais.

Antes de cada entrega, rode lint, TypeScript, build e os testes; confira as versões mobile e desktop. As próximas substituições editoriais são as fotos reais, o vídeo Higgsfield, uma curiosidade aprovada de Rafael e as mídias finais dos casos.
