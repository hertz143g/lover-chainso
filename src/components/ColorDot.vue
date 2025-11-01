<template>
  <div
    class="w-8 h-8 rounded-full cursor-pointer border-2 transition-all duration-300"
    :class="{ 'ring-2 ring-white ring-offset-2 ring-offset-black/20': selected }"
    :style="{
      backgroundColor: color,
      borderColor: selected ? '#fff' : 'transparent',
      boxShadow: selected ? `0 0 15px ${color}` : 'none'
    }"
    @click="$emit('select', color)"
  ></div>
</template>

<script setup>
const props = defineProps({
  color: { type: String, required: true },
  selected: { type: Boolean, default: false }
})
</script>

<style scoped>
div:hover {
  transform: scale(1.1);
  box-shadow: 0 0 20px var(--accent);
}
</style>