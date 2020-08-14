<template>
  <view class="commission p-tb-20 p-lr-30">
    <view class="view_main p-lr-20 p-bottom-20">
      <view class="top_view min-border-bottom">
        <text class="desc">提成</text>
        <text class="money">{{list.commission*1 > 0 ? `+${list.commission}` :list.commission }}</text>
      </view>
      <view class="bottom-view">
        <view class="main min-flex min-flex-main-between m-top-20">
          <text class="c">门店</text>
          <text style="text-align:right">{{list.store_name}}</text>
        </view>
        <view class="main min-flex min-flex-main-between">
          <text class="c">提成类型</text>
          <text style="text-align:right">{{list.friendly_commission_type}}</text>
        </view>
        <view class="main min-flex min-flex-main-between">
          <text class="c">我的角色</text>
          <text style="text-align:right">{{list.role_name ? list.role_name : '暂无'}}</text>
        </view>
        <view class="main min-flex min-flex-main-between">
          <text class="c">生成时间</text>
          <text
            style="text-align:right"
          >{{$minCommon.formatDate(new Date(list.commission_create_time*1000),'yyyy/MM/dd hh:mm:ss') }}</text>
        </view>
      </view>
    </view>
    <view
      class="card p-lr-20 p-bottom-10 m-bottom-20"
      v-if="list.commission_type === 2 || list.commission_type === 6 || list.commission_type === 3 || list.commission_type === 7  || list.commission_type === 8 || list.commission_type === 9 || list.commission_type === 10 || list.commission_type === 11"
    >
      <view class="p-tb-30 min-border-bottom q">活动信息</view>
      <view
        class="m-bottom-10 m-top-20 t"
        style="width:100%;display: flex;justify-content: space-between;"
      >
        <text class="f28">活动名称</text>
        <text class="f26">{{list.activity_name}}</text>
      </view>
      <view
        class="m-bottom-10 m-top-20 t"
        style="width:100%;display: flex;justify-content: space-between;"
      >
        <text class="f28">活动内容</text>
        <text class="f26">{{list.activity_content}}</text>
      </view>
      <view
        class="m-bottom-10 m-top-20 t"
        style="width:100%;display: flex;justify-content: space-between;"
        v-if="list.commission_type !== 6"
      >
        <text class="f28">活动业绩</text>
        <text class="f26">{{list.activity_performance_total}}元</text>
      </view>
    </view>
    <!-- 基础提成 -->
    <view
      class="card p-lr-20 p-bottom-10 m-bottom-20"
      v-if="list.commission_type === 0 || list.commission_type === 1 || list.commission_type === 3 || list.commission_type === 4  || list.commission_type === 5 || list.commission_type === 6"
    >
      <view class="p-tb-30 min-border-bottom q">订单信息</view>
      <view
        class="m-bottom-10 m-top-20 t"
        style="width:100%;display: flex;justify-content: space-between;"
      >
        <text class="f28">台号</text>
        <text class="f26">{{list.desk_name}}</text>
      </view>
      <view
        class="m-bottom-10 m-top-20 t"
        style="width:100%;display: flex;justify-content: space-between;"
      >
        <text class="f28">订台人</text>
        <text class="f26">{{list.book_user_name ? list.book_user_name : '暂无'}}</text>
      </view>
      <view
        class="m-bottom-10 m-top-20 t"
        style="width:100%;display: flex;justify-content: space-between;"
      >
        <text class="f28">下单人</text>
        <text class="f26">{{list.order_user_name ? list.order_user_name : '暂无'}}</text>
      </view>
      <view
        class="m-bottom-10 m-top-20 t"
        style="width:100%;display: flex;justify-content: space-between;"
      >
        <text class="f28">下单时间</text>
        <text
          class="f26"
        >{{$minCommon.formatDate(new Date(list.order_create_time*1000),'yyyy/MM/dd hh:mm:ss') }}</text>
      </view>
      <view
        class="m-bottom-10 m-top-20 t"
        style="width:100%;display: flex;justify-content: space-between;"
      >
        <text class="f28">订单号</text>
        <text class="f26">{{list.order_sn}}</text>
      </view>
      <view
        class="m-bottom-10 m-top-20 t"
        style="width:100%;display: flex;justify-content: space-between;"
      >
        <text class="f28">订单金额</text>
        <text class="f26">￥{{list.order_total ? list.order_total : 0}}</text>
      </view>
      <view
        class="m-bottom-10 m-top-20 t"
        style="width:100%;display: flex;justify-content: space-between;"
        v-if="list.commission_type !== 3 &&  list.commission_type !== 6"
      >
        <text class="f28">业绩</text>
        <text class="f26">￥{{list.performance_total ? list.performance_total : 0}}</text>
      </view>
      <view class="table_view" v-if="list.product_list.length">
        <min-table :lists="list.product_list"></min-table>
      </view>
    </view>
    <!-- 充公酒 -->
    <view class="card p-lr-20 p-bottom-10 m-bottom-20" v-if="list.commission_type === 12">
      <view class="p-tb-30 min-border-bottom q">充公信息</view>
      <view
        class="m-bottom-10 m-top-20 t"
        style="width:100%;display: flex;justify-content: space-between;"
      >
        <text class="f28">充公人</text>
        <text class="f26">{{list.confiscate_user_name }}</text>
      </view>
      <view
        class="m-bottom-10 m-top-20 t"
        style="width:100%;display: flex;justify-content: space-between;"
      >
        <text class="f28">充公单号</text>
        <text class="f26">{{list.confiscate_sn}}</text>
      </view>
      <view
        class="m-bottom-10 m-top-20 t"
        style="width:100%;display: flex;justify-content: space-between;"
      >
        <text class="f28">充公时间</text>
        <text
          class="f26"
        >{{$minCommon.formatDate(new Date(list.confiscate_time*1000),'yyyy/MM/dd hh:mm:ss') }}</text>
      </view>
      <view class="table_view" v-if="list.product_list.length">
        <min-table :lists="list.product_list"></min-table>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'commission-deils',
  navigate: ['navigateTo'],
  data() {
    return {
      list: {},
    }
  },
  mounted() {
    console.log(this.$parseURL())
    this.getData(this.$parseURL().id)
  },
  methods: {
    getData(id) {
      this.$minApi
        .getTcDatail({
          commission_id: id,
        })
        .then(res => {
          console.log(res)
          this.list = res
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.view_main {
  width: 100%;
  height: 385rpx;
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
.card {
  margin-top: 20rpx;
  background: #fff;
  .q {
    color: #333333;
    font-weight: bold;
  }
  .t {
    text {
      color: #666666;
    }
  }
}
.table_view {
  width: 100%;
  margin: 20rpx 0;
  background: #fff;
  height: auto;
  display: block;
}
</style>
