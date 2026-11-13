# Moraes Tecnologia — Landing Page

Landing page estática **Dark Premium** implementada fielmente a partir do projeto Google Stitch
*"Moraes Tecnologia Premium Platform"* (Project ID `12639643938926728775`), com **Nuxt 3 + TypeScript**,
SEO otimizado e geração estática (`nuxt generate`) pronta para deploy na Vercel.

> Repositório local iniciado com `git init -b main` e **sem commits** (restrição do brief):
> nada foi commitado, enviando ou publicado.

---

## Stack

| Camada | Escolha |
|---|---|
| Framework | Nuxt 3 (SSR/SSG, TS strict) |
| Estilos | `@nuxtjs/tailwindcss` v6 com tokens **exatos** do design system Stitch |
| Efeitos 3D | `three` (ESM, import dinâmico — só em desktop ≥1024px, nunca em reduced-motion) |
| Shader WebGL | Código puro (sem libs), portado do Stitch (simplex noise, `u_time/u_resolution/u_mouse`) |
| Fontes | Self-hosted: `@fontsource/geist-sans`, `@fontsource/geist-mono` (200–700) |
| Ícones | Self-hosted: `material-symbols` (os mesmos nomes de ícone da referência) |
| E2E | `@playwright/test` (desktop 1440, tablet 768, mobile Pixel 5) |

**Zero dependência de CDN em produção** — o HTML final não referencia `fonts.googleapis.com`,
`cdn.tailwindcss.com` nem URLs do Stitch (logo e assets são locais em `public/`).

---

## Estrutura

```
config/site.ts          # Fonte única de identidade: nome, dados cadastrais, url, contatos, nav
config/products.ts      # Catálogo de produtos: nome genérico, categoria, resumo, destaques e demoUrl
components/
  AppHeader.vue         # Header fixo (blur), nav desktop + indicação de seção ativa
  AppMobileDrawer.vue   # Drawer mobile (focus trap, Esc, backdrop, scroll-lock, foco restaurado)
  AppHero.vue           # #inicio — shader+three (lg+), orbs CSS (mobile), hero-reveal 1..5
  AppHeroShader.vue     # Shader WebGL (desktop, lazy, cleanup total)
  AppHeroThree.vue      # Cena three.js: 38 nós + core wireframe + links + parallax (lazy)
  AppHeroMockup.vue     # Mockup de arquitetura (código C#, nodes, topologia SVG animada)
  AppMarquee.vue        # Marquee de capacidades (keyframes de classe arbitrária incluídos)
  AppServices.vue       # #servicos — bento grid 6 cards
  AppProducts.vue       # #produtos — catálogo data-driven de config/products.ts com links de demo
  AppProcess.vue        # Timeline 5 etapas (metodologia)
  AppStack.vue          # 6 categorias de stack (.NET, Vue, Azure, PostgreSQL...)
  AppPillars.vue        # #sobre — 4 pilares
  AppContact.vue        # #contato — canais condicionais a config/site.ts + AppContactForm
  AppContactForm.vue    # Validação client-side real; estados idle/erro/pendente; SEM falso sucesso
  AppFooter.vue         # 4 colunas + copyright dinâmico
composables/
  useScrollReveal.ts    # Reveal-once via IntersectionObserver (stagger, reduced-motion aware)
  useActiveSection.ts   # Seção ativa para o indicador da navbar
  useReducedMotion.ts   # matchMedia reativo, SSR-safe
  useMediaQuery.ts
assets/css/main.css     # Tokens :root (DESIGN.md §19), keyframes e utilitários de motion
tailwind.config.ts      # Porte exato do config do Stitch + keyframes corrigidas
pages/index.vue         # Composição + useSeoMeta completo
server/routes/sitemap.xml.ts  # Sitemap em build-time (vazio até site.url existir)
public/                 # logo.svg, favicon.svg, og.png, robots.txt, produtos/ (capturas das demos)
tests/e2e/landing.spec.ts     # Suíte Playwright (3 viewports)
design/stitch/          # Referências oficiais do Stitch — READ-ONLY, nunca editar
```

---

## Comandos (verificados)

