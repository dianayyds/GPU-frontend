import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import * as api from '@/api/index.js'
// import * as alert from '@/alert/alert.js'
import { ElMessage } from "element-plus";
import 'element-plus/dist/index.css'

const app=createApp(App)
app.config.globalProperties.$api=api
app.config.globalProperties.$message = ElMessage;

// app.config.globalProperties.$alert=alert
app.use(router)
app.mount('#app')
