import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'

import './style.css'

import '../node_modules/flowbite-vue/dist/index.css'
createApp(App)
.use(router)
.mount('#app')
