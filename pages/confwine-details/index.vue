<template>
  <view class="confwine-details p-tb-20 p-lr-30">
    <view class="card p-lr-20 m-bottom-20">
      <view class="top p-tb-30 min-border-bottom">
        <view>充公酒信息</view>
      </view>
      <view class="main " v-for="(item,index) in data.detail" :key="index">
        <view class="img-view">
           <img :src="item.product_img" style="width:100%"/>
        </view>
        <view class="content">
           <text class="title f28 min-ellipsis">{{item.product_name}}</text>
           <text class="desc f24">提成：￥{{item.commission_amount}}</text>
        </view>
      </view>
    </view>
    <view class="card p-lr-20 m-bottom-20">
      <view class="top p-tb-20 min-border-bottom">
        <view>其他信息</view>
      </view>
      <view class="contxt p-tb-20">
          <view class="item">充公单号：{{data.order_sn}}</view>
          <view class="item">充公人员：{{data.confiscate_user_name}}</view>
          <view class="item">确认人员：{{data.confirm_user_name}}</view>
          <view class="item">提成合计：￥{{data.total_commission}}</view>
          <view class="item">充公时间：{{data.friend_create_time}}</view>
          <view class="item">确认时间：{{data.friend_operate_time}}</view>
        </view>
    </view>
  </view>
</template>

<script>
export default {
  navigate: ['navigateTo'],
  name: 'confwine-details',
  data () {
    return {
      data: {},
      isLoadong: true
    }
  },
  created () {

  },
  onLoad (options) {
    uni.showLoading({
      title: '加载中'
    })
    const params = JSON.parse(options.params)
    this.getData(params.id)
  },
  methods: {
    getData (id) {
      this.$minApi.getWinereDetail({ id: id }).then(res => {
        this.data = res
        console.log(this.data)
        this.isLoadong = false
        uni.hideLoading()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.confwine-details{
  .card{
    background: #fff;
    border-radius: 10rpx;
    .top{
      display: flex;
      justify-content: space-between;
    }
    .main{
      height:auto;
      display: flex;
      padding-bottom: 20rpx;
      margin-top: 20rpx;
      .img-view{
        width: 140rpx;
        height: 140rpx;
      }
      .content{
        width: 457rpx;
        margin-left: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .desc{
          color: #FF0000
        }
      }
    }
    .contxt{
      .item{
        margin-top: 10rpx;
        &:first-child{
          margin: 0;
        }
      }
    }
  }
}
</style>
