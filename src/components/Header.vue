<script setup>
import { defineEmits } from 'vue'
import { useThemeStore } from '@/store/useThemeStore'

const emit = defineEmits(['open-settings'])
const theme = useThemeStore()
</script>

<template>
  <header
    class="flex justify-between items-center px-6 py-4 text-sm font-semibold transition-all duration-500"
    :style="{ background: 'var(--header)', color: 'var(--text)' }"
  >
    <button class="opacity-70 hover:opacity-100 transition">магазин</button>

    <h1 class="text-lg font-bold tracking-widest">
      <span :style="{ color: 'var(--accent)' }">LOVER</span> CHAINSO
    </h1>

    <div class="flex items-center gap-3">
      <!-- 🔘 Переключение тем -->
      <select
        v-model="theme.current"
        @change="theme.applyTheme()"
        class="bg-transparent border border-white/20 rounded-full px-2 py-1 text-xs focus:outline-none cursor-pointer"
      >
        <option value="dark">🌌 Тьма</option>
        <option value="romantic">💖 Розовая</option>
        <option value="gold">✨ Золотая</option>
        <option value="ocean">🌊 Океан</option>
      </select>

      <button
        @click="emit('open-settings')"
        class="opacity-70 hover:opacity-100 transition-colors"
      >
        настройки
      </button>
    </div>
  </header>
</template>