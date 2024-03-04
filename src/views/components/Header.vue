<!-- Header.vue -->
<template>
  <el-header>
          <el-avatar
          :size="32"
          class="mr-3"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span class="text-large font-600 mr-3" v-if=isAdmin> 尊敬的管理员用户,您好 </span>
        <span class="text-large font-600 mr-3" v-if=!isAdmin> 尊敬的{{username}}用户,您好 </span>

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
    if(!this.isAdmin){
      let token=localStorage.getItem('token')
      let res={
            Token:token
        }
      await this.$api.parse_token(res).then((params)=>{
        this.username=params.data.claims.username
      }
      )
    }
    
  },
  data(){
    return{
      isAdmin:this.$store.state.isAdmin,
      username:''
    }
  },
  name: 'Header',
  methods:{
    log_out(){
      localStorage.removeItem('token')
      this.$store.commit('ResetStore')
      this.$router.go(0);
      this.$router.push('/')
      
    }

  }
};
</script>
 
<style>
 .el-header{
  left: 200px;
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  display: flex; 
  align-items: center; 
  box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
  height: 60px; 
  width:85.5%;
 }
</style>