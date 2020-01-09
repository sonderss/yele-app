<template>
  <view class="login">
    <image src="/static/images/login/back.png" class="bg-img"></image>
    <view style="height: 50rpx;"></view>
    <view class="m-lr-30 p-lr-30">
      <view class="inp p-left-30 min-flex min-flex-main-start min-border-bottom">
        <image class="icon" src="/static/images/login/user.png"></image>
        <input type="number" v-model="phone" placeholder="请输入手机号码" maxlength="11">
        <view class="clear-icon" v-show="phone" @click="phone = ''">
          <image src="/static/images/clear.png"></image>
        </view>
      </view>
      <view class="inp p-left-30 min-flex min-flex-main-between min-border-bottom">
        <view class="min-flex min-flex-main-start">
          <image class="icon" src="/static/images/login/lock.png"></image>
          <input type="number" placeholder="请输入验证码">
        </view>
        <view class="code" @click="countDown" v-if="code === 0">获取验证码</view>
        <view v-else class="white">{{code}} s</view>
      </view>
    </view>
    <view style="height: 114rpx"></view>
    <view class="p-lr-30">
      <min-btn shape="circle">登录</min-btn>
    </view>
  </view>
</template>

<script>
import MinBtn from '@/components/min-btn'
import MinCommon from '@/utils/min-common'
export default {
  name: 'login',
  components: {
    MinBtn
  },
  data () {
    return {
      code: 0,
      phone: ''
    }
  },
  methods: {
    countDown () {
      MinCommon.setCountDown((num) => {
        this.code = num
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  background: #030313;
  width: 100vw;
  min-height: 100vh;
  .bg-img {
    width: 100%;
    height: 466rpx;
  }
  .inp {
    margin-top: 50rpx;
    height: 66rpx;
    font-size: 30rpx;
    position: relative;
    input {
      padding-left: 56rpx;
      width: 400rpx;
      color: #FFFFFF;
    }
    .code {
      color: #FA315F;
    }
    .clear-icon{
      width: 66rpx;
      height: 66rpx;
      padding: 20rpx;
      position: absolute;
      right: 0rpx;
      top: -4rpx;
    }
  }
  .icon {
    width: 40rpx;
    height: 40rpx;
  }
}
</style>
