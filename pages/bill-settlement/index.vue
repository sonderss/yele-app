<template>
<view class="bill-settlement  p-tb-20 p-lr-30">
    <min-cell :card="false">
        <view class="f30 p-tb-25">
            <text>订单信息</text>
        </view>
        <view class="min-border-bottom m-bottom-30" style="height:1rpx"></view>
        <view class="main min-flex min-flex-dir-top min-flex-align-top f28 p-bottom-10" v-if="list.orders.length > 0">
            <view v-for="item in list.orders" :key="item.id" class=" m-bottom-20" style="width:100%;display: flex;justify-content: space-between;">
                <text class="f28">订 单 号 ：{{item.order_sn}}</text>
                <text class="f26">￥{{item.unpay_price}} </text>
            </view>
            <view class="min-border-bottom" style="height:1rpx"></view>
            <view class="order min-border-top">合计：<text>￥{{list.amount}}</text></view>
        </view>
        <view v-else class="no_data">暂无数据</view>
    </min-cell>
    <min-pay v-model="payType" scene="1" />
    <min-goods-submit leftText="应付" @submit="submit" :totalAmount="list.amount" buttonText="支付" />
</view>
</template>

<script>
export default {
    name: "bill-settlement",
    navigate: ["navigateTo"],
    data() {
        return {
            payType: 1,
            id: '',
            list: {
                orders: []
            },
            payM: []
        }
    },
    methods: {
        submit() {
            if (this.list.orders.length <= 0) {
                return this.$showToast('暂无此订单')
            }
            // if(this.payType === 1 || this.payType === 2){
            //     // 第三方二维码支付
            //     this.$minRouter.push({
            //       name:"pay-code"
            //     })
            //     return
            // }
            let obj = {
                payment_id: this.payType,
                target_id: this.list.checkoutId, // this.$parseURL().billId,
                target_type: 2
            }
            this.$minApi.postPay(obj).then(res => {
                console.log(res)
                if (res.paid === 1) {
                    this.$showToast('支付成功')
                    setTimeout(() => {
                        uni.navigateBack({
                            delta: 1
                        });
                    }, 2000)

                    // open_id  desk_id
                    // setTimeout(() => {
                    //   this.$minRouter.push({
                    //     name: 'pay-success',
                    //     params: {id:this.$parseURL().billId}
                    //   })
                    // }, 2000)
                } else {
                    // this.$showToast('第三方支付开发中')
                    this.$minRouter.push({
                        name: "pay-code",
                        params: {
                            info: {
                                payment_id: this.payType,
                                money: this.list.amount,
                                desk_name: this.list.desk.desk_name
                            },
                            data: res.payParam,
                            id: res.id
                        }
                    })
                }
            })
        }
    },
    mounted() {
        console.log(this.$parseURL())
        this.$minApi.getBillInfo({
            bill_id: this.$parseURL().billId
        }).then(res => {
            console.log(res) // checkoutId
            this.list = res
        })

    }
}
</script>

<style lang="scss" scoped>
.order {
    height: 87rpx;
    width: 100%;
    text-align: right;
    line-height: 87rpx;
    color: #FF0000;

    text {
        font-weight: bold;
        color: #FF0000;
    }
}

.pay-wrap {
    background: #fff;
    border-radius: 10rpx;

    .pays {
        display: flex;
        flex-wrap: column;
        flex-wrap: wrap;
        align-content: space-between;

        .pay {
            width: 50%;
        }
    }
}

.no_data {
    height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
