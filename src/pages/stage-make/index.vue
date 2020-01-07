<template>
<view class='reservation-date p-lr-30 p-tb-20'>

        <min-cell  class="top-view" :shadow='false'>
            <view class="top-title">客户信息</view>
            <view class="min-border-bottom color-view"></view>
            <view class="info-view min-flex min-flex-dir-top min-flex-align-top">
              <view class="min-flex">
                 <text class="user-name">客户姓名: {{name}}</text>
              </view>
              <view class="min-flex sec-view">
                <text class="user-name">联系电话: {{phone}}</text>
              </view>
            </view>

        </min-cell >

        <min-cell class="top-view" v-for="(item,index) in list" :key='index'>
            <view class="top-title">营销信息</view>
            <view class="min-border-bottom color-view"></view>
            <view class="min-flex min-flex-main-start btm-view">
              <min-avatar size="sm" :url="item.headUrl"></min-avatar>
              <view class="m-left-20">
                <view class="m-top">{{item.name}}  |  {{item.position}}</view>
                 <view class="f2"> {{item.phone}}</view>
              </view>
            </view>
        </min-cell>
        <view class="btn">
          <min-btn :long='true'>下一步</min-btn>
        </view>
</view>
</template>

<script>
export default {
  name: 'state-make',
  data () {
    return {
      name: '林平之',
      phone: 15836666666,
      list: [
        { headUrl: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg', name: '林平之', position: '营销', phone: '15866666666' }

      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.main-view{
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
}
.top-view{
  width: 690rpx;
  margin: 20rpx auto;
  .top-title{
    font-size:30rpx;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:33rpx;
    padding-top: 29rpx;
    padding-bottom: 29rpx;
    padding-left: 20rpx;
  }
  .color-view{
     background: #E7E7E7;
     margin: 0 20rpx;
    //  margin-bottom: 29rpx
  }
  .info-view{
    margin-left: 20rpx;
    padding-top: 20rpx;
    .sec-view{
      padding-top: 20rpx;
      padding-bottom: 30rpx;
    }
    .user-name{
      font-size:28rpx;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:33rpx;
    }
  }

}
.btm-view{
  margin: 30rpx 20rpx 14rpx 20rpx;
  padding-bottom: 14rpx
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
  margin-top: 10rpx
}
.btn{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0
}
</style>
