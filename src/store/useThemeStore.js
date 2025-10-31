import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    current: localStorage.getItem('lover_theme') || 'dark',
    themes: {
      dark: {
        name: 'Тёмная',
        bg: '#12001a',
        headerBg: '#1a0024',
        text: '#ffffff',
        textMuted: '#cfc6d9',
        accent: '#ff4b9f',
        border: 'rgba(255, 75, 159, 0.35)',
        cardBg: 'rgba(255,255,255,0.03)',
        glow: 'rgba(255, 75, 159, 0.35)'
      },
      romantic: {
        name: 'Розовая',
        bg: 'linear-gradient(180deg,#ffe6f1,#ffd1e8)',
        headerBg: '#ffd1e8',
        text: '#3a003d',
        textMuted: '#5c2a53',
        accent: '#ff2e87',
        border: 'rgba(255, 46, 135, 0.35)',
        cardBg: 'rgba(0,0,0,0.06)',
        glow: 'rgba(255,46,135,0.35)'
      },
      ocean: {
        name: 'Океан',
        bg: 'linear-gradient(180deg,#0b1221,#0c2744)',
        headerBg: '#0c2744',
        text: '#e9f6ff',
        textMuted: '#b6d3ea',
        accent: '#39b6ff',
        border: 'rgba(57,182,255,0.4)',
        cardBg: 'rgba(255,255,255,0.04)',
        glow: 'rgba(57,182,255,0.35)'
      },
      gold: {
        name: 'Золото',
        bg: 'linear-gradient(180deg,#f7e6b2,#f3d172)',
        headerBg: '#f7e6b2',
        text: '#2a2100',
        textMuted: '#6a5c2b',
        accent: '#d4a017',
        border: 'rgba(212,160,23,0.4)',
        cardBg: 'rgba(0,0,0,0.06)',
        glow: 'rgba(212,160,23,0.35)'
      }
    }
  }),
  actions: {
    setTheme(name) {
      if (!this.themes[name]) return
      this.current = name
      localStorage.setItem('lover_theme', name)
      this.applyTheme()
    },
    applyTheme() {
      const t = this.themes[this.current]
      const r = document.documentElement.style
      r.setProperty('--bg', t.bg)
      r.setProperty('--header-bg', t.headerBg)
      r.setProperty('--text', t.text)
      r.setProperty('--text-muted', t.textMuted)
      r.setProperty('--accent', t.accent)
      r.setProperty('--border', t.border)
      r.setProperty('--card', t.cardBg)
      r.setProperty('--glow', t.glow)
    },
  }
})