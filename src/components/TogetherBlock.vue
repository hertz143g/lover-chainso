<template>
  <div class="px-5 mt-10">
    <h2 class="text-xl font-bold mb-4">Вместе уже:</h2>

    <div
      class="relative border border-purple-500/40 rounded-[28px] overflow-hidden min-h-[260px]"
    >
      <!-- Фото -->
      <div
        v-if="backgroundImage"
        class="absolute inset-0 bg-center bg-cover"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
      ></div>

      <!-- Затемнение -->
      <div
        class="absolute inset-0 bg-[#12001a]/65 pointer-events-none"
      ></div>

      <!-- Контент -->
      <div class="relative z-10 w-full h-full flex flex-col justify-between">
        <!-- Верх -->
        <p class="text-[18px] text-white/90 leading-snug pt-5 px-5">
          {{ togetherText }}
        </p>

        <!-- Низ -->
        <p class="text-[22px] font-semibold text-right text-white/90 pb-5 pr-5">
          {{ totalDays }} дней
        </p>
      </div>

      <!-- Кнопка выбора фото -->
      <button
        @click="pickImage"
        class="absolute top-3 right-3 z-20 w-10 h-10 bg-white text-black rounded-full text-2xl font-light flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition"
      >
        +
      </button>

      <!-- Input -->
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="onFileChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from '@/store/useStore'

const store = useStore()
const fileInput = ref(null)
const backgroundImage = ref(store.state.bgImage || '')

// примерные данные
const togetherText = computed(() => '1 год 5 месяцев 20 дней')
const totalDays = computed(() => '538')

function pickImage() {
  fileInput.value?.click()
}

function onFileChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    backgroundImage.value = reader.result
    store.state.bgImage = reader.result
    localStorage.setItem('lover_chains_vue_state_v2', JSON.stringify(store.state))
  }
  reader.readAsDataURL(file)
}
</script>

<style scoped>
div[style*="background-image"] {
  transition: opacity 0.4s ease;
}
</style>