<template>
  <view class="mine-info">
    <view class="cell-wrap p-lr-30 p-tb-20">
      <min-cell>
        <min-cell-item
          img="http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg"
          title="SIMBA"
          tail="编辑头像"
          imgSize="sm"
          :border="true"
          arrow
        ></min-cell-item>
        <min-cell-item
          title="名字" tail="阿容"
          :border="true" arrow
        ></min-cell-item>
        <min-cell-item
          title="性别" tail="女"
          :border="true" arrow
        ></min-cell-item>
        <min-cell-item
          title="民族" tail="汉"
          :border="true" arrow
        ></min-cell-item>
        <min-cell-item
          title="出生日期" tail="1999/1/1"
          :border="true" arrow
        ></min-cell-item>
        <min-cell-item
          title="电话号码" :tail="$minCommon.hideTel('15016584603')"
          :border="false" arrow
          @eventParent="setPhone"
        ></min-cell-item>
      </min-cell>
      <view class="m-top-20"></view>
      <min-cell>
        <min-cell-item
          title="实名认证" tail="去认证"
          :border="true" arrow
          tailType="red"
           @eventParent="toFace"
        ></min-cell-item>
        <min-cell-item
          title="提现方式"
          :border="true" arrow
          @eventParent="payMethods"
        ></min-cell-item>
      </min-cell>
    </view>
    <view class="m-top-30 p-lr-30">
      <min-btn type="white">退出登录</min-btn>
    </view>
  </view>
</template>

<script>
export default {
  name: 'mine-info',
  navigate: ['navigateTo'],
  mounted () {
  },
  methods: {
    setPhone () {
      this.$minRouter.push({
        name: 'modify-mobile'
      })
    },
    toFace () {
      // verify-name
      this.$minRouter.push({
        name: 'verify-name'
      })
    },
    // payMethods drawing-way
    payMethods () {
      this.$minRouter.push({
        name: 'drawing-way'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mine-info{

}
</style>
