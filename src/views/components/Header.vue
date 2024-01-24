<!-- Header.vue -->
<template>
  <el-header background-color="#001529" style="height: 60px; display: flex; align-items: center; box-shadow: 2px 0 6px rgba(0, 21, 41, .35);">
          <el-avatar
          :size="32"
          class="mr-3"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span class="text-large font-600 mr-3"> 尊敬的{{username}}用户,你好 </span>

          <div style="flex: 1; display: flex; justify-content: flex-end; align-items: center">
              <div style="display: flex; align-items: center; cursor: pointer">
                <el-button type="primary" round @click="log_out" >
                  <el-icon><HomeFilled /></el-icon>
                  登出
                </el-button>
              </div>
          </div>
    </el-header>  
</template>
 
<script>
export default {
  async mounted(){
    let token=localStorage.getItem('token')
    let res={
          Token:token
      }
    await this.$api.parse_token(res).then((params)=>{
      console.log("layout-params",params)
      this.username=params.data.claims.username
    }
    )
  },
  data(){
    return{
      username:''
    }
  },
  name: 'Header',
  methods:{
    log_out(){
      this.$router.push('/')
    }

  }
};
</script>
 
<style>
 
</style>