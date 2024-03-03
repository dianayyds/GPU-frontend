<template>
  
    <div class="mybutton">

    <el-button size="medium"  type="success" @click="StartMonitor"><el-icon><Open /></el-icon>开始监测</el-button>
    <el-button size="medium" type="danger" @click="StopMonitor"><el-icon><TurnOff /></el-icon>停止监测</el-button>

  </div>
  <div class="nav-container">
    <el-select 
        @change="scrollTo"
        filterable
        placeholder="快速前往"
        size="medium"
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
                         ref="chartcomponent3"/>
    </div>
    <div class="chart_cpu_usage" id="chart2">
          <smoothLineChart 
                         ref="chartcomponent2"/>
    </div>
    <div class="chart_cpu_usage" id="chart3">
          <smoothLineChart 
                         ref="chartcomponent1"/>
    </div>
    </div>

  

  <el-table  :data="tableData1" style="width: 100%">
    <el-table-column label="GPU温度(摄氏度)">
      <el-table-column prop="name" label="GPU编号"  />
      <el-table-column prop="avg" label="平均值"  />
      <el-table-column prop="max" label="最大值" />
      <el-table-column prop="min" label="最小值"  />
      <el-table-column prop="var" label="方差"  />
      <el-table-column prop="sd" label="标准差"  />
    </el-table-column>
  </el-table>
  <br>

  <el-table  :data="tableData2" style="width: 100%">
    <el-table-column label="GPU使用率(%)">
      <el-table-column prop="name" label="GPU编号"  />
      <el-table-column prop="avg" label="平均值"  />
      <el-table-column prop="max" label="最大值" />
      <el-table-column prop="min" label="最小值"  />
      <el-table-column prop="var" label="方差"  />
      <el-table-column prop="sd" label="标准差"  />
    </el-table-column>
  </el-table>
  <br>

  <el-table  id="table" :data="tableData3" style="width: 100%">
    <el-table-column label="GPU功率(瓦特)">
      <el-table-column prop="name" label="GPU编号"  />
      <el-table-column prop="avg" label="平均值"  />
      <el-table-column prop="max" label="最大值" />
      <el-table-column prop="min" label="最小值"  />
      <el-table-column prop="var" label="方差"  />
      <el-table-column prop="sd" label="标准差"  />
    </el-table-column>
  </el-table>
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
      ifTable:false,
      tableData1 : [
      ],
      tableData2 : [
      ],
      tableData3 : [
      ],
      selectoptions:[
      {
        value: 'base_info',
        label: '服务器信息',
      },
      {
        value: 'chart1',
        label: 'GPU温度',
      },
      {
        value: 'chart2',
        label: 'GPU使用率',
      },
      {
        value: 'chart3',
        label: 'GPU功率',
      },
      {
        value: 'table',
        label: '统计数据',
      },


      ],
      interval1: null,
      interval2: null,
    }
  },
  async mounted(){
    await this.Getbaseinfo();
    this.initial_chart();
    this.updatetable();
  },
  methods:{
    async Getbaseinfo(){
      await this.$api.base_info().then((params)=>{
        this.baseinfo[0]=params.data;
        this.baseinfo[0].pre="基本信息:"
      })

    },
    async StartMonitor(){
      this.updatetable();
      this.fetchData();
      this.interval1 = setInterval(this.fetchData, 2000);
      this.interval2 = setInterval(this.updatetable, 10000);
    },
    async StopMonitor(){
      clearInterval(this.interval1);
      clearInterval(this.interval2);
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
      this.updatechart()
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
    updatetable(){
      this.tableData1 = Object.keys(this.$store.state.temperatures).map(gpuName => {
      const temperatures = this.$store.state.temperatures[gpuName];
      const avg = temperatures.reduce((a, b) => a + b, 0) / temperatures.length;
      // 计算方差
      const varSum = temperatures.reduce((a, b) => a + (b - avg) ** 2, 0);
      const variance = varSum / temperatures.length;
      // 计算标准差
      const standardDeviation = Math.sqrt(variance);
      return {
        name: gpuName,
        avg: parseFloat(avg.toFixed(2)),
        max: Math.max(...temperatures),
        min: Math.min(...temperatures),
        var: parseFloat(variance.toFixed(2)),  // 方差
        sd: parseFloat(standardDeviation.toFixed(2))  // 标准差
      };
      });
      this.tableData2 = Object.keys(this.$store.state.utilizations).map(gpuName => {
            const utilizations = this.$store.state.utilizations[gpuName];
            const avg = utilizations.reduce((a, b) => a + b, 0) / utilizations.length;
            // 计算方差
            const varSum = utilizations.reduce((a, b) => a + (b - avg) ** 2, 0);
            const variance = varSum / utilizations.length;
            // 计算标准差
            const standardDeviation = Math.sqrt(variance);
            return {
              name: gpuName,
              avg: parseFloat(avg.toFixed(2)),
              max: Math.max(...utilizations),
              min: Math.min(...utilizations),
              var: parseFloat(variance.toFixed(2)),  // 方差
              sd: parseFloat(standardDeviation.toFixed(2))  // 标准差
            };
      });
      this.tableData3 = Object.keys(this.$store.state.powerDraws).map(gpuName => {
            const powerDraws = this.$store.state.powerDraws[gpuName];
            const avg = powerDraws.reduce((a, b) => a + b, 0) / powerDraws.length;
            // 计算方差
            const varSum = powerDraws.reduce((a, b) => a + (b - avg) ** 2, 0);
            const variance = varSum / powerDraws.length;
            // 计算标准差
            const standardDeviation = Math.sqrt(variance);
            return {
              name: gpuName,
              avg: parseFloat(avg.toFixed(2)),
              max: Math.max(...powerDraws),
              min: Math.min(...powerDraws),
              var: parseFloat(variance.toFixed(2)),  // 方差
              sd: parseFloat(standardDeviation.toFixed(2))  // 标准差
            };
      });

    },
    updatechart(){
      this.updatechart1()
      this.updatechart2()
      this.updatechart3()
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
    /* flex-direction定义主轴方向 row为水平 column垂直 */
    flex-direction: row;
    /* flex-wrap超出容器长度是否换行 */
    flex-wrap: wrap;
    /* justify-content子元素在主轴上的对齐方式 */
    justify-content: space-evenly;
    /* align-content多行对齐方式 */
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
  .base_info {
    width: 100%;
    height: 100px;
    background: #fafbfd;
    border-radius: 0px 6px 6px 6px;
    opacity: 1;
    border: 1px solid #f0f0f0;
    margin-top: 20px;
    padding-top: 20px;
  }



</style>
  