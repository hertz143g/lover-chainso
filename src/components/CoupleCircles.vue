<template>
  <section class="w-full max-w-[430px] mx-auto mt-6 px-6">
    <div class="relative flex justify-center items-center h-[260px]">
      <!-- левый круг -->
      <div class="absolute left-0 top-6 z-10">
        <CircleAvatar
          v-model="store.state.youAvatar"
          :label="store.state.youName"
          :size="200"
        />
      </div>

      <!-- правый круг -->
      <div class="absolute right-0 bottom-0 z-20">
        <CircleAvatar
          v-model="store.state.partnerAvatar"
          :label="store.state.partnerName"
          :size="200"
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