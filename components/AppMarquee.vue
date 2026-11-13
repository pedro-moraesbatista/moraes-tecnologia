<script setup lang="ts">
const items = [
  { label: 'SOFTWARE ENGINEERING', dot: 'bg-primary' },
  { label: 'CLOUD INFRASTRUCTURE', dot: 'bg-secondary' },
  { label: 'SYSTEM ARCHITECTURE', dot: 'bg-primary' },
  { label: 'AUTOMATION & DEVOPS', dot: 'bg-secondary' },
  { label: 'DIGITAL PRODUCTS', dot: 'bg-primary' },
  { label: 'ARTIFICIAL INTELLIGENCE', dot: 'bg-secondary' },
  { label: 'ENTERPRISE INTEGRATIONS', dot: 'bg-primary' },
]
</script>

<template>
  <section class="w-full py-space-md bg-surface-container overflow-hidden border-y border-border-subtle/50">
    <div class="flex whitespace-nowrap overflow-hidden py-1">
      <div data-testid="marquee-track" class="flex items-center gap-space-xl animate-[marquee_25s_linear_infinite] shrink-0 font-label-md text-label-md text-text-secondary tracking-widest uppercase">
        <span v-for="item in items" :key="item.label" class="flex items-center gap-space-sm">
          <span class="w-1.5 h-1.5 rounded-full inline-block" :class="item.dot"></span> {{ item.label }}
        </span>
      </div>
      <div
        aria-hidden="true"
        class="flex items-center gap-space-xl animate-[marquee_25s_linear_infinite] shrink-0 font-label-md text-label-md text-text-secondary tracking-widest uppercase ml-space-xl"
      >
        <span v-for="item in items" :key="item.label" class="flex items-center gap-space-sm">
          <span class="w-1.5 h-1.5 rounded-full inline-block" :class="item.dot"></span> {{ item.label }}
        </span>
      </div>
    </div>
  </section>
</template>
