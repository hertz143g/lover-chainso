<template>
  <header
    class="w-full max-w-[430px] mx-auto px-6 pt-6 pb-2 flex items-center justify-between select-none z-50 relative"
  >
    <button class="text-[13px] opacity-75 hover:opacity-100">магазин</button>

    <h1 class="text-[22px] font-extrabold tracking-tight">
      <span class="text-pink-400">LOVER</span> CHAINSO
    </h1>

    <!-- 👇 вот эта кнопка -->
    <button
      class="text-[13px] opacity-75 hover:opacity-100"
      @click="$emit('open-settings')"
    >
      настройки
    </button>
  </header>
</template>