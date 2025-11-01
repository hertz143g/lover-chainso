<template>
  <div class="rounded-[26px] h-28 p-4 border-2 bg-[#1a0a1d]/60 backdrop-blur flex flex-col justify-between"
       :style="{ borderColor: color, boxShadow: `0 10px 30px ${color}40` }">
    <div class="text-[12px] opacity-85"><slot name="title" /></div>
    <div class="text-[14px] font-semibold"><slot name="subtitle" /></div>
  </div>
</template>
<script setup>
const props = defineProps({ color: {type:String, default:'#a83c63'} })
</script>