<template>
  <div class="relative flex flex-col items-center select-none">
    <div
      class="relative flex items-center justify-center rounded-full overflow-hidden neon-ring"
      :style="{ width: size + 'px', height: size + 'px' }"
    >
      <!-- Фото -->
      <img
        v-if="displayImage"
        :src="displayImage"
        class="absolute inset-0 w-full h-full object-cover"
        alt=""
      />
      <div v-else class="absolute inset-0 bg-[#2a2335]" />

      <!-- мягкое свечение -->
      <div class="absolute inset-0 rounded-full pointer-events-none neon-anim"></div>
    </div>

    <div class="mt-3 text-base tracking-wide font-medium opacity-90">
      {{ label }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /* старый способ через v-model */
  modelValue: { type: String, default: '' },
  /* новый способ явным пропом */
  image: { type: String, default: '' },
  label: { type: String, default: '' },
  side: { type: String, default: 'right' },
  size: { type: Number, default: 200 }
})

/* Берём то, что есть: сперва modelValue, потом image */
const displayImage = computed(() => props.modelValue || props.image)
</script>

<style scoped>
.neon-ring { border: 2px solid rgba(255,255,255,0.06); box-shadow: 0 0 20px 4px rgba(255,0,128,0.08); background: radial-gradient(circle at center, #20132b 60%, transparent); }
.neon-anim::before {
  content:""; position:absolute; inset:-10px; border-radius:50%;
  background: conic-gradient(from 0deg,#ff009d,#a855f7,#ff4ec6,#ff009d);
  filter: blur(20px); opacity:.6; animation: spin 6s linear infinite, pulse 3s ease-in-out infinite alternate;
}
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulse { 0% {opacity:.35; transform:scale(.97);} 100% {opacity:.8; transform:scale(1.04);} }
</style>