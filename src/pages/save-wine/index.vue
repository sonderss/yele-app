<template>
  <view class="save-wine p-tb-20 p-lr-30">
    <view class="goods-wrap m-top-20 p-lr-20">
      <view class="p-tb-30 min-border-bottom">来源于订单</view>
      <view class="goods-list p-t-10 p-bottom-20">
        <view class="p-top-20" v-for="index in 3" :key="index">
          <view style="background: #fff;">
            <view class="goods-item">
              <image class="goods-icon" src="/static/images/goods.png" />
              <view class="goods-content">
                <view class="goods-name">2020年元旦百威兄弟套餐12瓶2020</view>
                <view class="count-weap">
                  <view class="slider">
                    <min-slider v-model="count" max="100" />
                  </view>
                  <view class="stepper">
                    <min-stepper :isAnimation="false" v-model="count" max="100" unit="%" />
                  </view>
                </view>
                <view class="goods-price">剩余50%</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 来源于取酒 -->
     <view class="goods-wrap m-top-20 p-lr-20">
      <view class="p-tb-30 min-border-bottom">来源于取酒</view>
      <view class="goods-list p-t-10 p-bottom-20">
        <view class="p-top-20" v-for="index in 3" :key="index">
          <view style="background: #fff;">
            <view class="goods-item">
              <image class="goods-icon" src="/static/images/goods.png" />
              <view class="goods-content">
                <view class="goods-name">2020年元旦百威兄弟套餐12瓶2020</view>
                <view class="count-weap">
                  <view class="slider">
                    <min-slider v-model="count" max="100" />
                  </view>
                  <view class="stepper">
                    <min-stepper :isAnimation="false" v-model="count" max="100" unit="%" />
                  </view>
                </view>
                <view class="goods-price">剩余50%</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
      <view class="client_desc p-lr-20 m-top-20">
         <min-desc-input sign="*" desc="客户姓名"></min-desc-input>
         <min-desc-input sign="*" :border="false" desc="联系方式"></min-desc-input>

      </view>
    <view class="btn">提交</view>
  </view>
</template>
<script>
export default {
  name: 'save-wine',
  navigate: ['navigateTo'],
  data () {
    return {
      count: 0
    }
  }
}
</script>
<style lang="scss" scoped>
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
  .btn{
    width: 100%;
    height: 98rpx;
    background:rgba(255,224,1,1);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    text-align: center;
    line-height: 98rpx;
  }
  .client_desc{
    width: 100%;
    height: 200rpx;
    background: #fff;
    margin-bottom: 140rpx;
  }
</style>
