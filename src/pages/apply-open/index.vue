<template>
  <view class="apply-open">
    <view class="p-top-20 p-lr-30" style="padding-bottom: 66rpx;">
      <view class="platform-info f28 p-lr-20 p-tb-20">
        <view>台位抵消：￥{{list.order_info.minim_charge}}</view>
        <view>开台条件：<text class="emp">{{list.order_info.minimum_percent}}成低消 {{`(${list.order_info.desk_open_minimum})`}}</text></view>
        <view>订单金额：￥{{list.order_info.bill_price}}</view>
        <view>达成状态：{{list.order_info.is_can_open === 0 ? "未达成开台条件":"达成开台条件"}}</view>
      </view>
      <view class="goods-wrap m-top-20 p-lr-20">
        <view class="p-tb-30 min-border-bottom">商品</view>
        <view class="goods-list p-top-10">
          <view class="p-tb-20" v-for="index in 3" :key="index">
            <min-goods-item
              name="2020年元旦百威兄弟套餐12瓶"
              price="2380.00"
              icon="/static/images/goods.png"
              specification="罐装*250ml*规格9/瓶"
              :value="3"
            >
            </min-goods-item>
          </view>
        </view>
      </view>
      <view class="client-info m-top-20 p-lr-20 p-tb-30">
        <view class="p-bottom-30 min-border-bottom">客户信息</view>
        <view class="card p-top-30">
          <view class="item">客户姓名：{{list.order_info.client_name ?list.order_info.client_name :'暂无数据'}}</view>
          <view class="item">联系电话：{{list.order_info.client_mobile?  list.order_info.client_mobile:'暂无数据'}}</view>
        </view>
      </view>
    <min-remarks v-model='value'></min-remarks>
    </view>
    <view class="btn-wrap">
      <min-btn shape="flat" @click="submit">提交申请</min-btn>
    </view>
  </view>
</template>

<script>
export default {
  name: 'apply-open',
  navigate: ['navigateTo'],
  data () {
    return {
      value: '',
      list: { order_info: { minim_charge: '' } }
    }
  },
  mounted () {
    console.log('申请开台', this.$parseURL())
    this.$minApi.previewOrder({
      order_id: this.$parseURL().order_id,
      desk_id: this.$parseURL().desk_id,
      open_status: this.$parseURL().open_status
    }).then(res => {
      this.list = res
      console.log(this.list)
    })
  },
  methods: {
    submit () {
      // 开台申请  orderGetRoot  {desk_id:this.$parseURL().desk_id,reason:''}

    }
  }
}

</script>

<style lang="scss">
.apply-open{
  padding-bottom: 100rpx;
  .platform-info{
    border-radius:10px;
    background:#ffe4e4;
    .emp{
      color: #FF0000;
      font-weight: bold;
    }
  }
  .goods-wrap{
    background: #fff;
    .count{
      float: right;
    }
  }
  .client-info{
    background: #fff;
    border-radius:10rpx;
    .card{
      &>view{
        margin-bottom: 10rpx;
        &:last-child{
          margin: 0;
        }
      }
    }
  }
  .btn-wrap{
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
}
</style>
