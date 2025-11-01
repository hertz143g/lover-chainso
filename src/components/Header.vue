<script setup>
import { defineEmits } from 'vue'
import { useThemeStore } from '@/store/useThemeStore'

const emit = defineEmits(['open-settings'])
const theme = useThemeStore()
</script>

<template>
  <header
    class="sticky top-0 z-40 flex justify-between items-center px-6 py-3 backdrop-blur-lg border-b"
    :style="{
      background: 'var(--header-bg)',
      borderColor: 'var(--border)',
      color: 'var(--text)'
    }"
  >
    <span class="text-sm font-medium opacity-70 select-none">магазин</span>

    <h1
      class="text-lg font-bold tracking-wide select-none transition-colors"
      :style="{
        color: 'var(--text)',
        textShadow: `0 0 15px var(--glow)`
      }"
    >
      <span :style="{ color: 'var(--accent)' }">LOVER</span> CHAINSO
    </h1>

    <button
      @click="emit('open-settings')"
      class="text-sm px-3 py-1 rounded-full border transition-all duration-300 hover:opacity-90 active:scale-95"
      :style="{
        borderColor: 'var(--border)',
        color: 'var(--text-secondary)',
        background: 'var(--card)'
      }"
    >
      настройки
    </button>
  </header>
</template>

<style scoped>
header {
  transition:
    background-color 0.4s ease,
    border-color 0.3s ease,
    color 0.3s ease;
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
}

button {
  font-weight: 500;
  backdrop-filter: blur(8px);
}

button:hover {
  box-shadow: 0 0 12px var(--glow);
}
</style>