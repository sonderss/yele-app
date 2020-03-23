<template>
  <view class="forfeiture-record p-tb-20 p-lr-30" >
    <view class="card p-lr-20 m-bottom-20">
      <view class="top p-tb-30 min-border-bottom">
        <view class="ordern">K1125</view>
        <view class="status confirmed">顾客：李大忙</view>
      </view>
      <view class="main p-tb-20 min-border-bottom">
        <view class="item">
           <text >伯世富VSOP*750ml*2010年/瓶*2</text>
            <text >￥66</text>
        </view>
      </view>
      <view class="timer">
        <text>2019-12-10  12:35:65</text>
        <text class="bfont">合计：￥600.00</text>
      </view>
    </view>
    <view class="card p-lr-20 m-bottom-20">
      <view class="top p-tb-30 min-border-bottom">
        <view class="ordern">K1125</view>
        <view class="status end">已确认</view>
      </view>
      <view :class="isMore ? 'main p-top-20 ': 'main1 p-top-20 ' ">
        <view class="item">
           <text >伯世富VSOP*750ml*2010年/瓶*2</text>
            <text>￥66</text>
        </view>
        <view class="item">
           <text>伯世富VSOP*750ml*2010年/瓶*2</text>
            <text>￥66</text>
        </view>
        <view class="item">
           <text>伯世富VSOP*750ml*2010年/瓶*2</text>
            <text>￥66</text>
        </view>
        <view class="item">
           <text >伯世富VSOP*750ml*2010年/瓶*2</text>
            <text >￥66</text>
        </view>
        <view class="item">
           <text>伯世富VSOP*750ml*2010年/瓶*2</text>
            <text>￥66</text>
        </view>
      </view>
      <view class="over-view min-border-bottom p-tb-20" @click="showMore">
          {{txt ? '展开更多' : '收起'}}<text :class="isMore ? ' f22 botm' : ' f22 botm1'"></text>
      </view>
      <view class="timer ">
        <text>2019-12-10  12:35:65</text>
        <text class="bfont">合计：￥600.00</text>
      </view>
    </view>

  </view>
</template>

<script>
export default {
  name: 'presentation-records',
  navigate: ['navigateTo'],
  data () {
    return {
      isMore: false,
      txt: true
    }
  },
  methods: {
    showMore () {
      this.isMore = !this.isMore
      this.txt = !this.txt
    }
  }
}
</script>
<style lang="scss" scoped>
@font-face {
  font-family: test;
  src: url('../../static/font/test.ttf');
}
.forfeiture-record{
  .card{
    background: #fff;
    border-radius: 10rpx;
    .top{
      display: flex;
      justify-content: space-between;
      .ordern{
        font-weight: bold
      }
    }
    .main1{
      height: 180rpx;
      overflow: hidden;
      .item{
        margin-top: 20rpx;
        font-size: 28rpx;
        display: flex;
        justify-content: space-between;
        &:first-child{
          margin: 0;
        }
      }
    }
    .over-view{
        width: 100%;
        height: 50rpx;
        font-size: 22rpx;
        color: #666666;
        display: flex;
        justify-content: center;
        align-items: center;
        .botm1::before{
          font: normal normal normal 14upx/1 test;
          content: "\e646";
          font-size: 28upx;
          color: #666;
        }
        .botm:before{
          font: normal normal normal 14upx/1 test;
          content: "\e642";
          font-size: 28upx;
          color: #666
        }
      }
    .main{
      .item{
        margin-top: 20rpx;
        font-size: 28rpx;
        display: flex;
         justify-content: space-between;
        &:first-child{
          margin: 0;
        }
      }
    }
    .status{
      font-size: 26rpx;
      &.confirmed{
        color: #FF0101
      }
      &.end{
        color: #39BA01
      }
      &.force{
        color: #0090FF
      }
      &.expired{
        color: #666666
      }
    }
    .timer{
      width: 100%;
      height: 76rpx;
      line-height: 76rpx;
      font-size: 24rpx;
      color: #666666;
      display: flex;
      justify-content: space-between;
      .bfont{
        font-weight: bold
      }
    }
  }
}

</style>
