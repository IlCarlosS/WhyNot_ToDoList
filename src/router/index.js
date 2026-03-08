import { createRouter, createWebHistory, createWebHashHistory  } from 'vue-router'
import Tareas from '../views/Tareas.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/tareas' },
    { path: '/tareas', component: Tareas },
    { path: '/notas', component: () => import('../views/Notas.vue') },
    { path: '/calendario', component: () => import('../views/Calendario.vue') }
  ]
})

export default router