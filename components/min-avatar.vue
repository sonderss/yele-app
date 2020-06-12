<template>
  <view
    :class="['min-avatar', 'min-avatar-' + shape, 'min-avatar-size-' + size, 'min-avatar-image']">
    <image class="min-avatar-img"
      :src="imgUrl"
      :mode="mode"
      @error="handleError" @load="handleLoad"
    ></image>
  </view>
</template>

<script>
export default {
  name: 'MinAvatar',
  props: {
    shape: {
      type: String,
      default: 'circle'
    },
    size: {
      type: String,
      default: 'xs'
    },
    mode: {
      type: String,
      default: 'aspectFill'
    },
    url: {
      type: String,
      default: ''
    },
    errorUrl: {
      type: String,
      default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAilBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATAggvAAAALXRSTlMAgECWh1pLqqLuKJpWMxjMxbCmaEXz0mPk39vBs5CMURO2TS0hD7h5d3RdA8d58KB7AAAEjElEQVR42u3d61LqMBSG4RWhtrRAixxE5Hxwe9jf/d/eJg3MdgpGIIUs63r+Osz4qmnTNjV0lpVKxukQVzdMx4la0ZX06gPc1KDeo/LNMniQzahcqwieRCsqkerDm76i0nTgVYfKsR5irx81W+s5Xd183WpGfewN11SCFvYWwYZuaBMssNciZx/YyQK6uSDDzge5eoChyAsF44EcvfnqKJa8kZMljBl5M4OxJBcvyL2TR+/IvZCDALkJeTVBLqDLZdDSDXm1SaFldLFH5JrkWRO5R7rUAlpE3kXQFnShNrRGTN7FDWhtukwXWkIMJNC6dJnx7i+TATNax3QZ5NrEQBs5lw8PiIWBww+1tZutsfDgMJu/h1YnFurQ7h0GWJdY6DoceP5A6xELPWh/HK4EHuosmDGiLgxhR/3Em0Dl3Rh6BjvPFx662Xn43WPEhKiABeUcckcs3EmIhOQkREIkxE5CJERC7CREQiTETkIkRELsJERCJOR0IRBWIWSKrWkFQhrYalQgBDkJkRAJkRAJkRAb9TTonh/SHTwpXiFdbKlzQxS2uqxCRtDq54XUoY1YhTzBlJwTYjrwxCpkAmN6esgUxoRVCCkYE3vIYTqzwf6/pHZaSA2G4nb4LZbYQ/53sDuPfCpJvr+wSmAofifEzyVR8ZK9eNEewVAMz+y2ki87OE5RjPrRdVVxfHQdWJ3lXKtwcghtd4eMKc9JY/Fw1LOse83VmM5+iwekt2/eB0y4TuOLQ3lmfxsvYns9UhgEKX0pBRDyvbD6TCk1py/NlVKMrxALKnk3XkIkREIOSYiESIgWNlDQSOhEyeFnQ18hNRyhHF5OqfkJiXFUTFb2z0qISwilOOLZ4U201Ntg7x8O9phOEh8O9n4oh18J+ZaESIiE2EmIhFwjpKeWZLFUvZ8RogA822dZ6ieEKGhN+//KUvxDFHLqu69zD1GnPuhRvEPU6Y/eFOeQYoe9hG/I8Y7o6anwvJr74+njHerwOwh5LxgodNiWcIScl3AUOuyLakK+i2qKHfYQCrkuczrssIdQyHPhWfewwx5iSriuMjUdlpBCCdtVpiGdE0Ihw1Wmiek4L8SUJKxCSA1His4NITUaMhvs1VnkLyESIiESIiHMQirz0rFZG1+BkMq8mE8Uxz/0bvxWNR4rbEmIhEiInYRIiITYSYiESIidhEiIhNhJiIRIiJ2ESMjvCXm9Z+FVdhYjisBO9Lt3FqvMXm+VGSMmpFNjoSPnEQnJsQqpzOanldmOtjIbBFdmy+Y2tJRYSKG1f/e25hRCaxIDTbisaAmg1YiBGrTA6ffZiMm7uOH2V96BFpF3kcMk3pwSeYySJnKPdLEM2qBNXrUH0DK6XIDcmLwaIxeQgxfkFHmkkHshF0vA92T+DsaSnEzhecA3YUzJ0V8Yr+TFK4y/5OoDO1lANxdk2PkgZy3sLd43dEOb9wX2WlSC+QB7/U6ztZ7T1c3XrWanj73BvLQpm1c1Ko3qw5u+ohKtIngSrahcswweZDMq3/1khJsaTe7pSloqGadDXN0wHSeqRef4BwJS/dBnJUyzAAAAAElFTkSuQmCC'
    }
  },
  data () {
    return {
      imgUrl: ''
    }
  },
  watch:{
      url(a){
        this.imgUrl = a
      }
  },
  methods: {
    handleError (e) {
      this.imgUrl = this.errorUrl
      this.$emit('error', e)
    },
    handleLoad (e) {
      this.$emit('load', e)
    }
  },
  created () {
    this.imgUrl = this.url
  }
}
</script>

<style lang="scss" scoped>
.min-avatar {
  display: inline-block;
  text-align: center;
  background: cyan;
  color: #ffffff;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  &-image {
    background: transparent;
  }
  &-img {
    width: 100%;
    height: 100%;
  }
  &-circle {
    border-radius: 50%;
  }
  &-square {
    border-radius: 6px;
  }
  &-size-xs {
    width: 80rpx;
    height: 80rpx;
  }
  &-size-sm {
    width: 88rpx;
    height: 88rpx;
  }
  &-size-md {
    width: 100rpx;
    height: 100rpx;
  }
  &-size-nm {
    width: 60rpx;
    height: 60rpx;
  }
}
</style>
