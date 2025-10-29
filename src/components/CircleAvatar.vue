<template>
  <div class="relative flex flex-col items-center">
    <!-- сам круг -->
    <div class="relative" :style="{ width: size + 'px', height: size + 'px' }">
      <div class="relative rounded-full overflow-hidden border-4 border-white/10">
        <img
          v-if="modelValue"
          :src="modelValue"
          class="w-full h-full object-cover"
          alt=""
        />
        <div v-else class="w-full h-full bg-[#2a2335]" />
        <div class="absolute inset-0 rounded-full"
             :style="{ boxShadow: glow }" />
      </div>

      <!-- кнопка добавления -->
      <button
        @click="pick"
        class="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3
               w-10 h-10 rounded-full bg-pink-500 grid place-items-center
               text-2xl font-light border-4 border-[#12001a] shadow-lg z-20
               hover:bg-pink-400 transition"
      >
        +
      </button>

      <input
        ref="file"
        type="file"
        accept="image/*"
        class="hidden"
        @change="onFile"
      />
    </div>

    <!-- подпись под кругом -->
    <div class="mt-3 text-base tracking-wide font-medium opacity-90">
      {{ label }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: String,
  label: String,
  size: { type: Number, default: 220 },
});
const emit = defineEmits(["update:modelValue"]);

const file = ref(null);
const glow = computed(() => "0 0 80px 15px rgba(255, 0, 128, 0.18)");

function pick() {
  file.value?.click();
}
function onFile(e) {
  const f = e.target.files?.[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = () => emit("update:modelValue", r.result);
  r.readAsDataURL(f);
}
</script>