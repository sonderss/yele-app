<template>
  <view class="min-ducharts">
      <view class="shangpin"  >
        <view class="view_main p-lr-20 p-tb-20">
          <view class="title_view">
              <text class="f30">商品销售排行榜</text>
              <text class="f26">更多 >></text>
          </view>
            <canvas canvas-id="canvasPiegoods" id="canvasPiegoods" class="charts"></canvas>
        </view>
        <view class="view_main p-lr-20 p-tb-20">
          <view class="title_view">
              <text class="f30">SKU销售排行榜</text>
              <text class="f26">更多 >></text>
          </view>
          <canvas canvas-id="canvasColumn" id="canvasColumn" class="chartss"></canvas>
        </view>
      </view>
  </view>
</template>
<script>
import uCharts from './ucharts/u-charts.min.js'
var _self
var canvaPie = null
// eslint-disable-next-line no-unused-vars
var canvaColumn = null
export default {
  data () {
    return {
      category: '',
      // 商品统计
      chartData1: {
        series: [{
          name: '哈利高',
          data: 50
        }, {
          name: '人头马',
          data: 30
        }, {
          name: '威士忌',
          data: 20
        }, {
          name: 'shit',
          data: 18
        }]
      },
      // 商品统计柱状图
      chartData2: {
        categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
        series: [{
          name: '成交量1',
          data: [15, { value: 20, color: '#f04864' }, 45, 37, 43, 34]
        }]
      },
      cWidth: '',
      cHeight: '',
      pixelRatio: 1,
      serverData: ''
    }
  },
  methods: {
    getServerData () {
      const Pie = { series: [] }
      let Colum = { }
      // 这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去

      Pie.series = this.chartData1.series
      Colum = this.chartData2
      _self.showPie('canvasPiegoods', Pie, false, 40)
      _self.showColumn('canvasColumn', Colum)
    },
    // 环形
    showPie (canvasId, chartData, showLend, ringWidth) {
      // eslint-disable-next-line new-cap
      canvaPie = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: 'ring',
        fontSize: 11,
        legend: {
          show: showLend,
          position: 'right',
          padding: 10,
          margin: 20,
          lineHeight: 25,
          borderWidth: 2,
          orient: 'vertical',
          left: 'left',
          x: 'left',
          y: 'top'
        },
        title: {
          name: '2335.5', // 标题
          color: '#7cb5ec'
        },
        subtitle: {
          name: '实收金额(元)', // 副标题
          color: '#999999',
          fontSize: 10
        },
        dataPointShape: true,
        extra: {
          pie: {
            offsetAngle: -45,
            ringWidth: ringWidth
          },
          tooltip: {
            showBox: true, // 是否显示半透明黑色的提示区域
            bgColor: '#000000', // 主体背景颜色
            bgOpacity: 0.7, // 背景颜色透明度
            fontColor: '#FFFFFF', // 主体文字颜色
            labelBgColor: '#DFE8FF', // 标签背景颜色
            labelBgOpacity: 0.95, // 背景颜色透明度
            labelFontColor: '#666666'// 标签文字颜色
          }
        },
        background: '#FFFFFF',
        pixelRatio: _self.pixelRatio,
        series: chartData.series,
        animation: true,
        width: _self.cWidth * _self.pixelRatio,
        height: _self.cHeight * _self.pixelRatio,
        disablePieStroke: true,
        dataLabel: false
      })
      this.piearr = canvaPie.opts.series
    },
    // 柱状
    showColumn (canvasId, chartData) {
      // eslint-disable-next-line new-cap
      canvaColumn = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: 'column',
        legend: { show: false },
        fontSize: 11,
        background: '#FFFFFF',
        pixelRatio: _self.pixelRatio,
        animation: true,
        categories: chartData.categories,
        series: chartData.series,
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          // disabled:true
        },
        dataLabel: true,
        width: _self.cWidth * _self.pixelRatio,
        height: _self.cHeight * _self.pixelRatio,
        extra: {
          column: {
            type: 'group',
            width: 16
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.shangpin{
  margin-top: 80rpx;
  .view_main{
    width: 100%;
    height: 623rpx;
    background: #fff;
    margin-top: 20rpx;
    .title_view{
      display: flex;
      justify-content: space-between;
      margin-bottom: 50rpx;
    }
  }
}

.charts{width: 100%; height:500rpx;background-color: #FFFFFF;}
#canvasPiegoods{width: 100%; height:500rpx;background-color: #FFFFFF;}
#canvasColumn{width: 100%; height:500rpx;background-color: #FFFFFF;}
</style>
