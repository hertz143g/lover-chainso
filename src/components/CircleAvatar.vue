<template>
  <div class="relative flex flex-col items-center select-none">
    <!-- Контейнер с неоном -->
    <div
      class="relative flex items-center justify-center rounded-full overflow-hidden neon-ring"
      :style="{ width: size + 'px', height: size + 'px' }"
    >
      <!-- 💡 Сначала свечение -->
      <div class="absolute inset-0 rounded-full pointer-events-none neon-anim z-0"></div>

      <!-- 📸 Фото поверх свечения -->
      <img
        v-if="displayImage"
        :src="displayImage"
        class="absolute inset-0 w-full h-full object-cover z-10"
        alt=""
      />
      <div v-else class="absolute inset-0 bg-[#2a2335] z-10" />
    </div>

    <!-- подпись -->
    <div class="mt-3 text-base tracking-wide font-medium opacity-90">
      {{ label }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  image: { type: String, default: '' },
  label: { type: String, default: '' },
  side: { type: String, default: 'right' },
  size: { type: Number, default: 200 },
})

/* если картинка есть — показываем */
const displayImage = computed(() => props.modelValue || props.image)
</script>

<style scoped>
.neon-ring {
  border: 2px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 20px 4px rgba(255, 0, 128, 0.08);
  background: radial-gradient(circle at center, #20132b 60%, transparent);
  position: relative;
}

/* 🟣 неоновое свечение под фото */
.neon-anim {
  background: conic-gradient(from 0deg, #ff009d, #a855f7, #ff4ec6, #ff009d);
  filter: blur(25px);
  opacity: 0.55;
  animation: spin 6s linear infinite, pulse 3s ease-in-out infinite alternate;
}

/* плавное вращение */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* дыхание */
@keyframes pulse {
  0% {
    opacity: 0.35;
    transform: scale(0.9);
  }
  100% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}
</style>