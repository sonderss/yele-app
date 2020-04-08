<template>
  <view class="lnvitation-offline p-lr-30 p-tb-20">
    <min-search bgcolor="#EEEEEE" placeholder="请输入营销姓名/手机号搜索"></min-search>
    <min-cell class="m-top-20" :card="false">
      <view class="title min-border-bottom">可邀请的下线</view>
      <view class="item min-border-bottom" v-for="(n,i) in list" :key="i">
        <min-checkbox v-model="n.a"></min-checkbox>
        <min-describe
          leftIconValue="../../static/images/headurl60.png"
          :leftTxtB="n.leftTxtB"
          :leftTxt="n.name"
          :rightTxtT="n.rightTxtT"
          :rightTxtB="n.rightTxtB"
          :leftIcon="true"
          :leftTxtTwo="true"
        ></min-describe>
      </view>
    </min-cell>
    <view class="btn">提交申请</view>
  </view>
</template>
<script>
export default {
  name: 'lnvitation-offline',
  navigate: ['navigateTo'],
  data () {
    return {
      list: [
        {
          leftTxtB: '15811112222',
          name: '流氓大亨',
          rightTxtT: '营销部',
          rightTxtB: '经理',
          a: false
        },
        {
          leftTxtB: '15811112222',
          name: '流氓大亨',
          rightTxtT: '营销部',
          rightTxtB: '经理',
          a: false
        },
        {
          leftTxtB: '15811112222',
          name: '流氓大亨',
          rightTxtT: '营销部',
          rightTxtB: '经理',
          a: false
        },
        {
          leftTxtB: '15811112222',
          name: '流氓大亨',
          rightTxtT: '营销部',
          rightTxtB: '经理',
          a: false
        },
        {
          leftTxtB: '15811112222',
          name: '流氓大亨',
          rightTxtT: '营销部',
          rightTxtB: '经理',
          a: false
        },
        {
          leftTxtB: '15811112222',
          name: '流氓大亨',
          rightTxtT: '营销部',
          rightTxtB: '经理',
          a: false
        },
        {
          leftTxtB: '15811112222',
          name: '流氓大亨',
          rightTxtT: '营销部',
          rightTxtB: '经理',
          a: false
        },
        {
          leftTxtB: '15811112222',
          name: '流氓大亨',
          rightTxtT: '营销部',
          rightTxtB: '经理',
          a: false
        }
      ]
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
