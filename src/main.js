import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import './style.css'
import { router } from './router/index.js'
console.log('App',App)
const app = createApp(App)
console.log('router',router)

app.use(ElementPlus)
app.use(router)
app.use(createPinia())
app.mount('#app')
