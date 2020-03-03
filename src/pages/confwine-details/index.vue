<template>
  <view class="confwine-details p-tb-20 p-lr-30">
    <view class="card p-lr-20 m-bottom-20">
      <view class="top p-tb-30 min-border-bottom">
        <view>单号：125254478524774</view>
      </view>
      <view class="main m-bottom-20" v-for="(item,index) in 3" :key="index">
        <view class="img-view">
           <img src="../../static/images/goods.png" style="width:100%"/>
        </view>
        <view class="content">
           <text class="title f28">2020年元旦跨年夜百威兄弟终极终极 套餐12瓶</text>
           <text class="desc f24">提成：￥2380.00</text>
        </view>
      </view>
    </view>
    <view class="card p-lr-20 m-bottom-20">
      <view class="top p-tb-30 min-border-bottom">
        <view>其他信息</view>
      </view>
      <view class="contxt">
          <view class="item">客户姓名：刘大芒</view>
          <view class="item">联系电话：135 5352 0135</view>
          <view class="item">存酒数量：123</view>
        </view>
    </view>
  </view>
</template>

<script>
export default {

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
      height: 140rpx;
      display: flex;
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
