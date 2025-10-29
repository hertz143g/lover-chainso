<template>
  <div class="relative flex flex-col items-center select-none">
    <div
      class="relative flex items-center justify-center rounded-full overflow-hidden neon-ring"
      :style="{ width: size + 'px', height: size + 'px' }"
    >
      <!-- Фото -->
      <img
        v-if="modelValue"
        :src="modelValue"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div v-else class="absolute inset-0 bg-[#2a2335]" />

      <!-- Анимированный неон -->
      <div class="absolute inset-0 rounded-full pointer-events-none neon-anim"></div>
    </div>

    <div class="mt-3 text-base tracking-wide font-medium opacity-90">
      {{ label }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  label: String,
  size: { type: Number, default: 220 },
})
</script>

<style scoped>
.neon-ring {
  border-radius: 50%;
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 20px 4px rgba(255, 0, 128, 0.08);
  background: radial-gradient(circle at center, #20132b 60%, transparent 100%);
  overflow: visible;
}

/* вот тут магия ✨ */
.neon-anim::before {
  content: "";
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #ff009d,
    #a855f7,
    #ff4ec6,
    #ff009d
  );
  filter: blur(20px);
  opacity: 0.6;
  animation: neonSpin 6s linear infinite, neonPulse 3s ease-in-out infinite alternate;
}

/* плавное вращение цвета */
@keyframes neonSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* лёгкое “дыхание” */
@keyframes neonPulse {
  0% { opacity: 0.35; transform: scale(0.97); }
  100% { opacity: 0.85; transform: scale(1.05); }
}
</style>