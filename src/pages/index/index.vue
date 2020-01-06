
<template>
  <view class="index">
    <view class="back-img-box" :style="{'background-image': `url(${back})`}">
      <view style="height: 178rpx;"></view>
      <view class="info min-flex min-flex-main-between m-lr-30">
        <view class="min-flex min-flex-main-start">
          <min-avatar size="md" url="http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg"></min-avatar>
          <view class="m-left-20">
            <view class="f28">夜色科技</view>
            <view class="f22 m-top-20">SINMBA  |  服务员</view>
          </view>
        </view>
        <view class="min-flex min-flex-main-center">
          <view class="f22">切换门店</view>
          <view class="right_arrow"></view>
        </view>
      </view>
      <view style="height: 70rpx;"></view>
      <view class="bar white-item m-lr-30 min-flex min-flex-main-start">
        <image class="img m-right-30" src="/static/images/index/bar.png"></image>
        <view>
          <view class="f28">酒台管理</view>
          <view class="f22 assist-text">订台、下单、赠送、开台、存酒</view>
        </view>
      </view>
    </view>

    <view class="activity min-flex min-flex-main-between m-lr-30">
      <view class="activity-item min-flex">
        <image class="bimg" src="/static/images/index/back1.png"></image>
        <view class="word">敬请期待</view>
      </view>
      <view class="activity-item min-flex">
        <image class="bimg" src="/static/images/index/back2.png"></image>
        <view class="word">敬请期待</view>
      </view>
    </view>

    <yele-grid :list="grid1"></yele-grid>
    <yele-grid :list="grid2"></yele-grid>
    <yele-grid :list="grid3"></yele-grid>
  </view>
</template>

<script>
import back from '@/static/images/back.png'
import MinAvatar from '@/components/min-avatar'
import YeleGrid from '@/components/page/yele-grid'
export default {
  components: {
    MinAvatar,
    YeleGrid
  },
  data () {
    return {
      back: '',
      grid1: [{
        img: '/static/images/index/bar1.png',
        text: '充公酒'
      }, {
        img: '/static/images/index/menu.png',
        text: '菜单'
      }],
      grid2: [{
        img: '/static/images/index/order.png',
        text: '下单记录'
      }, {
        img: '/static/images/index/station.png',
        text: '订台记录'
      }, {
        img: '/static/images/index/gift.png',
        text: '赠送记录'
      }, {
        img: '/static/images/index/bar2.png',
        text: '存酒记录'
      }, {
        img: '/static/images/index/take.png',
        text: '取酒记录'
      }, {
        img: '/static/images/index/confiscated.png',
        text: '充公记录'
      }],
      grid3: [{
        img: '/static/images/index/wallet.png',
        text: '我的钱包'
      }, {
        img: '/static/images/index/chart.png',
        text: '数据统计'
      }, {
        img: '/static/images/index/people.png',
        text: '个人资料'
      }]
    }
  },
  methods: {

  },
  onLoad () {
    this.back = back
  }
}
</script>

<style lang="scss" scoped>
.back-img-box {
  width: 100%;
  height: 506rpx;
  background-size: 100% 436rpx;
  background-position: 0 0;
  background-repeat: no-repeat;
  .info {
    view, text {
      color: #FFFFFF;
    }
  }
  .bar {
    padding: 28rpx 30rpx 36rpx 30rpx;
  }
}
.white-item {
  background: #FFFFFF;
  border-radius: 6px;
}
.img {
  width: 80rpx;
  height: 80rpx;
}
.activity-item {
  position: relative;
  width: 330rpx;
  height: 158rpx;
  .bimg {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
  .word {
    position: relative;
    z-index: 2;
    font-size: 50rpx;
    color: #FFFFFF;
    font-weight: 700;
  }
}
.index {
  background: #030313;
  width: 100vw;
  min-height: 100vh;
}
.right_arrow{
  width: 23rpx;
  height: 23rpx;
  background-image: url('../../static/images/right-white-arrow.png');
  background-repeat: no-repeat;
  background-size: cover;
  float: right;
  margin-left: 5rpx;
}
</style>
