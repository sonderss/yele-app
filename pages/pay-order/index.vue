<template>
  <view class="pay-order p-tb-20 p-lr-30">
    <view class="card p-lr-20 ">
      <view class="top p-tb-20 min-border-bottom">
        <view class="title">账单信息</view>
      </view>
      <view class="main p-tb-30">
        <view class="item">订单金额：￥{{list.order_info.order_total}}</view>
        <view class="item">优惠金额：￥{{list.order_info.discount_total}}</view>
        <view class="item">应付金额：￥{{list.order_info.actual_total}}</view>
      </view>
    </view>
    <view class="card p-lr-20 m-top-20">
      <view class="top p-tb-20 min-border-bottom">
        <view class="title">签折</view>
        <view class="remain-amount">剩余额度：￥{{list.order_info.quota}}</view>
      </view>
      <view class="discount-wrap m-top-20">
        <view class="discounts">
          <view class="discount">
            <min-radio title="全单打折" :label="ALL_DZ" v-model="discountType"/>
          </view>
          <view class="discount">
            <min-radio title="全单优惠" :label="ALL_YH" v-model="discountType"/>
          </view>
          <view class="discount">
            <min-radio title="单品打折" :label="SINGLE_DZ" v-model="discountType"/>
          </view>
          <view class="discount">
            <min-radio title="单品优惠" :label="SINGLE_YH" v-model="discountType"/>
          </view>
        </view>
        <!--全单打折-->
        <view class="all-dz" v-if="discountType === ALL_DZ">
          <view class="header">
            <view class="title">全单打折</view>
            <min-stepper psize="100rpx" :isAnimation="false" v-model="allAiscount" max="10" unit="折"/>
          </view>
          <min-slider v-model="allAiscount" max="10"/>
        </view>
        <!--全单优惠-->
        <view class="all-yh" v-if="discountType === ALL_YH">
          <view style="padding-bottom: 20rpx;">全单优惠</view>
          <view class="header">
            <view class="label">优惠金额</view>
            <input class="input" type="number"  v-model="qdyouhui" placeholder="请输入优惠金额" placeholder-style="font-size:28rpx;">
          </view>
        </view>
        <!--单品打折-->
        <view class="single-dz" v-if="discountType === SINGLE_DZ">
          <view style="padding-bottom: 20rpx;">单品打折</view>
          <view class="goods" v-for="item in list.order_product_list" :key='item.id'>
            <view class="stepper">
               <view class="f28">{{item.product_name}}</view>
              <min-stepper :isAnimation="false" v-model="item.singleAiscount" psize="100rpx" max="10" unit="折"/>
            </view>
             <min-slider v-model="item.singleAiscount" max="10"/>
          </view>
        </view>
        <!--单品优惠-->
        <view class="single-dz" v-if="discountType === SINGLE_YH">
          <view style="padding-bottom: 20rpx;">单品优惠</view>
          <view class="goods"  v-for="item in list.order_product_list" :key='item.id'>
            <view class="stepper m-tb-10">
               <view class="f28">{{item.product_name}}</view>
               <!--<min-stepper :isAnimation="false" v-model="singlePAic" max="10" unit="折"/>-->
                <input class="input" type="number" v-model="item.youhui" placeholder="请输入优惠金额" placeholder-style="font-size:28rpx;">
            </view>
          </view>
        </view>

        <view class="f28 p-bottom-30" v-if="discountType === 0">扣除赠送额度：￥{{kouchu ? kouchu: 0}}</view>
        <view class="f28 p-bottom-30" v-if=" discountType === 1">扣除赠送额度：￥{{quanyou ? quanyou: 0}}</view>
        <view class="f28 p-bottom-30" v-if=" discountType === 2 || discountType === 3">扣除赠送额度：￥{{k ? k : 0}}</view>

      </view>
    </view>
    <!--支付方式-->
  
    
      <min-pay v-model="payMethod"/>
    <min-goods-submit leftText="应付"  @submit="submit" :totalAmount="money" buttonText="支付" />
  </view>
</template>

<script>
//    全单打折     全单优惠    单品打折        单品优惠
const ALL_DZ = 0; const ALL_YH = 1; const SINGLE_DZ = 2; const SINGLE_YH = 3

