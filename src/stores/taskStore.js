import { defineStore } from 'pinia'
import { db } from '../database/db'
import { liveQuery } from 'dexie'
import { ref } from 'vue'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([])

  // Función para cargar tareas en tiempo real
  const loadTasks = async () => {
    liveQuery(() => db.tasks.toArray()).subscribe((data) => {
      tasks.value = data
    })
  }

  // Agregar una tarea (Asegúrate de recibir la descripción aquí también)
  const addTask = async (title, dueDate, category, description) => {
    await db.tasks.add({
      title,
      dueDate,
      category,
      description,
      status: 'pending',
      createdAt: new Date()
    })
  }

  // Marcar como "Hecho" o "Pendiente"
  const toggleTask = async (id, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'done' : 'pending'
    await db.tasks.update(id, { status: newStatus })
  }

  // ELIMINAR TAREA
  const deleteTask = async (id) => {
    await db.tasks.delete(id)
    // No hace falta llamar a loadTasks() manualmente porque liveQuery
    // detecta el borrado en la DB y actualiza tasks.value automáticamente.
  }

  // ACTUALIZAR TAREA
  const updateTask = async (id, updatedData) => {
    await db.tasks.update(id, updatedData)
  }

  // IMPORTANTE: Retornar las nuevas funciones aquí
  return { 
    tasks, 
    loadTasks, 
    addTask, 
    toggleTask, 
    deleteTask, 
    updateTask 
  }
})