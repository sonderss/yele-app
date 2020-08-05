<template>
  <view class="salary-details p-tb-20 p-lr-30">
    <view v-if="id === 0">
      <view class="view_main p-lr-20 m-bottom-20">
        <view class="top_view min-border-bottom">
          <text class="desc">工资</text>
          <text class="money">{{list.sys_amount}}</text>
        </view>
        <view class="bottom-view p-bottom-20">
          <view class="m-tb-10 min-flex min-flex-main-between">
            <text class="c">门店</text>
            <text style="text-align:right">{{list.store_name}}</text>
          </view>
          <view class="m-tb-10 min-flex min-flex-main-between">
            <text class="c">工资周期</text>
            <text style="text-align:right">{{$minCommon.formatDate(new Date(list.cycle_start_time*1000),"MM/dd") }}至{{$minCommon.formatDate(new Date(list.cycle_end_time*1000),"MM/dd") }}</text>
          </view>
          <view class="m-tb-10 min-flex min-flex-main-between">
            <text class="c">生成时间</text>
            <text style="text-align:right">{{$minCommon.formatDate(new Date(list.generate_time*1000),"yyyy/MM/dd hh:mm:ss") }}</text>
          </view>
          <view class="m-tb-10 min-flex min-flex-main-between">
            <text class="c">发放时间</text>
            <text style="text-align:right">{{$minCommon.formatDate(new Date(list.grant_time*1000),"yyyy/MM/dd hh:mm:ss")}}</text>
          </view>
        </view>
      </view>
      <view class="view_main p-lr-20 m-bottom-20 p-bottom-20" v-if="list.salary_plans.salary_type === 1">
        <view class="p-tb-20 min-border-bottom">
          <text class="desc">工资方案</text>
        </view>
        <view class="bottom-view">
          <view class="m-tb-10 min-flex min-flex-main-between">
            <text class="c">方案名称</text>
            <text style="text-align:right">{{list.salary_plans.plan_name}}</text>
          </view>
          <view class="m-tb-10 min-flex min-flex-main-between">
            <text class="c">工资类型</text>
            <text style="text-align:right">固定工资</text>
          </view>
          <view class="m-tb-10 min-flex min-flex-main-between">
            <text class="c">工资</text>
            <text style="text-align:right">￥{{list.salary_plans.salary_basic}}</text>
          </view>
          <view class="m-tb-10 min-flex min-flex-main-between">
            <text class="c">结算周期</text>
            <text style="text-align:right">{{zhouqi[list.salary_plans.smt_cycle]}}</text>
          </view>
          <view class="m-tb-10 min-flex min-flex-main-between">
            <text class="c">延期发放时长</text>
            <text style="text-align:right">{{list.salary_plans.delay}}</text>
          </view>
        </view>
      </view>
      <view class="jion_view" v-if="list.salary_plans.salary_type === 2">
        <view class="title min-border-bottom">工资方案</view>
        <view class="m-tb-10 min-flex min-flex-main-between">
            <text class="c">方案名称</text>
            <text style="text-align:right">{{list.salary_plans.plan_name}}</text>
        </view>
        <view class="m-top-10 min-flex min-flex-main-between">
            <text class="c">工资类型</text>
            <text style="text-align:right">业绩级别工资</text>
        </view>
        <view class="method-view">
          <view class="">工资</view>
          <view class="right" v-for="(item,index) in list.salary_plans.levels" :key="index">
            <text>{{item.low}} > 业绩  ≥ {{item.high}}，工资：{{item.salary}}</text>
          </view>
        </view>
        <view class="m-tb-10 min-flex min-flex-main-between">
            <text class="c">结算周期</text>
            <text style="text-align:right">{{zhouqi[list.salary_plans.smt_cycle]}}</text>
          </view>
          <view class="m-top-10 p-bottom-20 min-flex min-flex-main-between">
            <text class="c">延期发放时长</text>
            <text style="text-align:right">{{list.salary_plans.delay}}</text>
          </view>
      </view>
    </view>
    <view v-if="id === 1">
      <view class="top p-lr-20">
        <view class="top_view">
          <text class="desc">金额</text>
          <text class="money">{{list.total_amount}}</text>
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
      // 1月结、2周结、3日结、4自定义
      zhouqi:['','月结','周结','日结','自定义'],
      id: 0,
      list:{salary_plans:{plan_name:''},check_info:{before_audit_amount:""},audit_info:{before_audit_amount:""}}
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
    },
    // 工资
    getGz(){
      this.$minApi.getSelaDetail({
         remuneration_id:this.$parseURL().pid
      }).then(res => {
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
    if(this.id === 0 ){
      this.getGz()
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
  .c {
      color: #666666;
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
    margin: 16rpx 0;
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
        margin-bottom: 10rpx;
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
