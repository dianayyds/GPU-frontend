<template>

    <h1>负载数据:</h1>
    <el-table :data="winfo" style="width: 100%">
      <el-table-column prop="cpunum" label="cpu数量" width="180" />
      <el-table-column prop="cpucorenum" label="cpu核心数" width="220" />
      <el-table-column prop="load1min" label="一分钟负载" width="180" />
      <el-table-column prop="load5min" label="五分钟负载" width="180" />
      <el-table-column prop="load15min" label="十五分钟负载" width="180" />
      <el-table-column prop="idealload" label="理想负载" width="180" />
    </el-table>

</template>
    
<script>
import { ElMessage } from 'element-plus';

export default {
  async mounted() {
    await this.$api.w_info().then((param)=>{
        this.winfo[0]=param.data
      })
  },
  data() {
    return {
      winfo:[{}]
    };
  },
  methods: { 

  }
  }
</script>