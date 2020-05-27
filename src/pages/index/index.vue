
<template>
  <view class="index">
    <view class="back-img-box" :style="{'background-image': `url(${back})`}">
      <view style="height: 178rpx;"></view>
      <view class="info min-flex min-flex-main-between m-lr-30">
        <view class="min-flex min-flex-main-start">
          <min-avatar size="md" :url="userInfo.head_img"></min-avatar>
          <view class="m-left-20">
            <view class="f30" style="font-weight:bold">{{ userInfo.username }}</view>
            <view class="f24 m-top-20">{{ userInfo.store_name }}  |  {{ userInfo.position_name }}</view>
          </view>
        </view>
        <view class="min-flex min-flex-main-center" @click="navigateTo">
          <view class="f24">切换门店</view>
          <view class="right_arrow"></view>
        </view>
      </view>
      <view style="height: 70rpx;"></view>
      <view class="bar white-item m-lr-30 min-flex min-flex-main-start" @click="toPlatform">
        <image class="img m-right-30" src="/static/images/index/bar.png"></image>
        <view>
          <view class="f28">酒台管理</view>
          <view class="f22 assist-text">订台、下单、赠送、开台、存酒</view>
        </view>
      </view>
    </view>

    <view class="activity min-flex min-flex-main-between m-lr-30">
      <view class="activity-item min-flex" >
        <image class="bimg" src="/static/images/index/back1.png"></image>
        <view class="word">敬请期待</view>
      </view>
      <view class="activity-item min-flex" @click="goListPages">
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
  navigate: ['navigateTo', 'reLaunch'],
  name: 'index',
  components: {
    MinAvatar,
    YeleGrid
  },
  data () {
    return {
      back: '',
      grid1: [{
        url: '../confiscated-wine/index.vue',
        img: '/static/images/index/bar1.png',
        text: '充公酒',
        name: 'confiscated-wine'

      }
        // {
      //   url: '../page.vue',
      //   img: '/static/images/index/menu.png',
      //   text: '列表页',
      //   name: 'pages-page'
      // }
      // {
      //   url: '../electronic-menu/index.vue',
      //   img: '/static/images/index/menu.png',
      //   text: '菜单',
      //   name: 'electronic-menu'
      // }
      ],
      grid2: [{
        url: '../order-record/index.vue',
        name: 'order-record',
        img: '/static/images/index/order.png',
        text: '下单记录'
      }, {
        url: '../appointment-record/index.vue',
        name: 'appointment-record',
        img: '/static/images/index/station.png',
        text: '订台记录'
      }, {
        url: '../presentation-records/index.vue',
        name: 'presentation-records',
        img: '/static/images/index/gift.png',
        text: '赠送记录'
      }, {
        name: 'wine-record',
        url: '../wine-record/index.vue',
        img: '/static/images/index/bar2.png',
        text: '存酒记录'
      }, {
        name: 'fetch-record',
        url: '../fetch-record/index.vue',
        img: '/static/images/index/take.png',
        text: '取酒记录'
      }, {
        name: 'forfeiture-record',
        url: '../forfeiture-record/index.vue',
        img: '/static/images/index/confiscated.png',
        text: '充公记录'
      }],
      grid3: [{
        name: 'my-income',
        img: '/static/images/index/wallet.png',
        text: '我的钱包',
        url: 'my-income'
      }, {
        img: '/static/images/index/chart.png',
        name: 'statistics',
        url: 'statistics',
        text: '数据统计'
      }, {
        url: '../mine-info/index',
        name: 'mine-info',
        img: '/static/images/index/people.png',
        text: '个人资料'
      }, {
        name: 'my-downline',
        img: '/static/images/index/my_d.png',
        text: '我的下线'
      }]
    }
  },
  computed: {
    userInfo () { // 用户信息
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    navigateTo () {
      this.$minRouter.push({
        name: 'switch-stores',
        type: 'navigateTo',
        path: '/pages/switch-stores/index'
      })
    },
    toPlatform () {
      this.$minRouter.push({
        name: 'platform-admin',
        type: 'navigateTo',
        path: '/pages/platform-admin/index'
      })
    },
    goListPages () {
      uni.navigateTo({
        url: '../page'
      })
    }
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
    font-size: 45rpx;
    color: #FFFFFF;
    font-weight: 700;
  }
}
.index {
  background: #030313;
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 20rpx;
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
