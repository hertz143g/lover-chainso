<template>
  <div
    class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <div
      class="bg-[#1a0024] border border-pink-500/30 rounded-3xl p-6 w-[90%] max-w-sm text-white shadow-lg"
    >
      <h2 class="text-center text-xl font-semibold mb-6">Добавить виджет</h2>

      <!-- 🗓 Выбор даты -->
      <div class="mb-4">
        <label class="block text-sm mb-2 opacity-70">Дата:</label>
        <input
          v-model="form.date"
          type="date"
          class="w-full px-4 py-2 bg-transparent border border-white/20 rounded-full focus:border-pink-500 outline-none text-white [color-scheme:dark]"
        />
      </div>

      <!-- 📝 Название -->
      <div class="mb-6">
        <label class="block text-sm mb-2 opacity-70">Описание:</label>
        <input
          v-model="form.title"
          placeholder="Например: Первое свидание"
          class="w-full px-4 py-2 bg-transparent border border-white/20 rounded-full focus:border-pink-500 outline-none"
        />
      </div>

      <!-- 🎨 Цвет -->
      <div class="mb-6">
        <p class="text-sm mb-2 opacity-70">Цвет виджета:</p>
        <div class="flex justify-between">
          <div
            v-for="color in colors"
            :key="color"
            class="w-8 h-8 rounded-full cursor-pointer border-2 transition"
            :class="{
              'scale-110 border-white': form.color === color
            }"
            :style="{ backgroundColor: color }"
            @click="form.color = color"
          ></div>
        </div>
      </div>

      <!-- 💾 Сохранить -->
      <button
        @click="save"
        class="w-full py-2 rounded-full bg-pink-500 hover:bg-pink-400 transition"
      >
        Сохранить
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/store/useStore'

const emit = defineEmits(['close'])
const store = useStore()

const form = ref({
  date: '',
  title: '',
  color: '#ec4899'
})

const colors = ['#ec4899', '#8b5cf6', '#06b6d4', '#f59e0b']

function save() {
  if (!form.value.date || !form.value.title) return
  // форматируем дату красиво
  const formattedDate = new Date(form.value.date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  store.addWidget({ ...form.value, date: formattedDate })
  form.value = { date: '', title: '', color: '#ec4899' }
  setTimeout(() => emit('close'), 200)
}
</script>