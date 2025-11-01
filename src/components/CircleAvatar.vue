<template>
  <div
    class="relative flex flex-col items-center select-none transition-all duration-500"
    :style="{ transform: 'translateY(0)', color: 'var(--text)' }"
  >
    <!-- оболочка -->
    <div
      class="relative rounded-full overflow-hidden backdrop-blur-2xl border shadow-inner transition-all duration-500 avatar-glass"
      :style="{
        width: size + 'px',
        height: size + 'px',
        borderColor: 'var(--border)',
        boxShadow: `0 0 40px ${accentColor}55, inset 0 0 25px ${accentColor}20`
      }"
    >
      <!-- фото -->
      <img
        v-if="displayImage"
        :src="displayImage"
        class="absolute inset-0 w-full h-full object-cover rounded-full z-10 transition-all duration-700"
      />

      <!-- если нет фото -->
      <div
        v-else
        class="absolute inset-0 rounded-full flex items-center justify-center text-[48px] opacity-60 font-light"
      >
        <span>?</span>
      </div>

      <!-- подсветка вокруг -->
      <div
        class="absolute inset-0 rounded-full pointer-events-none transition-all"
        :style="{
          boxShadow: `0 0 40px 10px ${accentColor}30`
        }"
      ></div>
    </div>

    <!-- подпись -->
    <div class="mt-4 text-base font-semibold tracking-wide text-center opacity-90">
      {{ label }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  image: String,
  label: String,
  size: { type: Number, default: 200 }
})

const accentColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--accent')
  .trim()

const displayImage = computed(() => props.image || '')
</script>

<style scoped>
.avatar-glass {
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.avatar-glass:hover {
  transform: scale(1.04);
  box-shadow: 0 0 50px 10px var(--glow);
}
</style>