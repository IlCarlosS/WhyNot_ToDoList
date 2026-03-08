<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { useToast } from '../composables/useToast'
import ModalConfirmation from './ModalConfirmation.vue'
const emit = defineEmits(['edit'])

const props = defineProps({
  task: Object
})

const taskStore = useTaskStore()
const { showToast } = useToast()
const isExpanded = ref(false)
const isMenuOpen = ref(false)
const showConfirmModal = ref(false)

// Mapeo de colores de categorías
const categoryColor = computed(() => {
  const colors = {
    personal: 'bg-blue-400',
    trabajo: 'bg-orange-400',
    importante: 'bg-yellow-400',
    ninguna: 'bg-white'
  }
  return colors[props.task.category] || 'bg-white'
})

const toggleDone = () => {
  taskStore.toggleTask(props.task.id, props.task.status)
}

//modal de confirmación
const handleDeleteClick = () => {
  isMenuOpen.value = false // Cerrar el mini-menú de 3 puntos
  showConfirmModal.value = true
}

//Ejecuta la eliminación real
const confirmDeletion = async () => {
  await taskStore.deleteTask(props.task.id)
  showConfirmModal.value = false
  showToast("Tarea eliminada")
}

const handleEdit = () => {
  isMenuOpen.value = false
  emit('edit', props.task)
  console.log("Editar tarea:", props.task.id)
}
</script>

<template>
  <div class="bg-surface rounded-2xl p-6 shadow-sm border border-gray-700/30 transition-all hover:border-gray-600">
    <div class="flex items-start justify-between">
        <div class="flex items-start space-x-4 min-w-0">
            <div :class="[categoryColor, 'w-4 h-4 rounded-full mt-1.5 shadow-sm']"></div>
            
            <div>
            <h3 :class="['text-xl font-semibold text-white', task.status === 'done' ? 'line-through opacity-50' : '']">
                {{ task.title }}
            </h3>
            <p class="text-gray-400 mt-1 capitalize">{{ task.dueDate || 'Sin fecha' }}</p>
            
            <button 
                @click="isExpanded = !isExpanded"
                class="text-accent text-sm mt-3 font-medium hover:underline flex items-center"
            >
                {{ isExpanded ? 'Ocultar detalles...' : 'Mostrar detalles...' }}
            </button>
            </div>
        </div>

        <div class="relative">
          <button 
            @click="isMenuOpen = !isMenuOpen"
            class="text-gray-500 hover:text-white transition-colors p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
          </button>

          <Transition name="fade">
            <div v-if="isMenuOpen" class="absolute right-0 mt-2 w-40 bg-bg-dark border border-gray-700 rounded-xl shadow-xl z-10 overflow-hidden">
              <button 
                @click="handleEdit"
                class="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-surface hover:text-white flex items-center"
              >
                Modificar
              </button>
              <button 
                @click="handleDeleteClick" 
                class="w-full text-left px-4 py-3 text-sm text-danger hover:bg-danger/10 flex items-center border-t border-gray-700/50"
              >
                Eliminar
              </button>
            </div>
          </Transition>
        </div>

        <ModalConfirmation 
          :show="showConfirmModal"
          title="¿Eliminar tarea?"
          :message="`¿Estás seguro de que quieres borrar '${task.title}'? Esta acción no se puede deshacer.`"
          @confirm="confirmDeletion"
          @cancel="showConfirmModal = false"
        />
    </div>

    <Transition name="expand">
      <div 
          v-if="isExpanded" 
          class="mt-4 pt-4 border-t border-gray-700/50 text-gray-300 leading-relaxed break-words whitespace-pre-wrap"
        >
          {{ task.description || 'Sin descripción adicional.' }}
      </div>
    </Transition>

    <div class="flex justify-end mt-4">
      <button 
        @click="toggleDone"
        :class="[
          'px-6 py-2 rounded-xl font-bold transition-all shadow-md',
          task.status === 'done' 
            ? 'bg-gray-600 text-gray-300 cursor-default' 
            : 'bg-success text-white hover:scale-105 active:scale-95'
        ]"
      >
        {{ task.status === 'done' ? 'Completada' : 'Hecho' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease;
  max-height: 200px;
  overflow: hidden;
}
.expand-enter-from, .expand-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
}
</style>