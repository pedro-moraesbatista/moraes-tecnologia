<script setup lang="ts">
import { site } from '~/config/site'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const aside = ref<HTMLElement | null>(null)

const backdropMounted = ref(false)
const backdropVisible = ref(false)

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])'

let savedOverflow = ''
let hideTimeout = 0

function focusFirst(): void {
  const first = aside.value?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)
  first?.focus()
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    emit('close')
    return
  }
  if (event.key !== 'Tab') return
  const focusables = aside.value
    ? Array.from(aside.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
    : []
  if (focusables.length === 0) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  const current = document.activeElement
  if (event.shiftKey && current === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && current === last) {
    event.preventDefault()
    first.focus()
  } else if (current === null || !aside.value?.contains(current)) {
    event.preventDefault()
    first.focus()
  }
}

onMounted(() => {
  watch(
    () => props.open,
    (open) => {
      if (open) {
        backdropMounted.value = true
        requestAnimationFrame(() => {
          backdropVisible.value = true
        })
        savedOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        document.addEventListener('keydown', handleKeydown)
        nextTick(focusFirst)
      } else {
        backdropVisible.value = false
        document.body.style.overflow = savedOverflow
        document.removeEventListener('keydown', handleKeydown)
        hideTimeout = window.setTimeout(() => {
          backdropMounted.value = false
        }, 300)
      }
    },
  )
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = savedOverflow
  if (hideTimeout) window.clearTimeout(hideTimeout)
})
</script>

<template>
  <div
    v-if="backdropMounted"
    aria-hidden="true"
    class="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md transition-opacity duration-300"
    :class="backdropVisible ? 'opacity-100' : 'opacity-0'"
    @click="emit('close')"
  ></div>
  <aside
    id="mobile-drawer"
    ref="aside"
    role="dialog"
    aria-label="Menu de navegação"
    :aria-modal="open ? 'true' : undefined"
    :aria-hidden="!open"
    :inert="!open"
    class="fixed top-0 right-0 bottom-0 w-5/6 max-w-[340px] z-50 bg-surface-container-low/95 backdrop-blur-2xl p-space-lg flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.85)] border-l border-white/10 pt-safe pb-safe"
    :class="open ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="flex flex-col gap-space-lg">
      <div class="flex items-center justify-between">
        <img alt="Logo Moraes Tecnologia" class="h-7 w-auto object-contain" src="/logo.svg">
        <button
          aria-label="Fechar Menu"
          class="w-11 h-11 flex items-center justify-center text-text-muted hover:text-text-primary active:scale-90 rounded-lg hover:bg-surface-elevated transition-all"
          type="button"
          @click="emit('close')"
        >
          <span class="material-symbols-outlined text-[24px]">close</span>
        </button>
      </div>
      <nav aria-label="Navegação do menu" class="flex flex-col gap-space-xs">
        <a
          v-for="item in site.nav"
          :key="item.href"
          :href="item.href"
          class="min-h-[44px] px-space-md py-space-sm rounded-lg font-headline-sm text-headline-sm flex items-center justify-between transition-all active:translate-x-1 text-text-muted hover:text-text-primary hover:bg-surface-elevated"
          @click="emit('close')"
        >
          {{ item.label }}
          <span class="material-symbols-outlined text-[18px] text-text-muted">chevron_right</span>
        </a>
      </nav>
    </div>
    <div class="flex flex-col gap-space-md pt-space-lg border-t border-white/5">
      <a
        class="w-full min-h-[48px] px-space-lg py-space-sm rounded-xl bg-primary-container hover:bg-violet-hover text-text-primary font-headline-sm text-headline-sm flex items-center justify-center font-medium shadow-md transition-all active:scale-[0.98] btn-sheen"
        href="#contato"
        @click="emit('close')"
      >Vamos conversar</a>
      <p v-if="site.contact.address" class="font-label-sm text-label-sm text-text-muted text-center">{{ site.contact.address }}</p>
    </div>
  </aside>
</template>
