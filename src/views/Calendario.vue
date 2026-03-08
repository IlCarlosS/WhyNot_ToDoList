<script setup>
import { ref, computed } from 'vue'
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday,
  setMonth,
  setYear,
  isSameDay
} from 'date-fns'
import { es } from 'date-fns/locale' // Para nombres en español
import { useTaskStore } from '../stores/taskStore'
import TaskModal from '../components/TaskModal.vue'

const taskStore = useTaskStore()
const currentDate = ref(new Date())
const selectedDate = ref(new Date())

//crear tarea
const showModal = ref(false)
const openNewTaskModal = () => {
  showModal.value = true
}

// Nombres de los días para la cabecera
const weekDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

// --- LÓGICA DEL CALENDARIO ---

const days = computed(() => {
  const monthStart = startOfMonth(currentDate.value)
  const monthEnd = endOfMonth(monthStart)
  
  // Ajustamos para que la semana empiece en Lunes (weekStartsOn: 1)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })

  return eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  })
})

const currentMonthName = computed(() => {
  const name = format(currentDate.value, 'MMMM yyyy', { locale: es })
  return name.toUpperCase()
})

//modificacion zona horaria
const parseLocalDate = (dateStr) => {
  if (!dateStr) return null;
  // Dividimos "2026-03-14" en [2026, 03, 14]
  const [year, month, day] = dateStr.split('-').map(Number);
  // El mes en JS es 0-indexado (Enero es 0), por eso restamos 1
  return new Date(year, month - 1, day);
}

// Navegación
const nextMonth = () => { currentDate.value = addMonths(currentDate.value, 1) }
const prevMonth = () => { currentDate.value = subMonths(currentDate.value, 1) }

// --- HANDLERS PARA SELECTS (Ir a fecha) ---
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const years = Array.from({ length: 11 }, (_, i) => 2020 + i)

const handleMonthChange = (e) => {
  currentDate.value = setMonth(currentDate.value, e.target.value)
}
const handleYearChange = (e) => {
  currentDate.value = setYear(currentDate.value, e.target.value)
}

// Función para filtrar tareas de un día específico
const getTasksForDate = (date) => {
  return taskStore.tasks.filter(task => {
    if (!task.dueDate) return false;
    const taskDate = parseLocalDate(task.dueDate); // <--- Usamos el helper
    return isSameDay(taskDate, date);
  });
};

// Tareas filtradas para la sección de resumen
const selectedDateTasks = computed(() => {
  return taskStore.tasks.filter(task => {
    if (!task.dueDate) return false;
    const taskDate = parseLocalDate(task.dueDate); // <--- Usamos el helper
    return isSameDay(taskDate, selectedDate.value);
  });
});

// Formato legible para el título del resumen
const selectedDateFormatted = computed(() => {
  if (isToday(selectedDate.value)) return 'Hoy'
  return format(selectedDate.value, "d 'de' MMMM", { locale: es })
})

