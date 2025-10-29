<template>
  <div class="min-h-screen bg-[#12001a] text-white">
    <div class="mx-auto w-full max-w-[430px] min-h-screen pb-24">
      <Header @open-settings="showSettings = true" />
      <CoupleCircles />
      <TogetherBlock />
      <StatsGrid />
    </div>

    <!-- тут исправлено 👇 -->
    <SettingsModal :show="showSettings" @close="showSettings = false" />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import CoupleCircles from '@/components/CoupleCircles.vue'
import TogetherBlock from '@/components/TogetherBlock.vue'
import StatsGrid from '@/components/StatsGrid.vue'
import SettingsModal from '@/components/SettingsModal.vue'
import { ref } from 'vue'

const showSettings = ref(false)
</script>