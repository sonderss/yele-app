<template>
<view class="list_box " style="overflow:auto;">

  <view class="left" :style="{marginTop: android  === 'android' ? '-50rpx' :'20rpx' }" v-if="mainArray.length !== 0">
      <view class="left_view">
          <scroll-view scroll-y="true"  :style="{ 'height':scrollHeight }">
            <view class="item"
              v-for="(item,index) in mainArray"
              :key="index"
              :class="{ 'active':index==leftIndex }"
              :data-index="index"
              @tap="leftTap(index)"
            >{{item.cate_name}}</view>
          </scroll-view>
      </view>
  </view>

  <view class="main" :style="{top: android  === 'ios' ? '-30rpx' :'-30rpx' }">
    <scroll-view enable-back-to-top  :style="{ 'height':scrollHeight }" scroll-y  @scroll="mainScroll" :scroll-into-view="scrollInto" :scroll-with-animation="true">
      <view v-for="(item,index) in mainArray"  :key="index" :id="`item-${index}`" >
        <view  v-for="(item2,index2) in item.product"  :key="index2" @click.stop="goDetails(index,index2)">
          <min-goods-chioce
            :image='item2.product_img'
            :discount='item2.is_limited === 1 ? true: false '
            :title="item2.product_name"
            :badgeTxt="item2.type === 'setmeal' ? '套餐': '' "
            :badge="item2.type === 'setmeal'? true : false "
            @changes='changeChioce(index,index2)'
            v-model="item2.step"
            :desc="item2.sku.length >=1 ?item2.sku[0].sku_full_name : '暂无商品描述' "
            :price="item2.sku.length >=1 ?item2.sku[0].sku_price : item2.price "
            >
          </min-goods-chioce>
        </view>
      </view>

      <view style="height:120rpx;"></view>
    </scroll-view>
  </view>
  <!-- 底部按钮 -->
  <view class="bottom-view" v-if="mainArray.length !== 0">
    <min-goods-submit leftText="已选"
      @leftClick='selectedEvent'
      :totalAmount='totalAmountE'
      :totalLabel='totalLabel'
      :goodsCount="countNums"
      buttonText='去下单'
      :buttonLabel="buttonLabel"
      @submit="submit"
      >
    </min-goods-submit>
  </view>
  <!-- 已选商品 -->
  <min-popup :show="selected" @close='closeSelectedPop'>

            <view class="top-view min-border-bottom ">
              <view>已选商品</view>
              <view class="right-view" @click="delAll">
                <view class="icon-del m-right-10">
                  <image src='/static/images/del.png'/>
                </view>
                <view class="f22 clear">清空</view>
              </view>
            </view>
            <view v-if="android === 'android'" style="height:100rpx"></view>
        <view class="main-sel-view p-lr-30 p-tb-30">
            <view class="item" v-for="(item2,n) in selArr" :key="n">
                <image :src="errImg ? '/static/images/goods.png': item2.product_img" mode="" @error="imageErro"/>
                <view class="content-view">
                  <view class="right-view-title">
                    <text class="f28 t" style="display:block">{{item2.product_name}}</text>
                    <text class="f26" style="color:#666666" v-if="item2.type === 'product'">规格：{{item2.sku.sku_full_name}}</text>
                  </view>
                  <view class="right-view-bottom">
                    <view class="right-view-bottom-desc" >
                      <text class="f20 t" v-if="item2.type === 'product'">￥<text  style="color:#FF0000;font-size:30">{{item2.sku.sku_price}}</text></text>
                      <text class="f20 t" v-if="item2.type === 'service'">￥<text  style="color:#FF0000;font-size:30">{{item2.price}}</text></text>
                      <text class="f20 t" v-if="item2.type === 'setmeal'">￥<text  style="color:#FF0000;font-size:30">{{item2.price}}</text></text>

                    </view>
                    <view class="steper">

                      <min-stepper :isAnimation='false' v-model="item2.step"  :min='0' @change="alDel($event,n)"></min-stepper>
                    </view>
                  </view>
                </view>
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
          :buttonLabel="buttonLabel"
          @submit="submit"
          ></min-goods-submit>
        </view>
  </min-popup>

   <!-- 选择规格 -->
    <min-popup :show="isSelSku" @close='closeSelectedSkuPop'>
      <!--  -->

        <view class="skuTop">
          <view class="leftView">
              <view class="img-view">
                <image :src="skuObj.product_img" @error="imageErro"></image>
              </view>
              <!-- sku信息 -->
              <view class="sku-view">
                <text class="f24">{{skuObj.product_name}}</text>
                <text class="f24 m-tb-10">已选："{{skuObj.sku[chioceIndex].sku_full_name}}"</text>
                <text class="f30 m">￥<text class="money">{{skuObj.sku[chioceIndex].sku_price}}</text></text>
              </view>
          </view>
        </view>
        <view class="min-border-bottom m-lr-30"></view>
        <!-- 可选择规格项 -->
        <view class="sku-item" style="height:auto">
            <view class="f26">规格</view>
            <view class="item-view" >
                <view :class="chioceIndex ===index ?   'item-active' : 'item' " @click="chioceO(index)" v-for="(item,index) in skuObj.sku" :key="index">{{item.sku_full_name}}</view>
            </view>
        </view>
        <view class="min-border-bottom m-lr-30"></view>
        <!-- 数量 -->
        <view class="sku-item sku-item-num" >
            <view class="f26">数量</view>
            <view class="m-tb-30">
                <min-stepper :isAnimation="false"  v-model="skuObj.step"></min-stepper>
            </view>
        </view>
        <view class="btn-sku" @click="skuChioce">确定</view>

    </min-popup>
    <view class="data_bull" v-if="mainArray.length === 0">
       <min-404  id='none'></min-404>
    </view>
