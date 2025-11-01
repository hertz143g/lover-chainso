<template>
  <div
    class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <div
      class="bg-[#1a0024] border border-pink-500/30 rounded-3xl p-6 w-[90%] max-w-sm text-white shadow-lg"
    >
      <h2 class="text-center text-xl font-semibold mb-6">Редактировать виджет</h2>

      <input
        v-model="form.date"
        placeholder="Дата"
        class="w-full mb-4 px-4 py-2 bg-transparent border border-white/20 rounded-full focus:border-pink-500 outline-none"
      />
      <input
        v-model="form.title"
        placeholder="Описание"
        class="w-full mb-6 px-4 py-2 bg-transparent border border-white/20 rounded-full focus:border-pink-500 outline-none"
      />

      <div class="mb-6">
        <p class="text-sm mb-2 opacity-70">Цвет:</p>
        <div class="flex justify-between">
          <div
            v-for="color in colors"
            :key="color"
            class="w-8 h-8 rounded-full cursor-pointer border-2 transition"
            :class="{ 'scale-110 border-white': form.color === color }"
            :style="{ backgroundColor: color }"
            @click="form.color = color"
          ></div>
        </div>
      </div>

      <div class="flex justify-between mt-6">
        <button
          @click="remove"
          class="px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 transition"
        >
          Удалить
        </button>

        <button
          @click="save"
          class="px-6 py-2 rounded-full bg-pink-500 hover:bg-pink-400 transition"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from '@/store/useStore'

const props = defineProps({ widget: Object })
const emit = defineEmits(['close'])
const store = useStore()

const colors = ['#ec4899', '#8b5cf6', '#06b6d4', '#f59e0b']
const form = ref({ ...props.widget })

watch(() => props.widget, val => {
  if (val) form.value = { ...val }
})

function save() {
  store.updateWidget(form.value.id, { ...form.value })
  emit('close')
}

function remove() {
  store.deleteWidget(form.value.id)
  emit('close')
}
</script>