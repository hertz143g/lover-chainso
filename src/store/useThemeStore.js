// useThemeStore.js
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    current: 'romantic', // тема по умолчанию
    themes: {
      romantic: {
        bg: '#12001a',
        accent: '#ff0080',
        text: '#ffffff',
        shadow: 'rgba(255, 0, 128, 0.4)'
      },
      midnight: {
        bg: '#0b1221',
        accent: '#008cff',
        text: '#e0e7ff',
        shadow: 'rgba(0, 140, 255, 0.4)'
      },
      golden: {
        bg: '#1c0f00',
        accent: '#ffb300',
        text: '#fff6e5',
        shadow: 'rgba(255, 179, 0, 0.4)'
      },
      pastel: {
        bg: '#fff0f5',
        accent: '#ff80ab',
        text: '#3a003a',
        shadow: 'rgba(255, 128, 171, 0.4)'
      },
      crimson: {
        bg: '#2b0000',
        accent: '#ff0033',
        text: '#ffe0e0',
        shadow: 'rgba(255, 0, 51, 0.4)'
      }
    }
  }),
  actions: {
    setTheme(name) {
      if (this.themes[name]) this.current = name
      localStorage.setItem('lover_theme', name)
    },
    loadTheme() {
      const saved = localStorage.getItem('lover_theme')
      if (saved && this.themes[saved]) this.current = saved
    }
  }
})