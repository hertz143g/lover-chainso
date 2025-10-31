<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      @click.self="close"
    >
      <transition name="scale">
        <div
          class="bg-[#1a0024] border border-white/10 rounded-3xl p-6 w-[90%] max-w-md text-white shadow-lg shadow-pink-500/10"
        >
          <h2 class="text-2xl font-semibold text-center mb-6">
            Настройки
          </h2>

          <!-- имена -->
          <div class="space-y-4 mb-6">
            <input
              v-model="form.name1"
              placeholder="Ваше имя"
              class="w-full bg-transparent border border-white/20 rounded-full px-4 py-2 focus:outline-none focus:border-pink-500 transition"
            />
            <input
              v-model="form.name2"
              placeholder="Имя партнёра"
              class="w-full bg-transparent border border-white/20 rounded-full px-4 py-2 focus:outline-none focus:border-pink-500 transition"
            />
          </div>

          <!-- дата -->
          <div class="mb-6">
            <label class="block text-sm mb-2 opacity-70">Дата начала отношений:</label>
            <input
              v-model="form.startDate"
              type="date"
              class="w-full bg-transparent border border-white/20 rounded-full px-4 py-2 focus:border-pink-500 transition [color-scheme:dark]"
            />
          </div>

          <!-- темы -->
          <div class="mb-8">
            <p class="text-sm mb-3 opacity-70">Цветовая тема:</p>
            <div class="grid grid-cols-2 gap-3">
              <div
                v-for="(t, name) in theme.themes"
                :key="name"
                class="rounded-2xl border border-white/10 p-3 cursor-pointer transition-all duration-300 hover:scale-[1.03]"
                :style="{ background: t.bg, color: t.text }"
                @click="theme.setTheme(name)"
              >
                <div class="text-center font-medium capitalize">
                  {{ name }}
                </div>
              </div>
            </div>
          </div>

          <!-- фото -->
          <div class="flex justify-between items-center gap-6 mb-6">
            <div class="flex flex-col items-center gap-2 flex-1">
              <div @click="pickImage('self')" class="relative cursor-pointer group">
                <img
                  v-if="photoSelf"
                  :src="photoSelf"
                  class="w-24 h-24 rounded-full object-cover border-2 border-pink-400/50 group-hover:opacity-80 transition"
                />
                <div
                  v-else
                  class="w-24 h-24 rounded-full border-2 border-white/30 flex items-center justify-center text-3xl text-white/60 group-hover:text-pink-400 transition"
                >
                  +
                </div>
              </div>
              <p class="text-xs opacity-70">Вы</p>
            </div>

            <div class="flex flex-col items-center gap-2 flex-1">
              <div @click="pickImage('partner')" class="relative cursor-pointer group">
                <img
                  v-if="photoPartner"
                  :src="photoPartner"
                  class="w-24 h-24 rounded-full object-cover border-2 border-pink-400/50 group-hover:opacity-80 transition"
                />
                <div
                  v-else
                  class="w-24 h-24 rounded-full border-2 border-white/30 flex items-center justify-center text-3xl text-white/60 group-hover:text-pink-400 transition"
                >
                  +
                </div>
              </div>
              <p class="text-xs opacity-70">Партнёр</p>
            </div>
          </div>

          <!-- инпут -->
          <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />

          <!-- кнопка -->
          <div class="flex justify-end">
            <button
              @click.prevent="save"
              class="px-6 py-2 rounded-full bg-white/20 border border-white/30 hover:bg-white/30 transition active:scale-95"
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

const emit = defineEmits(['close'])
const props = defineProps({ show: Boolean })
const store = useStore()
const theme = useThemeStore()

const form = ref({ name1: '', name2: '', startDate: '' })
const photoSelf = ref('')
const photoPartner = ref('')
const fileInput = ref(null)
let currentType = null

watch(
  () => props.show,
  val => {
    if (val) {
      form.value.name1 = store.state.name1
      form.value.name2 = store.state.name2
      form.value.startDate = store.state.startDate
      photoSelf.value = store.state.photo1
      photoPartner.value = store.state.photo2
    }
  },
  { immediate: true }
)

function pickImage(type) {
  currentType = type
  fileInput.value?.click()
}

function onFileChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    if (currentType === 'self') {
      photoSelf.value = reader.result
      store.setPhoto1(reader.result)
    } else {
      photoPartner.value = reader.result
      store.setPhoto2(reader.result)
    }
  }
  reader.readAsDataURL(file)
}

function save() {
  if (form.value.name1) store.setName1(form.value.name1)
  if (form.value.name2) store.setName2(form.value.name2)
  if (photoSelf.value) store.setPhoto1(photoSelf.value)
  if (photoPartner.value) store.setPhoto2(photoPartner.value)
  store.setStartDate(form.value.startDate)
  setTimeout(() => emit('close'), 300)
}

function close() {
  emit('close')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
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