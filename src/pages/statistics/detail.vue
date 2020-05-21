<template>
  <view class="detail">
    <view class="p-lr-20 p-tb-20" v-if="type === 2 || type === 3 || type === 4">
      <view class="item_viwe m-tb-20" v-for="(item,index) in list" :key="index">
        <view class="left">
          <view class="title">{{item.title}}</view>
          <view class="desc m-top-20">最TOP营销：{{item.name}} 业绩：{{item.money}}元</view>
        </view>
        <view class="right">
          <image src="/static/images/arrow.png" />
        </view>
      </view>
    </view>

    <view class="p-lr-20 p-tb-20" v-if="type === 0">
      <view class="nav">
        <view class="nav_item min-border-bottom">
          <view
            :class="current === index ? 'nav_item_name_active' :'nav_item_name' "
            @click="chince(index)"
            v-for="(i,index) in navBar"
            :key="i"
          >{{i}}</view>
        </view>
        <view class="main_data">
          <text class="time">更新时间：2020.02.23 13:22:00</text>
          <view class="main_data_item">
            <view class="item_box one">
              <text class="name">123</text>
              <text class="desc">qeweqw</text>
            </view>
            <view class="item_box">
              <text class="name">123</text>
              <text class="desc">qeweqw</text>
            </view>
            <view class="item_box one">
              <text class="name">123</text>
              <text class="desc">qeweqw</text>
            </view>
            <view class="item_box">
              <text class="name">123</text>
              <text class="desc">qeweqw</text>
            </view>
          </view>
        </view>
        <view class="btm_view">
          <view class="item_box">
            <text class="name">抹零合计</text>
            <text class="desc m-top-20">￥3126.00</text>
          </view>
          <view class="item_box">
            <text class="name">活动优惠</text>
            <text class="desc m-top-20">￥3126.00</text>
          </view>
          <view class="item_box">
            <text class="name">赠送合计</text>
            <text class="desc m-top-20">￥3126.00</text>
          </view>
          <view class="item_box">
            <text class="name">签折优惠</text>
            <text class="desc m-top-20">￥3126.00</text>
          </view>
        </view>
      </view>
      <view class="method_desc">支付方式</view>
      <canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
    </view>

    <view v-if="type === 1">
      <view class="top_view">
        <view class="main_">
          <view class="left">
            <view class="image_">
              <text class="m-top-20" style="color:#fff;font-size:58rpx;font-weight:blod">26</text>
              <text class="f22" style="color:#fff;">空闲中</text>
            </view>
          </view>
          <view class="mid">
            <view class="image_">
              <text class="m-top-20" style="color:#fff;font-size:58rpx;font-weight:blod">26</text>
              <text class="f22" style="color:#fff;">空闲中</text>
            </view>
          </view>
          <view class="right">
            <view class="image_">
              <text class="m-top-20" style="color:#fff;font-size:58rpx;font-weight:blod">26</text>
              <text class="f22" style="color:#fff;">空闲中</text>
            </view>
          </view>
        </view>
        <view class="f20 m-tb-20" style="color:#999999">更新时间：2020.02.23 13:22:00</view>
      </view>

      <view  class="m-lr-20 m-tb-20 "  style="background:#FFF">
          <view class="main_data " style="height:532rpx">
            <view class="nav_item p-lr-20 min-border-bottom">
              <view
                :class="current === index ? 'nav_item_name_active' :'nav_item_name' "
                @click="chince(index)"
                v-for="(i,index) in navBar"
                :key="i"
              >{{i}}</view>
            </view>
            <text class="time p-lr-20 p-top-20" >更新时间：2020.02.23 13:22:00</text>
            <view :class="i === 3 ? 'main_data_item':'main_data_item min-border-bottom' " v-for="i in 3" :key="i">
              <view class="item_box_ one" style="width:30%">
                <text class="name">123</text>
                <text class="desc">qeweqw</text>
              </view>
              <view class="item_box_  one" style="width:30%">
                <text class="name">123</text>
                <text class="desc">qeweqw</text>
              </view>
              <view class="item_box_  " style="width:30%">
                <text class="name">123</text>
                <text class="desc">qeweqw</text>
              </view>
            </view>
          </view>
      </view>

      <view class="taiwei m-lr-20">
        <view class="top_view" >
          <view class="mid_view min-border-bottom">
             桌台消费排行榜
          </view>
          <view class="bom_view m-top-30" v-for="(item,index) in 4" :key="index">
            <view class="item">{{123}}</view>
            <view class="item">{{123}}</view>
            <view class="item">{{123}}</view>
            <view class="item m-left-20" style="width:24rpx">
                >
            </view>

          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
