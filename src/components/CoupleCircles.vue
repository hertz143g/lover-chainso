<template>
  <section class="w-full max-w-[430px] mx-auto mt-20 px-6">
    <div class="relative flex justify-center items-center h-[260px]">
      <!-- Левый круг -->
      <div class="absolute left-0 top-8 z-20">
        <CircleAvatar
          :image="store.state.photo1"
          :label="store.state.name1 || 'Вы'"
          :size="180"
          side="left"
        />
      </div>

      <!-- Правый круг -->
      <div class="absolute right-0 bottom-6 z-10">
        <CircleAvatar
          :image="store.state.photo2"
          :label="store.state.name2 || 'Партнёр'"
          :size="180"
          side="right"
        />
      </div>

      <!-- Сердце между -->
      <div
        class="absolute inset-0 flex items-center justify-center z-0 opacity-80"
      >
        <div
          class="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-2xl"
          :style="{
            background: 'color-mix(in oklab, var(--accent) 25%, transparent)',
            boxShadow: '0 0 25px var(--glow)',
            border: '1px solid var(--border)'
          }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="var(--accent)"
            class="w-7 h-7"
          >
            <path
              fill-rule="evenodd"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
                 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
                 11.54L12 21.35z"
            />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useStore } from "@/store/useStore"
import CircleAvatar from "./CircleAvatar.vue"
const store = useStore()
</script>

<style scoped>
section {
  position: relative;
  font-family: "Open Sans", sans-serif;
  transition: all 0.4s ease;
}
</style>