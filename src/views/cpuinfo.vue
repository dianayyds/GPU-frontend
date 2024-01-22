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
        console.log(param.data);
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
        
        this.$alert.put(this.claims.username+"用户 你好！");
      }

    }
  };
  </script>
  
