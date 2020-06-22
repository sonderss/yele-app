<template>
  <view class="set-cardpsd p-lr-30 p-tb-20">
    <min-cell  :card="false">
      <min-desc-input desc="提现密码" v-model="name"   :maxlength='6' typeinput="number" placeholder="请输入6位数字的密码" ></min-desc-input>
      <min-desc-input desc="确认密码" v-model="card"  :maxlength='6'  typeinput="number" placeholder="请再次输入密码" ></min-desc-input>
      <view class="btm_desc">
          <view class="top_view">
              <text>验证码</text>
             <view class="code" @click="getVerificationCode" v-if="countDown === 0">获取验证码</view>
            <view v-else class="">{{countDown}} s</view>
          </view>
          <input v-model="code" class="m-top-20" placeholder="验证码" type="number" maxlength="6" />
      </view>
    </min-cell>
    <view class="btn" @click="submit">提交</view>
  </view>
</template>

<script>
export default {
  name: 'redset-cardpsd',
  navigate: ['navigateTo','redirectTo'],
  data () {
    return {
      countDown:0,
      name: '',
      card: '',
      code: '',
      mobile:''
    }
  },
  mounted(){
    this.mobile = this.$parseURL().phone
  },
  methods: {
    getVerificationCode () { // 获取验证码
      if (!this.$minCommon.checkMobile(this.mobile)) {
        this.$showToast('请输入正确的手机号码')
        return
      }
      if(!this.name || !this.card) return this.$showToast("请输入密码")
      if(this.name !== this.card) return this.$showToast("两次密码输入不一致")
      this.$minApi.getVerificationCode({ mobile: this.mobile }).then(res => {
        this.$showToast('发送成功')
        this.$minCommon.setCountDown((num) => { // 倒计时
          this.countDown = num
        })
      })
    },
    submit(){
      if(!this.name || !this.card) return this.$showToast("请输入密码")
      if(this.name !== this.card) return this.$showToast("两次密码输入不一致")
      if(this.code.length !== 6) return this.$showToast("验证码错误")
      // 设置提现密码
      this.$minApi.setTXpsd({
        cash_pwd:this.name,
        cash_pwd_again:this.card,
        msg_code:this.code
      }).then(res=>{
        console.log(res);
        // 这里设置成功返回个人信息页并修改密码状态
        // this.$showToast("这里设置成功返回个人信息页并修改密码状态")
        if(res) {
          this.$showToast("设置成功")
           this.$store.dispatch('user/setUserInfoAuth', res.apiAuth)
          setTimeout(() => {
                uni.navigateBack({
                    delta: 1
                })
          },2000)
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.btm_desc{
  margin: 20rpx 0;
  padding-bottom: 20rpx;
  .top_view{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.btn{
  width:690rpx;
  height:88rpx;
  background:rgba(255,224,0,1);
  border-radius:10rpx;
  text-align: center;
  line-height: 88rpx;
  margin-top: 50rpx;
}
</style>
