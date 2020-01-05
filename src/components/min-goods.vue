<template>
  <view class="min-goods">
    <view class="min-title p-lr-30">商品分类一</view>
    <view class="min-goods-container">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.min-goods{
  width: 100%;
  .min-title{
    background: #F7F7F7;
  }
  .min-goods-container{
    display: block;
  }
}
</style>
