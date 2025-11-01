<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['open-settings'])
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl border-b transition-all duration-500"
    :style="{
      background: 'rgba(255,255,255,0.05)',
      borderColor: 'var(--border)',
      color: 'var(--text)'
    }"
  >
    <div
      class="max-w-[430px] mx-auto px-6 py-4 flex justify-between items-center text-sm"
    >
      <span class="opacity-90 font-medium tracking-wide">магазин</span>

      <h1
        class="text-xl font-semibold tracking-tight transition-all duration-500"
        :style="{ color: 'var(--accent)' }"
      >
        LOVER CHAINSO
      </h1>

      <button
        @click="emit('open-settings')"
        class="px-3 py-1 rounded-full border transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-lg active:scale-95"
        :style="{
          borderColor: 'var(--border)',
          color: 'var(--text)',
          background: 'rgba(255,255,255,0.05)'
        }"
      >
        настройки
      </button>
    </div>
  </header>
</template>

<style scoped>
header {
  font-family: "Open Sans", sans-serif;
  box-shadow: 0 0 40px var(--glow);
  animation: subtle-glow 8s ease-in-out infinite alternate;
}

@keyframes subtle-glow {
  from {
    box-shadow: 0 0 20px var(--glow);
  }
  to {
    box-shadow: 0 0 60px var(--glow);
  }
}
</style>