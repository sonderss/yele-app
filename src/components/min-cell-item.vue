<template>
  <view class="cell-item min-flex min-flex-main-between bg-white p-tb-30"
    :class="[border ? 'min-border-bottom' : '']"
  >
    <view class="min-flex">
      <view v-if="img">
        <min-avatar :url="img"></min-avatar>
      </view>
      <view class="m-left-20">
        <view class="f30">{{title}}</view>
        <view class="label f24 assist-text min-ellipsis">{{label}}</view>
      </view>
    </view>
    <view class="f28" v-if="tail">{{tail}}</view>
    <slot name="tail"></slot>
    <image v-if="arrow" class="arrow" src="/static/images/arrow.png"></image>
  </view>
</template>

<script>
import MinAvatar from '@/components/min-avatar'
export default {
  name: 'MinCellItem',
  components: {
    MinAvatar
  },
  props: {
    img: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    tail: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  }

}
</script>

<style lang="scss" scoped>
.cell-item {
  .label {
    width: 410rpx;
  }
  .arrow {
    width: 24rpx;
    height: 24rpx;
  }
}
</style>
