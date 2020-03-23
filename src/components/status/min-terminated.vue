<template>
  <view class="platform-detail">
    <view class="card p-lr-20 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">基本信息</view>
      <view class="main p-tb-20">
        <view class="status">已停用</view>
        <view>
          台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：
          <text class="emp">K112</text>
        </view>
        <view>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：卡座</view>
        <view>低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：￥500</view>
        <view>座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：4座</view>
        <view>开台条件：6成低消（￥600）</view>
      </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">操作信息</view>
      <view class="main p-tb-20">
        <view>营销人员：刘清清</view>
        <view>预抵时间：2020年02月15日 16:20:00</view>
      </view>
    </view>
    <view class="btns-confirmed">
      <min-btn class="btn" @click="start_use">启用</min-btn>
      <min-btn type="white" class="btn">存酒</min-btn>
      <min-btn type="white" @click="goGetHistory" class="btn">历史</min-btn>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    idNum: Number
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    goGetHistory () {
      this.$minRouter.push({
        name: 'platform-history',
        params: { id: this.idNum }
      })
    },
    start_use () {
      this.$minApi.startUse({ id: this.idNum })
        .then(res => {
          console.log(res)
          if (res.length === 0) {
            this.$showToast('启用成功')
          }
        })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss'
</style>
