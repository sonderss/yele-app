<template>
  <view class="platform-admin p-tb-20 p-lr-30">
    <view class="btns">
      <view class="btn">全部123</view>
      <view class="btn">已预约</view>
      <view class="btn">点单中</view>
      <view class="btn active">待确认</view>
      <view class="btn">已开台123</view>
      <view class="btn">清台中123</view>
      <view class="btn">已停用58</view>
    </view>
    <view class="platform-wrap">
      <view class="title">我的台位</view>
      <view class="list">
        <view class="item reserved" v-for="(item, index) in 6" :key="index">
          <view class="name">K112</view>
          <view class="status">已预约</view>
          <view class="count">6座</view>
        </view>
      </view>
    </view>
    <view class="platform-wrap">
      <view class="title">卡座区</view>
      <view class="list">
        <view class="item been-open" v-for="(item, index) in 6" :key="index">
          <view class="name">K112</view>
          <view class="status">已预约</view>
          <view class="count">6座</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  onLoad () {
    // #ifdef APP-PLUS
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    const currentWebview = page.$getAppWebview()
    const titleObj = currentWebview.getStyle().titleNView
    titleObj.buttons[0].text = '12月1日'
    currentWebview.setStyle({
      titleNView: titleObj
    })
    console.log(111111)
    // #endif
  }
}

</script>

<style lang="scss" scoped>
.platform-admin{
  .btns{
    .btn{
      display: inline-block;
      width: 156rpx;
      padding: 12rpx 0;
      border-radius: 10rpx;
      background:#fff;
      text-align: center;
      margin-left: 20rpx;
      font-size: 26rpx;
      &:nth-child(5n){
        margin: 0;
        margin-top: 20rpx;
      }
      &:first-child{
        margin: 0;
      }
      &.active{
        background:#ffe001;
      }
    }
  }
  .platform-wrap{
    background: #fff;
    padding: 30rpx 20rpx;
    margin-top: 20rpx;
    .title{
      font-size: 30rpx;
      padding-bottom: 30rpx;
    }
    .list{
      .item{
        display: inline-block;
        width: 140rpx;
        border-radius:10rpx;
        padding: 20rpx 0;
        text-align: center;
        margin-left: 30rpx;
        &:nth-child(5n){
          margin: 0;
          margin-top: 20rpx;
        }
        &:first-child{
          margin: 0;
        }
        &>view{
          font-size: 28rpx;
          color: #fff
        }
        .status{
          margin: 4rpx 0;
        }
        &.reserved{ // 已预约
          background:#0090ff;
          &>view{
            color: #fff
          }
        }
        &.been-open{ // 已开台
          background:#ff0000;
        }
        &.be-confirm, .clearing{ // 待确认  清台中
          background:#39ba01;
        }
        &.in-order{ // 点单中
          background:#ff9c00;
        }
        &.leisure{ // 空闲中
          background:#eeeeee;
          &>view{
            color: #666
          }
        }
        &.disabled{ // 已停用
          background:#eeeeee;
          &>view{
            color: #ccc
          }
        }
      }
    }
  }
}
</style>
