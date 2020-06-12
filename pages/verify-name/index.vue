<template>
  <view class="verify-name">
    <view class="tips" v-if="info_user.is_certify !== 1">实名认证后才能使用提现功能</view>
    <view class="p-lr-30 p-top-25">
      <view class="p-lr-30">姓名</view>
      <!-- <view class="f26 assist-text p-lr-30 p-tb-30 min-border-bottom" v-if="info_user.is_certify !== 1">未绑定</view> -->
      <input class="p-lr-30 m-tb-25" placeholder="请输入姓名" :disabled="info_user.is_certify === 1 ? true : false"  type='phone' :value="info_user.is_certify === 1 ? info_user.phone : '' "  />
    </view>
    <view class="p-lr-30 ">
      <view class="p-lr-30 p-top-30 min-border-top">身份证号码</view>
      <!-- <view class="f26 assist-text p-lr-30 p-tb-30 min-border-bottom">未认证</view> -->
       <input class="p-lr-30 m-tb-25" placeholder="请输入身份证号码" :disabled="info_user.is_certify === 1 ? true : false"  type='phone'  :value="info_user.is_certify === 1 ? info_user.id_card : '' "  />
        <view class="min-border-bottom"></view>
    </view>

    <view class="btm_desc p-lr-30" v-if="info_user.is_certify !== 1">
          <view class="top_view p-lr-30 p-top-20">
              <text>验证码将发送到尾号为{{rPhone}}手机上</text>
               <text class="code" @click="getVerificationCode" v-if="countDown === 0">获取验证码</text>
               <text  v-else >{{countDown}} s</text>
          </view>
          <input v-model="code" class="m-top-20 p-lr-30" type="number"  maxlength="6" placeholder="验证码"/>
    </view>
    <view class="btn-wrap m-lr-20">
      <min-btn v-if="info_user.is_certify !== 1" @click="toTrue">去认证</min-btn>
    </view>
  </view>
</template>

<script>
export default {
  name: 'verify-name',
  navigate: ['navigateTo'],
  data () {
    return {
      info_user: {},
      idCard: '',
      code: '',
      rPhone: '',
      countDown: 0
    }
  },
  methods: {
    getVerificationCode () { // 获取验证码
      if (!this.$minCommon.checkMobile(this.info_user.phone)) {
        this.$showToast('请输入正确的手机号码')
        return
      }
      this.$minApi.getVerificationCode({ mobile: this.info_user.phone }).then(res => {
        this.$showToast('发送成功')
        this.$minCommon.setCountDown((num) => { // 倒计时
          this.countDown = num
        })
      })
    },
    toTrue () {
      this.$minApi.postNameTrue({
        user_name: this.info_user.name,
        id_card: this.info_user.id_card
      }).then(res => {
        console.log(res)
        if (res.length === 0) {
          this.$showToast('实名成功')
          setTimeout(() => {
            this.$minRouter.push({
              name: 'mine-info'
            })
          }, 2000)
        }
      })
    }
  },
  onLoad () {
    console.log(this.$parseURL())
    this.info_user = this.$parseURL()
    this.rPhone = this.info_user.phone

    this.rPhone = this.rPhone.split('')
    this.rPhone = this.rPhone.splice(7)
    this.rPhone = this.rPhone.join('')
    console.log(this.rPhone)
    // this.info_user.is_certify = 0
  }
}
</script>

<style lang="scss" scoped>
.verify-name{
  .tips{
    padding: 18rpx 32rpx;
    color: #FF0000;
    background: #F0D0D0;
    font-size: 24rpx;
  }
  .btn-wrap{
    margin-top: 80rpx;
  }
}
.btm_desc{
  margin: 30rpx 0;
  margin-bottom: 0;
  .top_view{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
