<template>
  <div class="px-5 mt-10">
    <h2 class="text-xl font-bold mb-4" :style="{ color: 'var(--text)' }">
      Вместе уже:
    </h2>

    <div
      class="relative rounded-[28px] overflow-hidden min-h-[280px] transition-all duration-500"
      :style="{
        border: `2px solid var(--border)`,
        boxShadow: `0 0 35px var(--glow)`,
        background: 'var(--card)',
        color: 'var(--text)'
      }"
    >
      <!-- 📸 Фото -->
      <div
        v-if="backgroundImage"
        class="absolute inset-0 bg-center bg-cover transition-all duration-300"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
      ></div>

      <!-- 🌫️ Лёгкое затемнение / выравнивание контраста -->
      <div
        class="absolute inset-0 pointer-events-none transition-opacity duration-300"
        :style="{ background: 'var(--overlay)' }"
      ></div>

      <!-- 🕊️ Текст сверху -->
      <p
        class="absolute top-5 left-5 z-20 text-[18px] tracking-wide font-light"
        :style="{ color: 'var(--text)' }"
      >
        {{ togetherText }}
      </p>

      <!-- 📅 Дни внизу -->
      <p
        class="absolute bottom-4 right-5 z-20 text-[22px] font-semibold"
        :style="{ color: 'var(--text)' }"
      >
        {{ diff.daysTotal }} дней
      </p>

      <!-- ➕ Кнопка выбора фото -->
      <button
        @click="pickImage"
        class="absolute bottom-4 left-4 z-20 w-9 h-9 rounded-full flex items-center justify-center text-xl active:scale-95 transition-all"
        :style="{
          border: `1.5px solid var(--border)`,
          background: 'var(--card)',
          color: 'var(--accent)',
          boxShadow: `0 0 10px var(--glow)`
        }"
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
  if (!startDate.value) return { years: 0, months: 0, days: 0, daysTotal: 0 }

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

// правильные склонения
function plural(n, one, few, many) {
  const n10 = n % 10
  const n100 = n % 100
  if (n10 === 1 && n100 !== 11) return one
  if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return few
  return many
}

const togetherText = computed(() => {
  const { years, months, days } = diff.value
  const y = years ? `${years} ${plural(years, 'год', 'года', 'лет')}` : ''
  const m = months ? `${months} ${plural(months, 'месяц', 'месяца', 'месяцев')}` : ''
  const d = days ? `${days} ${plural(days, 'день', 'дня', 'дней')}` : ''
  return [y, m, d].filter(Boolean).join(' ')
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

<style scoped>
div {
  transition: background 0.4s ease, border 0.4s ease, box-shadow 0.5s ease;
}

button:hover {
  transform: scale(1.08);
}
</style>