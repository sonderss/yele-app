<template>
  <view class="main">
      <min-ducharts></min-ducharts>
  </view>
</template>
<script>
import uCharts from '../../components/ucharts/u-charts.min.js'
var _self
var canvaPie = null
var canvaColumn = null
export default {
  mounted () {
    const option = {
      url: '5e424f7f8c0c0?page=1&limit=20',
      accesstoken: 'HPkSFqbVhWpCRxVRpOTkyEubusFxBEEd'
    }
    // uni.request({
    //   url: 'http://api.app-store.dev.yeleonline.com/api/5e424cc4ded0a',
    //   header: {
    //     'access-token': 'HPkSFqbVhWpCRxVRpOTkyEubusFxBEEd' // 自定义请求头信息
    //   },
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
    // 连接
    uni.connectSocket({
      url: option.url
    })
    // 打开
    uni.onSocketOpen((res) => {
      console.log('WebSocket 已开启！')

      this.socketOpen = true

      this.sendSocketMessage()

      // console.log(this.socketMsgQueue)
      this.socketMsgQueue = []
      uni.closeSocket()
    })
    // 连接失败
    uni.onSocketError((res) => {
      console.log('WebSocket连接打开失败，请检查！')
    })
    // 接收服务端信息
    uni.onSocketMessage((res) => {
      console.log('收到服务器内容：' + res.data)
    })
    // 监听socket关闭
    uni.onSocketClose((res) => {
      console.log('WebSocket 已关闭！')
    })
    _self = this
    this.cWidth = uni.upx2px(700)
    this.cHeight = uni.upx2px(450)
    _self.$nextTick(() => {
      // 初始化图表
      _self.getServerData()
    })
  },
  data () {
    return {
      currentTab: 0,
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
// .main{
//   display: flex;
//   .left-view{
//     width: 200rpx;
//   }
//   .right-view{
//     flex: 1;
//     background: #f00;
//   }
// }
// 商品统计
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
