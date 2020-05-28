<template>
  <view class="bind-mobile p-top-20">
    <view class="p-lr-30">
      <view class="inp p-left-30 p-tb-35 min-flex min-flex-main-between min-border-bottom">
        <view class="min-flex min-flex-main-start">
          <input type="number" v-model="newPhone" maxlength="11" placeholder="请输入手机号码">
        </view>
        <view class="f26  btn" @click="countDown" v-if="code === 0">获取验证码</view>
        <view v-else class="theme-text">{{code}} s</view>
      </view>
    </view>
    <view class="p-lr-30">
      <view class="inp p-lr-30 p-tb-35 min-flex min-flex-main-start min-border-bottom">
        <input type="number" v-model="phoneCode" placeholder="请输入验证码" maxlength="6">
      </view>
    </view>
  </view>
</template>

<script>

export default {
  name: 'bind-mobile',
  navigate: ['navigateTo'],
  data () {
    return {
      code: 0,
      newPhone: '',
      phoneCode: '',
      oldPhone: ''
    }
  },
  onNavigationBarButtonTap () {
    if (!this.$minCommon.checkMobile(this.newPhone) || this.phoneCode.length !== 6) return this.$showToast('请完整信息')
    // 修改手机号
    this.$minApi.setPhone({
      old_mobile: this.oldPhone,
      new_mobile: this.newPhone,
      msg_code: this.phoneCode
    }).then(res => {
      console.log('请求修改手机号接口', res)
      if (res.length === 0) {
        // 修改全局变量
        this.$store.state.user.userInfo.mobile = this.newPhone
        console.log(this.$store.state.user.userInfo)
        this.$showToast('修改手机号成功')
        setTimeout(() => {
          this.$minRouter.push({
            name: 'mine-info',
            type: 'redirectTo'
          })
        }, 2000)
      }
    })
  },
  onLoad () {
    this.oldPhone = this.$parseURL().phone
  },
  methods: {
    countDown () {
      if (!this.$minCommon.checkMobile(this.newPhone)) return this.$showToast('请输入正确的手机号')

      this.$minApi.getVerificationCode({ mobile: this.newPhone }).then(res => {
        this.$showToast('发送成功')
        this.$minCommon.setCountDown((num) => {
          this.code = num
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
uni-page-body{background: #fff;height: 100%;width: 100%;}
.bind-mobile {
  .inp {
    font-size: 30rpx;
  }
  .icon {
    width: 40rpx;
    height: 40rpx;
  }
  .btn{
    width:174rpx;
    height:68rpx;
    border:1rpx solid rgba(204,204,204,1);
    border-radius:10rpx;
    text-align: center;
    line-height: 68rpx;
  }
  .theme-text{
        width:174rpx;
    height:68rpx;

    border-radius:10rpx;
    text-align: center;
    line-height: 68rpx;
  }
}
</style>
