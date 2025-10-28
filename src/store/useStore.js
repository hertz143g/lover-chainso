import { reactive, computed, watch } from 'vue'

const KEY = 'lover_chains_vue_state_v1'

const state = reactive({
  youName: 'ИВАН',
  partnerName: 'КСЕНИЯ',
  youAvatar: '', // base64
  partnerAvatar: '', // base64
  startDate: '2024-05-09', // для блока «вместе уже»
  widgets: [
    // { id, title, date, color, image }
  ],
})

// hydrate
try {
  const raw = localStorage.getItem(KEY)
  if (raw) Object.assign(state, JSON.parse(raw))
} catch (e) {}

// persist
watch(
  state,
  () => localStorage.setItem(KEY, JSON.stringify(state)),
  { deep: true }
)

const daysTogether = computed(() => {
  const start = new Date(state.startDate)
  const ms = Date.now() - start.getTime()
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)))
})

const prettyDuration = computed(() => {
  const start = new Date(state.startDate)
  const now = new Date()
  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()
  if (days < 0) {
    months -= 1
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate()
    days += prevMonth
  }
  if (months < 0) {
    years -= 1
    months += 12
  }
  const parts = []
  if (years > 0) parts.push(`${years} ${decl(years, ['год','года','лет'])}`)
  if (months > 0) parts.push(`${months} ${decl(months, ['месяц','месяца','месяцев'])}`)
  parts.push(`${days} ${decl(days, ['день','дня','дней'])}`)
  return parts.join(' ')
})

function decl(n, forms){
  const mod10 = n % 10, mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return forms[0]
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1]
  return forms[2]
}

function uid(){ return Math.random().toString(36).slice(2) }

export function useStore(){
  return { state, daysTogether, prettyDuration, uid }
}