<script setup>
import { reactive } from 'vue'
import { useNoteStore } from '../stores/noteStore'
import { useToast } from '../composables/useToast'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['close'])
const noteStore = useNoteStore()
const { showToast } = useToast()

// Estado inicial del formulario con el color Amarillo por defecto
const form = reactive({
  title: '',
  content: '',
  color: 'bg-yellow-500' // Color obligatorio por defecto
})

const resetForm = () => {
  form.title = ''
  form.content = ''
  form.color = 'bg-yellow-500'
}

const handleSubmit = async () => {
  // Validación básica: El título es obligatorio
  if (!form.title.trim()) return

  try {
    await noteStore.addNote(form.title, form.content, form.color)
    showToast("Nota guardada correctamente")
    resetForm()
    emit('close')
  } catch (error) {
    console.error("Error al crear la nota:", error)
    showToast("Error al guardar la nota", "error")
  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div class="bg-bg-dark w-full max-w-lg rounded-2xl p-8 border border-surface shadow-2xl relative">
        
        <button @click="emit('close')" class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6l-12 12M6 6l12 12"/></svg>
        </button>

        <h2 class="text-2xl font-bold text-white mb-6">Nueva Nota</h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-gray-400 text-sm mb-2 font-medium">Título de la nota *:</label>
            <input 
              v-model="form.title"
              type="text" 
              required
              placeholder="Ej. Ideas para el proyecto..."
              class="w-full bg-surface border border-gray-600/30 rounded-lg p-3 text-white focus:ring-2 focus:ring-accent outline-none"
            >
          </div>

          <div>
            <label class="block text-gray-400 text-sm mb-3 font-medium">Color de la nota:</label>
            <div class="flex flex-wrap gap-3">
              <button 
                v-for="color in noteStore.availableColors" 
                :key="color.class"
                type="button"
                @click="form.color = color.class"
                :class="[
                  color.class, 
                  'w-8 h-8 rounded-full border-2 transition-all',
                  form.color === color.class ? 'border-white scale-125 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
                ]"
                :title="color.name"
              ></button>
            </div>
          </div>

          <div>
            <label class="block text-gray-400 text-sm mb-2 font-medium">Contenido / Descripción:</label>
            <textarea 
              v-model="form.content"
              rows="6"
              placeholder="Escribe aquí tus pensamientos..."
              class="w-full bg-surface border border-gray-600/30 rounded-lg p-3 text-white focus:ring-2 focus:ring-accent outline-none resize-none"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
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
              Crear Nota
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>