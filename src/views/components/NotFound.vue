<template>
    <div class="not-found">
      <h1>404</h1>
      <p>抱歉，您访问的页面不存在。</p>
      <router-link to="/">返回首页</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound'
  }
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    padding: 50px;
    margin-top: 100px;
  }
  
  .not-found h1 {
    font-size: 150px;
    margin-bottom: 40px;
  }
  
  .not-found p {
    font-size: 20px;
    margin-bottom: 20px;
  }
  </style>