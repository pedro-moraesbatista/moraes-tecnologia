<script setup lang="ts">
// Sem JS os elementos `.reveal` ficariam invisíveis (estado inicial do scroll
// reveal) — o noscript devolve o estado final.
useHead({
  noscript: [
    { innerHTML: '<style>.reveal{opacity:1 !important;transform:none !important}</style>' },
  ],
})
</script>

<template>
  <NuxtPage />
</template>
