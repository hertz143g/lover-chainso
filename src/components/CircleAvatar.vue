<template>
  <div class="relative" :style="{width:size+'px',height:size+'px'}">
    <div class="relative rounded-full overflow-hidden" :style="outerStyle">
      <img v-if="modelValue" :src="modelValue" class="w-full h-full object-cover" alt="" />
      <div v-else class="w-full h-full" :style="{background: '#2a2335'}" />
      <div class="absolute inset-0 pointer-events-none rounded-full" :style="glowStyle"></div>
    </div>
    <button @click="pick" class="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-pink-500 grid place-items-center text-xl border-4 border-[#12001a] shadow-lg">+</button>
    <input ref="file" type="file" accept="image/*" class="hidden" @change="onFile" />
    <div v-if="label" class="absolute -bottom-8 left-2 text-sm tracking-wide opacity-90">{{ label }}</div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
const props = defineProps({ modelValue:String, label:String, size:{type:Number,default:220}, ring:{type:String,default:'#3b5ea9'} , ring2:{type:String,default:'#8a2c6c'} })
const emit = defineEmits(['update:modelValue'])
const file = ref(null)
const outerStyle = computed(()=>({ border:`3px solid rgba(255,255,255,.08)`, boxShadow:'inset 0 0 0 8px rgba(255,255,255,.04)', width:'100%',height:'100%',borderRadius:'9999px'}))
const glowStyle = computed(()=>({ boxShadow:'0 0 80px 20px rgba(255,0,128,.18)', borderRadius:'9999px'}))
function pick(){ file.value?.click() }
function onFile(e){ const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=()=>emit('update:modelValue', r.result); r.readAsDataURL(f) }
</script>