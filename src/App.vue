<template>
  <div class="min-h-screen bg-[#140015] text-white flex flex-col items-center">
    <Header />
    <main class="w-full max-w-[430px] pb-24">
      <CoupleCircles />
      <TogetherBlock />
      <StatsGrid />
    </main>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import CoupleCircles from '@/components/CoupleCircles.vue'
import TogetherBlock from '@/components/TogetherBlock.vue'
import StatsGrid from '@/components/StatsGrid.vue'
</script>