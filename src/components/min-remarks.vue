<template>
  <view class="min-remarks">
        <view class="reason-wrap m-top-20 p-lr-20 p-tb-20">
        <view class="p-bottom-30">{{title}}</view>
        <textarea
          class="reason"
          :placeholder="placeholder"
          placeholder-style="font-size:28rpx"
          @input='input'
        />
      </view>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '备注'
    },
    placeholder: {
      type: String,
      default: '请输入备注信息...'
    }
  },
  methods: {
    input (e) {
      this.$emit('input', e.detail.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.reason-wrap{
  background: #fff;
  border-radius:10rpx;
  .reason{
    width: 100%;
    height: 200rpx;
    background:#f7f7f7;
    padding: 20rpx;
    border-radius:10rpx;
    box-sizing: border-box;
  }
}
</style>
