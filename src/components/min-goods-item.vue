<template>
  <view style="background: #fff;">
    <view class="min-goods-item min-border-bottom p-tb-20 p-lr-30">
      <image class="min-goods-icon" :src="icon"/>
      <view class="min-goods-content">
        <view class="min-goods-name">{{name}}</view>
        <view class="min-goods-price">￥{{price}}</view>
      </view>
      <view class="min-stepper-weap">
        <min-stepper v-model="count" @change="changeCount"/>
      </view>
    </view>
  </view>
</template>

<!--
*
* icon 图标链接
* name 名称
* price 价格
* icon 图标链接
* value/v-model 商品数量
*
*  -->
<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    price: {
      type: [String, Number],
      default: 0
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      count: 0
    }
  },
  created () {
    this.count = this.value
  },
  methods: {
    changeCount (value) {
      this.$emit('input', value)
    }
  }
}

</script>

<style lang="scss" scoped>
.min-goods-item{
  display: flex;
  position: relative;
  .min-goods-icon{
    flex-basis: 80rpx;
    height: 80rpx;
  }
  .min-goods-content{
    flex-grow: 1;
    display: block;
    padding-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .min-goods-name{
      font-size: 28rpx;
    }
    .min-goods-price{
      font-size: 24rpx;
      color: #FF0000;
    }
  }
  .min-stepper-weap{
    position: absolute;
    right: 30rpx;
    bottom: 20rpx;
  }
}
</style>
