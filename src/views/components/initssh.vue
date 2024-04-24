<template>
  <div>
    <div>
    连接服务器：
    </div>
    
    <div style="margin-top:30px;" v-if="!isSshConnected" @keyup.enter="submitForm" tabindex="0">
      
      <el-form  style="max-width: 300px" ref="dbForm" :model="dbInfo" label-width="auto" >
        <el-form-item label="IP 地址">
          <el-input v-model="sshInfo.Host" placeholder="服务器IP地址"></el-input>
        </el-form-item>
        <el-form-item label="端口">
          <el-input v-model="sshInfo.Port" placeholder="连接端口"></el-input>
        </el-form-item>
        <el-form-item label="账户名">
          <el-input v-model="sshInfo.User" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="sshInfo.Password" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="内存使用率阈值">
          <el-input  v-model="memory_VPT" placeholder="为100则不设置阈值" ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-else>
      <div class="connection-initialized">
      <div class="content">
        <h1><el-icon><SuccessFilled /></el-icon>已连接</h1>
        <p>服务器连接已成功初始化,无需重复连接。</p>
      </div>
  </div>
    </div>
  </div>
</template>
  
<script>
  export default {

    data() {
      return {
        sshInfo: {
            Username:'',
            Host: '211.71.76.205',
            Port:'22',
            User: 'ycx', 
            Password: '20231105',    
        },
        isSshConnected:this.$store.state.isSshConnected,
        memory_VPT:'',
      };
    },
    methods: {
        resetForm(){
            this.sshInfo.Host=""
            this.sshInfo.Port=""
            this.sshInfo.User=""
            this.sshInfo.Password=""
        },
      async submitForm() {
        let token=localStorage.getItem('token')
        await this.$api.parse_token({Token:token}).then((params)=>{
          this.sshInfo.Username=params.data.claims.username
        }
        )
        await this.$api.ssh_connect(this.sshInfo).then((params)=>{
          if(params.data.code==0){
            this.$store.state.isSshConnected=true;
            this.isSshConnected=true;
            this.$message({
              message: '服务器已成功连接,可以开始监测了',
              type: 'success'
            });
          }
          else{
            this.$store.state.isSshConnected=false;
            this.$message({
              message: '服务器连接失败',
              type: 'error'
            });
          }
        }
        )
      },
    }
  };
</script>

<style>

.connection-initialized {
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
}

.content {
  max-width: 500px;
  padding: 20px;
}


</style>