<template>
<view class="list_box" >
      <view class="left">
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

    <view class="main" v-if="mainArray.length === 0">
      <scroll-view  scroll-y="true" :style="{ 'height':scrollHeight }" @scroll="mainScroll" @scrolltolower='test' :scroll-into-view="scrollInto" scroll-with-animation="true">
        <view class="item" v-for="(item,index) in mainArray" :key="index"  :id="'item-'+index">
              <view class="goods" v-for="(item2,index2) in item.list" :key="index2" >
                <image :src="imageSrc === 'error' ? '../../static/images/goods.png' : item2.product_img" mode=""  @error='imgerr'></image>
                <view class="content-view">
                  <view class="right-view-title" >
                    <text class="f28 t" style="display:block">{{item2.product_name}}</text>
                    <text class="f26" v-if="item2.sku.length === 1" style="color:#666666">规格：{{item2.sku[0].sku_full_name}}</text>
                  </view>
                  <!-- <view class="describe">第{{index2+1}}个商品的描述内容</view>
                  <view class="money">第{{index2+1}}个商品的价格</view> -->
                  <view class="right-view-bottom">
                    <view class="right-view-bottom-desc" >
                      <text class="f20 t">提成：￥<text  style="color:#FF0000;font-size:30">{{ item2.min_amount}}</text></text>
                    </view>
                    <view class="steper">
                      <min-stepper v-if="item2.sku.length <= 1"  v-model="item2.step"  :min='0' @change="changeChioce(index,index2)"></min-stepper>
                      <view class="isSku f24"  v-if="item2.sku.length > 1 "  @click="selSku(index,index2)">选规格</view>
                    </view>
                  </view>
                </view>
              </view>
        </view>
        <view style="height:120rpx;"></view>
      </scroll-view>
    </view>

    <view class="bottom-view" >
      <min-goods-submit leftText="已选" @leftClick='selectedEvent'  @submit='submit' :totalAmount='totalAmountE' :goodsCount="countNums" buttonText='提交'></min-goods-submit>
    </view>
    <!-- 已选商品 -->
    <min-popup :show="selected" @close='closeSelectedPop'>
      <view class="popview">
          <view class="p-lr-20">
              <view class="top-view min-border-bottom">
                <text>已选商品</text>
                <view class="right-view" @click="delAll">
                  <view class="icon-del m-right-10">
                    <image src='../../static/images/del.png'></image>
                  </view>
                  <text class="f22 clear">清空</text>
                </view>
              </view>
          </view>
          <view class="main-sel-view p-lr-30 p-tb-30" >
              <view class="item" v-for="(item2,n) in selArr" :key="n" @longpress='longTatch(n)'>
                  <image :src="imageSrc === 'error' ? '../../static/images/goods.png' : item2.product_img" @error='imgerr' ></image>
                  <view class="content-view">
                    <view class="right-view-title">
                      <text class="f28 t" style="display:block">{{item2.product_name}}</text>
                      <text class="f26" style="color:#666666" v-if="item2.sku.length > 1">规格：{{item2.sku[item2.index].sku}}</text>
                    </view>
                    <view class="right-view-bottom">
                      <view class="right-view-bottom-desc" >
                        <text class="f20 t">提成：￥<text  style="color:#FF0000;font-size:30">{{item2.sku.length > 1 ? item2.sku[item2.index].amount : item2.min_amount}}</text></text>
                      </view>
                      <view class="steper">
                        <!-- @change="changeIndex($event,n)" -->
                        <min-stepper :isAnimation="false" v-if="isDel"  v-model="item2.step"  :min='0' @change="alDel($event,n)"></min-stepper>
                        <view v-if="!isDel" @click="delItem(n)">删除</view>
                      </view>
                    </view>
                  </view>
              </view>
          </view>
          <!-- <view class="empty-view"></view> -->
          <view class="bottom-view-t" >
            <min-goods-submit style="position:fixed" leftText="已选"   @submit='submit' :totalAmount='totalAmountE' :goodsCount="countNums" buttonText='提交'></min-goods-submit>
          </view>
      </view>
    </min-popup>
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
                <text class="f22 m">提成:￥<text class="money">{{skuObj.sku[chioceIndex].amount}}</text></text>
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
        <!-- 数量 -->
        <view class="sku-item sku-item-num">
            <view class="f26">数量</view>
            <view class="m-tb-30">
                <min-stepper :isAnimation="false" :min='1' v-model="skuObj.step"></min-stepper>
            </view>
        </view>
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
      leftArray: [],
      mainArray: [],
      topArr: [],
      leftIndex: 0,
      scrollInto: '',
      chioceIndex: 0, // 默认选中第一项
      imageSrc: '', // 判断图片是否失效
      isDel: true, //  所需删除的已选列表中对应项
      selNum: [],
      isSkuNum: 0, // 选择规格弹出层的数量
      skuObj: { sku: [{ sku_full_name: '' }] }, // 选择规格项
      isSelSku: false, // 选择规格
      // indexDel: Number, // 所需删除的已选列表中的索引
      selArr: [], // 已选商品列表
      selected: false, // 已选商品弹出层
      chioceSkuIndex: 0, // 选择规格的索引
      selItemArr: [], // 提交已选商品数组
      skuIndex: {},
      delIndex: Number,
      lastArr: [],
      intNet: Boolean // 网络状态
    }
  },
  onLoad () {
    uni.getSystemInfo({
      success: (res) => {
        /* 设置当前滚动容器的高，若非窗口的高度，请自行修改 */
        this.scrollHeight = `${res.windowHeight}px`
      }
    })
  },
  onShow () {

  },
  mounted () {
    this.getData()
    // console.log(this.leftArray, this.mainArray)
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
      this.$minApi.getWineList()
        .then(res => {
          this.mainArray = res
          // console.log(this.mainArray)
          this.$nextTick(() => {
            this.getElementTop()
          })
        })
    },
    imgerr (e) {
      this.imageSrc = e.type
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
        if ((top + 100) >= this.topArr[i]) {
          index = i
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
      // this.addGoods(index, index2)
    },
    /** 已选商品弹出事件 */
    selectedEvent () {
      if (this.mainArray.length === 0) return
      this.selected = true
    },
    /** 添加商品事件 */
    addGoods (index, index2) {
      const a = index + '' + index2
      // // 判断选择项是否重复
      if (!this.selNum.includes(a)) {
        this.selNum.push(a)
        this.selArr.push(this.mainArray[index].list[index2])
      } else {

      }
    },
    /** 已选商品提交所需项 */
    // eslint-disable-next-line vue/no-dupe-keys
    selItem (index, index2) {
      const obj = {}
      this.selArr.map(item => {
        obj.id = item.sku[index2].confiscate_product_id
        obj.product_num = item.sku[index2].step
        if (!this.selItemArr.includes(obj.id)) {
          this.selItemArr.push(obj)
        }
      })
      console.log(this.selItemArr)
    },
    /** 清空已选商品 */
    delAll () {
      this.selArr = []
      this.selNum = []
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
      this.selNum.splice(n, 1)
      this.isDel = true
    },
    // 长按事件触发删除
    longTatch (n) {
      this.isDel = false
    },
    // 已选弹出层删除事件
    alDel (n, index) {
      if (n === 0) {
        this.selArr.splice(index, 1)
        this.selNum.splice(index, 1)
      }
    },
    // 选择规格事件
    selSku (index, index2) {
      this.isSelSku = true
      this.skuObj = this.mainArray[index].list[index2]
      this.skuIndex.index = index
      this.skuIndex.index2 = index2
      // console.log('选择规格项的商品索引', index)
    },
    changeChioce (index, index2) {
      this.addGoods(index, index2)
      const params = {}
      params.id = this.mainArray[index].list[index2].sku[0].confiscate_product_id
      params.product_num = this.mainArray[index].list[index2].step + 1
      this.postItem(params)
      // console.log(params)
    },
    // 选择规格
    chioceO (index) {
      this.chioceIndex = index
    },
    checkIndex (e) {
      console.log(e)
      if (this.selArr.length === 0) {
        this.selArr.push(e)
        return
      }
      this.selArr.map(item => {
        if (item.id === e.id) {
          if (item.sku[item.index].confiscate_product_id !== e.sku[e.index].confiscate_product_id) {
            this.selArr.push(e)
          } else if (item.step < e.step) {
            item.step = e.step
          }
        }
      })
    },
    // 选择规格确定
    skuChioce () {
      const obj = {}
      obj.id = this.skuObj.sku[this.chioceIndex].confiscate_product_id
      obj.product_num = this.skuObj.step
      this.postItem(obj)
      this.skuObj.index = this.chioceIndex
      this.skuObj.min_amount = this.skuObj.sku[this.chioceIndex].amount
      let test = {}
      test = Object.assign(test, this.skuObj)
      this.checkIndex(test)
      this.closeSelectedSkuPop()
      // console.log(this.selArr)
    },
    // 提交项
    postItem (params) {
      if (this.selItemArr.length === 0) return this.selItemArr.push(params)
      const ids = this.selItemArr.map((item, index) => (item.id))
      if (ids.includes(params.id)) {
        this.selItemArr.map((item, index) => {
          if (params.id === item.id) {
            item.product_num = params.product_num
          }
        })
      } else {
        this.selItemArr.push(params)
      }
    },
    // 提交
    submit (e) {
      // console.log(this.selArrO)
      if (this.mainArray.length === 0) return this.$showToast('系统错误，请稍后重试')
      if (this.selArr.length === 0) {
        this.$showToast('请选择商品')
        return
      }
      this.selArr.map(item => {
        const obj = {}
        if (item.index) {
          obj.id = item.sku[item.index].confiscate_product_id
          obj.product_num = item.step
          this.postItem(obj)
        } else {
          obj.id = item.sku[0].confiscate_product_id
          obj.product_num = item.step
          this.postItem(obj)
        }
      })
      const goods = JSON.stringify(this.selItemArr)
      // eslint-disable-next-line camelcase
      const total_commission = this.totalAmountE
      // const a = this.chioceItem
      // console.log(a)
      this.$minApi.addWinePubList({ goods, total_commission })
        .then(res => {
          // console.log(res.msg)
          if (res.length === 0) {
            this.$showToast('提交成功！')
            this.selItemArr = []
            this.selArr = []
            this.selNum = []
          }
        })
    }
  }
}
</script>

<style lang="scss">
@import './index.scss'
</style>
