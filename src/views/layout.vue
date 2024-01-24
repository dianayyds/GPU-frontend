<!-- 左右结构，左边是菜单栏、右边是一个大盒子分为通用顶部（上）和变换的主体（下） -->
<template>
    <el-container>

      <Aside :asideWidth="asideWidth" :isCollapse="isCollapse" />
      <div style="width: 100%;flex-wrap: wrap;">
      <Header :collapseIcon="collapseIcon" :handleCollapse="handleCollapse" />
        <el-main>
          <router-view />  <!-- 表示当前页面的子路由会在<router-view />里面展示      -->
        </el-main>
      </div>
    </el-container>
</template>
 
<script>
import Aside from '@/views/components/asideNav.vue';
import Header from '@/views/components/Header.vue';
 
export default {
  components: {
    Aside,
    Header,
  },
  data() {
    return {
      test:"test",
      isCollapse: false,   //展开
      asideWidth: '200px',   //侧边栏默认值为200
      collapseIcon: 'el-icon-s-fold'   //展开图标箭头向左
    };
  },
  methods: {
  handleCollapse() {
    this.isCollapse = !this.isCollapse;
    if (this.isCollapse) {     //折叠图标
      this.asideWidth = '64px';
      this.collapseIcon = 'el-icon-s-unfold';
    } else {
      this.asideWidth = '200px';    //展开图标
      this.collapseIcon = 'el-icon-s-fold';
    }
  }
}
 
};
</script>