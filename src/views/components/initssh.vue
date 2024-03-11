<template>
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
        已经初始化了服务器连接！无需重复连接
    </div>
</template>
  
  <script>
  export default {
//    async mounted(){
//       let res={
//             Token:localStorage.getItem('token')
//         }
//       await this.$api.parse_token(res).then((params)=>{
//         res={
//           username:params.data.claims.username
//         }
//       }
//       )
//       await this.$api.user_info_byname(res).then((params)=>{
//         //params.data.user.Ip
//         if(params.data.user.Ip==='')
//         {
//           this.isDatabaseInitialized=false;
//         }else{
//           this.dbInfo.DatabaseName=params.data.user.DatabaseName;
//           this.$api.init_database(params.data.user).then((params)=>{
//           if(params.data.code==0){
//             this.isDatabaseInitialized=true;
//             this.$message({
//               message: '数据库初始化成功',
//               type: 'success'
//             });
//           }
//           else{
//             this.$message({
//               message: params.data.msg.Message,
//               type: 'error'
//             });
//           }
//         }
//         )
//         }
//       }
//       )
//     },

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
  .box1 {
  margin-bottom: 20px; /* 在盒子 1 的底部添加 20px 的外边距 */
}
  .db-initialized {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px; /* 根据需要调整高度 */
  background-color: #f2f2f2; /* 背景颜色 */
  border-radius: 10px; /* 圆角边框 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  margin: 20px; /* 外边距 */
  padding: 20px; /* 内边距 */
}

.db-initialized p {
  font-size: 16px; /* 字体大小 */
  color: #333; /* 字体颜色 */
  margin-bottom: 15px; /* 与按钮的间距 */
}
</style>