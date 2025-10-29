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

const store = useStore()
const form = ref({ date: '', title: '' })

function save() {
  if (!form.value.date || !form.value.title) return
  store.addWidget({ ...form.value })
  form.value = { date: '', title: '' }
  setTimeout(() => emit('close'), 200)
}
</script>