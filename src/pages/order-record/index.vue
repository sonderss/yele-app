<template>
  <view class="min-order-list  p-tb-20 p-lr-30">
      <view class="main" v-for="(item,index) in list" :key="index" @click="goDetail(index)">
          <view class="top-view min-flex">
            <view class="left-view min-flex min-flex-main-start">
               <text class="f30 ordern">{{item.desk_name}}</text>
            </view>
            <text class="right-txt f28" :class="status[item.order_status].class">{{status[item.order_status].desc}}</text>
          </view>
          <!-- <view v-if="!item.isSetMeal">
            <view class="mid-view min-border-top ">
                <view class="left-view">
                  <view class="left-photo" v-for="(i,n) in item.pic" :key="n">
                    <image :src="i.img" />
                  </view>

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
          </view> -->
          <view >
            <view class="mid-view min-border-top "  >
                <view class="left-view" >
                  <view class="left-photo m-right-20" v-for="(i,n) in item.product" :key="n">
                    <image :src="i.product_img.length>10? i.product_img :'/static/images/goods.png'" />
                  </view>
                </view>
                 <!-- 当图片不超过1张时 -->
                <view class="mid-desc" v-if="item.product.length ===1">
                      <text class="f28 fcolor title">{{item.product_name}}</text>
                      <text class="tcolor f22 desc">{{item.sku_full_name}}</text>
                </view>
                <view class="right-price" v-if="item.product.length ===1">
                  <text class="fcolor f28 testF">￥ {{item.order_price}}</text>
                  <text class="tcolor f22 m-top-20">x {{item.product[0].quantity}}</text>
                </view>
                <view class="right-price" v-if="item.product.length > 1">
                  <text class="fcolor f28">￥ {{item.order_price}}</text>
                    <text class="allin f22 tcolor">查看全部 >></text>
                </view>
            </view>
            <!-- <text class="f20 origin sign" >{{item.sign}}</text> -->

          </view>
           <view class="bottom-view min-border-top">
              <text class="f24 tcolor">{{$minCommon.formatDate(new Date(item.create_time*1000),'yyyy-MM-dd hh:mm:ss')}}</text>
              <text class="f28 fcolor">{{item.pay_type === 0 ? '先付款' : '后付款'}}*{{item.pay_status === 0 ? '未支付':'已支付'}}</text>
          </view>
      </view>
  </view>
</template>
<script>
// 1 待支付 2 待补差价 6 出品中（#FF0000）  ||  3 待确认  4  待出品 （#39BA01）  ||  7 已完成  5  已出品 （#0090FF）
// 订单状态（0：待付款，1：待确认，2：待出品，3：出品中，4：已出品，5：已完成，-1：待补差价，-2：已取消，-3：已退单，-4：改价作废，-5：换货作废，-6：退货作废）
const status = [
  { desc: '待付款', class: 'red' },
  { desc: '待确认', class: 'green' },
  { desc: '待出品', class: 'origin' },
  { desc: '出品中', class: 'blue' },
  { desc: '已出品', class: 'blue' },
  { desc: '已完成', class: 'green' },
  { desc: '待补差价', class: 'red' },
  { desc: '已取消', class: 'tcolor' },
  { desc: '已退单', class: 'red' },
  { desc: '改价作废', class: 'fcolor' },
  { desc: '换货作废', class: 'tcolor' },
  { desc: '退货作废', class: 'fcolor' }

]
export default {
  name: 'order-record',
  navigate: ['navigateTo'],
  data () {
    return {
      status,
      isSetMeal: false,
      list: []
    }
  },
  mounted () {
    this.$minApi.getOrderList().then(res => {
      this.list = res.list
      console.log(this.list)
    })
  },
  methods: {
    goDetail (index) {
      // 这里跳转订单详情
      this.$minRouter.push({
        name: 'order-detail'
      })
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
      .ordern{
        font-weight: bold;
        margin-left: 20rpx;
      }
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
        align-content: space-between;
        // .testF{
        //   font-family: "SimSun"
        // }
    }
  }
  .allin{
    float: right;
    // margin-bottom: 20rpx;
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
