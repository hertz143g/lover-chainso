<script setup>
import { useStore } from '@/store/useStore'
const store = useStore()
</script>

<template>
  <div class="flex items-center justify-center gap-4 py-6">
    <div class="text-center">
      <img
        v-if="store.state.photo1"
        :src="store.state.photo1"
        class="w-24 h-24 rounded-full object-cover"
      />
      <div v-else class="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center">
        +
      </div>
      <p class="mt-2 text-sm opacity-70">{{ store.state.name1 || 'Вы' }}</p>
    </div>

    <div class="text-center">
      <img
        v-if="store.state.photo2"
        :src="store.state.photo2"
        class="w-24 h-24 rounded-full object-cover"
      />
      <div v-else class="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center">
        +
      </div>
      <p class="mt-2 text-sm opacity-70">{{ store.state.name2 || 'Партнёр' }}</p>
    </div>
  </div>
</template>