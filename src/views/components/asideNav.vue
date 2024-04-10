<template>
<el-aside >   
         <div style="height: 60px; font-size: 21px; display: flex; align-items: center; justify-content: center;">
           <el-avatar :size="60" :src="bjtu"/>
           <span class="title">ycx's work</span> 
         </div>

         <div class="gradient-divider"></div>

         <el-menu router unique-opened>
          <el-sub-menu v-if=!isAdmin index="1" >
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>任务设定</span>
            </template>
              <el-menu-item index="/initssh">
                <el-icon><House /></el-icon>
                <span>连接服务器</span>
              </el-menu-item>
          </el-sub-menu>

          <el-sub-menu v-if=!isAdmin index="2">
            <template #title>
              <el-icon><VideoCamera /></el-icon>
              <span>监测服务</span>
            </template>

            <el-menu-item index="/cpuinfo">
              <el-icon><Cpu /></el-icon>
             <span>CPU信息</span>
           </el-menu-item>

           <el-menu-item index="/gpuinfo">
            <el-icon><Printer /></el-icon>
             <span>GPU信息</span>
           </el-menu-item>


           <el-menu-item index="/memory">
            <el-icon><DataAnalysis /></el-icon>
             <span>内存信息</span>
           </el-menu-item>
          </el-sub-menu>
          

          <el-sub-menu v-if=!isAdmin index="3">
            <template #title>
              <el-icon><VideoCamera /></el-icon>
              <span>用户行为</span>
            </template>

            <el-menu-item index="/w">
              <el-icon><Cpu /></el-icon>
              用户行为
             <span></span>
           </el-menu-item>

          </el-sub-menu>

          <div v-if=isAdmin>
           <el-menu-item index="/userinfo">
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
   data(){
    return{
      isAdmin:this.$store.state.isAdmin,
      bjtu:src,
    }
   },
 };
 </script>
  
 <style>
 .gradient-divider {
  height: 2px;
  background: linear-gradient(to right, #fff, #6e66c5, #fff);
  margin: 20px 0;
}

 .el-menu{
  background-color: #eee;
  color: #000;
 }
 
 .el-aside {
  background-color: #eee;
  width:190px;
  position: absolute;
  top: 5px;
  height: 99vh;
  box-shadow: 5px 0 6px rgba(15, 14, 14, 0.35); 
 }  

 .title {
   margin-left: 10px; 
 }

 </style>