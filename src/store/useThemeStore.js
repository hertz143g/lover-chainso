import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    current: localStorage.getItem('lover_theme') || 'dark',
    themes: {
      dark: {
        bg: '#12001a',
        text: '#ffffff',
        accent: '#ff3f81',
        border: '#ff3f8140',
        glow: 'rgba(255,63,129,0.4)',
        card: '#1a002080'
      },
      light: {
        bg: '#fff4fa',
        text: '#2b002d',
        accent: '#d14b89',
        border: '#d14b8940',
        glow: 'rgba(209,75,137,0.4)',
        card: '#ffffff90'
      },
      dawn: {
        // 🌅 новая — как macOS "от рассвета до заката"
        bg: 'linear-gradient(to bottom, #f6d3a3 0%, #a0b6f9 100%)',
        text: '#1a1a1a',
        accent: '#3d66d9',
        border: '#3d66d940',
        glow: 'rgba(61,102,217,0.4)',
        card: 'rgba(255,255,255,0.3)'
      }
    }
  }),

  actions: {
    setTheme(name) {
      this.current = name
      localStorage.setItem('lover_theme', name)
      this.applyTheme()
    },

    applyTheme() {
      const theme = this.themes[this.current]
      if (!theme) return
      const root = document.documentElement
      root.style.setProperty('--bg', theme.bg)
      root.style.setProperty('--text', theme.text)
      root.style.setProperty('--accent', theme.accent)
      root.style.setProperty('--border', theme.border)
      root.style.setProperty('--glow', theme.glow)
      root.style.setProperty('--card', theme.card)
      document.body.style.background = theme.bg
      document.body.style.color = theme.text
    }
  }
})