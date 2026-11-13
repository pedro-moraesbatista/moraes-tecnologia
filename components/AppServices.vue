<script setup lang="ts">
const section = ref<HTMLElement | null>(null)
useScrollReveal(section, { stagger: 90 })
</script>

<template>
  <section id="servicos" ref="section" class="w-full px-margin-mobile md:px-margin py-space-xl md:py-28 max-w-[1280px] mx-auto scroll-mt-24">
    <div class="reveal flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
      <div class="max-w-2xl">
        <span class="font-label-sm text-label-sm text-primary uppercase tracking-wider mb-space-xs block">Capacidades Técnicas</span>
        <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary tracking-tight">
          Soluções que conectam tecnologia e negócios.
        </h2>
      </div>
      <p class="font-body-md text-body-md text-text-muted max-w-md">
        Da estratégia à implementação de ponta a ponta, construímos soluções tecnológicas sob medida alinhadas aos desafios singulares de cada organização.
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
      <div class="reveal h-full interactive-card bg-surface hover:bg-surface-elevated rounded-2xl p-space-xl relative overflow-hidden group shadow-lg flex flex-col justify-between">
        <div class="relative z-10">
          <div class="icon-box w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-space-lg">
            <span class="material-symbols-outlined text-[28px]">query_stats</span>
          </div>
          <span class="font-label-sm text-[12px] text-secondary font-mono tracking-wider">01 // ADVISORY &amp; STRATEGY</span>
          <h3 class="font-headline-md text-headline-md text-text-primary mt-1 mb-space-sm">Consultoria Tecnológica</h3>
          <p class="font-body-md text-body-md text-text-muted mb-space-lg">
            Orientação estratégica para decisões tecnológicas mais inteligentes e sustentáveis. Avaliação de débito técnico, governança e planos de transformação digital.
          </p>
        </div>
        <div class="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between text-text-muted font-mono text-[12px] border border-border-subtle/30 relative z-10">
          <span>Diagnóstico Estratégico</span>
          <span class="text-primary">High Value Impact</span>
        </div>
        <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all pointer-events-none"></div>
      </div>
      <div class="reveal h-full interactive-card bg-surface hover:bg-surface-elevated rounded-2xl p-space-xl relative overflow-hidden shadow-lg flex flex-col justify-between">
        <div>
          <div class="icon-box w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-space-lg">
            <span class="material-symbols-outlined text-[28px]">code_blocks</span>
          </div>
          <span class="font-label-sm text-[12px] text-secondary font-mono tracking-wider">02 // CUSTOM DEV</span>
          <h3 class="font-headline-md text-headline-md text-text-primary mt-1 mb-space-sm">Desenvolvimento de Software</h3>
          <p class="font-body-md text-body-md text-text-muted mb-space-lg">
            Aplicações e sistemas personalizados construídos para atender às necessidades reais do negócio com rigor de engenharia e zero redundâncias.
          </p>
        </div>
        <div class="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between text-text-muted font-mono text-[12px] border border-border-subtle/30">
          <span>Testes automatizados</span>
          <span class="text-secondary">Clean Arch</span>
        </div>
      </div>
      <div class="reveal h-full interactive-card bg-surface hover:bg-surface-elevated rounded-2xl p-space-xl relative overflow-hidden shadow-lg flex flex-col justify-between">
        <div>
          <div class="icon-box w-12 h-12 rounded-xl bg-violet-light/10 flex items-center justify-center text-violet-light mb-space-lg">
            <span class="material-symbols-outlined text-[28px]">account_tree</span>
          </div>
          <span class="font-label-sm text-[12px] text-violet-light font-mono tracking-wider">03 // ARCHITECTURE</span>
          <h3 class="font-headline-md text-headline-md text-text-primary mt-1 mb-space-sm">Arquitetura de Sistemas</h3>
          <p class="font-body-md text-body-md text-text-muted mb-space-lg">
            Arquiteturas robustas, desacopladas, escaláveis e preparadas para acompanhar o crescimento exponencial de dados e requisições.
          </p>
        </div>
        <div class="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between text-text-muted font-mono text-[12px] border border-border-subtle/30">
          <span>Event-Driven</span>
          <span class="text-violet-light">High Availability</span>
        </div>
      </div>
      <div class="reveal h-full interactive-card bg-surface hover:bg-surface-elevated rounded-2xl p-space-xl relative overflow-hidden shadow-lg flex flex-col justify-between">
        <div>
          <div class="icon-box w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary mb-space-lg">
            <span class="material-symbols-outlined text-[28px]">sync_alt</span>
          </div>
          <span class="font-label-sm text-[12px] text-tertiary font-mono tracking-wider">04 // INTEGRATION</span>
          <h3 class="font-headline-md text-headline-md text-text-primary mt-1 mb-space-sm">APIs e Integrações</h3>
          <p class="font-body-md text-body-md text-text-muted mb-space-lg">
            Conectamos sistemas legados, serviços parceiros e ecossistemas em nuvem para simplificar operações e unificar fluxos de dados essenciais.
          </p>
        </div>
        <div class="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between text-text-muted font-mono text-[12px] border border-border-subtle/30">
          <span>REST / GraphQL / gRPC</span>
          <span class="text-tertiary">Sincronização contínua</span>
        </div>
      </div>
      <div class="reveal h-full interactive-card bg-surface hover:bg-surface-elevated rounded-2xl p-space-xl relative overflow-hidden shadow-lg flex flex-col justify-between">
        <div>
          <div class="icon-box w-12 h-12 rounded-xl bg-secondary-fixed-dim/10 flex items-center justify-center text-secondary-fixed-dim mb-space-lg">
            <span class="material-symbols-outlined text-[28px]">cloud_done</span>
          </div>
          <span class="font-label-sm text-[12px] text-secondary font-mono tracking-wider">05 // CLOUD &amp; DEVOPS</span>
          <h3 class="font-headline-md text-headline-md text-text-primary mt-1 mb-space-sm">Cloud e DevOps</h3>
          <p class="font-body-md text-body-md text-text-muted mb-space-lg">
            Infraestrutura ágil como código (IaC), automação CI/CD e práticas modernas para entregas rápidas com máxima confiabilidade.
          </p>
        </div>
        <div class="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between text-text-muted font-mono text-[12px] border border-border-subtle/30">
          <span>Azure / GCP / Docker</span>
        </div>
      </div>
      <div class="reveal h-full interactive-card bg-surface hover:bg-surface-elevated rounded-2xl p-space-xl relative overflow-hidden shadow-lg flex flex-col justify-between">
        <div>
          <div class="icon-box w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary mb-space-lg">
            <span class="material-symbols-outlined text-[28px]">smart_toy</span>
          </div>
          <span class="font-label-sm text-[12px] text-primary font-mono tracking-wider">06 // AI &amp; AUTOMATION</span>
          <h3 class="font-headline-md text-headline-md text-text-primary mt-1 mb-space-sm">IA e Automação</h3>
          <p class="font-body-md text-body-md text-text-muted mb-space-lg">
            Aplicamos modelos generativos, NLP e rotinas inteligentes para otimizar fluxos operacionais, reduzindo tempo de processamento.
          </p>
        </div>
        <div class="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between text-text-muted font-mono text-[12px] border border-border-subtle/30">
          <span>LLMs Corporativos / Pipelines</span>
        </div>
      </div>
    </div>
  </section>
</template>
