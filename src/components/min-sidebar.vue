<template>
<view class="min-sidebar">
  <slot></slot>
</view>
</template>

<!--
*
* value 选中项的索引值
*
* @change：切换菜单时触发
*
*  -->
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
