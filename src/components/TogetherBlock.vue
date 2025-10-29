<template>
  <div class="px-5 mt-10">
    <h2 class="text-xl font-bold mb-4">Вместе уже:</h2>

    <div
      class="relative rounded-[28px] overflow-hidden border border-pink-500/40 min-h-[280px] shadow-[0_0_25px_rgba(255,0,122,0.2)]"
    >
      <!-- Фото -->
      <div
        v-if="backgroundImage"
        class="absolute inset-0 bg-center bg-cover transition-all duration-300"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
      ></div>

      <!-- Затемнение -->
      <div
        class="absolute inset-0 bg-[#12001a]/70 pointer-events-none transition-opacity duration-300"
      ></div>

      <!-- Верхний текст -->
      <p
        class="absolute top-5 left-5 z-20 text-[18px] text-white/90 tracking-wide font-light"
      >
        {{ years }} {{ yearWord }} вместе
      </p>

      <!-- Нижний текст -->
      <p
        class="absolute bottom-4 right-5 z-20 text-[22px] font-semibold text-white/90"
      >
        {{ days }} дней
      </p>

      <!-- Кнопка загрузки фото -->
      <button
        @click="pickImage"
        class="absolute bottom-4 left-4 z-20 w-8 h-8 rounded-full border border-white/30 bg-white/20 text-white text-xl flex items-center justify-center backdrop-blur-sm hover:bg-white/30 active:scale-95 transition"
      >
        +
      </button>

      <!-- Скрытый input -->
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
import { ref, computed, watch } from 'vue'
import { useStore } from '@/store/useStore'

const store = useStore()
const fileInput = ref(null)
const backgroundImage = ref(store.state.bgImage || '')

const startDate = computed(() => store.state.startDate)

const diff = computed(() => {
  if (!startDate.value) return { days: 0, years: 0, months: 0 }

  const start = new Date(startDate.value)
  const now = new Date()

  const diffMs = now - start
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const totalMonths = Math.floor(totalDays / 30.44)
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  return { days: totalDays, years, months }
})

const days = computed(() => diff.value.days)
const years = computed(() => diff.value.years)
const months = computed(() => diff.value.months)

const yearWord = computed(() => {
  const y = years.value
  if (y === 1) return 'год'
  if (y >= 2 && y <= 4) return 'года'
  return 'лет'
})

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
    localStorage.setItem('loverState', JSON.stringify(store.state))
  }
  reader.readAsDataURL(file)
}

// чтобы подхватывать фон из localStorage
watch(
  () => store.state.bgImage,
  val => {
    if (val) backgroundImage.value = val
  },
  { immediate: true }
)
</script>