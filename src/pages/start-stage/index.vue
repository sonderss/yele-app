<template>
  <view class="start-stage p-lr-30 p-tb-20">
    <min-cell class="top-view-start min-flex min-flex-main-start ">
      <view class="min-flex min-flex-main-start">
        <min-checkbox title="自来客"></min-checkbox>
      </view>
    </min-cell>
    <min-cell class="main-view">
      <min-cell-item title='营销带客'></min-cell-item>
      <view class="min-search min-flex">
        <input class="search min-flex-1" v-model="value" maxlength="11" type="text" placeholder="请输入营销姓名/手机号搜索" />
        <view   class="search-close-box min-flex">
          <image v-if="!value" class="search-icon img-size" src="/static/images/search.png"></image>
        </view>
      </view>
      <view class="top-view min-flex min-flex-main-start" :class="index == list.length-1 ? '' : 'min-border-bottom' " v-for="(item,index) in list" :key='index'>
        <view class="min-flex min-flex-main-start">
          <min-avatar size="sm" :url="item.headUrl"></min-avatar>
          <view class="m-left-20  min-flex  min-flex-dir-top min-flex-main-around">
            <view class="m-top">{{item.name}}  |  {{item.position}}</view>
            <view class="f2">{{item.phone}}</view>
          </view>
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
  name: 'start-stage',
  data () {
    return {
      value: '',
      list: [
        { headUrl: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg', name: '林平之', position: '营销', phone: '15866666666' },
        { headUrl: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg', name: '任我行', position: '营销', phone: '15866666666' },
        { headUrl: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg', name: '令狐冲', position: '营销', phone: '15866666666' }

      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.top-view-start{
  height: 98rpx;
}
.main-view{
  // height: 600rpx;
  margin-top: 20rpx
}
.min-search {
  width:630rpx;
  height:55rpx;
  background:rgba(247,247,247,1);
  border-radius:10rpx;
  margin: 30rpx auto;
  margin-bottom: 0;
  padding-left: 133rpx;
  font-size:26rpx;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(153,153,153,1);
  line-height:55rpx;
  .search-close-box {
    position: absolute;
    right: 140rpx;
    width: 55rpx;
    height: 55rpx;
    z-index: 1;
  }
  .search-close {
    width: 32rpx;
    height: 32rpx;
  }
  .img-size{
    width: 30rpx;
    height: 30rpx;
  }
}
.top-view{
  // width: 690rpx;
  // margin: 20rpx auto;
  height: 140rpx;

  // background: #f00;
  .info-view{
    // margin-left: 20rpx;
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
</style>
