<template>
  <div class="relative flex flex-col items-center select-none">
    <div
      class="relative flex items-center justify-center rounded-full overflow-hidden neon-ring"
      :style="{ width: size + 'px', height: size + 'px' }"
    >
      <!-- 🔥 Неон позади фото -->
      <div class="absolute inset-0 rounded-full neon-glow"></div>

      <!-- 📸 Фото -->
      <img
        v-if="displayImage"
        :src="displayImage"
        class="absolute inset-0 w-full h-full object-cover z-10 rounded-full"
      />
      <div v-else class="absolute inset-0 bg-[#2a2335] z-10 rounded-full" />
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

<style scoped>
.neon-ring {
  position: relative;
  border-radius: 50%;
}

/* ✨ Яркое свечение под фото */
.neon-glow {
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #ff007a,
    #ff4dd2,
    #a855f7,
    #ff007a
  );
  opacity: 0.9;
  filter: blur(35px) brightness(1.4);
  animation: spin 5s linear infinite, pulse 2.5s ease-in-out infinite alternate;
  z-index: 0;
}

/* Крутится плавно */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* "Дыхание" свечения */
@keyframes pulse {
  0% {
    opacity: 0.7;
    filter: blur(25px) brightness(1);
  }
  100% {
    opacity: 1;
    filter: blur(45px) brightness(1.6);
  }
}
</style>