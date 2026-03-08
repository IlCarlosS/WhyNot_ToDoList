<script setup>
import { ref } from 'vue'
import { useConfigStore } from '../stores/configStore'

const props = defineProps({ show: Boolean })
const emit = defineEmits(['close'])
const configStore = useConfigStore()

const openSection = ref(null) // Controla qué acordeón está abierto

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
            <div v-if="openSection === 'help'" class="mt-3 text-gray-400 text-sm space-y-2 animate-fade-down">
              <p>• <b>Notas:</b> Crea recordatorios rápidos y dales color.</p>
              <p>• <b>Tareas:</b> Organiza tu día con fechas límite.</p>
              <p>• <b>Calendario:</b> Visualiza tu carga de trabajo mensual.</p>
            </div>
          </div>

          <div class="flex items-center justify-between py-2">
            <span class="text-white font-semibold">Cambiar color acento</span>
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
            <span class="text-white font-semibold">Cambiar idioma</span>
            <button class="!bg-accent/20 text-accent px-4 py-1.5 rounded-lg text-xs font-bold border border-accent/30 cursor-not-allowed">
              Español (Próximamente)
            </button>
          </div>

          <div class="pt-4">
            <button @click="toggleSection('credits')" class="w-full flex justify-between items-center text-white font-semibold group">
              <span>Créditos y versión</span>
              <svg :class="{'rotate-180': openSection === 'credits'}" class="transition-transform text-gray-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div v-if="openSection === 'credits'" class="mt-3 text-gray-400 text-xs space-y-1 animate-fade-down">
              <p><b>Versión:</b> 2.1.0-beta</p>
              <p><b>Tecnologías:</b> Vue 3, Vite, Tailwind CSS, Pinia, Dexie.js</p>
              <p>Desarrollado con ❤️ para organizar tu mundo.</p>
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