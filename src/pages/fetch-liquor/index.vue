<template>
  <view class="fetch-liquor p-tb-20 p-lr-30">
    <min-search v-model="search"/>
    <view class="list p-top-20">
      <view class="card p-lr-20">
        <view class="top p-tb-30 min-border-bottom">
          <view class="order-num">单号：20190503153</view>
          <view class="status">已生效</view>
        </view>
        <view class="main p-tb-30">
          <view class="item">客户姓名：刘大芒</view>
          <view class="item">联系电话：135 5352 0135</view>
          <view class="item">存酒数量：123</view>
        </view>
        <view class="bottom p-tb-20 min-border-top">
          <view class="date">2019-12-10 12:35:65</view>
          <min-btn size="xs" type="white" border>取酒</min-btn>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      search: ''
    }
  }
}

</script>

<style lang="scss" scoped>
.fetch-liquor{
  .list{
    .card{
      background: #fff;
      border-radius: 10rpx;
      .top{
        display: flex;
        justify-content: space-between;
        .status{
          color: #0090FF;
        }
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
    .bottom{
      display: flex;
      justify-content: space-between;
      .date{
        font-size: 24rpx;
        color: #666666;
        line-height: 68rpx;
      }
    }
  }
}

</style>
