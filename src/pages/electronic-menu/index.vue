<template>
<view class="list_box" style="overflow:hidden;border:1rpx solid #fff">

    <view class="top-view">
       <text  :class="menuIndex === index ? 'active' : 'm' " v-for="(item,index) in title" :key="index" @click="changeMenu(index)">{{item}}</text>
    </view>
      <view class="left">
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

    <view class="main">
      <scroll-view  scroll-y="true" :style="{ 'height':scrollHeight }" @scroll="mainScroll" @scrolltolower='test' :scroll-into-view="scrollInto" scroll-with-animation="true">
        <view class="item" v-for="(item,index) in mainArray" :key="index"  :id="'item-'+index">
              <view class="goods" v-for="(item2,index2) in item.product" :key="index2"  @click.stop="goodsAdd(index,index2)">
                <image :src="imageSrc === 'error' ? '../../static/images/goods.png' : item2.product_img" mode=""  @error='imgerr'></image>
                <view class="content-view">
                  <view class="right-view-title" >
                    <text class="f28 t" style="display:block">{{item2.product_name}}</text>
                    <text class="f26" v-if="item2.sku.length === 1" style="color:#666666">规格：{{item2.sku[0].sku_full_name}}</text>
                  </view>
                  <view class="right-view-bottom">
                    <view class="right-view-bottom-desc" >
                      <text class="f20 t"><text  style="color:#FF0000;font-size:30">￥{{item2.sku.length>=1?item2.sku[0].price:'暂无信息'}}</text></text>
                    </view>
                    <view class="steper">
                      <view class="isSku f24"  v-if="item2.sku.length > 1 "  @click.stop="selSku(index,index2)">选规格</view>
                    </view>
                  </view>
                </view>
              </view>
        </view>
        <view style="height:120rpx;"></view>
      </scroll-view>
    </view>

    <!-- 选择规格 -->
    <min-popup :show="isSelSku" @close='closeSelectedSkuPop'>
      <!--  -->
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
    <min-404  v-model="intNet" v-if="mainArray.length === 0" id='none'></min-404>

</view>
</template>