```bash
npm install              # instalar dependências
npm run dev              # dev server em http://localhost:3000
npx nuxi typecheck       # TypeScript estrito
npm run generate         # gerar site estático em .output/public
npm run serve:static     # servir o build em http://127.0.0.1:4173
npx playwright test      # suíte E2E pelos 3 projects (server estático já sobe sozinho)
```

---

## Regras de credibilidade (aplicadas)

As telas do Stitch contêm **métricas ilustrativas** que não podem ser publicadas como fato.
Todas foram substituídas por rótulos neutros/qualitativos (estrutura visual preservada):

- `99.99% Uptime` → *Operação 24/7* · `148k msgs/s` → *Fluxo contínuo de eventos*
- `148_200 eps` → `StreamMode.RealTime` · `98.4% Eficiência` → *Orquestração distribuída*
- `Test Coverage >95%` → *Testes automatizados* · `42ms`, `1,842/2,190`, `84%`, `40+`, `Sub-ms` etc. → equivalentes neutros

Contatos reais vêm de `config/site.ts`: `contato@moraes-tecnologia.com` (link `mailto:`),
WhatsApp `(83) 99846-1353` (`wa.me`) e endereço da Faria Lima. Campo `null` continua sendo a
forma de desligar um canal: a UI então mostra *"A configurar"* (sem link).

O formulário **nunca simula sucesso**: valida de verdade (mensagens por campo, foco no primeiro
inválido, `aria-live`) e, com dados válidos, exibe explicitamente que a *integração de envio está
pendente de configuração* (botão marca "Envio indisponível").

---

## SEO implementado

- Pré-render estático: HTML completo no primeiro byte (rastreável por todos os bots)
- `useSeoMeta`: title, description (copy aprovada), OG completo, Twitter Card
- `public/robots.txt` com referência ao sitemap; `sitemap.xml` gerado em build-time
- JSON-LD (Organization + WebSite) com `legalName`, `taxID`, endereço e URL de produção
- Canonical absoluto (`https://moraes-tecnologia.com`) e sitemap com a URL do domínio
- HTML semântico (header/nav/main/section/footer), skip-link, landmarks, `lang="pt-BR"` no `<html>`
- Fontes/ícones self-hosted (zero bloqueio de terceiros), preload correto, three.js em chunk lazy

---

## 🔧 O que ainda falta configurar

O que depende de informação real está centralizado em **`config/site.ts`** (já preenchido com
razão social, CNPJ, endereço, WhatsApp, e-mail e domínio de produção):

1. **Backend do formulário** — integrar o `AppContactForm.vue` a um serviço de envio real
   (API própria, Formspree, Resend etc.) + anti-spam (honeypot). Hoje o estado pós-validação
   é honesto e bloqueado ("Envio indisponível") até essa integração existir.
2. **`public/og.png`** — atualmente é o logo provisório; substituir por imagem social
   1200×630 com copy da marca.
3. **Termos de Uso / Política de Privacidade** — os links do footer foram removidos de propósito
   (não existem as páginas); ao criar `pages/termos.vue` e `pages/privacidade.vue`, readicionar.
4. **`favicon.ico`** (opcional) — há `favicon.svg`; um `.ico` cobre browsers antigos.

## Deploy

- Produção: <https://moraes-tecnologia.com> (Vercel, build `npm run generate` → `.output/public`)
- Repositório: <https://github.com/pedro-moraesbatista/moraes-tecnologia> (privado)
- Deploy manual: `vercel deploy --prod --yes`

## Pendências técnicas conhecidas

- **E2E**: suíte verde contra o build estático (`npx playwright test`) — 21 passed / 27 skipped
  (skips são os projetos de viewport que não se aplicam a cada bloco).
- **Revisão independente (`reviewer`)** não pôde rodar: limite de uso da conta bloqueou subagents
  (reiniciar quando disponível).
- **Revisão visual humana** recomendada: comparar screenshots do build com as referências em
  `design/stitch/extracted/*.png` (o ambiente não processa imagens para comparação automática).
- Chunk do `three` (~736 kB) é baixado via `prefetch` mesmo em mobile; otimização possível:
  carregar somente em lg+ viewer (hoje ele não executa em mobile, mas o arquivo pode ser prefetch).
