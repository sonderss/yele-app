<template>
<view class="product-details p-tb-20 p-lr-30">
    <swiper
      class="swiper"
      :circular="true"
      :autoplay="true"
      :interval="2000"
      :duration="500"
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
        <view class="f22 m-bottom-20">
          ￥ <text class="price">{{list.price}}</text>
          <!-- v-model="list.step" @change="changeServiceItem(list)" :max="commodity_count" -->
        </view>
         <min-stepper v-model="list.step" :max="commodity_count"></min-stepper>
      </view>
    </view>
    <view class="introduction " v-for="(item,index) in list.combination" :key="index">
      <view class="title min-border-bottom m-bottom-30 p-lr-20" v-if="item.necessary === 1">必选商品</view>
        <view class="content p-bottom-30" v-if="item.necessary === 1">
          <min-describe  :leftIconValue="list.setmeal_logo"
          :leftIcon='true'
          leftTxt='百威兄弟终极套餐12瓶测试'
          :num="list.combination[0].last_number+''"
        ></min-describe>
      </view>

        <view class="title min-border-bottom m-bottom-30 p-lr-20">
           <text class="left-txt">请选择{{item.combination_name}}{{item.last_number+ '份'}}（{{item.is_check === 1 ? '不可重复选' : ''}}）</text>
           <text v-if="type !== 3" class="right-txt f26">已选 <text class="num1">{{getCount}}</text> 份</text>
        </view>
        <view class="content p-bottom-30">
          <min-describe  class="i"
           v-for="(item2,index2) in item.combination_detail"
          :key="index2"
          :leftIcon='true'
          @changeCount="changeCount($event,index,index2)"
           :maxStep="item.is_check === 1 ? 1 : 999"
          :leftTxt="item2.product_name + `*${item2.num}` "
          :leftIconValue='item2.comb_type === 1 ? item2.product_img : item2.product_img'
          :step='type === 3 ? false: true'
          ></min-describe>
        </view>
    </view>
    <view class="empty_view"></view>
    <view class="btn" @click="sureSubmit">确定</view>
    <min-modal ref="test"></min-modal >

</view>
</template>

<script>
export default {
  name: 'packages-detail',
  navigate: ['navigateTo'],
  data () {
    return {
      items: [],
      autoplay: true,
      interval: 2000,
      duration: 500,
      num: 0,
      num1: 2,
      num_prducts: 0,
      type: Number,
      setmeal_id: '',
      list: { combination: [{ last_number: '', combination_detail: [] }] },
      content: '',
      totalLabel: '',
      selArr: [],
      selArrL: [], // 全局变量
      commodity_count: '',
      desk_id: ''
    }
  },
  onLoad (option) {
    // this.list = this.$parseURL().setmeal_idgetPackageDetails
    console.log(option)
    this.desk_id = option.desk_id
    this.setmeal_id = option.setmeal_id
    this.commodity_count = option.commodity_count
    console.log('套餐ID', this.setmeal_id)
    const info = this.$store.state.goods.giveAwayInfo
    this.content = `
          1. 当前台消费金额￥${info.consumption_amount}，根据赠送方案，可赠送的商品金额为￥${info.desk_presentation_limit}。<br />
          2. 当前用户的赠送额度为￥${info.personal_presentation_limit}，不能超过此额度。<br />
      `
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
  mounted () {
    this.$minApi.getOriderPackageDetails({ setmeal_id: this.setmeal_id })
      .then(res => {
        res.info.combination.map(item => {
          item.combination_detail.map(item2 => {
            item2.step = 0
          })
        })
        this.list = res.info
        this.list.commodity_count = this.commodity_count
        this.list.type = 'setmeal'
        console.log(this.list)
      })
  },
  computed: {
    getCount () {
      let cou = 0
      this.list.combination.map(item => {
        item.combination_detail.map(item2 => {
          cou += item2.step
        })
      })
      return cou
    }
  },
  methods: {
    // changeCount (n, index, index2) {
    //   // this.num_prducts = n
    //   console.log(n, index, index2)
    //   this.list.combination[index].combination_detail[index2].step = n
    // },
    sureSubmit () {
      console.log(this.selArr)
      // console.log(this.list)
      const obj = {}
      Object.assign(obj, this.list)
      obj.combination = this.selArr
      // this.addGoods(obj)
      this.selArrL.push(obj)
      console.log(this.selArrL)
      this.$store.dispatch('goods/setStoreSelArr', this.selArrL)
      setTimeout(() => {
        this.$minRouter.push({
          name: 'give-away',
          params: { desk_id: this.desk_id }
        })
      }, 2000)
    },

    changeCount (n, index, index2) {
      // this.num_prducts = n
      this.list.combination[index].combination_detail[index2].step = n
      const item = { id: '' }

      // obj.combination = []
      item.id = this.list.combination[index].combination_detail[index2].comb_id
      item.combination_detail = []
      const item2 = { id: '' }
      item2.id = this.list.combination[index].combination_detail[index2].product_id
      item2.type = this.list.combination[index].combination_detail[index2].comb_type === 1 ? 'product' : 'service'
      item2.quantity = this.list.combination[index].combination_detail[index2].step
      item2.sku_id = this.list.combination[index].combination_detail[index2].sku_id
      // item.combination_detail.push(item2)
      // item.detail = item2
      item.combination_detail.push(item2)

      // this.detail.push(item)
      this.addGoods(item)
    },
    addGoods (obj) {
      if (this.selArr.length === 0) {
        this.selArr.push(obj)
        return
      }

      const resultF = this.selArr.some(item => {
        if (item.id !== obj.id) {
          return true
        }
        const result = item.combination_detail.some(item2 => {
          if (item2.sku_id === obj.combination_detail[0].sku_id) {
            item2.quantity = obj.combination_detail[0].quantity
            return true
          }
        })
        if (!result) {
          item.combination_detail.push(obj.combination_detail[0])
          // this.selArr.push(obj)
        }
      })
      if (resultF) {
        this.selArr.push(obj)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.product-details {
  .swiper {
    width: 690rpx;
    height: 690rpx;
    .swiper-item {
      width: 100%;
      height: 100%;
      image{
        width: 100%;
        height: 100%;
      }
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
    margin-bottom: 20rpx;
    .title{
      width: 100%;
      height: 86rpx;
      line-height: 86rpx;
      display: flex;
      justify-content: space-between;
      .right-txt{
        color: #666666;
        .num{
          color: #333;
          font-weight: bold;
          padding: 0 5rpx;
        }
        .num1{
          padding: 0 5rpx;
        }
      }
    }
    .i{
      margin: 20rpx 0;
    }
  }
  .btn{
    width:100%;
    height:98rpx;
    background:rgba(255,224,1,1);
    position: fixed;
    bottom: 0;
    left: 0;
    font-size:32rpx;
    color:rgba(51,51,51,1);
    line-height:98rpx;
    text-align: center;
  }
}
.empty_view{
  width: 100%;
  height: 100rpx;
}
</style>
