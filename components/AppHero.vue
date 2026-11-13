<template>
  <section
    id="inicio"
    class="relative w-full overflow-hidden px-margin-mobile md:px-margin py-space-xl md:py-24 min-h-[92vh] flex items-center justify-center scroll-mt-24"
  >
    <ClientOnly>
      <AppHeroShader class="hidden lg:block" />
      <AppHeroThree class="hidden lg:block" />
    </ClientOnly>
    <div class="hidden lg:block absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-glow"></div>
    <div class="hidden lg:block absolute top-1/3 right-1/4 w-[420px] h-[240px] bg-secondary-container/10 rounded-full blur-[90px] pointer-events-none -z-10"></div>
    <div class="lg:hidden ambient-orb-1 absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
    <div class="lg:hidden ambient-orb-2 absolute top-44 -right-10 w-64 h-64 bg-secondary/15 rounded-full blur-[70px] pointer-events-none"></div>
    <div class="max-w-[1280px] mx-auto flex flex-col items-center text-center relative z-10 w-full">
      <div class="hero-reveal-1 inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-high/80 backdrop-blur-md mb-space-lg shadow-sm border border-border-subtle/60 hover:border-primary/40 transition-all">
        <span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
        <span class="font-label-sm text-label-sm text-text-secondary tracking-wide uppercase">Alta Engenharia &amp; Arquitetura Digital</span>
      </div>
      <h1 class="hero-reveal-2 font-display-hero text-headline-lg-mobile md:text-display-hero tracking-tight text-text-primary max-w-4xl mx-auto mb-space-lg transition-transform duration-500">
        Tecnologia que transforma ideias em
        <span class="bg-gradient-to-r from-violet-light via-primary to-secondary bg-clip-text text-transparent">soluções.</span>
      </h1>
      <p class="hero-reveal-3 font-body-lg text-body-md md:text-body-lg text-text-muted max-w-2xl mx-auto mb-space-xl">
        Desenvolvemos software, arquiteturas e produtos digitais que ajudam empresas a superar desafios complexos e liderar seus mercados.
      </p>
      <div class="hero-reveal-4 flex flex-col sm:flex-row items-center justify-center gap-space-md w-full max-w-md mx-auto mb-0 lg:mb-16">
        <a
          class="btn-sheen w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-3.5 rounded-xl bg-primary-container hover:bg-violet-hover text-text-primary font-label-md text-label-md transition-all shadow-[0_0_28px_rgba(140,128,255,0.35)] hover:shadow-[0_0_36px_rgba(140,128,255,0.6)] hover:-translate-y-0.5 active:translate-y-0 group"
          href="#contato"
        >
          <span>Conheça nossas soluções</span>
          <span class="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
        </a>
        <a
          class="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-3.5 rounded-xl bg-surface/80 hover:bg-surface-elevated text-text-secondary hover:text-text-primary font-label-md text-label-md backdrop-blur-md transition-all border border-border-subtle/40 hover:border-secondary/40 shadow-sm hover:-translate-y-0.5"
          href="#produtos"
        >
          <span>Explore nossos produtos</span>
          <span class="material-symbols-outlined text-[18px]">arrow_outward</span>
        </a>
      </div>
      <AppHeroMockup class="hero-reveal-5" />
    </div>
  </section>
</template>
