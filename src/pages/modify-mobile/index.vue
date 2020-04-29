<template>
  <view class="modify-mobile">
    <view class="p-lr-30 p-top-25">
      <view class="inp p-lr-30 p-tb-30 min-flex min-flex-main-start min-border-bottom">
        <input type="number" v-model="phone" placeholder="请输入原手机号码" maxlength="11">
      </view>
    </view>
  </view>
</template>

<script>

export default {
  name: 'modify-mobile',
  navigate: ['navigateTo'],
  data () {
    return {
      code: 0,
      phone: ''
    }
  },
  mounted () {
    this.phone = this.$parseURL().mobile
  },
  onNavigationBarButtonTap () {
    this.$minRouter.push({
      name: 'bind-mobile',
      params: { phone: this.phone }
    })
  }
}
</script>

<style lang="scss" scoped>
uni-page-body {height: 100%;background: #fff;width: 100vw;}
.modify-mobile {
  .inp {
    font-size: 30rpx;
    .code {
      color: #FA315F;
    }
  }
}
</style>
