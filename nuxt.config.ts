export default defineNuxtConfig({
  compatibilityDate: '2026-11-06',
  typescript: {
    strict: true,
  },
  modules: ['@nuxtjs/tailwindcss'],
  experimental: {
    // Site é uma única página pré-renderizada: sem payload de navegação
    // (o arquivo `_payload.json` não é servido pela Vercel).
    payloadExtraction: false,
  },
  css: [
    '@fontsource/geist-sans/400.css',
    '@fontsource/geist-sans/500.css',
    '@fontsource/geist-sans/600.css',
    '@fontsource/geist-sans/700.css',
    '@fontsource/geist-mono/400.css',
    '@fontsource/geist-mono/500.css',
    'material-symbols/outlined.css',
    '~/assets/css/main.css',
  ],
  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR', class: 'dark scroll-smooth' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      title: 'Moraes Tecnologia — Transformamos ideias em soluções digitais.',
      meta: [
        {
          name: 'description',
          content:
            'Desenvolvemos software, arquiteturas e produtos digitais que ajudam empresas a superar desafios complexos e liderar seus mercados.',
        },
        { name: 'theme-color', content: '#7667F8' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml'],
    },
  },
})
