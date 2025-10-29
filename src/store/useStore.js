import { reactive } from 'vue'

const state = reactive({
  name1: '',
  name2: '',
  photo1: '',
  photo2: '',
  bgImage: ''
})

// при загрузке — подтягиваем из localStorage
const saved = localStorage.getItem('lover_chains_vue_state_v2')
if (saved) {
  Object.assign(state, JSON.parse(saved))
}

export function useStore() {
  return { state }
}