// Función para cambiar el día seleccionado al hacer clic en el grid
const selectDay = (date) => {
  selectedDate.value = date
}
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto text-white">
    <div class="mb-8">
      <h3 class="text-sm font-bold text-gray-500 tracking-widest mb-2">CALENDARIO</h3>
      
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <h2 class="text-2xl font-black text-bg-dark">{{ currentMonthName }}</h2>
          <div class="flex gap-2">
            <button @click="prevMonth" class="p-2 !bg-accent rounded-lg hover:!bg-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button @click="nextMonth" class="p-2 !bg-accent rounded-lg hover:!bg-accent transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div class="flex items-center gap-4">
            <span class="text-gray-400 font-bold">Ir a Fecha:</span>
            <select @change="handleMonthChange" :value="currentDate.getMonth()" class="bg-surface p-2 rounded-lg border border-gray-700 outline-none text-sm cursor-pointer">
                <option v-for="(m, idx) in months" :key="m" :value="idx">{{ m }}</option>
            </select>
            <select @change="handleYearChange" :value="currentDate.getFullYear()" class="bg-surface p-2 rounded-lg border border-gray-700 outline-none text-sm cursor-pointer">
                <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
            </select>
          
            <button 
                @click="openNewTaskModal"
                
                class="!bg-accent text-white px-6 py-3 rounded-custom font-semibold flex items-center hover:scale-105 transition-transform shadow-lg shadow-accent/20"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                Nueva Tarea
            </button>
        </div>
      </div>
    </div>

    <!-- Calendario UI -->
    <div class="border border-indigo-500/30 rounded-2xl overflow-hidden shadow-2xl">
      <div class="grid grid-cols-7 !bg-accent">
        <div v-for="day in weekDays" :key="day" class="py-3 text-bg-dark text-center font-bold text-sm">
          {{ day }}
        </div>
      </div>

      <div class="grid grid-cols-7 gap-[1px] bg-gray-800">
        <div 
          v-for="date in days" 
          :key="date.toString()"
          @click="selectDay(date)"
          :class="[
            'min-h-[120px] p-2 transition-all cursor-pointer relative flex flex-col border-2',
            isSameMonth(date, currentDate) ? 'bg-[#333333]' : 'bg-gray-100 text-gray-400',
            isSameDay(date, selectedDate) ? 'border-indigo-500 z-10 scale-[1.02] shadow-xl' : 'border-transparent hover:border-gray-600',
            isToday(date) && !isSameDay(date, selectedDate) ? 'ring-2 ring-inset ring-accent' : ''
          ]"
        >
          <span class="font-bold text-lg mb-1">{{ format(date, 'd') }}</span>

          <div class="flex-1 overflow-y-auto custom-scrollbar space-y-1">
            <div 
              v-for="task in getTasksForDate(date)" 
              :key="task.id"
              class="flex items-center gap-2 px-2 py-1 rounded bg-gray-800/40 hover:bg-gray-700/60 transition-colors cursor-default group"
              :title="task.title"
            >
              <span 
                :class="[
                  task.categoryColor || '!bg-accent', 
                  'w-2 h-2 rounded-full flex-shrink-0 shadow-sm'
                ]"
              ></span>
                
              <span class="text-[10px] font-medium text-gray-200 truncate leading-tight">
                {{ task.title }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TaskModal :show="showModal" @close="showModal = false" /> 

    <div class="mt-12 animate-fade-in">
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-surface">
        Tareas de {{ selectedDateFormatted }}
        <span v-if="selectedDateTasks.length > 0" class="!bg-accent text-bg-main text-xs px-2 py-1 rounded-full">
          {{ selectedDateTasks.length }}
        </span>
      </h2>

      <div v-if="selectedDateTasks.length > 0" class="space-y-3">
        <div 
          v-for="task in selectedDateTasks" 
          :key="task.id"
          class="bg-surface border border-gray-700/50 p-4 rounded-xl flex items-center justify-between hover:border-indigo-500/50 transition-all group shadow-lg"
        >
          <div class="flex items-center gap-4">
            <div :class="[task.categoryColor || '!bg-accent', 'w-4 h-4 rounded-full shadow-sm']"></div>
            
            <div>
              <h4 class="font-bold text-white group-hover:text-indigo-400 transition-colors">
                {{ task.title }}
              </h4>
              <p class="text-gray-500 text-sm">
                {{ format(parseLocalDate(task.dueDate), "dd 'de' MMMM, yyyy", { locale: es }) }}
              </p>
            </div>
          </div>

          <button 
            @click="$router.push('/tareas')" 
            class="!bg-accent/20 text-indigo-400 px-4 py-2 rounded-lg text-sm font-bold hover:!bg-accent/100 hover:text-white transition-all"
          >
            Ir a tarea
          </button>
        </div>
      </div>

      <div 
        v-else 
        class="flex flex-col items-center justify-center py-16 text-center rounded-3xl border border-dashed border-gray-700"
      >
        <div class="w-32 h-32 mb-6 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full text-gray-400">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4"/><path d="M21 5h-4"/>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-500 mb-1">Día de descanso...</h3>
        <p class="text-gray-600 max-w-xs mx-auto text-sm">
          No tienes tareas programadas para esta fecha. ¡Disfruta tu tiempo libre!
        </p>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Reutilizamos o ajustamos tu custom-scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>