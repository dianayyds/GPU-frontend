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
                         ref="chartcomponent3"/>
    </div>
    <div class="chart_cpu_usage">
          <smoothLineChart class="chart"
                         ref="chartcomponent2"/>
    </div>
    <div class="chart_cpu_usage">
          <smoothLineChart class="chart"
                         ref="chartcomponent1"/>
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
      chart2: {
      },
      chart3: {
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
      await this.$api.gpu_info().then((params)=>{
        if(params.data.code!=0){
          this.$message({
            message: params.data.msg,
            type: 'error'
          });
          return
        }
        this.$store.commit('Pushgpuinfo',params.data);
      })
      this.updatechart1()
      this.updatechart2()
    },
    initial_chart(){
    if(this.$store.state.powerDraws.length===0)
    {
      const xData = [];
      const yData = [];
      this.chart1 = 
        {
          chartTitle: 'GPU功率(瓦特)',
          xAxisData: xData,
          seriesData: [
          { name: 'GPU功率', type: 'line', data: yData },
          ],
          xAxisName: '时间轴', 
          yAxisName: '瓦', // 设置 yAxisName 的值
          yAxis_min: 0,
          yAxis_max: 300,
          yAxis_interval: 100
        },
        this.$refs.chartcomponent1.updateData(this.chart1);
    }
    else{
      this.updatechart1()
    }
    if(this.$store.state.utilizations.length===0){
      const xData = [];
      const yData = [];
      this.chart2 = 
        {
          chartTitle: 'GPU使用率',
          xAxisData: xData,
          seriesData: [
          { name: 'GPU使用率', type: 'line', data: yData },
          ],
          xAxisName: '时间轴', 
          yAxisName: '%', // 设置 yAxisName 的值
          yAxis_min: 0,
          yAxis_max: 100,
          yAxis_interval: 20
        },
        this.$refs.chartcomponent2.updateData(this.chart2);
    }
    else{
      this.updatechart2()
    }
    if(this.$store.state.temperatures.length===0){
      const xData = [];
      const yData = [];
      this.chart3 = 
        {
          chartTitle: 'GPU温度(摄氏度)',
          xAxisData: xData,
          seriesData: [
          { name: 'GPU温度(摄氏度)', type: 'line', data: yData },
          ],
          xAxisName: '时间轴', 
          yAxisName: '摄氏度', // 设置 yAxisName 的值
          yAxis_min: 0,
          yAxis_max: 100,
          yAxis_interval: 20
        },
        this.$refs.chartcomponent3.updateData(this.chart3);
    }
    else{
      this.updatechart3()
    }
    },
    updatechart1(){
      let tmpgpuinfo = 
            {
              chartTitle: 'GPU功率(瓦特)',
              xAxisData: this.$store.state.gpuxdata,
              seriesData:Object.keys(this.$store.state.powerDraws).map(gpuName => ({
                                              name: gpuName,
                                              type: 'line',
                                              data: this.$store.state.powerDraws[gpuName],})
                                    ),
                xAxisName: '时间轴', 
                yAxisName: '瓦', // 设置 yAxisName 的值
                yAxis_min: 0,
                yAxis_max: 300,
                yAxis_interval: 100
            };
      this.chart1 = tmpgpuinfo;
      this.$refs.chartcomponent1.updateData(this.chart1); 
    },
    updatechart2(){
      let tmpgpuinfo = 
            {
              chartTitle: 'GPU使用率(%)',
              xAxisData: this.$store.state.gpuxdata,
              seriesData:Object.keys(this.$store.state.utilizations).map(gpuName => ({
                                              name: gpuName,
                                              type: 'line',
                                              data: this.$store.state.utilizations[gpuName],})
                                    ),
                xAxisName: '时间轴', 
                yAxisName: '%', // 设置 yAxisName 的值
                yAxis_min: 0,
                yAxis_max: 100,
                yAxis_interval: 20
            };
      this.chart2 = tmpgpuinfo;
      this.$refs.chartcomponent2.updateData(this.chart2); 
    },
    updatechart3(){
      let tmpgpuinfo = 
            {
              chartTitle: 'GPU温度(摄氏度)',
              xAxisData: this.$store.state.gpuxdata,
              seriesData:Object.keys(this.$store.state.temperatures).map(gpuName => ({
                                              name: gpuName,
                                              type: 'line',
                                              data: this.$store.state.temperatures[gpuName],})
                                    ),
                xAxisName: '时间轴', 
                yAxisName: '摄氏度', // 设置 yAxisName 的值
                yAxis_min: 0,
                yAxis_max: 100,
                yAxis_interval: 20
            };
      this.chart3 = tmpgpuinfo;
      this.$refs.chartcomponent3.updateData(this.chart3); 
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


</style>
  