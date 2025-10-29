import { reactive, watch } from 'vue'

const state = reactive({
  name1: '',
  name2: '',
  photo1: '',
  photo2: '',
  bgImage: ''
})

// Загружаем сохранённые данные из localStorage
const saved = localStorage.getItem('lover_chains_vue_state_v2')
if (saved) {
  try {
    Object.assign(state, JSON.parse(saved))
  } catch (e) {
    console.error('Ошибка при чтении данных из localStorage', e)
  }
}

// ✅ Автоматическое сохранение всех изменений
watch(
  state,
  (newState) => {
    localStorage.setItem('lover_chains_vue_state_v2', JSON.stringify(newState))
  },
  { deep: true }
)

// ✅ Методы управления состоянием
function setName1(v) {
  state.name1 = v
}
function setName2(v) {
  state.name2 = v
}
function setPhoto1(v) {
  state.photo1 = v
}
function setPhoto2(v) {
  state.photo2 = v
}
function setBgImage(v) {
  state.bgImage = v
}

export function useStore() {
  return {
    state,
    setName1,
    setName2,
    setPhoto1,
    setPhoto2,
    setBgImage,
  }
}