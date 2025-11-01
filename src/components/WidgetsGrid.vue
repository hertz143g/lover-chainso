<template>
  <section class="max-w-[430px] mx-auto px-6 mt-12">
    <h2 class="text-lg font-semibold mb-4" :style="{ color: 'var(--text)' }">
      Виджеты
    </h2>

    <!-- сетка -->
    <div class="grid grid-cols-2 gap-4">
      <WidgetCard
        v-for="widget in store.state.widgets"
        :key="widget.id"
        :title="widget.title"
        :date="widget.date"
        :color="widget.color"
        @click="openEdit(widget)"
      />
    </div>

    <!-- добавить -->
    <button
      @click="showAdd = true"
      class="mt-6 w-full rounded-full py-3 font-semibold transition-all duration-300 active:scale-95 backdrop-blur-lg"
      :style="{
        background: 'color-mix(in oklab, var(--accent) 25%, transparent)',
        border: '1px solid var(--border)',
        color: 'var(--text)',
        boxShadow: '0 0 20px var(--glow)'
      }"
    >
      + добавить виджет
    </button>

    <!-- модалки -->
    <AddWidgetModal v-if="showAdd" @close="showAdd = false" />
    <EditWidgetModal v-if="editWidget" :widget="editWidget" @close="editWidget = null" />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/store/useStore'
import WidgetCard from './WidgetCard.vue'
import AddWidgetModal from './AddWidgetModal.vue'
import EditWidgetModal from './EditWidgetModal.vue'

const store = useStore()
const showAdd = ref(false)
const editWidget = ref(null)

function openEdit(widget) {
  editWidget.value = { ...widget }
}
</script>

<style scoped>
section {
  font-family: "Open Sans", sans-serif;
}

button {
  backdrop-filter: blur(20px);
}
</style>