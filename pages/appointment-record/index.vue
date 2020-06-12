<template>
<view class="appointment-record">
    <view class="top-view"  v-if="list.length !== 0">
      <view class="top-v" @click="change1">
        <text :class="num === 0 ? 'status end' : 'status' ">定台时间</text>
        <image :class="animation ? 'arro animation right-arrow-a ':  'arro animation'"  src='/static/images/downarrow24.png' />
      </view>
      <view class="top-v" @click="change">
        <text :class="num === 1 ? 'status end' : 'status' ">消费金额</text>
        <image :class="animation1 ? 'arro  animation right-arrow-a'  :  'arro  animation'"  src='/static/images/downarrow24.png' />
      </view>
    </view>
    <view class="main p-tb-20 m-tb-20 m-lr-30 p-lr-20"
    v-for="(item,index) in list"
    :key="index"
    >
      <view class="item">客户姓名：{{item.client_name}}</view>
      <view class="item phone">
        <text>联系电话：{{item.client_mobile}}</text>
        <view class="image-view">
          <image src='/static/images/phone.png' @click="makePhone(item.client_mobile)"/>
        </view>
      </view>
      <view class="item">预约时间：{{item.create_time}}</view>
      <view class="item">预抵时间：{{item.arrival_time}}</view>
      <view class="item">台位状态：<text class="status confirmed">{{status[item.status] }}</text></view>
      <view class="item">消费金额：￥{{item.bill_price}}</view>
      <view class="btm-view min-border-top m-top-20">
        <view class="o" @click="queryOrder(item)">查看订单</view>
        <view class="o" @click="queryDist(item)">查看账单</view>
      </view>
    </view>
    <min-404  v-if="list.length === 0"/>
</view>
</template>

<script>
// 1：'已预约',2：'已过期',3：'已开台',4：'已取消',5：'已销台'
const status = ['未知', '已预约', '已过期', '已开台', '已取消', '已销台']
export default {
  name: 'appointment-record',
  navigate: ['navigateTo'],
  data () {
    return {
      list: [],
      status,
      num: 0,
      animation: false,
      animation1: false
    }
  },
  mounted () {
    const data = { order: 'time', sort: 'asc', page: 1, limit: 30 }
    this.getData(data)
  },
  methods: {
    getData (data) {
      this.$minApi.getBookList(data)
        .then(res => {
          console.log(res)
          this.list = res.list
          this.list.map(item => {
            item.arrival_time = this.$minCommon.formatDate(new Date(item.arrival_time * 1000), 'yyyy-MM-dd hh:mm:ss')
            item.create_time = this.$minCommon.formatDate(new Date(item.create_time * 1000), 'yyyy-MM-dd hh:mm:ss')
          })
        })
    },
    change () {
      this.num = 1
      this.animation1 = !this.animation1
      if (this.animation1) {
        const data = { order: 'price', sort: 'desc', page: 1, limit: 30 }
        this.getData(data)
      } else {
        const data = { order: 'price', sort: 'asc', page: 1, limit: 30 }
        this.getData(data)
      }
    },
    change1 () {
      this.num = 0
      this.animation = !this.animation
      // desc：倒序，asc：顺序（默认）
      if (this.animation) {
        const data = { order: 'time', sort: 'desc', page: 1, limit: 30 }
        this.getData(data)
      } else {
        const data = { order: 'time', sort: 'asc', page: 1, limit: 30 }
        this.getData(data)
      }
    },
    makePhone (phone) {
      uni.makePhoneCall({
        phoneNumber: phone
      })
    },
    // 查看订单
    queryOrder (item) {
      console.log(item)
      this.$minRouter.push({
        name: 'order-list',
        params:{open_id:item.opening_id}
      })
    },
    // 查看账单
    queryDist (item) {
      this.$minRouter.push({
        name: 'desk-bill',
        params: { open_id: item.opening_id, desk_id: item.desk_id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.top-view {
  background: #fff;
  height: 90rpx;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  .top-v {
    display: block;
    width: 50%;
    line-height: 90rpx;
    text-align: center;
    .arro{
      width:18rpx;
      height:13rpx;
      margin-left: 5rpx
    }
    .arrw{
      transform:rotate(-180deg);
    }
  }
}
.main {
  height: auto;
  background: #fff;
  padding-bottom: 0;
  .item {
    margin-bottom: 10rpx;
  }
  .phone{
    display: flex;
    justify-content: space-between;
    .image-view{
      width: 44rpx;
      height: 44rpx;
      image{
        width: 100%;
        height: 100%;
      }
    }
  }
  .btm-view{
    height: 98rpx;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .o{
      width: 142rpx;
      height: 58rpx;
      background:rgba(255,255,255,1);
      border:1px solid rgba(231,231,231,1);
      border-radius:10rpx;
      margin-left: 20rpx;
      text-align: center;
      line-height: 58rpx;
    }
  }
}
.status{
      font-size: 26rpx;
      &.confirmed{
        color: #FF0000
      }
      &.end{
        color: #FF2C00
      }
      &.force{
        color: #0090FF
      }
      &.expired{
        color: #666666
      }
    }
.right-arrow-a{
    transform:rotate(180deg);
  }
.animation {
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: ease;
}
// p-tb-20 p-lr-30
</style>
