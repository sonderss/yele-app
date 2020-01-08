<template>
  <view class="cell-item min-flex min-flex-main-between bg-white p-tb-30"
    :class="[border ? 'min-border-bottom' : '']"
  >
    <view class="min-flex">
      <view v-if="img">
        <min-avatar :size="imgSize" :url="img"></min-avatar>
      </view>
      <slot name="icon"></slot>
      <view class="m-left-20">
        <view class="f28">{{title}}</view>
        <view class="label m-top-10 f24 assist-text min-ellipsis">{{label}}</view>
      </view>
    </view>
    <view class="min-flex flex-end">
      <view class="f28 tail" v-if="tail" :class="[`tail-${tailType}`]">{{tail}}</view>
      <slot name="tail"></slot>
      <image v-if="arrow" class="arrow" src="/static/images/arrow.png"></image>
    </view>
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
    imgSize: {
      type: String,
      default: 'xs'
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
    tailType: {
      type: String,
      default: 'gray'
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
  .tail{
    padding-right: 14rpx;
    &-gray {
      color: #666;
    }
    &-black {
      color: #333;
    }
    &-green {
      color: #39BA01;
    }
    &-red {
      color: #FF0000;
    }
  }
  .arrow {
    width: 24rpx;
    height: 24rpx;
    align-items: center;
  }
}
</style>