import uCharts from '../../components/ucharts/u-charts.min.js'
var _self
var canvaPie = null
const yingxiao = [
  { title: '营销业绩统计', name: '徐冬冬', money: '30600' },
  { title: '营销开台数统计', name: '徐冬冬', money: '30600' },
  { title: '角色业绩统计', name: '徐冬冬', money: '30600' },
  { title: '无业绩人员名单', name: '徐冬冬', money: '30600' }
]
const shangpin = [
  { title: '单品销售统计', name: '徐冬冬', money: '30600' },
  { title: '套餐销售统计', name: '徐冬冬', money: '30600' }
]
const xiaoshou = [
  { title: '销售业绩统计', name: '徐冬冬', money: '30600' },
  { title: '角色销售业绩统计', name: '徐冬冬', money: '30600' }
]
export default {
  data () {
    return {
      yingxiao,
      shangpin,
      xiaoshou,
      list: [],
      cWidth: '',
      cHeight: '',
      pixelRatio: 1,
      navBar: ['实时', '昨天', '本周', '上周', '本月', '今年'],
      type: 0,
      current: 0,
      // 数据总览
      chartData: {
        series: [
          {
            name: '支付宝',
            data: 50
          },
          {
            name: '微信',
            data: 30
          },
          {
            name: '刷卡',
            data: 20
          },
          {
            name: '现金',
            data: 18
          }
        ]
      }
    }
  },
  methods: {
    chince (i) {
      this.current = i
    },
    touchPie (e) {
      // 自定义点击展示数据
      const textList = [
        { text: '我是一个标题', color: null },
        { text: '自定义1：值1000', color: null },
        { text: '自定义2：值2', color: null },
        { text: '自定义3：值3', color: null }
      ]
      canvaPie.showToolTip(e, {
        textList
      })
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
            labelFontColor: '#666666' // 标签文字颜色
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
      // canvaPie.stopAnimation()
      canvaPie.addEventListener('renderComplete', () => {
        console.log('渲染完成')
      })
    },
    getServerData () {
      // eslint-disable-next-line no-case-declarations
      const Pie = { series: [] }
      Pie.series = this.chartData.series
      // ID 数据 是否显示图例  粗细   （环形图表）
      this.showPie('canvasPie', Pie, true, 25)
    }
  },
  mounted () {
    _self = this
    if (this.type === 0) {
      this.cWidth = uni.upx2px(700)
      this.cHeight = uni.upx2px(450)
      this.$nextTick(() => {
        // 初始化图表
        this.getServerData()
      })
    }
  },
  onLoad (option) {
    this.type = option.type * 1
    switch (option.type) {
      case '0':
        uni.setNavigationBarTitle({
          title: '数据统计'
        })
        break
      case '1':
        uni.setNavigationBarTitle({
          title: '桌台统计'
        })
        break
      case '2':
        this.list = yingxiao
        uni.setNavigationBarTitle({
          title: '营销统计'
        })
        break
      case '3':
        this.list = xiaoshou
        uni.setNavigationBarTitle({
          title: '销售统计'
        })
        break
      case '4':
        this.list = shangpin
        uni.setNavigationBarTitle({
          title: '商品统计'
        })
        break
      default:
        this.list = []
    }
  }
}
</script>

