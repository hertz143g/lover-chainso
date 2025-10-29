<template>
  <section class="w-full max-w-[430px] mx-auto mt-6 px-6">
    <div class="relative flex justify-center items-center h-[260px]">
      <!-- левый круг -->
      <div class="absolute left-2 top-8 z-20">
        <CircleAvatar
          v-model="store.state.youAvatar"
          :label="store.state.youName"
          :size="200"
          side="left"
        />
      </div>

      <!-- правый круг -->
      <div class="absolute right-2 bottom-4 z-10">
        <CircleAvatar
          v-model="store.state.partnerAvatar"
          :label="store.state.partnerName"
          :size="200"
          side="right"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useStore } from "@/store/useStore";
import CircleAvatar from "./CircleAvatar.vue";
const store = useStore();
</script>