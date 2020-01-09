<template>
  <view class="add-userinfo p-lr-30 p-tb-20">
    <min-cell :card="false">
      <view class="f30 p-tb-30">营销信息</view>
      <view class="min-border-bottom" style="height:1rpx"></view>
      <min-cell-item
        img="http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg"
        title="林平之 | 营销"
        label="15833336666"
      ></min-cell-item>
    </min-cell>
    <view class="m-tb-20"></view>
    <min-cell :card="false" class="mid-view">
      <min-desc-input desc="客户姓名" value="刘轻丽" v-model="isName" placeholder="请输入客户姓名"></min-desc-input>
      <min-desc-input desc="联系电话" v-model="isPhone" placeholder="请输入联系电话"></min-desc-input>
      <min-switch desc="是否当天生日" v-model="isShengri"></min-switch>
    </min-cell>
    <view class="m-tb-20"></view>
    <min-remarks v-model='value'></min-remarks>
    <view class="btn">
      <min-btn :long="true" @click="next">下一步</min-btn>
    </view>
  </view>
</template>

<script>
export default {
  name: 'add-userinfo',
  data () {
    return {
      isShengri: false,
      isPhone: '',
      isName: '',
      value: ''
    }
  },
  watch: {
    isPhone (a) {
      // console.log(a)
    },
    isName (a) {
      // console.log(a)
    }
  },
  methods: {
    next () {
      // console.log('电话：', this.isPhone)
    }
  }
}
</script>

<style lang="scss" scoped>
.add-userinfo {
  .btn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .oinput1 {
    text-align: right;
  }
}
</style>
