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
  <div class="max-w-5xl mx-auto p-2 sm:p-6 text-white">
    
    <div class="mb-6 sm:mb-8">
      <h3 class="text-xl sm:text-3xl font-bold text-bg-dark mb-4 sm:mb-2 tracking-wider">Calendario</h3>
      
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        <div class="flex items-center justify-between sm:justify-start gap-4">
          <h2 class="text-3xl font-black text-bg-dark min-w-[140px]">{{ currentMonthName }}</h2>
          <div class="flex gap-2">
            <button @click="prevMonth" class="p-2.5 !bg-accent rounded-lg hover:opacity-90 transition-all shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button @click="nextMonth" class="p-2.5 !bg-accent rounded-lg hover:opacity-90 transition-all shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2 sm:gap-4">
            <div class="flex flex-1 items-center gap-2 bg-white/5 p-1 rounded-xl sm:bg-transparent sm:p-0">
                <select @change="handleMonthChange" :value="currentDate.getMonth()" class="flex-1 bg-surface p-2.5 rounded-lg border border-gray-700 outline-none text-sm cursor-pointer text-white">
                    <option v-for="(m, idx) in months" :key="m" :value="idx">{{ m }}</option>
                </select>
                <select @change="handleYearChange" :value="currentDate.getFullYear()" class="flex-1 bg-surface p-2.5 rounded-lg border border-gray-700 outline-none text-sm cursor-pointer text-white">
                    <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                </select>
            </div>
          
            <button 
                @click="openNewTaskModal"
                class="w-full sm:w-auto !bg-accent text-white px-6 py-3.5 rounded-custom font-bold flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-accent/20"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
                Nueva Tarea
            </button>
        </div>
      </div>
    </div>

    <div class="border border-indigo-500/20 rounded-2xl overflow-hidden shadow-2xl bg-[#1a1a1a]">
      <div class="grid grid-cols-7 !bg-accent">
        <div v-for="day in weekDays" :key="day" class="py-3 text-bg-dark text-center font-bold text-xs sm:text-sm uppercase tracking-tighter sm:tracking-normal">
          <span class="block sm:hidden">{{ day.substring(0, 1) }}</span>
          <span class="hidden sm:block">{{ day }}</span>
        </div>
      </div>

      <div class="grid grid-cols-7 gap-[1px] bg-gray-800/50">
        <div 
          v-for="date in days" 
          :key="date.toString()"
          @click="selectDay(date)"
          :class="[
            'min-h-[70px] sm:min-h-[120px] p-1 sm:p-2 transition-all cursor-pointer relative flex flex-col border-2',
            isSameMonth(date, currentDate) ? 'bg-[#242424]' : 'bg-[#1a1a1a] text-gray-600',
            isSameDay(date, selectedDate) ? 'border-accent z-10 bg-accent/5' : 'border-transparent hover:border-gray-700',
            isToday(date) && !isSameDay(date, selectedDate) ? 'ring-2 ring-inset ring-accent/50' : ''
          ]"
        >
          <span :class="['font-bold text-sm sm:text-lg mb-1', isToday(date) ? 'text-accent' : 'text-gray-300']">
            {{ format(date, 'd') }}
          </span>

          <div class="flex-1 overflow-hidden space-y-1">
            <div class="flex flex-wrap sm:flex-col gap-1">
                <div 
                  v-for="task in getTasksForDate(date).slice(0, 3)" 
                  :key="task.id"
                  class="flex items-center gap-2 sm:px-2 sm:py-1 rounded sm:bg-gray-800/40"
                >
                  <span 
                    :class="[
                      task.categoryColor || '!bg-accent', 
                      'w-2 h-2 rounded-full flex-shrink-0 shadow-sm'
                    ]"
                  ></span>
                  <span class="hidden sm:block text-[10px] font-medium text-gray-200 truncate leading-tight">
                    {{ task.title }}
                  </span>
                </div>
                <span v-if="getTasksForDate(date).length > 3" class="text-[9px] text-gray-500 font-bold sm:pl-2">
                    +{{ getTasksForDate(date).length - 3 }}
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 sm:mt-12 animate-fade-in px-1">
      <h2 class="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3 text-accent">
        Tareas de {{ selectedDateFormatted }}
        <span v-if="selectedDateTasks.length > 0" class="!bg-accent text-white text-[10px] px-2.5 py-1 rounded-full font-black">
          {{ selectedDateTasks.length }}
        </span>
      </h2>

      <div v-if="selectedDateTasks.length > 0" class="space-y-3">
        <div 
          v-for="task in selectedDateTasks" 
          :key="task.id"
          class="bg-[#242424] border border-gray-700/50 p-4 rounded-xl flex items-center justify-between hover:border-accent/50 transition-all group shadow-lg"
        >
          <div class="flex items-center gap-4 overflow-hidden">
            <div :class="[task.categoryColor || '!bg-accent', 'w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-sm flex-shrink-0']"></div>
            <div class="truncate">
              <h4 class="font-bold text-gray-100 group-hover:text-accent transition-colors truncate">
                {{ task.title }}
              </h4>
              <p class="text-gray-500 text-xs sm:text-sm">
                {{ format(parseLocalDate(task.dueDate), "dd 'de' MMMM", { locale: es }) }}
              </p>
            </div>
          </div>

          <button 
            @click="$router.push('/tareas')" 
            class="flex-shrink-0 ml-4 !bg-accent/10 text-accent px-3 py-2 rounded-lg text-xs font-bold hover:!bg-accent hover:text-white transition-all"
          >
            Ver más
          </button>
        </div>
      </div>

      <div 
        v-else 
        class="flex flex-col items-center justify-center py-12 text-center rounded-3xl border border-dashed border-gray-700 bg-main"
      >
        <div class="w-20 h-20 mb-4 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full text-gray-400">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4"/><path d="M21 5h-4"/>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-accent">Día despejado</h3>
        <p class="text-bg-dark max-w-[240px] mx-auto text-xs mt-1">
          No hay nada pendiente para hoy. ¡Buen momento para un café!
        </p>
      </div>
    </div>

    <TaskModal :show="showModal" @close="showModal = false" /> 
  </div>
</template>