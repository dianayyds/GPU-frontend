<template>
  <el-table :data="users" height="650" stripe style="width: 100%">
    <el-table-column prop="Username" label="用户名" width="180" />
    <el-table-column prop="Password" label="密码(加密形式)" width="500" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button color="#626aef" @click="handleDeleteClick" plain>Delete</el-button>
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
          handleDeleteClick(){
            console.log("delete");
          }
        }
        }
      </script>