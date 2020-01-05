<template>
<view class="min-sidebar">
  <slot></slot>
</view>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    changeValue (value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss">
.min-sidebar{
  width: 100%;
  background: #fff;
}
</style>
