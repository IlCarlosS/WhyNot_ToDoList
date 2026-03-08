import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css' 

//instancia de la aplicación
const app = createApp(App)

//plugins (Pinia y Router)
app.use(createPinia())
app.use(router)

app.mount('#app')