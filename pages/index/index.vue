<template>
  <view class="index" @touchstart="start" @touchmove="move" @touchend="end">
    <scroll-view
      scroll-y
      :style="{transition: top === 0 ? 'transform 300ms':'',transform: 'translateY('+ top + 'rpx' +')'}"
    >
      <view class="back-img-box">
        <view style="height: 178rpx;"></view>
        <view class="info min-flex min-flex-main-between m-lr-30">
          <view class="min-flex min-flex-main-start">
            <min-avatar size="md" :url="userInfo.head_img"></min-avatar>
            <view class="m-left-20">
              <view class="f30" style="font-weight:bold">{{ userInfo.username }}</view>
              <view class="f24 m-top-20">{{ userInfo.store_name }} | {{ userInfo.position_name }}</view>
            </view>
          </view>
          <view class="min-flex min-flex-main-center" @click="navigateTo('changeStore')" >
            <view class="f24">切换门店</view>
            <view class="right_arrow"></view>
          </view>
        </view>
        <view style="height: 70rpx;"></view>
        <view class="bar m-lr-30 min-flex min-flex-main-start">
          <view class="left" @click="toPlatform('desk')">
            <view class="yele-grid2">
              <view class="left_item">
                <image class="img" src="/static/images/index/bar.png" />
              </view>
              <view>
                <view class="f28">酒台管理</view>
                <view class="f22 assist-text">订台、下单、赠送、开台、存酒</view>
              </view>
            </view>
          </view>
          <view class="right m-left-20" @click="toCwine('confiscate')">
            <view class="yele-grid1">
              <view class="min-flex min-flex-dir-top">
                <image class="img" src="/static/images/index/bar1.png" />
                <view class="f24">充公酒</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <yele-grid :list="grid2" ></yele-grid>
      <yele-grid :list="grid3"></yele-grid>
    </scroll-view>
  </view>
</template>

