import { onScopeDispose, readonly, ref, type Ref } from 'vue'

/**
 * `prefers-reduced-motion: reduce` reativo. SSR-safe: no server devolve `false`
 * (o listener só existe no client). Cada caller recebe seu próprio listener,
 * removido via onScopeDispose.
 */
export function useReducedMotion(): Readonly<Ref<boolean>> {
  const reduced = ref(false)

  if (typeof window !== 'undefined' && 'matchMedia' in window) {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.value = mql.matches
    const update = (event: MediaQueryListEvent): void => {
      reduced.value = event.matches
    }
    mql.addEventListener('change', update)
    onScopeDispose(() => mql.removeEventListener('change', update))
  }

  return readonly(reduced)
}
