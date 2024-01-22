import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import * as api from './api/index.js'
import * as alert from './alert/alert.js'


const app=createApp(App)
app.config.globalProperties.$api=api
app.config.globalProperties.$alert=alert
app.use(router)
app.mount('#app')
