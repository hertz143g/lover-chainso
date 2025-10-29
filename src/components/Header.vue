<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['open-settings'])
</script>

<template>
  <header class="flex justify-between items-center px-6 py-4 text-sm text-gray-300">
    <span>магазин</span>

    <h1 class="text-xl font-bold">
      <span class="text-pink-500">LOVER</span> CHAINSO
    </h1>

    <button
      @click="emit('open-settings')"
      class="hover:text-white transition-colors"
    >
      настройки
    </button>
  </header>
</template>