<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['open-settings'])
</script>

<template>
  <header class="liquid-header flex items-center justify-between px-6">
    <span class="text-sm opacity-80 hover:opacity-100 transition-colors">магазин</span>

    <h1 class="text-xl font-bold tracking-widest">
      <span :style="{ color: 'var(--accent)' }">LOVER</span> CHAINSO
    </h1>

    <button
      @click="emit('open-settings')"
      class="text-sm opacity-80 hover:opacity-100 transition-colors"
    >
      настройки
    </button>
  </header>
</template>

<style scoped>
h1 { text-shadow: var(--shadow-text); }
</style>