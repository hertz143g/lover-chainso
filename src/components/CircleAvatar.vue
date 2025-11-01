<template>
  <div
    class="relative flex flex-col items-center transition-all duration-500 select-none"
    :style="{ color: 'var(--text)' }"
  >
    <!-- 🖼️ Аватар -->
    <div
      class="rounded-full overflow-hidden border-2 flex items-center justify-center backdrop-blur-md shadow-lg transition-all duration-500"
      :style="{
        width: size + 'px',
        height: size + 'px',
        borderColor: 'var(--accent)',
        boxShadow: `0 0 25px var(--glow)`,
        background: image ? 'transparent' : 'var(--card)'
      }"
    >
      <img
        v-if="image"
        :src="image"
        :alt="label"
        class="w-full h-full object-cover rounded-full transition-all duration-300"
      />
      <span
        v-else
        class="text-3xl opacity-70 font-light"
        :style="{ color: 'var(--accent)' }"
      >
        +
      </span>
    </div>

    <!-- 🩷 Имя -->
    <p
      class="mt-3 text-sm font-medium tracking-wide"
      :style="{
        color: 'var(--text)',
        textShadow: `0 0 8px var(--glow)`
      }"
    >
      {{ label }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  image: String,
  label: String,
  size: { type: Number, default: 180 },
  side: String,
})
</script>

<style scoped>
div {
  transition: all 0.4s ease;
}

img:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}
</style>