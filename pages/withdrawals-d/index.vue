<template>
  <view class="withdrawaldetails p-tb-20 p-lr-30">
    <!--发放详情-->
    <view class="view_main p-lr-20" v-if="type===1">
      <view class="top_view min-border-bottom">
        <text class="desc">金额</text>
        <text class="money">{{list.total_amount}}</text>
      </view>
      <view class="bottom-view">
        <view class="main min-flex min-flex-main-between">
          <text class="c">门店</text>
          <text style="text-align:right">{{list.store_name}}</text>
        </view>
        <view class="main min-flex min-flex-main-between">
          <text class="c">发放时间</text>
          <text
            style="text-align:right"
          >{{$minCommon.formatDate(new Date(list.grant_time*1000),"yyyy/MM/dd hh:mm:ss") }}</text>
        </view>
        <view class="main min-flex min-flex-main-between">
          <text class="c">流水号</text>
          <text style="text-align:right">{{list.serial_number ? list.serial_number :'暂无'}}</text>
        </view>
        <view class="main min-flex min-flex-main-between">
          <text class="c">状态</text>
          <text style="text-align:right">{{faStatus[list.grant_status]}}</text>
        </view>
        <view class="main min-flex min-flex-main-between">
          <text class="c">发放类型</text>
          <text style="text-align:right">{{list.grant_type === 1 ? '工资':'提成'}}</text>
        </view>
      </view>
    </view>
    <view v-if="type===1" class="m-top-20">
      <view
        v-for="(item,index) in list.grant_list"
        :key="index"
        class="m-bottom-20 view_main p-lr-20"
      >
        <view>
          <view
            class="min-border-bottom"
            style="height:87rpx;line-height:87rpx"
          >{{$minCommon.formatDate(new Date(item.cycle_start_time*1000),"yyyy/MM/dd")}}-{{$minCommon.formatDate(new Date(item.cycle_end_time*1000),"MM/dd")}}{{list.grant_type === 1 ? '工资':'提成'}}</view>
          <view class="bottom-view">
            <view
              class="main min-flex min-flex-main-between"
              @click="yingfa(0,item.remuneration_id)"
            >
              <text class="c">应发</text>
              <text>￥{{item.sys_amount}}</text>
              <text style="text-align:right">详情 ></text>
            </view>
            <view
              class="main min-flex min-flex-main-between"
              @click="yingfa(1,item.remuneration_id)"
            >
              <text class="c">实发</text>
              <text>￥{{item.amount}}</text>
              <text style="text-align:right">详情 ></text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!--提现详情-->
    <view class="view_main p-lr-20" v-if="type=== 2">
      <view class="top_view min-border-bottom">
        <text class="desc">金额</text>
        <text class="money">{{list.amount}}元</text>
      </view>
      <view class="bottom-view">
        <view class="main min-flex min-flex-main-between">
          <text class="c">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</text>
          <text style="text-align:right">提现</text>
        </view>
        <view class="main min-flex min-flex-main-between">
          <text class="c">提现时间</text>
          <text
            style="text-align:right"
          >{{ $minCommon.formatDate(new Date(list.create_time*1000),"yyyy/MM/dd hh:mm:ss") }}</text>
        </view>
        <view class="main min-flex min-flex-main-between">
          <text class="c">提现方式</text>
          <text style="text-align:right">银行卡</text>
        </view>
        <view
          class="main min-flex min-flex-main-between"
          v-if="list.transaction_status !== 2 && list.transaction_status !== 0"
        >
          <text class="c">交易流水</text>
          <text style="text-align:right;flex:1">{{list.transaction_no}}</text>
        </view>
        <view
          class="main min-flex min-flex-main-between"
          v-if="list.transaction_status !== 2 && list.transaction_status !== 0"
        >
          <text class="c">到账金额</text>
          <text style="text-align:right">{{list.withdraw.amount}}元</text>
        </view>
        <view
          class="main min-flex min-flex-main-between"
          v-if="list.transaction_status !== 2 && list.transaction_status !== 0"
        >
          <text class="c">手续费流水</text>
          <text style="text-align:right">{{list.withdraw_fee.serial_no}}</text>
        </view>
        <view
          class="main min-flex min-flex-main-between"
          v-if="list.transaction_status !== 2 && list.transaction_status !== 0"
        >
          <text class="c">手&nbsp; 续&nbsp; 费</text>
          <text style="text-align:right">{{list.withdraw_fee.amount}}元</text>
        </view>
        <view class="main min-flex min-flex-main-between">
          <text class="c">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态</text>
          <text
            style="text-align:right"
          >{{list.transaction_status === 0 ? '提现中' : (list.transaction_status === 1 ? '提现成功' : '提现失败' )}}</text>
        </view>
        <view class="main min-flex min-flex-main-between" v-if="list.transaction_status === 1">
          <text class="c">提现成功时间</text>
          <text
            style="text-align:right"
          >{{ $minCommon.formatDate(new Date(list.arrive_time*1000),"yyyy/MM/dd hh:mm:ss") }}</text>
        </view>
        <view class="main min-flex min-flex-main-between" v-if="list.transaction_status === 2">
          <text class="c">失败原因</text>
          <text style="text-align:right">{{ list.fail_reason ? list.fail_reason :'暂无'}}</text>
        </view>
      </view>
    </view>
    <!--转账详情-->
    <view class="view_main p-lr-20" v-if="type=== 3">
      <view class="top_view min-border-bottom">
        <text class="desc">金额</text>
        <text class="money">{{list.amount}}</text>
      </view>
      <view class="bottom-view">
        <view class="main min-flex min-flex-main-between">
          <text class="c">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</text>
          <text style="text-align:right">转账</text>
        </view>
        <view class="main min-flex min-flex-main-between">
          <text class="c">转账时间</text>
          <text
            style="text-align:right"
          >{{ $minCommon.formatDate(new Date(list.create_time*1000),"yyyy/MM/dd hh:mm:ss") }}</text>
        </view>
        <view class="main min-flex min-flex-main-between">
          <text class="c">转账来源</text>
          <text style="text-align:right">{{list.account_name}}</text>
        </view>
        <view class="main min-flex min-flex-main-between">
          <text class="c">交易流水</text>
          <text style="text-align:right">{{list.serial_no}}</text>
        </view>
        <view class="main min-flex min-flex-main-between">
          <text class="c">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态</text>
          <text
            style="text-align:right"
          >{{list.transaction_status === 0 ? '入账中' : (list.transaction_status === 1 ? '已到账' : '入账失败' )}}</text>
        </view>
        <view class="main min-flex min-flex-main-between" v-if="list.transaction_status === 1">
          <view class="c">到账时间</view>
          <view
            class="m-left-20"
          >{{$minCommon.formatDate(new Date(list.arrive_time*1000),"yyyy/MM/dd hh:mm:ss") }}</view>
        </view>
        <view class="main min-flex min-flex-main-between" v-if="list.transaction_status === 2">
          <view class="c">失败原因</view>
          <view class="m-left-20">{{list.fail_reason}}</view>
        </view>
        <view class="remake">
          <view class>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</view>
          <view class="m-left-20">{{list.remark}}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
