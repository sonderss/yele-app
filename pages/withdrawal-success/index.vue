<template>
  <view class="withdrawal-success p-lr-20 p-tb-20">
    <view class="main-view">
      <view style="margin-right:30rpx">当前状态</view>
      <min-steps direction="column" :options="option" :active="actives"></min-steps>
    </view>
    <view class="min-border-top" style="width:90%;margin:0 auto"></view>
    <view class="botom_view p-lr-30 p-tb-20">
      <view class="m-bottom-40">
        <view class="p-tb-20">
          <view style="color:#666666;">
            <text style="width:120rpx">提现金额</text>&nbsp;&nbsp;
            <text style="margin-left:20rpx">{{$parseURL().info.money}}元</text>
          </view>
          <view style="color:#666666" class="m-tb-20">
            <text style="width:120rpx">手&nbsp;&nbsp;续&nbsp;费</text>
            <text style="margin-left:20rpx">{{$parseURL().info.fee}}元</text>
          </view>
          <view style="color:#666666" v-if="$parseURL().res.actual_amount">
            <text style="width:120rpx">到账金额</text>&nbsp;&nbsp;
            <text style="margin-left:20rpx">{{$parseURL().res.actual_amount}}元</text>
          </view>
          <view style="color:#666666" class="m-tb-20">
            <text style="width:120rpx">提&nbsp;&nbsp;现&nbsp;到</text>
            <text style="margin-left:20rpx">{{$parseURL().info.bard}}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="btn" @click="success">完成</view>
  </view>
</template>
<script>
export default {
  name: 'redwithdrawal-success',
  navigate: ['navigateTo', 'redirectTo'],
  data() {
    return {
      actives: 1,
      option: [
        { title: '发起提现', desc: '2020-03-29 18:06:46' },
        { title: '系统处理', desc: '预计两小时到账' },
        { title: '到账成功', desc: '' },
      ],
    }
  },
  mounted() {
    console.log(this.$parseURL())
    this.option[0].desc = this.$minCommon.formatDate(
      new Date(Date.now()),
      'yyyy/MM/dd hh:mm:ss'
    )
  },
  methods: {
    success() {
      this.$minRouter.push({
        name: 'redmy-income',
        type: 'redirectTo',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.main-view {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 10rpx;
  display: flex;
  justify-content: flex-start;
  padding-top: 60rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
}
.botom_view {
  height: 340rpx;
  background: #fff;
  margin-bottom: 40rpx;
}
.btn {
  width: 100%;
  height: 98rpx;
  background: rgba(255, 224, 1, 1);
  border-radius: 10rpx;
  text-align: center;
  line-height: 98rpx;
}
</style>
