<template>
  <view class="login">
    <image src="/static/images/login/back.png" class="bg-img" />
    <view style="height: 50rpx;"></view>
    <view class="m-lr-30 p-lr-30">
      <view class="inp p-left-30 min-flex min-flex-main-start">
        <image class="icon" src="/static/images/login/user.png" />
        <input type="number" v-model="mobile" placeholder="请输入手机号码" maxlength="11" />
        <view class="clear-icon" v-show="mobile" @click="mobile = ''">
          <image src="/static/images/clear.png" />
        </view>
      </view>
      <view class="inp p-left-30 min-flex min-flex-main-between">
        <view class="min-flex min-flex-main-start">
          <image class="icon" src="/static/images/login/lock.png" />
          <input type="number" maxlength="6" v-model="code" placeholder="请输入验证码" />
        </view>
        <view class="code" @click="getVerificationCode" v-if="countDown === 0">获取验证码</view>
        <view v-else class="white">{{countDown}} s</view>
      </view>
    </view>
    <view style="height: 114rpx"></view>
    <view class="p-lr-30">
      <min-btn @click="login" shape="circle">
        <text style="font-size:30rpx">登 录</text>
      </min-btn>
    </view>
  </view>
</template>

<script>
import '../../static/js/quit';
export default {
  name: 'login',
  navigate: ['navigateTo', 'reLaunch'],
  data() {
    return {
      countDown: 0,
      code: '',
      mobile: '',
      flag: true,
    };
  },
  methods: {
    getVerificationCode() {
      // 获取验证码
      if (!this.$minCommon.checkMobile(this.mobile)) {
        this.$showToast('请输入正确的手机号码');
        return;
      }
      this.$minApi.getVerificationCode({ mobile: this.mobile }).then((res) => {
        this.$showToast('发送成功');
        this.$minCommon.setCountDown((num) => {
          // 倒计时
          this.countDown = num;
        });
      });
    },
    login() {
      if (!this.flag) return;
      this.flag = false;
      if (!this.$minCommon.checkMobile(this.mobile) || this.code.length !== 6)
        return this.$showToast('请正确填写信息');
      this.$minApi
        .login({ mobile: this.mobile, code: this.code })
        .then((res) => {
          this.$showToast('登录成功');
          setTimeout(() => {
            this.$store.dispatch('user/setUserInfo', res);
            uni.redirectTo({
              url: '../index/index',
            });
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          this.flag = true;
        });
    },
  },
};
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
    border-bottom: 1rpx solid #333;
    input {
      padding-left: 56rpx;
      width: 400rpx;
      color: #ffffff;
    }
    .code {
      color: #ffe001;
    }
    .clear-icon {
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
