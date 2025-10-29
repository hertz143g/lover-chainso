<template>
  <div
    class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <div
      class="bg-[#1a0024] border border-pink-500/30 rounded-3xl p-6 w-[90%] max-w-sm text-white shadow-lg"
    >
      <h2 class="text-center text-xl font-semibold mb-6">Добавить виджет</h2>

      <input
        v-model="form.date"
        placeholder="Введите дату (например: 09 мая 2024)"
        class="w-full mb-4 px-4 py-2 bg-transparent border border-white/20 rounded-full focus:border-pink-500 outline-none"
      />
      <input
        v-model="form.title"
        placeholder="Описание (например: Первое свидание)"
        class="w-full mb-6 px-4 py-2 bg-transparent border border-white/20 rounded-full focus:border-pink-500 outline-none"
      />

      <!-- выбор цвета -->
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
  color: '#ec4899', // по умолчанию розовый
})

const colors = ['#ec4899', '#8b5cf6', '#06b6d4', '#f59e0b']

function save() {
  if (!form.value.date || !form.value.title) return
  store.addWidget({ ...form.value })
  form.value = { date: '', title: '', color: '#ec4899' }
  setTimeout(() => emit('close'), 200)
}
</script>