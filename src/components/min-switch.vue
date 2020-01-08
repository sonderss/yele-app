<template>
<view class="min-switch p-lr-30 p-tb-20 min-flex min-flex-main-between">
  <text>{{desc}}</text>
  <switch  :checked="value" @change='change' :disabled="disabled" :color="color" style="transform: scale(0.7,0.7)" />
</view>
</template>

<script>
export default {
  props: {
    desc: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#6CD56C'
    }
  },
  methods: {
    change (e) {
      // console.log(e.detail.value)
      this.$emit('change', e.detail.value)
      this.$emit('input', e.detail.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.min-switch{
  height: 98rpx;
  font-size: 28rpx;
  margin: 0;
  padding: 0
}
</style>
