<template>
  <view class="release-record p-lr-30 p-tb-20">
     <view class="top_view">
        <view class="top" >
        <text>发放合计$50</text>
      </view>
    </view>

      <view
        v-for="index in 2"
        :key="index"
        class="cell-item min-flex min-flex-main-between p-tb-30 p-lr-20 min-border-bottom"
        @click="toDeatil(index)"
      >
        <view class="min-flex">
          <view class style="width:300rpx">
            <view class="f28">2月份到3月份工资</view>
            <view class="label m-top-10 f24 assist-text min-ellipsis">2019-06-01  16:32:00</view>
          </view>
        </view>
        <view class="min-flex flex-end min-flex-dir-top">
          <view class="green">100元</view>
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
  name: 'release-record',
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
        name: 'release-details'
      })
    },
    closedrawer () {
      this.showdrawer = false
    }
  }
}
</script>
<style lang="scss" scoped>
.top_view {
  width: 100%;
  margin-bottom: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
 .top {
    width: 100%;
    height: 35rpx;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    text {
      margin: 0 5rpx;
      display: block;
      color: #666;
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
  .green{
    color: green;
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
