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
      <view class="top-view f28 m-top-10 f28"  v-if="type === 1">{{list.product_name}}</view>
      <view class="top-view f28 m-top-10 f28"  v-if="type === 2">{{list.service_name}}</view>
      <view class="botm-view" v-if="type != 1 && type != 2">
        <view class="f22">
          ￥
          <text class="price">6800</text>
        </view>
        <min-stepper  v-model="count" ></min-stepper>
      </view>
      <!-- 电子菜单 -->
      <view class="botm-view" v-if="type === 1">
        <view class="f22">
          <text class="price">￥{{list.sku.length === 0 ? '暂无数据': list.sku[0].price}}</text>
        </view>
        <view class="btn" v-if="list.sku.length >=1" @click="selSku">选规格</view>
      </view>
      <!-- 服务商品 -->
       <view class="botm-view" v-if="type === 2 ">
        <view class="f22">
          <text class="price">￥{{list.service_price}}</text>
        </view>
        <!-- <view class="btn" v-if="list.sku.length >=1" @click="selSku">选规格</view> -->
      </view>
    </view>
    <view class="introduction m-top-20 p-lr-20"  v-if="!noData">
        <view class="title min-border-bottom m-bottom-30">详细介绍</view>
        <view class="content p-bottom-30" v-if="type === 1">{{list.info}}</view>
        <view class="content p-bottom-30" v-if="type === 2">{{list.service_info}}</view>
    </view>

    <min-goods-submit
      v-if="type != 1 && type != 2 "
      icon="../../static/images/cart.png"
      :goodsCount="2"
      totalLabel="台位低消：￥1000.00"
      buttonText="去下单"
    ></min-goods-submit>
     <!-- 选择规格 -->
    <min-popup :show="isSelSku"  @close='closeSelectedSkuPop'>
      <view class="skuPop">
        <view class="skuTop">
          <view class="leftView">
              <view class="img-view">
                <image src='../../static/images/goods.png'></image>
              </view>
              <!-- sku信息 -->
              <view class="sku-view">
                <text class="f22">{{skuObj.product_name}}</text>
                <text class="f22 m-tb-20">已选："{{skuObj.sku[chioceIndex].sku_full_name}}"</text>
                <text class="f22 m">￥<text class="money">{{skuObj.sku[chioceIndex].price}}</text></text>
              </view>
          </view>
        </view>
        <view class="min-border-bottom m-lr-30"></view>
        <!-- 可选择规格项 -->
        <view class="sku-item">
            <view class="f26">规格</view>
            <view class="item-view" >
                <view :class="chioceIndex ===index ?   'item-active' : 'item' " @click="chioceO(index)" v-for="(item,index) in skuObj.sku" :key="index">{{item.sku_full_name}}</view>
            </view>
        </view>
        <view class="min-border-bottom m-lr-30"></view>
        <view class="btn-sku" @click="skuChioce">确定</view>
      </view>
    </min-popup>
    <min-404 v-if="noData" id='none'></min-404>
  </view>
</template>

<script>
export default {
  name: 'product-details',
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
      list: { sku: [] },
      isSelSku: false,
      skuObj: { sku: [{ sku_full_name: '' }] },
      chioceIndex: 0,
      noData: false
    }
  },
  onLoad () {
    // type为1时  电子菜单商品详情
    this.product_id = this.$parseURL().product_id
    this.type = this.$parseURL().type
    this.product_type = this.$parseURL().product_type
    console.log(this.type)
  },
  mounted () {
    if (this.product_type === 'product') {
      this.$minApi.getProductDetail({ product_id: this.product_id })
        .then(res => {
          this.list = res.info
          console.log(this.list)
          this.item = []
          this.item.push(this.list.product_img)
        })
        .catch(() => {
          this.noData = true
        })
    } else if (this.product_type === 'service') {
      this.$minApi.getServeDetail({ service_id: this.product_id })
        .then(res => {
          this.list = res.info
          console.log(this.list)
          this.item = []
          this.item.push(this.list.main_img)
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
      this.skuObj = this.list
    },
    /**  关闭选择规格弹出层 */
    closeSelectedSkuPop () {
      this.isSelSku = false
    },
    // 选择规格确定
    skuChioce () {
      this.closeSelectedSkuPop()
    },
    // 选择规格
    chioceO (index) {
      this.chioceIndex = index
    },
    // 图片错误
    imgerr (e) {
      if (e.type === 'error') {
        this.item = []
        this.item.push('../../static/images/bid-goods.png')
      }
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
        justify-content: flex-end;
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
</style>
