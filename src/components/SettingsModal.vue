<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      @click.self="close"
    >
      <transition name="scale">
        <div
          class="rounded-3xl p-6 w-[90%] max-w-md text-white border border-white/10 shadow-lg"
          :style="{ background: 'var(--card)', color: 'var(--text)' }"
        >
          <h2 class="text-2xl font-semibold text-center mb-6">Настройки</h2>

          <!-- имена -->
          <div class="space-y-4 mb-6">
            <input v-model="form.name1" placeholder="Ваше имя"
              class="w-full bg-transparent border border-white/20 rounded-full px-4 py-2 focus:border-[var(--accent)] transition" />
            <input v-model="form.name2" placeholder="Имя партнёра"
              class="w-full bg-transparent border border-white/20 rounded-full px-4 py-2 focus:border-[var(--accent)] transition" />
          </div>

          <!-- дата -->
          <div class="mb-6">
            <label class="block text-sm mb-2 opacity-70">Дата начала отношений:</label>
            <input v-model="form.startDate" type="date"
              class="w-full bg-transparent border border-white/20 rounded-full px-4 py-2 focus:border-[var(--accent)] transition [color-scheme:dark]" />
          </div>

          <!-- темы -->
          <div class="mb-8">
            <p class="text-sm mb-3 opacity-70">Цветовая тема:</p>
            <div class="grid grid-cols-2 gap-3">
              <div
                v-for="(t, name) in theme.themes"
                :key="name"
                @click="theme.setTheme(name)"
                class="rounded-2xl border border-white/10 p-3 cursor-pointer transition-all duration-300 hover:scale-[1.03]"
                :class="{ 'ring-2 ring-[var(--accent)]': theme.current === name }"
                :style="{ background: t.bg, color: t.text }"
              >
                <div class="text-center font-medium capitalize">
                  {{ name === 'dawn' ? '🌅 От рассвета до заката' : name }}
                </div>
              </div>
            </div>
          </div>

          <!-- кнопка -->
          <div class="flex justify-end">
            <button
              @click.prevent="save"
              class="px-6 py-2 rounded-full bg-[var(--accent)]/20 border border-[var(--border)] hover:bg-[var(--accent)]/30 transition active:scale-95"
            >
              Сохранить
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import { useStore } from '@/store/useStore'
import { useThemeStore } from '@/store/useThemeStore'

const props = defineProps({ show: Boolean })
const emit = defineEmits(['close'])
const store = useStore()
const theme = useThemeStore()

const form = ref({ name1: '', name2: '', startDate: '' })

watch(
  () => props.show,
  val => {
    if (val) {
      form.value.name1 = store.state.name1
      form.value.name2 = store.state.name2
      form.value.startDate = store.state.startDate
    }
  },
  { immediate: true }
)

function save() {
  if (form.value.name1) store.setName1(form.value.name1)
  if (form.value.name2) store.setName2(form.value.name2)
  store.setStartDate(form.value.startDate)
  setTimeout(() => emit('close'), 300)
}
function close() {
  emit('close')
}
</script>