<script setup lang="ts">
import { site } from '~/config/site'

const section = ref<HTMLElement | null>(null)
useScrollReveal(section, { stagger: 120 })
</script>

<template>
  <section
    id="contato"
    ref="section"
    class="w-full bg-surface-container-low/60 py-space-xl md:py-28 px-margin-mobile md:px-margin relative overflow-hidden scroll-mt-24"
  >
    <div class="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
      <div class="reveal lg:col-span-5 flex flex-col">
        <div>
          <span class="font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-space-xs block">Contato Direto</span>
          <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary tracking-tight mb-space-md">
            Vamos construir algo extraordinário?
          </h2>
          <p class="font-body-lg text-body-md md:text-body-lg text-text-muted mb-space-xl">
            Conte um pouco sobre seu desafio corporativo. Nossos arquitetos e especialistas analisarão seu cenário técnico sem custos preliminares.
          </p>
          <div class="space-y-space-md">
            <div class="flex items-center gap-space-md p-space-md bg-surface rounded-xl shadow-sm border border-border-subtle/40 hover:border-primary/40 transition-colors">
              <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined text-[22px]">mail</span>
              </div>
              <div>
                <span class="font-body-sm text-[12px] text-text-muted block">E-mail Corporativo</span>
                <a
                  v-if="site.contact.email"
                  class="font-label-md text-label-md text-text-primary font-semibold hover:text-primary transition-colors"
                  :href="`mailto:${site.contact.email}`"
                >{{ site.contact.email }}</a>
                <span v-else class="font-label-md text-label-md text-text-muted font-semibold">A configurar</span>
              </div>
            </div>
            <div class="flex items-center gap-space-md p-space-md bg-surface rounded-xl shadow-sm border border-border-subtle/40 hover:border-secondary/40 transition-colors">
              <div class="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                <span class="material-symbols-outlined text-[22px]">chat</span>
              </div>
              <div>
                <span class="font-body-sm text-[12px] text-text-muted block">WhatsApp Corporativo</span>
                <a
                  v-if="site.contact.whatsapp"
                  class="font-label-md text-label-md text-text-primary font-semibold hover:text-secondary transition-colors"
                  :href="`https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}`"
                  rel="noopener noreferrer"
                  target="_blank"
                >{{ site.contact.whatsappDisplay ?? site.contact.whatsapp }}</a>
                <span v-else class="font-label-md text-label-md text-text-muted font-semibold">A configurar</span>
              </div>
            </div>
            <div v-if="site.contact.address" class="flex items-center gap-space-md p-space-md bg-surface rounded-xl shadow-sm border border-border-subtle/40 hover:border-tertiary/40 transition-colors">
              <div class="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
                <span class="material-symbols-outlined text-[22px]">location_on</span>
              </div>
              <div>
                <span class="font-body-sm text-[12px] text-text-muted block">Endereço</span>
                <span class="font-label-md text-label-md text-text-primary font-semibold">{{ site.contact.address }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="reveal lg:col-span-7 bg-surface rounded-3xl p-space-lg md:p-space-xl shadow-2xl relative border border-border-subtle/50">
        <AppContactForm />
      </div>
    </div>
  </section>
</template>
