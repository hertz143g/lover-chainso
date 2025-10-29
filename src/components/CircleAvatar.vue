<template>
  <div class="relative flex flex-col items-center select-none">
    <div
      class="relative flex items-center justify-center rounded-full overflow-hidden"
      :style="{ width: size + 'px', height: size + 'px' }"
    >
      <!-- 💥 мощное свечение позади -->
      <div class="neon-bg"></div>

      <!-- Фото -->
      <img
        v-if="displayImage"
        :src="displayImage"
        class="absolute inset-0 w-full h-full object-cover rounded-full z-10"
      />
      <div v-else class="absolute inset-0 bg-[#2a2335] rounded-full z-10" />
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
.neon-bg {
  position: absolute;
  inset: -15px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #ff007a,
    #ff4dd2,
    #a855f7,
    #ff007a
  );
  filter: blur(50px) brightness(2);
  opacity: 0.85;
  animation: spin 5s linear infinite, pulse 2s ease-in-out infinite alternate;
  z-index: 0;
}

/* анимации вращения и дыхания */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0% {
    filter: blur(35px) brightness(1.3);
    opacity: 0.6;
  }
  100% {
    filter: blur(55px) brightness(2);
    opacity: 1;
  }
}
</style>