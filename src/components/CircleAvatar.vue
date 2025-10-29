<template>
  <div class="relative flex flex-col items-center select-none">
    <div
      class="relative flex items-center justify-center rounded-full overflow-hidden neon-border"
      :style="{ width: size + 'px', height: size + 'px' }"
    >
      <!-- Фото -->
      <img
        v-if="displayImage"
        :src="displayImage"
        class="absolute inset-0 w-full h-full object-cover rounded-full z-10"
      />
      <div
        v-else
        class="absolute inset-0 bg-[#2a2335] rounded-full z-10"
      ></div>
    </div>

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
  size: { type: Number, default: 200 },
})

const displayImage = computed(() => props.modelValue || props.image)
</script>

<style>
/* 💥 чистый glow на box-shadow — его Vercel не режет */
.neon-border {
  position: relative;
  border-radius: 50%;
  box-shadow:
    0 0 25px 8px rgba(255, 0, 122, 0.4),
    0 0 60px 15px rgba(168, 85, 247, 0.3),
    0 0 120px 25px rgba(255, 0, 200, 0.2);
  transition: all 0.5s ease-in-out;
  z-index: 1;
}

/* эффект дыхания */
.neon-border::before {
  content: '';
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  box-shadow:
    0 0 35px 10px rgba(255, 0, 122, 0.5),
    0 0 80px 20px rgba(168, 85, 247, 0.4);
  animation: neonPulse 3s ease-in-out infinite alternate;
  z-index: 0;
}

@keyframes neonPulse {
  0% {
    opacity: 0.6;
    transform: scale(0.98);
  }
  100% {
    opacity: 1;
    transform: scale(1.03);
  }
}
</style>