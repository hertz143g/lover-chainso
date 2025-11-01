<template>
  <section class="max-w-[430px] mx-auto px-6 mt-10">
    <h2 class="text-xl font-semibold mb-4" :style="{ color: 'var(--text)' }">
      Виджеты:
    </h2>

    <!-- сетка -->
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="widget in store.state.widgets"
        :key="widget.id"
        class="rounded-2xl p-4 transition duration-300 hover:scale-[1.02] cursor-pointer backdrop-blur"
        :style="{
          background: 'var(--card)',
          border: `1px solid ${widget.color || 'var(--border)'}`,
          boxShadow: `0 0 15px ${(widget.color || 'var(--accent)')}40`,
          color: 'var(--text)'
        }"
        @click="openEdit(widget)"
      >
        <p class="text-sm mb-2 opacity-80" :style="{ color: widget.color || 'var(--accent)' }">
          {{ widget.date }}
        </p>
        <p class="font-medium" :style="{ color: 'var(--text)' }">
          {{ widget.title }}
        </p>
      </div>
    </div>

    <!-- кнопка добавления -->
    <button
      @click="showAdd = true"
      class="mt-6 w-full rounded-full py-3 font-medium transition active:scale-95"
      :style="{
        border: '1px solid var(--border)',
        background: 'color-mix(in oklab, var(--accent) 20%, transparent)',
        color: 'var(--text)'
      }"
    >
      добавить виджет
    </button>

    <!-- модалки -->
    <AddWidgetModal v-if="showAdd" @close="showAdd = false" />
    <EditWidgetModal v-if="editWidget" :widget="editWidget" @close="editWidget = null" />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/store/useStore'
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
button,
div {
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
</style>