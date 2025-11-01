// src/store/useThemeStore.js
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    current: 'romantic',
    themes: {
      romantic: { bg: '#12001a', accent: '#ff0080', text: '#ffffff' },
      midnight: { bg: '#0b1221', accent: '#00aaff', text: '#e0e7ff' },
      golden: { bg: '#1c0f00', accent: '#ffb300', text: '#fff6e5' },
      pastel: { bg: '#fff0f5', accent: '#ff80ab', text: '#3a003a' },
      crimson: { bg: '#2b0000', accent: '#ff0033', text: '#ffe0e0' }
    }
  }),
  actions: {
    setTheme(name) {
      if (this.themes[name]) {
        this.current = name
        localStorage.setItem('lover_theme', name)
      }
    },
    loadTheme() {
      const saved = localStorage.getItem('lover_theme')
      if (saved && this.themes[saved]) this.current = saved
    }
  }
})