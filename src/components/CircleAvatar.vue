<template>
  <div class="relative" :style="{ width: size+'px', height: size+'px' }">
    <div :class="['rounded-full w-full h-full overflow-hidden flex items-center justify-center', ringClass]" :style="{ boxShadow: shadow }">
      <img v-if="modelValue" :src="modelValue" class="w-full h-full object-cover" alt="" />
      <div v-else class="w-full h-full bg-[#3a3243]" />
    </div>
    <button @click="pick" class="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-pink-500 border-4 border-[#160014] grid place-items-center text-xl">+</button>
    <input ref="file" type="file" accept="image/*" class="hidden" @change="onFile" />
    <div v-if="label" class="absolute -bottom-8 left-2 text-sm tracking-wide opacity-90">{{ label }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  modelValue: String,
  label: String,
  size: { type: Number, default: 220 },
  ring: { type: String, default: '#274a7b' },
  ringWidth: { type: Number, default: 6 },
  glow: { type: String, default: '0 8px 30px rgba(255,0,120,.25)' },
})
const emit = defineEmits(['update:modelValue'])
const file = ref(null)

const ringClass = 'border-[3px] border-white/10'
const shadow = props.glow

function pick(){ file.value?.click() }
function onFile(e){
  const f = e.target.files?.[0]
  if (!f) return
  const reader = new FileReader()
  reader.onload = () => emit('update:modelValue', reader.result)
  reader.readAsDataURL(f)
}
</script>

<style scoped>
</style>