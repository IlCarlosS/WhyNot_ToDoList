//noteStore.js
import { defineStore } from 'pinia'
import { db } from '../database/db' // Usamos la misma DB de Dexie

export const useNoteStore = defineStore('noteStore', {
  state: () => ({
    notes: [],
    // Definimos los 7 colores de tu UI
    availableColors: [
      { name: 'Azul', class: 'bg-blue-500' },
      { name: 'Verde', class: 'bg-green-500' },
      { name: 'Amarillo', class: 'bg-yellow-500' },
      { name: 'Rojo', class: 'bg-red-500' },
      { name: 'Morado', class: 'bg-purple-500' },
      { name: 'Rosa', class: 'bg-pink-500' },
      { name: 'Gris', class: 'bg-gray-500' }
    ]
  }),
  actions: {
    async loadNotes() {
      this.notes = await db.notes.toArray()
    },
    async addNote(title, content, color) {
      const newNote = {
        title,
        content,
        color: color || 'bg-blue-500',
        createdAt: new Date()
      }
      const id = await db.notes.add(newNote)
      this.notes.push({ id, ...newNote })
    },
    async updateNote(id, changes) {
      await db.notes.update(id, changes)
      const index = this.notes.findIndex(n => n.id === id)
      if (index !== -1) this.notes[index] = { ...this.notes[index], ...changes }
    },
    async deleteNote(id) {
      await db.notes.delete(id)
      this.notes = this.notes.filter(n => n.id !== id)
    }
  }
})