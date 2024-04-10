<template>

    <h1>用户信息:</h1>
    <el-table :data="users" height="300" stripe style="width: 100%;margin-top: 20px;">
      <el-table-column prop="Username" fixed label="用户名" width="180" />
      <el-table-column prop="Password" label="密码(加密形式)" width="400" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" @click="handleDeleteClick(scope)"><el-icon><Delete /></el-icon>Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <h1>用户-服务器信息:</h1>
      <el-table :data="sshinfo" height="450" stripe style="width: 100%;margin-top: 20px;">
        <el-table-column prop="Username" fixed label="用户名" width="180" />
        <el-table-column prop="Host" label="ip" width="180" />
        <el-table-column prop="Port" label="端口" width="180" />
        <el-table-column prop="User" label="连接用户" width="180" />
        <el-table-column prop="Password" label="密码" width="180" />
      </el-table>



</template>
    
<script>
import { ElMessage } from 'element-plus';

export default {
  async mounted() {
    await this.$api.users_info().then((param)=>{
        this.users=param.data.users;
      })
      await this.$api.ssh_info().then((param)=>{
        this.sshinfo=param.data.sshinfo;
      })
  },
  data() {
    return {
      users: [],
      sshinfo:[],
    };
  },
  methods: { 
    async handleDeleteClick(scope){
      let res={
        "Username":scope.row.Username,
        "Password":scope.row.Password,
      }
      await this.$api.delete_user(res);
      ElMessage({
        message: '删除成功',
        type: 'success'
      });
      this.users.splice(scope.$index, 1);
    }
  }
  }
</script>