<template>
  <view class="statistics-page p-lr-20 p-tb-30">
    <min-navTab ref="navTab" :tabTitle="tabTitle" @changeTab="changeTab"></min-navTab>
    <swiper style="height:100vh" :current="currentTab" @change="swiperTab">
      <swiper-item v-for="(listItem,listIndex) in list" :key="listIndex">
        <scroll-view
          style="height: auto"
          scroll-y="true"
          @scrolltolower="lower1"
          scroll-with-animation
          :scroll-into-view="toView"
        >
          <!-- 台位统计 -->
          <view class="taiwei">
            <view class="title_list" v-if="currentTab === 1">
              <view
                :class="index === indexActive ?  'item_active':  'item'"
                v-for="(item,index) in itemList"
                :key="index"
                @click="change(index)"
              >
                <text class="f26">{{item.name}}</text>
                <text class="f26">{{item.num}}</text>
              </view>
            </view>
            <view class="top_view" v-if="currentTab === 1">
              <view class="top">
                <text>{{startTime1}}</text>
                <text class="iconfont">&#xe6b2;</text>
                <text class="iconfont">&#xe622;</text>
                <text>{{endTime1}}</text>
                <text class="iconfont">&#xe6b2;</text>
              </view>
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
          <!-- 数据总览 -->
          <view class="shuju">
            <view class="top-view" v-if="currentTab === 0">
              <view class="t-view">
                <text class="price f28">今日实收</text>
                <view class="money">
                  <view class="money_view">
                    <text class="icon">￥</text>
                    <text class="tr">8888.88</text>
                  </view>

                  <view
                    class="timer p-bottom-30"
                    style="color:#EEEEEE;font-size:20rpx"
                  >更新时间：2020-03-16 14:30:00</view>
                </view>
              </view>
              <view class="b-view">
                <view class="left-view">
                  <text class="f22">已开台数</text>
                  <text class="f28 c m-top-10">1000</text>
                </view>
                <view class="right-view">
                  <text class="f22">今日开台次数</text>
                  <text class="f28 c m-top-10">1000</text>
                </view>
              </view>
            </view>
            <view class="top_view_main" v-if="currentTab === 0">
              <view class="top">
                <text>{{startTime1}}</text>
                <text class="iconfont">&#xe6b2;</text>
                <text class="iconfont">&#xe622;</text>
                <text>{{endTime1}}</text>
                <text class="iconfont">&#xe6b2;</text>
              </view>
              <view class="m-top-20"></view>
              <view  class="m-bottom-10  t_main min-border-top  min-border-bottom" >
                  <text class="f28">营业额</text>
                  <text class="f28">￥1000 </text>
              </view>
              <view  class="m-bottom-10  t_main min-border-top  min-border-bottom" >
                  <text class="f28">优惠金额</text>
                  <text class="f28">￥1000 </text>
              </view>
              <view  class="m-bottom-10  t_main min-border-top  min-border-bottom" >
                  <text class="f28">实收</text>
                  <text class="f28">￥1000  </text>
              </view>
              <view  class="m-bottom-10  t_main min-border-top  min-border-bottom" >
                  <text class="f28">退款</text>
                  <text class="f28">￥1000  </text>
              </view>
              <!-- <block v-for="(item, index) in arr" :key="index">
                  <view class="qiun-columns" style="background-color: #FFFFFF;">
                      <min-charts canvas-id="itemad" :chartType="item.chartType"  class="charts" :opts="item.opts" ref="itemd" /></min-charts>
                  </view>
              </block> -->
              <canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>

  </view>
</template>

