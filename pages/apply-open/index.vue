<template>
<view class="apply-open">
    <view class="p-top-20 p-lr-30" style="padding-bottom: 66rpx;">
        <view class="platform-info f28 p-lr-20 p-tb-20" v-if='!$parseURL().isOrder'>
            <view>台位低消：￥{{list.order_info.minim_charge}}</view>
            <view>开台条件：<text class="emp">{{list.order_info.minimum_percent}}%低消 {{`(￥${list.order_info.desk_open_minimum})`}}</text></view>
            <view>订单金额：￥{{list.order_info.order_total}}</view>
            <view>达成状态：{{list.order_info.is_can_open === 0 ?  "未达成开台条件":"达成开台条件"}}</view>
        </view>
        <view class="platform-info f28 p-lr-20 p-tb-20" v-else>
            <view>台位低消：￥{{list.order_info.minim_charge}}</view>
            <view>开台条件：<text class="emp">{{list.order_info.minimum_percent}}%低消 {{`(￥${list.order_info.desk_open_minimum})`}}</text></view>
            <view>达成状态：{{list.order_info.is_can_open === 0 ? "未达成开台条件":"达成开台条件"}}</view>
        </view>
        <view class="goods-wrap m-top-20 p-lr-20" v-if='!$parseURL().isOrder'>
            <view class="p-tb-30 min-border-bottom">商品</view>
            <view class="goods-list p-top-10">
                <view class="p-tb-20" v-for="item in list.order_product_list" :key="item.id">
                    <min-goods-item :name="item.product_name" :price="item.order_price" :icon="item.product_img.length> 5?item.product_img: '/static/images/goods.png'" :specification="item.unit_name" :value="item.quantity">
                    </min-goods-item>
                </view>
            </view>
        </view>
        <view class="client-info m-top-20 p-lr-20 p-tb-30">
            <view class="p-bottom-30 min-border-bottom">客户信息</view>
            <view class="card p-top-30">
                <view class="item">客户姓名：{{list.order_info.client_name ?list.order_info.client_name :'暂无数据'}}</view>
                <view class="item">联系电话：{{list.order_info.client_mobile? list.order_info.client_mobile:'暂无数据'}}</view>
            </view>
        </view>
        <min-remarks title='申请原因' v-model='value'></min-remarks>
    </view>
    <view class="btn-wrap">
        <min-btn shape="flat" @click="submit">提交申请</min-btn>
    </view>
</view>
</template>

<script>
export default {
    name: 'redapply-open',
    navigate: ['navigateTo', 'redirectTo'],
    data() {
        return {
            value: '',
            list: {
                order_info: {
                    minim_charge: ''
                }
            }
        }
    },
    mounted() {
        console.log('申请开台', this.$parseURL())
        if (this.$parseURL().isOrder) {
            console.log('没有订单');
            this.list = this.$parseURL().data
            console.log(this.list);
        } else {
            this.$minApi.previewOrder({
                order_id: this.$parseURL().order_id,
                desk_id: this.$parseURL().desk_id,
                open_status: this.$parseURL().open_status
            }).then(res => {
                this.list = res
                console.log(this.list)
            })
        }

    },
    methods: {
        submit() {
            // 开台申请  orderGetRoot  {desk_id:this.$parseURL().desk_id,reason:''}
            this.$minApi.orderGetRoot({
                desk_id: this.$parseURL().desk_id,
                reason: this.value,
                payment_id: this.$parseURL().payId,
                booking_id: this.$parseURL().data.order_info.booking_id,
                sales_uid: this.$parseURL().type === 0 ? 0 : this.$parseURL().seil.id,
                client_name: this.$parseURL().data.order_info.client_name,
                client_mobile: this.$parseURL().data.order_info.client_mobile,
                is_birthday: this.$parseURL().data.order_info.is_birthday,
                remark: this.$parseURL().data.order_info.remark,
            }).then(res => {
                console.log(res)
                // if (res.length === 0) {
                this.$showToast('提交成功')
                setTimeout(() => {
                    this.$minRouter.push({
                        name: 'redsubmit-success',
                        params: {
                            desk_id: this.$parseURL().desk_id
                        },
                        type: "redirectTo"
                    })
                }, 2000)
                // }
            })
        }
    }
}
</script>

<style lang="scss">
.apply-open {
    padding-bottom: 100rpx;

    .platform-info {
        border-radius: 10px;
        background: #ffe4e4;

        .emp {
            color: #FF0000;
            font-weight: bold;
        }
    }

    .goods-wrap {
        background: #fff;

        .count {
            float: right;
        }
    }

    .client-info {
        background: #fff;
        border-radius: 10rpx;

        .card {
            &>view {
                margin-bottom: 10rpx;

                &:last-child {
                    margin: 0;
                }
            }
        }
    }

    .btn-wrap {
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
    }
}
</style>
