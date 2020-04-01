<template>
  <view class="withdrawal-success p-lr-20 p-tb-20">
    <view class="main-view">
      <view style="width:180rpx;color:#666666;margin-right:40rpx">当前状态</view>
      <min-steps
        direction="column"
        :options="[
        {title:'发起提现',desc:'2020-03-29 18:06:46'},
        {title:'系统处理',desc:'2020-03-29 18:06:46'},
        {title:'到账成功',desc:''}]"
        :active="active"
      ></min-steps>
    </view>
    <view class=" min-border-top" style="width:90%;margin:0 auto"></view>
    <view class="botom_view p-lr-30 p-tb-20" >
        <view class=" p-lr-20  m-bottom-40">
          <view class="p-tb-20" >
            <view style="color:#666666">提现金额 &nbsp;&nbsp; 刘清清</view>
            <view style="color:#666666" class="m-tb-20">申请时间 &nbsp;&nbsp; 2020年02月15日 16:20:00</view>
            <view style="color:#666666">到账时间 &nbsp;&nbsp; 2020年02月15日 16:20:00</view>
            <view style="color:#666666" class="m-tb-20">提现方式 &nbsp;&nbsp; 微信</view>
            <view style="color:#666666">提现单号 &nbsp;&nbsp; 202324964134643416543124164</view>
          </view>
        </view>
    </view>
    <view class="btn">完成</view>
  </view>
</template>
<script>
export default {
  data () {
    return {
      active: 1
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.main-view {
  width: 100%;
  height: 410rpx;
  background: rgba(255, 255, 255, 1);
  border-radius: 10rpx;
  display: flex;
  justify-content: space-between;
  padding-top: 60rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
}
.botom_view{
  height: 340rpx;
  background: #fff;
  margin-bottom: 40rpx;
}
.btn{
width:100%;
height:98rpx;
background:rgba(255,224,1,1);
border-radius:10rpx;
text-align: center;
line-height: 98rpx;
}

</style>
