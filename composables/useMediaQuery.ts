import { onScopeDispose, readonly, ref, type Ref } from 'vue'

/**
 * matchMedia reativo (SSR-safe: `false` no server, listener no client).
 * Usado para ativar os canvases do hero apenas em viewport lg+.
 */
export function useMediaQuery(query: string): Readonly<Ref<boolean>> {
  const matches = ref(false)

  if (typeof window !== 'undefined' && 'matchMedia' in window) {
    const mql = window.matchMedia(query)
    matches.value = mql.matches
    const update = (event: MediaQueryListEvent): void => {
      matches.value = event.matches
    }
    mql.addEventListener('change', update)
    onScopeDispose(() => mql.removeEventListener('change', update))
  }

  return readonly(matches)
}
