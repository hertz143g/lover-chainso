<template>
  <div
    class="rounded-3xl p-4 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] cursor-pointer relative"
    :style="{
      background: 'var(--card)',
      border: `1px solid var(--border)`,
      boxShadow: `0 0 30px var(--glow)`,
      color: 'var(--text)'
    }"
    @click="$emit('click')"
  >
    <p class="text-xs mb-1 opacity-70 tracking-wide">{{ date }}</p>
    <h3 class="text-base font-semibold leading-snug">{{ title }}</h3>

    <!-- мягкая подсветка -->
    <div
      class="absolute inset-0 rounded-3xl pointer-events-none opacity-0 hover:opacity-40 transition-all"
      :style="{
        background: `radial-gradient(circle at center, ${color || 'var(--accent)'}33 0%, transparent 70%)`
      }"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  date: String,
  color: String
})
</script>

<style scoped>
div {
  font-family: "Open Sans", sans-serif;
  transform-origin: center;
}
</style>