<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'
import { useStore } from '@/store/useStore'

const emit = defineEmits(['close'])
const props = defineProps({ show: Boolean })
const store = useStore()

const form = ref({ name1: '', name2: '' })
const photoSelf = ref('')
const photoPartner = ref('')
const fileInput = ref(null)
let currentType = null

watch(
  () => props.show,
  (val) => {
    if (val) {
      form.value.name1 = store.state.name1
      form.value.name2 = store.state.name2
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
  store.setName1(form.value.name1)
  store.setName2(form.value.name2)
  setTimeout(() => emit('close'), 250)
}

function close() {
  emit('close')
}
</script>

<template>
  <div
    v-if="props.show"
    class="fixed inset-0 bg-black/60 flex items-center justify-center text-white z-50"
    @click.self="close"
  >
    <div
      class="bg-[#1a0024] p-6 rounded-xl w-80 transition-all duration-300"
    >
      <h2 class="text-xl font-bold mb-4">Настройки</h2>

      <input
        v-model="form.name1"
        placeholder="Ваше имя"
        class="w-full mb-3 bg-transparent border border-white/20 px-3 py-2 rounded"
      />
      <input
        v-model="form.name2"
        placeholder="Имя партнёра"
        class="w-full mb-4 bg-transparent border border-white/20 px-3 py-2 rounded"
      />

      <div class="flex justify-between gap-3">
        <div class="flex-1 text-center cursor-pointer" @click="pickImage('self')">
          <img
            v-if="photoSelf"
            :src="photoSelf"
            class="w-20 h-20 rounded-full object-cover mx-auto border border-white/30"
          />
          <div v-else class="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center mx-auto">+</div>
          <p class="text-sm mt-2 opacity-70">Ваше фото</p>
        </div>

        <div class="flex-1 text-center cursor-pointer" @click="pickImage('partner')">
          <img
            v-if="photoPartner"
            :src="photoPartner"
            class="w-20 h-20 rounded-full object-cover mx-auto border border-white/30"
          />
          <div v-else class="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center mx-auto">+</div>
          <p class="text-sm mt-2 opacity-70">Фото партнёра</p>
        </div>
      </div>

      <input type="file" ref="fileInput" class="hidden" @change="onFileChange" />

      <button
        @click="save"
        class="w-full bg-white/20 mt-6 py-2 rounded hover:bg-white/30 transition"
      >
        Сохранить
      </button>
    </div>
  </div>
</template>