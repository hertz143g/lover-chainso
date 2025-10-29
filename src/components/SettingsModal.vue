<template>
  <!-- затемнение фона -->
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      @click.self="close"
    >
      <!-- модалка -->
      <transition name="scale">
        <div
          v-if="show"
          class="bg-[#1a0024] border border-purple-600/40 rounded-[24px] p-6 w-[90%] max-w-[420px] text-white shadow-2xl"
        >
          <h2 class="text-xl font-semibold mb-4 text-center">
            Настройки
          </h2>

          <div class="space-y-3">
            <div>
              <label class="text-sm text-white/70">Ваше имя:</label>
              <input
                v-model="form.name1"
                type="text"
                class="w-full mt-1 rounded-xl bg-white/10 border border-white/20 px-3 py-2 focus:outline-none focus:border-purple-400 transition"
              />
            </div>

            <div>
              <label class="text-sm text-white/70">Имя партнёра:</label>
              <input
                v-model="form.name2"
                type="text"
                class="w-full mt-1 rounded-xl bg-white/10 border border-white/20 px-3 py-2 focus:outline-none focus:border-purple-400 transition"
              />
            </div>

            <div class="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label class="text-sm text-white/70">Ваше фото:</label>
                <input
                  type="file"
                  accept="image/*"
                  class="block w-full text-xs mt-1"
                  @change="onFileChange('self', $event)"
                />
              </div>

              <div>
                <label class="text-sm text-white/70">Фото партнёра:</label>
                <input
                  type="file"
                  accept="image/*"
                  class="block w-full text-xs mt-1"
                  @change="onFileChange('partner', $event)"
                />
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-6">
            <button
              @click="save"
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
import { ref, watch, defineEmits, defineProps } from 'vue'
import { useStore } from '@/store/useStore'

const emit = defineEmits(['close'])
const props = defineProps({ show: Boolean })
const store = useStore()
const form = ref({
  name1: store.state.name1 || '',
  name2: store.state.name2 || '',
})

function close() {
  emit('close')
}

function save() {
  store.state.name1 = form.value.name1
  store.state.name2 = form.value.name2
  localStorage.setItem('lover_chains_vue_state_v2', JSON.stringify(store.state))

  // плавное закрытие
  setTimeout(() => emit('close'), 200)
}

function onFileChange(type, e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    store.state[type === 'self' ? 'photo1' : 'photo2'] = reader.result
    localStorage.setItem('lover_chains_vue_state_v2', JSON.stringify(store.state))
  }
  reader.readAsDataURL(file)
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