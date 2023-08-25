import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.config.globalProperties.$imgUrl = 'https://cdn.staticaly.com/gh/iJieFeng/pic-bed@main'
app.use(createPinia())
app.use(router)

app.mount('#app')
