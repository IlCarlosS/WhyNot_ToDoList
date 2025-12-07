<template>
  <div class="min-h-screen flex">
    <!-- SIDEBAR -->
    <aside :class="['flex-shrink-0 w-80 p-6 flex flex-col justify-between transition-all duration-300 fixed left-0 top-0 h-full z-40',sidebarOpen ? 'translate-x-0' : '-translate-x-full']"style="background:var(--bg-dark);">
    <div>
        <div class="flex items-center gap-3 mb-8 mt-10">
          <div class="w-12 h-12 flex items-center justify-center rounded-md bg-[rgba(88,101,242,0.15)]">
            <svg class="w-75 h-75 text-[var(--accent)] icon icon-tabler icons-tabler-outline icon-tabler-checkbox" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11l3 3l8 -8" /><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>
          </div>
          <h1 class="text-white font-bold text-lg">WHY NOT? TO DO LIST</h1>
        </div>

        <div class="mb-6">
          <nav class="space-y-3">
            <button class="sidebar-btn text-white">
              <div class="icon-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-checklist"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" /><path d="M14 19l2 2l4 -4" /><path d="M9 8h4" /><path d="M9 12h2" /></svg>
              </div>
              <span class="text-lg">Tareas</span>
            </button>

            <button class="sidebar-btn text-white" @click="comingSoon('Notas')">
              <div class="icon-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-clipboard-text"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 12h6" /><path d="M9 16h6" /></svg>
              </div>
              <span class="text-lg">Notas</span>
            </button>

            <button class="sidebar-btn text-white" @click="comingSoon('Calendario')">
              <div class="icon-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-week"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M7 14h.013" /><path d="M10.01 14h.005" /><path d="M13.01 14h.005" /><path d="M16.015 14h.005" /><path d="M13.015 17h.005" /><path d="M7.01 17h.005" /><path d="M10.01 17h.005" /></svg>
              </div>
              <span class="text-lg">Calendario</span>
            </button>

            <button class="sidebar-btn text-white" @click="comingSoon('Ajustes')">
              <div class="icon-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-settings"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
              </div>
              <span class="text-lg">Ajustes</span>
            </button>
            <div class="mb-4">
              <button @click="openModalFn" class="w-full primary-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                Nueva tarea
              </button>
            </div>
          </nav>
        </div>
      </div>
    </aside>

    <button @click="toggleSidebar" class="fixed top-4 left-4 z-50 bg-gray-800 text-white p-3 rounded-lg shadow-lg hover:bg-gray-700 transition">
      <!-- Ícono hamburguesa -->
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <!-- MAIN CONTENT -->
    <main class="p-8 mt-10 transition-all duration-300 w-full":class="sidebarOpen ? 'ml-100' : 'ml-0'">
      <div class="sticky top-20 z-40 bg-[var(--bg)] space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:gap-6 mb-6 w-full sticky top-10 z-40">
          <!-- Search -->
          <div class="flex-1 w-full mb-4 sm:mb-0">
            <div class="relative">
              <input v-model="search" placeholder="Buscar"
                class="w-full rounded-lg py-3 px-10 text-gray-700 bg-gray-200 placeholder:text-gray-500" />
              <svg class="absolute left-3 top-3 w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-4.35-4.35" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
          </div>

          <!-- Filtros -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            <!-- <button class="primary-btn w-full sm:basis-1/5 sm:flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-filter"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" /></svg>
            </button> -->

            <select v-model="filterValue"
              class="rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-700 w-full sm:w-auto">
              <option value="">Filtrar por</option>
              <option value="date">Fecha</option>
              <option value="az">Nombre A → Z</option>
              <option value="za">Nombre Z → A</option>
              <option value="cat-none">Categoría: Ninguno</option>
              <option value="cat-important">Categoría: Importante</option>
              <option value="cat-personal">Categoría: Personal</option>
              <option value="cat-work">Categoría: Trabajo</option>
            </select>
          </div>
        </div>

        <!-- "Nueva tarea" button top -->
        <div class="mb-4 sticky top-24 z-40">
          <button @click="openModalFn" class="primary-btn w-full sm:w-40">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"stroke-linecap="round" stroke-linejoin="round"class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
            Nueva tarea
          </button>
        </div>
      </div>

      <!-- Sections:-->
      <section class="space-y-8">
        <div>
          <h2 class="text-[var(--accent)] font-extrabold text-2xl mb-4"></h2>
          <div class="space-y-6">
            
            <section>
              <article v-for="task in filteredTasks" :key="task.id" class="task-card flex justify-between items-start mb-4 p-4 rounded-lg bg-[var(--card-shadow)]ransition-opacity duration-300":class="{ 'opacity-0': task.isFading }">
                <div class="w-full pr-4">
                  <h3 class="font-semibold text-white mb-1">{{ task.title }}</h3>
                  <p class="text-[var(--muted)] text-sm mb-3">
                    Fecha límite:
                    <span class="text-white">{{ task.date || 'Sin fecha' }}</span>
                  </p>

                  <p class="text-[var(--muted)] text-sm mb-4">
                    {{ task.description || 'Sin descripción' }}
                  </p>

                  <p class="text-[var(--muted)] text-sm mb-3">
                    Categoría: 
                    <span class="text-white">{{ task.category }}</span>
                  </p>

                  <div class="flex items-center gap-3">
                    <button @click="finishTask(task)" class="px-3 py-1 rounded-md bg-[var(--accent)] text-white">
                      Terminar
                    </button>
                    <button @click="openDeleteModal(task)" class="px-3 py-1 rounded-md bg-[var(--danger)] text-white">
                      Eliminar
                    </button>
                  </div>
                </div>

                <div v-if="isOverdue(task)" class=" flex-shrink-0 mb-2">
                  <span class="m-5 px-2 py-2 text-x bg-red-500 text-white rounded">
                    Vencida
                  </span>
                </div>

                <div class="flex-shrink-0">
                  <div class="relative">
                    <button @click="toggleMenu(task.id)" class="px-2 py-1 text-xl">•••</button>

                    <div v-if="openMenuId === task.id" class="absolute right-0 mt-2 bg-gray-900 shadow-lg w-32 z-10">
                      <button @click="editTask(task)"class="w-full text-left px-3 py-2 hover:bg-gray-100">
                        Modificar
                      </button>
                      <button @click="openDeleteModal(task)" class="w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600">
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </div>
      </section>
    </main>
  </div>
  
  <!-- MODALS (ocultos; se mostrarán con JS más tarde) -->
  <div class="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
  </div>

  <!-- Modal form  nueva tarea -->
  <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <!-- Contenedor -->
    <div class="bg-[var(--card)] p-6 rounded-xl w-[90%] max-w-md shadow-xl relative bg-indigo-500">
      <!-- Botón X -->
      <button @click="closeModal" class="absolute top-3 right-3 text-white/70 hover:text-white text-xl">✕</button>
      <h2 class="text-xl font-semibold text-white mb-4">Nueva tarea</h2>

      <form @submit.prevent="addTask">
        <label class="block text-sm text-white mb-1">Título*</label>
        <input v-model="form.title" required class="w-full mb-4 p-2 rounded bg-gray-700 text-white"/>

        <label class="block text-sm text-white mb-1">Descripción</label>
        <textarea v-model="form.description" class="w-full mb-4 p-2 rounded bg-gray-700 text-white"></textarea>

        <label class="block text-sm text-white mb-1">Fecha límite</label>
        <input type="date" v-model="form.date" class="w-full mb-4 p-2 rounded bg-gray-700 text-white"/>

        <label class="block text-sm text-white mb-1">Categoría</label>
        <select v-model="form.category" class="w-full mb-4 p-2 rounded bg-gray-700 text-white">
          <option value="none">Ninguno</option>
          <option value="important">Importante</option>
          <option value="personal">Personal</option>
          <option value="work">Trabajo</option>
        </select>

        <div class="flex justify-end gap-3 mt-4">
          <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-500 text-white rounded">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded">
            Crear
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- MODAL EDITAR -->
  <div v-if="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-[var(--card)] p-6 rounded-xl w-[90%] max-w-md shadow-xl relative bg-indigo-500">
      <!-- Botón X -->
      <button @click="closeModal" class="absolute top-3 right-3 text-white/70 hover:text-white text-xl">✕</button>
      <h2 class="text-xl font-bold mb-4">Modificar tarea</h2>

      <label class="block text-sm font-medium mb-1">Título</label>
      <input type="text" v-model="form.title" class="w-full mb-4 p-2 rounded bg-gray-700 text-white" />

      <label class="block text-sm font-medium mb-1">Descripción</label>
      <textarea v-model="form.description" class="w-full mb-4 p-2 rounded bg-gray-700 text-white"></textarea>

      <label class="block text-sm font-medium mb-1">Fecha límite</label>
      <input type="date" v-model="form.date" class="w-full mb-4 p-2 rounded bg-gray-700 text-white" />

      <label class="block text-sm font-medium mb-1">Categoría</label>
      <select v-model="form.category" class="w-full mb-4 p-2 rounded bg-gray-700 text-white">
        <option value="none">Ninguna</option>
        <option value="important">Importante</option>
        <option value="personal">Personal</option>
        <option value="work">Trabajo</option>
      </select>

      <div class="flex justify-end gap-3 mt-4">
        <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-500 rounded">
          Cancelar
        </button>

        <button type="submit" @click="saveTask" class="px-4 py-2 bg-blue-600 text-white rounded">
          Guardar cambios
        </button>
      </div>

    </div>
  </div>


  <!-- Modal eliminar -->
  <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center" @keydown.esc="closeDeleteModal" tabindex="0">
    <div class="bg-indigo-500 p-6 rounded-lg shadow-lg w-80">
      <h2 class="text-lg font-bold mb-4">¿Eliminar tarea?</h2>
      <p class="text-sm mb-6">Esta acción no se puede deshacer</p>

      <div class="flex justify-end gap-3">
        <button @click="closeDeleteModal" class="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400">
          Cancelar
        </button>

        <button @click="confirmDelete" class="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700">
          Eliminar
        </button>
      </div>
    </div>
  </div>


  <!-- Toast exito tarea -->
  <div v-if="showToast" class="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade">Tarea guardada</div>
  <!-- Toast eliminar -->
  <div v-if="showDeleteToast" class="fixed bottom-5 right-5 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg">Tarea eliminada</div>
  <!-- Toast modificar -->
  <div v-if="showEditToast" class="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg">Tarea modificada</div>
  <!-- Toast terminar tarea -->
  <div v-if="showFinishToast"class="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg">Tarea terminada</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { openDB } from 'idb'