<style lang="scss" scoped>
.item_viwe {
  width: 100%;
  height: 200rpx;
  background: rgba(255, 255, 255, 1);
  border-radius: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30rpx;
  .left {
    .title {
      color: #333333;
      font-weight: 500;
      font-size: 36rpx;
    }
    .desc {
      font-size: 26rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #666666;
    }
  }
  .right {
    width: 24rpx;
    height: 24rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
.nav {
  width: 100%;
  height: auto;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 20rpx;
  .nav_item {
    width: 100%;
    display: flex;
    height: 88rpx;
    justify-content: space-between;
    align-items: center;
    .nav_item_name {
      font-size: 30rpx;
      height: 100%;
      line-height: 88rpx;
    }
    .nav_item_name_active {
      font-size: 30rpx;
      font-weight: bold;
      color: #333;
      height: 100%;
      line-height: 88rpx;
      position: relative;
    }
    .nav_item_name_active::after {
      content: "";
      height: 4rpx;
      width: 100%;
      background: #000000;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }

  .btm_view {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 30rpx;
    .item_box {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .name {
        font-size: 20rpx;
        color: #666666;
      }
      .desc {
        font-size: 24rpx;
        font-weight: bold;
        color: #333;
      }
    }
  }
}
.method_desc {
  width: 100%;
  background: #fff;
  margin-top: 30rpx;
  padding: 20rpx;
}
.charts {
  width: 100%;
  height: 500rpx;
  background-color: #ffffff;
}

.top_view {
  width: 100%;
  height: 480rpx;
  background: rgba(3, 3, 19, 1);
  padding: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  .main_ {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  padding: 0 30rpx;
  .left {
    width: 208rpx;
    height: 270rpx;
    display: flex;
    align-items: flex-end;
  }
  .mid {
    width: 233rpx;
    height: 270rpx;
    align-items: center;
  }
  .right {
    width: 208rpx;
    height: 270rpx;
    display: flex;
    align-items: flex-end;
  }
  .image_ {
    width: 100%;
    height: 233rpx;
    background-image: url("/static/images/back_data.png");
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
}

.main_data {
    width: 100%;
    .time {
      color: #666;
      font-size: 20rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      width: 100%;background: #fff;display: block;
    }
    .main_data_item {
      height: 160rpx;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      background: #fff;
      .item_box {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1rpx solid #e7e7e7;
        flex-direction: column;
        position: relative;
        .name {
          font-size: 22rpx;
          color: #666666;
        }
        .desc {
          font-size: 30rpx;
          font-weight: bold;
          color: #333;
        }
      }
       .item_box_ {
        width: 30%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        .name {
          font-size: 22rpx;
          color: #666666;
        }
        .desc {
          font-size: 30rpx;
          font-weight: bold;
          color: #333;
        }
      }
      .one::after {
         content: '';
        position: absolute;
        right: 0;
        top:25%;
        height:100%;
        transform: scale(.5);
        transform-origin: 0 0;
        pointer-events: none;
        box-sizing: border-box;
        border: 1rpx solid #E7E7E7;
      }
    }
  }
   .nav_item {
     background: #fff;
    width: 100%;
    display: flex;
    height: 88rpx;
    justify-content: space-between;
    align-items: center;
    .nav_item_name {
      font-size: 30rpx;
      height: 100%;
      line-height: 88rpx;
    }
    .nav_item_name_active {
      font-size: 30rpx;
      font-weight: bold;
      color: #333;
      height: 100%;
      line-height: 88rpx;
      position: relative;
    }
    .nav_item_name_active::after {
      content: "";
      height: 4rpx;
      width: 100%;
      background: #000000;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }

   // 台位统计
  .taiwei {
    .top_view {
      width: 100%;
      height: auto;
      background: #fff;
      border-radius: 10rpx;
      padding: 20rpx;
      margin: 100rpx 0;
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
</style>
