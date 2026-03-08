# Why Not? Gestión de Tareas y Notas
Una aplicación web de gestión personal diseñada para eliminar el "ruido" visual y reducir la ansiedad que suelen provocar las listas de tareas interminables.

## Filosofía UI/UX: El Enfoque "Anti-Ansiedad"
A diferencia de otras herramientas de productividad que saturan al usuario con notificaciones y dashboards complejos, TaskFlow se basa en tres pilares de diseño:

- Minimalismo Cognitivo: Una interfaz limpia con amplios espacios en blanco (o espacios oscuros en nuestro caso) para que el cerebro se enfoque en una sola cosa a la vez.
- Psicología del Color: El uso de colores de acento personalizables permite al usuario adaptar el entorno a su estado de ánimo, moviéndose entre la calma del azul o la energía del naranja.
- Jerarquía Visual Clara: Diferenciamos claramente entre "Notas" (ideas volátiles) y "Tareas" (compromisos con fecha), evitando que el usuario sienta que todo es urgente.

## Stack Tecnológico
- Vue 3 (Vite): Framework principal con Composition API para una reactividad fluida.
- Tailwind CSS v4: Estilizado de última generación utilizando variables CSS dinámicas.
- Pinia: Gestión de estado global para sincronizar tareas, notas y configuración.
- Dexie.js: Capa sobre IndexedDB para persistencia de datos local robusta.
- Date-fns: Manipulación precisa de fechas y manejo de zonas horarias.
- Lenguajes de programación: HTML, CSS, JS.

## Estructura del Proyecto
```
src/
├── assets/          # Estilos globales (main.css) y recursos estáticos.
├── components/      # Componentes reutilizables (Modales, Cards).
├── router/          # Configuración de rutas (Vue Router).
├── stores/          # Estados globales con Pinia (taskStore, configStore).
├── views/           # Vistas principales (Tareas.vue, Notas.vue, Calendario.vue).
└── App.vue          # Componente raíz con el Layout principal y Sidebar.
```

## Lógica y Características Clave
### Motor de Temas Dinámico
Sistema de Variables CSS en tiempo real. A través del configStore, el usuario puede inyectar colores hexadecimales directamente en el :root del DOM.

Reto técnico: Superar la especificidad de Tailwind v4 mediante utilidades personalizadas (!bg-accent) para asegurar que el cambio de color sea atómico en todos los componentes.

### Gestión de Tareas Dinámica (Tareas.vue)
El flujo de tareas no es una simple lista estática; está diseñado para ser un centro de control reactivo y libre de estrés:

- Filtrado por Estados: Implementamos una lógica de propiedades computadas que segmenta las tareas en "Todas", "Pendientes" y "Completadas" de forma instantánea, permitiendo al usuario enfocarse solo en lo que importa en el momento.
- Psicología del "Empty State": Integramos un estado de vacío inteligente. Si no hay tareas, el sistema no muestra un espacio en blanco aburrido, sino un mensaje de refuerzo positivo ("Momento de calma") que reduce la presión psicológica del usuario.
- Sincronización de Prioridades: Cada tarea hereda el color de acento global para mantener la armonía visual, pero permite una identificación rápida mediante categorías visuales.

### Captura de Ideas Fluida (Notas.vue)
Esta sección actúa como una "caja de ideas" rápido para evitar la sobrecarga cognitiva:

- Arquitectura de Rejilla Flexible: Las notas se organizan en una estructura de grid que se adapta al contenido, permitiendo una visualización rápida de múltiples pensamientos sin jerarquías rígidas.
- Categorización Visual: Cada nota puede ser etiquetada con colores específicos, lo que permite al cerebro clasificar información de un vistazo (por ejemplo: amarillo para ideas, rojo para urgencias).
- Persistencia Atómica: Cada vez que una nota se crea o edita, se sincroniza individualmente con el Store y la base de datos local, asegurando que ninguna idea se pierda aunque se cierre el navegador inesperadamente.

### Calendario Inteligente (Calendario.vue
- Normalización de fechas: Manejo de desfases UTC para asegurar que las tareas aparezcan en el día correcto según la zona horaria local del usuario.
- Resumen Diario: Una función de filtrado computado que muestra detalles específicos al hacer clic en cualquier día del mes.

### Persistencia Offline First
Gracias a Dexie.js, la aplicación funciona completamente offline. Los datos se guardan en el navegador del usuario, garantizando privacidad y velocidad sin necesidad de un backend complejo.

## Instalación y Uso
Puedes usar la App Web desde tu navegador, mediante el siguente enlace:
```
https://ilcarloss.github.io/WhyNot_ToDoList/
```
o instalar en para su uso y modificación local.
1. Clona el repositorio:
```
git clone https://github.com/tu-usuario/nombre-repo.git
```
2. Instala las dependencias:
```
npm install
```
3. Ejecuta en modo desarrollo:
```
npm run dev
```
4. Construye para producción:
```
npm run build
```
## Licencia
Este proyecto es de código abierto bajo la licencia MIT. ¡Siéntete libre de usarlo y mejorarlo!
