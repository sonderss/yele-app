<template>
  <view class="withdrawals-record p-lr-30 p-tb-20">
    <view class="top_view">
      <view class="top">
        <text>{{time}}</text>
      </view>
      <view class="botm">
        <text class="f26">提现￥153000.23</text>
        <text class="f26" @click="changeTime">切换时间 ></text>
      </view>
    </view>
    <view class="m-top-10">
      <view
        v-for="index in 5"
        :key="index"
        class="cell-item min-flex min-flex-main-between p-tb-30 p-lr-20 min-border-bottom"
        @click="toDeatil(index)"
      >
        <view class="min-flex">
          <view class style="width:300rpx">
            <view class="f28">Simba基础提成</view>
            <view class="label m-top-10 f24 assist-text min-ellipsis">2019-06-01 16:32:00</view>
          </view>
        </view>
        <view class="min-flex flex-end min-flex-dir-top">
          <view :class="index <= 3 ? 'ablack' : 'ared'">-220</view>
        </view>
      </view>
    </view>
    <min-popup :show="show" @close="close" heightSize="600">
      <picker-view
        :indicator-style="indicatorStyle"
        :value="value"
        @change="bindChange"
        style="height:400rpx;"
      >
        <picker-view-column>
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
  name: 'withdrawals-record',
  navigate: ['navigateTo'],
  data () {
    return {
      time: '2020年3月',
      show: false,
      value: [],
      data: [],
      years: [],
      months: [],
      num: Number,
      indicatorStyle: `height: ${Math.round(
        uni.getSystemInfoSync().screenWidth / (750 / 100)
      )}rpx;`
    }
  },
  mounted () {
    this.getYears()
    this.getMonth()
    for (const va of this.years) {
      for (const val of this.months) {
        this.data.push(va + '年' + val + '月')
      }
    }
  },
  methods: {
    toDeatil () {
      this.$minRouter.push({
        name: 'withdrawals-d'
      })
    },
    changeTime () {
      this.show = !this.show
    },
    bindChange (e) {
      this.num = e.detail.value[0]
    },
    close () {
      this.show = false
    },
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
    sure () {
      this.time = this.data[this.num]
      this.value = []
      this.value.push(this.num)
      this.show = false
    },
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
    display: flex;
    justify-content: space-between;
    text {
      color: rgba(102, 102, 102, 1);
    }
  }
}
.cell-item {
  background: #fff;
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
.picker {
  text-align: center;
  line-height: 50rpx;
  width: auto;
}
.btn_view {
  width: 100%;
  height: 100rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 50rpx;
  left: 0;
  text {
    font-size: 36rpx;
    color: rgba(190, 190, 190, 1);
  }
  .btn {
    width: 394rpx;
    height: 100rpx;
    background: rgba(255, 224, 1, 1);
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    line-height: 100rpx;
    text-align: center;
    color: #333;
    font-size: 36rpx;
  }
}
</style>
