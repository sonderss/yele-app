<template>
  <view class="min-goods">
    <view class="min-title p-lr-30">{{title}}</view>
    <view class="min-goods-container">
      <slot></slot>
    </view>
  </view>
</template>

<!--
*
* title 商品分类标题
*
*  -->
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.min-goods{
  display: block;
  width: 100%;
  .min-title{
    background: #F7F7F7;
  }
  .min-goods-container{
    display: block;
  }
}
</style>
