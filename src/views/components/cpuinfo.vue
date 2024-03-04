<template>

<div class="mybutton">
<el-button size="default"  type="success" @click="StartMonitor"><el-icon><Open /></el-icon>开始监测</el-button>
<el-button size="default" type="danger" @click="StopMonitor"><el-icon><TurnOff /></el-icon>停止监测</el-button>
</div>
<div class="nav-container">
<el-select 
    @change="scrollTo"
    filterable
    placeholder="快速前往"
    size="default"
   >
      <el-option
        v-for="item in selectoptions"
        :label="item.label"
        :value="item.value"
      />
  </el-select>
</div>
  <div>
    <el-table :data="baseinfo" style="width: 100%" id="base_info">
      <el-table-column prop="operatingSystem" label="操作系统" width="180"></el-table-column>
      <el-table-column prop="hostname" label="主机名" width="180"></el-table-column>
      <el-table-column prop="kernelVersion" label="内核版本" width="180"></el-table-column>
      <el-table-column prop="cpuArchitecture" label="CPU架构" width="180"></el-table-column>
      <el-table-column prop="release" label="发行版版本" width="180"></el-table-column>
      <el-table-column prop="host" label="ip地址" width="180"></el-table-column>
    </el-table>
  </div>
  <div class="flex-container">
    
    <div class="chart_cpu_usage" id="chart1">
        <smoothLineChart 
                         ref="chartcomponent1"
                          />
      </div>
  </div>
  
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
      interval1:null,
      selectoptions:[
      {
        value: 'base_info',
        label: '服务器信息',
      },
      {
        value: 'chart1',
        label: 'CPU使用率',
      },
      {
        value: 'table',
        label: '统计数据',
      },


      ],
    }
  },
  beforeUnmount() {
    clearInterval(this.interval1);
    this.interval1=null;
  },
  async mounted(){
    await this.Getbaseinfo();
    this.initial_chart();
    if(this.$store.state.ismonitoring===true)
    this.StartMonitor();
    else
    this.StopMonitor();
  },
  methods:{
    async Getbaseinfo(){
      await this.$api.base_info().then((params)=>{
        this.baseinfo[0]=params.data;
      })

    },
    async StartMonitor(){
      this.$store.state.ismonitoring=true;
      if(this.interval1===null)
      this.interval1 = setInterval(this.fetchData, 2000);
    },
    async StopMonitor(){
      this.$store.state.ismonitoring=false;
      clearInterval(this.interval1);
      this.interval1=null;
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
      })
      this.updatechart1();
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
    scrollTo(id){
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    
    }
  }
}
</script>

<style>
.mybutton{
    top:0;
    width:40%;
  }
  .el-select{
    border-color: #409EFF;
    width: 200px;
    height:40px;
  }
  .nav-container{
    width: 100px;
    position: fixed;
    top:90px;
    right:150px;
    z-index: 1000;
  }

  .flex-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-content: space-around;
    padding:0 15px 15px 15px;
  }
  .chart_cpu_usage {
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
  