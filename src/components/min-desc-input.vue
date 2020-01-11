<template>
  <view class="min-desc-input">
    <view :class="border ? 'min-view-item min-flex min-flex-main-between f28 min-border-bottom' :'min-view-item min-flex min-flex-main-between f28'">
      <text class="desc-width">{{sign}}{{desc}}</text>
      <input
        class="oinput"
        type="text"
        :placeholder="placeholder"
        :maxlength="maxlength"
        @input="input"
        v-model="value"
        :disabled="disabled"
      />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    desc: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入信息'
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    sign: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number,
      default: 11
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    input (e) {
      // console.log(e.detail.value)
      this.$emit('value', e.detail.value)
      this.$emit('input', e.detail.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.min-desc-input {
  background: #fff;
  flex: 1;
  .min-view-item {
    height: 98rpx;
    .oinput {
      text-align: right;
      line-height: 98rpx;
    }
    .ophone {
      padding-right: 34rpx;
    }
    .right-arrow {
      width: 24rpx;
      height: 24rpx;
      padding-top: 5rpx;
    }
    .desc-width {
      width: 200rpx;
    }
  }
}
</style>
