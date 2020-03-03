<template>
  <view class="storing-liquor-detail p-tb-20 p-lr-30">
    <view class="card p-lr-20">
      <view class="top p-tb-30 min-border-bottom">
        <view>取酒客户信息</view>
      </view>
      <view class="main p-tb-30">
        <view class="item">客户姓名：刘小青</view>
        <view class="item">联系电话：135 5352 0135</view>
        <view class="item">取酒台号：<text class="item spectio">K112</text></view>
        <view class="item">取酒单号：201910102356</view>
        <view class="item">取酒人员：刘清清</view>
        <view class="item">取酒时间：2019年10月10日  23:56:00</view>
        <view class="item">确认人员：刘小清</view>
        <view class="item">确认时间：2019年10月10日  23:56:00</view>
      </view>
    </view>
    <view class="goods-wrap m-top-20 p-lr-20">
      <view class="p-tb-30 min-border-bottom">存酒信息</view>
      <view class="goods-list p-t-10 p-bottom-20">
        <view class="p-top-20" v-for="index in 3" :key="index">
          <view style="background: #fff;">
            <view class="goods-item">
              <image class="goods-icon" src="/static/images/goods.png"/>
              <view class="goods-content">
                <view class="goods-name">2020年元旦百威兄弟套餐12瓶2020</view>
                <view class="count-weap">
                  <view class="slider">
                    <min-slider v-model="count" max="100"/>
                  </view>
                  <view class="stepper">
                    <min-stepper :isAnimation="false" v-model="count" max="100" unit="%"/>
                  </view>
                </view>
                <view class="goods-price">剩余50%</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="card p-lr-20 m-top-20">
      <view class="top p-tb-30 min-border-bottom">存酒信息</view>
      <view class="main p-tb-30">
        <view class="item">客户姓名：令狐冲</view>
        <view class="item">联系电话：15833331111</view>
        <view class="item">存酒单号：2019324646574</view>
        <view class="item">存酒人员：刘大芒</view>
        <view class="item">存酒台号：K1112</view>
        <view class="item">确认人员：刘大芒</view>
        <view class="item">存酒时间：2019-12-19  17:00:00</view>
        <view class="item">生效时间：2019-12-20  17:00:00</view>
        <view class="item">到期时间：2019-12-20  17:00:00</view>

      </view>
    </view>
    <view class="btn-wrap">
      <min-btn shape="flat" :opacity="false">取酒</min-btn>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      count: 0
    }
  }
}

</script>

<style lang="scss" scoped>
.storing-liquor-detail{
  padding-bottom: 100rpx;
  .card{
    background: #fff;
    border-radius: 10rpx;
    .top{
      display: flex;
      justify-content: space-between;
    }
    .main{
      .item{
        margin-top: 10rpx;
        &:first-child{
          margin: 0;
        }
        &.spectio{
          color: #FF0000
        }
      }
    }
  }
  .goods-wrap{
    background: #fff;
    margin-bottom: 10rpx;
    .goods-item{
      display: flex;
      .goods-icon{
        height: 140rpx;
        flex: 0 0 140rpx;
      }
      .goods-content{
        flex: 1;
        display: block;
        padding-left: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        .goods-name{
          font-size: 28rpx;
        }
        .goods-price{
          font-size: 24rpx;
          color: #FF0000;
        }
        .goods-size{
          color: #666;
          font-size: 24rpx;
          .count{
            color: #666;
            font-size: 24rpx;
            float: right;
          }
        }
      }
      .count-weap{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: -20rpx;
        .slider{
          flex: 0 0 68%;
        }
      }
    }
  }
  .card{
    background: #fff;
    border-radius: 10rpx;
    .top{
      display: flex;
      justify-content: space-between;
    }
    .main{
      .item{
        margin-top: 10rpx;
        &:first-child{
          margin: 0;
        }
      }
    }
  }
  .btn-wrap{
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
}
</style>
