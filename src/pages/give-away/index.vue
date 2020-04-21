<template>
  <view class="give-away">
    <min-navTab ref="navTab" :tabTitle="list" @changeTab="changeTab"></min-navTab>

    <swiper  style="height:100vh"  :current="currentTab" @change="swiperTab">
      <swiper-item v-for="(listItem,listIndex) in list" :key="listIndex">
        <scroll-view
          style="height: auto"
          scroll-y="true"
          @scrolltolower="lower1"
          scroll-with-animation
          :scroll-into-view="toView"
        >
          <view :id="'top'+listIndex" style="width: 100%;height:20rpx;"></view>
          <view class="main p-lr-30" v-if="listItem.product.length > 0" >
            <view class="item">
              <view class="goods" v-for="(item,index) in listItem.product" :key="index" @click.stop="toDetail(item)">
                <image :src="item.product_img.length>10 ?  item.product_img : '../../static/images/goods.png' " mode  @error="imageErro()"/>
                <view class="content-view">
                  <view class="right-view-title">
                    <text class="f28 t" style="display:block">{{item.product_name}}</text>
                    <text class="f26" style="color:#666666">可赠数量：{{item.commodity_count}}</text>
                  </view>
                  <view class="right-view-bottom">
                    <view class="right-view-bottom-desc">
                      <text class="f20 t">
                        提成：￥
                        <text style="color:#FF0000;font-size:30">{{item.price}}</text>
                      </text>
                    </view>
                    <view class="steper">
                      <min-stepper v-model="item.step" :min='0' @change="getStep(item)" :isAnimation="false" ></min-stepper>
                      <!-- <view class="isSku f24"  v-if="item2.sku.length > 1 "  @click="selSku(index,index2)">选规格</view> -->
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <min-404 v-else></min-404>

        </scroll-view>
      </swiper-item>
    </swiper>

    <min-goods-submit style="position:fixed"
    :totalLabel='totalLabel'
     leftText="已选"
     :totalAmount='moneySum'
     :goodsCount="num"
     buttonText='确定赠送'
     ></min-goods-submit>
    <min-modal ref="test"></min-modal >
  </view>
