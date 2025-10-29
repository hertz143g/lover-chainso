<template>
  <div class="px-5 mt-6">
    <h2 class="text-xl font-bold mb-3">Вместе уже:</h2>

    <div
      class="relative border border-purple-500/40 rounded-3xl p-5 min-h-[180px] flex flex-col justify-between overflow-hidden"
    >
      <!-- Фон с фото -->
      <div
        v-if="backgroundImage"
        class="absolute inset-0 bg-center bg-cover"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
      ></div>

      <!-- Затемнение -->
      <div
        v-if="backgroundImage"
        class="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
      ></div>

      <!-- Контент -->
      <div class="relative z-10 text-white/90">
        <p class="text-[17px] leading-tight">
          {{ togetherText }}
        </p>
      </div>

      <div class="relative z-10 flex justify-end">
        <p class="text-lg font-semibold text-white/90">
          {{ totalDays }} дней
        </p>
      </div>

      <!-- Кнопка добавления фото -->
      <button
        @click="pickImage"
        class="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full text-black text-2xl font-light flex items-center justify-center shadow-md hover:scale-105 transition"
      >
        +
      </button>

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

// пример: можно потом заменить на реальный расчёт
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
/* плавное появление фона */
div[style*="background-image"] {
  transition: background-image 0.4s ease, opacity 0.4s ease;
}
</style>