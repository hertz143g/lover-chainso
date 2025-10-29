import { reactive, watch } from 'vue'

const state = reactive({
  name1: '',
  name2: '',
  photo1: '',
  photo2: '',
  widgets: [
    { id: 1, date: '09 мая 2024', title: 'Первое свидание', color: '#ec4899' },
    { id: 2, date: '14 фев 2024', title: 'Первый поцелуй', color: '#8b5cf6' },
    { id: 3, date: '01 янв 2024', title: 'День начала отношений', color: '#06b6d4' }
  ]
})

let idCounter = 4

function addWidget(widget) {
  state.widgets.push({ ...widget, id: idCounter++ })
}
function updateWidget(id, newData) {
  const i = state.widgets.findIndex(w => w.id === id)
  if (i !== -1) state.widgets[i] = { ...state.widgets[i], ...newData }
}
function deleteWidget(id) {
  const idx = state.widgets.findIndex(w => w.id === id)
  if (idx !== -1) state.widgets.splice(idx, 1)
}

export function useStore() {
  return {
    state,
    addWidget,
    updateWidget,
    deleteWidget,
    // имена/фото как прежде
    setName1: v => state.name1 = v,
    setName2: v => state.name2 = v,
    setPhoto1: v => state.photo1 = v,
    setPhoto2: v => state.photo2 = v,
  }
}

watch(state, val =>
  localStorage.setItem('loverState', JSON.stringify(val)), { deep: true })

const saved = localStorage.getItem('loverState')
if (saved) Object.assign(state, JSON.parse(saved))