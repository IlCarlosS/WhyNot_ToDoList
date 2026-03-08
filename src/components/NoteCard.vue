<script setup>
import { ref } from 'vue'
import { useNoteStore } from '../stores/noteStore'
import { useToast } from '../composables/useToast'
import ModalConfirmation from './ModalConfirmation.vue'

const props = defineProps({
  note: Object
})

const isExpanded = ref(false)
const emit = defineEmits(['edit'])
const noteStore = useNoteStore()
const { showToast } = useToast()

const isMenuOpen = ref(false)
const showConfirmModal = ref(false)

const handleDeleteClick = () => {
  isMenuOpen.value = false
  showConfirmModal.value = true
}

const confirmDeletion = async () => {
  await noteStore.deleteNote(props.note.id)
  showConfirmModal.value = false
  showToast("Nota eliminada")
}

const handleEdit = () => {
  isMenuOpen.value = false
  emit('edit', props.note)
}
</script>

<template>
  <div class="bg-surface rounded-2xl overflow-hidden shadow-md border border-gray-700/30 flex flex-col h-full hover:border-gray-600 transition-all group">
    <div :class="[note.color, 'h-3 w-full flex-shrink-0']"></div>

    <div class="p-5 flex flex-col flex-1 relative">
      <div class="absolute top-4 right-4">
        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="text-gray-500 hover:text-white transition-colors p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>

        <Transition name="fade">
          <div v-if="isMenuOpen" class="absolute right-0 mt-2 w-36 bg-bg-dark border border-gray-700 rounded-xl shadow-xl z-20 overflow-hidden">
            <button @click="handleEdit" class="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-surface hover:text-white">
              Modificar
            </button>
            <button @click="handleDeleteClick" class="w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger/10 border-t border-gray-700/50">
              Eliminar
            </button>
          </div>
        </Transition>
      </div>

      <h3 class="text-xl font-bold text-white mb-3 pr-8 break-words line-clamp-2">
        {{ note.title }}
      </h3>

      <div 
        :class="[
          'text-gray-400 text-sm leading-relaxed break-words whitespace-pre-wrap flex-1 custom-scrollbar',
          isExpanded ? 'max-h-60 overflow-y-auto pr-2' : 'line-clamp-4'
        ]"
      >
        {{ note.content || 'Sin descripción adicional.' }}
      </div>

      <button 
        @click="isExpanded = !isExpanded"
        class="text-accent text-xs font-semibold mt-4 hover:underline text-left w-fit"
      >
        {{ isExpanded ? 'Ver menos' : 'Ver detalles...' }}
      </button>
    </div>

    <ModalConfirmation 
      :show="showConfirmModal"
      title="¿Eliminar nota?"
      :message="`¿Borrar '${note.title}'?`"
      @confirm="confirmDeletion"
      @cancel="showConfirmModal = false"
    />
  </div>
</template>

<style scoped>
/* Estilos para el truncado */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

/* Scrollbar personalizado para que no rompa la estética oscura */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #4b5563; /* Gray-600 */
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #6b7280; /* Gray-500 */
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>