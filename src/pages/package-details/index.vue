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
      <view class="top-view f28 m-top-10 f28">{{list.product_name}}</view>
      <view class="botm-view">
        <view class="f22">
          ￥
          <text class="price">{{list.price}}</text>
        </view>
        <min-stepper  :isAnimation='false' @change='changeChioce($event)'  v-model="tcNum" ></min-stepper>
      </view>
    </view>
    <min-describe  @chincesku="toDeatil" :sku="list.combination[0].combination_name" leftTxt="套餐组合"></min-describe>
    <view class="introduction m-top-20 p-lr-20">
        <view class="title min-border-bottom m-bottom-30">详细介绍</view>
        <view class="content p-bottom-30">
            {{list.info}}
        </view>
    </view>

    <min-goods-submit
      @leftClick='selectedEvent'
      @submit="submit"
      :goodsCount="goodsCount"
      buttonText='去下单'
      :buttonLabel='buttonLabel'
      icon="../../static/images/cart.png"
      :totalAmount="totalAmountE"
      :totalLabel="totalLabel"
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
                    <text class="f26" style="color:#666666" v-if="item2.type = 'product' ">规格：{{item2.sku.sku_full_name}}</text>
                  </view>
                  <view class="right-view-bottom">
                    <view class="right-view-bottom-desc" >
                      <text class="f20 t" v-if="item2.type === 'product'">￥<text  style="color:#FF0000;font-size:30">{{item2.sku.sku_price}}</text></text>
                      <text class="f20 t" v-if="item2.type === 'service'">￥<text  style="color:#FF0000;font-size:30">{{item2.price}}</text></text>
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
    <!-- <min-goods-submit
          style="position:fixed"
          leftText="已选"
          :totalAmount='totalAmountE'
          :goodsCount="countNums"
          :totalLabel="totalLabel"
          buttonText='去下单'
          buttonLabel='已开台'
          @submit="submit"
    ></min-goods-submit> -->
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
      totalLabel: '2',
      buttonText: '2',
      count: 0,
      product_type: '',
      list: { combination: [{ combination_name: '' }] },
      selAll: [],
      selNum: [],
      selected: false,
      tcNum: 0,
      taocanItem: { combination: [] }
      // isDel: true
    }
  },
  onLoad () {
    this.product_type = this.$parseURL().product_type
    this.totalLabel = `台位低消：${this.$parseURL().minim_charge}`
    this.buttonLabel = this.$parseURL().is_open_desk ? '(已开台)' : '(未开台)'
    if (this.$parseURL().product && this.$parseURL().product.length > 0) {
      this.tcNum = 1
    }
  },
  mounted () {
    this.$minApi.getOriderPackageDetails({ setmeal_id: this.$parseURL().product_id })
      .then(res => {
        this.list = res.info
        this.list.type = 'setmeal'
        this.taocanItem.id = this.list.id
        this.taocanItem.type = 'setmeal'
        this.taocanItem.quantity = this.tcNum
        this.taocanItem.combination.push(this.$parseURL().product)
        console.log(this.list)
      })
  },
  onShow () {
    this.selArr = this.$store.state.goods.orderSelArr
    console.log(this.selArr)
  },
  computed: {
    // 合计金额
    totalAmountE () {
      let sum = 0
      this.selArr.map(item => {
        if (item.type === 'product') {
          sum += item.step * item.sku.sku_price
        }
        if (item.type === 'service') {
          sum += item.step * item.price
        }
        this.$store.dispatch('goods/setOrderSelArr', this.selArr)
      })
      return sum.toFixed(2)
    },
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
        params: { data: this.$parseURL() }
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
    changeChioce (e) {
      this.taocanItem.quantity = e
      console.log(this.taocanItem)
      // this.$minRouter.push({
      //   name: 'packages-detail',
      //   params: { type: this.product_type, setmeal_id: this.$parseURL().product_id }
      // })
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
    // 提交
    submit () {
      console.log('已选商品')
      console.log(this.$parseURL())
      if (this.selArr.length === 0) return this.$showToast('请选择商品')
      console.log('准备提交', this.selArr)
      // [{"id":1,"type":"service","quantity":1,"sku_id":0,"combination":[]}
      const products = []
      this.selArr.map(item => {
        const obj = {}
        // 类型为商品
        if (item.type === 'product') {
          obj.id = item.id
          obj.type = item.type
          obj.quantity = item.step
          obj.combination = []
          obj.sku_id = item.sku.id
        }
        // 类型为服务商品
        if (item.type === 'service') {
          obj.id = item.id
          obj.type = item.type
          obj.quantity = item.step
          obj.combination = []
        }
        // 类型为套餐
        products.push(obj)
      })
      console.log(products)

      this.$minApi.setOrder({
        desk_id: this.$parseURL().desk_id,
        products: JSON.stringify(products)
      }).then(res => {
        console.log(res)
        if (res.orderId) {
          this.$showToast('提交成功')
          setTimeout(() => {
            this.$minRouter.push({
              name: 'confirm-order',
              params: { order_id: res.orderId, desk_id: this.$parseURL().desk_id, open_status: this.$parseURL().is_open_desk ? 1 : 0 }
            }, 2000)
          })
        }
      })
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
