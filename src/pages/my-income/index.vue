<template>
  <view class="myincome p-tb-20 p-lr-30">
    <view class="top-view">
      <view class="t-view">
        <text class="price">可提现金额</text>
        <view class="money">
          <text class="icon">￥</text>
          <text class="tr">8888.88</text>
        </view>
        <text class="btn" @click="widthdraw">提现</text>
      </view>
      <view class="b-view">
        <view class="left-view">
          <text class="f22">待发放工资</text>
          <text class="f28 c">￥1000</text>
        </view>
        <view class="right-view">
          <text class="f22">待发放工资</text>
          <text class="f28 c">￥1000</text>
        </view>
      </view>
    </view>
    <view class="btn-view m-tb-20">
      <view class="btn" @click="commissiondetails">
        <image class="m-bottom-10" src="../../static/images/ticheng.png" />
        <text>提成明细</text>
      </view>
       <view class="btn" @click="salary">
        <image class="m-bottom-10" src="../../static/images/gongzi.png" />
        <text>工资明细</text>
      </view>
       <view class="btn" @click="releaserecord">
        <image class="m-bottom-10" src="../../static/images/zhichu.png" />
        <text>发放记录</text>
      </view>
      <view class="btn" @click="withdrawalsrecord">
        <image class="m-bottom-10" src="../../static/images/tixian.png" />
        <text>提现记录</text>
      </view>
    </view>

    <view class="jion_view">
      <view class="title min-border-bottom">我参与的方案（simba）</view>
      <view class="method-view min-border-bottom">
        <view class="left">工资方案</view>
        <view class="right">
          <text>工资方案名称</text>
        </view>
      </view>
      <view class="method-view min-border-bottom">
        <view class="left">基础提成</view>
        <view class="right">
          <text>订台人提成</text>
          <text>下单人提成</text>
          <text>下线分佣</text>
        </view>
      </view>
      <view class="method-view min-border-bottom">
        <view class="left">活动方案</view>
        <view class="right">
          <text>活动名称1</text>
          <text>活动名称2</text>
          <text>活动名称3</text>
        </view>
      </view>
    </view>
    <view class="desc">暂不支付在APP直接查看方案详细信息</view>
    <min-drawer :visible="show" mode="right" @close="close">
        <view class="top_view_drawer">
            <view class="f30" style="font-weight:500;">全部门店</view>
             <view class="f24 iconfont" style="color:#000" @click="close">&#xe608;</view>
        </view>
        <view class="main_drawer">
          <view  class="li" v-for="(idnex) in 5" :key="idnex">
            <min-cell-item title="SIMBA" :border="idnex === 5?false :true" :title_right="idnex === 1 ? '当前门店' : '' " img="../../static/images/headurl60.png" label="可提现金额：￥2005"></min-cell-item>
          </view>
        </view>

    </min-drawer>
  </view>
</template>
<script>
export default {
  name: 'my-income',
  navigate: ['navigateTo'],
  onNavigationBarButtonTap () {
    this.show = !this.show
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    // 提成明细
    commissiondetails () {
      this.$minRouter.push({
        name: 'commission-details'
      })
    },
    // 工资明细
    salary () {
      this.$minRouter.push({
        name: 'salary-breakdown'
      })
    },
    // 提现记录
    withdrawalsrecord () {
      this.$minRouter.push({
        name: 'withdrawals-record'
      })
    },
    // 发放记录
    releaserecord () {
      this.$minRouter.push({
        name: 'release-record'
      })
    },
    // 提现
    widthdraw () {
      this.$minRouter.push({
        name: 'width-draw'
      })
    },
    close () {
      this.show = false
    }
  }
}
</script>
<style lang="scss" scoped>
.top-view {
  width: 100%;
  height: 481rpx;
  background: #030313;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10rpx;
  overflow: hidden;
  .t-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .price {
      width: auto;
      height: 26rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(204, 204, 204, 1);
      line-height: 26rpx;
      margin-top: 85rpx;
    }
    .money {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 40rpx 0;
      margin-top: 20rpx;
      .tr {
        display: block;
        font-size: 84rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(255, 224, 1, 1);
      }
      .icon {
        display: block;
        font-size: 48rpx;
        color: rgba(255, 224, 1, 1);
      }
    }
    .btn {
      width: 580rpx;
      height: 88rpx;
      background: rgba(255, 224, 1, 1);
      border-radius: 10rpx;
      text-align: center;
      line-height: 88rpx;
      margin-bottom: 20rpx;
    }
  }
  .b-view {
    height: 122rpx;
    background: rgba(55, 52, 69, 1);
    border-radius: 0px 0px 10rpx 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text {
      color: #fff;
      color: rgba(204, 204, 204, 1);
    }
    .c {
      color: #ffe001;
    }
    .left-view {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .right-view {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
}
.btn-view {
  width: 100%;
  height: 108rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
   background: rgba(255, 255, 255, 1);
  image{
    width: 44rpx;
    height: 44rpx;
    display: block;
  }
  .btn {
    width: 157rpx;
    height: 100%;
    border-radius: 10rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text{
      font-size: 26rpx;
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
  }
  .method-view {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 36rpx 0;
    .left {
      width: 50%;
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
.desc {
  width: 100%;
  height: 20rpx;
  font-size: 20rpx;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 9rpx;
  padding-left: 30rpx;
}
.view_main{
  width: 100%;
  height: 100%;
  padding: 0 30rpx;
  overflow: auto;
  .li{
    width: 100%;
    height: 138rpx;
  }
  .top-view_{
    width: 100%;
    height: 84rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
// 抽屉
.top_view_drawer{
  padding: 30rpx;
  background: #ffe001;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main_drawer{
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20rpx;
  padding-top: 0;
}
</style>
