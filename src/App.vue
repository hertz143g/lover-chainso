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

  // 🪄 Создаём фон с частицами (как нежное свечение)
  const canvas = document.createElement('canvas')
  canvas.id = 'particles-bg'
  canvas.className = 'fixed inset-0 z-0 pointer-events-none'
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')

  let w, h, particles
  const count = 180 // чуть больше — выглядит живее

  function resize() {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
  }

  function accentColor() {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim() || '#3859d0'
  }

  function create() {
    particles = []
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.8,
        bx: Math.random() * w,
        by: Math.random() * h,
        a: Math.random() * 360
      })
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h)
    const acc = accentColor()
    particles.forEach(p => {
      p.a += 0.01
      p.x = p.bx + Math.sin(p.a) * 18
      p.y = p.by + Math.cos(p.a) * 18
      ctx.beginPath()
      ctx.fillStyle = acc + '25' // прозрачный слой для мягкости
      ctx.shadowColor = acc
      ctx.shadowBlur = 20
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fill()
    })
    requestAnimationFrame(draw)
  }

  resize()
  create()
  draw()
  window.addEventListener('resize', () => {
    resize()
    create()
  })

  // при смене темы перерисовываем частицы
  watch(
    () => theme.current,
    () => {
      theme.applyTheme()
      create()
    }
  )
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden transition-colors duration-700"
       :style="{ background: 'var(--bg)', color: 'var(--text)' }">

    <!-- 🌌 Контент -->
    <div class="relative z-10 mx-auto w-full max-w-[430px] min-h-screen pb-24">
      <Header @open-settings="showSettings = true" />
      <CoupleCircles />
      <TogetherBlock />
      <StatsGrid />
    </div>

    <!-- ⚙️ Настройки -->
    <SettingsModal :show="showSettings" @close="showSettings = false" />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  transition: background 1s ease, color 0.4s ease;
}

/* Анимация для частиц */
canvas#particles-bg {
  filter: blur(1px);
  opacity: 0.75;
  transition: opacity 0.5s ease;
}

/* Плавные переходы тем */
* {
  transition:
    background-color 0.4s ease,
    color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}
</style>