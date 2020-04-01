<template>
  <view class="commission-details p-lr-30 p-tb-30">
    <view class="top_view">
      <view class="top" @click="showPop">
        <text>{{startTime1}}</text>
        <text class="iconfont">&#xe6b2;</text>
        <text class="iconfont">&#xe622;</text>
        <text>{{endTime1}}</text>
        <text class="iconfont">&#xe6b2;</text>
      </view>
      <view class="botm">
        <text class="f26">业绩￥153000.23</text>
        <text class="f26">业绩￥153000.23</text>
      </view>
    </view>
    <view class="m-top-30 bg">
      <view
        v-for="index in 5"
        :key="index"
        class="cell-item min-flex min-flex-main-between p-tb-30 p-lr-20 min-border-bottom"
      >
        <view class="min-flex">
          <view class style="width:300rpx">
            <view class="f28">Simba基础提成</view>
            <view class="label m-top-10 f24 assist-text min-ellipsis">2019-06-01 16:32:00</view>
          </view>
        </view>
        <view class="min-flex flex-end min-flex-dir-top">
          <view :class=" index <= 3 ? 'ablack' : 'ared'">{{index <= 3 ? '-220' : '+110'}}</view>
          <view class="bom">业绩2500.00</view>
        </view>
      </view>
    </view>
    <min-popup :show="show" @close="close">
      <view class="picer-top">
         <view :class="index === 0 ? 'left' : 'none_ac' " @click="start">
            <view class="main">
             <text class="f24 m-bottom-30">开始日期</text>
             <text style="font-size:32rpx;color:#000">{{startTime}}</text>
            </view>
         </view>
         <view style="width:2rpx;height:118rpx;background:#979797;opacity:0.24;"></view>
         <view :class="index === 1 ? 'right' : ' none_ac' "  @click="end">
            <view class="main">
             <text class="f24 m-bottom-30">结束日期</text>
             <text style="font-size:32rpx;color:#000">{{endTime}}</text>
            </view>
         </view>
      </view>
      <picker-view
        :indicator-style="indicatorStyle"
        :value="value"
        @change="bindChange"
        style="height:400rpx;margin-bottom:50rpx"
      >
      <picker-view-column >
           <view class="picker item" v-for="(item,index) in data" :key="index">{{item}}</view>
      </picker-view-column>
      </picker-view>
      <view class="btn_view">
         <text @click="cancel">取消</text>
         <view class="btn" @click="sure">确认</view>
      </view>
    </min-popup>
  </view>
</template>
<script>
export default {
  name: 'commission-details',
  navigate: ['navigateTo'],
  data () {
    return {
      show: false,
      date: '2020-10-2',
      index: 0,
      value: [],
      indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth / (750 / 100))}rpx;`,
      years: [],
      months: [],
      days: [],
      dayLength: Number,
      data: [],
      startTime: (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日' + ' ' + new Date().getFullYear(),
      endTime: (new Date().getMonth() + 1) + '月' + (new Date().getDate() + 1) + '日' + ' ' + new Date().getFullYear(),
      startTime1: '2020年1月2日',
      endTime1: '2020年1月2日',
      num: Number
    }
  },
  mounted () {
    const time = new Date()
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    this.dayLength = this.getDaysInOneMonth(year, month)
    this.getYears()
    this.getMonth()
    this.getDays()
    for (const va of this.years) {
      for (const val of this.months) {
        for (const val1 of this.days) {
          this.data.push(val + '月' + val1 + '日' + ' ' + va)
        }
      }
    }
    const a = month + '月' + time.getDate() + '日' + ' ' + year
    this.data.map((item, index) => {
      if (item === a) {
        // 起始位置
        this.value.push(index)
      }
    })
  },
  methods: {
    // 获得年份
    getYears () {
      const time = new Date()
      for (let i = 2019; i <= time.getFullYear(); i++) {
        this.years.push(i)
      }
    },
    // 获取月份
    getMonth () {
      for (let i = 1; i <= 12; i++) {
        this.months.push(i)
      }
    },
    getDays () {
      //  this.dayLength
      for (let i = 1; i <= this.dayLength; i++) {
        this.days.push(i)
      }
    },
    // 获取某年某月多少天
    getDaysInOneMonth (year, month) {
      month = parseInt(month, 10)
      var d = new Date(year, month, 0)
      return d.getDate()
    },
    bindChange: function (e) {
      this.num = e.detail.value[0]
      if (this.index === 0) {
        this.startTime = this.data[e.detail.value[0]]
      }
      if (this.index === 1) {
        this.endTime = this.data[e.detail.value[0]]
      }
    },
    showPop () {
      this.show = !this.show
    },
    close () {
      this.show = false
    },
    start () {
      this.index = 0
    },
    end () {
      this.index = 1
    },
    // 确认日期
    sure () {
      this.show = false
      const stTime = this.startTime.split(' ')
      const enTime = this.endTime.split(' ')
      let startime = ''
      let endtime = ''
      startime = stTime[1] + '年' + stTime[0]
      endtime = enTime[1] + '年' + enTime[0]
      this.startTime1 = startime
      this.endTime1 = endtime
      this.value = []
      this.value.push(this.num)
    },
    // 取消
    cancel () {
      this.show = false
    }
  }
}
</script>
<style lang="scss" scoped>
.top_view {
  width: 100%;
  height: 100rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top {
    width: 100%;
    height: 35rpx;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    text {
      margin: 0 5rpx;
      display: block;
    }
  }
  .botm {
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 5rpx;
    text {
      color: rgba(102, 102, 102, 1);
    }
  }
}
.bg {
  background: #fff;
}
.cell-item {
  .label {
    width: 410rpx;
  }
  .ablack {
    color: #333;
    font-weight: bold;
  }
  .ared {
    color: #ff0000;
    font-weight: bold;
  }
  .bom {
    font-size: 24rpx;
    color: rgba(102, 102, 102, 1);
  }
}
.picer-top{
    width: 100%;
    height: 200rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30rpx;
    .left{
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      .main{
        display: flex;
        flex-direction: column;
      }
    }
    .right{
       width: 50%;
       height: 100%;
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
      position: relative;

      .main{
        display: flex;
        flex-direction: column;
      }
    }
    .none_ac{
       width: 50%;
       height: 100%;
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       font-size:32rpx;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(153,153,153,1);
        opacity:0.36;
        position: relative;
      .main{
        display: flex;
        flex-direction: column;
      }
    }
    .sure{
     color: #007aff;
    }
    }
  .picker{
    text-align: center;
    line-height: 50rpx;
    width: auto;
  }
  .btn_view{
    width: 100%;
    height: 100rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text{
      font-size:36rpx;
      color:rgba(190,190,190,1);
    }
    .btn{
      width:394rpx;
      height:100rpx;
      background:rgba(255,224,1,1);
      border-radius:16rpx 16rpx 16rpx 16rpx;
      line-height: 100rpx;
      text-align: center;
      color: #333;
      font-size:36rpx;
    }
  }
</style>
