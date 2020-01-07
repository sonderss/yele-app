<template>
  <button class="min-btn"
    :class="[
      long ? 'min-btn-long' : '',
      inline ? 'min-btn-inline': '',
      'min-btn-shape-' + shape,
      'min-btn-type-' + type,
      'min-btn-size-' + size,
      border ? 'min-btn-border': '',
      hairline && !long ? 'min-btn-hairline' : '',
      disabled ? 'min-btn-disabled' : ''
    ]"
    hover-class="min-btn-hover"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MinBtn',
  props: {
    long: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    hairline: {
      type: Boolean,
      default: false
    },
    shape: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'theme'
    },
    size: {
      type: String,
      default: 'sm'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick () {
      if (this.disabled) return
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin btn-size($size, $fs) {
  height: $size;
  font-size: $fs;
}
@mixin btn-type($bcolor, $color, $bdcolor) {
  background: $bcolor;
  color: $color;

  &.min-btn-hairline {
    box-shadow: 0px 0px 1px 1px $bdcolor inset;
  }
}
.min-btn {
  position: relative;
  /* margin: 0 30rpx; */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0 !important;
  border-radius: 4px;
  height: 88rpx;
  font-size: 28rpx;
  color: #333333;
  touch-action: manipulation;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  text-decoration: none;
  background-color: #FFE000;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform: scale(.5);
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
    border-radius: 4px;
    border: none;
  }
  &-hover {
    opacity: 0.7;
  }
  &-shape-circle {
    border-radius: 1000rpx;
  }
  &-shape-flat {
    border-radius: 0rpx;
  }
  &-inline{
    display: inline-flex;
    vertical-align: middle;
  }
  &-border{
    border: 1rpx solid #E7E7E7 !important;
  }
  &-long {
    margin: 0;
    border-radius: 0;
  }
  &-size-xs {
    margin: 0 !important;
    @include btn-size(68rpx, 28rpx)
  }
  &-size-sm {
    @include btn-size(88rpx, 28rpx)
  }
  &-type-theme {
    @include btn-type(#FFE000, #333333, #aaaaaa)
  }
  &-type-white {
    @include btn-type(#fff, #333333, #fff)
  }
  &-disabled {
    background-color: #CCCCCC;
    &.min-btn-hover {
      opacity: 1;
    }
  }
}
</style>
