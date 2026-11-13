<script setup lang="ts">
const section = ref<HTMLElement | null>(null)
useScrollReveal(section, { stagger: 90 })

const pillars = [
  {
    icon: 'visibility',
    iconBox: 'bg-primary/10 text-primary',
    title: 'Visão Estratégica',
    description: 'Tecnologia orientada a resultados de negócio tangíveis, e não apenas código por código.',
    footer: '01 / IMPACTO',
    footerColor: 'text-primary',
  },
  {
    icon: 'verified',
    iconBox: 'bg-secondary/10 text-secondary',
    title: 'Engenharia de Qualidade',
    description: 'Clean code, governança técnica, testes de ponta a ponta e manutenibilidade garantida.',
    footer: '02 / ROBUSTEZ',
    footerColor: 'text-secondary',
  },
  {
    icon: 'expand',
    iconBox: 'bg-violet-light/10 text-violet-light',
    title: 'Arquitetura Escalável',
    description: 'Sistemas elásticos desenhados para responder sem falhas a picos de tráfego e expansão acelerada.',
    footer: '03 / ESCALABILIDADE',
    footerColor: 'text-violet-light',
  },
  {
    icon: 'autorenew',
    iconBox: 'bg-tertiary/10 text-tertiary',
    title: 'Evolução Contínua',
    description: 'Acompanhamento contínuo, aprimoramento de performance e parceria técnica em longo prazo.',
    footer: '04 / LONGEVIDADE',
    footerColor: 'text-tertiary',
  },
]
</script>

<template>
  <section id="sobre" ref="section" class="w-full px-margin-mobile md:px-margin py-space-xl md:py-28 max-w-[1280px] mx-auto scroll-mt-24">
    <div class="reveal text-center max-w-3xl mx-auto mb-space-xl">
      <span class="font-label-sm text-label-sm text-primary uppercase tracking-wider mb-space-xs block">Nossos Pilares</span>
      <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary tracking-tight">
        Mais do que desenvolver software. Construímos soluções.
      </h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
      <div
        v-for="pillar in pillars"
        :key="pillar.title"
        class="reveal interactive-card bg-surface p-space-xl rounded-2xl flex flex-col justify-between hover:bg-surface-elevated shadow-md"
      >
        <div>
          <div class="icon-box w-12 h-12 rounded-xl flex items-center justify-center mb-space-lg" :class="pillar.iconBox">
            <span class="material-symbols-outlined text-[26px]">{{ pillar.icon }}</span>
          </div>
          <h3 class="font-headline-sm text-headline-sm text-text-primary mb-space-xs">{{ pillar.title }}</h3>
          <p class="font-body-sm text-body-sm text-text-muted">
            {{ pillar.description }}
          </p>
        </div>
        <div class="mt-space-lg pt-space-sm text-[12px] font-mono" :class="pillar.footerColor">{{ pillar.footer }}</div>
      </div>
    </div>
  </section>
</template>
