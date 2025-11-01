// src/store/useThemeStore.js
import { defineStore } from 'pinia'

/**
 * Единые семантические токены (как у Apple):
 *  --bg             фон страницы (может быть цвет/градиент)
 *  --text           основной текст (высокий контраст)
 *  --text-secondary вторичный текст (приглушённый)
 *  --accent         акцент (кнопки, подсветка)
 *  --border         цвет обводок/деликатных линий
 *  --glow           мягкое свечение/тень
 *  --card           стеклянные/плашки под контент
 *  --overlay        полупрозрачная вуаль для выравнивания контраста поверх фото
 *  --header-bg      фон хэдера
 */
export const useThemeStore = defineStore('theme', {
  state: () => ({
    current: localStorage.getItem('lover_theme') || 'dawn', // по умолчанию — как на маковской заставке
    themes: {
      dark: {
        name: 'Тёмная',
        bg: '#12001a',
        headerBg: '#1a0024',
        text: '#ffffff',
        textSecondary: 'rgba(255,255,255,0.65)',
        accent: '#ff3f81',
        border: 'rgba(255,63,129,0.35)',
        glow: 'rgba(255,63,129,0.35)',
        card: 'rgba(255,255,255,0.04)',
        overlay: 'rgba(0,0,0,0.35)',
      },

      romantic: {
        name: 'Розовая',
        bg: 'linear-gradient(180deg,#ffe6f1 0%, #ffd1e8 100%)',
        headerBg: '#ffd1e8',
        text: '#2a0f26',
        textSecondary: 'rgba(42,15,38,0.62)',
        accent: '#ff2e87',
        border: 'rgba(255,46,135,0.28)',
        glow: 'rgba(255,46,135,0.28)',
        card: 'rgba(255,255,255,0.55)',
        overlay: 'rgba(255,255,255,0.18)',
      },

      ocean: {
        name: 'Океан',
        bg: 'linear-gradient(180deg,#0b1221 0%, #0c2744 100%)',
        headerBg: '#0c2744',
        text: '#e9f6ff',
        textSecondary: 'rgba(233,246,255,0.65)',
        accent: '#39b6ff',
        border: 'rgba(57,182,255,0.32)',
        glow: 'rgba(57,182,255,0.28)',
        card: 'rgba(255,255,255,0.05)',
        overlay: 'rgba(0,0,0,0.28)',
      },

      gold: {
        name: 'Золото',
        bg: 'linear-gradient(180deg,#f7e6b2 0%, #f3d172 100%)',
        headerBg: '#f7e6b2',
        text: '#2a2100',
        textSecondary: 'rgba(42,33,0,0.62)',
        accent: '#d4a017',
        border: 'rgba(212,160,23,0.32)',
        glow: 'rgba(212,160,23,0.28)',
        card: 'rgba(255,255,255,0.55)',
        overlay: 'rgba(255,255,255,0.18)',
      },

      // 🌅 как у macOS Dynamic Wallpaper — “от рассвета до заката”
      dawn: {
        name: 'От рассвета до заката',
        bg: 'linear-gradient(180deg,#f4d9b5 0%, #9eb3f4 100%)',
        headerBg: 'rgba(255,255,255,0.55)',
        // ВАЖНО: нейтральный графит как у системных label — читаем на светлом и на сложных участках градиента
        text: '#0e0e0e',
        textSecondary: 'rgba(14,14,14,0.58)',
        // Акцент — “macOS blue”, глубокий, не кислотный
        accent: '#3859d0',
        border: 'rgba(56,89,208,0.28)',
        glow: 'rgba(56,89,208,0.22)',
        // Стеклянные поверхности с хорошей читабельностью
        card: 'rgba(255,255,255,0.55)',
        // Мягкая белая вуаль поверх фотографий/яркого фона — повышает контраст контента
        overlay: 'rgba(255,255,255,0.22)',
      },
    },
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
      if (!t) return
      const r = document.documentElement.style
      r.setProperty('--bg', t.bg)
      r.setProperty('--header-bg', t.headerBg || t.bg)
      r.setProperty('--text', t.text)
      r.setProperty('--text-secondary', t.textSecondary)
      r.setProperty('--accent', t.accent)
      r.setProperty('--border', t.border)
      r.setProperty('--glow', t.glow)
      r.setProperty('--card', t.card)
      r.setProperty('--overlay', t.overlay)
      // на всякий — чтобы сразу перекрасить фон body
      document.body.style.background = t.bg
      document.body.style.color = t.text
    },
  },
})