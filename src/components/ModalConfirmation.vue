<script setup>
defineProps({
  show: Boolean,
  title: { type: String, default: '¿Estás seguro?' },
  message: { type: String, default: 'Esta acción no se puede deshacer.' },
  confirmText: { type: String, default: 'Eliminar' },
  cancelText: { type: String, default: 'Cancelar' }
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <Transition name="fade-scale">
    <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <div class="bg-bg-dark border border-gray-700/50 w-full max-w-sm rounded-2xl p-6 shadow-2xl text-center">
            
            <div class="mx-auto w-12 h-12 bg-danger/10 text-danger rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </div>

            <h3 class="text-xl font-bold text-white mb-2">{{ title }}</h3>
            <p class="text-gray-400 mb-6 text-sm leading-relaxed">
            {{ message }}
            </p>

            <div class="flex flex-col space-y-2">
                <button 
                    @click="emit('confirm')"
                    class="w-full py-3 bg-danger text-white font-bold rounded-xl hover:bg-danger/80 transition-all active:scale-95"
                >
                    {{ confirmText }}
                </button>
                <button 
                    @click="emit('cancel')"
                    class="w-full py-3 bg-transparent text-gray-400 font-medium rounded-xl hover:text-white transition-colors"
                >
                    {{ cancelText }}
                </button>
            </div>
        </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: all 0.25s ease-out;
}
.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>