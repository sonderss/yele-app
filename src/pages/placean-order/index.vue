<template>
<view class="list_box m-top-20">
  <view class="left">
    <scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
      <view class="item"
        v-for="(item,index) in leftArray"
        :key="index"
        :class="{ 'active':index==leftIndex }"
        :data-index="index"
        @tap="leftTap"
      >{{item}}</view>
    </scroll-view>
  </view>
  <view class="main">
    <scroll-view  scroll-y="true" :style="{ 'height':scrollHeight }" @scroll="mainScroll" @scrolltolower='test' :scroll-into-view="scrollInto" scroll-with-animation="true">
      <view v-for="(item,index) in mainArray" :key="index" :id="'item-'+index">
        <view v-for="(item2,index2) in item.list" :key="index2">
          <min-goods-chioce
            :image='item2.img'
            :discount='item2.discount'
            :title="item.title"
            :badgeTxt='item2.badgeTxt'
            :badge='item2.badge'
            @change='changeChioce(index,index2)'
            :desc='item2.sku'
            v-model="item2.step"
            :price='item2.money'>
          </min-goods-chioce>
        </view>
      </view>
      <view style="height:120rpx;"></view>
    </scroll-view>
  </view>
  <view class="bottom-view">
    <min-goods-submit leftText="已选"
      @leftClick='selectedEvent'
      :totalAmount='totalAmountE'
      totalLabel='台位低消：2000'
      :goodsCount="countNums"
      buttonText='提交'>
    </min-goods-submit>
  </view>
  <!-- 已选商品 -->
  <min-popup :show="selected" @close='closeSelectedPop'>
    <view class="popview">
        <view class="p-lr-20">
            <view class="top-view min-border-bottom">
              <text>已选商品</text>
              <view class="right-view" @click="delAll">
                <view class="icon-del m-right-10">
                  <image src='../../static/images/del.png'/>
                </view>
                <text class="f22 clear">清空</text>
              </view>
            </view>
        </view>
        <view class="main-sel-view p-lr-30 p-tb-30" >
            <view class="item" v-for="(item2,n) in selArr" :key="n" @longpress='longTatch(n)'>

                <image :src="item2.img" mode="" />
                <view class="content-view">
                  <view class="right-view-title">
                    <text class="f28 t" style="display:block">{{123}}</text>
                    <text class="f26" style="color:#666666">规格：{{item2.sku}}</text>
                  </view>
                  <view class="right-view-bottom">
                    <view class="right-view-bottom-desc" >
                      <text class="f20 t">提成：￥<text  style="color:#FF0000;font-size:30">{{item2.money}}</text></text>
                    </view>
                    <view class="steper">

                      <min-stepper v-if="isDel"  v-model="item2.step"  :min='0' @change="alDel($event,n)"></min-stepper>
                      <view v-if="!isDel" @click="delItem(n)">删除</view>
                    </view>
                  </view>
                </view>
            </view>
        </view>
        <!-- <view class="empty-view"></view> -->
        <view class="bottom-view-t">
          <min-goods-submit style="position:fixed" leftText="已选"  :totalAmount='totalAmountE' :goodsCount="countNums" buttonText='提交'></min-goods-submit>
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
              <image src='../../static/images/goods.png'/>
            </view>
            <!-- sku信息 -->
            <view class="sku-view">
               <text class="f22">进口洋酒-人头马</text>
               <text class="f22 m-tb-20">已选：“750ml”</text>
               <text class="f22 m">提成:￥<text class="money">2380.00</text></text>
            </view>
         </view>
         <view class="rightView">
           <image  src='../../static/images/wine-close.png'/>
         </view>
      </view>
      <view class="min-border-bottom m-lr-30"></view>
      <!-- 可选择规格项 -->
      <view class="sku-item">
          <view class="f26">规格</view>
          <view class="item-view">
              <view class="item">伯世富VSOP*750ml*2010年*/瓶</view>
              <view class="item">人头马*2000年*/瓶</view>
              <view class="item">人头马*2000年*/瓶</view>

          </view>
      </view>
      <view class="min-border-bottom m-lr-30"></view>
      <!-- 数量 -->
      <view class="sku-item sku-item-num">
          <view class="f26">数量</view>
          <view class="m-tb-30">
              <min-stepper  v-model="isSkuNum"></min-stepper>
          </view>
      </view>
      <view class="btn-sku">确定</view>
    </view>
  </min-popup>
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
      scrollInto: '',
      isDel: true, //  所需删除的已选列表中对应项
      selNum: [],
      isSkuNum: 0, // 选择规格弹出层的数量
      isSelSku: false, // 选择规格
      // indexDel: Number, // 所需删除的已选列表中的索引
      selArr: [], // 已选商品列表
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
  },
  mounted () {
    this.getListData()
    // console.log(this.leftArray, this.mainArray)
  },
  computed: {
    // 合计金额
    totalAmountE () {
      let sum = 0
      this.selArr.map(item => {
        sum += item.step * item.money
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
    selArr: function (a, b) {
      console.log(a, b)
    }
  },
  methods: {
    /* 获取列表数据 */
    getListData () {
      /* 因无真实数据，当前方法模拟数据 */
      const [left] = [[]]
      const a = [
        {
          title: '第一件商品',
          list: [
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 1, money: 100, isSku: true },
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 1, money: 200, badge: true, badgeTxt: '套餐' },
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 1, money: 300, discount: true },
            { img: '../../static/images/goods.png', sku: '200ml/瓶', step: 1, money: 400 }
          ]
        },
        {
          title: '第二件商品',
          list: [
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '200ml/瓶', step: 0, money: 100 }
          ]
        },
        {
          title: '第三件商品',
          list: [
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '200ml/瓶', step: 0, money: 100 }
          ]
        },
        {
          title: '第四件商品',
          list: [
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '200ml/瓶', step: 0, money: 100 }
          ]
        },
        {
          title: '第五件商品',
          list: [
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '200ml/瓶', step: 0, money: 100 }
          ]
        },
        {
          title: '第六件商品',
          list: [
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '200ml/瓶', step: 0, money: 100 }
          ]
        },
        {
          title: '第七件商品',
          list: [
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '200ml/瓶', step: 0, money: 100 }
          ]
        },
        {
          title: '第八件商品',
          list: [
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '100ml/瓶', step: 0, money: 100 },
            { img: '../../static/images/goods.png', sku: '200ml/瓶', step: 0, money: 100 }
          ]
        },
        {
          title: '第九件商品',
          list: [{ img: '../../static/images/goods.png', sku: '200ml/瓶', step: 1, money: 100 }
          ]
        },
        {
          title: '第十件商品',
          list: [{ img: '../../static/images/goods.png', sku: '200ml/瓶', step: 1, money: 100 }
          ]
        }
      ]
      const b = ['香槟香槟', '威士忌', '人头马', '香槟香槟', '威士忌', '人头马', '香槟香槟', '威士忌', '人头马', '香槟香槟']
      // this.mainArray = a
      // this.leftArray = b
      const list = a
      for (let i = 0; i < a.length; i++) {
        left.push(b[i])
      }

      this.leftArray = left
      this.mainArray = list

      this.$nextTick(() => {
        this.getElementTop()
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
    leftTap (e) {
      // console.log(e.currentTarget.dataset.index)
      const index = e.currentTarget.dataset.index
      this.scrollInto = `item-${index}`
      this.leftIndex = e.currentTarget.dataset.index
    },
    /** 监听底部 */
    test (EventHandle) {
      // console.log(EventHandle.target.direction)
      if (EventHandle.target.direction === 'bottom') {
        // console.log('到达底部')
        // this.leftIndex = this.leftArray.length - 1
      }
    },
    /** 点击商品事件(进入详情) */
    goodsAdd (index, index2) {
      // this.addGoods(index, index2)
    },
    /** 已选商品弹出事件 */
    selectedEvent () {
      this.selected = true
    },
    /** 添加商品事件 */
    addGoods (index, index2) {
      const a = index + '' + index2
      // // 判断选择项是否重复
      if (!this.selNum.includes(a)) {
        this.selNum.push(a)
        this.selArr.push(this.mainArray[index].list[index2])
        // this.totalAmountE()
      } else {

      }
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
      console.log(this.selArr)
      if (n === 0) {
        this.selArr.splice(index, 1)
        this.selNum.splice(index, 1)
      }
    },
    // 选择规格事件
    selSku (index, index2) {
      this.isSelSku = true
      console.log(index, index2)
    },
    changeChioce (index, index2) {
      this.addGoods(index, index2)
    },
    tets (index, index2) {
      // this.addGoods(index, index2)
    },
    yy (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss">
uni-page-body{overflow: hidden;height: 100%;}
.list_box{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  font-size: 28rpx;
  .left{
    width: 160rpx;
    background-color: #fff;
    line-height: 80rpx;
    box-sizing: border-box;
    font-size: 32rpx;

.item{
  position: relative;
  text-align: center;
  height: 96rpx;
  line-height: 96rpx;
  color: #666666;
  &:not(:first-child) {
    margin-top: 1px;
    &::after {
      content: '';
      display: block;
      height: 0;
      width: 620upx;
      position: absolute;
      top: -1px;
      right: 0;
      transform:scaleY(0.5);/* 1px像素 */
    }
  }
  &.active{
    color: #333333;
    background-color: #F7F7F7;
    font-weight:bold;
    // border-left: 6rpx solid #030313
  }
  // &.active::after{
  //   display: block;
  //   width: 6rpx;
  //   height: 20rpx;
  //   background: #000
  // }
}
}
.main{
padding-left: 20rpx;
width: 0;
flex-grow: 1;
box-sizing: border-box;
margin-right: 30rpx;
margin-bottom: 100rpx;
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
.isSku{
  width: 100rpx;
  height: 48rpx;
  background: #FFE001;
  border-radius:24rpx;
  color: #333333;
  text-align: center;
  line-height: 48rpx;
}
.item{
  width: 540rpx;
  margin-bottom: 20rpx;
}

.goods{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  margin-bottom: 20rpx;
  background: #fff;
  height: 200rpx;
  width: 540rpx;
  padding: 20rpx;
  &>image{
    width: 160rpx;
    height: 160rpx;
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
          display: flex
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
// 已选商品的弹出层
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
  height: 300rpx;
  overflow: auto;
  .item-view{
    margin-top: 20rpx;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item{
       padding: 0 20rpx;
      word-wrap: none;
      height: 58rpx;
      border:1px solid rgba(51,51,51,1);
      // border:1px solid rgba(254,67,42,1);rgba(51,51,51,1)
      border-radius:10rpx;
      // margin-right: 20rpx;
      margin-bottom:20rpx;
      text-align: center;
      line-height: 58rpx;
    }
  }
}
.sku-item-num{
  height: 200rpx;
}
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
}
/**<template>
   <view>
      <min-goods-chioce image='../../static/images/goods.png' :value="1" @input="tets" :badge="true" badgeTxt='优惠'></min-goods-chioce> */
</style>
