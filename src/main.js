import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store'



const app = createApp(App)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

app.use(store).use(router).use(ElementPlus).mount('#app')