<template>
<!-- <div><button @click="StartMonitor">开始监测</button></div> -->
<div class="chart" id="cpuinfo" style="width: 600px;height:400px;margin-bottom: 20px;"></div>
</template>
  
<script>
  import * as echarts from 'echarts';
  import { markRaw } from 'vue';
  export default {
    mounted(){
      //开始即运行
      this.chart = markRaw(echarts.init(document.getElementById('cpuinfo')));
      setInterval(this.fetchData, 2000);
    },
    data(){
      return{
        chart: null,
      }
    },
    methods:{
      // async StartMonitor(){
      //   this.chart = markRaw(echarts.init(document.getElementById('cpuinfo')));
      //   setInterval(this.fetchData, 1000);
      // },
      updateChart() {
      this.chart.setOption({
        xAxis: {
          type: 'category',
          data: this.$store.state.cpuxdata,
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name:"CPU使用率",
          data: this.$store.state.cpuydata,
          type: 'line'
        }],
        tooltip: {
          trigger: 'axis',
          show: true,
        },
      });
      },
      async fetchData(){
        await this.$api.cpu_info().then((params)=>{
          if(params.data.code!=0){
            this.$message({
              message: params.data.msg,
              type: 'error'
            });
            return
          }
          let payload={
            usage:params.data.cpuUsage,
            timestamp:new Date().toLocaleTimeString(),
          }
          this.$store.commit('Pushcpuinfo',payload);
          console.log(this.$store.state.cpuxdata,this.$store.state.cpuydata);
          this.updateChart()

        })
      
      },
    },
  
  };
  </script>

<style>
.chart {
  /* width: 782px; */
  width: calc(50% - 10px);
  height: 432px;
  background: #fafbfd;
  border-radius: 6px;
  border: 1px solid #f0f0f0;
  padding-top: 20px;
}
</style>
  
