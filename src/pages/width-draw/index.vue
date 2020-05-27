<template>
  <view class="with-draw p-tb-20 p-lr-30">
     <view class="main p-lr-20">
       <view class="top min-border-bottom">
         <view>提现到</view>
         <view class="methods" @click="toChioce">

            <text class="m-lr-10 f28">银行卡相关数据暂无接口</text>
            <image style="width:24rpx;height:24rpx" src="/static/images/arrow.png" />
         </view>
       </view>
       <view class="bottom">
         <view class="top f28">提现金额</view>
         <view class="money">
            <text class="icon">￥</text>
            <input type="number"/>
            <text class="allin">全部提现</text>
         </view>
       </view>

     </view>
  <text class="warn">输入金额超出可提现金额</text>
     <view class="submit" @click="submit">提现</view>
  </view>
</template>
<script>
export default {
  name: 'width-draw',
  navigate: ['navigateTo'],
  methods: {
    toChioce () {
      this.$minRouter.push({
        name: 'drawing-way'
      })
    },
    // 体现
    submit () {
      this.$minRouter.push({
        name: 'withdrawal-success'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main{
  width: 100%;
  height: 258rpx;
  background: #fff;
  border-radius:10rpx;
  display: flex;
  flex-direction: column;
  .top{
    height: 90rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .methods{
       width: 85%;
       height: 100%;
       display: flex;
       justify-content:flex-end;
       align-items: center;
       image{width: 44rpx;height: 44rpx; }
    }
  }
  .bottom{
    flex: 1;
    display: flex;
    flex-direction: column;
    .top{
      flex: 1;
    }
    .money{
      height: 110rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      input{
        flex: 1;
        height: 100%;
        font-size:52rpx;
        font-weight:bold;
        color:rgba(51,51,51,1);

      }
      .icon{
        font-size:57rpx;
        color:rgba(51,51,51,1);
      }
    }
  }
}
.submit{
  width:580rpx;
  height:88rpx;
  background:rgba(255,224,1,1);
  border-radius:10rpx;
  margin: 80rpx auto;
  line-height: 88rpx;
  text-align: center;
}
.warn{
  color: red;
  font-size: 22rpx;
  margin: 20rpx;
}
</style>
