<template>
  <view class="product-sales p-lr-20 p-tb-30">
      <view class="top">
          <text>2020年4月10日</text>
          <text class="iconfont">&#xe6b2;</text>
          <text class="iconfont" style="font-weight:500">&#xe68c;</text>
          <text>2020年4月11日</text>
          <text class="iconfont">&#xe6b2;</text>
      </view>
      <view class="view_main p-lr-20 p-tb-20">
          <view class="title_view" >
            <text class="f30">数据分析</text>
          </view>
          <canvas  canvas-id="canvasPiegoods" id="canvasPiegoods" class="charts" @touchstart="touchPie1"></canvas>
      </view>
      <view class="taiwei">
        <view class="top_view" >
          <view class="mid_view min-border-bottom">
            <view class="title" v-for="(item,index) in mainTitle " :key="index">{{item}}</view>
          </view>
          <view class="bom_view m-top-30" v-for="(item,index) in mainItem" :key="index">
            <view class="item">{{item.order}}</view>
            <view class="item">{{item.num}}</view>
            <view class="item">{{item.price}}</view>
          </view>
        </view>
      </view>
  </view>
</template>
<script>
import uCharts from '../../components/ucharts/u-charts.min.js'
var _self
var canvaPie = null
export default {
  name: 'product-sales',
  navigate: ['navigateTo'],
  data () {
    return {
      mainTitle: ['商品名称', '销量', '销量额'],
      // 台位统计
      mainItem: [
        { order: '哈利高VSOP', num: '226', price: '￥5000' },
        { order: 'K1221', num: '1231', price: '￥5000' },
        { order: 'K1221', num: '1231', price: '￥5000' },
        { order: 'K1221', num: '1231', price: '￥5000' }
      ],
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
      cWidth: '',
      cHeight: '',
      pixelRatio: 1,
      serverData: ''
    }
  },
  onLoad () {
    if (this.$parseURL().type === 1) {
      uni.setNavigationBarTitle({
        title: 'SKU销售排行'
      })
    } else if (this.$parseURL().type === 2) {
      uni.setNavigationBarTitle({
        title: '订台人业绩统计'
      })
    } else if (this.$parseURL().type === 3) {
      uni.setNavigationBarTitle({
        title: '下单人业绩统计'
      })
    }
  },
  mounted () {
    _self = this
    this.cWidth = uni.upx2px(700)
    this.cHeight = uni.upx2px(450)
    _self.$nextTick(() => {
      _self.getServerData()
    })
  },
  methods: {
    getServerData () {
      const Pie = { series: [] }
      Pie.series = _self.chartData1.series
      _self.showPie('canvasPiegoods', Pie, false, 40)
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
    },
    touchPie1 (e) {
      // 自定义点击展示数据
      const textList = [{ text: '商品统计', color: null }, { text: '自定义1：值1000', color: null }, { text: '自定义2：值2', color: null }, { text: '自定义3：值3', color: null }]
      canvaPie.showToolTip(e, {
        textList
      })
    }
  }
}
</script>
<style lang="scss">
.product-sales{
  .top {
    text {
      color: #666666;
    }
  }
  .view_main{
    width: 100%;
    height: 623rpx;
    background: #fff;
    margin-top: 20rpx;
    .title_view{
      margin-bottom: 50rpx;
    }
  }
  // 台位统计
  .taiwei {
    .top_view {
      width: 100%;
      height: 600rpx;
      background: #fff;
      border-radius: 10rpx;
      padding: 20rpx;
      .top {
        text {
          color: #666666;
        }
      }
      .mid_view {
        width: 100%;
        padding-bottom: 27rpx;
        padding-top: 27rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
          width: calc(100% / 3);
          text-align: center;
        }
      }
      .bom_view {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        .item {
          width: calc(100% / 3);
          text-align: center;
        }
      }
    }
  }
}
.charts{width: 100%; height:500rpx;background-color: #FFFFFF;}
#canvasPiegoods{width: 100%; height:500rpx;background-color: #FFFFFF;}
</style>
