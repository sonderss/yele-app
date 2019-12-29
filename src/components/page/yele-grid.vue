<template>
  <view class="yele-grid min-flex min-flex-main-start min-flex-wrap-wrap m-lr-30 m-top-20 p-tb-20">
    <view class="grid-item min-flex min-flex-dir-top"
      v-for="item in list" :key="item.name"
    >
      <image class="img" :src="item.img"></image>
      <view class="f24">{{item.text}}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'YeleGrid',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  }

}
</script>

<style lang="scss" scoped>
.yele-grid {
  background: #FFFFFF;
  border-radius: 6px;
  .grid-item {
    padding: 10rpx 0;
    width: 33.33333%;
  }
  .img {
    width: 80rpx;
    height: 80rpx;
  }
}
</style>