// --- Sidebar ---
const sidebarOpen = ref(true)
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

const comingSoon = (feature = "esta sección") => {
  alert(`Próximamente: ${feature} 🚀`);
};

// --- Search ---
const search = ref('')

// --- Modal principal (crear/editar) ---
const showModal = ref(false)
const showEditModal = ref(false)

const form = ref({
  title: "",
  description: "",
  date: "",
  category: "none"
})

const tasks = ref([])

function openModalFn() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  showEditModal.value=false
  form.value = { title: "", description: "", date: "", category: "none" }
  isEditing.value = false
  currentTaskId.value = null
}

// Escape cierra modal
function handleKey(e) {
  if (e.key === "Escape" && showModal.value) closeModal()
}

onMounted(() => window.addEventListener("keydown", handleKey))
onUnmounted(() => window.removeEventListener("keydown", handleKey))

//---idb---
let db = null
async function initDB() {
  db = await openDB("taskDB",1,{
    upgrade(db){
      if(!db.objectStoreNames.contains("tasks")){
        db.createObjectStore("tasks", {keyPath:"id"})
      }
    }
  })
}

onMounted(async()=>{
  await initDB()
  await loadTaskFromDB()
})

async function loadTaskFromDB() {
  const all = await db.getAll("tasks")
  tasks.value=all
}

