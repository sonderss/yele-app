<template>
  <view class="apply-open">
    <view class="p-top-20 p-lr-30" style="padding-bottom: 66rpx;">
      <view class="platform-info f28 p-lr-20 p-tb-20">
        <view>台位抵消：￥1000</view>
        <view>开台条件：<text class="emp">6成低消</text></view>
        <view>订单金额：￥432523.00</view>
        <view>达成状态：未达成开台条件</view>
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
          <view class="item">客户姓名：可乐</view>
          <view class="item">联系电话：15016584603</view>
        </view>
      </view>
    <min-remarks v-model='value'></min-remarks>
    </view>
    <view class="btn-wrap">
      <min-btn shape="flat">提交申请</min-btn>
    </view>
  </view>
</template>

<script>
export default {
  name: 'apply-open',
  data () {
    return {
      value: ''
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
