<template>
<view class="order-detail p-bottom-20 p-lr-30">
    <view class="goods-wrap m-top-20 p-lr-20">
        <view class="p-tb-30 min-border-bottom">
            商品
            <view class="status" :class="$minCommon.getOrderStatus(list.order_status).color">{{$minCommon.getOrderStatus(list.order_status).desc}}</view>
        </view>
        <view class="goods-list p-top-10">
            <view class="p-tb-10" v-for="(item,index) in list.order_product_list" :key="item.detail_id">
                <!--已出品-->
                <min-goods-item :class="index === list.order_product_list.length-1 ? 'p-bottom-20' : ''" @ToDetail="goodsDeatil(item.id,item.type)" :produced="item.produce_status ? true:false" :name="item.product_name" :price="item.order_price" :icon="item.product_img" :specification="item.type === 'setmeal' ? item.setmeal_product:`${item.sku}${item.sku ? '/':''}${item.unit_name}`" :value="item.quantity"></min-goods-item>
            </view>
        </view>
    </view>
    <view class="card p-lr-20 m-top-20" v-if="list.origin_order.order_sn">
        <view class="top p-tb-20 min-border-bottom">
            <view class="title">原订单信息</view>
            <view class="btn" @click="viewOldOrder">查看原订单</view>
        </view>
        <view class="main p-tb-30">
            <view class="item">原订单号：{{list.origin_order.order_sn}}</view>
            <view class="item">订单金额：￥{{list.origin_order.order_total}}</view>
            <view class="item">已付金额：￥{{list.origin_order.pay_price}}</view>
        </view>
    </view>
    <view class="card p-lr-20 m-top-20" v-if="list.return_order.new_order_id && list.order_status === -5 ||list.order_status === -6  || list.order_status === -4  || list.order_status === -3">
        <view class="top p-tb-20 min-border-bottom">
            <view class="title">变更信息</view>
            <view class="btn" v-if="list.order_status !== -3" @click="viewNewOrder(list.return_order.new_order_id)">查看新订单</view>
        </view>
        <view class="main p-tb-30">
            <!-- 这里需要数据测试 
            <text v-if="list.return_order.return_product[0].type === 1"></text>
            <text v-if="list.return_order.return_product[0].type === 2"></text>-->
            <template v-if="list.return_order.return_product.length > 0">
                <view class="item item_products">
                    <view class="desc">退货商品：</view>
                    <view class="content">
                        <view v-for="item in list.return_order.return_product" :key="item.id">
                            <view>{{item.product_name}}</view>
                        </view>
                    </view>
                </view>
            </template>
            <template v-if="list.return_order.add_product.length > 0">
                <view class="item item_products">
                    <view class="desc"> 新增商品：</view>
                    <view class="content">
                        <view class="item item_products" v-for="item in list.return_order.add_product" :key="item.id">
                            <view>{{item.product_name}}</view>
                        </view>
                    </view>
                </view>

            </template>

            <view class="item">新订单金额：￥{{list.return_order.new_order_total}}</view>
            <view class="item">已付金额：￥{{list.pay_price}}</view>
            <view class="item" v-if="list.return_order.price_type === 1">待补金额：￥{{list.return_order.price}}</view>
            <view class="item" v-if="list.return_order.price_type === 2">退还金额：￥{{list.return_order.price}}</view>

            <view class="item">审<span style="padding-left:20rpx"></span>核<span style="padding-left:10rpx">人：</span>{{list.return_order.reviewer_name ? `${list.return_order.reviewer_name}` : '-'}}</view>
            <view class="item">收 <span style="padding-left:60rpx">银：</span>{{list.return_order.cashier_name}}</view>
            <view class="item">时 <span style="padding-left:60rpx">间：</span>{{$minCommon.formatDate(new Date(list.return_order.audit_time*1000),'yyyy/MM/dd hh:mm:ss' ) }}</view>
        </view>
    </view>
    <view class="card p-lr-20 m-top-20">
        <view class="top p-tb-30 min-border-bottom">订单信息</view>
        <view class="main p-tb-30" v-if='list.order_type !== 1'>
            <view class="item">订&nbsp;单&nbsp;<span class='p-left-20'>号：</span>{{list.order_sn}}</view>
            <view class="item" v-if="list.order_status === 0 || list.order_status === -1">订单来源：{{list.source ? '平台':'门店'}}</view>
            <view class="item">支付类型：{{list.pay_type === 0 ? '先付' :'后付'}}</view>
            <view class="item">下单人员：{{list.order_user_name ? list.order_user_name  : '暂无数据'}}</view>
            <view class="item">下单时间：{{$minCommon.formatDate(new Date(list.create_time*1000),'yyyy/MM/dd hh:mm:ss' ) }}</view>
            <view class="item">订单金额：￥{{list.order_total}}</view>
            <view class="item">已付金额：￥{{list.pay_price}}</view>
            <view class="item">应付金额：￥{{list.actual_total}}</view>
            <view class="item" v-if="list.order_status !== 1 && list.order_status !== 2 && list.order_status !== 3 && list.order_status !== 4 && list.order_status !== -2 && list.order_status !== -3  && list.order_status !== -5">待付金额：￥{{list.unpay_price}}</view>
            <view class="item">
                支付状态：
                <text :class="list.pay_status === 0 ? 'red'  : 'fcolor' ">{{ list.pay_status === 0 ?'未付清' : '已付清'}}</text>
            </view>
            <view class="item" v-if="list.order_status !== 0 && list.order_status !== 5 && list.order_status !== -1  && list.order_status !== -6 && !list.pay_type">支付时间：{{$minCommon.formatDate(new Date(list.pay_time*1000),'yyyy/MM/dd hh:mm:ss' )}}</view>
            <view class="item" v-if="list.order_status !== 0 && list.order_status !== 5 && list.order_status !== -1  && list.order_status !== -6 && !list.pay_type">支付方式：{{method[list.payment_id]}}</view>
            <view class="item" v-if="list.order_status !== 1 && list.order_status !== 0 && list.order_status !== 5  && list.order_status !== -6">确&nbsp;认&nbsp;<span class='p-left-20'>人：</span>{{list.confirm_user_name}}</view>
            <view class="item" v-if="list.order_status !== 1 && list.order_status !== 0 && list.order_status !== 5  && list.order_status !== -6">确认时间：{{list.confirm_time ?  $minCommon.formatDate(new Date(list.confirm_time*1000),'yyyy/MM/dd hh:mm:ss' ) : '-'}}</view>
        </view>
        <view v-else class="main p-tb-30">
            <view class="item">订&nbsp;单&nbsp;<span class='p-left-20'>号：</span>{{list.order_sn}}</view>
            <view class="item">订单类型：赠送单</view>
            <view class="item">下单时间：{{$minCommon.formatDate(new Date(list.create_time*1000),'yyyy/MM/dd hh:mm:ss' ) }}</view>
            <view class="item">订单金额：￥{{list.order_total}}</view>
        </view>
    </view>
    <view class="card p-lr-20 m-top-20" v-if="list.is_signoff === 1">
        <view class="top p-tb-30 min-border-bottom">签折信息</view>
        <view class="main p-tb-30">
            <view class="item">签折方式：{{type[list.signoff_type]}}</view>
            <view class="item" v-if="list.signoff_type !== 0 && list.signoff_type !== 1">
                <view class="method-view min-border-bottom">
                    <view class="left">优惠内容：</view>
                    <view class="right">
                        <view class="right_view" v-for="i in list.order_product_list" :key="i.id">
                            <text class="min-ellipsis" style="width:300rpx">{{i.product_name}}</text>
                            <text class="min-ellipsis" style="">￥{{i.signoff_price}}</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="item">优惠金额：￥{{list.signoff_total}}</view>
            <view class="item">签折人员：{{list.signoff_user_name}}</view>
        </view>
    </view>
    <view class="card p-lr-20 m-top-20">
        <view class="top p-tb-30 min-border-bottom">客户信息</view>
        <view class="main p-tb-30">
            <view class="item">客户姓名：{{list.client_name ? list.client_name : '暂无数据'}}</view>
            <view class="item">联系电话：{{list.client_mobile ? list.client_mobile : '暂无数据'}}</view>
        </view>
    </view>
    <view class="card p-lr-20 m-tb-20">
        <view class="top p-tb-30 min-border-bottom">台位信息</view>
        <view class="main p-tb-30">
            <view class="item">台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{list.desk_name}}</view>
            <view class="item">分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：{{list.desk_group}}</view>
            <view class="item">低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：￥{{list.desk_minimum_consume}}</view>
            <view class="item">座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{list.desk_seats }}</view>
        </view>
    </view>
    <view style="height:200rpx"></view>
    <view v-if="list.order_status !== -5 && list.order_status !== -6 && list.order_status !== -4">
        <min-goods-submit @leftClick="leftClick" :leftText="leftText" @submit="submit" :totalAmount="totalAmount" :buttonText="buttonText" v-if="showSubmit" />
    </view>
    <min-modal ref="show"></min-modal>
    <!-- 支付弹窗 -->
    <min-popup :show="showPayPop" @close="closePayPop" heightSize="800">
        <view class="p-lr-30">
            <view class="top_view">
                <text class="title">请选择支付方式</text>
                <view class="close_pay" @click="closePayPop"></view>
                <!-- <view class="f26">本次支付</view>
          <view class="money">￥{{totalAmountE}}</view>-->
            </view>
            <view class="min-border-bottom mid_view">
                <view class="moey_desc min-border-bottom p-bottom-30">金额</view>
                <view class="main_view">
                    <!-- <view class="f28 m-top-20">订单金额：￥{{list.unpay_price}}</view> -->
                    <view class="f28 m-top-10">应付金额：￥{{list.unpay_price}}</view>
                </view>
                <view class="f28 m-top-20 p-bottom-20" style="font-weight: bolder;">支付方式</view>
            </view>
            <min-pay :isTitle="false" style="margin-top:0" :mTop="false" v-model="payType" scene="2" />
            <view class="btn_pay" @click="pay_money">支付</view>
        </view>

        <!-- <view class="p-lr-30">
        <view class="top_view min-border-bottom">
          <view class="f26">本次支付</view>
          <view class="money">￥{{list.unpay_price}}</view>
        </view>
        <min-pay :mTop="false" :isTitle="false" v-model="payType"/>
        <view class="btn_pay" @click="pay_money">支付</view>
      </view> -->

    </min-popup>
