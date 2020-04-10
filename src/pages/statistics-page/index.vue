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
         <!-- 数据总览 -->
          <view class="shuju" v-if="listItem.currentTab === 0" >
            <view class="top-view" >
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
            <view class="top_view_main">
              <view class="top">
                <text>{{startTime1}}</text>
                <text class="iconfont">&#xe6b2;</text>
                <text class="iconfont">&#xe68c;</text>
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

              <canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
            </view>
          </view>
          <!-- 台位统计 -->
          <view class="taiwei" v-if="listItem.currentTab === 1">
            <view class="title_list" >
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
            <view class="top_view" >
              <view class="top">
                <text>{{startTime1}}</text>
                <text class="iconfont">&#xe6b2;</text>
                <text class="iconfont">&#xe68c;</text>
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
            <!-- 商品统计 -->
          <view class="shangpin"  v-if="listItem.currentTab === 2">
              <view class="top">
                <text>{{startTime1}}</text>
                <text class="iconfont">&#xe6b2;</text>
                <text class="iconfont" style="font-weight:500">&#xe68c;</text>
                <text>{{endTime1}}</text>
                <text class="iconfont">&#xe6b2;</text>
              </view>
              <view class="view_main p-lr-20 p-tb-20">
                <view class="title_view" @click="toPrductsails(0)">
                   <text class="f30">商品销售排行榜</text>
                   <text class="f26">更多 >></text>
                </view>
                 <canvas  canvas-id="canvasPiegoods" id="canvasPiegoods" class="charts" @touchstart="touchPie1"></canvas>
              </view>
              <view class="view_main p-lr-20 p-tb-20">
                <view class="title_view"  @click="toPrductsails(1)">
                   <text class="f30">SKU销售排行榜</text>
                   <text class="f26">更多 >></text>
                </view>
                <canvas  canvas-id="canvasColumn" id="canvasColumn" class="chartss" @touchstart="touchColumn2"></canvas>
              </view>
          </view>
          <!-- 人员统计 -->
           <view class="man"  v-if="listItem.currentTab === 3">
              <view class="top">
                <text>{{startTime1}}</text>
                <text class="iconfont">&#xe6b2;</text>
                <text class="iconfont" style="font-weight:500">&#xe68c;</text>
                <text>{{endTime1}}</text>
                <text class="iconfont">&#xe6b2;</text>
              </view>
              <view class="view_main p-lr-20 p-tb-20">
                <view class="title_view" @click="toPrductsails(2)">
                   <text class="f30">订台人角色业绩分布</text>
                   <text class="f26">更多 >></text>
                </view>
                 <canvas  canvas-id="canvasPieman" id="canvasPieman" class="charts" @touchstart="touchPieman1"></canvas>
              </view>
              <view class="view_main p-lr-20 p-tb-20">
                <view class="title_view"  @click="toPrductsails(3)">
                   <text class="f30">下单人角色业绩分布</text>
                   <text class="f26">更多 >></text>
                </view>
                <canvas  canvas-id="canvasColuman" id="canvasColuman" class="charts" @touchstart="touchColuman2"></canvas>
              </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>

  </view>
</template>

<script>
import uCharts from '../../components/ucharts/u-charts.min.js'
var _self
var canvaPie = null
var canvaColumn = null
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
      list: [{ currentTab: 0 }, { currentTab: 1 }, { currentTab: 2 }, { currentTab: 3 }],
      // 数据总览
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
          data: [15, { value: 20, color: '#f04864' }, 45, 37, 43, 34, 50]
        }]
      },
      // 人员统计柱状图
      chartData3: {
        categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
        series: [{
          name: '成交量1',
          data: [15, { value: 20, color: '#f04864' }, 45, 37, 43, 34, 100]
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
    this.$nextTick(() => {
      // 初始化图表
      this.getServerData()
    })
  },
  watch: {
    currentTab (a) {
      _self = this
      _self.cWidth = uni.upx2px(700)
      _self.cHeight = uni.upx2px(450)
      this.$nextTick(() => {
        // 初始化图表
        this.getServerData()
      })
    }
  },
  methods: {
    getServerData () {
      const Pie = { series: [] }
      let Colum = { }
      // 这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
      if (this.currentTab === 0) {
        Pie.series = this.chartData.series
        // ID 数据 是否显示图例  粗细   （环形图表）
        _self.showPie('canvasPie', Pie, true, 25)
      } else if (this.currentTab === 1) {
      } else if (this.currentTab === 2) {
        Pie.series = this.chartData1.series
        Colum = this.chartData2
        _self.showPie('canvasPiegoods', Pie, false, 40)
        _self.showColumn('canvasColumn', Colum)
      } else if (this.currentTab === 3) {
        Pie.series = this.chartData1.series
        Colum = this.chartData3
        _self.showPie('canvasPieman', Pie, false, 40)
        _self.showColumn('canvasColuman', Colum)
      }
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
    },
    touchPie (e) {
      // 自定义点击展示数据
      const textList = [{ text: '我是一个标题', color: null }, { text: '自定义1：值1000', color: null }, { text: '自定义2：值2', color: null }, { text: '自定义3：值3', color: null }]
      canvaPie.showToolTip(e, {
        textList
      })
    },
    touchPie1 (e) {
      // 自定义点击展示数据
      const textList = [{ text: '商品统计', color: null }, { text: '自定义1：值1000', color: null }, { text: '自定义2：值2', color: null }, { text: '自定义3：值3', color: null }]
      canvaPie.showToolTip(e, {
        textList
      })
    },
    touchPieman1 (e) {
      // 自定义点击展示数据
      const textList = [{ text: '商品统计', color: null }, { text: '自定义1：值1000', color: null }, { text: '自定义2：值2', color: null }, { text: '自定义3：值3', color: null }]
      canvaPie.showToolTip(e, {
        textList
      })
    },
    touchColumn2 (e) {
      const textList = [{ text: '商品统计', color: null }, { text: '自定义1：值1000', color: null }]
      canvaColumn.showToolTip(e, {
        textList
      })
    },
    touchColuman2 (e) {
      const textList = [{ text: '商品统计', color: null }, { text: '自定义1：值1000', color: null }]
      canvaColumn.showToolTip(e, {
        textList
      })
    },
    touchColumn3 (e) {
      const textList = [{ text: '商品统计', color: null }, { text: '自定义1：值1000', color: null }]
      canvaColumn.showToolTip(e, {
        textList
      })
    },
    changeTab (e) {
      this.currentTab = e
    },
    change (index) {
      this.indexActive = index
    },
    // 体砖单品销售排行
    toPrductsails (type) {
      this.$minRouter.push({
        name: 'product-sales',
        params: { type }
      })
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

<style lang="scss" >
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
// 人员统计
.man{
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
