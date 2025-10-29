<!-- TogetherBlock.vue -->
<template>
  <div class="px-5 mt-10">
    <h2 class="text-xl font-bold mb-4">Вместе уже:</h2>

    <div class="relative rounded-[28px] overflow-hidden border border-purple-500/40 min-h-[260px]">
      <!-- Фото -->
      <div
        v-if="backgroundImage"
        class="absolute inset-0 bg-center bg-cover"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
      />
      <!-- Затемнение под тему -->
      <div class="absolute inset-0 bg-[#12001a]/70 pointer-events-none" />

      <!-- Текст сверху слева -->
      <p class="absolute top-5 left-5 z-20 text-[18px] text-white/90">
        {{ togetherText }}
      </p>

      <!-- Текст СНИЗУ СПРАВА -->
      <p class="absolute bottom-4 right-5 z-20 text-[22px] font-semibold text-white/90">
        {{ totalDays }} дней
      </p>

      <!-- Кнопка СНИЗУ СЛЕВА -->
      <button
        @click="pickImage"
        class="absolute bottom-4 left-4 z-20 w-8 h-8 rounded-full border border-white/30 bg-white/20 text-white text-xl flex items-center justify-center backdrop-blur-sm hover:bg-white/30 active:scale-95 transition"
      >+</button>

      <!-- file input -->
      <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from '@/store/useStore'

const store = useStore()
const fileInput = ref(null)
const backgroundImage = ref(store.state.bgImage || '')

const togetherText = computed(() => '1 год 5 месяцев 20 дней')
const totalDays = computed(() => '538')

function pickImage(){ fileInput.value?.click() }
function onFileChange(e){
  const f = e.target.files?.[0]; if(!f) return
  const r = new FileReader()
  r.onload = () => {
    backgroundImage.value = r.result
    store.state.bgImage = r.result
    localStorage.setItem('lover_chains_vue_state_v2', JSON.stringify(store.state))
  }
  r.readAsDataURL(f)
}
</script>