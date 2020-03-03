<template>
  <view class="min-show-order">
    <min-cell>
      <view class="f30 p-tb-25">{{list.title}}</view>
      <view class="min-border-bottom m-bottom-20" style="height:1rpx"></view>
      <view class="main min-flex min-flex-dir-top min-flex-align-top f28 p-bottom-30">
        <text class="m-bottom-10" v-for="(item,index) in list.content" :key="index">{{item.name}}：{{item.value}}</text>
      </view>
    </min-cell>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: [Object, Array],
      default: () => []
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
