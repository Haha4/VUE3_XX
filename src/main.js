import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import './style.css'
import { router } from './router/index.js'
import VxeUIBase from 'vxe-pc-ui'
import 'vxe-pc-ui/es/style.css'
import VxeUITable from 'vxe-table'
import 'vxe-table/es/style.css'
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(createPinia())
app.use(VxeUIBase)
app.use(VxeUITable)
app.mount('#app')
