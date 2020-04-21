<template>
  <view class="product-details p-tb-20 p-lr-30">
    <swiper
      class="swiper"
      :indicatorDots="false"
      :circular="true"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
       v-if="!noData"
    >
      <swiper-item v-for="(item,index) in item" :key="index">
        <view class="swiper-item">
          <image :src="item"  @error='imgerr'/>
        </view>
      </swiper-item>
    </swiper>
    <view class="goods-item p-lr-20 m-bottom-20"  v-if="!noData">
      <view class="top-view f28 m-top-10 f28"  v-if="product_type === 'product' ">{{list.product.product_name}}</view>
      <view class="top-view f28 m-top-10 f28"  v-if="product_type === 'service' ">{{list.service_name}}</view>
      <view class="top-view f28 m-top-10 f28"  v-if="product_type === 'setmeal' ">{{list.setmeal_name}}</view>
      <view class="botm-view" v-if="product_type === 'product' ">
        <view class="f22">
          <text class="price">￥{{list.sku_price}}</text>
        </view>
        <min-stepper v-model="count"></min-stepper>
      </view>
       <view class="botm-view" v-if="product_type === 'setmeal' ">
        <view class="f22">
          <text class="price">￥{{list.setmeal_price}}</text>
        </view>
        <min-stepper v-model="count"></min-stepper>
      </view>
      <!-- 服务商品 -->
      <view class="botm-view" v-if="product_type === 'service'">
        <view class="f22">
          <text class="price">￥{{list.service_price}}</text>
        </view>
      </view>
    </view>
     <min-describe @chincesku="selSku" :sku="list.sku.sku_full_name" leftTxt="规格" v-if="product_type === 'product'"></min-describe>
     <min-describe @chincesku='toDetail' :sku="list.combination[0].combination_name" leftTxt="套餐组合" v-if="product_type === 'setmeal'"></min-describe>

    <view class="introduction m-top-20 p-lr-20"  v-if="!noData">
        <view class="title min-border-bottom m-bottom-30">详细介绍</view>
        <view class="content p-bottom-30" v-if="product_type === 'product'">{{list.product.info}}</view>
        <view class="content p-bottom-30" v-if="product_type === 'service'">{{list.service_info}}</view>
        <view class="content p-bottom-30" v-if="product_type === 'setmeal'">{{list.setmeal_info}}</view>
    </view>

    <min-goods-submit
      v-if="type != 1 && type != 2 "
      icon="../../static/images/cart.png"
      :goodsCount="countNums"
      :totalAmount="totalAmountE "
      totalLabel="赠送额度：1000"
      buttonText="确定赠送"
      @leftClick="leftClick"
    ></min-goods-submit>
     <!-- 选择规格 -->
    <min-popup :show="isSelSku"  @close='closeSelectedSkuPop'>
      <view class="skuPop">
        <view class="skuTop">
          <view class="leftView">
              <view class="img-view">
                <image :src="errImg ? '/static/images/goods.png': skuObj.sku_img" @error="imgerr"></image>
              </view>
              <!-- sku信息 -->
              <view class="sku-view">
                <text class="f22">{{skuObj.sku}}</text>
               <!-- <text class="f22 m-tb-20">已选："{{skuObj.sku}}"</text> -->
                <text class="f22 m">￥<text class="money">{{list.sku_price}}</text></text>
              </view>
          </view>
        </view>
        <view class="min-border-bottom m-lr-30"></view>
        <!-- 可选择规格项 -->
        <view class="sku-item">
            <view class="f26">规格</view>
            <view class="item-view" >
                <view class="item-active">{{skuObj.sku_full_name}}</view>
            </view>
        </view>
        <!-- 数量 -->
        <!-- <view class="sku-item sku-item-num" v-if="type !== 1 && type!==2">
            <view class="f26">数量</view>
            <view class="m-tb-30">
                <min-stepper :isAnimation="false" :min='1' v-model="skuObj.step"></min-stepper>
            </view>
        </view> -->
        <view class="min-border-bottom m-lr-30"></view>
        <view class="btn-sku" @click="skuChioce">确定</view>
      </view>
    </min-popup>
    <!-- 已选商品 -->
  <min-popup :show="selected" @close='closeSelectedSkuPop1'>
    <view class="popview">
        <view class="p-lr-20">
            <view class="top-view min-border-bottom">
              <text>已选商品</text>
              <view class="right-view" @click="delAll">
                <view class="icon-del m-right-10">
                  <image src='../../static/images/del.png'/>
                </view>
                <text class="f22 clear" @click="delAll">清空</text>
              </view>
            </view>
        </view>
        <view class="main-sel-view p-lr-30 p-tb-30" >
            <view class="item" v-for="(item2,n) in selArr" :key="n" >
              <!-- <view v-if="!item2.test"> -->
                  <image   :src="errImg ? '/static/images/goods.png': item2.product_img" mode=""  @error="imgerr"/>
                  <view   class="content-view">
                    <view class="right-view-title">
                      <text class="f28 t" style="display:block">{{item2.product_name}}</text>
                      <text class="f26" style="color:#666666">规格：{{item2.sku.sku_full_name}}</text>
                    </view>
                    <view class="right-view-bottom">
                      <view class="right-view-bottom-desc" >
                        <text class="f20 t">￥<text  style="color:#FF0000;font-size:30">{{item2.sku.price}}</text></text>
                      </view>
                      <view class="steper">
                        <min-stepper v-model="item2.step" :isAnimation="false" :min='0' @change="aleradyGood($event,n)"></min-stepper>
                        <!-- <view v-if="!isDel" @click="delItem(n)">删除</view> -->
                      </view>
                    </view>
                  </view>
              <!-- </view> -->
            </view>
        </view>
        <!-- <view class="empty-view"></view> -->
        <view class="bottom-view-t">
          <min-goods-submit
          style="position:fixed"
          leftText="已选"
          :totalAmount='totalAmountE'
          :goodsCount="countNums"
          buttonText='去下单'
          buttonLabel='已开台'
          ></min-goods-submit>
        </view>
    </view>
  </min-popup>
    <min-404 v-if="noData" id='none'></min-404>
  </view>
