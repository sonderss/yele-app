<template>
  <view class="pay-back p-lr-20 p-tb-20">
    <view class="top_view">
      <view class="white more icon-fanhui arro" @click="back">&#xe611;</view>
      <view class="title">付款码</view>
    </view>
    <view class="main">
      <view class="main_top  p-lr-20">
        <view class="a"></view>
        <view class="b"></view>
        <view class="top_content line">
          <view class="title">
            <text>待支付款：</text>
            <text style="color:red">260000.00元</text>
          </view>
          <view class="desc f28">雅座K1112台消费款</view>
        </view>
      </view>
      <view class="main_botm">
        <view class="a"></view>
        <view class="b"></view>
        <view class="code"></view>
        <view class="d m-top-20">请使用微信扫码支付</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "pay-code",
  navigate: ["navigateTo"],
  methods: {
      back(){
          uni.navigateBack({
            delta: 1
          });
      }
  },        
};
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "iconfonta";
  src: url("~@/static/font/iconfont.ttf");
}
.more {
  font-family: iconfonta;
  font-size: 36rpx;
  color: #ffe001;
  font-weight: blod;
}
.pay-back {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: url("/static/images/pay-back.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .top_view {
    margin-top: var(--status-bar-height);
    display: flex;
    .arro {
      width: 36rpx;
    }
    .title {
      flex: 1;
      display: flex;
      justify-content: center;
      font-size: 36rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(255, 224, 1, 1);
    }
  }
  .main {
    width: 100%;
    height: 786rpx;
    margin-top: 170rpx;
    padding: 0 30rpx;
    .main_top {
      width: 100%;
      height: 190rpx;
      background: #fff;
      position: relative;
      overflow: hidden;
      border-radius: 10rpx 10rpx 0 0;
      box-sizing: border-box;
     
      .a {
        width: 20rpx;
        height: 20rpx;
        position: absolute;
        background:  #02114f;
        bottom: -10rpx;
        z-index: 999;
        border-radius: 50%;
        left: -10rpx;
      }
      .b {
        width: 20rpx;
        height: 20rpx;
        position: absolute;
        background:  #02114f;
        bottom: -10rpx;
        z-index: 999;
        border-radius: 50%;
        right: -10rpx;
      }
      .top_content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .title {
          margin-bottom: 27rpx;
          text {
            font-size: 36rpx;

            font-weight: 800;
          }
        }
        .desc {
          color: #666666;
        }
      }
    }

    .main_botm {
      background: #fff;
      width: 100%;
      height: 596rpx;
      position: relative;
      overflow: hidden;
      border-radius: 0 0 10rpx 10rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .code {
        width: 439rpx;
        height: 439rpx;
        background: red;
      }
      .d{
          color: #666666;
          font-size: 26rpx;
      }
      .a {
        width: 20rpx;
        height: 20rpx;
        position: absolute;
        background: #02114f;
        top: -10rpx;
        z-index: 999;
        border-radius: 50%;
        left: -10rpx;
      }
      .b {
        width: 20rpx;
        height: 20rpx;
        position: absolute;
        background:  #02114f;
        top: -10rpx;
        z-index: 999;
        border-radius: 50%;
        right: -10rpx;
      }
    }
  }
}
.line {
  border-bottom: 1rpx dashed #e7e7e7;
}

</style>