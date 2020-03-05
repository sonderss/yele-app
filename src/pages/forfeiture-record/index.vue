<template>
  <view class="forfeiture-record p-tb-20 p-lr-30" >
    <view class="card p-lr-20 m-bottom-20">
      <view class="top p-tb-30 min-border-bottom">
        <view>单号：125254478524774</view>
        <view class="status confirmed">待确认</view>
      </view>
      <view class="main p-top-20">
        <view class="item">伯世富VSOP*750ml*2010年/瓶*2</view>
        <view class="item">伯世富VSOP*750ml*2010年/瓶*2</view>
        <view class="item">伯世富VSOP*750ml*2010年/瓶*2</view>
      </view>
      <view class="timer min-top-border">2019-12-10  12:35:65</view>
    </view>
    <view class="card p-lr-20 m-bottom-20">
      <view class="top p-tb-30 min-border-bottom">
        <view>单号：125254478524774</view>
        <view class="status end">已确认</view>
      </view>
      <view :class="isMore ? 'main p-top-20': 'main1 p-top-20'">
        <view class="item">伯世富VSOP*750ml*2010年/瓶*2</view>
        <view class="item">伯世富VSOP*750ml*2010年/瓶*2</view>
        <view class="item">伯世富VSOP*750ml*2010年/瓶*2</view>
        <view class="item">伯世富VSOP*750ml*2010年/瓶*2</view>
        <view class="item">伯世富VSOP*750ml*2010年/瓶*2</view>
        <view class="item">伯世富VSOP*750ml*2010年/瓶*2</view>
        <view class="item">伯世富VSOP*750ml*2010年/瓶*2</view>
        <view class="item">伯世富VSOP*750ml*2010年/瓶*2</view>
      </view>
      <view class="over-view" @click="showMore">
          {{txt ? '展开更多' : '收起'}}<text :class="isMore ? ' f22 botm' : ' f22 botm1'"></text>
      </view>
      <view class="timer min-top-border">2019-12-10  12:35:65</view>
    </view>

  </view>
</template>

<script>
import uni from '../../api/a'
export default {
  mounted () {
    // const option = {
    //   url: '5e424f7f8c0c0?page=1&limit=20',
    //   accesstoken: 'HPkSFqbVhWpCRxVRpOTkyEubusFxBEEd'
    // }

    // uni.uniapp(option).then(res => {
    //   console.log(res)
    // })
    this.test()
      .then(res => {
        console.log(res)
      })
  },
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
    },
    test () {
      const option = {
        url: '5e424f7f8c0c0?page=1&limit=20',
        accesstoken: 'HPkSFqbVhWpCRxVRpOTkyEubusFxBEEd'
      }
      return new Promise((resolve, reject) => {
        uni.uniapp(option).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
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
    }
    .main1{
      height: 180rpx;
      overflow: hidden;
      .item{
        margin-top: 20rpx;
        font-size: 28rpx;
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
      color: #666666
    }
  }
}

</style>