</template>
<script>
export default {
  name: 'give-away',
  navigate: ['navigateTo'],
  data () {
    return {
      currentPage: 'index',
      toView: '', // 回到顶部id
      step: 0,
      totalAmountE: 0,
      countNums: 0,
      totalLabel: '',
      content: '',
      tabTitle: [], // 导航栏格式 --导航栏组件
      currentTab: 0, // sweiper所在页
      pages: [1, 1, 1, 1], // 第几个swiper的第几页
      list: [],
      imgErrType: false,
      selArr: []
    }
  },
  mounted () {
  // ''
    this.$minApi.getGiveAwayList({ opening_id: 23 }).then(res => {
      // this.tabTitle = res.list
      this.list = res.list
      this.content = `
          1. 当前台消费金额￥${res.consumption_amount}，根据赠送方案，可赠送的商品金额为￥${res.presentation_limit}。<br />
          2. 当前用户的赠送额度为￥${res.personal_remaining_quota}，不能超过此额度。<br />
      `
      this.$store.dispatch('goods/setselected_giveAwayInfo', { consumption_amount: res.consumption_amount, presentation_limit: res.presentation_limit, personal_remaining_quota: res.personal_remaining_quota })
      this.totalLabel = `赠送额度：${res.personal_remaining_quota}`
      console.log(this.list)
    })
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
  computed: {
    num () {
      let counts = 0
      this.selArr.map(item => {
        counts += item.step
      })
      return counts
    },
    moneySum () {
      let sum = 0
      this.selArr.map(item => {
        sum += item.price * item.step
      })
      return sum
    }
  },
  methods: {
    toDetail (item) {
      console.log(item)
      if (item.sku && item.sku.length !== 0) {
        // 跳到赠送商品详情
        uni.navigateTo({
          url: '/pages/give-away/produdetail?product_id=' + item.sku[0].id + '&product_type=' + item.type
        })
      } else {
        // 跳到赠送商品详情
        uni.navigateTo({
          url: '/pages/give-away/produdetail?product_id=' + item.id + '&product_type=' + item.type
        })
      }
    },
    // 点击增加按钮
    getStep (e) {
      console.log(e)
      this.addGoods(e)
    },
    // 添加到购物车
    addGoods (e) {
      // 无可赠次数
      if (e.commodity_count === 0) return this.$showToast('该商品无可送次数')
      if (this.selArr.length === 0) {
        this.selArr.push(e)
        return
      }
      const result = this.selArr.some(item => {
        if (item.sku.length === 0) {
          if (item.id === e.id) {
            //  item.step = obj.step
            return true
          }
        }
      })
      if (!result) {
        this.selArr.push(e)
      }
    },
    // 判断已选商品重复
    isflagAdd (obj) {
      // eslint-disable-next-line no-unused-vars
      for (let i = 0; i < this.selArr.length; i++) {
        if (this.selArr[i].sku.length === 0) {
          console.log(this.selArr[i].id, obj.id)
          if (this.selArr[i].id === obj.id) {
            console.log(123123213)
            return false
          } else if (this.selArr[i].id !== obj.id) {
            console.log('sdsadsad')
            return true
          }
        }
      }
    },
    changeTab (e) {
      this.currentTab = e
    },
    // swiper 滑动
    swiperTab: function (e) {
      var index = e.detail.current // 获取索引
      this.$refs.navTab.longClick(index)
    },
    throttle (fn, gapTime) {
      if (gapTime == null || gapTime === undefined) {
        gapTime = 1500
      }

      let _lastTime = null

      // 返回新的函数
      return function () {
        const _nowTime = +new Date()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
          fn.apply(this, arguments) // 将this和参数传给原函数
          _lastTime = _nowTime
        }
      }
    },
    // 加载更多 util.throttle为防抖函数
    lower1 () {
      this.throttle(function (e) {
        console.log(`加载${this.currentTab}`) // currentTab表示当前所在页数 根据当前所在页数发起请求并带上page页数
        uni.showLoading({
          title: '加载中',
          mask: true
        })
        this.isRequest().then(res => {
          const tempList = this.list
          tempList[this.currentTab] = tempList[this.currentTab].concat(res)
          console.log(tempList)
          this.list = tempList
          this.$forceUpdate() // 二维数组，开启强制渲染
        })
      }, 300)
    },
    imageErro (e) {
      if (e.type === 'error') {
        this.imgErrType = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.swiper {
  margin-top: 72rpx;
}
.main {
  width: 100%;
  margin-top: 72rpx;
  flex-grow: 1;
  box-sizing: border-box;

  .title {
    line-height: 64rpx;
    font-size: 24rpx;
    font-weight: bold;
    color: #666;
    background-color: #fff;
    position: sticky;
    top: 0;
    z-index: 19;
  }
  .isSku {
    width: 100rpx;
    height: 48rpx;
    background: #ffe001;
    border-radius: 24rpx;
    color: #333333;
    text-align: center;
    line-height: 48rpx;
  }
  .item {
    width: 100%;
    // margin-bottom: 20rpx;
    padding-bottom: 0 0 5rpx;
  }

  .goods {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    margin-bottom: 20rpx;
    background: #fff;
    height: 200rpx;
    width: 100%;
    padding: 20rpx;
    & > image {
      width: 160rpx;
      height: 160rpx;
      margin-right: 16rpx;
    }
    .content-view {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: space-between;
      color: #333333;
      .right-view-title {
        .t {
          width: 100%;
        }
      }
      .right-view-bottom {
        height: 48rpx;
        display: flex;
        // position: relative;
        justify-content: space-between;
        .right-view-bottom-desc {
          display: flex;
        }
        .steper {
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
.none-view{
  height:100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  image{
    width: 485rpx;
    height: 291rpx;
  }
}
</style>
