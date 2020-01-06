<template>
  <view class="min-card min-border">
    <slot name="header" class="header"/>
    <slot/>
    <slot name="footer"/>
  </view>
</template>

<script>
export default {
}

</script>

<style lang="scss" scoped>
.min-card{
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>
