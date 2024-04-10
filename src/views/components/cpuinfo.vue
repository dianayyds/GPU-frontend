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
  

    <el-table :data="baseinfo" height="100" style="width: 100%" id="base_info">
      <el-table-column prop="operatingSystem" label="操作系统" ></el-table-column>
      <el-table-column prop="hostname" label="主机名" ></el-table-column>
      <el-table-column prop="kernelVersion" label="内核版本"></el-table-column>
      <el-table-column prop="cpuArchitecture" label="CPU架构" ></el-table-column>
      <el-table-column prop="release" label="发行版版本" ></el-table-column>
      <el-table-column prop="host" label="ip地址"></el-table-column>
    </el-table>

    <div class="gradient-divider"></div>

    <el-table :data="winfo" style="width: 100%">
      <el-table-column prop="cpunum" label="cpu数量" width="180" />
      <el-table-column prop="cpucorenum" label="cpu核心数" width="220" />
      <el-table-column prop="load1min" label="一分钟负载" width="180" />
      <el-table-column prop="load5min" label="五分钟负载" width="180" />
      <el-table-column prop="load15min" label="十五分钟负载" width="180" />
      <el-table-column prop="idealload" label="理想负载" width="180" />
    </el-table>
    <div class="gradient-divider"></div>


    <div class="flex-container">
      <!-- cpu_usage_linechart -->
      <div class="chart_cpu_usage" id="chart1">
          <smoothLineChart 
                          ref="chartcomponent1"
                            />
        </div>
    </div>

    
    <h3 class="subtitle">统计数据</h3>

    <el-table  :data="tableData1" style="width: 100%" id="table1">
    <el-table-column label="GPU温度(摄氏度)">
      <el-table-column prop="name" label="指标"  />
      <el-table-column prop="avg" label="平均值"  />
      <el-table-column prop="max" label="最大值" />
      <el-table-column prop="min" label="最小值"  />
      <el-table-column prop="var" label="方差"  />
      <el-table-column prop="sd" label="标准差"  />
    </el-table-column>
    </el-table>

</div>

  <div v-else>
      <div class="connection-initialized">
      <div class="content">
        <h1><el-icon><WarningFilled /></el-icon>
          未初始化服务器
        </h1>
      </div>
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
        winfo:[{
        }],
        baseinfo: [{
        }],
        chart1: {
        },
        chart2: {
        },
        tableData1:[],
        interval1:null,
        interval2:null,
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
              label: '使用率',
            },
          ]
        },
        {
          label:"统计数据",
          options:[
            {
              value: 'table1',
              label: '使用率',
            },
          ]
        }
      ],
        isSshConnected:this.$store.state.isSshConnected,
      }
    },
    beforeUnmount() {
      clearInterval(this.interval1);
      this.interval1=null;
      clearInterval(this.interval2);
      this.interval2=null;
    },
    async mounted(){
      await this.Getbaseinfo();
      this.initial_chart();
      this.updatepage()
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
        await this.$api.w_info().then((param)=>{
        this.winfo[0]=param.data
      })

      },
      async StartMonitor(){
        this.$store.state.ismonitoring=true;
        if(this.interval1===null)
        this.interval1 = setInterval(this.fetchData, 2000);
        if(this.interval2===null)
        this.interval2 = setInterval(this.updatepage, 2000);
        this.$message({
        message: '监测进行中',
        type: 'success'
        });
      },
      async StopMonitor(){
        this.$store.state.ismonitoring=false;
        clearInterval(this.interval1);
        clearInterval(this.interval2);
        this.interval1=null;
        this.interval2=null;
        this.$message({
        message: '监测停止中',
        type: 'error'
        });
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
        await this.$api.memory_info().then((params)=>{
          if(params.data.code!=0){
            this.$message({
              message: params.data.msg,
              type: 'error'
            });
            return
          }
          this.$store.commit('Pushmemoryinfo',params.data);
        })
      },
      initial_chart(){
      if(this.$store.state.cpuusage.userUsage.length===0)
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
                seriesData: Object.keys(this.$store.state.cpuusage).map((key) => {
                  return { name: key, type: 'line', data: this.$store.state.cpuusage[key] }
                }),
                xAxisName: '时间轴', 
                yAxisName: '%', // 设置 yAxisName 的值
                yAxis_min: 0,
                yAxis_max: 100,
                yAxis_interval: 20,
              };
          this.chart1 = tmpcpuinfo;
          this.$refs.chartcomponent1.updateData(this.chart1); 
      },
      updatechart2(){
        let tmpcpuinfo = 
              {
                chartTitle: 'CPU利用率(%)',
                xAxisData: this.$store.state.cpuxdata,
                seriesData: Object.keys(this.$store.state.cpuusage).map((key) => {
                  return { name: key, type: 'line', data: this.$store.state.cpuusage[key] }
                }),
                xAxisName: '时间轴', 
                yAxisName: '%', // 设置 yAxisName 的值
                yAxis_min: 0,
                yAxis_max: 100,
                yAxis_interval: 20,
              };
          this.chart1 = tmpcpuinfo;
          this.$refs.chartcomponent1.updateData(this.chart1); 
      },
      updatepage(){
        if(this.$store.state.cpuusage.userUsage.length!=0)
        {
          this.tableData1 = Object.keys(this.$store.state.cpuusage).map(key => {
            const cpuusage = this.$store.state.cpuusage[key];
            const avg = cpuusage.reduce((a, b) => a + b, 0) / cpuusage.length;
            // 计算方差
            const varSum = cpuusage.reduce((a, b) => a + (b - avg) ** 2, 0);
            const variance = varSum / cpuusage.length;
            // 计算标准差
            const standardDeviation = Math.sqrt(variance);
            return {
              name: key,
              avg: parseFloat(avg.toFixed(2)),
              max: Math.max(...cpuusage),
              min: Math.min(...cpuusage),
              var: parseFloat(variance.toFixed(2)),  // 方差
              sd: parseFloat(standardDeviation.toFixed(2))  // 标准差
            };
            });
        }
        this.updatechart1();
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
    