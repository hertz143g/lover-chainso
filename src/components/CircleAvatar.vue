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
  box-shadow:
    0 0 10px 3px rgba(255, 0, 122, 0.3),
    0 0 20px 6px rgba(168, 85, 247, 0.25),
    0 0 40px 10px rgba(255, 0, 200, 0.15);
}

.neon-border::before {
  box-shadow:
    0 0 15px 4px rgba(255, 0, 122, 0.4),
    0 0 30px 8px rgba(168, 85, 247, 0.35);
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