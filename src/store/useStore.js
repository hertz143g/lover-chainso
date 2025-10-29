import { reactive, computed, watch } from 'vue'
const KEY = 'lover_chains_vue_state_v2'

const state = reactive({
  youName: 'ИВАН',
  partnerName: 'КСЕНИЯ',
  youAvatar: '',
  partnerAvatar: '',
  startDate: '2024-05-09',
  widgets: []
})

try { const raw = localStorage.getItem(KEY); if (raw) Object.assign(state, JSON.parse(raw)) } catch {}
watch(state, () => localStorage.setItem(KEY, JSON.stringify(state)), {deep:true})

const daysTogether = computed(() => {
  const start = new Date(state.startDate); const ms = Date.now() - start.getTime();
  return Math.max(0, Math.floor(ms/86400000));
})

const prettyDuration = computed(() => {
  const s = new Date(state.startDate), n = new Date();
  let y = n.getFullYear()-s.getFullYear(); let m=n.getMonth()-s.getMonth(); let d=n.getDate()-s.getDate();
  if (d<0){ m--; d += new Date(n.getFullYear(), n.getMonth(), 0).getDate() }
  if (m<0){ y--; m+=12 }
  const f=(n,[a,b,c])=>{const t=n%10,u=n%100;return t===1&&u!==11?a:t>1&&t<5&&(u<10||u>20)?b:c}
  const parts=[]; if(y>0) parts.push(`${y} ${f(y,['год','года','лет'])}`); if(m>0) parts.push(`${m} ${f(m,['месяц','месяца','месяцев'])}`); parts.push(`${d} ${f(d,['день','дня','дней'])}`)
  return parts.join(' ')
})

const uid = () => Math.random().toString(36).slice(2)
export function useStore(){ return { state, daysTogether, prettyDuration, uid } }