<template>
  <view class="order-detail p-tb-20 p-lr-30">
    <view class="goods-wrap m-top-20 p-lr-20">
      <view class="p-tb-30 min-border-bottom">
        商品
        <view class="status">已取消</view>
      </view>
      <view class="goods-list p-top-10">
        <view class="p-tb-20">
          <!--已出品-->
          <min-goods-item
            produced
            name="2020年元旦百威兄弟套餐12瓶2020年元旦百威兄弟套餐12瓶年元旦百威兄弟套餐"
            price="2380.00"
            icon="/static/images/goods.png"
            specification="罐装*250ml*规格9/瓶"
            :value="3"
          >
          </min-goods-item>
        </view>
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
    <view class="card p-lr-20 m-top-20">
      <view class="top p-tb-20 min-border-bottom">
        <view class="title">原订单信息</view>
        <view class="btn">查看原订单</view>
      </view>
      <view class="main p-tb-30">
        <view class="item">原订单号：2019346746842</view>
        <view class="item">订单金额：￥159332.00</view>
        <view class="item">已付金额：￥159332.00</view>
      </view>
    </view>
    <view class="card p-lr-20 m-top-20">
      <view class="top p-tb-30 min-border-bottom">订单信息</view>
      <view class="main p-tb-30">
        <view class="item">订 单 号 ：20115643465465</view>
        <view class="item">订单类型：先付</view>
        <view class="item">下单人员：刘清清</view>
        <view class="item">下单时间：2020年02月15日 16:20:00</view>
        <view class="item">订单金额：￥1000000.00</view>
        <view class="item">已付金额：￥13254621.00</view>
        <view class="item">支付状态：已付清</view>
      </view>
    </view>
    <view class="card p-lr-20 m-top-20">
      <view class="top p-tb-30 min-border-bottom">签折信息</view>
      <view class="main p-tb-30">
        <view class="item">签折方式：单品优惠</view>
        <view class="item">优惠内容：-----</view>
        <view class="item">优惠金额：￥2000.00</view>
        <view class="item">签折人员：刘清小</view>
      </view>
    </view>
    <view class="card p-lr-20 m-top-20">
      <view class="top p-tb-30 min-border-bottom">客户信息</view>
      <view class="main p-tb-30">
        <view class="item">客户姓名：刘小青</view>
        <view class="item">联系电话：13563250000</view>
      </view>
    </view>
    <view class="card p-lr-20 m-top-20">
      <view class="top p-tb-30 min-border-bottom">台位信息</view>
      <view class="main p-tb-30">
        <view class="item">台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：K1126</view>
        <view class="item">分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：卡座</view>
        <view class="item">低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：￥2000.00</view>
        <view class="item">座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：6座</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {

}

</script>

<style lang="scss" scoped>
.order-detail{
  .goods-wrap{
    background: #fff;
    .status{
      float: right;
      &.cancel,&.return{
        color: #333333;
      }
      &.not-produce{
        color: #0090FF;
      }
    }
    .count{
      float: right;
    }
  }
  .card{
    background: #fff;
    border-radius: 10rpx;
    .top{
      display: flex;
      justify-content: space-between;
      .title{
        line-height: 60rpx;
      }
      .btn{
        background-color: #FFE000;
        padding: 10rpx 15rpx;
        border-radius: 10rpx;
      }
    }
    .main{
      .item{
        margin-top: 10rpx;
        &:first-child{
          margin: 0;
        }
      }
    }
  }
}
</style>