export default {
  name: 'redpay-order',
  navigate: ['navigateTo','redirectTo'],
  data () {
    return {
      ALL_DZ,
      ALL_YH,
      SINGLE_DZ,
      SINGLE_YH,
      discountType: 0, // 签折方式
      allAiscount: 10,
      singlePAic: 0,
      singleAiscount: 0,
      list: { order_info: { order_price: '' } },
      payMethod: 1,
      qdyouhui: '',
      kouchu: 0,
      money: '',
      delArr:[],
      quanyou:''
    }
  },
  onLoad () {
    console.log(this.$parseURL().data)
  },
  computed: {
    k () {
      let num = 0
      this.list.order_product_list.map((item, index) => {
        if (this.discountType === 2 && item.singleAiscount) {
          num += (item.order_price * item.quantity - (((item.singleAiscount / 10) * item.order_price * item.quantity).toFixed(2))).toFixed(2) * 1
        } else if (this.discountType === 3 && item.youhui) {
          num += item.youhui * 1
        }
      })
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.money = (this.list.order_info.actual_total - num * 1).toFixed(2)
      return num
    }
  },
  watch: {
    kouchu (a) {
      console.log(a)
      if (this.discountType === 0 || this.discountType === 1) {
        this.money = (this.list.order_info.actual_total - a * 1).toFixed(2)
      }
    },
    quanyou(a){
         this.money = (this.list.order_info.actual_total - a * 1).toFixed(2)
    },
    // 全单打折
    allAiscount (a) {
      if (a === 0) {
        // eslint-disable-next-line no-return-assign
        this.kouchu = 0
        return
      }
      // 80% 8折    a/100* 100%
      this.kouchu = (this.list.order_info.actual_total - (((a / 10) * this.list.order_info.actual_total).toFixed(2))).toFixed(2)
    },
    // 全单优惠
    qdyouhui (a) {
      console.log(a)
      this.quanyou = a
    },
    money (a) {
      console.log(a)
      if (a * 1 < 0) {
        this.$showToast('请重新输入合法值')
        this.money = this.list.order_info.actual_total
      }
    },
    discountType (a) {
        this.money = 0
      if(a === 0){
        this.kouchu = (this.list.order_info.actual_total - (((this.allAiscount / 10) * this.list.order_info.actual_total).toFixed(2))).toFixed(2)
         this.money = (this.list.order_info.actual_total - this.kouchu  * 1).toFixed(2)
      }else if(a === 1) {
          this.kouchu = this.quanyou 
            this.money = (this.list.order_info.actual_total - this.kouchu  * 1).toFixed(2)
      }
    },
    delArr(a){
      a.map((item,index) => {
         this.$store.state.goods.orderSelArr.splice(index,1)
      })
    }
  },
  methods: {
    submit () {
      if (this.list.order_info.can_use_quota) {
        const discountData = { signoff_type: this.discountType }
        if (this.discountType === 1) {
          discountData.discount = this.kouchu
        } else if (this.discountType === 0) {
          discountData.discount = this.allAiscount
        } else {
          discountData.signoff_product = []
          this.list.order_product_list.map(item => {
            const obj = {}
            obj.detail_id = item.detail_id
            obj.type = item.type
            if (this.discountType === 2) {
              if (item.singleAiscount !== 0) {
                obj.discount = item.singleAiscount
              }
            } else if (this.discountType === 3) {
              if (item.youhui) {
                obj.discount = item.youhui * 1
              }
            }
            discountData.signoff_product.push(obj)
          })
        }
        const data = {
          order_id: this.$parseURL().data.order_id,
          payment_id: this.payMethod,
          desk_id: this.$parseURL().data.desk_id,
          discount: JSON.stringify(discountData)
        }
        this.$minApi.confirmOrder(data).then(res => {
          console.log(res)
            if(res.paid === 1){
              this.$showToast('支付成功')
              setTimeout(() => {
                this.$minRouter.push({
                  name: 'redpay-success',
                  type:"redirectTo",
                  params: {id:this.$parseURL().data.order_id}
                })
              }, 2000)
            }else{
              this.$showToast('第三方支付开发中')
            }
        })
      } else {
        console.log(this.$parseURL().data.order_id);
        this.$minApi.confirmOrder({
          order_id: this.$parseURL().data.order_id,
           payment_id: this.payMethod,
          desk_id: this.$parseURL().data.desk_id
        }).then(res => {
          console.log(res)
            this.$showToast('支付成功')
            if(res.paid === 1){ 
              setTimeout(() => {
                this.$minRouter.push({
                  name: 'redpay-success',
                  type:"redirectTo",
                  params: {id:this.$parseURL().data.order_id}
                })
              }, 2000)
            }else{
              this.$showToast('第三方支付开发中')
            }
        })
      }
      this.$store.state.goods.orderSelArr.map((item,index) => {
          this.delArr.push(index)
      })
    }
  },
  mounted () {
    this.$minApi.previewOrder({ order_id: this.$parseURL().data.order_id, desk_id: this.$parseURL().data.desk_id, open_status: this.$parseURL().data.open_status }).then(res => {
      this.list = res
      this.money = this.list.order_info.actual_total
      console.log(this.list)
      this.list.order_product_list.map(item => {
        this.$set(item, 'singleAiscount', 10)
      })
    // eslint-disable-next-line handle-callback-err
    }).catch(err => {
      setTimeout(() => {
        this.$minRouter.push({
          name: 'platform-admin'
        })
      }, 2000)
    })
  }

}

</script>

<style lang="scss">
.pay-order{
  padding-bottom: 120rpx;
  .card{
    background: #fff;
    border-radius: 10rpx;
    .top{
      display: flex;
      justify-content: space-between;
      .title{
        line-height: 60rpx;
      }
      .btn{
        background-color: #FFE000;
        padding: 10rpx 15rpx;
        border-radius: 10rpx;
      }
      .remain-amount{
        color: #FF0000;
        line-height: 60rpx;
      }
    }
    .main{
      .item{
        margin-top: 10rpx;
        &:first-child{
          margin: 0;
        }
      }
    }
    .discount-wrap{
      background: #fff;
      border-radius:10rpx;
      .discounts{
        display: flex;
        justify-content: space-between;
        .discount{
          margin-bottom: 20rpx;
          &:last-child{
            margin: 0;
          }
          .text{
            vertical-align: top;
          }
        }
      }
    }
    .all-dz,.all-yh{
      padding-bottom: 20rpx;
      .header{
        display: flex;
        justify-content: space-between;
        .title{
          margin-top: 10rpx;
        }
        .input{
          width: 220rpx;
        }
      }
    }
    .single-dz{
      .goods{
        .stepper{
          text-align: right;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
    .single-yh{
      .goods{
        display: flex;
        justify-content: space-between;
        padding-bottom: 10rpx;
        .input{
          width: 220rpx;
        }
      }
    }
    .pays{
      display: flex;
      flex-wrap: column;
      flex-wrap: wrap;
      align-content: space-between;
      .pay{
        width: 50%;
      }
    }
  }
}
</style>
