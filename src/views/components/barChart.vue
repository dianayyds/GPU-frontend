<template>
    <div class="chart-title">
      <span class="chart-title-icon">
      </span>
      <span style="width:70%">
        {{ chartTitle }}
      </span>
    </div>  

    <div ref="chart" style="width: 100%; height: 400px;"></div>
</template>

<script >
import * as echarts from 'echarts';
import { markRaw } from 'vue';


export default {
  name: 'barChart',
  data () {
    return {
      chart: null,
      chartTitle :String,
    };
  },
  mounted () {
    //使用markRaw将图表设置为不可被转为代理
    this.chart = markRaw(echarts.init(this.$refs.chart));
  },
  methods: {
    updateData (newOptions) {
      // 根据数据数量确定x轴上显示的点数
      this.chartTitle = newOptions.chartTitle;
      const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'shadow'
            }
        },
        legend: {
        },
        grid: {
        left: '3%',
        right: '10%',
        bottom: '5%',
        containLabel: true
        },
        //图例
        xAxis: {
            name:newOptions.xAxisName,
        },
        yAxis: {
          name:newOptions.yAxisName,
          type: 'category',
          data:newOptions.yAxisData,
        },
      series: newOptions.seriesData.map(item => ({
          //...是展开运算符,将对象item中的所有属性展开，然后加上了一个smooth属性
        name:item.name,
        data:[item.avg,item.max,item.min,item.var,item.sd],
        type: 'bar'
      })),
      };
      this.chart.setOption(option,false);
    },
  }
};

</script>


<style scoped>

.chart-title-icon {
  width: 4px;
  height: 18px;
  background: #1d49e1;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  margin-right: 12px;
  margin-left: 20px;
  
}
.right-align {
  text-align: right;
  }
.chart-title {
  display: flex;
  align-items: center;
  width: 100%;
  height: 19px;
  font-size: 15px;
  font-family: Noto Sans-Regular, Noto Sans;
  font-weight: 400;
  color: #333333;
  line-height: 16px;
}
</style>
