<template>
  <view>
    <view class="min-search min-flex" :style="{'background': bgColor}">
      <image class="search-icon" @click="$emit('search')" src="/static/images/search.png"></image>
      <input class="search min-flex-1" type="text" confirm-type="search" :placeholder="placeholder"
        @input="handleInput"
        :value="value"
      >
      <view v-show="String(value)" @click="handleClose" class="search-close-box min-flex">
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
    },
    value: {
      type: [String, Number],
      default: ''
    },
    bgColor: {
      type: String,
      default: '#fff'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', '')
    },
    handleInput (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.min-search {
  position: relative;
  padding: 0 30rpx;
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
