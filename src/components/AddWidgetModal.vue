<template>
  <div class="fixed inset-0 z-50 bg-black/60 grid place-items-center p-6" @click.self="$emit('close')">
    <div class="w-full max-w-sm rounded-3xl border-2 border-[#5a4ca3] bg-[#12001a]/95 backdrop-blur overflow-hidden">
      <div class="px-5 py-4 text-2xl tracking-wide border-b-2 border-[#5a4ca3]">добавить виджет</div>
      <form class="p-5 space-y-4" @submit.prevent="submit">
        <label class="block space-y-2">
          <span class="text-sm opacity-80">событие:</span>
          <input v-model="form.title" type="text" class="w-full bg-transparent border-2 border-[#5a4ca3] rounded-full px-4 py-3 focus:outline-none" placeholder="первое свидание" />
        </label>
        <label class="block space-y-2">
          <span class="text-sm opacity-80">дата:</span>
          <input v-model="form.date" type="date" class="w-full bg-transparent border-2 border-[#5a4ca3] rounded-full px-4 py-3 focus:outline-none" />
        </label>
        <div class="space-y-2">
          <div class="text-sm opacity-80">цвет:</div>
          <div class="flex gap-3">
            <ColorDot v-for="c in colors" :key="c" :color="c" :active="form.color===c" @click="form.color=c" />
          </div>
        </div>
        <label class="block space-y-2">
          <span class="text-sm opacity-80">фото на фоне:</span>
          <div class="flex items-center gap-3">
            <input ref="file" type="file" accept="image/*" class="hidden" @change="onFile" />
            <button type="button" @click="file.click()" class="px-4 py-3 rounded-full border-2 border-[#5a4ca3] bg-transparent hover:bg-white/10">загрузить</button>
            <span class="text-xs opacity-70 truncate max-w-[200px]">{{ fileName || 'файл не выбран' }}</span>
          </div>
        </label>
        <div class="flex justify-end pt-2">
          <button class="px-5 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 font-medium">сохранить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/store/useStore'
const store = useStore()

const colors = ['#5a0d2c','#0f2845','#4b3417','#0d3a26','#5a4ca3','#a83c63']
const file = ref(null)
const fileName = ref('')
const form = ref({ title: '', date: '', color: colors[0], image: '' })

function onFile(e){
  const f = e.target.files?.[0]
  if (!f) return
  fileName.value = f.name
  const reader = new FileReader()
  reader.onload = () => form.value.image = reader.result
  reader.readAsDataURL(f)
}

function submit(){
  const { uid, state } = store
  state.widgets.unshift({ id: uid(), ...form.value })
  form.value = { title:'', date:'', color: colors[0], image:'' }
  fileName.value = ''
  emit('close')
}

const emit = defineEmits(['close'])
</script>

<style scoped>
</style>

<script setup name="ColorDot">
</script>