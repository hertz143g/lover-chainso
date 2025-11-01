<template>
  <section class="max-w-[430px] mx-auto px-6 mt-10">
    <h2 class="text-xl font-semibold mb-4" :style="{ color: 'var(--text)' }">
      Виджеты:
    </h2>

    <!-- 🪄 Сетка -->
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="widget in store.state.widgets"
        :key="widget.id"
        class="rounded-2xl p-4 transition-all duration-400 backdrop-blur-md cursor-pointer"
        :style="{
          background: 'var(--card)',
          border: `1.5px solid ${widget.color || 'var(--border)'}`,
          boxShadow: `0 0 25px ${widget.color || 'var(--glow)'}55`
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

    <!-- ➕ Добавить виджет -->
    <button
      @click="showAdd = true"
      class="mt-6 w-full rounded-full py-3 transition-all duration-300 active:scale-95"
      :style="{
        background: 'var(--card)',
        border: '1.5px solid var(--border)',
        color: 'var(--text)',
        boxShadow: '0 0 15px var(--glow)'
      }"
    >
      добавить виджет
    </button>

    <!-- Модалки -->
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
section {
  transition: background 0.4s ease, color 0.4s ease;
}

button:hover {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 0 30px var(--accent);
}
</style>