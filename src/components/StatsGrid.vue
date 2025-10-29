<template>
  <section class="w-full max-w-[430px] mx-auto px-6 mt-8">
    <h2 class="text-[20px] font-extrabold mb-4">Статистика:</h2>
    <div class="grid grid-cols-2 gap-4">
      <template v-for="w in store.state.widgets" :key="w.id">
        <WidgetCard :color="w.color">
          <template #title><span class="text-pink-300 font-bold">{{ d(w.date) }}</span></template>
          <template #subtitle>{{ w.title }}</template>
        </WidgetCard>
      </template>
      <WidgetCard v-if="!store.state.widgets.length" color="#a83c63">
        <template #title><span class="text-pink-300 font-bold">09 мая 2024</span></template>
        <template #subtitle>первое свидание</template>
      </WidgetCard>
      <div class="col-span-2 flex justify-center">
        <button @click="open=true" class="mt-2 px-6 py-3 rounded-full border-2 border-[#5a4ca3] bg-[#2b2250]/60 backdrop-blur text-[16px] tracking-wide hover:bg-[#3a2f6e]/70">добавить виджет</button>
      </div>
    </div>
    <AddWidgetModal v-if="open" @close="open=false" />
  </section>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from '@/store/useStore'
import WidgetCard from './WidgetCard.vue'
import AddWidgetModal from './AddWidgetModal.vue'
const store = useStore(); const open = ref(false)
const d = (iso)=>{ try{ return new Date(iso).toLocaleDateString('ru-RU',{day:'2-digit',month:'long',year:'numeric'}) }catch{return iso} }
</script>
