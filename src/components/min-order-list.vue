<template>
  <view class="min-order-list">
      <view class="main" v-for="(item,index) in list" :key="index" @click="toDetail(item.id)">
          <view class="top-view min-flex">
            <view class="left-view min-flex min-flex-main-start">
               <text v-if="isShowPlatform"  class="f20 m-right-10 radius-b" :class="item.source === 0 ? 'active-left-p' : 'active-left-m' ">{{item.source === 0 ?  '门店' : (item.source === 1 ? '平台' :'赠送' )}}</text>
               <text class="f26 m-left-20">单号：{{item.order_sn}}</text>
            </view>
            <text class="right-txt f28"  :class="status[item.order_status].color">{{status[item.order_status].desc}}</text>
          </view>
          <view v-if="item.order_product_list.length < 2">
            <view class="mid-view min-border-top ">
                <view class="left-view">
                  <view class="left-photo" v-for="(i,n) in item.order_product_list" :key="n">
                    <image :src="i.product_img" />
                  </view>

                  <view class="mid-desc">
                      <text class="f28 fcolor title">{{i.product_name}}</text>
                      <text class="tcolor f22 desc">{{i.sku}}</text>
                  </view>
                </view>
                <view class="right-price">
                  <text class="fcolor f28 testF">￥ {{item.order_price}}</text>
                  <text class="tcolor f22 m-top-20">x {{i.quantity}}</text>
                </view>
            </view>
          </view>
          <view v-if="item.order_product_list.length > 2">
            <view class="mid-view min-border-top ">
                <view class="left-view">
                  <view class="left-photo m-right-20" v-for="(i,n) in item.order_product_list" :key="n">
                    <image :src="i.product_img" @error="imageErro($event,index,n)"/>
                    <!-- <image src="../static/images/goods.png" style="width:100rpx;height:100rpx"/> -->

                  </view>
                </view>
                <view class="right-price">
                  <text class="fcolor f28">￥ {{item.order_price}}</text>
                </view>
            </view>
            <text class="f20 origin sign" >{{order[item.order_type].desc }}</text>
            <text class="allin f22 tcolor">查看全部 >></text>
          </view>
           <view class="bottom-view min-border-top">
              <text class="f24 tcolor">{{$minCommon.formatDate(new Date(item.create_time * 1000), 'yyyy-MM-dd hh:mm:ss')}}</text>
              <text class="f28 fcolor">{{item.pay_type === 0 ? '先付款':'后付款'}}&nbsp;{{item.pay_status === 0 ? '未支付':'已支付'}}</text>
          </view>
      </view>
  </view>
</template>
<script>

// 订单状态（0：待付款，1：待确认，2：待出品，3：出品中，4：已出品，5：已完成，-1：待补差价，-2：已取消，-3：已退单，-4：改价作废，-5：换货作废，-6：退货作废）
// 1 待支付 2 待补差价 6 出品中（#FF0000）  ||  3 待确认  4  待出品 （#39BA01）  ||  7 已完成  5  已出品 （#0090FF）
// 来源
const status = [
  { desc: '待付款', color: 'red' },
  { desc: '待确认', color: 'green' },
  { desc: '待出品', color: 'red' },
  { desc: '出品中', color: 'blue' },
  { desc: '已出品', color: 'blue' },
  { desc: '已完成', color: 'origin' }
]
// （0：普通单，1：改价单，2：部分退货，3：整单退货，4：换货，5：开台单）
const order = [
  { desc: '普通单', color: 'red' },
  { desc: '改价单', color: 'green' },
  { desc: '部分退货', color: 'red' },
  { desc: '整单退货', color: 'blue' },
  { desc: '换货', color: 'blue' },
  { desc: '开台单', color: 'origin' }
]

export default {
  data () {
    return {
      isSetMeal: false,
      status,
      order
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
  },
  methods: {
    imageErro (e, index, n) {
      if (e.type === 'error') {
        this.list[index].order_product_list[n].product_img = 'https://seller-admin-dev.oss-cn-hangzhou.aliyuncs.com/store/default/20200410/ef0fc202004100939173542.png'
      }
    },
    toDetail (id) {
      this.$minRouter.push({
        name: 'order-detail',
        params: { ordr_id: id }
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
