<!-- Header.vue -->
<template>
  <div class="aa">
  <el-header style="height: 60px; display: flex; align-items: center; box-shadow: 2px 0 6px rgba(0, 21, 41, .35);">
          <el-icon><location /></el-icon>
          <div style="flex: 1; display: flex; justify-content: flex-end; align-items: center">
              <div style="display: flex; align-items: center; cursor: pointer">
                <img src="@/assets/logo.png" style="width: 30px;" alt="">
                <el-button type="primary" round @click="log_out">登出</el-button>
              </div>
          </div>
    </el-header>
      </div>
</template>
 
<script>
export default {
  name: 'Header',
  props: {

  }
};
</script>
 
<style>
 
</style>