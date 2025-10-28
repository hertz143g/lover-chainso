<template>
  <section class="w-full max-w-[430px] px-6 mt-2">
    <div class="relative h-[260px]">
      <!-- левый -->
      <div class="absolute left-0 top-4">
        <CircleAvatar v-model="store.state.youAvatar" :label="store.state.youName" :size="220" :glow="'0 12px 40px rgba(64,120,255,.25)'" />
      </div>
      <!-- правый -->
      <div class="absolute right-0 bottom-0">
        <CircleAvatar v-model="store.state.partnerAvatar" :label="store.state.partnerName" :size="220" :glow="'0 12px 40px rgba(255,64,128,.25)'" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useStore } from '@/store/useStore'
import CircleAvatar from './CircleAvatar.vue'
const store = useStore()
</script>