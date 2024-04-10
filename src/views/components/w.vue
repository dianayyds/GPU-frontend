<template>

 <div class="mybutton">
  <el-button size="default"  type="success" @click="refresh"><el-icon><Open /></el-icon>刷新</el-button>
 
  </div>


    <div class="gradient-divider"></div>  
    <h1>负载数据:</h1>
    <el-table :data="winfo" style="width: 100%">
      <el-table-column prop="cpunum" label="cpu数量" width="180" />
      <el-table-column prop="cpucorenum" label="cpu核心数" width="220" />
      <el-table-column prop="load1min" label="一分钟内负载" width="180" />
      <el-table-column prop="load5min" label="五分钟内负载" width="180" />
      <el-table-column prop="load15min" label="十五分钟内负载" width="180" />
      <el-table-column prop="idealload" label="理想负载" width="180" />
    </el-table>
    <div class="gradient-divider"></div>

    <h1>用户数据:</h1>
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="user" label="用户名" width="100" />
      <el-table-column prop="tty" label="连接方式" width="100" />
      <el-table-column prop="idle" label="最后一次执行操作的时间" width="180" />
      <el-table-column prop="jcpu" label="占用cpu时间" width="220" />
      <el-table-column prop="what" label="正在执行的命令" width="530" />
    </el-table>


</template>
    
<script>

export default {
  async mounted() {
    await this.refresh()
  },
  data() {
    return {
      winfo:[{}],
      users:[{}]
    };
  },
  methods: { 
    async refresh(){
      await this.$api.w_info().then((param)=>{
        this.winfo[0]=param.data
        this.users=param.data.users

        this.$message({
        message: '用户信息获取成功',
        type: 'success'
        });


      })
    }
  }
  }
</script>

<style>

.gradient-divider {
  height: 2px;
  background: linear-gradient(to right, #fff, #6e66c5, #fff);
  margin: 20px 0;
}
.mybutton{
    top:0;
    width:40%;
  }

</style>