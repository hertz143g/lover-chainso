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

// при открытии модалки — сразу загружаем текущие данные
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