<script>
import back from "@/static/images/index/back.png";
import MinAvatar from "@/components/min-avatar";
import YeleGrid from "@/components/page/yele-grid";
export default {
  navigate: ["navigateTo", "reLaunch"],
  name: "index",
  components: {
    MinAvatar,
    YeleGrid
  },
  onShow() {
    uni.request({
      url: "http://api.app-store.dev.yeleonline.com/api/5ee8747279279",
      header: {
        "access-token": "HPkSFqbVhWpCRxVRpOTkyEubusFxBEEd",
        "api-auth": this.$store.state.user.userInfo.apiAuth
      },
      success: res => {
        const { code, data, msg } = res.data;
        // 统一处理响应请求，后续完善
        if (code !== 1) {
          uni.showToast({
            title: msg,
            duration: 2000,
            icon: "none"
          });
          // 登录过期
          if (code === 1000011) {
            this.$store.dispatch("user/setUserInfo", {});
            uni.reLaunch({
              url: "/pages/login/index"
            });
          }
          return;
        }
        if (
          this.$store.state.user.userInfo.access.length !==
          res.data.data.permission.length
        ) {
          this.$showToast("权限有变更，请重新登录");
          setTimeout(() => {
            uni.reLaunch({
              url: "../login/index"
            });
          }, 2000);
        }
        if (res.data.data.permission.length === 0) {
          this.$showToast("没有任何权限，请联系管理员");
          setTimeout(() => {
            uni.reLaunch({
              url: "../login/index"
            });
          }, 2000);
        }
      }
    });
  },
  data() {
    return {
      back,
      top: "",
      lastY: "",
      flag: 0,
      testArr:[],
      grid2: [
        {
          url: "../order-record/index.vue",
          name: "order-record",
          img: "/static/images/index/order.png",
          text: "下单记录",
          root: "orderRecord"
        },
        {
          url: "../appointment-record/index.vue",
          name: "appointment-record",
          img: "/static/images/index/station.png",
          text: "订台记录",
          root: "bookRecord"
        },
        {
          url: "../presentation-records/index.vue",
          name: "presentation-records",
          img: "/static/images/index/gift.png",
          text: "赠送记录",
          root: "presentationRecord"
        },
        {
          name: "wine-record",
          url: "../wine-record/index.vue",
          img: "/static/images/index/bar2.png",
          text: "存酒记录",
          root: "saveWineRecord"
        },
        {
          name: "fetch-record",
          url: "../fetch-record/index.vue",
          img: "/static/images/index/take.png",
          text: "取酒记录",
          root: "fetchWineRecord"
        },
        {
          name: "forfeiture-record",
          url: "../forfeiture-record/index.vue",
          img: "/static/images/index/confiscated.png",
          text: "充公记录",
          root: "confiscateRecord"
        },
        {
          img: "/static/images/index/seat.png",
          text: "转台记录",
          name: "turntable-record",
          root: "transferRecord"
        }
      ],
      grid3: [
        {
          name: "my-downline",
          img: "/static/images/index/my_d.png",
          text: "我的下线",
          root: "myOffline"
        },
        {
          img: "/static/images/index/chart.png",
          name: "statistics",
          url: "statistics",
          text: "数据统计",
          root: "statistics"
        },
        {
          name: "my-income",
          img: "/static/images/index/wallet.png",
          text: "我的收入",
          root: "finance",
          url: "my-income"
        },
        {
          url: "../mine-info/index",
          name: "mine-info",
          img: "/static/images/index/people.png",
          text: "个人资料",
          root: "userInfo"
        }
      ]
    };
  },
  computed: {
    userInfo() {
      // 用户信息
      return this.$store.state.user.userInfo;
    }
  },

  methods: {
    navigateTo(root) {
      let result = this.$getRoot(root)
      if(!result) return this.$showToast('抱歉，暂无权限')
      this.$minRouter.push({
        name: "switch-stores",
        type: "navigateTo",
        path: "/pages/switch-stores/index"
      });
    },
    refresh() {
      this.$nextTick(() => {
        this.$refs.pullScroll.refresh();
      });
    },
    toCwine(root) {
       let result = this.$getRoot(root)
      if(!result) return this.$showToast('抱歉，暂无权限')
      this.$minRouter.push({
        name: "confiscated-wine"
      });
    },
    toPlatform(root) {
       let result = this.$getRoot(root)
      if(!result) return this.$showToast('抱歉，暂无权限')
      this.$minRouter.push({
        name: "platform-admin",
        type: "navigateTo",
        path: "/pages/platform-admin/index"
      });
    },
    start(e) {
      this.lastY = e.changedTouches[0].pageY;
    },
    move(e) {
      let currentY = e.changedTouches[0].pageY;
      this.top = currentY - this.lastY;
    },
    end(e) {
      this.top = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.back-img-box {
  width: 100%;
  // height: 490rpx;
  background-size: 100% 436rpx;
  background-position: 0 0;
  background-repeat: no-repeat;

  // margin-top: 200rpx;
  .info {
    view,
    text {
      color: #ffffff;
    }
  }

  .bar {
    justify-content: space-between;
    align-items: center;
    .left {
      background: #fff;
      border-radius: 10rpx;
      flex: 1;
    }

    .right {
      background: #fff;
      border-radius: 10rpx;
      width: 20%;
    }
  }
}

.white-item {
  background: #ffffff;
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
    color: #ffffff;
    font-weight: 700;
  }
}

.index {
  background: #030313;
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 20rpx;
  overflow: hidden;
  background-image: url("/static/images/index/back.png");
  background-position: top center;
  background-size: 100% 490rpx;
  background-repeat: no-repeat;
}

.right_arrow {
  width: 23rpx;
  height: 23rpx;
  background-image: url("../../static/images/right-white-arrow.png");
  background-repeat: no-repeat;
  background-size: cover;
  float: right;
  margin-left: 5rpx;
}

.yele-grid1 {
  display: flex;
  height: 144rpx;
  justify-content: center;
  align-items: center;
  border-radius: 10rpx;
  background: #fff;
}

.yele-grid2 {
  display: flex;
  height: 144rpx;

  align-items: center;
  border-radius: 10rpx;
  background: #fff;

  .left_item {
    width: 150rpx;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10rpx 0;
    padding-left: 50rpx;
    margin-right: 20rpx;
    .img {
      width: 80rpx;
      height: 80rpx;
      display: block;
    }
  }
}
.min-refush {
  width: 100%;
  height: 490rpx;
  background-image: url("/static/images/index/back.png");
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
}
.oswiper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.oitem {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
