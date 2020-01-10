<template>
  <view class="order-make p-lr-30 p-tb-20">
    <min-cell class="top-view" :card="false">
      <view class="top-title-view min-flex min-flex-main-between">
        <text class="f34 left-title">K112</text>
        <view class="min-flex min-flex-align-center min-flex-main-center">
          <min-avatar size="nm" url="../../static/images/headurl60.png"></min-avatar>
          <text class="f28 p-left-20">SIMBA</text>
        </view>
      </view>
      <view class="min-border-bottom"></view>
      <view class="main-view min-flex min-flex-dir-top min-flex-align-top">
        <view class="m-top-30 m-bottom-10">分&nbsp;&nbsp;&nbsp;&nbsp;组：卡座</view>
        <view class="m-bottom-10">低&nbsp;&nbsp;&nbsp;&nbsp;消：￥200</view>
        <view class="m-bottom-30">座&nbsp;&nbsp;&nbsp;&nbsp;位：4座</view>
      </view>
    </min-cell>
    <view class="m-tb-20"></view>
    <min-cell class="mid-view" :card="false">
      <min-desc-input desc="客户姓名" v-model="name" sign="*" placeholder="请输入姓名" value="刘青松"></min-desc-input>
      <min-desc-input desc="联系电话" v-model="phone" sign="*" placeholder="请输入联系电话"></min-desc-input>
      <view class="min-flex min-flex-main-between f28 min-border-bottom">
        <min-desc-input sign="*" desc="预约时间" :value='appointmentDate' placeholder="请选择预约日期" :disabled="true"></min-desc-input>
        <img class="right-arrow p-left-10" src="../../static/images/arrow.png" />
      </view>
      <view class="min-flex min-flex-main-between f28">
        <min-desc-input desc="预抵时间" sign="*"  :value='shopDate' placeholder="请选择到店日期" :disabled="true"></min-desc-input>
        <img class="right-arrow p-left-10" src="../../static/images/downarrow24.png" />
      </view>
      <view class="chioce-date">
        <view
          class="m-bottom-20 m-right-20"
          :class="current === n ? 'chioce-date-item-active' : 'chioce-date-item'"
          v-for="(i,n) in date"
          :key="n"
          @click="chioce(n)"
        >{{i}}</view>
      </view>
      <text class="m-bottom-20" style="display:block">凌晨</text>
      <view class="chioce-date">
        <view
          class="m-bottom-20 m-right-20"
          v-for="(i,n) in date"
          :key="n"
          :class="nextCurrent === n ? 'chioce-date-item-active' : 'chioce-date-item'"
          @click="chioceNext(n)"
        >{{i}}</view>
      </view>
      <view class="min-border-bottom"></view>
      <min-switch desc="是否当天生日" v-model="isShengri" ></min-switch>
    </min-cell>
    <view class="m-tb-20"></view>
    <min-remarks  v-model='value'></min-remarks>
    <view class="empty-view"></view>
    <view class="btn">
      <min-btn :long="true" @click="submit" :opacity='false'>提交</min-btn>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      date: ['8:00', '23:00', '9:00', '20:00', '20:00', '20:00', '20:00'],
      current: Number,
      nextCurrent: Number,
      isShengri: false,
      name: '',
      phone: '',
      value: '',
      shopDate: '',
      appointmentDate: ''
    }
  },
  watch: {
    name (a) {
      console.log(a)
    }
  },
  methods: {
    chioce (n) {
      // console.log(n)
      this.current = n
      this.nextCurrent = null
      this.shopDate = this.date[n]
    },
    chioceNext (n) {
      this.nextCurrent = n
      this.current = null
      this.shopDate = this.date[n]
    },
    submit () {
      // console.log(this.value)
      // console.log(this.isShengri)
      this.$router.push(['navigateTo', 'pages/platform-history/index', '123'])
    }
  }
}
</script>

<style lang="scss" scoped>
.order-make {
  .top-view {
    width: 690rpx;
    height: 286rpx;
    .top-title-view {
      height: 86rpx;
      .left-title {
        color: #ff0000;
      }
    }
    .main-view {
      background: #f0f0;
    }
  }
  .mid-view {
    width: 690rpx;
    height: auto;
  }
  .oinput {
    text-align: right;
    line-height: 98rpx;
  }
  .ophone {
    padding-right: 34rpx;
  }
  .right-arrow {
    width: 24rpx;
    height: 24rpx;
    padding-top: 5rpx;
  }
  .desc-width {
    width: 200rpx;
  }
  .chioce-date {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    .chioce-date-item {
      width: 112rpx;
      height: 58rpx;
      border: 1rpx solid #e7e7e7;
      border-radius: 10rpx;
      font-size: 28rpx;
      text-align: center;
      line-height: 58rpx;
    }
    .chioce-date-item-active {
      width: 112rpx;
      height: 58rpx;
      background: rgba(255, 224, 1, 1);
      border-radius: 10rpx;
      font-size: 28rpx;
      text-align: center;
      line-height: 58rpx;
    }
    .chioce-date-item:nth-child(5n) {
      margin: 0;
    }
    .chioce-date-item-active:nth-child(5n) {
      margin: 0;
    }
  }
}
.btn {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}
.empty-view {
  height: 240rpx;
}
</style>
