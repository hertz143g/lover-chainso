import { reactive, watch } from 'vue'

const state = reactive({
  name1: '',
  name2: '',
  photo1: '',
  photo2: '',
  startDate: '',     // 🆕 дата начала отношений
  widgets: []        
})

export function useStore() {
  return {
    state,
    setName1: v => state.name1 = v,
    setName2: v => state.name2 = v,
    setPhoto1: v => state.photo1 = v,
    setPhoto2: v => state.photo2 = v,
    setStartDate: v => state.startDate = v,
    addWidget: w => state.widgets.push({ ...w, id: Date.now() }),
    updateWidget(id, data) {
      const i = state.widgets.findIndex(w => w.id === id)
      if (i !== -1) state.widgets[i] = { ...state.widgets[i], ...data }
    },
    deleteWidget(id) {
      const i = state.widgets.findIndex(w => w.id === id)
      if (i !== -1) state.widgets.splice(i, 1)
    }
  }
}

watch(state, val =>
  localStorage.setItem('loverState', JSON.stringify(val)), { deep: true })

const saved = localStorage.getItem('loverState')
if (saved) Object.assign(state, JSON.parse(saved))