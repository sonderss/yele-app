<template>
  <view class="order-make p-lr-30 p-tb-20">
    <min-cell class="top-view" :card="false">
      <view class="top-title-view min-flex min-flex-main-between">
        <text class="f34 left-title">K112</text>
        <view class="min-flex min-flex-align-center min-flex-main-center">
          <min-avatar size="nm" url="../../static/images/headurl60.png"></min-avatar>
          <text class="f28 p-left-20">SIMBA</text>
        </view>
      </view>
      <view class="min-border-bottom"></view>
      <view class="main-view min-flex min-flex-dir-top min-flex-align-top">
        <view class="m-top-30 m-bottom-10">分&nbsp;&nbsp;&nbsp;&nbsp;组：卡座</view>
        <view class="m-bottom-10">低&nbsp;&nbsp;&nbsp;&nbsp;消：￥200</view>
        <view class="m-bottom-30">座&nbsp;&nbsp;&nbsp;&nbsp;位：4座</view>
      </view>
    </min-cell>
    <view class="m-tb-20"></view>
    <min-cell class="mid-view" :card="false">
      <min-desc-input desc="客户姓名" v-model="name" sign="*" placeholder="请输入姓名" ></min-desc-input>
      <min-desc-input desc="联系电话" v-model="phone" sign="*" placeholder="请输入联系电话"></min-desc-input>
      <!-- <view class="min-flex min-flex-main-between f28 min-border-bottom" > -->
        <min-desc-input sign="*" desc="预约时间" :isRightRrrow="true"   placeholder="请选择预约日期" :disabled="true"></min-desc-input>
        <!-- <img class="right-arrow p-left-10" src="../../static/images/arrow.png" /> -->
      <!-- </view> -->
      <!-- <view class="min-flex min-flex-main-between f28">
        <min-desc-input desc="预抵时间" sign="*"  :border="false" :value='shopDate' placeholder="请选择到店日期" :disabled="true"></min-desc-input>
        <img class="right-arrow p-left-10" src="../../static/images/downarrow24.png" />
      </view> -->
      <!-- <view class="chioce-date">
        <view
          class="m-bottom-20 m-right-20"
          :class="current === n ? 'chioce-date-item-active' : 'chioce-date-item'"
          v-for="(i,n) in date"
          :key="n"
          @click="chioce(n)"
        >{{i}}</view>
      </view> -->
       <min-collapse :list="date"  v-model="tsetvalue" ></min-collapse>
      <!-- <text class="m-bottom-20" style="display:block">凌晨</text>
      <view class="chioce-date">
        <view
          class="m-bottom-20 m-right-20"
          v-for="(i,n) in date"
          :key="n"
          :class="nextCurrent === n ? 'chioce-date-item-active' : 'chioce-date-item'"
          @click="chioceNext(n)"
        >{{i}}</view>
      </view> -->
      <view class="min-border-bottom"></view>
      <min-switch desc="是否当天生日" v-model="isShengri" ></min-switch>
    </min-cell>
    <view class="m-tb-20"></view>
    <min-remarks  v-model='value' @click="click" @blur="blur"></min-remarks>
    <view class="empty-view"></view>
    <view class="btn" v-if="table">
      <min-btn :long="true" @click="submit" :opacity='false' >提交</min-btn>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      date: ['8:00', '23:00', '9:00', '20:00', '20:00', '20:00', '20:00'],
      current: Number,
      // nextCurrent: Number,
      isShengri: false,
      name: '',
      phone: '',
      value: '',
      shopDate: '',
      tsetvalue: '',
      windowHeight: '',
      table: true,
      url: 'wss://api.store.dev.yeleonline.com:20021',
      socketOpen: false,
      socketMsgQueue: []
    }
  },
  onLoad () {
    uni.getSystemInfo({
      // eslint-disable-next-line no-irregular-whitespace
      success: (res) => {
        this.windowHeight = res.windowHeight
      }
    })
    uni.onWindowResize((res) => {
      if (res.size.windowHeight < this.windowHeight) {
        this.table = false
      } else {
        this.table = true
      }
    })
  },
  onShow () {
    // 连接
    uni.connectSocket({
      url: this.url
    })
    // 打开
    uni.onSocketOpen((res) => {
      console.log('WebSocket 已开启！')

      this.socketOpen = true

      this.sendSocketMessage()

      // console.log(this.socketMsgQueue)
      this.socketMsgQueue = []
      uni.closeSocket()
    })
    // 连接失败
    uni.onSocketError((res) => {
      console.log('WebSocket连接打开失败，请检查！')
    })
    // 接收服务端信息
    uni.onSocketMessage((res) => {
      console.log('收到服务器内容：' + res.data)
    })
    // 监听socket关闭
    uni.onSocketClose((res) => {
      console.log('WebSocket 已关闭！')
    })
  },
  mounted () {},
  methods: {
    // 向服务端发送信息
    sendSocketMessage (msg) {
      console.log('正在发送')
      var obj = { apiAuth: '123456', clientType: 'store_app' }
      obj = JSON.stringify(obj)
      console.log(obj)
      if (this.socketOpen) {
        uni.sendSocketMessage({
          data: obj,
          success: res => {
            console.log(res)
          }
        })
      } else {
        // this.socketMsgQueue.push(msg)
        console.log('发送失败')
      }
    },
    chioce (n) {
      // console.log(n)
      this.current = n
      this.nextCurrent = null
      this.shopDate = this.date[n]
    },
    // chioceNext (n) {
    //   this.nextCurrent = n
    //   this.current = null
    //   this.shopDate = this.date[n]
    // },
    submit () {
      // console.log(this.value)
      // console.log(this.isShengri)
      // const path = {
      //   path: '/pages/platform-history/index',
      //   type: 'navigateTo',
      //   params: { abc: '123' }
      // }
      // console.log(this.$minRouter)
      // this.$router.push(path)
      // this.$minRouter.beforeEach((to, from, next) => {
      //   // this.$router.push(path)
      //   console.log(123)
      //   next(true)
      // })
      // console.log(this.name, this.phone, this.tsetvalue)
    },
    click () {
      this.table = false
    },
    blur () {
      console.log(this.table)
      this.table = true
    }
  }
}
</script>

<style lang="scss" scoped>
.order-make {
  .top-view {
    width: 690rpx;
    height: 286rpx;
    .top-title-view {
      height: 86rpx;
      .left-title {
        color: #ff0000;
      }
    }
    .main-view {
      background: #f0f0;
    }
  }
  .mid-view {
    width: 690rpx;
    height: auto;
  }
  .oinput {
    text-align: right;
    line-height: 98rpx;
  }
  .ophone {
    padding-right: 34rpx;
  }
  .right-arrow {
    width: 24rpx;
    height: 24rpx;
    padding-top: 5rpx;
  }
  .desc-width {
    width: 200rpx;
  }
  .chioce-date {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    .chioce-date-item {
      width: 112rpx;
      height: 58rpx;
      border: 1rpx solid #e7e7e7;
      border-radius: 10rpx;
      font-size: 28rpx;
      text-align: center;
      line-height: 58rpx;
    }
    .chioce-date-item-active {
      width: 112rpx;
      height: 58rpx;
      background: rgba(255, 224, 1, 1);
      border-radius: 10rpx;
      font-size: 28rpx;
      text-align: center;
      line-height: 58rpx;
    }
    .chioce-date-item:nth-child(5n) {
      margin: 0;
    }
    .chioce-date-item-active:nth-child(5n) {
      margin: 0;
    }
  }
  position: relative;
}
.btn {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
.empty-view {
  height: 240rpx;
}
</style>
