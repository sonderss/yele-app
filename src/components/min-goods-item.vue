<template>
  <view style="background: #fff;">
    <view class="min-goods-item">
      <image :class="[`min-goods-icon-${iconSize}`]" :src="icon"/>
      <image class="min-goods-produced-icon" :class="[`min-goods-icon-${iconSize}`]" v-if="produced" src="/static/images/produced.png"/>
      <view class="min-goods-content" :class="{'min-produced': produced}">
        <view class="min-goods-name">{{name}}</view>
        <view class="min-goods-size" v-show="specification">
          {{specification}}
          <view class="count" v-if="!stepper">x {{count}}</view>
        </view>
        <view class="min-goods-price">￥{{price}}</view>
      </view>
      <view class="min-stepper-weap" v-if="stepper">
        <slot name="stepper" />
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
* iconSize 商品图标大小
* produced 商品是否已出品
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
    specification: {
      type: String,
      default: ''
    },
    iconSize: {
      type: String,
      default: 'medium'
    },
    value: {
      type: Number,
      default: 0
    },
    stepper: {
      type: Boolean,
      default: false
    },
    produced: {
      type: Boolean,
      default: false
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
    &-large {
      height: 180rpx;
      flex: 0 0 180rpx;
      width: 180rpx;
    }
    &-medium {
      height: 140rpx;
      flex: 0 0 140rpx;
      width: 140rpx;
    }
    &-small {
      height: 100rpx;
      flex: 0 0 100rpx;
      width: 100rpx;
    }
  }
  .min-goods-produced-icon{
    position: absolute;
    left: 0;
    top: 0;
  }
  .min-goods-content{
    flex: 1;
    display: block;
    padding-left: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    .min-goods-name{
      font-size: 28rpx;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; 
      word-wrap:break-word;
      word-break:break-all;
    }
    .min-goods-price{
      font-size: 24rpx;
      color: #FF0000;
    }
    .min-goods-size{
      color: #666;
      font-size: 24rpx;
      .count{
        color: #666;
        font-size: 24rpx;
        float: right;
      }
    }
    &.min-produced{
      .min-goods-name,.min-goods-price,.min-goods-size{
        color: #ccc;
        .count{
          color: #ccc;
        }
      }
    }
  }
  .min-stepper-weap{
    position: absolute;
    right: 30rpx;
    bottom: 20rpx;
  }
}
</style>
