<template>
<view class="myincome p-tb-20 p-lr-30">
  <view class="top-view">
    <view class="t-view">
      <text class="price">可提现金额</text>
      <view class="money"><text class="icon">￥</text><text class="tr">8888.88</text></view>
      <text class="btn">提现</text>
    </view>
    <view class="b-view">
        <view class="left-view">
          <text class="f22">待发放工资</text>
          <text class="f28 c">￥1000</text>
        </view>
        <view class="right-view">
           <text class="f22">待发放工资</text>
           <text class="f28 c">￥1000</text>
        </view>
    </view>
  </view>
  <view class="btn-view m-tb-20">
    <view class="btn">提成明细</view>
    <view class="btn">工资明细</view>
    <view class="btn">发放记录</view>
    <view class="btn">提现记录</view>
  </view>

  <view class="jion_view">
     <view class="title min-border-bottom">我参与的方案（simba）</view>
      <view class="method-view min-border-bottom">
        <view class="left">工资方案</view>
        <view class="right">
           <text>工资方案名称</text>
        </view>
     </view>
     <view class="method-view min-border-bottom">
        <view class="left">基础提成</view>
        <view class="right">
           <text>订台人提成</text>
           <text>下单人提成</text>
           <text>下线分佣</text>
        </view>
     </view>
     <view class="method-view min-border-bottom">
        <view class="left">活动方案</view>
        <view class="right">
           <text>活动名称1</text>
           <text>活动名称2</text>
           <text>活动名称3</text>
        </view>
     </view>
  </view>
  <view class="desc">暂不支付在APP直接查看方案详细信息</view>
</view>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.top-view{
  width: 100%;
  height: 481rpx;
  background: #030313;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius:10rpx;
  overflow: hidden;
  .t-view{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .price{
      width:138rpx;
      height:26rpx;
      font-size:28rpx;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(204,204,204,1);
      line-height:26rpx;
      margin-top: 85rpx;
    }
    .money{
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 40rpx 0;
      margin-top: 20rpx;
      .tr{
         display: block;
        font-size:84rpx;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(255,224,1,1);

      }
      .icon{
         display: block;
         font-size:48rpx;
         color:rgba(255,224,1,1);
      }
    }
    .btn{
      width:580rpx;
      height:88rpx;
      background:rgba(255,224,1,1);
      border-radius:10rpx;
      text-align: center;
      line-height: 88rpx;
      margin-bottom: 20rpx;
    }
  }
  .b-view{
    height: 122rpx;
    background:rgba(55,52,69,1);
    border-radius:0px 0px 10rpx 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text{
        color: #fff;
        color:rgba(204,204,204,1);
    }
    .c{
      color: #FFE001;
    }
    .left-view{
        width:50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .right-view{
        width:50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

    }
  }
}
.btn-view{
  width: 100%;
  height: 88rpx;
  display: flex;
  justify-content:space-between;
  align-items: center;
  .btn{
    width:157rpx;
    height:88rpx;
    background:rgba(255,255,255,1);
    box-shadow:0px 1rpx 10rpx 0rpx rgba(3,3,19,0.05);
    border-radius:10rpx;
    text-align: center;
    line-height: 88rpx;
  }
}
.jion_view{
  width: 100%;
  height: auto;
  background: #fff;
  padding-left: 33rpx;
  padding-right: 40rpx;
   color:rgba(51,51,51,1);
  text{
   color:rgba(51,51,51,1);
  }
  .title{
    width: 100%;
    height: 98rpx;
    line-height: 98rpx;
  }
  .method-view{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 36rpx 0;
    .left{
      width: 50%;
    }
    .right{
      flex:1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;

      text{
         display: block;
          margin-bottom: 20rpx;
      }
    }
  }
}
.desc{
  width:100%;
  height:20rpx;
  font-size:20rpx;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:9rpx;
  padding-left: 30rpx;
}
</style>
