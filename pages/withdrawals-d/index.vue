<template>
  <view class="withdrawaldetails p-tb-20 p-lr-30">
    <view class="view_main p-lr-20">
      <view class="top_view min-border-bottom">
        <text class="desc">金额</text>
        <text class="money">+{{list.total_amount}}</text>
      </view>
      <view class="bottom-view">
        <view class="main min-flex min-flex-main-between">
          <text class="c">门店</text>
          <text style="text-align:right">{{list.store_name}}</text>
        </view>
        <view class="main min-flex min-flex-main-between">
          <text class="c">发放时间</text>
          <text style="text-align:right">{{list.grant_time}}</text>
        </view>
        <view class="main min-flex min-flex-main-between">
          <text class="c">流水号</text>
          <text style="text-align:right">{{list.serial_number}}</text>
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
    <!--发放详情-->
    <view v-if="type===1" class="m-top-20">
      <view v-for="(item,index) in list.grant_list" :key="index" class="m-bottom-20 view_main  p-lr-20 ">
        <view>
          <view class="min-border-bottom" style="height:87rpx;line-height:87rpx">
            {{$minCommon.formatDate(new Date(item.cycle_start_time*1000),"yyyy/MM/dd")}}-{{$minCommon.formatDate(new Date(item.cycle_end_time*1000),"MM/dd")}}{{list.grant_type === 1 ? '工资':'提成'}}
          </view>
          <view class="bottom-view">
            <view class="main min-flex min-flex-main-between" @click="yingfa(0,item.remuneration_id)">
              <text class="c">应发</text>
              <text>￥{{item.sys_amount}}</text>
              <text style="text-align:right">详情 ></text>
            </view>
            <view class="main min-flex min-flex-main-between" @click="yingfa(1,item.remuneration_id)">
              <text class="c">实发</text>
              <text>￥{{item.amount}}</text>
              <text style="text-align:right">详情 ></text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
// // 发放1：已制单，2：已发放，3：已到账）
const faStatus = ["","已制单","已发放","已到账"]
export default {
  name: "",
  navigate: ["navigateTo"],
  data() {
    return {
      type: 0,
      faStatus,
      list:{}
    };
  },
  methods: {
    yingfa(n,remunerationid){
      this.$minRouter.push({
        name:'salary-details',
        params:{id:n,pid:remunerationid}
      })
    },
    // 获取发放详情
    getFaDetail(){
      this.$minApi.faFangDetail({
        group_id:this.$parseURL().id
      }).then(res=>{
        console.log(res);
        this.list =res
      })
    }
  },
  onLoad() {
    console.log(this.$parseURL());
    this.type = this.$parseURL().type;
    switch (this.$parseURL().type) {
      case 1:
        uni.setNavigationBarTitle({
          title: "发放详情"
        });
        this.getFaDetail()
        break;
      case 3:
        uni.setNavigationBarTitle({
          title: "转账详情"
        });
        break;
    }
  }
};
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
    }
    text {
      width: 50%;
      height: auto;
      display: block;
    }
  }
}
</style>
