<template>
  <section class="w-full max-w-[430px] px-6 mt-2">
    <h2 class="text-2xl font-extrabold mb-3">Вместе уже:</h2>
    <div class="rounded-[28px] border-2 border-[#6a2b73] bg-[#1a0a1d]/80 backdrop-blur p-5">
      <div class="text-xl opacity-90">{{ store.prettyDuration }}</div>
      <div class="mt-24 text-right text-2xl font-bold opacity-90">{{ store.daysTogether }} дней</div>
      <button @click="openDate = true" class="absolute -right-2 -top-2 w-10 h-10 rounded-full bg-white text-black grid place-items-center text-xl">+</button>
    </div>

    <!-- модалка выбора даты старта -->
    <transition name="fade">
      <div v-if="openDate" class="fixed inset-0 bg-black/60 grid place-items-center p-6 z-50" @click.self="openDate=false">
        <div class="w-full max-w-sm rounded-2xl bg-[#1a0a1d] border border-white/10 p-5">
          <div class="text-lg font-semibold mb-3">Дата начала отношений</div>
          <input type="date" v-model="store.state.startDate" class="w-full bg-transparent border border-white/20 rounded-xl px-3 py-2" />
          <div class="flex justify-end mt-4">
            <button @click="openDate=false" class="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25">Готово</button>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/store/useStore'
const store = useStore()
const openDate = ref(false)
</script>

<style scoped>
.fade-enter-active,.fade-leave-active{ transition: opacity .2s ease }
.fade-enter-from,.fade-leave-to{ opacity:0 }
</style>