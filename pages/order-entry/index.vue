<template>
<view class="order-entry  p-tb-20 p-lr-30">
    <min-cell :card="false">
        <view class="f30 p-tb-25">台位信息</view>
        <view class="min-border-bottom" style="height:1rpx"></view>
        <view class="main min-flex min-flex-dir-top min-flex-align-top f28 p-bottom-10">
            <view style="width:100%" class="min-flex   min-flex-main-between m-bottom-10 m-top-20">
                <view>台 号：<text class="cardNum">{{$parseURL().desk_info.name}}</text></view>
                <view v-if="$parseURL().desk_info.price*1 < $parseURL().desk_info.charge*1" class="status-code">未够低消</view>
            </view>
            <text class="m-bottom-10">分 组：{{$parseURL().desk_info.group_name}}</text>
            <text class="m-bottom-10">低 消：￥{{$parseURL().desk_info.charge}}</text>
            <text class="m-bottom-10">账单金额：￥{{$parseURL().desk_info.price}}</text>
        </view>
    </min-cell>
    <view class="order m-tb-20">
        <view class="view left m-right-30" @click="order">
            <image src='/static/images/index/order.png' />
            <text>下单</text>
        </view>
        <view class="view right" @click="presentation" v-root="'presentation'">
            <image src='/static/images/index/gift.png' />
            <text>赠送</text>
        </view>
    </view>
    <min-order-list :isShowPlatform='false' :list='list' v-if="list.length > 0"></min-order-list>
    <min-404 v-else pTop="50rpx"></min-404>
</view>
</template>

<script>
export default {
    name: 'order-entry',
    navigate: ['navigateTo'],
    data() {
        return {
            list: [],
            pay_status: ''
        }
    },
    mounted() {
        console.log('桌台ID和open_id', this.$parseURL())
        this.$minApi.getOrderListDown({
            opening_id: this.$parseURL().open_id
        }).then(res => {
            console.log(res)
            this.list = res.list
            this.list.map(item => {
                if (item.order_product_list.length > 4) {
                    item.order_product_list.splice(4)
                }
            })
        })

    },
    methods: {
        order() {

            this.$minApi.billAllin({
                opening_id: this.$parseURL().open_id,
                desk_id: this.$parseURL().desk_id
            }).then(res => {
                if (res.pay_status === -1) return this.$showToast('当前桌台无法下单，请先联系后台管理员确认账单')
                this.$minRouter.push({
                    name: 'placean-order',
                    params: {
                        desk_id: this.$parseURL().desk_id,
                        is_open_desk: this.$parseURL().is_open_desk,
                        minim_charge: this.$parseURL().desk_info.charge
                    }
                })
            })

        },
        presentation() {
            // 请求赠送列表并带过去页面
            this.$minApi.getGiveAwayList({
                desk_id: this.$parseURL().desk_id,
                timeOut: 2
            }).then(res => {
                if (res.list.length > 0) {
                    this.$minRouter.push({
                        name: 'give-away',
                        params: {
                            desk_id: this.$parseURL().desk_id,
                            is_open_desk: this.$parseURL().is_open_desk,
                            res: res
                        }
                    })
                }
            })

        }
    }
}
</script>

<style lang="scss" scoped>
.order-entry {
    .cardNum {
        color: #FE0000;
        font-size: 32rpx;
    }

    .status-code {
        color: #FE2323;
    }

    .order {
        width: 100%;
        height: 220rpx;

        display: flex;
        justify-content: space-between;

        .view {
            width: 330rpx;
            height: 100%;
            background: rgba(255, 255, 255, 1);
            border-radius: 10rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            image {
                width: 80rpx;
                height: 80rpx;
            }
        }
    }
}
</style>
