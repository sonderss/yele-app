<template>
  <view class="min-checkbox">
    <icon type="success" size="20" color="#FE0000"/>
    <!-- <view class="icon" :class="{'active': isCheck}" @click="checkbox">
      <img v-show="value" src="/static/images/tick.png" alt="tick">
    </view> -->
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
  computed: {
    isCheck () {
      if (typeof this.value === 'boolean') return this.value
      const arr = this.checks
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
        const arr = this.checks
        const index = arr.indexOf(this.value)
        this.isCheck ? arr.splice(index, 1) : arr.push(this.value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.min-checkbox{
  .icon{
    /* width: 40rpx;
    height: 40rpx;
    display: inline-block;
    vertical-align: middle;
    border-radius: 50%;
    padding: 5rpx;
    box-sizing: border-box;
    border: 1px solid #CACAD0; */
    transform: scale(.83);
    img{
      width: 100%;
      height: 100%;
    }
    &.active{
      background: #FF2C00;
      border: none;
    }
  }
  .text{
    display: inline-block;
    vertical-align: middle;
    font-size: 28rpx;
    color:#333;
  }
}
</style>
