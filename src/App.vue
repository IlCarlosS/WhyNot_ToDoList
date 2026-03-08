<template>
  <div class="flex h-screen overflow-hidden">
    <aside 
      class="relative bg-bg-dark text-bg-main p-4 flex flex-col justify-between transition-all duration-300 ease-in-out"
      :class="isCollapsed ? 'w-20' : 'w-64'"
    >
      <button 
        @click="toggleSidebar" 
        class="absolute -right-5 top-20 !bg-accent text-white rounded-full p-1 shadow-lg hover:scale-110 transition-transform z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="isCollapsed ? 'rotate-180' : ''" class="transition-transform duration-300">
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </button>

      <div>
        <h1 class="text-2xl font-bold mb-10 text-accent flex items-center overflow-hidden whitespace-nowrap px-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="min-w-[24px] mr-3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3l8 -8" /><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>
          <span v-show="!isCollapsed" class="transition-opacity duration-300">Why Not?</span>
        </h1>
        
        <nav class="space-y-2">
          <router-link to="/tareas" class="flex items-center p-3 rounded-custom hover:bg-surface group transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="min-w-[24px] mr-3 text-bg-main group-hover:text-accent transition-colors" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" /><path d="M14 19l2 2l4 -4" /><path d="M9 8h4" /><path d="M9 12h2" /></svg>
            <span v-show="!isCollapsed" class="whitespace-nowrap overflow-hidden">Tareas</span>
          </router-link>

          <router-link to="/notas" class="flex items-center p-3 rounded-custom hover:bg-surface group transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="min-w-[24px] mr-3 text-bg-main group-hover:text-accent transition-colors" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2" /><path d="M9 12h6" /><path d="M9 16h6" /></svg>
            <span v-show="!isCollapsed" class="whitespace-nowrap overflow-hidden">Notas</span>
          </router-link>

          <router-link to="/calendario" class="flex items-center p-3 rounded-custom hover:bg-surface group transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="min-w-[24px] mr-3 text-bg-main group-hover:text-accent transition-colors" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg>
            <span v-show="!isCollapsed" class="whitespace-nowrap overflow-hidden">Calendario</span>
          </router-link>
        </nav>
      </div>

      <!-- <router-link to="/configuracion" class="flex items-center p-3 text-gray-400 hover:text-white group">
        <svg xmlns="http://www.w3.org/2000/svg" class="min-w-[24px] mr-3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
        <span v-show="!isCollapsed" class="whitespace-nowrap overflow-hidden">Configuración</span>
      </router-link> -->

      <button 
        @click="isConfigOpen = true" 
        class="w-full flex items-center p-3 text-gray-400 hover:text-white group transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="min-w-[24px] mr-3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
        <span v-show="!isCollapsed">Configuración</span>
      </button>

      <ConfigModal :show="isConfigOpen" @close="isConfigOpen = false" />
    </aside>


    <main class="flex-1 flex flex-col overflow-hidden bg-bg-main ">
      <header class="h-16 border-b border-surface flex items-center justify-between px-8 text-bg-main backdrop-blur-sm bg-bg-dark">
        <span class="italic text-base font-light tracking-wide opacity-90">
          "{{ fraseActual }}"
        </span>

        <div class="flex items-center space-x-2">
          <div class="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span class="font-mono text-lg font-medium tracking-tighter">
            {{ horaActual }}
          </span>
        </div>
      </header>

      <section class="flex-1 overflow-y-auto p-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </section>
    </main>
  </div>

  <!-- modal -->
  <Transition name="toast">
    <div v-if="isVisible" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] !bg-accent text-white px-6 py-3 rounded-full shadow-2xl font-medium flex items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
      <span>{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useToast } from './composables/useToast'
import { useConfigStore } from './stores/configStore'
import ConfigModal from './components/ConfigModal.vue'
const configStore = useConfigStore()
const isConfigOpen = ref(false)
const { isVisible, message } = useToast()

// 1. Lógica de Frases
const frases = [
  "Un paso a la vez...",
  "Respira, todo fluye.",
  "Hazlo simple, hazlo real.",
  "Tu ritmo es el correcto.",
  "Enfócate en lo de ahora.",
  "Cada tarea es solo una pieza del puzzle.",
  "El progreso se mide en pasos, no en saltos.",
  "No hay prisa, solo oportunidades.",
  "Lo que haces hoy es suficiente para hoy.",
  "Permítete avanzar a tu propio ritmo.", 
  "Una pequeña acción vale más que mil intenciones.",
  "Disfruta el proceso, no solo el resultado.",
  "Los grandes logros empiezan con una sola nota.",
  "Siéntate, observa, actúa cuando te sientas listo.",
  "La calma es la mejor herramienta de productividad.",
  "No te juzgues por lo que falta, celebra lo que ya tienes.",
  "Cada día trae su propio ritmo; sigue el tuyo.",
  "El trabajo bien hecho nace de una mente tranquila.",
  "Cierra los ojos, imagina el siguiente paso y avanza.",
  "No hay errores, solo aprendizajes en camino.",
  "El éxito se construye con paciencia, no con velocidad.",
  "Confía en tu capacidad de resolver lo que viene.",
  "El momento perfecto es ahora; hazlo a tu manera.",
  "Si algo parece grande, divídelo en partes pequeñas.",
  "No te apresures, deja que la creatividad fluya.",
  "Celebra cada pequeño avance, por insignificante que parezca.",
  "Tu agenda es una guía, no una sentencia.",
  "Recuerda: el objetivo es disfrutar el camino, no solo llegar."

  // Aquí puedes añadir todas las que quieras
]
const fraseActual = ref("")

// 2. Lógica del Reloj
const horaActual = ref("")
let intervalId = null

const actualizarHora = () => {
  const ahora = new Date()
  // Formato de 24h sin segundos para no generar ansiedad visual
  horaActual.value = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
}

onMounted(() => {
  // Elegir frase aleatoria al cargar
  const indice = Math.floor(Math.random() * frases.length)
  fraseActual.value = frases[indice]

  // Iniciar reloj
  actualizarHora()
  intervalId = setInterval(actualizarHora, 1000) // Se actualiza cada segundo para ser preciso
})

onUnmounted(() => {
  // Limpiar el intervalo si el componente se destruye
  if (intervalId) clearInterval(intervalId)
})

//contraer y expandir aside
const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

onMounted(() => {
  configStore.init() // Aplica el color guardado al cargar
})
</script>

<style scoped>
/* modal estilos*/
.toast-enter-active, .toast-leave-active { transition: all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translate(-50%, 20px); }
</style>