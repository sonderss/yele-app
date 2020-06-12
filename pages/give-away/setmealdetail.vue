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
           <text class="left-txt">请选择{{item.combination_name}}{{item.last_number+ '份'}}{{item.is_check === 1 ? '（不可重复选）' : ''}}</text>
           <text v-if="type !== 3" class="right-txt f26">已选 <text class="num1">{{item.goodsCount}}</text> 份</text>
        </view>
        <view class="content p-bottom-30">
          <min-describe  class="i"
           v-for="(item2,index2) in item.combination_detail"
          :key="index2"
          :leftIcon='true'
            :value="item2.step"
          @changeCount="changeCount($event,index,index2)"
            :maxStep="item.is_check === 1 ? 1 : 999"
          :leftTxt="item2.product_name + `*${item2.num}` "
          :leftIconValue='item2.comb_type === 1 ? item2.product_img : item2.product_img'
          :step='type === 3 ? false: true'
          ></min-describe>
        </view>
    </view>
    <view class="empty_view"></view>
    <view class="btn" @click="subMit">确定</view>
    <min-modal ref="test"></min-modal >

</view>
</template>

<script>
export default {
  name: 'setmealdetail',
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
    this.commodity_count =""
    console.log('套餐ID', this.setmeal_id)
    const info = this.$store.state.goods.giveAwayInfo
    this.content = `
          1. 当前台消费金额￥${info.consumption_amount}，根据赠送方案，可赠送的商品金额为￥${info.desk_presentation_limit}。<br />
          2. 当前用户的赠送额度为￥${info.personal_presentation_limit}，不能超过此额度。<br />
          3. 不同商品的可赠数量不同，不能超过最高可赠数量 <br />
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
  watch:{
    list:{
       handler(a){
         console.log("a",a);
          a.combination.map(item => {
            if(item.goodsCount > item.last_number){
                this.$showToast("请选择正确数量")
                item.goodsCount = 0
                item.combination_detail.map(item2 => {
                    if(item2.step > 0){
                        this.$set(item2,"step",0)
                        console.log(item2);
                    }
                })
            }
          })
       },
       deep:true
    }
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
    changeCount (n, index, index2) {
      // this.num_prducts = n
      this.list.combination[index].combination_detail[index2].step = n
      // this.list.combination[index].goodsCount += 1
      let num = 0
      this.list.combination[index].combination_detail.map(item2 => {
        num += item2.step
      })
      this.list.combination[index].goodsCount = num

      const item = { id: '' }

      // obj.combination = []
      item.id = this.list.combination[index].combination_detail[index2].comb_id
      item.combination_detail = []
      const item2 = { id: '' }
      item2.id = this.list.combination[index].combination_detail[index2].product_id
      item2.type = this.list.combination[index].combination_detail[index2].comb_type === 1 ? 'product' : 'service'
      item2.quantity = this.list.combination[index].combination_detail[index2].step
      item2.sku_id = this.list.combination[index].combination_detail[index2].sku_id
      item.combination_detail.push(item2)
      this.addGoods(item)
    },
    addGoods (obj) {
      if (this.selArr.length === 0) {
        this.selArr.push(obj)
        return
      }

      const resultF = this.selArr.some(item => {
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
        if (item.id === obj.id) {
          return true
        }
      })
      if (!resultF) {
        this.selArr.push(obj)
      }
    },
    subMit () {
      console.log(this.list)
      const result = this.list.combination.some(item => {
        if (item.necessary === 1) {
          if (item.goodsCount !== item.last_number) {
            return true
          }
        }
      })
      if (result) {
        return this.$showToast('请选择正确的份数')
      }
      const tempArr = JSON.parse(JSON.stringify(this.selArr))
      tempArr.map((item, index) => {
        item.combination_detail.map((item2, index2) => {
          if (item2.quantity === 0) {
            this.selArr[index].combination_detail.splice(index2, 1)
          }
        })
      })
      console.log( this.selArr)
      // this.$store.dispatch('goods/setOrderSelArr', this.selArr)
      console.log(JSON.stringify(this.selArr) )
      uni.navigateTo({
          url: '/pages/give-away/taocan?setmeal_id=' + this.setmeal_id + '&desk_id=' + this.desk_id+'&product='+ JSON.stringify(this.selArr) 
      })
      // this.$minRouter.push({
      //   name: 'package-details',
      //   params: {
      //     product_type: this.$parseURL().data.product_type,
      //     minim_charge: this.$parseURL().data.minim_charge,
      //     product_id: this.$parseURL().data.product_id,
      //     desk_id: this.$parseURL().data.desk_id,
      //     is_open_desk: this.$parseURL().data.is_open_desk,
      //     product: this.selArr
      //   }
      // })
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
        white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
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
