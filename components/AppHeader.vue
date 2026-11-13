<script setup lang="ts">
import { site } from '~/config/site'

const drawerOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
const activeSection = useActiveSection(site.nav.map((item) => item.href))

watch(drawerOpen, (open, wasOpen) => {
  if (!open && wasOpen) menuButton.value?.focus()
})
</script>

<template>
  <header class="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
    <div class="h-20 max-w-[1280px] mx-auto px-margin-mobile md:px-margin flex items-center justify-between gap-space-md">
      <div class="flex items-center gap-space-md shrink-0">
        <img alt="Moraes Tecnologia" class="h-12 w-auto object-contain" src="/logo.svg">
      </div>
      <nav aria-label="Navegação principal" class="hidden lg:flex items-center gap-space-lg">
        <a
          v-for="item in site.nav"
          :key="item.href"
          class="font-label-md text-label-md transition-colors"
          :class="activeSection === item.href ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'"
          :href="item.href"
          :aria-current="activeSection === item.href ? 'true' : undefined"
        >{{ item.label }}</a>
      </nav>
      <div class="flex items-center gap-space-md">
        <a
          class="hidden sm:inline-flex items-center justify-center px-space-lg py-space-sm bg-primary-container hover:bg-violet-hover text-text-primary font-label-md text-label-md rounded-xl transition-all shadow-[0_0_20px_rgba(118,103,248,0.25)]"
          href="#contato"
        >Vamos conversar</a>
        <button
          ref="menuButton"
          aria-label="Abrir Menu"
          :aria-expanded="drawerOpen"
          aria-controls="mobile-drawer"
          class="w-11 h-11 flex items-center justify-center text-text-primary rounded-lg hover:bg-surface-elevated active:bg-surface-container-high transition-colors lg:hidden"
          type="button"
          @click="drawerOpen = true"
        >
          <span class="material-symbols-outlined text-[24px]">menu</span>
        </button>
      </div>
    </div>
  </header>
  <AppMobileDrawer :open="drawerOpen" @close="drawerOpen = false" />
</template>
