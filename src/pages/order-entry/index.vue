<template>
  <view class="order-entry  p-tb-20 p-lr-30">
       <min-cell :card="false">
          <view class="f30 p-tb-25">台位信息</view>
          <view class="min-border-bottom" style="height:1rpx"></view>
          <view class="main min-flex min-flex-dir-top min-flex-align-top f28 p-bottom-10">
            <text class="m-bottom-10 m-top-20">台      号：<text class="cardNum">K112</text></text>
            <text class="m-bottom-10">低      消：￥500<text class="status-code">（未够低消）</text></text>
            <text class="m-bottom-10">账单金额：￥324653.21</text>
          </view>
      </min-cell>
      <view class="order m-tb-20">
          <view class="view left m-right-30" @click="order">
              <image src='/static/images/index/order.png' />
              <text>下单</text>
          </view>
          <view class="view right" @click="presentation">
              <image src='/static/images/index/gift.png' />
              <text>赠送</text>
          </view>
      </view>
      <min-order-list :isShowPlatform='false' :list='list'></min-order-list>
  </view>
</template>

<script>

export default {

  data () {
    return {
      list: [{
        platform: false,
        isSetMeal: false,
        oddnum: '201901021532',
        status: { num: 3, desc: '待确认' },
        pic: [{ img: '/static/images/goods.png' }],
        price: '666.00',
        timer: '2019-12-10  12:35:65',
        num: 5,
        title: '2020年元旦跨年夜百威兄弟 终极套餐12瓶',
        desc: 'VSOP*750ml*2010年*/瓶VSOP*750ml*2010年*/瓶',
        result: '未付清'
      }, {
        platform: true, isSetMeal: true, sign: '换货单', oddnum: '201901021532', status: { num: 5, desc: '已出品' }, pic: [{ img: '/static/images/goods.png' }, { img: '/static/images/goods.png' }, { img: '/static/images/goods.png' }], price: '666.00', timer: '2019-12-10  12:35:65', num: 5, title: '2020年元旦跨年夜百威兄弟 终极套餐12瓶', desc: 'VSOP*750ml*2010年*/瓶', result: '已付清'
      }]
    }
  },
  methods: {
    order () {
      this.$minRouter.push({
        name: 'placean-order',
        type: 'navigateTo',
        path: '/pages/placean-order/index'
      })
    },
    presentation () {
      this.$minRouter.push({
        name: 'give-away',
        type: 'navigateTo',
        path: '/pages/give-away/index'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.order-entry{
  .cardNum{
    color: #FE0000;
    font-size: 32rpx;
  }
  .status-code{
    color: #FE2323;
  }
  .order{
    width: 100%;
    height: 220rpx;

    display: flex;
    justify-content: space-between;
    .view{
      width: 330rpx;
      height: 100%;
      background:rgba(255,255,255,1);
      border-radius:10rpx;
       display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      image{
        width: 80rpx;
        height: 80rpx;
      }
    }
  }
}

</style>
