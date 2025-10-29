<template>
  <section class="max-w-[430px] mx-auto px-6 mt-10">
    <h2 class="text-xl font-semibold mb-4">Виджеты:</h2>

    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="(widget, index) in store.state.widgets"
        :key="index"
        class="rounded-2xl p-4 bg-white/5 border transition duration-300 hover:scale-[1.02]"
        :style="{
          borderColor: widget.color + '55',
          boxShadow: `0 0 15px ${widget.color}40`
        }"
      >
        <p class="text-sm mb-2" :style="{ color: widget.color }">
          {{ widget.date }}
        </p>
        <p class="font-medium text-white">{{ widget.title }}</p>
      </div>
    </div>

    <button
      @click="showAdd = true"
      class="mt-6 w-full rounded-full border border-violet-400/50 bg-violet-900/30 py-3 hover:bg-violet-700/40 transition"
    >
      добавить виджет
    </button>

    <AddWidgetModal v-if="showAdd" @close="showAdd = false" />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/store/useStore'
import AddWidgetModal from './AddWidgetModal.vue'

const store = useStore()
const showAdd = ref(false)
</script>