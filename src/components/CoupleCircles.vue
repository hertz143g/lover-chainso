<template>
  <section class="w-full max-w-[430px] mx-auto mt-6 px-6 relative">
    <div class="relative flex justify-center items-center h-[260px]">

      <!-- 👩‍❤️‍👨 Левая (Вы) -->
      <div class="absolute left-2 top-8 z-20 transition-all">
        <CircleAvatar
          :model-value="store.state.photo1"
          :image="store.state.photo1"
          :label="store.state.name1 || 'Вы'"
          :size="200"
          side="left"
        />
      </div>

      <!-- 💕 Правая (Партнёр) -->
      <div class="absolute right-2 bottom-4 z-10 transition-all">
        <CircleAvatar
          :model-value="store.state.photo2"
          :image="store.state.photo2"
          :label="store.state.name2 || 'Партнёр'"
          :size="200"
          side="right"
        />
      </div>

      <!-- ✨ Светящаяся связь -->
      <div
        class="absolute inset-0 flex justify-center items-center z-0 pointer-events-none"
      >
        <div
          class="h-[2px] w-[200px] blur-md rounded-full opacity-60 transition-all"
          :style="{
            background: `linear-gradient(90deg, transparent, var(--accent), transparent)`
          }"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useStore } from '@/store/useStore'
import CircleAvatar from './CircleAvatar.vue'

const store = useStore()
</script>

<style scoped>
section {
  transition: all 0.4s ease;
}
</style>