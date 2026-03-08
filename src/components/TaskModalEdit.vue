<script setup>
import { reactive, watch } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { useToast } from '../composables/useToast'

const props = defineProps({
  show: Boolean,
  task: Object // La tarea específica a editar
})

const emit = defineEmits(['close'])
const taskStore = useTaskStore()
const { showToast } = useToast()

const form = reactive({
  title: '',
  dueDate: '',
  category: 'ninguna',
  description: ''
})

// Llenamos el formulario en cuanto la prop 'task' llega o cambia
watch(() => props.task, (newTask) => {
  if (newTask) {
    form.title = newTask.title
    form.dueDate = newTask.dueDate || ''
    form.category = newTask.category || 'ninguna'
    form.description = newTask.description || ''
  }
}, { immediate: true })

const handleUpdate = async () => {
  if (!form.title.trim()) return

  // Usamos el update real de Dexie a través del store
  await taskStore.updateTask(props.task.id, { ...form })
  
  showToast("Cambios guardados")
  emit('close')
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div class="bg-bg-dark w-full max-w-md rounded-2xl p-8 border border-surface shadow-2xl relative">
        
        <button @click="emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6l-12 12M6 6l12 12"/></svg>
        </button>

        <h2 class="text-2xl font-bold text-white mb-6">Modificar Tarea</h2>

        <form @submit.prevent="handleUpdate" class="space-y-5">
          <div>
            <label class="block text-gray-400 text-sm mb-2">Título:</label>
            <input v-model="form.title" type="text" required class="w-full bg-surface border border-gray-600/30 rounded-lg p-3 text-white outline-none">
          </div>

          <div>
            <label class="block text-gray-400 text-sm mb-2">Fecha Límite:</label>
            <input v-model="form.dueDate" type="date" class="w-full bg-surface border border-gray-600/30 rounded-lg p-3 text-white outline-none">
          </div>

          <div>
            <label class="block text-gray-400 text-sm mb-2">Categoría:</label>
            <select v-model="form.category" class="w-full bg-surface border border-gray-600/30 rounded-lg p-3 text-white outline-none">
              <option value="ninguna">Sin categoría</option>
              <option value="personal">Personal</option>
              <option value="trabajo">Trabajo</option>
              <option value="importante">Importante</option>
            </select>
          </div>

          <div>
            <label class="block text-gray-400 text-sm mb-2">Descripción:</label>
            <textarea v-model="form.description" rows="4" class="w-full bg-surface border border-gray-600/30 rounded-lg p-3 text-white outline-none resize-none"></textarea>
          </div>

          <div class="flex justify-end space-x-3 mt-8">
            <button type="button" @click="emit('close')" class="px-6 py-2.5 text-gray-300">Cancelar</button>
            <button type="submit" class="px-8 py-2.5 !bg-accent text-white font-bold rounded-lg shadow-lg">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>