<template>
  <view class="min-order-list">
      <view class="main" v-for="(item,index) in list" :key="index">
          <view class="top-view min-flex">
            <view class="left-view min-flex min-flex-main-start">
               <text v-if="isShowPlatform"  class="f20 m-right-10 radius-b" :class="item.platform ? 'active-left-p' : 'active-left-m' ">{{item.platform? "平台" : "门店" }}</text>
               <text class="f26 m-left-20">单号：{{item.oddnum}}</text>
            </view>
            <text class="right-txt f28" :class="(item.status.num === 1 ||item.status.num === 2 || item.status.num === 6 ) ? 'red' : (item.status.num === 3 || item.status.num ===  4) ? 'green': 'blue' ">{{item.status.desc}}</text>
          </view>
          <view v-if="!item.isSetMeal">
            <view class="mid-view min-border-top ">
                <view class="left-view">
                  <view class="left-photo" v-for="(i,n) in item.pic" :key="n">
                    <image :src="i.img" />
                  </view>
                  <!-- 当图片不超过1张时 -->
                  <view class="mid-desc">
                      <text class="f28 fcolor title">{{item.title}}</text>
                      <text class="tcolor f22 desc">{{item.desc}}</text>
                  </view>
                </view>
                <view class="right-price">
                  <text class="fcolor f28 testF">￥ {{item.price}}</text>
                  <text class="tcolor f22 m-top-20">x {{item.num}}</text>
                </view>
            </view>
          </view>
          <view v-if="item.isSetMeal">
            <view class="mid-view min-border-top ">
                <view class="left-view">
                  <view class="left-photo m-right-20" v-for="(i,n) in item.pic" :key="n">
                    <image :src="i.img" />
                  </view>
                </view>
                <view class="right-price">
                  <text class="fcolor f28">￥ {{item.price}}</text>
                </view>
            </view>
            <text class="f20 origin sign" v-if="item.sign">{{item.sign}}</text>
            <text class="allin f22 tcolor">查看全部 >></text>
          </view>
           <view class="bottom-view min-border-top">
              <text class="f24 tcolor">{{item.timer}}</text>
              <text class="f28 fcolor">{{item.result}}</text>
          </view>
      </view>
  </view>
</template>
<script>
// 1 待支付 2 待补差价 6 出品中（#FF0000）  ||  3 待确认  4  待出品 （#39BA01）  ||  7 已完成  5  已出品 （#0090FF）
export default {
  data () {
    return {
      isSetMeal: false
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    isShowPlatform: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  background: #fff;
    // box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    padding: 0 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20rpx;
  .top-view{
    width: 100%;
    height: 84rpx;
    .left-view{
      flex: 1;
      position: absolute;
      left: 30rpx;
      .active-left-p{
        width: 80rpx;
        height: 40rpx;
        background: #030313;
        color: #FFE001;
        display: block;
        text-align: center;
        line-height: 40rpx
      }
      .active-left-m{
        width: 80rpx;
        height: 40rpx;
        background: #FFE001;
        color: #030313;
        display: block;
        text-align: center;
        line-height: 40rpx
      }
    }
    .right-txt{
      width: 120rpx;
      text-align: right;
      position: absolute;
      right: 50rpx;
    }
  }
  .mid-view{
    flex: 1;
    padding: 30rpx 0;
    display: flex;
    justify-content: space-between;
    height: 160rpx;
    .left-view{
      display: flex;
        .left-photo{
          width: 100rpx;
          height: 100rpx;
          image{
            flex-shrink: 0;
          }
        }
        .mid-desc{
          margin-left: 20rpx;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-content: space-between;
          .title{
            width: 343rpx;
            // overflow: hidden;
            line-height: 30rpx
          }
          .desc{
            margin-top: 5rpx;
            width:300rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

          }
        }
    }

    .right-price{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: right;
        // .testF{
        //   font-family: "SimSun"
        // }
    }
  }
  .allin{
    float: right;
    margin-bottom: 20rpx;
  }
  .sign{
    width:68rpx;
    height:24rpx;
    background:rgba(254,232,230,1);
    border-radius:5rpx;
    padding:0 5rpx;
  }
  .bottom-view{
    height: 76rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  //公共样式
  .radius-b{
    border-radius:0px 20rpx 20rpx 0px;
  }
  .fcolor{
    color: #333333
  }
  .tcolor{
    color: #666666
  }
  .red{
    color: #FF0000
  }
  .green{
    color: #39BA01
  }
  .blue{
    color: #0090FF
  }
  .origin{
    color: #F7601B
  }
}

</style>
