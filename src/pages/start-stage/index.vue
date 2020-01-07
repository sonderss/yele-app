<template>
    <view class="reservation-date p-lr-30 p-tb-20">

          <view class="top-view-start bg-white radius-6 p-lr-16 min-flex min-flex-main-start" >
                <view :class="isChecked ? 'checkbox-active':'checkbox'" @click="changeCheckbox"></view>
                <text class="title-desc">自带客</text>
          </view>

      <min-cell class="main-view" :card="false">
        <min-cell-item title='营销带客'></min-cell-item>
        <view class="min-search" >
              <view   class="search-close-box min-flex min-flex-main-start">
                <image v-if="!value" class="search-icon img-size" src="/static/images/search.png"></image>
              </view>
              <input class="my-search" v-model="value" maxlength="11" type="text" placeholder="请输入营销姓名/手机号搜索" />
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
        <min-btn :long='true' @click="toAddUserInfo">下一步</min-btn>
      </view>
    </view>
</template>

<script>
export default {
  name: 'start-stage',
  data () {
    return {
      value: '',
      isChecked: true,
      list: [
        { headUrl: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg', name: '林平之', position: '营销', phone: '15866666666' },
        { headUrl: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg', name: '任我行', position: '营销', phone: '15866666666' },
        { headUrl: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg', name: '令狐冲', position: '营销', phone: '15866666666' }

      ]
    }
  },
  methods: {
    changeCheckbox () {
      this.isChecked = !this.isChecked
    },
    toAddUserInfo () {
      uni.navigateTo({
        url: '../add-userinfo/index'
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.top-view-start{
  width: 690rpx;
  height: 98rpx;
  background: #fff;
  z-index: 999;
  margin-bottom: 20rpx
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
  padding-left:60rpx;
  font-size:26rpx;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(153,153,153,1);
  line-height:55rpx;
  .my-search{
    display: block;
    height: 100%;
  }
  .search-close-box {
    position: absolute;
    left: 80rpx;
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
.checkbox-active{
  width: 44rpx;
  height: 44rpx;
  background-image: url('../../static/images/checkbox44.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.checkbox{
   width: 44rpx;
  height: 44rpx;
  border: 1rpx solid #ccc;
  border-radius: 50%;

}
.title-desc{
  padding-left: 20rpx
}

</style>
