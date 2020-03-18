<template>
  <view class="idle platform-detail">
    <view class="card p-lr-20 m-bottom-20">
        <view class="p-tb-30 min-border-bottom">基本信息</view>
        <view class="main p-tb-20">
          <view class="status">空闲中</view>
          <view>
            台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<text class="emp">K112</text>
          </view>
          <view>
            分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：卡座
          </view>
          <view>
            低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：￥500
          </view>
          <view>
            座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：4座
          </view>
          <view>
            开台条件：6成低消（￥600）
          </view>
        </view>
    </view>
    <view class="btns-confirmed">
      <min-btn @click="book">预约</min-btn>
      <min-btn type="white" @click="startOrder">开台</min-btn>
      <min-btn type="white">存酒</min-btn>
      <min-btn type="white" @click="stopUse">停用</min-btn>
      <min-btn type="white" @click="goGetHistory">历史</min-btn>
    </view>
    <min-modal ref='show'></min-modal>
  </view>
</template>

<script>
export default {
  // 空闲中
  props: {
    idNum: Number
  },
  methods: {
    goGetHistory () {
      this.$minRouter.push({
        name: 'platform-history',
        params: { id: this.idNum }
      })
    },
    // 预约
    book () {
      this.$minRouter.push({
        name: 'order-make',
        params: { id: this.idNum }
      })
    },
    // 开台
    startOrder () {
      this.$minRouter.push({
        name: 'start-stage'
      })
    },
    // 停用
    stopUse () {
      this.$refs.show.handleShow({
        title: '确认推出',
        content: '退出后就回不来了',
        contentCenter: true,
        cancelText: '点错了',
        confirmText: '停用',
        confirmColor: 'red',
        cancelColor: '#0090ff',
        success: (e) => {
          console.log(e) // 这里拿到的是modalID: "modal"，id: 1
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
