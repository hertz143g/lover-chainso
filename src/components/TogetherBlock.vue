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

      <!-- Текст сверху -->
      <p
        class="absolute top-5 left-5 z-20 text-[18px] text-white/90 tracking-wide font-light"
      >
        {{ togetherText }}
      </p>

      <!-- Текст снизу справа -->
      <p
        class="absolute bottom-4 right-5 z-20 text-[22px] font-semibold text-white/90"
      >
        {{ diff.daysTotal }} дней
      </p>

      <!-- Кнопка выбора фото -->
      <button
        @click="pickImage"
        class="absolute bottom-4 left-4 z-20 w-8 h-8 rounded-full border border-white/30 bg-white/20 text-white text-xl flex items-center justify-center backdrop-blur-sm hover:bg-white/30 active:scale-95 transition"
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
import { ref, computed, watch } from 'vue'
import { useStore } from '@/store/useStore'

const store = useStore()
const fileInput = ref(null)
const backgroundImage = ref(store.state.bgImage || '')

// дата из стора
const startDate = computed(() => store.state.startDate)

// вычисляем разницу между датами
const diff = computed(() => {
  if (!startDate.value) {
    return { years: 0, months: 0, days: 0, daysTotal: 0 }
  }

  const start = new Date(startDate.value)
  const now = new Date()

  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()

  if (days < 0) {
    months -= 1
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
  }

  if (months < 0) {
    years -= 1
    months += 12
  }

  const daysTotal = Math.floor((now - start) / (1000 * 60 * 60 * 24))

  return { years, months, days, daysTotal }
})

// красивые склонения
function plural(n, one, few, many) {
  const n10 = n % 10
  const n100 = n % 100
  if (n10 === 1 && n100 !== 11) return one
  if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return few
  return many
}

const togetherText = computed(() => {
  const { years, months, days } = diff.value
  const yText = years > 0 ? `${years} ${plural(years, 'год', 'года', 'лет')}` : ''
  const mText = months > 0 ? `${months} ${plural(months, 'месяц', 'месяца', 'месяцев')}` : ''
  const dText = days > 0 ? `${days} ${plural(days, 'день', 'дня', 'дней')}` : ''
  return [yText, mText, dText].filter(Boolean).join(' ')
})

// выбор фото
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

// следим за изменением фона
watch(
  () => store.state.bgImage,
  val => {
    if (val) backgroundImage.value = val
  },
  { immediate: true }
)
</script>