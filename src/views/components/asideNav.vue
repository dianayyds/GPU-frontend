<!-- Aside.vue -->
<template>
  <el-aside :width="asideWidth">   
         <div style="height: 70px; line-height: 60px; font-size: 20px; display: flex; align-items: center; justify-content: center">
           <el-avatar :size="50" :src="tafei"/>
           <span class="logo-title" v-show="!isCollapse">战斗爽系统</span>
         </div>
         <el-menu router :collapse="isCollapse" :collapse-transition="false" background-color="#001529"
                  active-text-color="#fff" text-color="rgba(255, 255, 255, 0.65)" 
                  style="border: none">
          <el-menu-item index="/initdatabase">
            <el-icon><InfoFilled /></el-icon>
             <span>初始化数据库</span>
           </el-menu-item>

           <el-menu-item index="/cpuinfo">
            <el-icon><InfoFilled /></el-icon>
             <span>CPU信息</span>
           </el-menu-item>

           <el-menu-item index="/gpuinfo">
            <el-icon><location /></el-icon>
             <span>GPU信息</span>
           </el-menu-item>

         </el-menu>
       </el-aside>
 </template>
  
 <script>
import src from '@/assets/tafei_yeah.jpg'
 export default {
   name: 'Aside',
   props: {
     asideWidth: String,
     isCollapse: Boolean
   },
   data(){
    return{
      tafei:src
    }
   }

 };
 </script>
  
  
 <style>

.el-menu-item:hover{
    outline: 0 !important;
    color: #409EFF !important;
}
 /* 侧边栏里面选中菜单的背景色   !important代表这个优先级很高*/
 .el-menu--inline, .el-menu-item {
   background-color: #000c17 !important;
 }
  
 /* 菜单栏一级标题样式 */
 .el-submenu__title {
   height: 40px !important;  /* 一级标题的框整体高度 */
   line-height: 40px !important;  /* 一级标题的字在框里面整体高度 */
   padding: 0 25px !important;    /* 一级标题位置，越大越右 */
   transition: color 10s;      /* 对文字颜色过渡效果时间 */
 }
 /* 菜单栏图标文字对齐样式（去掉也没关系） */
 .el-submenu__title>i:nth-child(1) {
   margin-top: 2px;    /* 用来微调菜单栏里面图标和文字上下对齐的 */
 }
 /* 菜单栏展开箭头样式位置（去掉也没关系） */
 .el-submenu__title>i.el-submenu__icon-arrow {
   margin-top: -5px;
 }
 /* 菜单栏样式（去掉影响也还好） */
 .el-menu-item {
   min-width: 0 !important;   /*允许最小屏幕的宽度  */
   width: calc(100% - 10px);
   margin: 10px;   /*菜单项主键的间距  */
   height: 70px !important;    /*首页菜单高度大小  */
   line-height: 70px !important;    /*二级菜单大小，最好和上面一样  */
   border-radius: 8px;  /*菜单标题的边框添加圆角，越大越圆*/
 }
 /* 菜单栏二级标题左移 （去掉也没关系） */
 .el-menu--inline>.el-menu-item {
   padding-left: 50px !important;
 }
 /* 菜单栏选中的背景颜色（去掉也没关系） */
 .el-menu-item.is-active {
   background-color: dodgerblue !important;
 }
 /* 菜单栏鼠标悬停在二级标题的颜色（去掉也没关系） */
 .el-menu-item:hover {
   color: #fff !important;
 }
 /* 菜单栏鼠标悬停在一级标题的颜色（去掉也没关系） */
 .el-submenu__title:hover *, .el-submenu__title:hover {
   color: #fff !important;
 }
 /* 菜单栏整体的美观样式 */
 .el-aside {
   box-shadow: 5px 0 6px rgba(15, 14, 14, 0.35); /* 菜单栏右侧阴影  0  阴影扩散范围 阴影的颜色 */
   background-color: #001529;   /* 菜单栏整体的背景色 */
   color: #fff;   /* 菜单栏顶部的系统颜色 */
   min-height: 100vh;  /* 菜单栏整体高度 */
   transition: width .3s;  /* 菜单栏展开收缩的整体时间0.3s */
 }
 /* 用于指示侧边栏折叠状态的选中一级图标偏移 */
 .el-menu--collapse .el-tooltip {
   padding: 0 15px !important;
 }
 /*菜单栏logo图标和文字的距离*/
 .logo-title {
   margin-left: 5px;  
   transition: all .3s;
 }
 .el-menu {
   transition: all .3s;
 }
 </style>