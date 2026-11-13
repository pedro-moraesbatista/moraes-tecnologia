<script setup lang="ts">
import type * as ThreeNS from 'three'
import { useMediaQuery } from '~/composables/useMediaQuery'
import { useReducedMotion } from '~/composables/useReducedMotion'

/*
 * Porte da cena three.js da referência desktop (L184-322) para three ESM
 * moderno, com import DINÂMICO: o bundle de ~600kB só é baixado quando o
 * efeito de fato roda (desktop lg+, hero visível, sem reduced-motion).
 * WebGL indisponível => falha silenciosa (orbs CSS cobrem o fundo).
 */

interface ThreeInstance {
  resume: () => void
  pause: () => void
  dispose: () => void
}

interface SceneNode {
  mesh: ThreeNS.Mesh
  basePos: ThreeNS.Vector3
  phase: number
  speed: number
}

const hostEl = ref<HTMLDivElement | null>(null)
const reducedMotion = useReducedMotion()
const isDesktop = useMediaQuery('(min-width: 1024px)')

let heroObserver: IntersectionObserver | null = null
let instance: ThreeInstance | null = null
let initFailed = false
let generation = 0

function createScene(THREE: typeof import('three'), host: HTMLDivElement): ThreeInstance {
  const width = host.clientWidth || window.innerWidth
  const height = host.clientHeight || window.innerHeight

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
  camera.position.set(0, 0, 18)

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(width, height)
  host.appendChild(renderer.domElement)

  const worldGroup = new THREE.Group()
  scene.add(worldGroup)

  const nodeGeo = new THREE.SphereGeometry(0.18, 16, 16)
  const coreGeo = new THREE.IcosahedronGeometry(0.5, 1)

  const matCyan = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 })
  const matViolet = new THREE.MeshBasicMaterial({ color: 0x7667f8, transparent: true, opacity: 0.85 })
  const matCore = new THREE.MeshBasicMaterial({ color: 0xa78bfa, wireframe: true, transparent: true, opacity: 0.7 })

  const nodeCount = 38
  const nodes: SceneNode[] = []
  for (let i = 0; i < nodeCount; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)
    const r = 5.5 + Math.random() * 4.5

    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta) * 0.65
    const z = r * Math.cos(phi) * 0.7

    const mesh = new THREE.Mesh(nodeGeo, i % 2 === 0 ? matViolet : matCyan)
    mesh.position.set(x, y, z)
    worldGroup.add(mesh)
    nodes.push({
      mesh,
      basePos: new THREE.Vector3(x, y, z),
      phase: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 0.8,
    })
  }

  const centralCore = new THREE.Mesh(coreGeo, matCore)
  worldGroup.add(centralCore)

  const lineMat = new THREE.LineBasicMaterial({
    color: 0x6366f1,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
  })
  const linePositions: number[] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].basePos.distanceTo(nodes[j].basePos) < 4.6) {
        linePositions.push(
          nodes[i].basePos.x, nodes[i].basePos.y, nodes[i].basePos.z,
          nodes[j].basePos.x, nodes[j].basePos.y, nodes[j].basePos.z,
        )
      }
    }
  }
  const lineGeometry = new THREE.BufferGeometry()
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
  worldGroup.add(new THREE.LineSegments(lineGeometry, lineMat))

  let targetX = 0
  let targetY = 0
  let mouseX = 0
  let mouseY = 0
  const onMouseMove = (e: MouseEvent): void => {
    const normX = (e.clientX / window.innerWidth) * 2 - 1
    const normY = -(e.clientY / window.innerHeight) * 2 + 1
    targetX = normX * 0.45
    targetY = normY * 0.35
  }
  window.addEventListener('mousemove', onMouseMove)

  const syncSize = (): void => {
    const w = host.clientWidth || window.innerWidth
    const h = host.clientHeight || window.innerHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }
  const resizeObserver = new ResizeObserver(syncSize)
  resizeObserver.observe(host)

  const clock = new THREE.Clock()
  let rafId = 0
  let running = false

  const animate = (): void => {
    if (!running) return
    rafId = requestAnimationFrame(animate)
    const elapsedTime = clock.getElapsedTime()

    mouseX += (targetX - mouseX) * 0.05
    mouseY += (targetY - mouseY) * 0.05

    worldGroup.rotation.y = elapsedTime * 0.09 + mouseX * 0.8
    worldGroup.rotation.x = Math.sin(elapsedTime * 0.06) * 0.12 - mouseY * 0.5

    centralCore.rotation.x = elapsedTime * 0.4
    centralCore.rotation.y = elapsedTime * 0.5
    const s = 1.0 + Math.sin(elapsedTime * 2.0) * 0.12
    centralCore.scale.set(s, s, s)

    for (const item of nodes) {
      item.mesh.position.y = item.basePos.y + Math.sin(elapsedTime * item.speed + item.phase) * 0.25
    }

    renderer.render(scene, camera)
  }

  const pause = (): void => {
    running = false
    cancelAnimationFrame(rafId)
  }
  const resume = (): void => {
    if (running) return
    running = true
    rafId = requestAnimationFrame(animate)
  }
  const dispose = (): void => {
    pause()
    window.removeEventListener('mousemove', onMouseMove)
    resizeObserver.disconnect()
    nodeGeo.dispose()
    coreGeo.dispose()
    lineGeometry.dispose()
    matCyan.dispose()
    matViolet.dispose()
    matCore.dispose()
    lineMat.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  }

  return { resume, pause, dispose }
}

async function start(host: HTMLDivElement): Promise<void> {
  if (initFailed) return
  const current = ++generation
  const THREE = await import('three').catch(() => null)
  if (THREE === null || current !== generation) return
  try {
    instance = createScene(THREE, host)
    instance.resume()
  } catch {
    initFailed = true
    instance = null
  }
}

onMounted(() => {
  const host = hostEl.value
  if (!host) return

  const heroVisible = ref(false)
  heroObserver = new IntersectionObserver(
    (entries) => {
      heroVisible.value = entries[0]?.isIntersecting ?? false
    },
    { threshold: 0 },
  )
  heroObserver.observe(host)

  watch(
    [reducedMotion, isDesktop, heroVisible],
    ([reduced, desktop, visible]) => {
      if (reduced || !desktop) {
        generation++
        instance?.dispose()
        instance = null
        return
      }
      if (!visible) {
        instance?.pause()
        return
      }
      if (instance) {
        instance.resume()
        return
      }
      void start(host)
    },
    { immediate: true },
  )
})

onBeforeUnmount(() => {
  heroObserver?.disconnect()
  heroObserver = null
  generation++
  instance?.dispose()
  instance = null
})
</script>

<template>
  <div
    ref="hostEl"
    aria-hidden="true"
    class="absolute inset-0 w-full h-full bg-transparent pointer-events-none z-0"
  ></div>
</template>
