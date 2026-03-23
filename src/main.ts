import { createApp } from 'vue'
import './styles/base.css'
import 'vue-sonner/style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
