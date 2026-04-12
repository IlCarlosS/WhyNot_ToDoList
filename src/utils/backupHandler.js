// src/utils/backupHandler.js
import { db } from '../database/db'
import { useToast } from '../composables/useToast'

const { showToast } = useToast()
export const exportAppData = async () => {
  try {
    // 1. Recolectamos todo de IndexedDB
    const tasks = await db.tasks.toArray()
    const notes = await db.notes.toArray()
    
    // 2. Recolectamos lo de localStorage (Configuración)
    const accentColor = localStorage.getItem('accent-color') || '#4F67D8'

    const fullBackup = {
      version: '2.3.0',
      timestamp: new Date().toISOString(),
      data: {
        tasks,
        notes,
        settings: { accentColor }
      }
    }

    // 3. Crear el archivo y descargarlo
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    
    link.href = url
    link.download = `WhyNot_Backup_${new Date().toLocaleDateString()}.json`
    link.click()
    URL.revokeObjectURL(url)
    showToast("Respaldo descargado con éxito", "success")
  } catch (error) {
    console.error("Error al exportar:", error)
    showToast("Error al generar el respaldo", "error")
  }
}

export const importAppData = async (file, stores) => {
  const { taskStore, noteStore, configStore } = stores
  const reader = new FileReader()

  reader.onload = async (e) => {
    try {
      const backup = JSON.parse(e.target.result)
      
      // Validación básica
      if (!backup.data || !backup.data.tasks || !backup.data.notes) {
        throw new Error("Formato de archivo inválido")
      }

      // 1. Limpiar bases de datos actuales
      await db.tasks.clear()
      await db.notes.clear()

      // 2. Insertar nuevos datos
      if (backup.data.tasks.length > 0) await db.tasks.bulkAdd(backup.data.tasks)
      if (backup.data.notes.length > 0) await db.notes.bulkAdd(backup.data.notes)

      // 3. Restaurar configuración (Accent Color)
      if (backup.data.settings?.accentColor) {
        configStore.setAccentColor(backup.data.settings.accentColor)
      }

      // 4. Forzar actualización de los Stores
      // taskStore se actualiza solo gracias a tu liveQuery (¡bien ahí!)
      // noteStore necesita un empujón manual:
      await noteStore.loadNotes()

      showToast("Datos restaurados correctamente", "success")
    } catch (error) {
      console.error("Error al importar:", error)
      showToast("El archivo no es válido", "error")
    }
  }
  reader.readAsText(file)
}