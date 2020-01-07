<template>
<view  class='reservation-date p-lr-30 p-tb-20'>
    <min-cell :card='false' >
         <min-cell-item title="营销信息"></min-cell-item>
          <view class="min-flex min-flex-main-start min-flex-main-center main-view">
              <min-avatar size="sm" url="http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg"></min-avatar>
              <view class="m-left-20  min-flex  min-flex-dir-top min-flex-main-around">
                 <view class="m-top">林平之  |  营销</view>
                 <view class="f2">15833336666</view>
              </view>
            </view>
    </min-cell>
    <view class="min-view-border"></view>
    <min-cell :card='false' class="mid-view">
      <view class="min-flex  min-flex-main-between min-border-bottom ">
         <min-cell-item :border='false' title="客户姓名"></min-cell-item>
         <input class="oinput1" maxlength="6" type="text" value="刘轻丽"/>
      </view>
            <view class="min-flex  min-flex-main-between min-border-bottom ">
              <min-cell-item :border='false' title="联系电话" ></min-cell-item>
              <input class="oinput" maxlength="11" type="text" placeholder="请输入联系电话"/>
            </view>
            <view class="min-flex  min-flex-main-between ">
               <min-cell-item :border='false' title="是否当天生日" ></min-cell-item>
               <switch  checked style="transform: scale(0.7,0.7)" color="#6CD56C"/>
            </view>
    </min-cell>
    <view class="min-view-border"></view>
    <min-cell :card='false' class="desc-view">
      <view class="title">备注</view>
      <view class="content-desc">
         <textarea class="o-input" type="text" />
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
  name: 'add-userinfo'
}
</script>

<style lang="scss" scoped>
.main-view{
  height: 132rpx;

}
.mid-view{
  // margin: 20rpx 0;
}
.min-view-border{
 margin: 20rpx 0;
}
.m-top{
  font-size:28rpx;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:33rpx;
}
.f2{
  font-size:24rpx;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:33rpx;
  margin-top: 10rpx;
  letter-spacing:1rpx
}
.btn{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}
.oinput{
  padding-left: 20rpx
}
.oinput1{
  padding-right: 20rpx;
  text-align: right;

}
.desc-view{
  height: 320rpx;
  padding-bottom: 20rpx;
  .title{
    margin-left:17rpx;
    padding-top: 30rpx;
    margin-bottom:30rpx
  }
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
      padding-top: 10rpx;
      padding-left: 10rpx;
      border: none;
      padding-right: 10rpx;

    }
  }
}

</style>
