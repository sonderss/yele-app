<template>
<view  class='add-userinfo p-lr-30 p-tb-20'>
  <min-cell :card='false' >
    <view class="f30 p-tb-30">营销信息</view>
    <view class="min-border-bottom" style="height:1rpx"></view>
    <min-cell-item
      img='http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg'
      title='林平之 | 营销'
      label='15833336666'
    >
    </min-cell-item>
  </min-cell>
  <view class="m-tb-20"></view>
  <min-cell :card='false' class="mid-view">
    <view class="min-flex  min-flex-main-between min-border-bottom ">
      <min-cell-item :border='false' title="客户姓名"></min-cell-item>
      <input class="oinput1 p-right-20" maxlength="6" type="text" value="刘轻丽"/>
    </view>
    <view class="min-flex  min-flex-main-between min-border-bottom ">
      <min-cell-item :border='false' title="联系电话" ></min-cell-item>
      <input class="p-left-10" maxlength="11" type="text" placeholder="请输入联系电话"/>
    </view>
     <min-switch desc='是否当天生日' v-model="isShengri"></min-switch>
  </min-cell>
  <view class="m-tb-20"></view>
  <min-cell :card='false' class="desc-view">
    <view class="m-left-16 p-top-30 m-bottom-30">备注</view>
    <view class="content-desc">
      <textarea class="o-input p-lr-10 p-top-10" type="text" />
    </view>
    <view class="btm-view"></view>
  </min-cell>
  <view class="btn">
    <min-btn :long='true'>下一步</min-btn>
  </view>
</view>
</template>

<script>
export default {
  name: 'add-userinfo',
  data () {
    return {
      isShengri: false
    }
  }
}
</script>

<style lang="scss" scoped>
.add-userinfo{
  .btn{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .oinput1{
    text-align: right;
  }
  .desc-view{
    height: 320rpx;
    padding-bottom: 20rpx;
    .btm-view{
      height: 20rpx;
      background: #fff;
    }
    .content-desc{
      width:650rpx;
      height:200rpx;
      background:rgba(247,247,247,1);
      border-radius:10rpx;
      margin: 0 auto;
      .o-input{
        overflow: hidden;
        display: block;
        width:100%;
        height:100%;
        line-height:35rpx;
        border: none;
      }
    }
  }
}

</style>