<script>
export default {
  name: 'confiscated-wine',
  navigate: ['navigateTo', 'switchTab'],
  data () {
    return {
      scrollHeight: '1000px',
      mainArray: [],
      topArr: [],
      leftIndex: 0,
      scrollInto: '',
      chioceIndex: 0, // 默认选中第一项
      imageSrc: '', // 判断图片是否失效
      skuObj: { sku: [{ sku_full_name: '' }] }, // 选择规格项
      isSelSku: false, // 选择规格
      // indexDel: Number, // 所需删除的已选列表中的索引
      selArr: [], // 已选商品列表
      selected: false, // 已选商品弹出层
      intNet: Boolean, // 网络状态
      title: ['门店商品', '平台商品'],
      menuIndex: 0
    }
  },
  onLoad () {
    uni.getSystemInfo({
      success: (res) => {
        /* 设置当前滚动容器的高，若非窗口的高度，请自行修改 */
        this.scrollHeight = `${res.windowHeight}px`
      }
    })
    this.getData()
  },
  computed: {
    // 合计金额
    totalAmountE () {
      let sum = 0
      this.selArr.map(item => {
        sum += item.step * item.min_amount
      })
      return sum
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
    intNet: function (a) {
      if (!a) {

      } else {
        // 请求数据
        this.getData()
      }
    }
  },
  methods: {
    /* 获取列表数据 */
    getData () {
      this.$minApi.getProductList()
        .then(res => {
          this.mainArray = res.list
          for (const val of this.mainArray) {
            if (!val.product) {
              val.product = [{
                id: 14,
                product_name: '98K',
                product_img: 'xx',
                info: 'xxx',
                cate_id: 1,
                type: 'combo',
                sku: [{
                  sku_id: 12,
                  sku: '2000年,1L',
                  sku_full_name: '克x-2000年,1L',
                  price: '6.66'
                }]
              }, {
                id: 14,
                product_name: '98K',
                product_img: 'xx',
                info: 'xxx',
                cate_id: 1,
                type: 'product',
                sku: [{
                  sku_id: 12,
                  sku: '2000年,1L',
                  sku_full_name: '克x-2000年,1L',
                  price: '6.66'
                }]
              }, {
                id: 14,
                product_name: '98K',
                product_img: 'xx',
                info: 'xxx',
                cate_id: 1,
                type: 'product',
                sku: [{
                  sku_id: 12,
                  sku: '2000年,1L',
                  sku_full_name: '克x-2000年,1L',
                  price: '6.66'
                }]
              }, {
                id: 14,
                product_name: '98K',
                product_img: 'xx',
                info: 'xxx',
                cate_id: 1,
                type: 'product',
                sku: [{
                  sku_id: 12,
                  sku: '2000年,1L',
                  sku_full_name: '克x-2000年,1L',
                  price: '6.66'
                }]
              }]
            }
          }
          this.$nextTick(() => {
            this.getElementTop()
          })
        })
    },
    imgerr (e) {
      this.imageSrc = e.type
    },
    getElementTop1 () {
      this.mainArray.map((item, index) => {
        const dom = `item-${index}`
        const view = uni.createSelectorQuery().in(this).select(dom)
        view.boundingClientRect(data => {
          console.log(data.top)
        }).exec()
      })
    },
    /* 获取元素顶部信息 */
    getElementTop () {
      /* Promise 对象数组 */
      // eslint-disable-next-line camelcase
      const p_arr = []
      console.log(123)
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
      console.log(new_p)
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
        if ((top + 100) >= this.topArr[i]) {
          index = i
          break
        }
      }
      this.leftIndex = (index < 0 ? 0 : index)
    },
    /* 左侧导航点击 */
    leftTap (index) {
      this.scrollInto = `item-${index}`
      this.leftIndex = index
    },
    /** 监听底部 */
    test (EventHandle) {
      // console.log(EventHandle.target.direction)
      if (EventHandle.target.direction === 'bottom') {
        // console.log('到达底部')
        this.leftIndex = this.mainArray.length - 1
      }
    },
    // 关闭规格选择框
    closePop () {
      this.closeSelectedPop()
    },
    /** 点击商品事件(进入详情) */
    goodsAdd (index, index2) {
      let type = Number
      if (this.mainArray[index].product[index2].type === 'setmeal') {
        // 进入电子菜单套餐详情
        type = 3
        this.$minRouter.push({
          name: 'package-details',
          params: { type, setmeal_id: this.mainArray[index].product[index2].id }
        })
        return
      }
      if (this.mainArray[index].product[index2].type === 'product') {
        // 1 代表电子菜单商品详情
        type = 1
      } else if (this.mainArray[index].product[index2].type === 'service') {
        // 2 代表电子菜单服务商品详情
        type = 2
      }
      this.$minRouter.push({
        name: 'product-details',
        params: { product_id: this.mainArray[index].product[index2].id, type: type, product_type: this.mainArray[index].product[index2].type }
      })
    },
    /** 已选商品弹出事件 */
    selectedEvent () {
      if (this.mainArray.length === 0) return
      this.selected = true
    },
    /**  关闭选择规格弹出层 */
    closeSelectedSkuPop () {
      this.isSelSku = false
    },
    // 选择规格事件
    selSku (index, index2) {
      this.isSelSku = true
      this.skuObj = this.mainArray[index].product[index2]
    },
    // 选择规格
    chioceO (index) {
      this.chioceIndex = index
    },
    // 选择规格确定
    skuChioce () {
      this.closeSelectedSkuPop()
    },
    // 选择不同平台
    changeMenu (n) {
      this.menuIndex = n
    }
  }
}
</script>

<style lang="scss">
@import './index.scss'
</style>
