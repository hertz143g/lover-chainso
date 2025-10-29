import { reactive, readonly } from 'vue'

const state = reactive({
  name1: '',
  name2: '',
  photo1: '',
  photo2: '',
  bgImage: ''
})

// при загрузке подставляем сохранённое состояние
const saved = localStorage.getItem('lover_chains_vue_state_v2')
if (saved) {
  try {
    Object.assign(state, JSON.parse(saved))
  } catch (e) {
    console.error('Ошибка чтения сохранённых данных', e)
  }
}

function setName1(v) {
  state.name1 = v
  save()
}
function setName2(v) {
  state.name2 = v
  save()
}
function setPhoto1(v) {
  state.photo1 = v
  save()
}
function setPhoto2(v) {
  state.photo2 = v
  save()
}
function setBgImage(v) {
  state.bgImage = v
  save()
}

function save() {
  localStorage.setItem('lover_chains_vue_state_v2', JSON.stringify(state))
}

export function useStore() {
  return {
    state: readonly(state),
    setName1,
    setName2,
    setPhoto1,
    setPhoto2,
    setBgImage
  }
}