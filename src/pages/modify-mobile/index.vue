<template>
  <view class="modify-mobile">
    <view class="p-lr-30 p-top-25">
      <view class="inp p-lr-30 p-tb-30 min-flex min-flex-main-start min-border-bottom">
        <input type="number" placeholder="请输入手机号码" maxlength="11">
      </view>
    </view>
  </view>
</template>

<script>

export default {
  name: 'modify-mobile',
  data () {
    return {
      code: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.modify-mobile {
  background: #fff;
  width: 100vw;
  min-height: 100vh;
  .inp {
    font-size: 30rpx;
    .code {
      color: #FA315F;
    }
  }
}
</style>
