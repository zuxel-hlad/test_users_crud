import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Icon } from '@iconify/vue'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import { vTooltip } from 'floating-vue'
import App from './App.vue'
import router from './router'

import 'floating-vue/dist/style.css'
import 'vue3-toastify/dist/index.css'
import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(Vue3Toastify, {
    autoClose: 3000,
} as ToastContainerOptions)

app.directive('tooltip', vTooltip)
app.use(router)
app.component('AppIcon', Icon)
app.mount('#app')
