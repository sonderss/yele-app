<template>
  <view class="verify-name">
    <view class="tips" v-if="info_user.is_certify !== 1">实名认证后才能使用提现功能</view>
    <view class="p-lr-30 p-top-25">
      <view class="p-lr-30">手机号码</view>
      <!-- <view class="f26 assist-text p-lr-30 p-tb-30 min-border-bottom" v-if="info_user.is_certify !== 1">未绑定</view> -->
      <input class="p-lr-30 m-tb-25" :disabled="info_user.is_certify === 1 ? true : false"  type='phone' :value="info_user.is_certify === 1 ? info_user.phone : '未绑定' "  />
    </view>
    <view class="p-lr-30 ">
      <view class="p-lr-30 p-top-30 min-border-top">身份证号码</view>
      <!-- <view class="f26 assist-text p-lr-30 p-tb-30 min-border-bottom">未认证</view> -->
       <input class="p-lr-30 m-tb-25" :disabled="info_user.is_certify === 1 ? true : false"  type='phone' v-model="info_user.id_card" :value="info_user.is_certify === 1 ? info_user.id_card : '未绑定' "  />
        <view class="min-border-bottom"></view>
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
      idCard: ''
    }
  },
  methods: {
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
</style>
