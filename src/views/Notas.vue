<script setup>
import { ref, onMounted, computed } from 'vue'
import { useNoteStore } from '../stores/noteStore'
import NoteCard from '../components/NoteCard.vue'
import NoteModal from '../components/NoteModal.vue'
import NoteModalEdit from '../components/NoteModalEdit.vue'

const noteStore = useNoteStore()
const showModal = ref(false)
const search = ref('')
const showEditModal = ref(false) // estado para el modal de edición
const selectedNote = ref(null)   // Para guardar la nota que queremos editar
const selectedColor = ref('all') // estado para el filtro
const sortBy = ref('az') // Por defecto A -> Z

onMounted(() => {
  noteStore.loadNotes()
})

const openNewNoteModal = () => {
  showModal.value = true
}

const handleEditNote = (note) => {
  selectedNote.value = { ...note } // Copiamos la nota
  showEditModal.value = true       // Abrimos el modal
}

const filteredNotes = computed(() => {
  let notes = [...noteStore.notes]
  
  // 1. Filtro por búsqueda
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    notes = notes.filter(n => 
      n.title.toLowerCase().includes(q) || 
      n.content.toLowerCase().includes(q)
    )
  }
  
  // 2. Filtro por color
  if (selectedColor.value !== 'all') {
    notes = notes.filter(n => n.color === selectedColor.value)
  }

  // 3. ORDENAMIENTO (A-Z / Z-A)
  notes.sort((a, b) => {
    if (sortBy.value === 'az') return a.title.localeCompare(b.title)
    if (sortBy.value === 'za') return b.title.localeCompare(a.title)
    return 0
  })

  return notes
})

</script>

<template>
    <div class="max-w-5xl mx-auto p-6">
        <div class="p-6 max-w-7xl mx-auto">
            <header class="mb-10">
                <h2 class="text-4xl font-bold text-bg-dark tracking-tight">Mis Notas</h2>
                <p class="text-gray-500 text-lg">Organiza tu día, un paso a la vez.</p>
            </header>
            
            <div class="flex flex-col lg:flex-row gap-4 mb-6 items-center">
                <div class="relative flex-1 w-full">
                    <input 
                    v-model="search"
                    type="text" 
                    placeholder="Buscar notas por título o contenido..." 
                    class="w-full bg-white border-none p-4 pl-12 rounded-custom shadow-sm focus:ring-2 focus:ring-accent outline-none text-lg"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>

                <select 
                    v-model="sortBy"
                    class="bg-white px-4 py-4 rounded-custom shadow-sm text-gray-600 focus:ring-2 focus:ring-accent outline-none cursor-pointer w-full lg:w-48 text-sm font-medium"
                >
                    <option value="az">Orden: A → Z</option>
                    <option value="za">Orden: Z → A</option>
                </select>

                <button 
                    @click="openNewNoteModal"
                    class="w-full lg:w-auto !bg-accent text-white px-8 py-4 rounded-custom font-bold hover:scale-105 transition-all flex items-center justify-center shadow-lg shadow-accent/20 whitespace-nowrap"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
                    Nueva Nota
                </button>
            </div>

            <div class="flex items-center gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide bg-gray-50/50 p-4 rounded-2xl">
                <span class="text-gray-600 text-base font-semibold mr-2">Filtrar por color:</span>
                
                <button 
                    @click="selectedColor = 'all'"
                    :class="[
                    'px-5 py-2 rounded-full text-sm font-bold transition-all border shadow-sm',
                    selectedColor === 'all' 
                        ? 'bg-white text-accent border-accent' 
                        : 'text-gray-400 border-gray-200 bg-white hover:border-gray-400'
                    ]"
                >
                    Todas
                </button>

                <button 
                    v-for="color in noteStore.availableColors" 
                    :key="color.class"
                    @click="selectedColor = color.class"
                    :class="[
                    color.class,
                    'w-8 h-8 rounded-full border-2 transition-all flex-shrink-0 shadow-sm',
                    selectedColor === color.class ? 'border-bg-dark scale-125 ring-4 ring-accent/10' : 'border-white/50 opacity-80 hover:opacity-100'
                    ]"
                    :title="color.name"
                ></button>
            </div>
        </div>
        
        <div 
            v-if="noteStore.notes.length === 0" 
            class="flex flex-col items-center justify-center py-20 text-center animate-fade-in"
            >
            <div class="w-48 h-48 mb-8 opacity-30">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full text-gray-400">
                <path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/>
                <path d="M15 3v6h6"/>
                <line x1="9" x2="15" y1="13" y2="13"/>
                <line x1="9" x2="15" y1="17" y2="17"/>
                </svg>
            </div>
            <h3 class="text-2xl font-semibold text-gray-400 mb-2">Mente en blanco...</h3>
            <p class="text-gray-500 max-w-xs mx-auto">
                ¿Alguna idea brillante? No dejes que se escape. Escribe tu primera nota para empezar a organizar tus pensamientos.
            </p>
        </div>

        <div 
            v-else-if="filteredNotes.length === 0" 
            class="text-center py-20 text-gray-500"
            >
            <p class="text-lg italic">No encontramos notas que coincidan con esos filtros.</p>
            <button @click="search = ''; selectedColor = 'all'" class="text-accent hover:underline mt-2">
                Limpiar filtros
            </button>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <NoteCard 
                v-for="note in filteredNotes" 
                :key="note.id" 
                :note="note"
                @edit="handleEditNote"
            />
        </div>

        <!-- <div v-if="filteredNotes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <NoteCard 
                v-for="note in filteredNotes" 
                :key="note.id" 
                :note="note"
                @edit="handleEditNote"
            />
            </div>

            <div v-else class="text-center py-20 text-gray-500">
            <p class="text-lg italic">No hay notas que coincidan con tu búsqueda.</p>
        </div> -->

        <NoteModal :show="showModal" @close="showModal = false" />

        <NoteModalEdit 
            :show="showEditModal" 
            :noteToEdit="selectedNote" 
            @close="showEditModal = false" 
        />
        
    </div>
</template>