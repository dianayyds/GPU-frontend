<template>

 <div class="mybutton">
  <el-button size="default"  type="success" @click="refresh"><el-icon><Open /></el-icon>刷新</el-button>
 
  </div>


    <div class="gradient-divider"></div>  
    <h1>负载数据:</h1>
    <el-table :data="winfo" style="width: 100%" border stripe>
      <el-table-column prop="cpunum" label="cpu数量(个)" width="140" />
      <el-table-column prop="cpucorenum" label="cpu核心数(个)" width="180" />
      <el-table-column prop="load1min" label="过去一分钟平均负载(个)" width="180" />
      <el-table-column prop="load5min" label="过去五分钟平均负载(个)" width="180" />
      <el-table-column prop="load15min" label="过去十五分钟平均负载(个)" width="200" />
      <el-table-column prop="idealload" label="理想负载(个)" width="180" />
    </el-table>
    <div class="gradient-divider"></div>

    <h1>用户数据:</h1>
    <el-table :data="users" style="width: 100%" border stripe>
      <el-table-column prop="user" label="用户名" width="100" />
      <el-table-column prop="from" label="来自" width="200" />
      <el-table-column prop="pcpu" label="当前进程占用时间" width="160" />
      <el-table-column prop="what" label="正在执行的命令" width="650" />
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