import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import * as api from '@/api/index.js'
// import * as alert from '@/alert/alert.js'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/notification/style/css'
import 'element-plus/es/components/message-box/style/css'


const app=createApp(App)
app.config.globalProperties.$api=api
// app.config.globalProperties.$alert=alert
app.use(router)
app.mount('#app')
