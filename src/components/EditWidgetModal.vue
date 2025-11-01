<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      @click.self="emit('close')"
    >
      <transition name="scale">
        <div
          class="rounded-3xl p-6 w-[90%] max-w-md text-white shadow-lg transition-all"
          :style="{
            background: 'var(--card)',
            border: '1.5px solid var(--border)',
            color: 'var(--text)',
            boxShadow: '0 0 25px var(--glow)'
          }"
        >
          <h2 class="text-2xl font-semibold text-center mb-6">
            Редактировать виджет
          </h2>

          <!-- 📖 Название -->
          <div class="mb-4">
            <label class="block text-sm mb-1 opacity-80">Название:</label>
            <input
              v-model="localWidget.title"
              type="text"
              class="w-full bg-transparent border rounded-full px-4 py-2 focus:outline-none transition"
              :style="{ borderColor: 'var(--border)', color: 'var(--text)' }"
            />
          </div>

          <!-- 📅 Дата -->
          <div class="mb-4">
            <label class="block text-sm mb-1 opacity-80">Дата:</label>
            <input
              v-model="localWidget.date"
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
                  borderColor: c === localWidget.color ? '#fff' : 'transparent',
                  boxShadow: c === localWidget.color ? `0 0 15px ${c}` : 'none'
                }"
                @click="localWidget.color = c"
              ></div>
            </div>
          </div>

          <!-- 🔘 Кнопки -->
          <div class="flex justify-between items-center mt-6">
            <button
              @click="remove"
              class="px-5 py-2 rounded-full border transition-all text-red-400 hover:text-red-300"
              :style="{ borderColor: 'var(--border)' }"
            >
              Удалить
            </button>
            <div class="flex gap-3">
              <button
                @click="emit('close')"
                class="px-4 py-2 rounded-full border transition-all"
                :style="{ borderColor: 'var(--border)', color: 'var(--text)' }"
              >
                Отмена
              </button>
              <button
                @click="save"
                class="px-5 py-2 rounded-full transition-all"
                :style="{
                  background: 'var(--accent)',
                  color: '#fff',
                  boxShadow: '0 0 20px var(--accent)'
                }"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from '@/store/useStore'

const props = defineProps({ show: Boolean, widget: Object })
const emit = defineEmits(['close'])
const store = useStore()

const localWidget = ref({ ...props.widget })
const colors = [
  '#ff8ba7', '#ffb26b', '#ffd56f',
  '#b5e48c', '#76c7c0', '#9b5de5',
  '#7ae582', '#ff6b6b'
]

// следим за обновлением пропсов
watch(
  () => props.widget,
  val => {
    if (val) localWidget.value = { ...val }
  },
  { immediate: true }
)

function save() {
  store.updateWidget(localWidget.value)
  emit('close')
}

function remove() {
  store.deleteWidget(localWidget.value.id)
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