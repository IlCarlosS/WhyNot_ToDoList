<script setup>
import { reactive } from 'vue' // Quitamos watch porque ya no lo necesitamos
import { useTaskStore } from '../stores/taskStore'
import { useToast } from '../composables/useToast'

const props = defineProps({
  show: Boolean
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

const resetForm = () => {
  form.title = ''
  form.dueDate = ''
  form.category = 'ninguna'
  form.description = ''
}

const handleSubmit = async () => {
  if (!form.title.trim()) return

  // AQUÍ SOLO CREAMOS
  await taskStore.addTask(form.title, form.dueDate, form.category, form.description)
  showToast("Tarea creada con éxito")
  
  resetForm() // Limpiamos para la próxima
  emit('close')
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div class="bg-bg-dark w-full max-w-md rounded-2xl p-8 shadow-2xl border border-surface relative">
        <button @click="emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6l-12 12M6 6l12 12"/></svg>
        </button>
        <h2 class="text-2xl font-bold text-white mb-6">Nueva Tarea</h2>
        <form @submit.prevent="handleSubmit" class="space-y-5">

          <div>
            <label class="block text-gray-400 text-sm mb-2 font-medium">Titulo de tarea *:</label>
            <input
              v-model="form.title"
              type="text"
              required
              class="w-full bg-surface border border-gray-600/30 rounded-lg p-3 text-white focus:ring-2 focus:ring-accent outline-none transition-all"
            >
          </div>

          <div>
            <label class="block text-gray-400 text-sm mb-2 font-medium">Fecha Limite:</label>
            <input
              v-model="form.dueDate"
              type="date"
              class="w-full bg-surface border border-gray-600/30 rounded-lg p-3 text-white focus:ring-2 focus:ring-accent outline-none appearance-none"
            >
          </div>

          <div>
            <label class="block text-gray-400 text-sm mb-2 font-medium">Categoria:</label>
            <select
              v-model="form.category"
              class="w-full bg-surface border border-gray-600/30 rounded-lg p-3 text-white focus:ring-2 focus:ring-accent outline-none cursor-pointer"
            >
              <option value="ninguna">Sin categoría</option>
              <option value="personal">Personal</option>
              <option value="trabajo">Trabajo</option>
              <option value="importante">Importante</option>
            </select>
          </div>

          <div>
            <label class="block text-gray-400 text-sm mb-2 font-medium">Descripción</label>
            <textarea
              v-model="form.description"
              rows="4"
              class="w-full bg-surface border border-gray-600/30 rounded-lg p-3 text-white focus:ring-2 focus:ring-accent outline-none resize-none"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 mt-8">
            <button
              type="button"
              @click="emit('close')"
              class="px-6 py-2.5 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              class="px-8 py-2.5 rounded-lg !bg-accent text-white font-semibold hover:!bg-accent/80 transition-all shadow-lg shadow-accent/20"
            >
              Crear Tarea
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Estilizar el input de fecha en navegadores oscuros */
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
}
</style>