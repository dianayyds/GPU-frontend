import { createRouter, createWebHashHistory } from 'vue-router'
import index from '@/views/index.vue'
import cpuinfo from '@/views/cpuinfo.vue'

const routes = [
  {
    path: '/',
    component: index
  },
  {
    path: '/cpuinfo',
    component: cpuinfo,
    meta: {
       requiresAuth: true 
      }
  },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
