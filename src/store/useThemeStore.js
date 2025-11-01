import { defineStore } from 'pinia'
import { watch } from 'vue'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    current: 'dark',
    themes: {
      dark: {
        bg: '#12001a',
        text: '#ffffff',
        accent: '#ff4b9f',
        header: '#1a001f'
      },
      romantic: {
        bg: 'linear-gradient(180deg, #ffe6f0, #ffcce5)',
        text: '#4a0033',
        accent: '#ff5ea0',
        header: '#ffbcd9'
      },
      gold: {
        bg: 'linear-gradient(180deg, #f7e6b2, #f9d56e)',
        text: '#4a3000',
        accent: '#d4a017',
        header: '#f7e6b2'
      },
      ocean: {
        bg: 'linear-gradient(180deg, #002233, #004466)',
        text: '#e0f8ff',
        accent: '#33ccff',
        header: '#003344'
      },
    }
  }),

  actions: {
    setTheme(name) {
      if (this.themes[name]) {
        this.current = name
        this.applyTheme()
      }
    },
    applyTheme() {
      const t = this.themes[this.current]
      document.documentElement.style.setProperty('--bg', t.bg)
      document.documentElement.style.setProperty('--text', t.text)
      document.documentElement.style.setProperty('--accent', t.accent)
      document.documentElement.style.setProperty('--header', t.header)
      localStorage.setItem('lover_theme', this.current)
    }
  }
})

// Автоматическое применение при загрузке
watch(
  () => useThemeStore().current,
  () => useThemeStore().applyTheme(),
  { immediate: true }
)