<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['open-settings'])
</script>

<template>
  <header
    class="flex justify-between items-center px-6 py-4 text-sm select-none"
    :style="{ background: 'var(--header-bg)', color: 'var(--text)' }"
  >
    <span class="opacity-70 hover:opacity-100 transition">магазин</span>

    <h1 class="text-xl font-bold tracking-widest">
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