<template>
  <view class="product-details p-tb-20 p-lr-30">
    <swiper
      class="swiper"
      :indicatorDots="false"
      :circular="true"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
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
        <view class="f22">
          ￥
          <text class="price">{{list.setmeal_price}}</text>
        </view>
        <!-- <min-stepper  class  v-model="count" ></min-stepper> -->
      </view>
    </view>
    <min-describe  @chincesku="toDeatil" :sku="list.setmeal_combination[0].combination_name" leftTxt="套餐组合"></min-describe>
    <view class="introduction m-top-20 p-lr-20">
        <view class="title min-border-bottom m-bottom-30">详细介绍</view>
        <view class="content p-bottom-30">
            {{list.setmeal_info}}
        </view>
    </view>

    <min-goods-submit
    v-if="type !== 3 "
      icon="../../static/images/cart.png"
      :goodsCount="0"
      totalLabel="台位低消：￥1000.00"
      buttonText="去下单"
    ></min-goods-submit>
  </view>
</template>

<script>
export default {
  name: 'package-details',
  navigate: ['navigateTo'],
  data () {
    return {
      item: [
        '../../static/images/bid-goods.png',
        '../../static/images/bid-goods.png',
        '../../static/images/bid-goods.png'
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
      count: 0,
      type: Number,
      list: {}
    }
  },
  onLoad () {
    this.type = this.$parseURL().type
    if (this.type === 3) {
      // 电子菜单 套餐商品详情
      this.$minApi.getPackageDetails({ setmeal_id: this.$parseURL().setmeal_id })
        .then(res => {
          this.list = res.info
          console.log(this.list)
        })
    }
  },
  methods: {
    // 套餐2级
    toDeatil () {
      this.$minRouter.push({
        name: 'packages-detail',
        params: { type: this.type, list: this.list }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
//
.product-details {
  .swiper {
    width: 690rpx;
    height: 690rpx;
    .swiper-item {
      width: 100%;
      height: 100%;
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
    margin-bottom: 100rpx;
    .title{
      width: 100%;
      height: 86rpx;
      line-height: 86rpx;
    }
  }
}
</style>
