//src/composables/useToast.js
// import { ref } from 'vue'

// const isVisible = ref(false)
// const message = ref('')

// export function useToast() {
//   const showToast = (msg) => {
//     message.value = msg
//     isVisible.value = true
//     setTimeout(() => {
//       isVisible.value = false
//     }, 2500) // Desaparece tras 2.5 segundos
//   }

//   return { isVisible, message, showToast }
// }

import { ref } from 'vue'
const isVisible = ref(false)
const message = ref('')
const type = ref('success') // Añadimos esto

export function useToast() {
  const showToast = (msg, t = 'success') => {
    message.value = msg
    type.value = t
    isVisible.value = true
    setTimeout(() => { isVisible.value = false }, 2500)
  }

  return { isVisible, message, type, showToast }
}