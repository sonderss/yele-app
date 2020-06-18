<template>
  <view
    :class="['min-avatar', 'min-avatar-' + shape, 'min-avatar-size-' + size, 'min-avatar-image']">
    <image class="min-avatar-img"
      :src="imgUrl"
      :mode="mode"
      @error="handleError" @load="handleLoad"
    ></image>
  </view>
</template>

<script>
export default {
  name: 'MinAvatar',
  props: {
    shape: {
      type: String,
      default: 'circle'
    },
    size: {
      type: String,
      default: 'xs'
    },
    mode: {
      type: String,
      default: 'aspectFill'
    },
    url: {
      type: String,
      default: ''
    },
    errorUrl: {
      type: String,
      default: '/static/images/goods.png'
    }
  },
  data () {
    return {
      imgUrl: ''
    }
  },
  watch:{
      url(a){
        this.imgUrl = a
      }
  },
  methods: {
    handleError (e) {
      this.imgUrl = this.errorUrl
      this.$emit('error', e)
    },
    handleLoad (e) {
      this.$emit('load', e)
    }
  },
  created () {
    this.imgUrl = this.url
  }
}
</script>

<style lang="scss" scoped>
.min-avatar {
  display: inline-block;
  text-align: center;
  background: cyan;
  color: #ffffff;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  &-image {
    background: transparent;
  }
  &-img {
    width: 100%;
    height: 100%;
  }
  &-circle {
    border-radius: 50%;
  }
  &-square {
    border-radius: 6px;
  }
  &-size-xs {
    width: 80rpx;
    height: 80rpx;
  }
  &-size-sm {
    width: 88rpx;
    height: 88rpx;
  }
  &-size-md {
    width: 100rpx;
    height: 100rpx;
  }
  &-size-nm {
    width: 60rpx;
    height: 60rpx;
  }
}
</style>
