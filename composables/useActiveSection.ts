import { onScopeDispose, ref, type Ref } from 'vue'

/**
 * Scrollspy das âncoras da navbar (DESIGN.md §6 — indicador de seção ativa).
 * Observa as seções e devolve a âncora ativa: a primeira (de cima para baixo)
 * que cruca a linha a ~45% da viewport. Sem interseção, mantém a última ativa.
 * SSR-safe: default = primeira âncora (client corrige no primeiro callback).
 */
export function useActiveSection(anchors: string[]): Readonly<Ref<string>> {
  const active = ref(anchors[0] ?? '')

  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    onMounted(() => {
      const sections = anchors
        .map((anchor) => anchor.replace(/^#/, ''))
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)

      if (sections.length === 0) return

      const intersecting = new Set<HTMLElement>()
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const target = entry.target as HTMLElement
            if (entry.isIntersecting) intersecting.add(target)
            else intersecting.delete(target)
          }
          if (intersecting.size === 0) return
          const topmost = [...intersecting].sort(
            (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top,
          )[0]
          active.value = `#${topmost.id}`
        },
        { rootMargin: '-45% 0px -55% 0px', threshold: 0 },
      )
      for (const section of sections) observer.observe(section)
      onScopeDispose(() => observer.disconnect())
    })
  }

  return active
}
