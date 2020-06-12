<template>
  <view class="salary-details p-tb-20 p-lr-30">
    <view v-if="id === 0">
      <view class="view_main p-lr-20 m-bottom-20">
        <view class="top_view min-border-bottom">
          <text class="desc">金额</text>
          <text class="money">+33.20</text>
        </view>
        <view class="bottom-view p-bottom-20">
          <view class="m-tb-10 min-flex min-flex-main-between">
            <text class="c">类型</text>
            <text style="text-align:right">提现</text>
          </view>
          <view class="m-tb-10 min-flex min-flex-main-between">
            <text class="c">提现方式</text>
            <text style="text-align:right">支付宝</text>
          </view>
          <view class="m-tb-10 min-flex min-flex-main-between">
            <text class="c">交易流水</text>
            <text style="text-align:right">46892346312643123310</text>
          </view>
          <view class="m-tb-10 min-flex min-flex-main-between">
            <text class="c">支付时间</text>
            <text style="text-align:right">2019-06-09 16:41:25</text>
          </view>
        </view>
      </view>
      <view class="view_main p-lr-20 m-bottom-20 p-bottom-20">
        <view class="p-tb-20 min-border-bottom">
          <text class="desc">工资方案</text>
        </view>
        <view class="bottom-view">
          <view class="m-tb-10 min-flex min-flex-main-between">
            <text class="c">方案名称</text>
            <text style="text-align:right">方案名称1235</text>
          </view>
          <view class="m-tb-10 min-flex min-flex-main-between">
            <text class="c">工资类型</text>
            <text style="text-align:right">固定类型</text>
          </view>
          <view class="m-tb-10 min-flex min-flex-main-between">
            <text class="c">工资</text>
            <text style="text-align:right">$4689</text>
          </view>
          <view class="m-tb-10 min-flex min-flex-main-between">
            <text class="c">结算周期</text>
            <text style="text-align:right">周结</text>
          </view>
        </view>
      </view>
      <view class="jion_view">
        <view class="title min-border-bottom">工资方案</view>
        <view class="m-tb-10 min-flex min-flex-main-between">
          <text style="color:#666">结算周期</text>
          <text style="text-align:right">周结</text>
        </view>
        <view class="method-view min-border-bottom">
          <view class="left">基础提成</view>
          <view class="right">
            <text>订台人提成</text>
            <text>下单人提成</text>
            <text>下线分佣</text>
          </view>
        </view>
      </view>
    </view>
    <view v-if="id === 1">
      <view class="top p-lr-20">
        <view class="top_view">
          <text class="desc">金额</text>
          <text class="money">+{{list.total_amount}}</text>
        </view>
      </view>
      <view class="card p-lr-20 p-bottom-10 m-bottom-20">
        <view class="p-tb-30 min-border-bottom">核对记录</view>
        <view class="main p-tb-20">
          <view>系统统计应发<text>￥{{list.check_info.before_audit_amount}}</text></view>
          <view>核对后应发<text>￥{{list.check_info.after_audit_amount}}</text></view>
          <view>核对人员<text>{{list.check_info.operate_name}}</text></view>
          <view>核对时间<text>{{$minCommon.formatDate(new Date( list.check_info.create_time*1000),"yyyy/MM/dd")}}</text></view>
          <view style="display:flex;justify-content: space-between;" >
            <view style="width:130rpx; color: #666;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</view>
            <view style="margin-left:18rpx;flex:1;textAlign:right">{{list.check_info.remarks}}</view>
          </view>
        </view>
      </view>
      <view class="card p-lr-20 p-bottom-10 m-bottom-20">
        <view class="p-tb-30 min-border-bottom">审核记录</view>
        <view class="main p-tb-20">
          <view>核对后应发<text>￥{{list.audit_info.before_audit_amount}}</text></view>
          <view>审核后应发<text>￥{{list.audit_info.after_audit_amount}}</text></view>
          <view>审核人<text>{{list.audit_info.operate_name}}</text></view>
          <view>审核时间<text>{{$minCommon.formatDate(new Date(list.audit_info.create_time*1000),"yyyy/MM/dd")}}</text></view>
          <view style="display:flex;justify-content: space-between;" >
            <view style="width:130rpx; color: #666;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</view>
            <view style="margin-left:18rpx;flex:1;textAlign:right">{{list.audit_info.remarks}}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "salary-details",
  navigate: ["navigateTo"],
  data() {
    return {
      id: 0,
      list:{check_info:{before_audit_amount:""},audit_info:{before_audit_amount:""}}
    };
  },
  methods: {
    // 审核
    getShenH(){
      this.$minApi.getAuditdetails({
        remuneration_id:this.$parseURL().pid
      }).then(res=>{
        console.log(res);
        this.list = res
      })
    }
  },
  onLoad() {
    console.log(this.$parseURL());
    this.id = this.$parseURL().id;
   
    if( this.id === 1){
      uni.setNavigationBarTitle({title: "审核详情"}) 
      this.getShenH()
    }
  }
};
</script>
<style lang="scss" scoped>
.view_main {
  width: 100%;
  // height: 385rpx;
  background: #fff;
  border-radius: 10rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top_view {
    width: 100%;
    height: 150rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .desc {
      font-size: 28rpx;
      color: #666666;
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
    justify-content: space-around;
    flex: 1;
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
.jion_view {
  width: 100%;
  height: auto;
  background: #fff;
  padding-left: 33rpx;
  padding-right: 40rpx;
  color: rgba(51, 51, 51, 1);
  text {
    color: rgba(51, 51, 51, 1);
  }
  .title {
    width: 100%;
    height: 98rpx;
    line-height: 98rpx;
    .c {
      color: #666;
    }
  }
  .method-view {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 36rpx 0;
    .left {
      width: 50%;
      color: #666666;
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;

      text {
        display: block;
        margin-bottom: 20rpx;
      }
    }
  }
}

// 审核
.top {
  width: 100%;
  height: 150rpx;
  background: rgba(255, 255, 255, 1);
  border-radius: 10rpx;
  .top_view {
    width: 100%;
    height: 150rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .desc {
      font-size: 28rpx;
      color: #666666;
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
}
.card{
    background: #fff;
    border-radius: 10rpx;
    margin-top:20rpx;
    .main{
      position: relative;
      &>view{
        margin-bottom: 10rpx;
        display: flex;
        justify-content: space-between;
        color: #666;
        &:last-child{
          margin: 0;
        }
      }
      .card-btns{
        margin-top: 30rpx !important;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
