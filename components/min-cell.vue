<template>
  <view class="bg-white radius-6 p-lr-20"
    :class="[card ? 'min-card' : '']"
    @click="toEvent"
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
  },
  methods: {
    toEvent(){
      this.$emit('click')
    }
  },
}
</script>

<style lang="scss" scoped>
.min-card{
  background: #fff;
}
</style>
