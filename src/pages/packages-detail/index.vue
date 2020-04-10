<template>
<view class="product-details p-tb-20 p-lr-30">
    <swiper
      class="swiper"
      :circular="true"
      :autoplay="true"
      :interval="2000"
      :duration="500"
    >
      <swiper-item v-for="(item,index) in list.setmeal_images" :key="index">
        <view class="swiper-item">
          <image :src="item" />
        </view>
      </swiper-item>
    </swiper>
    <view class="goods-item p-lr-20 m-bottom-20">
      <view class="top-view f28 m-top-10 f28">{{list.setmeal_name}}</view>
      <view class="botm-view">
        <view class="f22 m-bottom-20">
          ￥ <text class="price">{{list.setmeal_price}}</text>
        </view>
      </view>
    </view>
    <view class="introduction m-top-20 ">
        <view class="title min-border-bottom m-bottom-30 p-lr-20">必选商品</view>
        <view class="content p-bottom-30">
          <min-describe  :leftIconValue="list.setmeal_logo" :leftIcon='true' leftTxt='百威兄弟终极套餐12瓶' num='2'></min-describe>
        </view>
    </view>
    <view class="introduction ">
        <view class="title min-border-bottom m-bottom-30 p-lr-20">
           <text class="left-txt">服务三选一</text>
           <text class="right-txt f26">已选 <text class="num1">0</text> 份</text>
        </view>
        <view class="content p-bottom-30">
          <min-describe  class="i" v-for="(item,index) in 3" :key=index :leftIcon='true' leftTxt='冰红茶*25' :step='type === 3 ? false: true'></min-describe>
        </view>
    </view>
    <view class="introduction">
        <view class="title min-border-bottom m-bottom-30 p-lr-20">
           <text class="left-txt">饮料3选2（不可重复选）</text>
           <text class="right-txt f26">已选 <text class="num">2</text> 份</text>
        </view>
        <view class="content p-bottom-30">
          <min-describe  class="i" v-for="(item,index) in 3" :key=index :leftIcon='true' leftTxt='冰红茶*25' :step='type === 3 ? false: true'></min-describe>
        </view>
    </view>
    <view class="empty_view"></view>
    <view class="btn">确定</view>
</view>
</template>

<script>
export default {
  name: 'packages-detail',
  navigate: ['navigateTo'],
  data () {
    return {
      items: [],
      autoplay: true,
      interval: 2000,
      duration: 500,
      num: 0,
      num1: 2,
      type: Number,
      list: {}
    }
  },
  onLoad () {
    this.list = this.$parseURL().list
    this.type = this.$parseURL().type
    console.log(this.list, this.type)
  }
}
</script>

<style lang="scss" scoped>
.product-details {
  .swiper {
    width: 690rpx;
    height: 690rpx;
    .swiper-item {
      width: 100%;
      height: 100%;
      image{
        width: 100%;
        height: 100%;
      }
    }
  }
  .goods-item {
    width: 100%;
    height: 118rpx;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top-view {
      color: #333333;
      font-weight: bold;
    }
    .botm-view {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        color: #ff0006;
        font-size: 28rpx;
        font-weight: bold;
      }
    }
  }
  .introduction {
    width: 100%;
    background: #fff;
    margin-bottom: 20rpx;
    .title{
      width: 100%;
      height: 86rpx;
      line-height: 86rpx;
      display: flex;
      justify-content: space-between;
      .right-txt{
        color: #666666;
        .num{
          color: #333;
          font-weight: bold;
          padding: 0 5rpx;
        }
        .num1{
          padding: 0 5rpx;
        }
      }
    }
    .i{
      margin: 20rpx 0;
    }
  }
  .btn{
    width:100%;
    height:98rpx;
    background:rgba(255,224,1,1);
    position: fixed;
    bottom: 0;
    left: 0;
    font-size:32rpx;
    color:rgba(51,51,51,1);
    line-height:98rpx;
    text-align: center;
  }
}
.empty_view{
  width: 100%;
  height: 100rpx;
}
</style>
