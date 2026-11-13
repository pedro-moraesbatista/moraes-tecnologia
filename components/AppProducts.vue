<script setup lang="ts">
import { productDemos, type ProductAccent } from '~/config/products'

const section = ref<HTMLElement | null>(null)
useScrollReveal(section, { stagger: 120 })

const accents: Record<ProductAccent, { chip: string; border: string; link: string }> = {
  primary: {
    chip: 'bg-primary/10 text-violet-light border-primary/20',
    border: 'hover:border-primary/40',
    link: 'text-primary-fixed',
  },
  secondary: {
    chip: 'bg-secondary/10 text-secondary border-secondary/20',
    border: 'hover:border-secondary/40',
    link: 'text-secondary',
  },
  tertiary: {
    chip: 'bg-tertiary/10 text-tertiary border-tertiary/20',
    border: 'hover:border-tertiary/40',
    link: 'text-tertiary',
  },
  violet: {
    chip: 'bg-violet-light/10 text-violet-light border-violet-light/20',
    border: 'hover:border-violet-light/40',
    link: 'text-violet-light',
  },
}

function demoLabel(name: string, segment: string | null): string {
  return `Ver demonstração de ${segment ? `${name} — ${segment}` : name} (abre em nova aba)`
}
</script>

<template>
  <section id="produtos" ref="section" class="w-full bg-surface-container-low/50 py-space-xl md:py-28 px-margin-mobile md:px-margin scroll-mt-24">
    <div class="max-w-[1280px] mx-auto">
      <div class="reveal flex flex-col items-center text-center max-w-3xl mx-auto mb-space-xl">
        <span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-space-xs">Soluções Proprietárias</span>
        <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary tracking-tight mb-space-sm">
          Ideias que se tornam produtos.
        </h2>
        <p class="font-body-md text-body-md text-text-muted">
          Desenvolvemos soluções digitais próprias concebidas para transformar gargalos de mercado em ferramentas autônomas, seguras e prontas para escala. Abra qualquer demonstração e use o produto como ele está em produção.
        </p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-space-xl">
        <article
          v-for="product in productDemos"
          :key="product.id"
          class="reveal bg-surface-elevated rounded-3xl p-space-lg md:p-space-xl shadow-2xl flex flex-col justify-between group border border-border-subtle/60 transition-all duration-300 hover:-translate-y-1"
          :class="accents[product.accent].border"
        >
          <div class="overflow-hidden rounded-2xl border border-border-subtle/50 mb-space-lg aspect-[16/10] bg-surface-container-lowest">
            <img
              :src="product.image"
              :alt="product.imageAlt"
              class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              width="1280"
              height="800"
              loading="lazy"
              decoding="async"
            >
          </div>
          <div>
            <div class="flex flex-wrap items-center justify-between gap-space-sm mb-space-md">
              <span
                class="px-3 py-1 rounded-full border font-label-sm text-label-sm"
                :class="accents[product.accent].chip"
              >
                {{ product.category }}
              </span>
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface text-secondary font-label-sm text-[12px] border border-secondary/20">
                <span class="w-2 h-2 rounded-full bg-secondary animate-pulse-glow"></span> Demo Online
              </span>
            </div>
            <h3
              class="font-headline-lg text-headline-md md:text-headline-lg text-text-primary"
              :class="product.segment ? 'mb-1' : 'mb-2'"
            >
              {{ product.name }}
            </h3>
            <p
              v-if="product.segment"
              class="font-label-sm text-label-sm uppercase tracking-wider mb-2"
              :class="accents[product.accent].link"
            >
              {{ product.segment }}
            </p>
            <p class="font-body-md text-body-md text-text-muted mb-space-lg">
              {{ product.summary }}
            </p>
            <ul class="flex flex-wrap gap-2 mb-space-lg">
              <li
                v-for="highlight in product.highlights"
                :key="highlight"
                class="px-2.5 py-1 rounded-lg bg-surface-container-low text-text-muted font-mono text-[11px] border border-border-subtle/40"
              >
                {{ highlight }}
              </li>
            </ul>
          </div>
          <div class="flex items-center justify-between gap-space-sm flex-wrap pt-space-md border-t border-border-subtle/30">
            <span class="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-text-muted">
              <span class="material-symbols-outlined text-[18px]" aria-hidden="true">{{ product.icon }}</span>
              Produto em produção
            </span>
            <a
              class="inline-flex items-center gap-space-xs font-label-md text-label-md transition-colors group-hover:translate-x-0.5"
              :class="accents[product.accent].link"
              :href="product.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="demoLabel(product.name, product.segment)"
            >
              <span>Ver demonstração</span>
              <span class="material-symbols-outlined text-[18px]" aria-hidden="true">open_in_new</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
