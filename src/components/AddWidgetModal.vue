<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
      @click.self="emit('close')"
    >
      <transition name="scale">
        <div
          class="rounded-3xl p-6 w-[90%] max-w-md shadow-lg border text-white transition-all"
          :style="{
            background: 'var(--card)',
            borderColor: 'var(--border)',
            color: 'var(--text)',
            boxShadow: '0 0 25px var(--glow)'
          }"
        >
          <h2 class="text-2xl font-semibold text-center mb-6">
            Новый виджет
          </h2>

          <!-- 📅 Название -->
          <div class="mb-4">
            <label class="block text-sm mb-1 opacity-80">Название:</label>
            <input
              v-model="title"
              type="text"
              placeholder="Например: Первое свидание"
              class="w-full bg-transparent border rounded-full px-4 py-2 focus:outline-none transition"
              :style="{
                borderColor: 'var(--border)',
                color: 'var(--text)'
              }"
            />
          </div>

          <!-- 📆 Дата -->
          <div class="mb-4">
            <label class="block text-sm mb-1 opacity-80">Дата:</label>
            <input
              v-model="date"
              type="date"
              class="w-full bg-transparent border rounded-full px-4 py-2 focus:outline-none transition [color-scheme:dark]"
              :style="{ borderColor: 'var(--border)', color: 'var(--text)' }"
            />
          </div>

          <!-- 🎨 Цвет -->
          <div class="mb-6">
            <label class="block text-sm mb-2 opacity-80">Цвет:</label>
            <div class="flex gap-2 flex-wrap">
              <div
                v-for="c in colors"
                :key="c"
                class="w-8 h-8 rounded-full cursor-pointer border-2 transition-all duration-300"
                :style="{
                  background: c,
                  borderColor: c === color ? '#fff' : 'transparent',
                  boxShadow: c === color ? `0 0 15px ${c}` : 'none'
                }"
                @click="color = c"
              ></div>
            </div>
          </div>

          <!-- 🔘 Кнопки -->
          <div class="flex justify-end gap-3">
            <button
              @click="emit('close')"
              class="px-4 py-2 rounded-full border transition-all"
              :style="{
                borderColor: 'var(--border)',
                color: 'var(--text)'
              }"
            >
              Отмена
            </button>
            <button
              @click="add"
              class="px-5 py-2 rounded-full transition-all"
              :style="{
                background: 'var(--accent)',
                color: '#fff',
                boxShadow: '0 0 20px var(--accent)'
              }"
            >
              Добавить
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/store/useStore'

const props = defineProps({ show: Boolean })
const emit = defineEmits(['close'])
const store = useStore()

const title = ref('')
const date = ref('')
const color = ref('#ff8ba7')

const colors = [
  '#ff8ba7', '#ffb26b', '#ffd56f',
  '#b5e48c', '#76c7c0', '#9b5de5',
  '#7ae582', '#ff6b6b'
]

function add() {
  if (!title.value || !date.value) return
  const widget = {
    id: Date.now(),
    title: title.value,
    date: date.value,
    color: color.value
  }
  store.addWidget(widget)
  emit('close')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.25s ease;
}
.scale-enter-from {
  transform: scale(0.9);
  opacity: 0;
}
.scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>