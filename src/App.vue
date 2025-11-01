<script setup>
import { ref, onMounted, nextTick, watch, onBeforeUnmount } from 'vue'
import Header from '@/components/Header.vue'
import CoupleCircles from '@/components/CoupleCircles.vue'
import TogetherBlock from '@/components/TogetherBlock.vue'
import StatsGrid from '@/components/WidgetsGrid.vue'
import SettingsModal from '@/components/SettingsModal.vue'
import { useThemeStore } from '@/store/useThemeStore'

const showSettings = ref(false)
const theme = useThemeStore()

let canvas, ctx, rafId, particles = []
let w = 0, h = 0
const COUNT = 160

function resize() {
  if (!canvas) return
  w = canvas.width = window.innerWidth
  h = canvas.height = window.innerHeight
}

function accentColor() {
  const s = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
  return s || '#ff4b9f'
}

function createParticles() {
  particles = Array.from({ length: COUNT }, () => ({
    bx: Math.random() * w,
    by: Math.random() * h,
    a: Math.random() * 360,
    r: Math.random() * 2.5 + 0.6,
    s: Math.random() * 0.015 + 0.008
  }))
}

function draw() {
  if (!ctx) return
  ctx.clearRect(0, 0, w, h)
  const acc = accentColor()
  for (const p of particles) {
    p.a += p.s
    const x = p.bx + Math.sin(p.a) * 14
    const y = p.by + Math.cos(p.a) * 14
    ctx.beginPath()
    ctx.fillStyle = acc + '33'
    ctx.shadowColor = acc
    ctx.shadowBlur = 18
    ctx.arc(x, y, p.r, 0, Math.PI * 2)
    ctx.fill()
  }
  rafId = requestAnimationFrame(draw)
}

onMounted(async () => {
  theme.applyTheme()
  await nextTick()

  // частицы
  canvas = document.createElement('canvas')
  canvas.id = 'particles-bg'
  document.body.appendChild(canvas)
  ctx = canvas.getContext('2d')
  resize()
  createParticles()
  draw()

  // шум
  const noise = document.createElement('div')
  noise.id = 'noise-overlay'
  document.body.appendChild(noise)

  window.addEventListener('resize', () => {
    resize()
    createParticles()
  })

  // при смене темы — обновляем палитру и “раскидываем” точки заново
  watch(() => theme.current, () => {
    theme.applyTheme()
    createParticles()
  })
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
  const c = document.getElementById('particles-bg')
  const n = document.getElementById('noise-overlay')
  c && c.remove()
  n && n.remove()
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden font-open">
    <Header @open-settings="showSettings = true" />

    <!-- Контент под стеклянным хедером -->
    <main class="page-shell">
      <CoupleCircles />
      <TogetherBlock />
      <StatsGrid />
    </main>

    <SettingsModal :show="showSettings" @close="showSettings = false" />
  </div>
</template>