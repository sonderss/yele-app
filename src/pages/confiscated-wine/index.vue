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
    <scroll-view  scroll-y="true" :style="{ 'height':scrollHeight }" @scroll="mainScroll" :scroll-into-view="scrollInto" scroll-with-animation="true">
      <view class="item" v-for="(item,index) in mainArray" :key="index" :id="'item-'+index">
        <view class="goods" v-for="(item2,index2) in item.list" :key="index2" >
          <image src="../../static/images/goods.png" mode=""></image>
          <view class="content-view">
            <view class="right-view-title">
              <text class="f28 t" style="display:block">第{{index2+1}}2020年跨年夜百威兄弟终 极套餐12瓶</text>
              <text class="f26" style="color:#666666">规格：200ml/瓶</text>
            </view>
            <!-- <view class="describe">第{{index2+1}}个商品的描述内容</view>
            <view class="money">第{{index2+1}}个商品的价格</view> -->
            <view class="right-view-bottom">
              <view class="right-view-bottom-desc">
                 <text class="f20 t">提成：￥<text  style="color:#FF0000;font-size:30">2000</text></text>
              </view>

                <min-stepper></min-stepper>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
  <view class="bottom-view">
    <min-goods-submit leftText="已选" :goodsCount="2"></min-goods-submit>
  </view>
</view>
</template>

<script>
export default {
  // '香槟香槟', '威士忌', '人头马', '哈力高', '香槟', '百威', '红酒', '香槟香槟'
  data () {
    return {
      scrollHeight: '1000px',
      leftArray: [],
      mainArray: [],
      topArr: [],
      leftIndex: 0,
      scrollInto: ''
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
  },
  methods: {
    /* 获取列表数据 */
    getListData () {
      /* 因无真实数据，当前方法模拟数据 */
      const [left, main] = [[], []]

      for (let i = 0; i < 10; i++) {
        left.push(`${i + 1}类商品`)

        const list = []
        for (let j = 0; j < (i + 1); j++) {
          list.push(j)
        }
        main.push({
          title: `第${i + 1}类商品标题`,
          list
        })
      }
      this.leftArray = left
      this.mainArray = main

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
      let index = 0
      /* 查找当前滚动距离 */
      for (let i = (this.topArr.length - 1); i >= 0; i--) {
        /* 在部分安卓设备上，因手机逻辑分辨率与rpx单位计算不是整数，滚动距离与有误差，增加2px来完善该问题 */
        if ((top + 2) >= this.topArr[i]) {
          index = i
          break
        }
      }
      this.leftIndex = (index < 0 ? 0 : index)
    },
    /* 左侧导航点击 */
    leftTap (e) {
      const index = e.currentTarget.dataset.index
      this.scrollInto = `item-${index}`
    }
  }
}
</script>

<style lang="scss">

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
    color: #42b983;
    background-color: #fff;
  }
}
}
.main{
padding-left: 20rpx;
width: 0;
flex-grow: 1;
box-sizing: border-box;
margin-right: 30rpx;
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
        .right-view-bottom-desc{
          display: flex
        }
    }
  }
}
}
}
</style>
