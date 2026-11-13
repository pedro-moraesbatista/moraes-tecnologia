<script setup lang="ts">
import { site } from '~/config/site'

const navLinks = site.nav.map((item) => ({
  ...item,
  label: item.href === '#sobre' ? 'Sobre Nós' : item.label,
}))

const solutions = [
  { label: 'Engenharia Customizada', href: '#servicos' },
  { label: 'Modernização de Legados', href: '#servicos' },
  { label: 'Arquitetura Cloud', href: '#servicos' },
  { label: 'Plataformas SaaS', href: '#produtos' },
]
</script>

<template>
  <footer class="w-full bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
    <div class="max-w-[1280px] mx-auto px-margin-mobile md:px-margin py-space-xl">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl mb-space-xl">
        <div class="lg:col-span-2 space-y-space-md">
          <div class="flex items-center gap-space-sm">
            <img alt="Moraes Tecnologia" class="h-12 w-auto object-contain" src="/logo.svg">
          </div>
          <p class="font-body-sm text-body-sm text-text-muted max-w-sm">Engenharia de software de alta performance, arquitetura em nuvem e soluções tecnológicas estratégicas para empresas em escala global.</p>
        </div>
        <div class="space-y-space-sm">
          <h4 class="font-label-md text-label-md text-text-primary uppercase tracking-wider font-semibold">Navegação</h4>
          <ul class="space-y-space-xs">
            <li v-for="link in navLinks" :key="link.href">
              <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" :href="link.href">{{ link.label }}</a>
            </li>
          </ul>
        </div>
        <div class="space-y-space-sm">
          <h4 class="font-label-md text-label-md text-text-primary uppercase tracking-wider font-semibold">Soluções</h4>
          <ul class="space-y-space-xs">
            <li v-for="link in solutions" :key="link.label">
              <a class="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" :href="link.href">{{ link.label }}</a>
            </li>
          </ul>
        </div>
        <div class="space-y-space-sm">
          <h4 class="font-label-md text-label-md text-text-primary uppercase tracking-wider font-semibold">Contato</h4>
          <ul class="space-y-space-xs">
            <li v-if="site.contact.email"><span class="font-body-sm text-body-sm text-text-muted block">{{ site.contact.email }}</span></li>
            <li v-if="site.contact.whatsapp">
              <a
                class="font-body-sm text-body-sm text-text-muted hover:text-text-primary transition-colors block"
                :href="`https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}`"
                rel="noopener noreferrer"
                target="_blank"
              >WhatsApp {{ site.contact.whatsappDisplay ?? site.contact.whatsapp }}</a>
            </li>
            <li v-if="site.contact.address"><span class="font-body-sm text-body-sm text-text-muted block">{{ site.contact.address }}</span></li>
            <li>
              <a class="inline-block mt-space-xs font-label-sm text-label-sm text-violet-light hover:text-primary transition-colors" href="#contato">Agendar Reunião →</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md bg-surface-container/30 px-space-md py-space-sm rounded-xl">
        <p class="font-body-sm text-body-sm text-text-muted">© {{ new Date().getFullYear() }} {{ site.name }}. Todos os direitos reservados.</p>
        <p class="font-body-sm text-body-sm text-text-muted text-center md:text-right">
          {{ site.legalName }} · CNPJ {{ site.cnpj }}
        </p>
      </div>
    </div>
  </footer>
</template>
