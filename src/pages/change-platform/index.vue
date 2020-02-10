<template>
  <view class="change-platform p-tb-20 p-lr-30">
    <min-search v-model="search" placeholder="请输入桌台号搜索"/>
    <view class="platform-wrap p-top-20">
      <view class="title">卡座区</view>
      <view class="list">
        <view :class="active1 == index ? 'item in-order': 'item leisure' " @click="chioce1(index)" v-for="(item, index) in 1" :key="index">
          <view class="name">K112</view>
          <view class="status">空闲</view>
          <view class="count">6座</view>
        </view>
      </view>
    </view>
    <view class="platform-wrap p-top-20">
      <view class="title">雅座区</view>
      <view class="list">
        <view :class="active2 == index ? 'item in-order': 'item leisure' "  @click="chioce2(index)" v-for="(item, index) in 6" :key="index">
          <view class="name">K222</view>
          <view class="status">空闲中</view>
          <view class="count">6座</view>
        </view>
      </view>
    </view>
    <view class="empty-view"></view>
    <view class="btn-wrap">
      <min-btn shape="flat" :opacity="false" @click="submit">转台</min-btn>
    </view>
    <min-modal ref='test'></min-modal>
  </view>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      active1: Number,
      active2: Number
    }
  },
  methods: {
    chioce1 (index) {
      this.active2 = Number
      this.active1 = index
    },
    chioce2 (index) {
      this.active1 = Number
      this.active2 = index
    },
    submit () {

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
  .active1{
      background: #ff9c00
  }
  .empty-view{
    width: 100%;
    height: 120rpx;
  }
  .btn-wrap{
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
}
</style>
