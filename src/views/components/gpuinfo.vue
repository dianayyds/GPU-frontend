<template>
    <button @click="handle">战斗,爽！</button>
    </template>
      
      <script>
    
      export default {
        async mounted() {
          this.token=localStorage.getItem("token");
          let res={
            Token:this.token
          };
          await this.$api.parse_token(res).then((param)=>{
            this.claims=param.data.claims;
          })
    
        },
        data() {
          return {
            token:"",
            claims:"",
          };
        },
        methods: {
    
          handle() {
            this.$message({
              message: '欢迎'+this.claims.username+' 战斗,爽！',
              type: 'success'
            });
            
          }
    
        }
      };
      </script>