<!-- 左右结构，左边是菜单栏、右边是一个大盒子分为通用顶部（上）和变换的主体（下） -->
<template>
  <el-container>
    <AsideNav />
    <Header />
      <el-main>
        <router-view></router-view>
      </el-main>
  </el-container>
</template>

<script>
import AsideNav from '@/views/components/AsideNav.vue';
import Header from '@/views/components/Header.vue';

export default {
components: {
  AsideNav,
  Header,
},
data() {
  return {
    username:"",
  };
},

};
</script>

<style>
.el-main{
  position: absolute;
  left: 200px;
  right: 0;
  top: 70px;
  bottom: 0;
}
</style>