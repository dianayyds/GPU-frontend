<template>
    <div>
      <div class="chart-title">
        <span class="chart-title-icon">
        </span>
        <span style="width:70%">
          {{ chartTitle }}
        </span>
        <slot></slot>
      </div>  
      <div ref="chart" style="width: 100%; height: 400px;"></div>
    </div>
  </template>
  
  <script >
  import * as echarts from 'echarts';
  import { markRaw } from 'vue';
  
  
  export default {
    name: 'SmoothLineChart',
    props: {
      chartTitle: String,
      xAxisData: Array,
      seriesData: Array,
      xAxisName: String,
      yAxisName: String,
      yAxis_min: echarts.number,
      yAxis_max: echarts.number,
      yAxis_interval: echarts.number,
    },
    data () {
      return {
        startIndex : null,
        endIndex : null,
        chart: null,
        chartTitle: this.chartTitle // 定义 chartTitle 数据属性并将其初始值设置为 title prop 的值
      };
    },
    mounted () {
      //使用markRaw将图表设置为不可被转为代理
      this.chart = markRaw(echarts.init(this.$refs.chart));
    },
    methods: {
      updateData (newOptions) {
        this.chartTitle = newOptions.chartTitle; 
        // 根据数据数量确定x轴上显示的点数
        let xAxisData = newOptions.xAxisData;
        const option = {
          tooltip: {
            trigger: 'axis',
            show: true,
          },
          legend: {
          data: newOptions.seriesData.map(item => item.name),
          top: 'top',
          triggerEvent: true
        },
          //图例
          xAxis: {
            type: 'category',
            name: newOptions.xAxisName,
            data: xAxisData,
            axisTick: {
              alignWithLabel: true,
            }
          },
          animation:false,
          animationDuration:0,
          animationEasing:'cubicInOut',
          yAxis: {
            type: 'value',
            min: newOptions.yAxis_min,
            max: newOptions.yAxis_max,
            name: newOptions.yAxisName,
            nameLocation: 'end',
            axisLine: {
              show: true
            },
            axisTick: {
              show: true, // 显示刻度
              interval: newOptions.yAxis_interval // 指定刻度间隔
            },
          },
  
          emphasis:{
            label:
            {
              //控制曲线上是否显示数据
              show:false
            }
          },
        series: newOptions.seriesData.map(item => ({
            //...是展开运算符,将对象item中的所有属性展开，然后加上了一个smooth属性
          ...item,
          smooth: true,
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
    font-size: 20px;
    font-family: Noto Sans-Regular, Noto Sans;
    font-weight: 400;
    color: #333333;
    line-height: 16px;
  }
  </style>
  