<script>
// import MinCharts from '../../components/ucharts/min-charts'
// import dataList from '../../static/data.json'
import uCharts from '../../components/ucharts/u-charts.min.js'
var _self
var canvaPie = null
export default {
  name: 'statistics-page',
  navigate: ['navigateTo'],
  components: {
    // MinCharts
  },
  data () {
    return {
      // dataList,
      currentTab: 0,
      arr: [],
      toView: '',
      tabTitle: ['数据总览', '台位统计', '商品统计', '人员统计'],
      // 台位统计
      itemList: [
        { name: '已开台', num: 20 },
        { name: '台位数量', num: 20 },
        { name: '取消订台数量', num: 632852 },
        { name: '台均消费', num: 20 },
        { name: '已开台', num: 20 },
        { name: '已开台', num: 20 }
      ],
      indexActive: 0,
      startTime1: '2020年3月1日',
      endTime1: '2020年3月2日',
      mainTitle: ['台位', '开台次数', '消费额'],
      // 台位统计
      mainItem: [
        { order: 'K1221', num: '1231', price: '￥5000' },
        { order: 'K1221', num: '1231', price: '￥5000' },
        { order: 'K1221', num: '1231', price: '￥5000' },
        { order: 'K1221', num: '1231', price: '￥5000' }
      ],
      list: [[], [], []],
      chartData: {
        series: [{
          name: '支付宝',
          data: 50
        }, {
          name: '微信',
          data: 30
        }, {
          name: '刷卡',
          data: 20
        }, {
          name: '现金',
          data: 18
        }]
      },
      cWidth: '',
      cHeight: '',
      pixelRatio: 1,
      serverData: ''
    }
  },
  mounted () {
    _self = this
    this.cWidth = uni.upx2px(700)
    this.cHeight = uni.upx2px(450)
    this.getServerData()
  },
  updated () {
    console.log(123)
    _self = this
    this.cWidth = uni.upx2px(700)
    this.cHeight = uni.upx2px(450)
    this.getServerData()
  },
  methods: {
    getServerData () {
      const Pie = { series: [] }
      // 这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
      Pie.series = this.chartData.series
      _self.showPie('canvasPie', Pie)
    },
    showPie (canvasId, chartData) {
      // eslint-disable-next-line new-cap
      canvaPie = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: 'pie',
        fontSize: 11,
        dataLabel: false,
        legend: {
          show: true,
          position: 'right',
          float: 'right',
          itemGap: 10,
          padding: 5,
          lineHeight: 26,
          margin: 5,
          borderWidth: 1
        },
        dataPointShapeType: 'hollow',
        background: '#FFFFFF',
        pixelRatio: _self.pixelRatio,
        series: this.chartData.series,
        animation: true,
        width: _self.cWidth * _self.pixelRatio,
        height: _self.cHeight * _self.pixelRatio,
        extra: {
          pie: {
            labelWidth: 10,
            ringWidth: 10
          }
        }
      })
      this.piearr = canvaPie.opts.series
    },
    touchPie (e) {
      canvaPie.showToolTip(e, {
        format: function (item) {
          return item.name + ':' + item.data
        }
      })
    },
    changeTab (e) {
      this.currentTab = e
    },
    change (index) {
      this.indexActive = index
    },
    // swiper 滑动
    swiperTab: function (e) {
      var index = e.detail.current // 获取索引
      this.$refs.navTab.longClick(index)
    },
    // 加载更多 util.throttle为防抖函数
    lower1 () {
      this.throttle(function (e) {
        console.log(`加载${this.currentTab}`) // currentTab表示当前所在页数 根据当前所在页数发起请求并带上page页数
        uni.showLoading({
          title: '加载中',
          mask: true
        })
        this.isRequest().then(res => {
          const tempList = this.list
          tempList[this.currentTab] = tempList[this.currentTab].concat(res)
          console.log(tempList)
          this.list = tempList
          this.$forceUpdate() // 二维数组，开启强制渲染
        })
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
.statistics-page {
  .title_list {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 80rpx;
    .item {
      width: 154rpx;
      background: #fff;
      margin-bottom: 20rpx;
      padding: 10rpx;
      border-radius: 5rpx;
      text-align: center;
      margin-right: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .item_active {
      width: 154rpx;
      background: #ffe001;
      margin-bottom: 20rpx;
      padding: 10rpx;
      border-radius: 5rpx;
      text-align: center;
      margin-right: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-weight: bold;
    }
    .item_active {
      width: 154rpx;
      background: #ffe001;
      margin-bottom: 20rpx;
      padding: 10rpx;
      border-radius: 5rpx;
      text-align: center;
      margin-right: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-weight: bold;
    }
    .item_active:nth-child(4n) {
      margin-right: 0;
    }
    .item:nth-child(4n) {
      margin-right: 0;
    }
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
// 数据总览
.shuju {
  .top-view {
    width: 100%;
    height: auto;
    background: #030313;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10rpx;
    overflow: hidden;
    margin-top: 80rpx;
    .t-view {
      height: 234rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .price {
        width: auto;
        height: 26rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
        line-height: 26rpx;
        margin-bottom: 30rpx;
        padding-top: 30rpx;
      }
      .money {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 20rpx;
        .money_view {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .tr {
          display: block;
          font-size: 84rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(255, 224, 1, 1);
        }
        .icon {
          display: block;
          font-size: 48rpx;
          color: rgba(255, 224, 1, 1);
        }
      }
    }
    .b-view {
      height: 122rpx;
      background: rgba(55, 52, 69, 1);
      border-radius: 0px 0px 10rpx 10rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text {
        color: #fff;
        color: rgba(204, 204, 204, 1);
      }
      .c {
        color: #ffe001;
      }
      .left-view {
        width: 50%;
        height: 122rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      .right-view {
        width: 50%;
        height: 122rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
    }
  }
  .top_view_main {
    width: 100%;
    height: auto;
    background: #fff;
    border-radius: 10rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    .top {
      text {
        color: #666666;
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
    .t_main{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 85rpx;
    }
  }
}
.charts{width: 100%; height:500rpx;background-color: #FFFFFF;}
</style>
