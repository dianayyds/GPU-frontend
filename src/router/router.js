import { createRouter, createWebHashHistory } from 'vue-router'
import * as api from '@/api/index.js'
import { ElMessage } from "element-plus"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const routes = [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/components/NotFound.vue'),
  },
  {
    path: '/',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/layout',
    component: () => import('@/views/layout.vue'),
    meta: {
       requiresAuth: true 
      },
      children:[
        {
          path: '/userinfo',
          component: () => import('@/views/components/userinfo.vue'),
          meta: {
             requiresAuth: true 
            }
        },
        {
          path: '/gpuinfo',
          component: () => import('@/views/components/gpuinfo.vue'),
          meta: {
             requiresAuth: true 
            }
        },
        {
          path: '/cpuinfo',
          component: () => import('@/views/components/cpuinfo.vue'),
          meta: {
             requiresAuth: true 
            }
        },
        {
          path: '/initssh',
          component: () => import('@/views/components/initssh.vue'),
          meta: {
             requiresAuth: true 
            }
        },
        {
          path: '/memory',
          component: () => import('@/views/components/memory.vue'),
          meta: {
             requiresAuth: true 
            }
        },
        {
          path: '/w',
          component: () => import('@/views/components/w.vue'),
          meta: {
             requiresAuth: true 
            }
        },
      ]
  },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) { //检查即将进入的目标路由（包括其所有嵌套的父路由）中，是否有任何一条路由记录在其元信息（meta）中标记了 requiresAuth
    // 获取token
    const token = localStorage.getItem('token');
    if (!token) { // token不存在，则跳转到登录页
      ElMessage({
        type: 'error',
        message: '请先登录',
      })
      next('/');
    } else { // token存在，验证是否过期
      if(token==='admin'){
        next();
        return
      }
      let res={
          Token:token
      }
      api.parse_token(res).then((param)=>{
          let now = parseInt(new Date().getTime() / 1000) + '';
          if(param.data.code===1)
          {
            ElMessage({
              type: 'error',
              message: '密钥已经过期,请重新登录',
            })
            next('/');
          }
          else if(now<param.data.claims.exp){
              NProgress.start();
              next();
          }
          else{
            ElMessage({
              type: 'error',
              message: '密钥不合法',
            })
            next('/');
          }
      })
    }
  } 
  else {
    next(); // 不需要进行鉴权，直接进行下一步路由
  }
});

router.afterEach(() => {
  NProgress.done(); // 完成进度条
});

export default router
