<template>
  <view class="min-checkbox" @click="checkbox">
    <icon type="success" size="20" color="#FE0000" v-if="isCheck"/>
    <view class="icon" v-else></view>
    <view class="text p-left-20">{{title}}</view>
  </view>
</template>

<!--
*
* value/v-model  绑定的值或匹配的值
* title 标题
* disabled 是否禁用
*
*  -->
<script>
export default {
  props: {
    checks: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    title: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      parentValue: []
    }
  },
  computed: {
    isCheck () {
      if (typeof this.value === 'boolean') return this.value
      let arr = null
      // #ifdef APP-PLUS || MP-WEIXIN
      arr = this.$parent.value
      // #endif
      // #ifdef H5
      arr = this.$parent.$parent.value
      // #endif
      const isInclude = arr.indexOf(this.value)
      return isInclude > -1
    }
  },
  methods: {
    checkbox () {
      if (this.disabled) return
      if (typeof this.value === 'boolean') {
        this.$emit('input', !this.value)
      } else {
        let arr = null
        // #ifdef APP-PLUS || MP-WEIXIN
        arr = this.$parent.value
        // #endif
        // #ifdef H5
        arr = this.$parent.$parent.value
        // #endif
        const index = arr.indexOf(this.value)
        index > 0 ? arr.splice(index, 1) : arr.push(this.value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.min-checkbox{
  display: flex;
  .icon{
    width: 40rpx;
    height: 40rpx;
    display: inline-block;
    vertical-align: middle;
    border-radius: 50%;
    box-sizing: border-box;
    border: 1px solid #CACAD0;
  }
  .text{
    display: inline-block;
    vertical-align: middle;
    font-size: 28rpx;
    color:#333;
  }
}
</style>
