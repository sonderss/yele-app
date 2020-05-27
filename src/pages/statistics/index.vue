<template>
  <view class="statistics p-lr-20 p-top-20">
    <view class="shuju">
      <view class="top-view">
        <view class="p-lr-20 p-tb-20 timer">
          <text>实时数据</text>
          <text>{{data_list.current_time}} 更新时间</text>
        </view>
        <view class="t-view">
          <text class="price f28">今日实收</text>
          <view class="money">
            <view class="money_view">
              <text class="icon">￥</text>
              <text class="tr">{{data_list.business_volume}}</text>
            </view>
          </view>
        </view>
        <view class="b-view">
          <view class="left-view">
            <text class="f24">实收</text>
            <text class="c m-top-10">{{data_list.actual_total}}</text>
          </view>
          <view class="right-view">
            <text class="f24">开台率</text>
            <text class="c m-top-10">{{data_list.opening_rate}}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="table">
      <view
        class="item"
        @click="toDeatil(index)"
        :style="{backgroundImage:`url(/static/images/data/0${index}.png)`}"
        v-for="(i,index) in list"
        :key="i"
      >
        <text class="f26">{{i}}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'statistics-index',
  navigate: ['navigateTo'],
  data () {
    return {
      list: ['营业统计', '桌台统计', '营销统计', '销售统计', '商品统计', '其他'],
      data_list: {}
    }
  },
  mounted () {
    this.$minApi.getDataTJ().then(res => {
      console.log(res)
      this.data_list = res
    })
  },
  methods: {
    toDeatil (index) {
      console.log(index)

      uni.navigateTo({
        url: './detail?type=' + index
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.shuju {
  .top-view {
    width: 100%;
    height: 482rpx;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10rpx;
    overflow: hidden;
    box-shadow: 0rpx 3rpx 10rpx 0rpx rgba(0, 0, 0, 0.2);
    .timer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text {
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 28rpx;
      }
    }
    .t-view {
      height: 234rpx;
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
        margin-bottom: 30rpx;
        padding-top: 30rpx;
      }
      .money {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 20rpx;
        .money_view {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .tr {
          display: block;
          font-size: 84rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #030313;
        }
        .icon {
          display: block;
          font-size: 48rpx;
          color: #030313;
        }
      }
    }
    .b-view {
      height: 156rpx;
      background: #fff;
      border-radius: 0px 0px 10rpx 10rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1rpx solid #e7e7e7;
      text {
        color: #fff;
        color: rgba(204, 204, 204, 1);
      }
      .c {
        color: #24272b;
        font-size: 40rpx;
        font-weight: 500;
      }
      .left-view {
        width: 50%;
        height: 122rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-right: 1rpx solid #e7e7e7;
      }
      .right-view {
        width: 50%;
        height: 122rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
    }
  }
}
.table {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .item {
    width: 320rpx;
    height: 224rpx;
    margin: 30rpx 0;
    background-size: cover;
    padding: 42rpx 0 0 32rpx;
    text {
      color: #fff;
      font-weight: 500;
    }
  }
}
</style>
