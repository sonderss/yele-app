<template>
  <view class="lnvitation-offline p-lr-30 p-tb-20">
    <min-search bgcolor="#EEEEEE" placeholder="请输入营销姓名/手机号搜索"></min-search>
    <min-cell class="m-tb-20" :card="false">
      <view class="title min-border-bottom">可邀请的下线</view>
      <view class="item min-border-bottom" v-for="(n,i) in list" :key="i">
        <min-checkbox v-model="n.a"></min-checkbox>
        <min-describe
          :leftIconValue="n.head_img"
          :leftTxtB="n.mobile"
          :leftTxt="n.sales_name"
          :rightTxtT="n.position_name"
          :rightTxtB="n.rightTxtB"
          :leftIcon="true"
          :leftTxtTwo="true"
        ></min-describe>
      </view>
    </min-cell>
    <view style="height:100rpx"></view>
    <view class="btn" @click="toPost">提交申请</view>
  </view>
</template>
<script>
export default {
  name: 'lnvitation-offline',
  navigate: ['navigateTo'],
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.$minApi.getPleaseDownLineList({
      page: 1,
      limitL: 10
    }).then(res => {
      console.log(res)
      this.list = res.list
    })
  },
  methods: {
    toPost () {
      return this.$showToast('正在开发中')
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  height: 88rpx;
  line-height: 88rpx;
}
.item {
  height: 152rpx;
  display: flex;
  align-items: center;
  text-align: right;
}
.btn {
  width: 100%;
  height: 98rpx;
  background: rgba(255, 224, 1, 1);
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  line-height: 98rpx;
}
</style>
