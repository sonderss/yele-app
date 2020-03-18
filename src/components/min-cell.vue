<template>
  <view class="bg-white radius-6 p-lr-20"
    :class="[card ? 'min-card' : '']"
  >
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: 'MInCell',
  props: {
    card: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
