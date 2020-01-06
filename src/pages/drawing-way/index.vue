<template>
  <!-- <view class="drawing-way m-lr-30 p-top-20">
    <min-cell class="m-top-20">
      <min-cell-item
        title="实名认证" tail="点击修改"
        :border="true" arrow
      >
      <image class="icon" slot="icon" src="/static/images/drawing-way/wx.png"/>
      </min-cell-item>
      <min-cell-item
        title="提现方式" tail="未绑定"
        :border="true" arrow
        tailType="red"
      >
      <image class="icon" slot="icon" src="/static/images/drawing-way/alipay.png"/>
      </min-cell-item>
    </min-cell>
  </view> -->

  <view>
    <min-popup :show="checkbox" @close="checkbox = false"/>
    <button @click="checkbox = !checkbox">显示</button>
  </view>
</template>

<script>

export default {
  data () {
    return {
      activeKey: 0,
      checkbox: true,
      count: 0,
      checkboxList: []
    }
  },
  mounted () {
    console.log(this.$cache)
  },
  methods: {
    changeSidebar (value) {
      this.activeKey = value
    }
  }
}
</script>

<style lang="scss" scoped>
.drawing-way{
  .icon{
    width: 44rpx;
    height: 44rpx;
  }
}
.test{
  width: 100%;
  height: 100rpx;
  background: yellow;
}
.goods-list{
  display: flex;
  position: absolute;
  width: 100%;
  top: 100rpx;
  bottom: 100rpx;
  .sidebar-wrap{
    flex-basis: 160rpx;
  }
  .goods-wrap{
    flex-grow: 1;
  }
}
</style>