// // 发放1：已制单，2：已发放，3：已到账）
const faStatus = ['', '已制单', '已发放', '已到账']
export default {
  name: '',
  navigate: ['navigateTo'],
  data() {
    return {
      type: 0,
      faStatus,
      list: { withdraw: { amount: '' }, withdraw_fee: { serial_no: '' } },
    }
  },
  methods: {
    yingfa(n, remunerationid) {
      this.$minRouter.push({
        name: 'salary-details',
        params: { id: n, pid: remunerationid },
      })
    },
    // 获取发放详情
    getFaDetail() {
      this.$minApi
        .faFangDetail({
          group_id: this.$parseURL().id,
        })
        .then(res => {
          console.log(res)
          this.list = res
        })
    },
    // 提现详情
    getTiDetail() {
      this.$minApi
        .getTiXianDetail({
          record_id: this.$parseURL().id,
        })
        .then(res => {
          console.log(res)
          this.list = res
        })
    },
    // 转账详情
    getBillDetail() {
      this.$minApi
        .getZhBillDetail({
          record_id: this.$parseURL().id,
        })
        .then(res => {
          console.log(res)
          this.list = res
        })
    },
  },
  onLoad() {
    console.log(this.$parseURL())
    this.type = this.$parseURL().type
    switch (this.$parseURL().type) {
      case 1:
        uni.setNavigationBarTitle({
          title: '发放详情',
        })
        this.getFaDetail()
        break
      case 2:
        // 提现详情
        this.getTiDetail()
        break
      case 3:
        uni.setNavigationBarTitle({
          title: '转账详情',
        })
        this.getBillDetail()
        break
    }
  },
}
</script>
<style lang="scss" scoped>
.view_main {
  width: 100%;
  background: #fff;
  border-radius: 10rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 20rpx;
  .top_view {
    width: 100%;
    height: 150rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .desc {
      font-size: 28rpx;
      color: rgba(102, 102, 102, 1);
    }
    .money {
      font-size: 60rpx;
      font-weight: bold;
      color: rgba(255, 0, 0, 1);
      text-align: right;
    }
    text {
      width: 50%;
      height: 100%;
      display: block;
      line-height: 150rpx;
    }
  }
  .bottom-view {
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
    flex: 1;
    margin-top: 20rpx;
    .main {
      margin-bottom: 10rpx;
    }
    .c {
      color: #666666;
      width: auto;
    }
    text {
      width: 50%;
      height: auto;
      display: block;
    }
  }
}
.remake {
  display: flex;
  justify-content: space-between;
}
</style>
