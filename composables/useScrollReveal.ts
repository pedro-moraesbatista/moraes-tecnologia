import { onBeforeUnmount, onMounted, watch, type Ref } from 'vue'

export interface ScrollRevealOptions {
  /** Seletores dos elementos revelados dentro do container (default `.reveal`). */
  selector?: string
  /** Delay entre elementos do mesmo batch de interseção, em ms. */
  stagger?: number
  threshold?: number
  rootMargin?: string
}

/**
 * Reveal-once por IntersectionObserver. Estados (main.css): `.reveal` = inicial
 * (opacity-0/translateY-14px), `.reveal-anim` = revealUp com `--reveal-delay`,
 * `.revealed` = final. Com reduced-motion o estado final é aplicado na hora,
 * sem observer. `once: true` — cada elemento é desobservado após revelar.
 */
export function useScrollReveal(
  container: Ref<HTMLElement | null | undefined>,
  options: ScrollRevealOptions = {},
): void {
  const {
    selector = '.reveal',
    stagger = 90,
    threshold = 0.15,
    rootMargin = '0px 0px -8% 0px',
  } = options

  const reducedMotion = useReducedMotion()

  let observer: IntersectionObserver | null = null
  let targets: HTMLElement[] = []

  function revealElement(el: HTMLElement, delay: number): void {
    el.style.setProperty('--reveal-delay', `${delay}ms`)
    const settle = (): void => {
      el.classList.remove('reveal-anim')
      el.classList.add('revealed')
      el.removeEventListener('animationend', settle)
      el.removeEventListener('animationcancel', settle)
    }
    el.addEventListener('animationend', settle)
    el.addEventListener('animationcancel', settle)
    el.classList.add('reveal-anim')
  }

  function finalizeAll(): void {
    for (const el of targets) {
      el.classList.remove('reveal-anim')
      el.classList.add('revealed')
    }
  }

  function connect(): IntersectionObserver | null {
    if (reducedMotion.value || observer) return observer
    const root = container.value
    if (!root) return null
    const io = new IntersectionObserver(
      (entries) => {
        let index = 0
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          io.unobserve(entry.target)
          revealElement(entry.target as HTMLElement, index * stagger)
          index++
        }
      },
      { threshold, rootMargin },
    )
    for (const el of targets) io.observe(el)
    return io
  }

  onMounted(() => {
    const root = container.value
    if (!root) return
    targets = Array.from(root.querySelectorAll<HTMLElement>(selector))
    if (targets.length === 0) return
    if (reducedMotion.value) {
      finalizeAll()
      return
    }
    observer = connect()
  })

  watch(reducedMotion, (reduced) => {
    if (reduced) {
      observer?.disconnect()
      observer = null
      finalizeAll()
    } else if (!observer && targets.length > 0) {
      targets = targets.filter((el) => !el.classList.contains('revealed'))
      if (targets.length === 0) return
      observer = connect()
    }
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })
}
