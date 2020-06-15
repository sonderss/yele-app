<template>
  <view class="cell-item min-flex min-flex-main-between bg-white p-tb-30"
    :class="[border ? 'min-border-bottom' : '',mtb ? 'm-tb-20':'',plr ? 'p-lr-30':'',bradius ? 'b-radius':'']"
    @click="event"
  >
    <view class="min-flex">
      <slot name="icon"></slot>
      <view v-if="img">
        <min-avatar :size="imgSize" :url="img"></min-avatar>
      </view>
      <view class="m-left-20" :style="isWidth ? 'width:400rpx' :''">
        <view class="f28">{{title}}<text v-if="title_right" class="desc_">{{title_right}}</text></view>
        <view :style="isWidth ? 'label' :''" class=" m-top-10 f24 assist-text min-ellipsis">{{label}}</view>
      </view>
    </view>
    <view class="min-flex flex-end">
      <view class="f28 tail" style="width:auto" v-if="tail" :class="[ tailcolor  ? `tail-${tailType}` : '']">{{tail}}</view>
      <slot name="tail"></slot>
      <image v-if="arrow" class="arrow" src="/static/images/arrow.png"></image>
      <image v-if="tail === '可预约' " class="arrow" src="/static/images/arrow.png"></image>
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
    tailcolor: {
      type: Boolean,
      default: false
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
    },
    title_right: {
      type: String,
      default: ''
    },
    mtb: {
      type: Boolean,
      default: false
    },
    plr:{
      type:Boolean,
      default:false
    },
    bradius:{
      type:Boolean,
      default:false
    },
    isWidth:{
      type:Boolean,
      default:true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    event () {
      this.$emit('eventParent')
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
    &-blue {
      color: #0090ff;
    }
  }
  .arrow {
    width: 24rpx;
    height: 24rpx;
    align-items: center;
  }
  .desc_{
    width:86rpx;height:26rpx;background:rgba(255,241,0,1);border-radius:4rpx;font-size: 16rpx;margin-left: 15rpx;padding: 5rpx;
  }
}
.b-radius{
  border-radius: 10rpx;
}
</style>
