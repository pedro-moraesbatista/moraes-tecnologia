<template>
  <main class="flex min-h-screen flex-col items-center justify-center bg-[#090D18] px-gutter-mobile py-margin-mobile text-center">
    <p class="font-label-md text-label-md text-text-muted">Erro 404</p>
    <h1 class="mt-space-sm font-headline-lg text-headline-lg text-text-primary">Página não encontrada</h1>
    <p class="mt-space-sm max-w-md font-body-md text-body-md text-text-secondary">
      A página que você procura não existe ou foi movida.
    </p>
    <NuxtLink
      to="/"
      class="mt-space-lg inline-flex items-center justify-center rounded-xl border border-border-subtle bg-surface-elevated px-space-lg py-space-sm font-label-md text-label-md text-text-primary transition-all duration-200 hover:bg-surface"
    >
      Voltar ao início
    </NuxtLink>
  </main>
</template>
