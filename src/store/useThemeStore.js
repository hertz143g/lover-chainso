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
        bg: 'linear-gradient(to bottom, #f6d3a3 0%, #a0b6f9 100%)',
        text: '#1a1a1a',
        accent: '#3d66d9',
        border: '#3d66d940',
        glow: 'rgba(61,102,217,0.4)',
        card: 'rgba(255,255,255,0.3)'
      },
      // 🌅 авто-тема (меняется по московскому времени)
      auto: {
        bg: '', text: '', accent: '', border: '', glow: '', card: ''
      }
    }
  }),

  actions: {
    setTheme(name) {
      this.current = name
      localStorage.setItem('lover_theme', name)
      this.applyTheme()
      if (name === 'auto') this.applyTimeBasedTheme()
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
    },

    // ⏰ логика "от рассвета до заката"
    applyTimeBasedTheme() {
      const now = new Date()
      const moscowTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Moscow' }))
      const hour = moscowTime.getHours()

      let bg, text, accent, border, glow, card

      if (hour >= 5 && hour < 10) { // рассвет
        bg = 'linear-gradient(180deg, #FFD6A5 0%, #FFB5C2 100%)'
        text = '#2B1B25'
        accent = '#FF5F87'
        border = '#FFD1E3'
        glow = 'rgba(255,95,135,0.3)'
        card = 'rgba(255,255,255,0.4)'
      } else if (hour >= 10 && hour < 17) { // день
        bg = 'linear-gradient(180deg, #FDFBFB 0%, #EBEDEE 100%)'
        text = '#1F1F1F'
        accent = '#FF4B9F'
        border = '#FFD1E3'
        glow = 'rgba(255,75,159,0.3)'
        card = 'rgba(255,255,255,0.4)'
      } else if (hour >= 17 && hour < 21) { // вечер
        bg = 'linear-gradient(180deg, #FFC3A0 0%, #FFAFBD 100%)'
        text = '#2E0F24'
        accent = '#FF4B9F'
        border = '#EAC1D8'
        glow = 'rgba(255,75,159,0.3)'
        card = 'rgba(255,255,255,0.3)'
      } else { // ночь
        bg = 'linear-gradient(180deg, #0F051E 0%, #180020 100%)'
        text = '#F5E8F5'
        accent = '#C87BFF'
        border = '#402056'
        glow = 'rgba(200,123,255,0.4)'
        card = 'rgba(20,10,30,0.7)'
      }

      this.themes.auto = { bg, text, accent, border, glow, card }

      if (this.current === 'auto') this.applyTheme()
    }
  }
})

// обновление каждые 15 минут (если выбрана авто-тема)
setInterval(() => {
  if (localStorage.getItem('lover_theme') === 'auto') {
    const store = useThemeStore()
    store.applyTimeBasedTheme()
  }
}, 15 * 60 * 1000)

// применяем авто-тему при запуске, если выбрана
if (localStorage.getItem('lover_theme') === 'auto') {
  const store = useThemeStore()
  store.applyTimeBasedTheme()
}