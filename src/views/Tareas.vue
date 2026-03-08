<template>
  <div class="max-w-5xl mx-auto p-6">
    <div class="flex justify-between items-center mb-10">
      <div>
        <h2 class="text-3xl font-bold text-bg-dark">Mis Tareas</h2>
        <p class="text-gray-500">Organiza tu día, un paso a la vez.</p>
      </div>
      
      <button 
        @click="openNewTaskModal"
        
        class="!bg-accent text-white px-6 py-3 rounded-custom font-semibold flex items-center hover:scale-105 transition-transform shadow-lg shadow-accent/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        Nueva Tarea
      </button>
    </div>

    <div class="relative mb-6">
      <input 
        v-model="search"
        type="text" 
        placeholder="Buscar tarea por título..." 
        class="w-full bg-white border-none p-4 pl-12 rounded-custom shadow-sm focus:ring-2 focus:ring-accent outline-none text-lg"
      >
      <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-4.5 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-4 mb-10">
      
      <div class="flex flex-wrap items-center gap-4">
        <div class="relative">
          <select 
            v-model="selectedCategory"
            class="appearance-none bg-white pl-10 pr-10 py-2.5 rounded-custom shadow-sm text-gray-600 focus:ring-2 focus:ring-accent outline-none cursor-pointer"
          >
            <option value="all">Todas las categorías</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
          <div class="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-gray-200" 
               :class="categories.find(c => c.id === selectedCategory)?.color || 'bg-gray-400'">
          </div>
        </div>

        <select 
          v-model="sortBy"
          class="bg-white px-4 py-2.5 rounded-custom shadow-sm text-gray-600 focus:ring-2 focus:ring-accent outline-none cursor-pointer"
        >
          <option value="date">Ordenar por: Fecha</option>
          <option value="az">Ordenar por: A → Z</option>
          <option value="za">Ordenar por: Z → A</option>
        </select>
      </div>

      <div class="flex bg-gray-200/50 p-1 rounded-xl">
        <button 
          @click="statusFilter = 'all'"
          :class="statusFilter === 'all' ? 'bg-white text-accent shadow-sm' : 'text-gray-500'"
          class="px-6 py-2 rounded-custom transition-all font-medium text-sm"
        >
          Todas
        </button>
        <button 
          @click="statusFilter = 'pending'"
          :class="statusFilter === 'pending' ? 'bg-white text-accent shadow-sm' : 'text-gray-500'"
          class="px-6 py-2 rounded-custom transition-all font-medium text-sm"
        >
          Pendientes
        </button>
      </div>
    </div>

    <div 
      v-if="taskStore.tasks.length === 0" 
      class="flex flex-col items-center justify-center py-20 text-center animate-fade-in"
    >
      <div class="w-48 h-48 mb-8 opacity-40">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full text-gray-400">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4"/><path d="M21 5h-4"/>
        </svg>
      </div>
      <h3 class="text-2xl font-semibold text-gray-700 mb-2">Momento de calma...</h3>
      <p class="text-gray-500 max-w-xs mx-auto">
        No tienes tareas pendientes. Aprovecha para descansar o planifica algo nuevo con el botón de arriba.
      </p>
    </div>

    <div v-else class="grid grid-cols-1 gap-4"></div>

    <div class="max-w-5xl mx-auto p-6">
      <div v-if="taskStore.tasks.length > 0" class="space-y-4">
        <TaskCard 
          v-for="task in filteredTasks" 
          :key="task.id" 
          :task="task" 
          @edit="openEditModal"
        />
      </div>

      <div v-else class="flex flex-col items-center justify-center py-20 ...">
        </div>
      <!-- <TaskModal 
        :show="showModal" 
        :task-to-edit="selectedTask"
        @close="handleCloseModal" /> -->
        <!-- Modal -->
      <TaskModal :show="showModal" @close="showModal = false" />
      <TaskModalEdit 
        :show="showEditModal" 
        :task="selectedTask" 
        @close="showEditModal = false" 
        />  
    </div>
  </div>


</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import TaskModal from '../components/TaskModal.vue'
import TaskModalEdit from '../components/TaskModalEdit.vue'
import TaskCard from '../components/TaskCard.vue'
const taskStore = useTaskStore()
const showModal = ref(false)
const showEditModal = ref(false)
const selectedTask = ref(null)

onMounted(() => {
  taskStore.loadTasks() // Cargar tareas al entrar
})

// Estados para los filtros
const search = ref('')
const selectedCategory = ref('all')
const sortBy = ref('date')
const statusFilter = ref('all')

// Definición de colores para las categorías
const categories = [
  { id: 'personal', name: 'Personal', color: 'bg-blue-400' },
  { id: 'trabajo', name: 'Trabajo', color: 'bg-orange-400' },
  { id: 'importante', name: 'Importante', color: 'bg-yellow-400' },
  { id: 'ninguna', name: 'Sin categoría', color: 'bg-white border border-gray-300' },
]

const openNewTaskModal = () => {
  showModal.value = true
}

//editar tarea
const openEditModal = (task) => {
  // Ahora selectedTask ya existe y no dará error
  selectedTask.value = { ...task } 
  showEditModal.value = true
}

// LA LÓGICA DE FILTRADO Y ORDENADO
const filteredTasks = computed(() => {
  // 1. Empezamos con todas las tareas del store
  let tasks = [...taskStore.tasks]

  // 2. Filtro por Búsqueda (Texto)
  if (search.value.trim()) {
    const query = search.value.toLowerCase()
    tasks = tasks.filter(t => t.title.toLowerCase().includes(query))
  }

  // 3. Filtro por Categoría
  if (selectedCategory.value !== 'all') {
    tasks = tasks.filter(t => t.category === selectedCategory.value)
  }

  // 4. Filtro por Estado (Todas / Pendientes)
  if (statusFilter.value === 'pending') {
    tasks = tasks.filter(t => t.status === 'pending')
  }

  // 5. Ordenamiento
  tasks.sort((a, b) => {
    if (sortBy.value === 'az') {
      return a.title.localeCompare(b.title)
    } else if (sortBy.value === 'za') {
      return b.title.localeCompare(a.title)
    } else if (sortBy.value === 'date') {
      // Ordenar por fecha (las que no tienen fecha van al final)
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return new Date(a.dueDate) - new Date(b.dueDate)
    }
    return 0
  })

  return tasks
})
</script>