import { createApp } from 'vue'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import App from './App.vue'
import router from './router'

import 'vue3-toastify/dist/index.css'
import './assets/main.css'

const app = createApp(App)

app.use(Vue3Toastify, {
    autoClose: 3000,
} as ToastContainerOptions)
app.use(router)
app.mount('#app')