// --- Crear tarea ---
const showSaveToast = ref(false)
function triggerToast() {
  showSaveToast.value = true
  setTimeout(() => (showSaveToast.value = false), 2000)
}

async function addTask() {
  const newTask = {
    id: Date.now(),
    title: form.value.title,
    description: form.value.description,
    date: form.value.date,
    category: form.value.category,
    isFading: false
  }

  tasks.value.push(newTask)
  await db.put("tasks", newTask)
  triggerToast()
  closeModal()
}

// --- Editar tarea ---
const isEditing = ref(false)
const currentTaskId = ref(null)
const showEditToast = ref(false)

function editTask(task) {
  isEditing.value = true
  currentTaskId.value = task.id

  // SE DEBE usar form.value
  form.value.title = task.title
  form.value.description = task.description
  form.value.category = task.category
  form.value.date = task.date

  showEditModal.value = true
  openMenuId.value = null
}

async function saveTask() {
  // Modo edición
  if (isEditing.value) {
    const index = tasks.value.findIndex(t => t.id === currentTaskId.value)
    
    if (index !== -1) {
      const updated ={
        ...tasks.value[index],
        title: form.value.title,
        description: form.value.description,
        category: form.value.category,
        date: form.value.date}

      tasks.value[index] = updated
      const plainTask = structuredClone(updated)
      await db.put("tasks", plainTask)
    }
    showEditModal.value = false
    isEditing.value = false
    currentTaskId.value = null
    showEditToast.value = true
    setTimeout(() => (showEditToast.value = false), 2000)
    return
  }

  // Crear nueva
  addTask()
}

