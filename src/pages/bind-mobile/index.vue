<template>
  <view class="bind-mobile p-top-20">
    <view class="p-lr-30">
      <view class="inp p-left-30 p-tb-35 min-flex min-flex-main-between min-border-bottom">
        <view class="min-flex min-flex-main-start">
          <input type="number"  maxlength="11" placeholder="请输入手机号码">
        </view>
        <view class="theme-text f26 p-lr-30" @click="countDown" v-if="code === 0">获取验证码</view>
        <view v-else class="theme-text">{{code}} s</view>
      </view>
    </view>
    <view class="p-lr-30">
      <view class="inp p-lr-30 p-tb-35 min-flex min-flex-main-start min-border-bottom">
        <input type="number" placeholder="请输入验证码" maxlength="11">
      </view>
    </view>
  </view>
</template>

<script>

export default {
  data () {
    return {
      code: 0
    }
  },
  methods: {
    countDown () {
      this.$minCommon.setCountDown((num) => {
        console.log(num)
        this.code = num
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bind-mobile {
  background: #fff;
  width: 100vw;
  min-height: 100vh;
  .inp {
    font-size: 30rpx;
  }
  .icon {
    width: 40rpx;
    height: 40rpx;
  }
}
</style>
