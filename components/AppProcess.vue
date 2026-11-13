<script setup lang="ts">
const section = ref<HTMLElement | null>(null)
useScrollReveal(section, { stagger: 90 })

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Entendimento aprofundado dos objetivos reais, mapeamento de restrições e definição de KPIs essenciais.',
    numberColor: 'text-primary',
    hoverBorder: 'hover:border-primary/40',
    tag: 'Imersão',
    tagColor: 'text-primary',
    titleHover: 'group-hover:text-primary',
    numClass: 'bg-primary text-on-primary shadow-[0_0_10px_rgba(198,191,255,0.4)]',
  },
  {
    number: '02',
    title: 'Estratégia',
    description: 'Definição do melhor direcionamento técnico, dimensionamento de times e planejamento tático da entrega.',
    numberColor: 'text-secondary',
    hoverBorder: 'hover:border-secondary/40',
    tag: 'Planejamento',
    tagColor: 'text-secondary',
    titleHover: 'group-hover:text-secondary',
    numClass: 'bg-surface-elevated border border-secondary/40 text-secondary shadow-md',
  },
  {
    number: '03',
    title: 'Arquitetura',
    description: 'Desenho de soluções resilientes, com modelos de dados consistentes, alta escalabilidade e segurança.',
    numberColor: 'text-violet-light',
    hoverBorder: 'hover:border-violet-light/40',
    tag: 'Blueprint',
    tagColor: 'text-primary',
    titleHover: 'group-hover:text-primary',
    numClass: 'bg-surface-elevated border border-primary/40 text-primary shadow-md',
  },
  {
    number: '04',
    title: 'Desenvolvimento',
    description: 'Construção orientada a testes, clean code, code reviews rigorosos e entregas contínuas em ciclos curtos.',
    numberColor: 'text-tertiary',
    hoverBorder: 'hover:border-tertiary/40',
    tag: 'Execução',
    tagColor: 'text-secondary',
    titleHover: 'group-hover:text-secondary',
    numClass: 'bg-surface-elevated border border-secondary/40 text-secondary shadow-md',
  },
  {
    number: '05',
    title: 'Evolução',
    description: 'Monitoramento em produção, observabilidade proativa, otimização contínua e suporte técnico especializado.',
    numberColor: 'text-primary',
    hoverBorder: 'hover:border-primary/40',
    tag: 'Observabilidade',
    tagColor: 'text-primary',
    titleHover: 'group-hover:text-primary',
    numClass: 'bg-primary text-on-primary shadow-[0_0_10px_rgba(198,191,255,0.4)]',
  },
]
</script>

<template>
  <section ref="section" class="w-full px-margin-mobile md:px-margin py-space-xl md:py-28 max-w-[1280px] mx-auto">
    <div class="reveal max-w-3xl mb-space-xl">
      <span class="font-label-sm text-label-sm text-primary uppercase tracking-wider mb-space-xs block">Metodologia e Ciclo</span>
      <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary tracking-tight mb-space-sm">
        Da estratégia à entrega.
      </h2>
      <p class="font-body-md text-body-md text-text-muted">
        Cada solução começa com entendimento aprofundado, evolui com disciplina técnica e segue crescendo de forma contínua e sustentável.
      </p>
    </div>

    <!-- Timeline vertical mobile (<lg) — referência mobile L577-646 -->
    <div class="lg:hidden relative flex flex-col pl-4">
      <div class="absolute left-[27px] top-4 bottom-8 w-[2px] timeline-gradient-line rounded-full"></div>
      <div
        v-for="step in steps"
        :key="step.number"
        class="reveal step-item relative flex items-start gap-4 pb-8 last:pb-0 group"
      >
        <div
          class="step-num w-7 h-7 rounded-full flex items-center justify-center font-mono text-[12px] font-bold shrink-0 z-10 transition-transform duration-200"
          :class="step.numClass"
        >
          {{ Number(step.number) }}
        </div>
        <div class="flex flex-col gap-1 pt-0.5">
          <span class="font-mono text-[11px] font-label-sm uppercase" :class="step.tagColor">{{ step.number }} // {{ step.tag }}</span>
          <h4 class="font-headline-sm text-headline-sm text-text-primary font-semibold transition-colors" :class="step.titleHover">{{ step.title }}</h4>
          <p class="font-body-sm text-body-sm text-text-muted">
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Grid desktop (lg+) -->
    <div class="hidden lg:grid grid-cols-5 gap-space-lg relative">
      <div class="absolute top-10 left-12 right-12 h-0.5 bg-surface-container-high -z-0"></div>
      <div
        v-for="step in steps"
        :key="step.number"
        class="reveal relative z-10 flex flex-col bg-surface p-space-lg rounded-2xl shadow-md border border-border-subtle/40 transition-all hover:-translate-y-1"
        :class="step.hoverBorder"
      >
        <div
          class="w-12 h-12 rounded-xl bg-surface-elevated font-headline-sm flex items-center justify-center mb-space-md font-mono shadow-sm"
          :class="step.numberColor"
        >
          {{ step.number }}
        </div>
        <h4 class="font-headline-sm text-headline-sm text-text-primary mb-space-xs">{{ step.title }}</h4>
        <p class="font-body-sm text-body-sm text-text-muted">
          {{ step.description }}
        </p>
      </div>
    </div>
  </section>
</template>
