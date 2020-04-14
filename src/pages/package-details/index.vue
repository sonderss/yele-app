<template>
  <view class="product-details p-tb-20 p-lr-30">
    <swiper
      class="swiper"
      :indicatorDots="false"
      :circular="true"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
    >
      <swiper-item v-for="(item,index) in list.setmeal_images" :key="index">
        <view class="swiper-item">
          <image :src="item" />
        </view>
      </swiper-item>
    </swiper>
    <view class="goods-item p-lr-20 m-bottom-20">
      <view class="top-view f28 m-top-10 f28">{{list.setmeal_name}}</view>
      <view class="botm-view">
        <view class="f22">
          ￥
          <text class="price">{{list.setmeal_price}}</text>
        </view>
        <min-stepper   @change='changeChioce'  v-model="count" v-if="type !== 3"></min-stepper>
      </view>
    </view>
    <min-describe  @chincesku="toDeatil" :sku="list.setmeal_combination[0].combination_name" leftTxt="套餐组合"></min-describe>
    <view class="introduction m-top-20 p-lr-20">
        <view class="title min-border-bottom m-bottom-30">详细介绍</view>
        <view class="content p-bottom-30">
            {{list.setmeal_info}}
        </view>
    </view>

    <min-goods-submit
      @leftClick='selectedEvent'
      v-if="type !== 3 "
      icon="../../static/images/cart.png"
      :goodsCount="goodsCount"
      totalLabel="台位低消：￥1000.00"
      buttonText="去下单"
    ></min-goods-submit>
    <!-- 已选商品 -->
  <min-popup :show="selected" @close='closeSelectedPop'>
    <view class="popview">
            <view class="top-view min-border-bottom ">
              <view>已选商品</view>
              <view class="right-view" @click="delAll">
                <view class="icon-del m-right-10">
                  <image src='../../static/images/del.png'/>
                </view>
                <view class="f22 clear">清空</view>
              </view>
            </view>

        <view class="main-sel-view p-lr-30 p-tb-30" >
            <view class="item" v-for="(item2,n) in selArr" :key="n" >
                <image :src="item2.product_img" mode="" />
                <view class="content-view">
                  <view class="right-view-title">
                    <text class="f28 t" style="display:block">{{item2.product_name}}</text>
                    <text class="f26" style="color:#666666">规格：{{item2.sku.sku_full_name}}</text>
                  </view>
                  <view class="right-view-bottom">
                    <view class="right-view-bottom-desc" >
                      <text class="f20 t">￥<text  style="color:#FF0000;font-size:30">{{item2.sku.price}}</text></text>
                    </view>
                    <view class="steper">

                      <min-stepper :isAnimation='false' v-model="item2.step"  :min='0' @change="alDel($event,n)"></min-stepper>
                      <!-- <view v-if="!isDel" @click="delItem(n)">删除</view> -->
                    </view>
                  </view>
                </view>
            </view>
        </view>

    </view>
  </min-popup>
     <!-- <view class="empty-view"></view> -->
        <!-- <view class="bottom-view-t">
          <min-goods-submit
          style="position:fixed"
          leftText="已选"
          :totalAmount='totalAmountE'
          :goodsCount="countNums"
          buttonText='去下单'
          buttonLabel='已开台'
          ></min-goods-submit>
        </view> -->
  </view>
</template>

<script>
export default {
  name: 'package-details',
  navigate: ['navigateTo'],
  data () {
    return {
      item: [
        '../../static/images/bid-goods.png',
        '../../static/images/bid-goods.png',
        '../../static/images/bid-goods.png'
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
      count: 0,
      type: Number,
      list: { setmeal_combination: [{ combination_name: '' }] },
      selAll: [],
      selNum: [],
      selected: false
      // isDel: true
    }
  },
  onLoad () {
    this.type = this.$parseURL().type
    this.selArr = this.$store.state.goods.selected_products
  },
  mounted () {
    this.$minApi.getOriderPackageDetails({ setmeal_id: this.$parseURL().setmeal_id })
      .then(res => {
        this.list = res.info
        console.log(this.list)
      })
  },
  computed: {
    goodsCount () {
      let num = 0
      for (let i = 0; i < this.$store.state.goods.selected_products.length; i++) {
        num += this.selArr[i].step
      }
      return num
    }
  },
  methods: {
    // 套餐2级
    toDeatil () {
      this.$minRouter.push({
        name: 'packages-detail',
        params: { type: this.type, setmeal_id: this.$parseURL().setmeal_id }
      })
    },
    /** 已选商品弹出事件 */
    selectedEvent () {
      this.selected = true
    },
    /** 关闭已选商品弹出层 */
    closeSelectedPop () {
      this.selected = false
    },
    // 步进器
    changeChioce () {
      console.log(this.list)
    },
    delAll () {
      this.selArr = []
      this.selNum = []
      this.$store.dispatch('goods/setselected_products', [])
    },
    // 已选弹出层删除事件
    alDel (n, index) {
      console.log(this.selArr)
      if (n === 0) {
        this.selArr.splice(index, 1)
        this.selNum.splice(index, 1)
        this.$store.dispatch('goods/setselected_products', this.selArr)
      }
    },
    // 删除选择项
    delItem (n) {
      this.selArr.splice(n, 1)
      this.selNum.splice(n, 1)
      // this.isDel = true
    }
  }
}
</script>
<style lang="scss" scoped>
//
.product-details {
  .swiper {
    width: 690rpx;
    height: 690rpx;
    .swiper-item {
      width: 100%;
      height: 100%;
    }
  }
  .goods-item {
    width: 100%;
    height: 118rpx;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top-view {
      color: #333333;
      font-weight: bold;
    }
    .botm-view {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        color: #ff0006;
        font-size: 28rpx;
        font-weight: bold;
      }
    }
  }
  .introduction {
    width: 100%;
    background: #fff;
    margin-bottom: 100rpx;
    .title{
      width: 100%;
      height: 86rpx;
      line-height: 86rpx;
    }
  }
}
// 已选商品的弹出层
.popview{
  .top-view{
    width: 100%;
    height: 83rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 83rpx;
    background-color: #fff;
    padding: 0 30rpx;
    .clear{
      color: #666
    }
    .right-view{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 83rpx;
      .icon-del{
        width: 22rpx;
        height: 22rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        image{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }

  }
  .main-sel-view{
    width: 100%;
    height: 620rpx;
    overflow: auto;
    .item{
      display: flex;
      margin-bottom: 10rpx;
      height: 140rpx;
      &>image{
        width: 140rpx;
        height: 140rpx;
        margin-right: 16rpx;
      }
      .content-view{
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: space-between;
        color: #333333;
        align-content: space-between;
        margin-bottom: 120rpx;
        .right-view-title{
          .t{
            width: 100%
          }
        }
        .right-view-bottom{
            height: 48rpx;
            display: flex;
            // position: relative;
            justify-content: space-between;
            .right-view-bottom-desc{
              display: flex;
              align-items: center;
            }
            .steper{
              // position: absolute;
              // right:0;
              display: flex;
              justify-content: flex-end;
              align-items: center;
            }
        }
      }
    }

  }
  .bottom-view-t{
    position: fixed;
    left: 0;
    bottom: 0;

  }
  .empty-view{
    width: 100%;
    height: 50rpx;
  }
}
</style>