// --- Menu opciones ---
const openMenuId = ref(null)
function toggleMenu(id) {
  openMenuId.value = openMenuId.value === id ? null : id
}

window.addEventListener("click", e => {
  if (!e.target.closest(".relative")) openMenuId.value = null
})

// --- Eliminar tarea ---
const showDeleteModal = ref(false)
const taskToDelete = ref(null)
const showDeleteToast = ref(false)

function openDeleteModal(task) {
  taskToDelete.value = task
  showDeleteModal.value = true
}

function closeDeleteModal() {
  showDeleteModal.value = false
  taskToDelete.value = null
}

function confirmDelete() {
  if (!taskToDelete.value) return

  // animación fade
  taskToDelete.value.isFading = true

  setTimeout(async () => {
    tasks.value = tasks.value.filter(t => t.id !== taskToDelete.value.id)
    await db.delete("tasks", taskToDelete.value.id)
    taskToDelete.value = null
    showDeleteModal.value = false

    showDeleteToast.value = true
    setTimeout(() => (showDeleteToast.value = false), 2000)
  }, 300)
}

// --- Terminar tarea ---
const showFinishToast = ref(false)

async function finishTask(task) {
  task.isFading = true

  setTimeout(async () => {
    tasks.value = tasks.value.filter(t => t.id !== task.id)
    await db.delete("tasks", task.id)   //borra en IndexedDB también

    showFinishToast.value = true
    setTimeout(() => (showFinishToast.value = false), 2000)
  }, 300)
}

// --- Filtros ---
const filterValue = ref("")

const filteredTasks = computed(() => {
  const query = search.value.trim().toLowerCase()
  let list = [...tasks.value]

  // --- Búsqueda ---
  if (query) {
    list = list.filter(t =>
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query)
    )
  }

  // --- Filtros existentes ---
  switch (filterValue.value) {
    case "date":
      list.sort((a, b) => (a.date || '').localeCompare(b.date || ''))
      break

    case "az":
      list.sort((a, b) => a.title.localeCompare(b.title))
      break

    case "za":
      list.sort((a, b) => b.title.localeCompare(a.title))
      break

    case "cat-none":
      list = list.filter(t => t.category === "none")
      break

    case "cat-important":
      list = list.filter(t => t.category === "important")
      break

    case "cat-personal":
      list = list.filter(t => t.category === "personal")
      break

    case "cat-work":
      list = list.filter(t => t.category === "work")
      break
  }
  return list
})

//--- Fecha limite
function isOverdue(task) {
  if (!task.date) return false
  const today = new Date().toISOString().split("T")[0] // "YYYY-MM-DD"
  return task.date < today
}

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(10px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(10px); }
}
.animate-fade {
  animation: fadeInOut 2.2s ease forwards;
}
</style>
