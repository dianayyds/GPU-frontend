<template>
    <div v-if="!isDatabaseInitialized" >
      <el-form ref="dbForm" :model="dbInfo" label-width="120px">
        <el-form-item label="IP 地址">
          <el-input v-model="dbInfo.Ip" placeholder="请输入数据库IP地址"></el-input>
        </el-form-item>
        <el-form-item label="端口">
          <el-input v-model="dbInfo.Port" placeholder="请输入数据库端口"></el-input>
        </el-form-item>
        <el-form-item label="账户名">
          <el-input v-model="dbInfo.DatabaseUsername" placeholder="请输入账户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="dbInfo.DatabasePassword" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="数据库名">
          <el-input v-model="dbInfo.DatabaseName" placeholder="请输入数据库名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-else class="db-initialized">
      <div class="box1">您已经初始化了数据库,该数据库为<el-icon><Box /></el-icon>{{dbInfo.DatabaseName }}</div>
      <el-button @click="resetInitialization">重新设置点击这里</el-button>
    </div>
</template>
  
  <script>
  export default {
   async mounted(){
      let res={
            Token:localStorage.getItem('token')
        }
      await this.$api.parse_token(res).then((params)=>{
        res={
          username:params.data.claims.username
        }
      }
      )
      await this.$api.user_info_byname(res).then((params)=>{
        //params.data.user.Ip
        if(params.data.user.Ip==='')
        {
          this.isDatabaseInitialized=false;
        }else{
          this.dbInfo.DatabaseName=params.data.user.DatabaseName;
          this.$api.init_database(params.data.user).then((params)=>{
          if(params.data.code==0){
            this.isDatabaseInitialized=true;
            console.log(params.data.user)
            this.$message({
              message: '数据库初始化成功',
              type: 'success'
            });
          }
          else{
            this.$message({
              message: params.data.msg.Message,
              type: 'error'
            });
          }

        }
        )
        }
      }
      )
    },

    data() {
      return {
        dbInfo: {
          Username: '',
          Password:'',
          Ip: '127.0.0.1', // 设置默认的 IP 地址
          Port: '3306',    // 也可以为其他字段设置默认值，例如默认的端口号
          DatabaseName: '',    // 其他字段可以保留为空或设置相应的默认值
          DatabaseUsername: 'root', // 默认用户名
          DatabasePassword: ''     // 默认密码可以为空，视安全策略而定
        },
        isDatabaseInitialized:false
      };
    },
    methods: {
        resetForm(){
            this.dbInfo.Ip=""
            this.dbInfo.Port=""
            this.dbInfo.DatabaseName=""
            this.dbInfo.DatabaseUsername=""
            this.dbInfo.DatabasePassword=""
        },
      async submitForm() {
        let res={
            Token:localStorage.getItem('token'),
        }
        await this.$api.parse_token(res).then((params)=>{
          this.dbInfo.Username=params.data.claims.username
          this.dbInfo.Password=params.data.claims.password
      }
      )
        await this.$api.init_database(this.dbInfo).then((params)=>{
          if(params.data.code==0){
            this.isDatabaseInitialized=true;
            this.$message({
              message: '数据库初始化成功',
              type: 'success'
            });
          }
          else{
            this.$message({
              message: params.data.msg.Message,
              type: 'error'
            });
          }

        }
        )
      },
      resetInitialization(){
        this.isDatabaseInitialized=false;
      }
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