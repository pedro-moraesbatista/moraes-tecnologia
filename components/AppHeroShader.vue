<script setup lang="ts">
import { useMediaQuery } from '~/composables/useMediaQuery'
import { useReducedMotion } from '~/composables/useReducedMotion'

/*
 * Porte exato do shader WebGL procedural da referência desktop
 * (design/stitch/extracted/desktop-landing.html L14-176). Ativa apenas em
 * desktop (lg+), sem prefers-reduced-motion e com o hero visível; fora disso
 * o fundo fica por conta dos glows CSS.
 */

const VERTEX_SOURCE = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`

const FRAGMENT_SOURCE = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// Simplex-inspired procedural noise for digital ether and flowing dark aura
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  vec2 mouseNorm = u_mouse / u_resolution.xy;

  // Aspect ratio adjustment
  float aspect = u_resolution.x / u_resolution.y;
  vec2 uv = (st - 0.5) * vec2(aspect, 1.0);
  vec2 mUv = (mouseNorm - 0.5) * vec2(aspect, 1.0);

  float t = u_time * 0.18;

  // Interactive distortion from cursor
  float distToMouse = length(uv - mUv);
  float mouseInfluence = smoothstep(0.6, 0.0, distToMouse) * 0.12;

  // Multi-layered organic energy waves
  float n1 = snoise(uv * 1.5 + vec2(t * 0.4, -t * 0.2) + mouseInfluence);
  float n2 = snoise(uv * 3.2 - vec2(t * 0.3, t * 0.5) + vec2(n1 * 0.4));
  float n3 = snoise(uv * 6.0 + vec2(n2 * 0.2, t * 0.1));

  float combined = n1 * 0.55 + n2 * 0.3 + n3 * 0.15;

  // Dark background base: Midnight #090D18
  vec3 bgMidnight = vec3(0.035, 0.051, 0.094);
  vec3 bgDeepBlue = vec3(0.051, 0.075, 0.133);

  // Accents: Primary Violet #7667F8 & Secondary Cyan #38BDF8
  vec3 violetAccent = vec3(0.463, 0.404, 0.973);
  vec3 cyanAccent   = vec3(0.220, 0.741, 0.973);

  // Radial falloff focused towards the top/center where the Hero sits
  float centerGlow = 1.0 - length(uv * vec2(0.8, 1.2) - vec2(0.0, 0.1));
  centerGlow = clamp(centerGlow, 0.0, 1.0);
  centerGlow = pow(centerGlow, 2.2);

  // Color blending
  vec3 color = mix(bgMidnight, bgDeepBlue, st.y);

  float waveIntensity = smoothstep(-0.25, 0.65, combined) * centerGlow;
  vec3 auraColor = mix(violetAccent, cyanAccent, smoothstep(-0.1, 0.4, n2));

  color += auraColor * waveIntensity * 0.28;

  // Subtle glowing stream lines
  float gridLine = abs(fract(uv.y * 6.0 + n1 * 0.3 + t * 0.1) - 0.5);
  float edgeGlow = smoothstep(0.48, 0.5, gridLine) * 0.035 * centerGlow;
  color += cyanAccent * edgeGlow;

  gl_FragColor = vec4(color, 1.0);
}`

interface ShaderInstance {
  resume: () => void
  pause: () => void
  dispose: () => void
}

const hostEl = ref<HTMLDivElement | null>(null)
const reducedMotion = useReducedMotion()
const isDesktop = useMediaQuery('(min-width: 1024px)')

let heroObserver: IntersectionObserver | null = null
let instance: ShaderInstance | null = null
let initFailed = false

function initShader(host: HTMLDivElement): ShaderInstance | null {
  const canvas = document.createElement('canvas')
  canvas.style.display = 'block'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  host.appendChild(canvas)

  const gl = (canvas.getContext('webgl') ??
    canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
  if (!gl) {
    canvas.remove()
    return null
  }

  const compile = (type: number, source: string): WebGLShader | null => {
    const shader = gl.createShader(type)
    if (!shader) return null
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    return shader
  }

  const program = gl.createProgram()
  const vertexShader = compile(gl.VERTEX_SHADER, VERTEX_SOURCE)
  const fragmentShader = compile(gl.FRAGMENT_SHADER, FRAGMENT_SOURCE)
  if (!program || !vertexShader || !fragmentShader) {
    canvas.remove()
    return null
  }
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const position = gl.getAttribLocation(program, 'a_position')
  gl.enableVertexAttribArray(position)
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
  const uTime = gl.getUniformLocation(program, 'u_time')
  const uRes = gl.getUniformLocation(program, 'u_resolution')
  const uMouse = gl.getUniformLocation(program, 'u_mouse')

  const syncSize = (): void => {
    const w = canvas.clientWidth || 1280
    const h = canvas.clientHeight || 720
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
    }
  }
  const resizeObserver =
    typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncSize) : null
  resizeObserver?.observe(canvas)
  syncSize()

  // u_mouse em pixels (convenção ShaderToy): u_mouse / u_resolution normaliza.
  const mouse = { x: canvas.width / 2, y: canvas.height / 2 }
  const onMouseMove = (event: MouseEvent): void => {
    const rect = canvas.getBoundingClientRect()
    if (rect.width && rect.height) {
      const nx = (event.clientX - rect.left) / rect.width
      const ny = 1.0 - (event.clientY - rect.top) / rect.height
      mouse.x = nx * canvas.width
      mouse.y = ny * canvas.height
    }
  }
  window.addEventListener('mousemove', onMouseMove)

  let rafId = 0
  let running = false

  const render = (t: number): void => {
    if (!running) return
    if (resizeObserver === null) syncSize()
    gl.viewport(0, 0, canvas.width, canvas.height)
    if (uTime) gl.uniform1f(uTime, t * 0.001)
    if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height)
    if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    rafId = requestAnimationFrame(render)
  }

  const pause = (): void => {
    running = false
    cancelAnimationFrame(rafId)
  }
  const resume = (): void => {
    if (running) return
    running = true
    rafId = requestAnimationFrame(render)
  }
  const dispose = (): void => {
    pause()
    window.removeEventListener('mousemove', onMouseMove)
    resizeObserver?.disconnect()
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    canvas.remove()
  }

  return { resume, pause, dispose }
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
        instance?.dispose()
        instance = null
        return
      }
      if (!visible) {
        instance?.pause()
        return
      }
      if (initFailed) return
      instance ??= initShader(host)
      if (!instance) {
        initFailed = true
        return
      }
      instance.resume()
    },
    { immediate: true },
  )
})

onBeforeUnmount(() => {
  heroObserver?.disconnect()
  heroObserver = null
  instance?.dispose()
  instance = null
})
</script>

<template>
  <div
    ref="hostEl"
    aria-hidden="true"
    class="absolute inset-0 w-full h-full pointer-events-none opacity-60"
  ></div>
</template>
