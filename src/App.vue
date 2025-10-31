<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import CoupleCircles from '@/components/CoupleCircles.vue'
import TogetherBlock from '@/components/TogetherBlock.vue'
import StatsGrid from '@/components/WidgetsGrid.vue'
import SettingsModal from '@/components/SettingsModal.vue'

const showSettings = ref(false)

// создаём фон-анимацию частиц
onMounted(() => {
  const canvas = document.getElementById('particles-bg')
  const ctx = canvas.getContext('2d')

  let w, h, particles
  const particleCount = 60

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
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      })
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = 'rgba(255, 0, 128, 0.15)'
    ctx.shadowColor = '#ff0088'
    ctx.shadowBlur = 12

    particles.forEach(p => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fill()

      p.x += p.dx
      p.y += p.dy

      if (p.x < 0 || p.x > w) p.dx *= -1
      if (p.y < 0 || p.y > h) p.dy *= -1
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
  <div class="relative min-h-screen overflow-hidden text-white">
    <!-- 🌌 Анимированный фон -->
    <canvas id="particles-bg" class="absolute inset-0 z-0"></canvas>

    <!-- 🌸 Контент -->
    <div class="relative z-10 mx-auto w-full max-w-[430px] min-h-screen pb-24">
      <Header @open-settings="showSettings = true" />
      <CoupleCircles />
      <TogetherBlock />
      <StatsGrid />
    </div>

    <!-- ⚙️ Модалка настроек -->
    <SettingsModal :show="showSettings" @close="showSettings = false" />
  </div>
</template>

<style>
body {
  background-color: #12001a;
  overflow-x: hidden;
}
</style>