</template>

<script>
export default {
  name: 'product-detail-giveaway',
  navigate: ['navigateTo'],
  data () {
    return {
      item: [],
      autoplay: true,
      interval: 2000,
      duration: 500,
      count: 0,
      product_id: Number,
      type: Number,
      product_type: 'product',
      list: { product: { product_name: '' }, sku: { sku_full_name: '' } },
      isSelSku: false,
      skuObj: { sku: [{ sku_full_name: '' }] },
      chioceIndex: 0,
      noData: false,
      selected: false,
      selArr: [],
      errImg: false,
      indexL: 0,
      lastStep: 0,
      flag: true
    }
  },
  computed: {
    // 合计金额
    totalAmountE () {
      let sum = 0
      this.selArr.map(item => {
        sum += item.step * item.sku.price
      })
      return sum.toFixed(2)
    },
    // 监听所选数量
    countNums () {
      let num = 0
      for (let i = 0; i < this.selArr.length; i++) {
        num += this.selArr[i].step
      }
      return num
    }
  },
  watch: {
    lastStep: function (a) {
      if (a > 0) {
        console.log(this.selArr)
        this.goodsChange()
      }
    }
  },
  onLoad (option) {
    console.log(option)
    this.product_id = option.product_id
    this.product_type = option.product_type
  },
  mounted () {
    if (this.product_type === 'product') {
      this.$minApi.getGiveAwayProductDetail({ sku_id: this.product_id })
        .then(res => {
          this.list = res
          // this.list.step = 1
          console.log(res)
          this.item = []
          this.item.push(this.list.product.product_img)
        })
        .catch(() => {
          this.noData = true
        })
    } else if (this.product_type === 'service') {
      this.$minApi.getGiveAwayServeDetail({ service_id: this.product_id })
        .then(res => {
          console.log('21321321213')
          this.list = res.info
          this.list.step = 1
          console.log(this.list)
          this.item = []
          this.item.push(this.list.main_img)
        })
        .catch(() => {
          this.noData = true
        })
    } else if (this.product_type === 'setmeal') {
      this.$minApi.getGiveAwaySetmealDetail({ setmeal_id: this.product_id })
        .then(res => {
          // console.log('21321321213')
          this.list = res.info
          this.list.step = 1
          console.log(res)
          this.item = this.list.setmeal_images
        })
        .catch(() => {
          this.noData = true
        })
    }
  },
  methods: {
    // 选择规格事件
    selSku (index, index2) {
      this.isSelSku = true
      this.skuObj = this.list.sku
      console.log('skuObj', this.skuObj)
    },
    /**  关闭选择规格弹出层 */
    closeSelectedSkuPop () {
      this.isSelSku = false
    },
    // 选择规格确定
    skuChioce () {
      this.closeSelectedSkuPop()
      const obj = {}
      Object.assign(obj, this.skuObj)
      obj.sku = this.skuObj.sku[this.chioceIndex]
      this.addGoods(obj)
    },
    // 选择规格
    chioceO (index) {
      this.chioceIndex = index
    },
    // 已选商品关闭
    closeSelectedSkuPop1 () {
      this.selected = false
    },
    toDetail (id) {
      uni.navigateTo({
        url: './setmealdetail?setmeal_id=' + this.product_id
      })
    },
    // 已选商品统一列表方法
    addGoods (obj) {
      const result = this.selArr.some(item => {
        if (item.sku.sku_id === obj.sku.sku_id) {
          item.step = obj.step
          return true
        }
      })
      if (!result) {
        this.selArr.push(obj)
        this.$store.dispatch('goods/setselected_products', this.selArr)
      }
      // this.selArr.map((item, index) => {
      //   this.list.sku.map((item2, index2) => {
      //     if (item.sku.sku_id === item2.sku_id) {
      //       this.indexL = index
      //     }
      //   })
      // })
    },
    // 已选商品删除事件
    aleradyGood (e, index) {
      if (e === 0) {
        this.selArr.splice(index, 1)
        this.$store.dispatch('goods/setselected_products', this.selArr)
      }
    },
    // 图片错误
    imgerr (e) {
      if (e.type === 'error') {
        this.item = []
        this.item.push('../../static/images/bid-goods.png')
        this.errImg = true
      }
    },
    // 已选商品
    leftClick () {
      this.selected = true
    },
    // 已选商品清空
    delAll () {
      this.selArr = []
      this.$store.dispatch('goods/setselected_products', this.selArr)
    },
    // 商品详情计数器
    goodsChange () {
      if (this.list.sku.length > 0) {
        const obj = {}
        const skuOne = this.list.sku[this.chioceIndex]
        Object.assign(obj, this.list)
        obj.sku = skuOne
        this.addGoods(obj)
        console.log(this.selArr)
      }
      this.selArr.map((item, index) => {
        this.list.sku.map((item2, index2) => {
          if (item.sku.sku_id === item2.sku_id) {
            this.indexL = index
            item2.step = item.step
          }
        })
      })
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
      margin-bottom: 10rpx;
      .btn{
        width: 100rpx;
        height: 48rpx;
        background: #ffe001;
        border-radius: 24rpx;
        color: #333333;
        text-align: center;
        line-height: 48rpx;
        font-size: 24rpx;
      }
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
  // 选择规格弹出
  .skuTop {
    width: 100%;
    height: 180rpx;
    margin: 30rpx 0;
    display: flex;
    padding: 0 30rpx;

    .leftView {
      flex: 1;
      display: flex;

      .img-view {
        width: 180rpx;
        height: 180rpx;
        margin-right: 20rpx;

        image {
          width: 100%;
          height: 100%;
        }
      }

      .sku-view {
        display: flex;
        flex-direction: column;
        justify-content:space-between;
        align-content: flex-end;

        .m {
          color: #ff0000;

          .money {
            font-weight: bold;
            color: #ff0000;
          }
        }
      }
    }

    .rightView {
      width: 34rpx;
      height: 34rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }
  }

  .sku-item {
    margin: 0 30rpx;
    padding: 30rpx 0;
    padding-bottom: 10rpx;
    height: 300rpx;
    overflow: auto;

    .item-view {
      margin-top: 20rpx;
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .item {
        padding: 0 20rpx;
        word-wrap: none;
        height: 58rpx;
        border: 1px solid rgba(51, 51, 51, 1);
        border-radius: 10rpx;
        margin-right: 20rpx;
        margin-bottom: 20rpx;
        text-align: center;
        line-height: 58rpx;
      }

      .item-active {
        padding: 0 20rpx;
        word-wrap: none;
        height: 58rpx;
        border: 1px solid #fe432a;
        border-radius: 10rpx;
        margin-right: 20rpx;
        margin-bottom: 20rpx;
        text-align: center;
        line-height: 58rpx;
      }
    }
  }

  .sku-item-num {
    height: 200rpx;
  }

  .btn-sku {
    width: 100%;
    height: 98rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #ffe001;
    text-align: center;
    line-height: 98rpx;
    font-size: 32rpx;
    color: #333;
  }
.popview{
  .top-view{
    width: 100%;
    height: 83rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .clear{
      color: #666
    }
    .right-view{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      .icon-del{
        width: 22rpx;
        height: 22rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        image{
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
