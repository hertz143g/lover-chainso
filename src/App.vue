<script setup>
import { ref } from 'vue'
import SettingsModal from '@/components/SettingsModal.vue'

const showSettings = ref(false)
</script>

<template>
  <div class="bg-[#12001a] min-h-screen text-white flex flex-col items-center justify-center">
    <button
      @click="showSettings = true"
      class="px-6 py-3 bg-purple-600 rounded-full hover:bg-purple-700 transition"
    >
      Открыть настройки
    </button>

    <!-- Модалка -->
    <SettingsModal :show="showSettings" @close="showSettings = false" />
  </div>
</template>