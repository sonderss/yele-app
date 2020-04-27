<template>
  <view class="order-entry  p-tb-20 p-lr-30">
       <min-cell :card="false">
          <view class="f30 p-tb-25">台位信息</view>
          <view class="min-border-bottom" style="height:1rpx"></view>
          <view class="main min-flex min-flex-dir-top min-flex-align-top f28 p-bottom-10">
            <text class="m-bottom-10 m-top-20">台      号：<text class="cardNum">{{$parseURL().desk_info.name}}</text></text>
            <text class="m-bottom-10">低      消：￥{{$parseURL().desk_info.charge}}</text>
            <text class="m-bottom-10">账单金额：￥{{$parseURL().desk_info.price}}</text>
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
      <min-order-list :isShowPlatform='false' :list='list' v-if="list.length > 0"></min-order-list>
      <min-404 v-else></min-404>
  </view>
</template>

<script>

export default {
  name: 'order-entry',
  navigate: ['navigateTo'],
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
  mounted () {
    console.log('桌台ID和open_id', this.$parseURL())
    this.$minApi.getOrderListDown({
      opening_id: this.$parseURL().open_id
    }).then(res => {
      console.log(res)
      this.list = res.list
    })
  },
  methods: {
    order () {
      this.$minRouter.push({
        name: 'placean-order',
        params: { desk_id: this.$parseURL().desk_id, is_open_desk: this.$parseURL().is_open_desk, minim_charge: this.$parseURL().desk_info.charge }
      })
    },
    presentation () {
      this.$minRouter.push({
        name: 'give-away',
        params: { desk_id: this.$parseURL().desk_id }
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
