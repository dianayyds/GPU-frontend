import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import * as api from '@/api/index.js'
import { ElMessage } from "element-plus"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store' 


const app=createApp(App)
app.config.globalProperties.$api=api
app.config.globalProperties.$message = ElMessage;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(router).use(ElementPlus).use(store).mount('#app')