</view>
</template>

<script>
// 签折类型（0：全单打折，1：全单优惠，2：单品打折，3：单品优惠）
const type = ['全单打折', '全单优惠', '单品打折', '单品优惠']
const method = ['暂无', '支付宝扫码', '微信扫码', '现金支付', '刷卡支付', '后付款']
export default {
    name: 'redorder-detail',
    navigate: ['navigateTo', 'redirectTo'],
    data() {
        return {
            leftText: '',
            totalAmount: '',
            buttonText: '',
            list: {
                order_sn: '',
                origin_order: {
                    order_sn: ''
                },
                return_order: {
                    new_order_id: '',
                    add_product: [],
                    return_product: []
                }
            },
            type,
            showPayPop: false,
            payType: 1,
            showSubmit: false,
            method
        }
    },
    onShow() {
        console.log(this.$parseURL())
        // this.$parseURL().ordr_id
        this.showSubmit = false
        this.$minApi
            .getOrderDetailDown({
                order_id: this.$parseURL().ordr_id
            })
            .then(res => {
                console.log(res)
                this.list = res
                if (this.list.order_status === 0) {
                    this.leftText = '取消订单'
                    this.buttonText = '去支付'
                    this.totalAmount = this.list.unpay_price
                    this.showSubmit = true
                } else if (this.list.order_status === -1) {
                    this.leftText = '待付金额'
                    this.buttonText = '补差价'
                    this.totalAmount = this.list.unpay_price
                    this.showSubmit = true
                }
            })
    },
    methods: {
        leftClick() {
            if (this.list.order_status !== 0) return false
            // 取消订单
            this.$refs.show.handleShow({
                title: '',
                content: '是否取消该订单?',
                contentCenter: true,
                cancelText: '否',
                confirmText: '是',
                confirmColor: 'red',
                cancelColor: '#0090ff',
                success: e => {
                    if (e.id === 1) {
                        this.$minApi
                            .cancelOrder({
                                order_id: this.list.id
                            })
                            .then(res => {
                                console.log(res)
                                this.$showToast('取消成功!')
                                setTimeout(() => {
                                    this.$minRouter.push({
                                        name: 'redorder-detail',
                                        type: 'redirectTo',
                                        params: {
                                            ordr_id: this.list.id
                                        }
                                    })
                                }, 2000)
                            })
                    }
                }
            })
        },
        // 查看原订单
        viewOldOrder() {
            if (!this.list.origin_order.id) return this.$showToast("该订单没有原订单")
            console.log("原订单ID", this.list.origin_order.id)
            this.$minApi
                .getOrderDetailDown({
                    order_id: this.list.origin_order.id
                })
                .then(res => {
                    console.log(res)
                    this.list = res
                    if (this.list.order_status === 0) {
                        this.leftText = '取消订单'
                        this.buttonText = '去支付'
                        this.totalAmount = this.list.unpay_price
                        this.showSubmit = true
                    } else if (this.list.order_status === -1) {
                        this.leftText = '待付金额'
                        this.buttonText = '补差价'
                        this.totalAmount = this.list.unpay_price
                        this.showSubmit = true
                    }
                })
        },
        // 查看新订单
        viewNewOrder(newId) {
            this.$minApi
                .getOrderDetailDown({
                    order_id: newId
                })
                .then(res => {
                    console.log(res)
                    this.list = res
                    if (this.list.order_status === 0) {
                        this.leftText = '取消订单'
                        this.buttonText = '去支付'
                        this.totalAmount = this.list.unpay_price
                        this.showSubmit = true
                    } else if (this.list.order_status === -1) {
                        this.leftText = '待付金额'
                        this.buttonText = '补差价'
                        this.totalAmount = this.list.unpay_price
                        this.showSubmit = true
                    }
                })
        },
        // 弹窗
        pay_money() {
            let obj = {
                payment_id: this.payType,
                target_id: this.list.id,
                target_type: 1
            }
            this.closePayPop()
            this.$minApi.postPay(obj).then(res => {
                console.log(res)
                if (res.paid === 1) {
                    this.$showToast('支付成功')
                    setTimeout(() => {
                        this.$minRouter.push({
                            name: 'pay-success',
                            params: {
                                id: this.$parseURL().ordr_id
                            }
                        })
                    }, 2000)
                } else {
                    // this.$showToast('第三方支付开发中')
                    this.$minRouter.push({
                        name: "pay-code",
                        params: {
                            info: {
                                payment_id: this.payType,
                                money: this.list.unpay_price,
                                desk_name: this.list.desk_name
                            },
                            data: res.payParam,
                            id: res.id,
                            order_id: this.$parseURL().ordr_id
                        }
                    })
                }
            })
        },
        // 支付弹窗
        submit() {
            this.showPayPop = true
        },
        closePayPop() {
            this.showPayPop = false
        },
        goodsDeatil(id, type) {
            console.log(type)
            if (type === 'setmeal') {
                // 跳到套餐详情页
                this.$minRouter.push({
                    name: 'package-details',
                    params: {
                        product_id: id,
                        product_type: type,
                        isPay: true
                    }
                })
                return
            }
            // 跳到商品详情页
            this.$minRouter.push({
                name: 'product-details',
                params: {
                    product_id: id,
                    product_type: type,
                    isPay: true
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.order-detail {
    .goods-wrap {
        background: #fff;

        .status {
            float: right;

            &.cancel,
            &.return {
                color: #333333;
            }

            &.not-produce {
                color: #0090ff;
            }
        }

        .count {
            float: right;
        }
    }

    .card {
        background: #fff;
        border-radius: 10rpx;

        .top {
            display: flex;
            justify-content: space-between;

            .title {
                line-height: 60rpx;
            }

            .btn {
                background-color: #ffe000;
                padding: 10rpx 15rpx;
                border-radius: 10rpx;
            }
        }

        .main {
            .item {
                margin-top: 10rpx;

                &:first-child {
                    margin: 0;
                }

                .method-view {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;

                    .left {
                        width: auto;
                    }

                    .right {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        .right_view {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        }

                        text {
                            display: block;
                            margin-bottom: 20rpx;
                        }
                    }
                }
            }

            .item {
                display: flex;

                .item_products {
                    display: flex;

                    .desc {
                        width: 300rpx;
                    }

                    .content {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                    }

                    ;
                }
            }

        }
    }

    .fcolor {
        color: #333333;
    }

    .tcolor {
        color: #666666;
    }

    .red {
        color: #ff0000;
    }

    .green {
        color: #39ba01;
    }

    .blue {
        color: #0090ff;
    }

    .origin {
        color: #f7601b;
    }

    .top_view {
        height: 83rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .close_pay {
            position: absolute;
            right: 0;
            width: 34rpx;
            height: 34rpx;
            background-image: url('/static/images/wine-close.png');
            background-size: contain;
        }

        .title {
            color: #343434;
            font-weight: 700;
            font-size: 32rpx;
        }

        .money {
            font-weight: bold;
            font-size: 30rpx;
            color: #ff0000;
        }
    }

    .mid_view {
        margin-top: 30rpx;
        color: #343434;
        padding: 0 20rpx;
        box-sizing: border-box;

        .moey_desc {
            font-size: 30rpx;
            font-weight: bolder;
        }

        .main_view {
            height: 110rpx;
        }
    }

    // .top_view {
    //   height: 83rpx;
    //   display: flex;
    //   justify-content: space-between;
    //   align-items: center;
    //   .money {
    //     font-weight: bold;
    //     font-size: 30rpx;
    //     color: #ff0000;
    //   }
    // }
    .pays {
        display: flex;
        flex-wrap: column;
        flex-wrap: wrap;
        align-content: space-between;

        .pay {
            width: 50%;
        }
    }

    .btn_pay {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 98rpx;
        background: rgba(255, 224, 1, 1);
        line-height: 98rpx;
        text-align: center;
    }

}
</style>
