<template>
<view class='reservation-date p-lr-30 p-tb-20'>
  <min-cell  class="top-view" :shadow='false'>
    <view class="top-title">客户信息</view>
    <view class="min-border-bottom color-view"></view>
    <view class="info-view min-flex min-flex-dir-top min-flex-align-top">
      <view class="min-flex sec-view">
          <text class="user-name">客户姓名: {{name}}</text>
      </view>
      <view class="min-flex sec-view-btm">
        <text class="user-name">联系电话: {{phone}}</text>
      </view>
    </view>
  </min-cell>
  <view class="mid-view-border"></view>
  <min-cell class="top-view">
    <min-cell-item title='营销信息'></min-cell-item>
    <view class="min-border-bottom color-view"></view>
    <min-cell-item
      v-for="(item,index) in list" :key='index'
      :img='item.headUrl'
      :title='`${item.name} | ${item.position}`'
      :label='item.phone'
    ></min-cell-item>
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
.mid-view-border{
  margin-bottom: 20rpx;
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
      margin-bottom: 10rpx
    }
    .sec-view-btm{
       margin-bottom: 30rpx
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
.btn{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0
}
</style>
