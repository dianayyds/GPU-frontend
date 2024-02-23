<template>
  <div class="flex-container">
    
    <div class="chart_cpu_usage">
      <div class="flex-chart-contain">
        
 
        <smoothLineChart style="width: 100%; height: 400px;"
                         class="chart"
                         ref="chartcomponent1"
                         :chartTitle="chart1.chartTitle"
                         :xAxisData="chart1.xAxisData"
                         :seriesData="chart1.seriesData"
                         :xAxisName="chart1.xAxisName"
                         :yAxisName="chart1.yAxisName"
                         :yAxis_min="chart1.yAxis_min"
                         :yAxis_max="chart1.yAxis_max"
                         :yAxis_interval="chart1.yAxis_interval"
                          />
        </div>
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
      chart1: {
        chartTitle: 'CPU利用率',
        xAxisData: [],
        seriesData: [
          { name: '系统占比', type: 'line', values: [] },
        ],
        xAxisName: '时间轴', 
        yAxisName: '%', // 设置 yAxisName 的值
        yAxis_min: null,
        yAxis_max: null,
        yAxis_interval: null
      },
    }
  },
  async mounted(){
    await this.initial_chart();
  },
  methods:{
    async StartMonitor(){
      this.interval = setInterval(this.fetchData, 2000);
    },
    async StopMonitor(){
      clearInterval(this.interval);
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
        // console.log(this.$store.state.cpuxdata,this.$store.state.cpuydata);
        let tmpgpuinfo = 
            {
              chartTitle: 'CPU利用率(%)',
              xAxisData: this.$store.state.cpuxdata,
              seriesData: [
                              { name: '用户程序占CPU百分比', type: 'line', values: this.$store.state.cpuydata },
                              // { name: '系统程序占CPU百分比', type: 'line', values: tmp.YDatas[1].Values },
                          ],
              yAxisName: '%', // 设置 yAxisName 的值
            };
            this.chart1 = tmpgpuinfo;
            this.$refs.chartcomponent1.updateData(this.chart1); 
      })
    },
    initial_chart(){
    const xData = [new Date().toLocaleTimeString()];
    const yData = [0];
    this.chart1 = 
      {
        chartTitle: 'CPU利用率(%)',
        xAxisData: xData,
        seriesData: [
          { name: 'CPU使用率', type: 'line', values: yData },
          // { name: '系统程序占CPU百分比', type: 'line', values: yData },
        ],
        xAxisName: '时间轴', 
        yAxisName: '%', // 设置 yAxisName 的值
        yAxis_min: 0,
        yAxis_max: 100,
        yAxis_interval: 20
      },
      this.$refs.chartcomponent1.updateData(this.chart1);
    }
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
  