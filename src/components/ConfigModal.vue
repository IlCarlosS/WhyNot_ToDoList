<!-- //ConfigModal.vue -->
<script setup>
import { ref } from 'vue'
import { useConfigStore } from '../stores/configStore'
import { useNoteStore } from '../stores/noteStore'
import { useTaskStore } from '../stores/taskStore'
import { exportAppData, importAppData } from '../utils/backupHandler'
import { useToast } from '../composables/useToast'

const props = defineProps({ show: Boolean })
const emit = defineEmits(['close'])
const configStore = useConfigStore()
const noteStore = useNoteStore()
const taskStore = useTaskStore()
const openSection = ref(null)
const showConfirmImport = ref(false) // Para el modal de confirmación
const pendingFile = ref(null)

const toggleSection = (section) => {
  openSection.value = openSection.value === section ? null : section
}

const colors = [
  { name: 'Azul (Default)', value: '#4F67D8' },
  { name: 'Rojo', value: '#D84F67' },
  { name: 'Verde', value: '#67D84F' },
  { name: 'Naranja', value: '#D8A54F' },
  { name: 'Cian', value: '#4FD8C7' }
]

// Funciones importar y exportar json
const handleExport = () => {
  exportAppData()
}

const onFileChange = (event) => {
  const file = event.target.files[0]
  if (!file) return
  pendingFile.value = file
  showConfirmImport.value = true // Abrimos el mini-modal de confirmación
}

// Paso 2: El usuario confirma la acción
const confirmImport = () => {
  importAppData(pendingFile.value, { taskStore, noteStore, configStore })
  showConfirmImport.value = false
  pendingFile.value = null
}

// const handleImport = (event) => {
//   const file = event.target.files[0]
//   if (!file) return

//   if (confirm("¿Estás seguro? Se borrarán los datos actuales para cargar los del respaldo.")) {
//     importAppData(file, { taskStore, noteStore, configStore })
//   }
//   // Limpiar el input para poder subir el mismo archivo dos veces si se desea
//   event.target.value = ''
// }
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div class="bg-[#1e1e24] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-800 animate-scale-in">
        
        <div class="p-6 flex justify-between items-center border-b border-gray-800">
          <h2 class="text-xl font-bold text-white">Configuración</h2>
          <button @click="emit('close')" class="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          
          <div class="border-b border-gray-800 pb-4">
            <button @click="toggleSection('help')" class="w-full flex justify-between items-center text-white font-semibold group">
              <span>¿Cómo usar?</span>
              <svg :class="{'rotate-180': openSection === 'help'}" class="transition-transform text-gray-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div v-if="openSection === 'help'" class="mt-3 text-gray-400 text-sm space-y-3 animate-fade-down">
              <p>• <b>Notas:</b> Captura ideas al instante y personaliza su prioridad visual con colores.</p>
              <p>• <b>Tareas:</b> Gestiona tus pendientes con fechas límite y seguimiento de progreso detallado.</p>
              <p>• <b>Calendario:</b> Obtén una vista global de tus compromisos para equilibrar mejor tu tiempo mensual.</p>
            </div>
          </div>

          <div class="flex items-center justify-between py-2">
            <span class="text-white font-semibold">Color de acento</span>
            <div class="flex gap-2">
              <button 
                v-for="color in colors" 
                :key="color.value"
                @click="configStore.setAccentColor(color.value)"
                :style="{ backgroundColor: color.value }"
                :class="[
                  'w-6 h-6 rounded-full transition-all border-2',
                  configStore.accentColor === color.value ? 'border-white scale-125 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
                ]"
                :title="color.name"
              ></button>
            </div>
          </div>

          <div class="flex items-center justify-between py-2 border-t border-gray-800 pt-4">
            <span class="text-white font-semibold">Idioma</span>
            <button class="bg-gray-800/50 text-gray-500 px-4 py-1.5 rounded-lg text-xs font-bold border border-gray-700 cursor-not-allowed italic">
              Español (Próximamente)
            </button>
          </div>

          <div class="py-4 border-t border-gray-800">
            <span class="text-white font-semibold block mb-3">Gestión de datos</span>

            <Transition name="fade">
              <div v-if="showConfirmImport" class="absolute inset-0 z-[110] bg-[#1e1e24] flex flex-col items-center justify-center p-6 text-center">
                <div class="bg-surface p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 !text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="m3 21 1.65-3.8a9 9 0 1 1 3.4 3.4L3 21"/></svg>
                </div>
                <h3 class="text-white font-bold text-lg">¿Sobrescribir datos?</h3>
                <p class="text-gray-400 text-sm mt-2 mb-6">Esta acción borrará todas tus notas y tareas actuales para reemplazarlas por las del archivo.</p>
                <div class="flex gap-3 w-full">
                  <button @click="showConfirmImport = false" class="flex-1 py-2 rounded-xl bg-surface text-white font-semibold">Cancelar</button>
                  <button @click="confirmImport" class="flex-1 py-2 rounded-xl !bg-accent text-white font-semibold">Sí, restaurar</button>
                </div>
              </div>
            </Transition>

            <div class="grid grid-cols-2 gap-3">
              <button 
                @click="handleExport"
                class="flex items-center justify-center gap-2 p-2.5 bg-surface hover:bg-gray-800 text-white rounded-xl border border-gray-700 transition-all text-sm group"
              >
                Exportar JSON
              </button>

              <label class="flex items-center justify-center gap-2 p-2.5 bg-surface hover:bg-gray-800 text-white rounded-xl border border-gray-700 transition-all text-sm group cursor-pointer text-center">
                <span>Importar JSON</span>
                <input type="file" accept=".json" class="hidden" @change="onFileChange">
              </label>
            </div>
            <p class="text-[10px] text-gray-500 mt-2 text-center">Tus datos se guardan localmente. Haz un respaldo para no perderlos.</p>
          </div>

          <div class="pt-2 border-t border-gray-800">
            <button @click="toggleSection('credits')" class="w-full flex justify-between items-center text-white font-semibold group">
              <span>Créditos y versión</span>
              <svg :class="{'rotate-180': openSection === 'credits'}" class="transition-transform text-gray-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div v-if="openSection === 'credits'" class="mt-3 text-gray-400 text-xs space-y-1 animate-fade-down bg-black/20 p-3 rounded-xl">
              <p><b>Versión:</b> 2.3.0 estable</p>
              <p><b>Core:</b> Vue 3 & Dexie.js (IndexedDB)</p>
              <p><b>Estilos:</b> Tailwind CSS con variables dinámicas</p>
              <p class="pt-2 text-accent italic">Desarrollado para organizar tu mundo.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.animate-scale-in {
  animation: scaleIn 0.3s ease-out;
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-down {
  animation: fadeDown 0.2s ease-out;
}
@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>