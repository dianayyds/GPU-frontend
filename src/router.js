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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) { //检查即将进入的目标路由（包括其所有嵌套的父路由）中，是否有任何一条路由记录在其元信息（meta）中标记了 requiresAuth
    // 获取token
    const token = localStorage.getItem('token');
  //   console.log('守卫路由',token)
    if (!token) { // token不存在，则跳转到登录页
      next('/');
      alert.put("请先登录")
    } else { // token存在，则进行下一步路由
      let res={
          Token:token
      }
      api.parse_token(res).then((param)=>{
          let now = parseInt(new Date().getTime() / 1000) + '';
          if(now<param.data.claims.exp){
              next();
          }
          else{
              alert.put("权限已经过期,请重新登录")
          }
      })
      
    }
  } else {
    next(); // 不需要进行鉴权，直接进行下一步路由
  }
});

export default router
