<template>
<view class="confirm-order">
    <view class="p-top-20 p-lr-30" style="padding-bottom: 66rpx;">
        <view class="platform-info f28 p-lr-20 p-tb-20" :style="list.order_info.is_can_open === 0 ? 'background:#ffe4e4' : 'background:#fff'">
            <view>台位低消：￥{{list.order_info.minim_charge}}</view>
            <view>开台条件：<text class="emp">{{list.order_info.minim_charge*1 === 0 ? '无低消' :  `${ list.order_info.minimum_percent}%低消(￥${list.order_info.desk_open_minimum})`}}</text></view>
            <view v-if='!$parseURL().isOrder'>订单金额：￥{{list.order_info.order_total}}</view>
            <view>达成状态：{{list.order_info.is_can_open === 0 ? "未达成开台条件":"达成开台条件"}}</view>
        </view>
        <view v-if='!$parseURL().isOrder' class="goods-wrap m-top-20 p-lr-20">
            <view class="p-tb-30 min-border-bottom">商品</view>
            <view class="goods-list p-top-10">
                <view class="p-tb-20" v-for="item in list.order_product_list" :key="item.id">
                    <min-goods-item :name="item.product_name" :price="item.order_price" :icon="item.product_img" :specification="item.type === 'setmeal' ? item.setmeal_product:item.sku" :value="item.quantity">
                    </min-goods-item>
                </view>
            </view>
        </view>
        <min-pay v-if='!$parseURL().isOrder' v-model="payType" />
    </view>
    <min-goods-submit @submit="submit" :bgcolor='bgcolor' :leftText="'￥'+ totalAmount" leftTextDesc="合计：" leftTextColor="red" leftTextWidth='350rpx' :buttonText="buttonText" />
</view>
</template>

<script>
export default {
    name: 'redconfirm-order',
    navigate: ['navigateTo', 'redirectTo'],
    data() {
        return {
            payType: 1,
            list: {
                order_info: {
                    minim_charge: ''
                }
            },
            buttonText: '',
            totalAmount: '',
            delArr: [],
            bgcolor: 'rgba(255, 224, 0, 1)'
        }
    },
    watch: {
        delArr(a) {
            a.map((item, index) => {
                this.$store.state.goods.orderSelArr.splice(index, 1)
            })
        }
    },
    onBackPress(options) {
        if (this.list.order_info.is_can_open === 0) {
            // 不满足开台条件
            this.$minRouter.push({
                name: 'redplacean-order',
                type: 'redirectTo',
                params: {
                    desk_id: this.$parseURL().desk_id,
                    minim_charge: this.list.order_info.minim_charge
                }
            })
            return true
        }
    },
    methods: {
        submit() {
            if (this.bgcolor === '#CCC') return
            if (this.$parseURL().isOrder) {
                // 没有订单 - 申请开台
                console.log(this.$parseURL())
                this.$minRouter.push({
                    name: 'redapply-open',
                    type: 'redirectTo',
                    params: {
                        desk_id: this.$parseURL().desk_id,
                        isOrder: true,
                        data: this.$parseURL().data,
                        payId: this.payType
                    }
                })
                return
            }
            if (this.list.order_info.is_can_open === 1) {
                // if (this.payType === 1 || this.payType === 2) {
                //     // 第三方二维码支付
                //     this.$minRouter.push({
                //         name: "pay-code",
                //         params: {
                //             info: {
                //                 payment_id: this.payType,
                //                 money: this.totalAmount,
                //                 desk_name: this.list.order_info.desk_name
                //             },
                //             data: res.payParam,
                //             id: res.id,
                //             order_id: this.$parseURL().order_id
                //         }
                //     })
                //     return
                // }
                this.$minApi.confirmOrder({
                    order_id: this.$parseURL().order_id,
                    payment_id: this.payType,
                    desk_id: this.$parseURL().desk_id
                }).then(res => {
                    console.log(res)
                    if (res.paid === 1) {
                        this.$minRouter.push({
                            name: 'redopen-success',
                            type: "redirectTo",
                            params: {
                                client_mobile: this.list.order_info.client_mobile,
                                client_name: this.list.order_info.client_name,
                                desk_id: this.list.order_info.desk_id,
                                desk_name: this.list.order_info.desk_name
                            }
                        })
                    } else {
                        // this.$showToast('第三方支付开发中')
                        //     // 第三方二维码支付
                        this.$minRouter.push({
                            name: "pay-code",
                            params: {
                                info: {
                                    payment_id: this.payType,
                                    money: this.totalAmount,
                                    desk_name: this.list.order_info.desk_name
                                },
                                data: res.payParam,
                                id: res.id,
                                order_id: this.$parseURL().order_id
                            }
                        })
                        return
                    }
                    // this.$showToast('开台成功')
                    // this.$store.dispatch('goods/setOrderSelArr', [])
                    // setTimeout(() => {

                    // }, 2000)
                })
            } else {
                // 申请开台
                console.log(this.$parseURL())
                this.$minRouter.push({
                    name: 'redapply-open',
                    type: 'redirectTo',
                    params: {
                        desk_id: this.$parseURL().desk_id,
                        order_id: this.$parseURL().order_id,
                        open_status: 0,
                        payId: this.payType
                    }
                })
            }
            this.$store.state.goods.orderSelArr.map((item, index) => {
                this.delArr.push(index)
            })
        }
    },
    mounted() {
        console.log('系只能', this.$parseURL().isNewMasT)
        console.log('订单ID', this.$parseURL())
        if (this.$parseURL().isOrder) {
            // 没有订单
            console.log('没有订单');
            this.buttonText = '申请开台'
            this.totalAmount = '0'
            this.list = this.$parseURL().data
            return
        }
        this.$minApi.previewOrder({
            order_id: this.$parseURL().order_id,
            desk_id: this.$parseURL().desk_id,
            open_status: this.$parseURL().open_status
        }).then(res => {
            this.list = res
            this.totalAmount = this.list.order_info.actual_total

            // 判断是否是点单并开台来的
            // if (this.$parseURL().isNewMasT) {
            //     if (this.list.order_info.is_can_open === 1) {
            //         this.buttonText = '支付并开台'
            //     } else {
            //         this.buttonText = '支付并开台'
            //         this.bgcolor = '#CCC'
            //     }
            //     return
            // }

            if (this.list.order_info.is_can_open === 1) {
                this.buttonText = '支付并开台'
            } else {
                // this.buttonText = '申请开台'
                this.buttonText = '支付并开台'
                this.bgcolor = '#CCC'
            }
            console.log(this.list)
            // eslint-disable-next-line handle-callback-err
        })
        // .catch(err => {
        //   setTimeout(() => {
        //     this.$minRouter.push({
        //       name: 'platform-admin'
        //     })
        //   }, 2000)
        // })
    }
}
</script>

<style lang="scss" scoped>
.confirm-order {
    padding-bottom: 120rpx;

    .platform-info {
        border-radius: 10px;

        .emp {
            color: #FF0000;
            font-weight: bold;
        }
    }

    .goods-wrap {
        background: #fff;
        margin-bottom: 10rpx;

        .count {
            float: right;
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
}
</style>
