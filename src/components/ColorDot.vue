<template>
  <button
    class="w-10 h-10 rounded-full border-2"
    :style="{ backgroundColor: color, borderColor: active ? 'white' : '#5a4ca3' }"
  />
</template>
<script setup>
const props = defineProps({ color: String, active: Boolean })
</script>