<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import Header from '@/components/Header.vue'
import CoupleCircles from '@/components/CoupleCircles.vue'
import TogetherBlock from '@/components/TogetherBlock.vue'
import StatsGrid from '@/components/WidgetsGrid.vue'
import SettingsModal from '@/components/SettingsModal.vue'
import { useThemeStore } from '@/store/useThemeStore'

const showSettings = ref(false)
const theme = useThemeStore()

onMounted(async () => {
  theme.applyTheme()
  await nextTick()

  // фон-частицы
  const canvas = document.createElement('canvas')
  canvas.id = 'particles-bg'
  canvas.className = 'fixed inset-0 z-0 pointer-events-none'
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')

  let w, h, particles
  const count = 160

  function resize() {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
  }
  function accentColor() {
    const s = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
    return s || '#ff4b9f'
  }
  function create() {
    particles = Array.from({ length: count }, () => ({
      bx: Math.random() * w,
      by: Math.random() * h,
      a: Math.random() * 360,
      r: Math.random() * 2.5 + 0.6
    }))
  }
  function draw() {
    ctx.clearRect(0, 0, w, h)
    const acc = accentColor()
    for (const p of particles) {
      p.a += 0.01
      const x = p.bx + Math.sin(p.a) * 14
      const y = p.by + Math.cos(p.a) * 14
      ctx.beginPath()
      ctx.fillStyle = acc + '33'
      ctx.shadowColor = acc
      ctx.shadowBlur = 18
      ctx.arc(x, y, p.r, 0, Math.PI * 2)
      ctx.fill()
    }
    requestAnimationFrame(draw)
  }

  resize(); create(); draw()
  window.addEventListener('resize', () => { resize(); create() })

  watch(() => theme.current, () => {
    theme.applyTheme()
    create()
  })
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden">
    <div class="relative z-10 mx-auto w-full max-w-[430px] min-h-screen pb-24">
      <Header @open-settings="showSettings = true" />
      <CoupleCircles />
      <TogetherBlock />
      <StatsGrid />
    </div>

    <SettingsModal :show="showSettings" @close="showSettings = false" />
  </div>
</template>

<style>
body {
  transition: background 1.2s ease, color 0.8s ease;
}
</style>