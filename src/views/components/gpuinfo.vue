<template>
<div v-if="isSshConnected">
    <div class="mybutton">
    <el-button size="default"  type="success" @click="StartMonitor"><el-icon><Open /></el-icon>开始监测</el-button>
    <el-button size="default" type="danger" @click="StopMonitor"><el-icon><TurnOff /></el-icon>停止监测</el-button>
    </div>

    <div class="gradient-divider"></div>
    <div class="nav-container">
      <el-select @change="scrollTo" placeholder="快速前往" size="small">
        <el-option-group
          v-for="group in selectoptions"
          :label="group.label">
          <el-option
            v-for="item in group.options"
            :label="item.label"
            :value="item.value"
          />
        </el-option-group>

      </el-select>
    </div>
    
    <el-table :data="baseinfo" border style="width: 100%" id="base_info"> 
      <el-table-column prop="operatingSystem" label="操作系统" ></el-table-column>
      <el-table-column prop="hostname" label="主机名" ></el-table-column>
      <el-table-column prop="kernelVersion" label="内核版本" ></el-table-column>
      <el-table-column prop="cpuArchitecture" label="CPU架构" ></el-table-column>
      <el-table-column prop="release" label="发行版版本" ></el-table-column>
      <el-table-column prop="host" label="ip地址" ></el-table-column>
    </el-table>


    <div class="gradient-divider"></div>
 
    <div style="margin-top:20px">
        <el-table :data="detailed_gpu_info" border stripe style="width: 100%" id="detailed_gpu_info"> 
          <el-table-column type="index" label="GPU编号" width="100px"/>
          <el-table-column prop="modelName" label="GPU型号名称" ></el-table-column>
          <el-table-column prop="uuid" label="唯一标识符" ></el-table-column>
          <el-table-column prop="memoryTotalMB" label="总内存大小(MB)" ></el-table-column>
          <el-table-column prop="driverVersion" label="NVIDIA驱动版本" ></el-table-column>
          <el-table-column prop="powerLimitW" label="电源使用限制(W)" ></el-table-column>
        </el-table>
    </div>

    <div class="gradient-divider"></div>

    <div style="margin-top:30px">
      <h3 class="subtitle">监测数据</h3>
      <div class="flex-container">
        <div class="chart_cpu_usage" id="chart1">
          <keep-alive>
              <smoothLineChart 
                            ref="chartcomponent1"/>
            </keep-alive>
        </div>
        <div class="chart_cpu_usage" id="chart2">
          <keep-alive>
              <smoothLineChart 
                            ref="chartcomponent2"/>
          </keep-alive>
        </div>
        <div class="chart_cpu_usage" id="chart3">
          <keep-alive>
              <smoothLineChart 
                            ref="chartcomponent3"/>
                            </keep-alive>
        </div>
      </div>
    </div>

    <h3 class="subtitle">统计数据</h3>

    <div style="margin-top: 30px;">
    <div class="chart_cpu_usage" id="chart4">
      <keep-alive>
          <barChart 
                         ref="chartcomponent4"/>
                        </keep-alive>
    </div>
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
    <div class="gradient-divider"></div>
    


    <div class="chart_cpu_usage" id="chart5">
      <keep-alive>
          <barChart 
                         ref="chartcomponent5"/>
                        </keep-alive>
    </div>
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
    <div class="gradient-divider"></div>


    <div class="chart_cpu_usage" id="chart6">
      <keep-alive>
          <barChart 
                         ref="chartcomponent6"/>
                        </keep-alive>
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

    
    </div>
  <div class="gradient-divider"></div>
</div>

<div v-else style="background-color: #eee;">
      <div class="connection-initialized">
      <div class="content">
        <h1><el-icon><WarningFilled /></el-icon>
          未初始化服务器
        </h1>
        <el-button @click="GOTOsystem">前往初始化服务器</el-button>
      </div>
  </div>
</div>

</template>

