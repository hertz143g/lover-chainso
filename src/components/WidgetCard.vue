<template>
  <div
    class="rounded-[26px] h-28 p-4 border-2 bg-[#1a0a1d]/60 backdrop-blur flex flex-col justify-between hover:translate-y-[-2px] transition"
    :style="{ borderColor: color, boxShadow: `0 10px 30px ${color}40` }"
  >
    <div class="text-sm opacity-80"><slot name="title" /></div>
    <div class="text-lg font-bold"><slot name="subtitle" /></div>
  </div>
</template>

<script setup>
const props = defineProps({ color: { type: String, default: '#8a2c6c' } })
</script>
