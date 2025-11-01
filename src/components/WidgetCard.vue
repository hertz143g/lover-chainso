<template>
  <div
    class="rounded-[26px] h-28 p-4 border-2 bg-opacity-40 backdrop-blur-md flex flex-col justify-between transition-all duration-400 cursor-pointer"
    :style="{
      background: 'var(--card)',
      borderColor: color || 'var(--accent)',
      boxShadow: `0 0 20px ${(color || 'var(--accent)')}40`,
      color: 'var(--text)'
    }"
  >
    <div class="text-[12px] opacity-85 truncate">
      <slot name="title" />
    </div>
    <div class="text-[14px] font-semibold truncate">
      <slot name="subtitle" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  color: { type: String, default: '' }
})
</script>

<style scoped>
div:hover {
  transform: scale(1.03);
  box-shadow: 0 0 35px var(--accent);
}
</style>