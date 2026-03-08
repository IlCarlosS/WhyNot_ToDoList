import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    accentColor: localStorage.getItem('accent-color') || '#4F67D8',
    language: 'es'
  }),
  actions: {
    setAccentColor(color) {
      this.accentColor = color
      localStorage.setItem('accent-color', color)
      // Cambiamos la variable "fuente"
      document.documentElement.style.setProperty('--app-accent-color', color)
    },
    init() {
      const savedColor = localStorage.getItem('accent-color')
      if (savedColor) {
        this.accentColor = savedColor
        document.documentElement.style.setProperty('--app-accent-color', savedColor)
      }
    }
  }
})