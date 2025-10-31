<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Header from '@/components/Header.vue'
import CoupleCircles from '@/components/CoupleCircles.vue'
import TogetherBlock from '@/components/TogetherBlock.vue'
import StatsGrid from '@/components/WidgetsGrid.vue'
import SettingsModal from '@/components/SettingsModal.vue'

const showSettings = ref(false)

onMounted(async () => {
  await nextTick()

  const canvas = document.createElement('canvas')
  canvas.id = 'particles-bg'
  canvas.className = 'fixed inset-0 z-0 pointer-events-none'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')

  let w, h, particles
  const particleCount = 150 // 👈 больше частиц!

  function resize() {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
  }

  function createParticles() {
    particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        hue: 300 + Math.random() * 60, // 👈 разные оттенки неона
        baseX: Math.random() * w,
        baseY: Math.random() * h,
        angle: Math.random() * 360
      })
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h)

    particles.forEach(p => {
      p.angle += 0.01
      p.x = p.baseX + Math.sin(p.angle) * 15
      p.y = p.baseY + Math.cos(p.angle) * 15

      ctx.beginPath()
      ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, 0.25)`
      ctx.shadowColor = `hsl(${p.hue}, 100%, 60%)`
      ctx.shadowBlur = 20
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fill()
    })

    requestAnimationFrame(draw)
  }

  resize()
  createParticles()
  draw()
  window.addEventListener('resize', resize)
})
</script>

<template>
  <div class="relative min-h-screen overflow-hidden text-white bg-[#12001a]">
    <!-- 🌌 Анимированный фон -->
    <div id="particles-container"></div>

    <!-- 🌸 Контент -->
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
  background-color: #12001a;
  overflow-x: hidden;
}
</style>