Aside.vue
<template>
  <el-aside >   
         <div style="height: 80px; font-size: 21px; display: flex; align-items: center; justify-content: center">
           <el-avatar :size="60" :src="bjtu"/>
           <span class="title">ycx's work</span>
         </div>
         <div class="gradient-line"></div>
         <el-menu router 
         background-color="#6d9cc2"
         active-text-color="#fff" 
         text-color="rgba(255, 255, 255, 0.65)" >

          <div v-if=!isAdmin>
          <el-menu-item index="/initssh">
            <el-icon><InfoFilled /></el-icon>
             <span>连接服务器</span>
           </el-menu-item>
          </div>

          <div v-if=!isAdmin>
           <el-menu-item index="/cpuinfo">
            <el-icon><InfoFilled /></el-icon>
             <span>CPU信息</span>
           </el-menu-item>
          </div>

          <div v-if=!isAdmin>
           <el-menu-item index="/gpuinfo">
            <el-icon><InfoFilled /></el-icon>
             <span>GPU信息</span>
           </el-menu-item>
          </div>

          <div v-if=isAdmin>
           <el-menu-item index="/Userinfo">
            <el-icon><location /></el-icon>
             <span>用户信息</span>
           </el-menu-item>
          </div>
         </el-menu>
  </el-aside>
 </template>
  
 <script>
import src from '@/assets/bjtu.jpg'
 export default {
   props: {
     asideWidth: String,
   },
   data(){
    return{
      isAdmin:this.$store.state.isAdmin,
      bjtu:src,
    }
   }

 };
 </script>
  
  
 <style>
 .gradient-line {
  height: 2px; /* 分界线的高度 */
  background: linear-gradient(to right, rgba(255,255,255,0), rgba(0,0,0,0.75), rgba(255,255,255,0)); /* 渐变效果 */
  margin: 20px 0; /* 根据需要调整上下边距来放置分界线 */
}
 /* 菜单栏选中的背景颜色 */
 .el-menu-item.is-active {
   background-color: rgb(55, 84, 123) ;
 }
 /* 菜单栏鼠标悬停在二级标题的颜色 */
 .el-menu-item:hover {
   color: #fff;
 }
 /* 菜单栏鼠标悬停在一级标题的颜色 */
 .el-submenu__title:hover *, .el-submenu__title:hover {
   color: #fff;
 }
 /* 菜单栏整体的美观样式 */
 .el-aside {
  width:200px;
  display: block;
  position: absolute;
  left: 0;
  top: 5px;
  bottom: 0;
  box-shadow: 5px 0 6px rgba(15, 14, 14, 0.35); /* 菜单栏右侧阴影  0  阴影扩散范围 阴影的颜色 */
  background-color: #6d9cc2;   /* 菜单栏整体的背景色 */
 }  
 /*菜单栏logo图标和文字的距离*/
 .title {
   margin-left: 10px; 
 }

 </style>