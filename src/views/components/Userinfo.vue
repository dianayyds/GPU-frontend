<template>
    <el-table :data="users" height="650" stripe style="width: 100%">
      <el-table-column prop="Username" fixed label="用户名" width="180" />
      <el-table-column prop="Password" label="密码(加密形式)" width="500" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button link type="primary" @click="handleDeleteClick(scope)"><el-icon><Delete /></el-icon>Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
        
        <script>
      
        export default {
          async mounted() {
            await this.$api.users_info().then((param)=>{
                console.log("users:",param.data.users);
                this.users=param.data.users;
              })
          },
          data() {
            return {
              users: []
            };
          },
          methods: { 
            async handleDeleteClick(scope){
              let res={
                "Username":scope.row.Username,
                "Password":scope.row.Password,
              }
              await this.$api.delete_user(res)
              this.users.splice(scope.$index, 1);
            }
          }
          }
        </script>