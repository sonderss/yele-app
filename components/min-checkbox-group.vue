<template>
  <view class="min-checkbox-group">
    <slot/>
  </view>
</template>

<!--
*
* value/v-model  绑定的值或匹配的值
*
*  -->
<script>
export default {
  props: {
    value: {
      type: [Array],
      default: () => []
    }
  }
}

</script>

<style lang="scss" scoped>
.min-checkbox-group{}
</style>
