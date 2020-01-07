<template>
  <view>
    <view class="min-search min-flex">
      <image class="search-icon" src="/static/images/search.png"></image>
      <input class="search min-flex-1" type="text" :placeholder="placeholder"
        v-model="value"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <view v-show="close" @click="handleClose" class="search-close-box min-flex">
        <image class="search-close" src="/static/images/close.png"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    placeholder: {
      default: '请输入搜索内容',
      type: String
    }
  },
  data () {
    return {
      close: false,
      value: ''
    }
  },
  methods: {
    handleFocus () {
      this.close = true
    },
    handleBlur () {
      this.close = false
      this.$emit('search', this.value)
    },
    handleClose () {
      this.value = ''
      this.$emit('search', this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.min-search {
  position: relative;
  padding: 0 30rpx;
  background: #FFFFFF;
  height: 88rpx;
  font-size: 28rpx;
  border-radius: 4px;
  .search-icon {
    width: 31rpx;
    height: 30rpx;
    margin-right: 20rpx;
  }
  .search-close-box {
    position: absolute;
    right: 10rpx;
    width: 55rpx;
    height: 55rpx;
    z-index: 1;
  }
  .search-close {
    width: 32rpx;
    height: 32rpx;
  }

}
</style>