</view>
</template>

<script>
export default {
  name: 'placean-order',
  navigate: ['navigateTo'],
  data () {
    return {
      scrollHeight: '1000px',
      leftArray: [],
      mainArray: [],
      topArr: [],
      leftIndex: 0,
      chioceIndex: 0,
      buttonLabel: '', // 已开台
      totalLabel: '', // 台位低消
      scrollInto: '',
      skuObj: { sku: [{ sku_full_name: '' }] }, // 选择规格项
      isDel: true, //  所需删除的已选列表中对应项
      errImg: false,
      isSkuNum: 0, // 选择规格弹出层的数量
      isSelSku: false, // 选择规格
      // indexDel: Number, // 所需删除的已选列表中的索引
      selArr: [], // 已选商品列表
      android: '',
      selected: false// 已选商品弹出层

    }
  },
  onLoad () {
    uni.getSystemInfo({
      success: (res) => {
        /* 设置当前滚动容器的高，若非窗口的高度，请自行修改 */
        this.scrollHeight = `${res.windowHeight}px`
      }
    })
    this.android = uni.getSystemInfoSync().platform
    console.log(this.android)
    this.$nextTick(() => {
      this.getListData()
    })
    console.log('下单路由参数', this.$parseURL())
    this.buttonLabel = this.$parseURL().is_open_desk ? '(已开台)' : '(未开台)'
    this.totalLabel = `台位低消：${this.$parseURL().minim_charge}`
  },
  computed: {
    // 合计金额
    totalAmountE () {
      let sum = 0
      this.selArr.map(item => {
        if (item.type === 'product') {
          sum += item.step * item.sku.sku_price
        } else {
          sum += item.step * item.price
        }
        this.$store.dispatch('goods/setOrderSelArr', this.selArr)
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
  onShow () {
    this.selArr = this.$store.state.goods.orderSelArr
  },
  watch: {
    selArr: {
      handler (a, b) {
        console.log(a)
      },
      deep: true
    }
  },
  methods: {
    /* 获取列表数据 getProductList */
    getListData () {
      this.$minApi.getOrderProduceList()
        .then(res => {
          this.mainArray = res.list
          console.log(this.mainArray)
          for (const val of this.mainArray) {
            val.step = 1
          }
          this.$nextTick(() => {
            this.getElementTop()
          })
        })
    },
    /* 获取元素顶部信息 */
    getElementTop () {
      /* Promise 对象数组 */
      // eslint-disable-next-line camelcase
      const p_arr = []

      /* 新建 Promise 方法 */
      // eslint-disable-next-line camelcase
      const new_p = (selector) => {
        return new Promise((resolve, reject) => {
          const view = uni.createSelectorQuery().select(selector)
          view.boundingClientRect(data => {
            resolve(data.top)
          }).exec()
        })
      }
      /* 遍历数据，创建相应的 Promise 数组数据 */
      this.mainArray.forEach((item, index) => {
        p_arr.push(new_p(`#item-${index}`))
      })

      /* 所有节点信息返回后调用该方法 */
      Promise.all(p_arr).then((data) => {
        this.topArr = data
      })
    },
    /* 主区域滚动监听 */
    mainScroll (e) {
      const top = e.detail.scrollTop
      // console.log(top)
      if (top === 0) {
        this.leftIndex = 0
      }
      let index = 0
      /* 查找当前滚动距离 */
      for (let i = (this.topArr.length - 1); i >= 0; i--) {
        /* 在部分安卓设备上，因手机逻辑分辨率与rpx单位计算不是整数，滚动距离与有误差，增加2px来完善该问题 */
        if ((top + 2) >= this.topArr[i]) {
          index = i + 1
          break
        }
      }
      this.leftIndex = (index < 0 ? 0 : index)
    },
    /* 左侧导航点击 */
    leftTap (index) {
      // console.log(e.currentTarget.dataset.index)
      // const index = e.currentTarget.dataset.index
      this.scrollInto = `item-${index}`
      this.leftIndex = index
    },
    /** 已选商品弹出事件 */
    selectedEvent () {
      this.selected = true
    },
    // 图片错误
    imageErro (e) {
      if (e.type === 'error') {
        this.skuObj.product_img = '../../static/images/goods.png'
        this.errImg = true
      }
    },
    /** 清空已选商品 */
    delAll () {
      this.selArr = []
      this.$store.dispatch('goods/setOrderSelArr', this.selArr)
    },
    /** 关闭已选商品弹出层 */
    closeSelectedPop () {
      this.selected = false
    },
    /**  关闭选择规格弹出层 */
    closeSelectedSkuPop () {
      this.isSelSku = false
    },
    // 删除选择项
    delItem (n) {
      this.selArr.splice(n, 1)
      this.isDel = true
      this.$store.dispatch('goods/setOrderSelArr', this.selArr)
    },
    // 已选弹出层删除事件
    alDel (n, index) {
      console.log(this.selArr)
      if (n === 0) {
        this.selArr.splice(index, 1)
        this.$store.dispatch('goods/setOrderSelArr', this.selArr)
      }
    },
    // 选择规格事件
    selSku (index, index2) {
      this.isSelSku = true
      this.skuObj = this.mainArray[index].product[index2]
      console.log('商品规格弹窗', this.skuObj)
    },
    changeChioce (index, index2) {
      // 服务商品
      if (this.mainArray[index].product[index2].type === 'service') {
        // 直接放入已选商品
        console.log('服务商品', this.mainArray[index].product[index2])
        this.addGoods(this.mainArray[index].product[index2])
        return
      }
      // 套餐
      if (this.mainArray[index].product[index2].type === 'setmeal') {
        console.log(213313213)
        console.log(this.$store.state.goods.orderSelArr)

        // 进入套餐详情页
        // 进入商品套餐详情
        this.$minRouter.push({
          name: 'package-details',
          params: {
            page_type: 'order',
            is_open_desk: this.$parseURL().is_open_desk,
            desk_id: this.$parseURL().desk_id,
            minim_charge: this.$parseURL().minim_charge,
            product_id: this.mainArray[index].product[index2].id,
            product_type: this.mainArray[index].product[index2].type
          }
        })
        return
      }
      if (this.mainArray[index].product[index2].type === 'product') {
        if (this.mainArray[index].product[index2].sku.length > 1) {
          this.selSku(index, index2)
        } else {
          const obj = {}
          const skuOne = this.mainArray[index].product[index2].sku[0]
          Object.assign(obj, this.mainArray[index].product[index2])
          obj.sku = skuOne
          this.addGoods(obj)
        }
      }
    },
    // 选择规格
    chioceO (index) {
      this.chioceIndex = index
    },
    // 已选商品统一列表方法
    addGoods (obj) {
      console.log('obj', obj)
      const result = this.selArr.some(item => {
        if (obj.type === 'service' && item.type === 'service') {
          console.log(item)
          if (item.id === obj.id) {
            item.step = obj.step
            return true
          }
        } else if (obj.type === 'product' && item.type === 'product') {
          console.log(item.sku.id, obj.sku.id, item)
          if (item.sku.id === obj.sku.id) {
            item.step = obj.step
            return true
          }
        }
      })
      if (!result) {
        this.selArr.push(obj)
        this.$store.dispatch('goods/setOrderSelArr', this.selArr)
        console.log(this.selArr)
      }
    },
    // 选择规格确定
    skuChioce () {
      const obj = {}
      Object.assign(obj, this.skuObj)
      obj.sku = this.skuObj.sku[this.chioceIndex]
      console.log(obj)
      this.addGoods(obj)
      this.closeSelectedSkuPop()
      console.log('选择规格确定', this.selArr)
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
        if (item.type === 'setmeal') {
          obj.id = item.id
          obj.type = item.type
          obj.quantity = item.step
          obj.combination = item.combination
        }
        products.push(obj)
      })
      this.$minApi.setOrder({
        desk_id: this.$parseURL().desk_id,
        products: JSON.stringify(products)
      }).then(res => {
        if (res.orderId) {
          this.$showToast('提交成功')
          setTimeout(() => {
            // 判断是否为已开台，已开台有签折信息
            if (this.$parseURL().is_open_desk) {
              // 已开台
              console.log(res.orderId, this.$parseURL().desk_id, this.$parseURL().is_open_desk)
              uni.navigateTo({
                url: './orderstart?order_id=' + res.orderId + '&desk_id=' + this.$parseURL().desk_id + '&open_status=' + 1
              })
              return
            }
            this.$minRouter.push({
              name: 'confirm-order',
              params: { order_id: res.orderId, desk_id: this.$parseURL().desk_id, open_status: this.$parseURL().is_open_desk ? 1 : 0 }
            }, 2000)
          })
        }
      })
    },
    // 商品详情
    goDetails (index, index2) {
      const _self = this
      // let type
      if (_self.mainArray[index].product[index2].type === 'setmeal') {
        console.log(_self.$store.state.goods.orderSelArr)
        console.log(_self.mainArray)
        // 进入商品套餐详情
        _self.$minRouter.push({
          name: 'package-details',
          params: {
            page_type: 'order',
            is_open_desk: _self.$parseURL().is_open_desk,
            desk_id: _self.$parseURL().desk_id,
            minim_charge: _self.$parseURL().minim_charge,
            product_id: _self.mainArray[index].product[index2].id,
            product_type: _self.mainArray[index].product[index2].type
          }

        })
        return
      }
      // if (this.mainArray[index].product[index2].type === 'product') {
      //   //  代表商品详情
      //   type = 'product'
      // } else if (this.mainArray[index].product[index2].type === 'service') {
      //   //  代表服务商品详情
      //   type = 'service'
      // }
      this.$minRouter.push({
        name: 'product-details',
        params: {
          page_type: 'order',
          is_open_desk: this.$parseURL().is_open_desk,
          desk_id: this.$parseURL().desk_id,
          minim_charge: this.$parseURL().minim_charge,
          product_id: this.mainArray[index].product[index2].id,
          product_type: this.mainArray[index].product[index2].type
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

uni-page-body{overflow: hidden;min-height: 100vh;width: 100%;}
.list_box{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
  font-size: 28rpx;
  overflow: auto;
  .left {
      width: 160rpx;
      background-color: #fff;
      font-size: 32rpx;
      position: fixed;
      left: 0;
      top: 0;
      overflow: hidden;
    .left_view{
      overflow: auto;
      width: 100%;
      height: auto;
    }
      .item {
        position: relative;
        text-align: center;
        height: 96rpx;
        line-height: 96rpx;
        color: #666666;

        &.active {
          color: #333333;
          background-color: #f7f7f7;
          font-weight: bold;

          &::after {
            content: '';
            width: 6rpx;
            height: 50rpx;
            background: #030313;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
  }
.main{
    width: 75%;
    padding-left: 20rpx;
    flex-grow: 1;

    position: fixed;
    left: 165rpx;
    top: -30rpx;
    bottom: 50rpx;
    overflow: auto;

.title{
  line-height: 64rpx;
  font-size: 24rpx;
  font-weight: bold;
  color: #666;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 19;
}
}
// 已选商品的弹出层

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
            width: 100%;
            font-weight: bold;
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
              .t{
                color:#FF0000;
              }
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

// 选择规格弹出
.skuTop{
  width: 100%;
  height: 180rpx;
  margin: 30rpx 0;
  display: flex;
  padding: 0 30rpx;
  .leftView{
    flex: 1;
    display: flex;
    .img-view{
      width: 180rpx;
      height: 180rpx;
       margin-right: 20rpx;
      image{ width: 100%;height: 100%; }
    }
    .sku-view{
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-content: flex-end;
      .m{
        color: #FF0000;
        .money{
          font-weight: bold;
          color: #FF0000;
        }
      }
    }
  }
  .rightView{
    width: 34rpx;
    height: 34rpx;
    image{width: 100%;height: 100%;}
  }
}
.sku-item{
  margin: 0 30rpx;
  padding: 30rpx 0;
  padding-bottom: 10rpx;
  overflow: auto;
  .item-view{
    margin-top: 20rpx;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .item {
        padding: 0 20rpx;
        word-wrap: none;
        height: 58rpx;
        border: 1px solid rgba(51, 51, 51, 1);
        border-radius: 10rpx;
        margin-right: 40rpx;
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
      margin-right: 40rpx;
        margin-bottom: 20rpx;
        text-align: center;
        line-height: 58rpx;
        color: #fe432a;
      }
  }
}
// .sku-item-num{
//   height: 200rpx;
// }
.btn-sku{
  width: 100%;
  height: 98rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #FFE001;
  text-align: center;
  line-height: 98rpx;
  font-size: 32rpx;
  color: #333;
}
.data_bull{
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  top: 0;
  left: 0;
}
}

</style>
