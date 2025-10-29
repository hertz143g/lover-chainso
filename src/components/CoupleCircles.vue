<template>
  <section class="w-full max-w-[430px] mx-auto px-6 mt-2">
    <div class="relative h-[260px]">
      <div class="absolute left-0 top-2">
        <CircleAvatar v-model="store.state.youAvatar" :label="store.state.youName" :size="220" />
      </div>
      <div class="absolute right-0 bottom-0">
        <CircleAvatar v-model="store.state.partnerAvatar" :label="store.state.partnerName" :size="220" />
      </div>
    </div>
  </section>
</template>
<script setup>
import { useStore } from '@/store/useStore'
import CircleAvatar from './CircleAvatar.vue'
const store = useStore()
</script>