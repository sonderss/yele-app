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
      <view class="top-view f28 m-top-10 f28"  v-if="product_type === 'product' ">{{list.product_name}}</view>
      <view class="top-view f28 m-top-10 f28"  v-if="product_type === 'service' ">{{list.product_name}}</view>
      <view class="top-view f28 m-top-10 f28"  v-if="product_type === 'setmeal' ">{{list.setmeal_name}}</view>
      <view class="botm-view" v-if="product_type === 'product' ">
        <view class="f22">
          <text class="price">￥{{list.price}}</text>
        </view>
        <min-stepper v-model="list.step" @change="changeServiceItem(list)" :max="commodity_count"></min-stepper>
      </view>
       <!-- <view class="botm-view" v-if="product_type === 'setmeal' ">
        <view class="f22">
          <text class="price">￥{{list.setmeal_price}}</text>
        </view>
        <min-stepper v-model="count"></min-stepper>
      </view> -->
      <!-- 服务商品 -->
      <view class="botm-view" v-if="product_type === 'service'">
        <view class="f22">
          <text class="price">￥{{list.price}}</text>
        </view>
        <min-stepper v-model="list.step"  :max="commodity_count" @change="changeServiceItem(list)"></min-stepper>
      </view>
    </view>
     <min-describe @chincesku="selSku" :sku="list.sku[0].sku_full_name" leftTxt="规格" v-if="product_type === 'product'"></min-describe>

    <view class="introduction m-top-20 p-lr-20"  v-if="!noData">
        <view class="title min-border-bottom m-bottom-30">详细介绍</view>
        <view class="content p-bottom-30" v-if="product_type === 'product'">{{list.info}}</view>
        <view class="content p-bottom-30" v-if="product_type === 'service'">{{list.info}}</view>
        <view class="content p-bottom-30" v-if="product_type === 'setmeal'">{{list.info}}</view>
    </view>

    <min-goods-submit
      v-if="type != 1 && type != 2 "
      icon="../../static/images/cart.png"
      :goodsCount="countNums"
      :totalAmount="totalAmountE "
      :totalLabel="totalLabel"
      buttonText="确定赠送"
      @leftClick="leftClick"
      @submit="submit"
    ></min-goods-submit>
     <!-- 选择规格 -->
   <min-popup :show="isSelSku"  @close='closeSelectedSkuPop'>
      <view class="skuPop">
        <view class="skuTop">
          <view class="leftView">
              <view class="img-view">
                <image :src="errImg ? '/static/images/goods.png': skuObj.product_img" @error="imgerr"></image>
              </view>
              <!-- sku信息 -->
              <view class="sku-view">
                <text class="f22">{{skuObj.product_name}}</text>
                <text class="f22 m-tb-20">已选："{{skuObj.sku[chioceIndex].sku_full_name}}"</text>
                <text class="f22 m">￥<text class="money">{{skuObj.price}}</text></text>
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
        <!-- 数量 -->
        <view class="sku-item sku-item-num">
            <view class="f26">数量</view>
            <view class="m-tb-30">
                <min-stepper :isAnimation="false" :max="commodity_count"  v-model="skuObj.step"></min-stepper>
            </view>
        </view>
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
                  <image src='/static/images/del.png'/>
                </view>
                <text class="f22 clear">清空</text>
              </view>
            </view>
        </view>
        <view class="main-sel-view p-lr-30 p-tb-30" >
            <view class="item" v-for="(item2,n) in selArr" :key="n" >
                  <image   src="/static/images/goods.png" mode=""  />
                  <!-- 已选服务商品 -->
                  <view   class="content-view" >
                    <view class="right-view-title" >
                      <text class="f28 " style="display:block">{{item2.product_name}}</text>
                      <text  class="f28 " v-if="product_type === 'product'">规格:{{item2.sku[0].sku_full_name}}</text>
                      <text class="f26 t" >￥{{item2.price}}</text>
                    </view>
                    <view class="right-view-bottom">
                      <view class="steper">
                        <!--  @change="aleradyGood($event,n)" -->
                        <min-stepper  @change="aleradyGood($event,n)" :max="commodity_count" v-model="item2.step" :isAnimation="false" :min='0'></min-stepper>
                      </view>
                    </view>
                  </view>
            </view>
        </view>
        <view class="bottom-view-t">
          <min-goods-submit
          style="position:fixed"
          leftText="已选"
          :totalAmount='totalAmountE'
          :goodsCount="countNums"
          buttonText='确定赠送'
          @submit="submit"
          ></min-goods-submit>
        </view>
    </view>
  </min-popup>
    <min-404 v-if="noData" id='none'></min-404>
    <min-modal ref="test"></min-modal >

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
      list: {sku:[{sku_full_name:""}]},
      isSelSku: false,
      skuObj: { sku: [{ sku_full_name: '' }] },
      chioceIndex: 0,
      noData: false,
      selected: false,
      selArr: [],
      errImg: false,
      indexL: 0,
      lastStep: 0,
      flag: true,
      content: '',
      totalLabel: '',
      commodity_count: '',
      desk_id: '',
      delArr:[]
    }
  },
  computed: {
    // 合计金额
    totalAmountE () {
      let sum = 0
      this.selArr.map(item => {
        if (item.type === 'product') {
          sum += item.step * item.price
        } else {
          sum += item.step * item.price
        }
        this.$store.dispatch('goods/setStoreSelArr', this.selArr)
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
  onLoad (option) {
    console.log(option)
    const info = this.$store.state.goods.giveAwayInfo
    console.log(info)
    this.product_id = option.product_id
    this.product_type = option.product_type
    this.commodity_count = option.commodity_count
    this.desk_id = option.desk_id
    console.log('从全局变量中获取已选商品列表', this.$store.state.goods.storeSelArr)
    this.selArr = this.$store.state.goods.storeSelArr
    this.content = `
          1. 当前台消费金额￥${info.consumption_amount}，根据赠送方案，可赠送的商品金额为￥${info.desk_presentation_limit}。<br />
          2. 当前用户的赠送额度为￥${info.personal_presentation_limit}，不能超过此额度。<br />
          3. 不同商品的可赠数量不同，不能超过最高可赠数量 <br />
      `
    // this.$store.dispatch('goods/setselected_giveAwayInfo', { consumption_amount: res.consumption_amount, desk_presentation_limit: res.desk_presentation_limit, personal_presentation_limit: res.personal_presentation_limit })
    this.totalLabel = `赠送额度：${info.desk_presentation_limit}`
  },
  onNavigationBarButtonTap (e) {
    this.$refs.test.handleShow({
      title: e.text,
      content: this.content,
      showCancel: false,
      success: (e) => {
        console.log(e) // 这里拿到的是modalID: "modal"，id: 1
      }
    })
  },
  watch: {
     selArr: {
      handler (a, b) {
        a.map((item,index) => {
          if(item.step === 0){
             return this.delArr.push(index)
          }
        })
         this.$store.dispatch('goods/setStoreSelArr', this.selArr)
      },
      deep: true
    },
    delArr(a){
      a.map(item => {
        this.selArr.splice(item,1)
      })
    }
  },
  mounted () {
    if (this.selArr.length > 0) {
      this.selArr.map(item => {
        if (item.type === 'service') {
          this.list = item
          this.item = []
            this.list.step = 0
          this.item.push(this.list.product_img)
          console.log(this.list)
        }
        if (item.type === 'product') {
          this.list = item
          this.item = []
           this.list.step = 0
          this.item.push(this.list.product_img)
          console.log(this.list)
        }
      })
      return
    }
    if (this.product_type === 'product') {
      this.$minApi.getGiveAwayProductDetail({ sku_id: this.product_id })
        .then(res => {
          this.list = res.info
          this.list.type = this.product_type
          // this.list.step = 1
          console.log('product', res)
          this.item = []
          this.item.push(this.list.product_img)
        })
        .catch(() => {
          this.noData = true
        })
    } else if (this.product_type === 'service') {
      this.$minApi.getGiveAwayServeDetail({ service_id: this.product_id })
        .then(res => {
          this.list = res.info
          this.item = []
          this.item.push(this.list.product_img)
          this.list.type = this.product_type
          this.list.id = this.product_id * 1
          console.log('服务商品', this.list)
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
      Object.assign(this.skuObj,this.list)
      this.skuObj.step = 1
      console.log('skuObj', this.skuObj)
    },
    /**  关闭选择规格弹出层 */
    closeSelectedSkuPop () {
      this.isSelSku = false
    },
    changeServiceItem (e) {
      this.addGoods(e)
    },
     // 已选商品删除事件
    aleradyGood (e, index) {
              let id = Number
              if(this.selArr[index].type === 'service'){id = this.selArr[index].id}
              if(this.selArr[index].type === 'product'){id = this.selArr[index].sku[0].id }
              console.log("  this.list",  this.list);
                    if(this.list.type === 'service' && id === this.list.id){
                         this.$set(this.list,"step",e)
                    }
                    if(this.list.type === 'product' && this.list.sku.length === 1 && id === this.list.sku[0].id){
                       this.$set(this.list,"step",e)
                    }
    },
    // 选择服务商品
    addGoodServe (e) {
      console.log('addGoodServe')
      const result = this.selArr.some((item, index) => {
        if (item.id === e.id) {
          return true
        }
      })
      if (!result) {
        this.selArr.push(e)
        // 存到全局变量
        this.$store.dispatch('goods/setStoreSelArr', this.selArr)
        console.log('已选赠送商品全局变量', this.$store.state.goods.storeSelArr)
      }
      console.log(this.selArr)
    },
    // 选择规格确定
    skuChioce () {
      const obj = {}
      Object.assign(obj, this.skuObj)
      console.log(this.list.sku[this.chioceIndex]);
      // obj.sku = this.list.sku[this.chioceIndex]
      this.list.step = obj.step
      this.addGoods(obj)
      this.closeSelectedSkuPop()
    },
    // 选择规格
    chioceO (index) {
      this.chioceIndex = index
    },
    // 已选商品关闭
    closeSelectedSkuPop1 () {
      this.selected = false
    },

    // 已选商品统一列表方法
    addGoods (obj) {
      console.log('obj', obj)
      const result = this.selArr.some((item, index) => {
        if (obj.type === 'product') {
          if (item.sku[0].id === obj.sku[0].id) {
            item.step = obj.step
            return true
          }
        } else if (obj.type === 'service') {
          if (item.id === obj.id) {
            console.log(item, obj)
            // item.step = obj.step
            return true
          }
        }
      })
      if (!result) {
        this.selArr.push(obj)
        console.log(this.selArr);
        this.$store.dispatch('goods/setStoreSelArr', this.selArr)
      }
    },
    // // 已选商品删除事件
    // aleradyGood (e, index) {
    //   if (e === 0) {
    //     this.selArr.splice(index, 1)
    //     this.$store.dispatch('goods/setStoreSelArr', this.selArr)
    //   }
    // },
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
      // this.selArr = []
      // this.$store.dispatch('goods/setStoreSelArr', this.selArr)
      this.selArr.map((item,index) => {
            this.delArr.push(index)
      })
      this.list.step = 0
    },
    // 提交赠送商品
    submit () {
      if (this.selArr.length === 0) return this.$showToast('请选择赠送商品')
      console.log('准备提交', this.selArr)
      // [{"id":1,"type":"service","quantity":1,"sku_id":0,"combination":[]}
      const products = []
      this.selArr.map(item => {
        const obj = {}
        if (item.type === 'setmeal') {
          if (item.type === 'setmeal') {
            obj.combination = item.combination
            obj.id = item.id
            obj.quantity = item.step
            obj.type = item.type
            obj.sku_id = 0
          }
        }
        if (item.type === 'service') {
          obj.id = item.id
          obj.sku_id = 0
          obj.type = item.type
          obj.quantity = item.step
        } else if (item.type === 'product') {
          obj.id = item.id
          obj.sku_id = item.sku[0].id
          obj.type = item.type
          obj.quantity = item.step
        }
        products.push(obj)
      })
      console.log(products)
      this.selArr = []
      this.$store.dispatch('goods/setStoreSelArr', [])
      this.postOrder(products)
    },
    // 请求提交数据
    postOrder (products) {
     
      this.$minApi.giveAwayOrder({
        desk_id: this.desk_id,
        products: JSON.stringify(products)
      }).then(res => {
        this.orderId = res.orderId
        this.$showToast('提交成功!')
        
        console.log('获取到赠送单ID', this.orderId)
        setTimeout(() => {
          uni.navigateTo({
            url: './giveawayorder?order_id=' + this.orderId
          })
        }, 2000)
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
      
        white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
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
        // flex-direction: column;
        justify-content: space-between;
        align-items: space-between;
        color: #333333;
        align-content: space-between;
        margin-bottom: 120rpx;
        .right-view-title{
               height: 100%;
               display: flex;
              flex-direction: column;
              justify-content: space-between;
          .t{
            width: 100%;
            color: red;
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
