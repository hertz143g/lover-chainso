<template>
  <div
    class="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm grid place-items-center p-6"
    @click.self="$emit('close')"
  >
    <div
      class="w-full max-w-sm bg-[#1b0d23] border border-white/10 rounded-3xl overflow-hidden animate-fadeIn"
    >
      <!-- Заголовок -->
      <div
        class="px-5 py-4 text-[22px] tracking-wide border-b border-white/10 flex justify-between items-center"
      >
        <span>настройки пары</span>
        <button
          @click="$emit('close')"
          class="text-white/60 hover:text-white transition"
        >
          ✕
        </button>
      </div>

      <!-- Форма -->
      <form class="p-5 space-y-6" @submit.prevent="save">
        <!-- Ваше имя -->
        <div class="space-y-2">
          <label class="text-sm opacity-80">ваше имя:</label>
          <input
            v-model="form.youName"
            type="text"
            placeholder="например, Иван"
            class="w-full bg-transparent border border-white/20 rounded-xl px-3 py-2 focus:border-pink-500 outline-none transition"
          />
        </div>

        <!-- Имя партнёра -->
        <div class="space-y-2">
          <label class="text-sm opacity-80">имя партнёра:</label>
          <input
            v-model="form.partnerName"
            type="text"
            placeholder="например, Ксения"
            class="w-full bg-transparent border border-white/20 rounded-xl px-3 py-2 focus:border-pink-500 outline-none transition"
          />
        </div>

        <!-- Фото в два столбца -->
        <div class="grid grid-cols-2 gap-6 mt-6">
          <!-- Фото 1 -->
          <div class="space-y-2">
            <label class="block text-sm opacity-80 text-center">ваше фото</label>
            <div class="relative w-24 h-24 mx-auto rounded-full overflow-hidden border border-white/20">
              <img
                v-if="form.youAvatar"
                :src="form.youAvatar"
                class="object-cover w-full h-full"
              />
              <button
                type="button"
                @click="pick('you')"
                class="absolute inset-0 bg-black/40 hover:bg-black/30 flex items-center justify-center text-pink-400 text-2xl"
              >
                📷
              </button>
            </div>
          </div>

          <!-- Фото 2 -->
          <div class="space-y-2">
            <label class="block text-sm opacity-80 text-center">фото партнёра</label>
            <div class="relative w-24 h-24 mx-auto rounded-full overflow-hidden border border-white/20">
              <img
                v-if="form.partnerAvatar"
                :src="form.partnerAvatar"
                class="object-cover w-full h-full"
              />
              <button
                type="button"
                @click="pick('partner')"
                class="absolute inset-0 bg-black/40 hover:bg-black/30 flex items-center justify-center text-pink-400 text-2xl"
              >
                📷
              </button>
            </div>
          </div>
        </div>

        <!-- Кнопка сохранить -->
        <div class="flex justify-end pt-4">
          <button
            class="px-5 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 font-medium transition"
          >
            сохранить
          </button>
        </div>
      </form>
    </div>

    <!-- скрытые инпуты для фото -->
    <input ref="youInput" type="file" accept="image/*" class="hidden" @change="onFile($event, 'you')" />
    <input ref="partnerInput" type="file" accept="image/*" class="hidden" @change="onFile($event, 'partner')" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/store/useStore'
const store = useStore()
const youInput = ref(null)
const partnerInput = ref(null)

const form = ref({
  youName: store.state.youName,
  partnerName: store.state.partnerName,
  youAvatar: store.state.youAvatar,
  partnerAvatar: store.state.partnerAvatar,
})

function pick(which) {
  if (which === 'you') youInput.value?.click()
  else partnerInput.value?.click()
}

function onFile(e, which) {
  const f = e.target.files?.[0]
  if (!f) return
  const r = new FileReader()
  r.onload = () => {
    form.value[which === 'you' ? 'youAvatar' : 'partnerAvatar'] = r.result
  }
  r.readAsDataURL(f)
}

function save() {
  Object.assign(store.state, form.value)
  localStorage.setItem('lover_chains_vue_state_v2', JSON.stringify(store.state))
  emit('close')
}

const emit = defineEmits(['close'])
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.25s ease;
}
</style>