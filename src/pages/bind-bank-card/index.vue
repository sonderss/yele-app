<template>
  <view class="bind-bank-card p-lr-30 p-tb-20">
    <min-cell class="mid-view" :card="false">
          <min-desc-input desc="持卡人" v-model="name"  placeholder="请输入持卡人姓名" ></min-desc-input>
          <min-desc-input desc="银行卡号" v-model="card"  placeholder="请输入银行卡号" ></min-desc-input>
          <min-desc-input desc="银行" v-model="bank"  placeholder="请输入银行" ></min-desc-input>
          <min-desc-input desc="银行预留手机号码" v-model="phone"  placeholder="请输入持卡人姓名" ></min-desc-input>
          <view class="btm_desc">

              <view class="top_view">
                  <text>验证码</text>
                   <text>获取验证码</text>
              </view>
              <input v-model="code" class="m-top-20" placeholder="12312321"/>
          </view>
    </min-cell>
    <view class="btn">绑定银行卡</view>
  </view>
</template>

<script>
export default {
  name: 'bind-bank-card',
  navigate: ['navigateTo'],
  data () {
    return {
      name: '',
      card: '',
      bank: '',
      phone: '',
      code: ''
    }
  }
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
