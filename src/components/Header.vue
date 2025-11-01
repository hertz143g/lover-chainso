<template>
  <header
    class="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 text-sm select-none backdrop-blur-lg transition-all"
    :style="{
      background: 'color-mix(in srgb, var(--bg) 15%, transparent)',
      borderBottom: '1px solid rgba(255,255,255,0.2)',
      color: 'var(--text)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
    }"
  >
    <span class="opacity-70 hover:opacity-100 transition">магазин</span>

    <h1
      class="text-xl font-bold tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
    >
      <span :style="{ color: 'var(--accent)' }">LOVER</span> CHAINSO
    </h1>

    <button
      @click="emit('open-settings')"
      class="opacity-70 hover:opacity-100 transition-colors"
    >
      настройки
    </button>
  </header>
</template>

<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['open-settings'])
</script>

<style scoped>
header {
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  transition: background 0.5s ease, color 0.3s ease, border-color 0.3s ease;
}
</style>