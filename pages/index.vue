<script setup lang="ts">
import { site } from '~/config/site'

const pageTitle = 'Moraes Tecnologia — Transformamos ideias em soluções digitais.'
const pageDescription =
  'Desenvolvemos software, arquiteturas e produtos digitais que ajudam empresas a superar desafios complexos e liderar seus mercados.'

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogType: 'website',
  ogImage: '/og.png',
  ogLocale: 'pt_BR',
  ogSiteName: site.name,
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: '/og.png',
})

if (site.url) {
  useHead({
    link: [{ rel: 'canonical', href: site.url }],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: site.name,
            legalName: site.legalName,
            taxID: site.cnpj,
            url: site.url,
            logo: `${site.url}/logo.svg`,
            address: site.contact.address
              ? {
                  '@type': 'PostalAddress',
                  streetAddress: 'Av. Brigadeiro Faria Lima, 1811 — Sala 1119',
                  addressLocality: 'São Paulo',
                  addressRegion: 'SP',
                  postalCode: '01452-001',
                  addressCountry: 'BR',
                }
              : undefined,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: site.name,
            url: site.url,
          },
        ]),
      },
    ],
  })
}
</script>

<template>
  <a
    href="#conteudo"
    class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:inline-flex focus:items-center focus:px-space-lg focus:py-space-sm focus:rounded-xl focus:bg-primary-container focus:text-text-primary focus:font-label-md focus:text-label-md focus:shadow-lg"
  >Pular para o conteúdo</a>
  <AppHeader />
  <main id="conteudo" class="w-full pt-20 bg-surface-container-lowest">
    <div class="flex flex-col w-full text-text-primary selection:bg-primary-container selection:text-text-primary">
      <AppHero />
      <AppMarquee />
      <AppServices />
      <AppProducts />
      <AppProcess />
      <AppStack />
      <AppPillars />
      <AppContact />
    </div>
  </main>
  <AppFooter />
</template>
