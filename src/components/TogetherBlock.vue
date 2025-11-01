<template>
  <section
    class="relative w-full max-w-[430px] mx-auto mt-16 px-6 text-center select-none"
  >
    <!-- Полупрозрачная стеклянная карточка -->
    <div
      class="relative rounded-3xl border backdrop-blur-xl py-10 px-6 transition-all duration-500 shadow-[0_0_40px_var(--glow)]"
      :style="{ 
        background: 'var(--card)',
        borderColor: 'var(--border)',
        color: 'var(--text)'
      }"
    >
      <!-- Заголовок -->
      <h2 class="text-3xl font-semibold tracking-tight mb-2">
        {{ daysTogether }} дней вместе
      </h2>
      <p class="opacity-80 text-sm">
        с {{ formattedDate }}
      </p>

      <!-- Линия акцента -->
      <div
        class="absolute -bottom-[1px] left-0 w-full h-[2px] opacity-70"
        :style="{ background: `linear-gradient(to right, transparent, var(--accent), transparent)` }"
      ></div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '@/store/useStore'

const store = useStore()

// Дни вместе
const daysTogether = computed(() => {
  if (!store.state.startDate) return 0
  const start = new Date(store.state.startDate)
  const now = new Date()
  const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24))
  return diff
})

// Форматируем дату
const formattedDate = computed(() => {
  if (!store.state.startDate) return 'не указано'
  return new Date(store.state.startDate).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
})
</script>

<style scoped>
section {
  font-family: "Open Sans", sans-serif;
}

/* эффект свечения */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 40px var(--glow);
  }
  50% {
    box-shadow: 0 0 20px var(--glow);
  }
}
</style>