<template>
  <view class="fetch-record p-tb-20 p-lr-30">
    <view class="card p-lr-20 m-bottom-20"
     v-for="(item,index) in list"
     :key="index"
     @click="goDertail(item.id)"
     >
      <view class="top p-tb-30 min-border-bottom">
        <view>单号：{{item.deposit_sn}}</view>
        <view
          :class="item.deposit_status ? 'status ' + statusData[item.deposit_status].status : 'status '"
        >{{statusData[item.deposit_status].name }}</view>
      </view>
      <view class="main p-top-20">
        <view class="item">客户姓名：{{item.client_name}}</view>
        <view class="item">联系电话：{{item.client_mobile}}</view>
        <view class="item">存酒数量：{{item.product_count}}</view>
      </view>
      <view class="timer min-top-border">{{item.create_time}}</view>
    </view>
  </view>
</template>

<script>
// 1待确认，2已存酒，3已过期，4已回仓，5已作废，6已取酒
const statusData = [
  {},
  { name: '待确认', status: 'confirmed' },
  { name: '已存酒', status: 'end' },
  { name: '已过期', status: 'expired' },
  { name: '已回仓', status: 'force' },
  { name: '已作废', status: 'expired' },
  { name: '已取酒', status: 'force' }
]
export default {
  name: 'wine-record',
  navigate: ['navigateTo', 'switchTab'],
  data () {
    return {
      statusData,
      list: []
    }
  },
  methods: {
    // storing-liquor-detail
    goDertail (id) {
      this.$minRouter.push({
        name: 'storing-liquor-detail',
        params: { id }
      })
    }
  },
  mounted () {
    this.$minApi.getWinekeepingrecord().then(res => {
      this.list = res
    })
  }
}
</script>

<style lang="scss" scoped>
.fetch-record {
  .card {
    background: #fff;
    border-radius: 10rpx;
    .top {
      display: flex;
      justify-content: space-between;
    }
    .main {
      .item {
        margin-top: 20rpx;
        font-size: 28rpx;
        &:first-child {
          margin: 0;
        }
      }
    }
    .status {
      font-size: 26rpx;
      &.confirmed {
        color: #ff0101;
      }
      &.end {
        color: #39ba01;
      }
      &.force {
        color: #0090ff;
      }
      &.expired {
        color: #666666;
      }
    }
    .timer {
      width: 100%;
      height: 76rpx;
      line-height: 76rpx;
      font-size: 24rpx;
      color: #666666;
    }
  }
}
</style>
