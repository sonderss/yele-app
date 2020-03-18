<template>
  <view class="platform-history p-top-20 p-lr-30">
    <view class="card p-lr-20 p-top-30 m-bottom-20"  v-for="(item,index) in list" :key='index'>
      <view class="main p-bottom-30" >
        <view>客户姓名：{{item.client_name}}</view>
        <view>联系电话：{{item.client_mobile}}</view>
        <view>开台时间：{{item.opened_time}}</view>
        <view v-if="item.deactivated === 2">销台时间：{{item.closed_time}}</view>
        <view>营销人员：{{item.sales_name}}</view>
        <view>账单金额：￥{{item.bill_price}}</view>
        <view>应付金额：￥{{item.receivable_price}}</view>
        <view>已付金额：￥{{item.pay_price}}</view>
      </view>
      <view class="footer min-border-top p-tb-20">
        <view v-if="item.pay_status === 0" :class="item.pay_status === 0 ? 'amount': 'tips'">
           待付金额：￥{{item.unpay_price}}
        </view>
        <view v-if="item.deactivated === 1" class="tips">
            已结清
        </view>
        <view class="btns">
          <min-btn size="xs" type="white" border>查看订单</min-btn>
          <view style='width:20rpx'></view>
          <min-btn size="xs" type="white" border class="m-left-20">查看账单</min-btn>
        </view>
      </view>
    </view>
    <min-404 v-if="list.length === 0" id='none'></min-404>
  </view>
</template>

<script>
export default {
  name: 'platform-history',
  navigate: ['navigateTo'],
  data () {
    return {
      list: []
    }
  },
  mounted () {
  },
  onLoad () {
    console.log(this.$parseURL().id)
    this.getData(this.$parseURL().id)
  },
  methods: {
    getData (id) {
      this.$minApi.getStationHistory({ desk_id: id })
        .then(res => {
          console.log(res)
          this.list = res.list
          this.list.map(item => {
            if (item.cancel_time !== 0) {
              item.cancel_time = this.$minCommon.formatDate(new Date(item.cancel_time * 1000), 'yyyy-MM-dd hh:mm:ss')
            }
            if (item.create_time !== 0) {
              item.create_time = this.$minCommon.formatDate(new Date(item.create_time * 1000), 'yyyy-MM-dd hh:mm:ss')
            }
          })
        })
    }
  }
}

</script>

<style lang="scss" scoped>
.platform-history{
  .card{
    background: #fff;
    border-radius: 10rpx;
    .main{
      &>view{
        margin-bottom: 10rpx;
        &:last-child{
          margin: 0;
        }
      }
    }
    .footer{
      display: flex;
      justify-content: space-between;
      .amount{
        color: #FF0000;
        font-size: 24rpx;
        line-height: 68rpx;
        font-weight: bold;
      }
      .tips{
        line-height: 68rpx;
        font-size: 24rpx;
      }
      .btns{
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
