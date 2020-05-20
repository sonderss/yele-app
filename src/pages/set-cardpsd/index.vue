<template>
  <view class="set-cardpsd p-lr-30 p-tb-20">
    <min-cell  :card="false">
      <min-desc-input desc="提现密码" v-model="name"  placeholder="请输入6位数字的密码" ></min-desc-input>
      <min-desc-input desc="确认密码" v-model="card"  placeholder="请再次输入密码" ></min-desc-input>
      <view class="btm_desc">
          <view class="top_view">
              <text>验证码</text>
                <text>获取验证码</text>
          </view>
          <input v-model="code" class="m-top-20" placeholder="12312321"/>
      </view>
    </min-cell>
    <view class="btn">提交</view>
  </view>
</template>

<script>
export default {
  name: 'set-cardpsd',
  navigate: ['navigateTo'],
  data () {
    return {
      name: '',
      card: '',
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
