import { reactive, watch } from 'vue'

const state = reactive({
  name1: '',
  name2: '',
  photo1: '',
  photo2: '',
  widgets: [
    { date: '09 мая 2024', title: 'Первое свидание' },
    { date: '14 фев 2024', title: 'Первый поцелуй' }
  ]
})

export function useStore() {
  function setName1(name) { state.name1 = name }
  function setName2(name) { state.name2 = name }
  function setPhoto1(photo) { state.photo1 = photo }
  function setPhoto2(photo) { state.photo2 = photo }
  function addWidget(widget) { state.widgets.push(widget) }

  return { state, setName1, setName2, setPhoto1, setPhoto2, addWidget }
}

// 💾 сохраняем в localStorage
watch(
  () => state,
  () => localStorage.setItem('loverState', JSON.stringify(state)),
  { deep: true }
)

const saved = localStorage.getItem('loverState')
if (saved) Object.assign(state, JSON.parse(saved))