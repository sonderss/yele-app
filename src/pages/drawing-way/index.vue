<template>
  <view class="drawing-way m-lr-30 p-top-20">
    <min-cell class="m-top-20">
      <min-cell-item
      img="/static/images/drawing-way/alipay.png"
        title="支付宝"
        label='未绑定'
        tail="点击绑定"
        :tailcolor="true"
        tailType='red'
        :border="true" arrow
      >
      </min-cell-item>
      <min-cell-item
      img="/static/images/drawing-way/wx.png"
        title="微信"
        label="3******24254@qq.com"
        :border="true" arrow
        tailType="red"
      >
      </min-cell-item>
    </min-cell>
  </view>
</template>

<script>
export default {
  name: 'drawing-way',
  navigate: ['navigateTo'],
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
