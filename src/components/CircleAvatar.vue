<template>
  <div class="relative flex flex-col items-center select-none">
    <div
      class="relative flex items-center justify-center rounded-full overflow-hidden neon-border"
      :style="{
        width: size + 'px',
        height: size + 'px',
      }"
    >
      <!-- Фото -->
      <img
        v-if="modelValue"
        :src="modelValue"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div v-else class="absolute inset-0 bg-[#2a2335]" />

      <!-- Обводка неона -->
      <div class="absolute inset-0 rounded-full neon-glow pointer-events-none"></div>
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
/* Базовая обводка */
.neon-border {
  position: relative;
  border: 3px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 20px 2px rgba(255, 0, 128, 0.2);
}

/* Динамическое свечение */
.neon-glow::before,
.neon-glow::after {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  filter: blur(25px);
  background: conic-gradient(
    from 0deg,
    #ff4ec6,
    #ff009d,
    #a855f7,
    #ff4ec6
  );
  animation: spin 6s linear infinite;
  opacity: 0.5;
  z-index: -1;
}

.neon-glow::after {
  animation: pulse 3s ease-in-out infinite alternate;
}

/* Плавное вращение градиента */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* “Дыхание” свечения */
@keyframes pulse {
  0% { opacity: 0.3; transform: scale(0.96); }
  100% { opacity: 0.8; transform: scale(1.04); }
}
</style>