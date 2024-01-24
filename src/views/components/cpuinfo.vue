<template>
<div id="main" style="width: 600px;height:400px;"></div>
</template>
  
  <script>
  import * as echarts from 'echarts';
  export default {
    mounted(){
      var myChart = echarts.init(document.getElementById('main'));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      myChart.setOption(option);
    }
  
  };
  </script>
  
