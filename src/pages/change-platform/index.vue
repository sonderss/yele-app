<template>
  <view class="change-platform p-tb-20 p-lr-30">
    <min-search v-model="search" placeholder="请输入桌台号搜索"/>
    <view class="platform-wrap p-top-20">
      <view class="title">卡座区</view>
      <view class="list">
        <view class="item leisure" v-for="(item, index) in 6" :key="index">
          <view class="name">K112</view>
          <view class="status">已预约</view>
          <view class="count">6座</view>
        </view>
      </view>
    </view>
    <view class="btn-wrap">
      <min-btn shape="flat">转台</min-btn>
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
.change-platform{
  .platform-wrap{
    background: #fff;
    padding: 30rpx 20rpx;
    margin-top: 20rpx;
    .title{
      font-size: 30rpx;
      padding-bottom: 30rpx;
    }
    .list{
      .item{
        display: inline-block;
        width: 140rpx;
        border-radius:10rpx;
        padding: 20rpx 0;
        text-align: center;
        margin-left: 30rpx;
        &:nth-child(5n){
          margin: 0;
          margin-top: 20rpx;
        }
        &:first-child{
          margin: 0;
        }
        &>view{
          font-size: 28rpx;
          color: #fff
        }
        .status{
          margin: 4rpx 0;
        }
        &.reserved{ // 已预约
          background:#0090ff;
          &>view{
            color: #fff
          }
        }
        &.been-open{ // 已开台
          background:#ff0000;
        }
        &.be-confirm, .clearing{ // 待确认  清台中
          background:#39ba01;
        }
        &.in-order{ // 点单中
          background:#ff9c00;
        }
        &.leisure{ // 空闲中
          background:#eeeeee;
          &>view{
            color: #666
          }
        }
        &.disabled{ // 已停用
          background:#eeeeee;
          &>view{
            color: #ccc
          }
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
