<template>
  <div
    class="rounded-[26px] h-28 p-4 backdrop-blur flex flex-col justify-between transition-all duration-300 hover:scale-[1.02]"
    :style="{
      background: 'var(--card)',
      border: `2px solid ${color || 'var(--border)'}`,
      boxShadow: `0 10px 30px ${color || 'var(--glow)'}40`,
      color: 'var(--text)'
    }"
  >
    <div class="text-[12px] opacity-85"><slot name='title' /></div>
    <div class="text-[14px] font-semibold"><slot name='subtitle' /></div>
  </div>
</template>

<script setup>
defineProps({
  color: { type: String, default: 'var(--accent)' }
})
</script>

<style scoped>
div {
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
}
</style>