<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black/40"
      @click.self="close"
    >
      <transition name="pop">
        <div
          class="relative w-[90%] max-w-md rounded-3xl border backdrop-blur-2xl p-8 text-center shadow-[0_0_40px_var(--glow)] transition-all duration-500"
          :style="{
            background: 'var(--card)',
            borderColor: 'var(--border)',
            color: 'var(--text)'
          }"
        >
          <!-- заголовок -->
          <h2 class="text-2xl font-semibold mb-6 tracking-tight">
            Настройки
          </h2>

          <!-- имена -->
          <div class="space-y-4 mb-6">
            <input
              v-model="form.name1"
              placeholder="Ваше имя"
              class="w-full bg-transparent border rounded-full px-4 py-2 focus:outline-none transition-all"
              :style="{
                borderColor: 'var(--border)',
                color: 'var(--text)'
              }"
            />
            <input
              v-model="form.name2"
              placeholder="Имя партнёра"
              class="w-full bg-transparent border rounded-full px-4 py-2 focus:outline-none transition-all"
              :style="{
                borderColor: 'var(--border)',
                color: 'var(--text)'
              }"
            />
          </div>

          <!-- дата -->
          <div class="mb-6">
            <label class="block text-sm mb-2 opacity-70">Дата начала отношений</label>
            <input
              v-model="form.startDate"
              type="date"
              class="w-full bg-transparent border rounded-full px-4 py-2 focus:outline-none transition-all [color-scheme:dark]"
              :style="{
                borderColor: 'var(--border)',
                color: 'var(--text)'
              }"
            />
          </div>

          <!-- фото -->
          <div class="flex justify-between mb-8">
            <div class="flex flex-col items-center">
              <div
                class="relative w-20 h-20 rounded-full overflow-hidden border cursor-pointer group"
                :style="{ borderColor: 'var(--border)' }"
                @click="pickImage('self')"
              >
                <img
                  v-if="photoSelf"
                  :src="photoSelf"
                  class="absolute inset-0 w-full h-full object-cover group-hover:opacity-80 transition"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-3xl text-white/60 group-hover:text-[var(--accent)] transition"
                >
                  +
                </div>
              </div>
              <p class="text-xs mt-2 opacity-70">Вы</p>
            </div>

            <div class="flex flex-col items-center">
              <div
                class="relative w-20 h-20 rounded-full overflow-hidden border cursor-pointer group"
                :style="{ borderColor: 'var(--border)' }"
                @click="pickImage('partner')"
              >
                <img
                  v-if="photoPartner"
                  :src="photoPartner"
                  class="absolute inset-0 w-full h-full object-cover group-hover:opacity-80 transition"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-3xl text-white/60 group-hover:text-[var(--accent)] transition"
                >
                  +
                </div>
              </div>
              <p class="text-xs mt-2 opacity-70">Партнёр</p>
            </div>
          </div>

          <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />

          <!-- кнопка -->
          <button
            @click="save"
            class="px-8 py-2 rounded-full font-medium transition-all duration-300 active:scale-95"
            :style="{
              background: 'color-mix(in oklab, var(--accent) 20%, transparent)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              boxShadow: '0 0 15px var(--glow)'
            }"
          >
            Сохранить
          </button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from '@/store/useStore'

const props = defineProps({ show: Boolean })
const emit = defineEmits(['close'])
const store = useStore()

const form = ref({ name1: '', name2: '', startDate: '' })
const fileInput = ref(null)
const photoSelf = ref('')
const photoPartner = ref('')
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
    if (currentType === 'self') photoSelf.value = reader.result
    else photoPartner.value = reader.result
  }
  reader.readAsDataURL(file)
}

function save() {
  store.setName1(form.value.name1)
  store.setName2(form.value.name2)
  store.setStartDate(form.value.startDate)
  if (photoSelf.value) store.setPhoto1(photoSelf.value)
  if (photoPartner.value) store.setPhoto2(photoPartner.value)
  emit('close')
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

.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s ease;
}
.pop-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
.pop-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

button,
input {
  font-family: "Open Sans", sans-serif;
}
</style>