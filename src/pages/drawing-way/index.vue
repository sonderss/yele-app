<template>
  <view class="drawing-way m-lr-30 p-top-20">
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
  </view>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
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
</style>
