<template>
  <view class="verify-name">
    <view class="tips" v-if="info_user.is_certify !== 1">实名认证后才能使用提现功能</view>
    <view class="p-lr-30 p-top-25">
      <view class="p-lr-30">姓名</view>
      <!-- <view class="f26 assist-text p-lr-30 p-tb-30 min-border-bottom" v-if="info_user.is_certify !== 1">未绑定</view> -->
      <input class="p-lr-30 m-tb-25" placeholder="请输入姓名" :disabled="info_user.is_certify === 1 ? true : false"  type='text' 
      v-model="name"
      />
    </view>
    <view class="p-lr-30 ">
      <view class="p-lr-30 p-top-30 min-border-top">身份证号码</view>
      <!-- <view class="f26 assist-text p-lr-30 p-tb-30 min-border-bottom">未认证</view> -->
       <input class="p-lr-30 m-tb-25" maxlength="20" placeholder="请输入身份证号码" :disabled="info_user.is_certify === 1 ? true : false"  type='idcard' 
        v-model="idCard"
        />
        <view class="min-border-bottom"></view>
    </view>

    <view class="btm_desc p-lr-30" v-if="info_user.is_certify !== 1">
          <view class="top_view p-lr-30 p-top-20">
              <text>验证码将发送到尾号为{{rPhone}}手机上</text>
          </view>
          <view class="botm_view  p-lr-30 m-top-20">
               <input v-model="code"  type="number"  maxlength="6" placeholder="验证码"/>
               <text style="width:150rpx;text-align:center" class="code" @click="getVerificationCode" v-if="countDown === 0">获取验证码</text>
               <text style="width:150rpx;text-align:center"  v-else >{{countDown}} s</text>
          </view>
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
      countDown: 0,
      name:""
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
      if(!this.name)return this.$showToast('填写姓名')
      if(this.idCard.length < 19)return this.$showToast('身份证填写错误')
      if(this.code.length !== 6)return this.$showToast('验证码格式错误')
      this.$minApi.postNameTrue({
        user_name: this.name,
        id_card: this.idCard,
        msg_code:this.code
      }).then(res => {
          this.$showToast('实名成功')
          console.log(res);
          this.$store.dispatch('user/setUserInfoAuth', res.apiAuth)
          setTimeout(() => {
            this.$minRouter.push({
              name: 'redmine-info',
              type:"redirectTo"
            })
          }, 2000)
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
    this.name   = this.info_user.is_certify === 1 ?  this.info_user.name : '' 
    this.idCard = this.info_user.is_certify === 1 ? this.info_user.id_card : '' 
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
  .botm_view{
    width: 100%;
    height:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input{
      height: 100%;
      padding: 20rpx 0;
      flex: 1;
    }
  }
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