<script>
import smoothLineChart from './smoothLineChart.vue';
import barChart from './barChart.vue';
export default{
  components: {
    smoothLineChart,
    barChart,
  },
  data(){
    return{
      baseinfo: [],
      detailed_gpu_info:[],
      tableData1 : [
      ],
      tableData2 : [
      ],
      tableData3 : [
      ],
      selectoptions:[
        {
          label:"服务器信息",
          options:[
            {
              value: 'base_info',
              label: '服务器信息',
            },
          ]
        },
        {
          label:"监测数据",
          options:[
            {
              value: 'chart1',
              label: '功率',
            },
            {
              value: 'chart2',
              label: '使用率',
            },
            {
              value: 'chart3',
              label: '温度',
            },
          ]
        },
        {
          label:"统计数据",
          options:[
            {
              value: 'chart4',
              label: '功率',
            },
            {
              value: 'chart5',
              label: '使用率统计',
            },
            {
              value: 'chart6',
              label: '温度统计',
            },
          ]
        }
      ],
      isSshConnected:this.$store.state.isSshConnected,
      interval1: null,
      interval2: null,
    }
  },
  async mounted(){
    await this.Getbaseinfo();
    this.initial_chart();
    this.updatetable();
    if(this.$store.state.ismonitoring===true)
    this.StartMonitor();
    else
    this.StopMonitor();
  },
  beforeUnmount() {
      clearInterval(this.interval1);
      this.interval1=null;
      clearInterval(this.interval2);
      this.interval2=null;
  },
  methods:{
    GOTOsystem(){
      this.$router.push('/initssh')
    },
    async Getbaseinfo(){
      await this.$api.base_info().then((params)=>{
        this.baseinfo[0]=params.data;
        this.baseinfo[0].pre="基本信息:";
      })
      await this.$api.detailed_gpu_info().then((params)=>{
        this.detailed_gpu_info=params.data.gpus;
      })
    },
    StartMonitor(){
      this.$store.state.ismonitoring=true;
      if(this.interval1===null)
      this.interval1 = setInterval(this.fetchData, 2000);
      if(this.interval2===null)
      this.interval2 = setInterval(this.updatetable, 10000);
    },
    StopMonitor(){
      this.$store.state.ismonitoring=false;
      clearInterval(this.interval1);
      this.interval1=null;
      clearInterval(this.interval2);
      this.interval2=null;
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
    updatechart4(){
      let tmpgpuinfo = 
            {
              chartTitle: 'GPU功率(W)',
              yAxisData: ['平均值','最大值','最小值','方差','平均差'],
              seriesData:this.tableData3,
              xAxisName: '功率', 
              yAxisName: '指标', // 设置 yAxisName 的值
            };
      this.chart4 = tmpgpuinfo;
      this.$refs.chartcomponent4.updateData(this.chart4); 
    },
    updatechart5(){
      let tmpgpuinfo = 
            {
              chartTitle: 'GPU使用率(%)',
              yAxisData: ['平均值','最大值','最小值','方差','平均差'],
              seriesData:this.tableData2,
              xAxisName: '使用率', 
              yAxisName: '指标', // 设置 yAxisName 的值
            };
      this.chart5 = tmpgpuinfo;
      this.$refs.chartcomponent5.updateData(this.chart5); 
    },
    updatechart6(){
      let tmpgpuinfo = 
            {
              chartTitle: 'GPU温度(摄氏度)',
              yAxisData: ['平均值','最大值','最小值','方差','平均差'],
              seriesData:this.tableData1,
              xAxisName: '温度', 
              yAxisName: '指标', // 设置 yAxisName 的值
            };
      this.chart6 = tmpgpuinfo;
      this.$refs.chartcomponent6.updateData(this.chart6); 
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
      this.updatechart4();
      this.updatechart5();
      this.updatechart6();
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
.connection-initialized {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  }

  .content {
    max-width: 500px;
    padding: 20px;
  }
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
  .gradient-divider {
  height: 2px;
  background: linear-gradient(to right, #fff, #6e66c5, #fff);
  margin: 20px 0;
}

.subtitle {
  font-size: 18px; /* 根据需要调整字体大小 */
  color: #383b85; /* 深色字体更易阅读 */
  font-weight: bold; /* 加粗字体 */
  text-align: center; /* 居中对齐 */
  margin-top: 20px; /* 上间距 */
  margin-bottom: 20px; /* 下间距 */
  background-color: #f5f5f5; /* 轻灰色背景 */
  padding: 10px; /* 内填充 */
  border-radius: 5px; /* 轻微的边角圆滑 */
  letter-spacing: 20px;
}





</style>
  