<template>
  <view class="salary-breakdown p-lr-30 p-tb-10">
     <view class="top_view">
      <view class="botm">
        <text class="f26">未发放￥1530.23</text>
        <text class="f26 m-left-20">已发放￥153000.23</text>
      </view>
    </view>
    <view class="m-top-10">
      <view
        v-for="index in 5"
        :key="index"
        class="cell-item min-flex min-flex-main-between p-tb-30 p-lr-20 min-border-bottom"
        @click="toDeatil"
      >
        <view class="min-flex">
          <view class style="width:300rpx">
            <view class="f28">Simba基础提成</view>
            <view class="label m-top-10 f24 assist-text min-ellipsis">未发放</view>
          </view>
        </view>
        <view class="min-flex flex-end min-flex-dir-top">
          <view :class=" index <= 3 ? 'ablack' : 'ared'">+110</view>
        </view>
      </view>
    </view>
    <min-drawer :visible="showdrawer" mode="right" @close="closedrawer">
        <view class="top_view_drawer">
            <view class="f30" style="font-weight:500;">全部门店</view>
            <view class="f24 iconfont" style="color:#000" @click="closedrawer">&#xe608;</view>
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
  name: 'salary-breakdown',
  navigate: ['navigateTo'],
  data () {
    return {
      showdrawer: false
    }
  },
  onNavigationBarButtonTap () {
    this.showdrawer = !this.showdrawer
  },
  methods: {
    toDeatil () {
      this.$minRouter.push({
        name: 'salary-details'
      })
    },
    closedrawer () {
      this.showdrawer = false
    }
  }
}
</script>
<style lang="scss" scoped>
.view_main{
  width: 100%;
  height: 385rpx;
  background: #fff;
  border-radius:10rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top_view{
    width: 100%;
    height: 150rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .desc{
       font-size:28rpx;
       color:rgba(102,102,102,1);
    }
    .money{
      font-size:60rpx;
      font-weight:bold;
      color:rgba(255,0,0,1);
      text-align: right;
    }
    text{
      width: 50%;
      height: 100%;
      display: block;
      line-height: 150rpx;
    }
  }
  .bottom-view{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
    .c{
      color: #666666;
    }
    text{
      width: 50%;
      height: auto;
      display: block;
    }
  }
}
.top_view {
  width: 100%;
  height: 100rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .botm {
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 5rpx;
    text {
      color: rgba(102, 102, 102, 1);
    }
  }
}
.cell-item {
  background: #fff;
  .label {
    width: 410rpx;
  }
  .ablack {
    color: #333;
    font-weight: bold;
  }
  .ared {
    color: #ff0000;
    font-weight: bold;
  }
  .bom {
    font-size: 24rpx;
    color: rgba(102, 102, 102, 1);
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
