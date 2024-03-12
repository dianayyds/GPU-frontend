<template>
  <div style="background-color: #eee;">
    <div v-if="!isSshConnected" @keyup.enter="submitForm" tabindex="0">
      <el-form ref="dbForm" :model="dbInfo" label-width="120px" >
        <el-form-item label="IP 地址">
          <el-input v-model="sshInfo.host" placeholder="请输入服务器IP地址"></el-input>
        </el-form-item>
        <el-form-item label="端口">
          <el-input v-model="sshInfo.port" placeholder="请输入连接端口"></el-input>
        </el-form-item>
        <el-form-item label="账户名">
          <el-input v-model="sshInfo.user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="sshInfo.password" placeholder="请输入密码" type="password"></el-input>
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
        <el-button @click="GOTOsystem">前往监测系统</el-button>
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
            host: '211.71.76.205',
            port:'22',
            user: 'ycx', 
            password: '20231105',    
        },
        isSshConnected:this.$store.state.isSshConnected,
      };
    },
    methods: {
        GOTOsystem(){
          this.$router.push('/gpuinfo')
        },
        resetForm(){
            this.sshInfo.host=""
            this.sshInfo.port=""
            this.sshInfo.user=""
            this.sshInfo.password=""
        },
      async submitForm() {
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