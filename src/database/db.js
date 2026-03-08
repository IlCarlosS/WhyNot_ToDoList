import Dexie from 'dexie';

export const db = new Dexie('WhyNotDB');

// Definimos el esquema de tablas
db.version(1).stores({
  tasks: '++id, title, dueDate, category, status', // id autoincremental
  notes: '++id, title, color, content, createdAt',
  settings: 'key' // Para preferencias del usuario
});