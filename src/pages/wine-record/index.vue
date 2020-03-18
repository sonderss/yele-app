<template>
  <view class="fetch-record p-tb-20 p-lr-30">
    <view class="card p-lr-20 m-bottom-20">
      <view class="top p-tb-30 min-border-bottom">
        <view>单号：125254478524774</view>
        <view class="status confirmed">待确认</view>
      </view>
      <view class="main p-top-20">
        <view class="item">客户姓名：刘小青</view>
        <view class="item">联系电话：135 5352 0135</view>
        <view class="item">存酒数量：12356</view>
      </view>
      <view class="timer min-top-border">2019-12-10  12:35:65</view>
    </view>
    <view class="card p-lr-20 m-bottom-20">
      <view class="top p-tb-30 min-border-bottom">
        <view>单号：125254478524774</view>
        <view class="status force">已生效</view>
      </view>
      <view class="main p-top-20">
        <view class="item">客户姓名：刘小青</view>
        <view class="item">联系电话：135 5352 0135</view>
        <view class="item">存酒数量：12356</view>
      </view>
      <view class="timer min-top-border">2019-12-10  12:35:65</view>
    </view>
     <view class="card p-lr-20 m-bottom-20">
      <view class="top p-tb-30 min-border-bottom">
        <view>单号：125254478524774</view>
        <view class="status expired">已过期</view>
      </view>
      <view class="main p-top-20">
        <view class="item">客户姓名：刘小青</view>
        <view class="item">联系电话：135 5352 0135</view>
        <view class="item">存酒数量：12356</view>
      </view>
      <view class="timer min-top-border">2019-12-10  12:35:65</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'wine-record',
  navigate: ['navigateTo', 'switchTab']
}
</script>

<style lang="scss" scoped>
.fetch-record{
 .card{
    background: #fff;
    border-radius: 10rpx;
    .top{
      display: flex;
      justify-content: space-between;
    }
    .main{
      .item{
        margin-top: 20rpx;
        font-size: 28rpx;
        &:first-child{
          margin: 0;
        }
      }
    }
    .status{
      font-size: 26rpx;
      &.confirmed{
        color: #FF0101
      }
      &.end{
        color: #39BA01
      }
      &.force{
        color: #0090FF
      }
      &.expired{
        color: #666666
      }
    }
    .timer{
      width: 100%;
      height: 76rpx;
      line-height: 76rpx;
      font-size: 24rpx;
      color: #666666
    }
  }
}

</style>
