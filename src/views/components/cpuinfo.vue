<template>
  <div>
    <el-table :data="baseinfo" style="width: 100%">
      <el-table-column prop="operatingSystem" label="操作系统" width="180"></el-table-column>
      <el-table-column prop="hostname" label="主机名" width="180"></el-table-column>
      <el-table-column prop="kernelVersion" label="内核版本" width="180"></el-table-column>
      <el-table-column prop="cpuArchitecture" label="CPU架构" width="180"></el-table-column>
      <el-table-column prop="release" label="发行版版本" width="180"></el-table-column>
      <el-table-column prop="host" label="ip地址" width="180"></el-table-column>
    </el-table>
  </div>
  <div class="flex-container">
    
    <div class="chart_cpu_usage">
        <smoothLineChart class="chart"
                         ref="chartcomponent1"
                          />
      </div>
  </div>
  <el-button link type="success" @click="StartMonitor"><el-icon><Open /></el-icon>开始监测</el-button>
  <el-button link type="danger" @click="StopMonitor"><el-icon><TurnOff /></el-icon>停止监测</el-button>
</template>

<script>
import smoothLineChart from './smoothLineChart.vue';
export default{
  components: {
    smoothLineChart,
  },
  data(){
    return{
      baseinfo: [{
      }],
      chart1: {
      },
    }
  },
  async mounted(){
    await this.Getbaseinfo();
    this.initial_chart();
  },
  methods:{
    async Getbaseinfo(){
      await this.$api.base_info().then((params)=>{
        this.baseinfo[0]=params.data;
      })

    },
    async StartMonitor(){
      this.interval = setInterval(this.fetchData, 2000);
    },
    async StopMonitor(){
      clearInterval(this.interval);
    },
    async fetchData(){
      await this.$api.cpu_info().then((params)=>{
        //用户空间使用、系统空间使用和CPU空闲的值,params.data.userUsage|systemUsage|idle
        if(params.data.code!=0){
          this.$message({
            message: params.data.msg,
            type: 'error'
          });
          return
        }
        this.$store.commit('Pushcpuinfo',params.data);
        this.updatechart1();
      })
    },
    initial_chart(){
    if(this.$store.state.userUsages.length===0)
    {
      const xData = [];
      const yData = [];
      this.chart1 = 
        {
          chartTitle: 'CPU利用率(%)',
          xAxisData: xData,
          seriesData: [
          { name: '用户程序占CPU百分比', type: 'line', data: yData },
          { name: '系统程序占CPU百分比', type: 'line', data: yData },
          { name: 'CPU空闲率', type: 'line', data: yData },
          ],
          xAxisName: '时间轴', 
          yAxisName: '%', // 设置 yAxisName 的值
          yAxis_min: 0,
          yAxis_max: 100,
          yAxis_interval: 20
        },
        this.$refs.chartcomponent1.updateData(this.chart1);
    }
    else{
      this.updatechart1();
    }
    },
    updatechart1(){
      let tmpcpuinfo = 
            {
              chartTitle: 'CPU利用率(%)',
              xAxisData: this.$store.state.cpuxdata,
              seriesData: [
              { name: '用户程序占CPU百分比', type: 'line', data: this.$store.state.userUsages },
              { name: '系统程序占CPU百分比', type: 'line', data: this.$store.state.systemUsages },
              { name: 'CPU空闲率', type: 'line', data: this.$store.state.idleUsages },
            ],
            xAxisName: '时间轴', 
            yAxisName: '%', // 设置 yAxisName 的值
            yAxis_min: 0,
            yAxis_max: 100,
            yAxis_interval: 20,
            };
        this.chart1 = tmpcpuinfo;
        this.$refs.chartcomponent1.updateData(this.chart1); 

    },
  }
}
</script>

<style>

  .flex-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-content: space-around;
    padding:0 15px 15px 15px;
  }
  .chart_cpu_usage {
    width: 100%;
    height: 432px;
    background: #fafbfd;
    border-radius: 6px 6px 6px 6px;
    opacity: 1;
    border: 1px solid #f0f0f0;
    margin-top: 20px;
    padding-top: 20px;
  }

  .flex-chart-contain{
  width: 100%;
}

</style>
  