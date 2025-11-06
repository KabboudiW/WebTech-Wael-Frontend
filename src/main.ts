import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'   // ✅ index.ts is resolved automatically

const app = createApp(App)
app.use(router)
app.mount('#app')
