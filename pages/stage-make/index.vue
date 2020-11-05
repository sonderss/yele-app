<template>
<view class="stage-make p-lr-30 p-bottom-20">
    <min-cell class="top-view" :shadow="false" :card="false">
        <view class="top-title">客户信息</view>
        <view class="min-border-bottom color-view"></view>
        <view class="m-left-20 p-top-20 min-flex min-flex-dir-top min-flex-align-top">
            <view class="min-flex m-bottom-10">
                <text class="user-name">客户姓名: {{data.client_name}}</text>
            </view>
            <view class="min-flex m-bottom-30">
                <text class="user-name">联系电话: {{data.client_mobile}}</text>
            </view>
        </view>
    </min-cell>
    <view class="m-bottom-20"></view>
    <min-cell class="top-view" :card="false">
        <min-cell-item title="营销信息"></min-cell-item>
        <view class="min-border-bottom color-view"></view>
        <min-cell-item :img="data.head_img" :title="`${data.user_name}  | ${data.position_name}`" :label="data.mobile" :border="false"></min-cell-item>
    </min-cell>
    <view class="open_desk m-tb-20">
        <view class="title f30 p-tb-30 p-lr-20">开台方式</view>
        <view @click="chince(0)" :class="i === 0 ? 'chioce_active' :  'chioce'">
            <text class="t">预开台</text>
            <text class="desc">先占用台，等会再下单</text>
        </view>
        <view @click="chince(1)" :class="i === 1 ? 'chioce_active' :  'chioce'">
            <text class="t">点单并开台</text>
            <text class="desc">点够{{desk_open_minimum}}元并正式开台</text>
        </view>
        <view @click="chince(2)" :class="i === 2 ? 'chioce_active' :  'chioce'">
            <text class="t">申请免低消开台</text>
            <text class="desc">无需下单也可开台</text>
        </view>
    </view>
    <view class="btn">
        <min-btn :long="true" @click="postBookedOpen">{{btn_name}}</min-btn>
    </view>
    <min-modal ref="show" />
</view>
</template>

<script>
export default {
    name: 'redstage-make',
    navigate: ['navigateTo', 'redirectTo'],
    onLoad() {
        console.log(this.$parseURL())
        this.booking_id = this.$parseURL().booking_id
        this.desk_open_minimum = this.$parseURL().desk_open_minimum
        if (this.$parseURL().desk_open_minimum.split('.')[1] === '00') {
            let a = this.$parseURL().desk_open_minimum.split('.')[0]
            this.desk_open_minimum = a
        }
        this.id = this.$parseURL().id
        this.$minApi.getBookedDetail({
            booking_id: this.booking_id
        }).then(res => {
            console.log(res)
            this.data = res
        })
    },
    data() {
        return {
            name: '林平之',
            phone: 15836666666,
            data: {},
            booking_id: '',
            id: '',
            i: 0,
            btn_name: '预开台',
            desk_open_minimum: ''
        }
    },
    methods: {
        chince(n) {
            this.i = n
            if (n === 0) {
                this.btn_name = '预开台'
            }
            if (n === 1) {
                this.btn_name = '去下单'
            }
            if (n === 2) {
                this.btn_name = '申请开台'
            }
        },
        postBookedOpen() {

            // 预开台
            if (this.i === 0) {
                this.$minApi.yuStartOrder({
                    desk_id: this.id,
                    booking_id: this.booking_id
                }).then(res => {
                    this.$showToast('预开台成功')
                    setTimeout(() => {
                        this.$minRouter.push({
                            name: 'redplatform-detail',
                            type: 'redirectTo',
                            params: {
                                id: this.id,
                                status: 4,
                                date: this.$store.state.status.date.date
                            },
                        })
                    }, 2000)
                })
                return
            }
            if (this.i === 1) {
                this.$minApi.startOrder({
                    desk_id: this.id,
                    booking_id: this.booking_id
                }).then(res => {
                    console.log(res)
                    // this.$showToast('开台成功')
                    // 跳转下单
                    this.$minRouter.push({
                        name: 'redplacean-order',
                        type: "redirectTo",
                        params: {
                            desk_id: res.opening.desk_id,
                            minim_charge: res.opening.minimum_consume,
                            isNewMasT: true
                        }
                    })

                })
            }

            // 申请开台
            if (this.i === 2) {

                this.$refs.show.handleShow({
                    isReson: true,
                    confirmText: '提交',
                    success: (res) => {
                        console.log(res)
                        if (res.id === 1) {
                            this.$minApi.orderGetRoot({
                                desk_id: this.id,
                                reason: res.resonValue,
                                sales_uid: this.data.sales_uid,
                                client_mobile: this.data.client_name,
                                client_name: this.data.client_mobile,
                                booking_id: this.booking_id,
                                is_birthday: this.isShengri ? 1 : 0,
                                remark: ''
                            }).then(res => {
                                // if (res.length === 0) {
                                this.$showToast('提交成功')
                                setTimeout(() => {
                                    this.$minRouter.push({
                                        name: 'redsubmit-success',
                                        params: {
                                            desk_id: this.id,
                                        },
                                        type: "redirectTo"
                                    })
                                }, 2000)
                                // }
                            })
                        }
                    },
                });

                return
                this.$minRouter.push({
                    name: 'redapply-open',
                    type: 'redirectTo',
                    params: {
                        isOrder: true,
                        desk_id: this.id,
                        type: 1,
                        seil: this.data.sales_uid,
                        data: {
                            order_info: {
                                client_mobile: this.data.client_name,
                                client_name: this.data.client_mobile,
                                booking_id: this.booking_id,
                                is_birthday: this.isShengri ? 1 : 0,
                                minimum_percent: this.$parseURL().minimum_percent,
                                minim_charge: this.$parseURL().minm,
                                desk_open_minimum: this.$parseURL().desk_open_minimum,
                                is_can_open: 0
                            }
                        }
                    },
                })
                return
            }
            this.$minApi.startOrder({
                    desk_id: this.id,
                    booking_id: this.booking_id,
                    sales_uid: this.data.sales_uid,
                    client_name: this.data.client_name,
                    client_mobile: this.data.client_mobile
                })
                .then(res => {
                    console.log(res)
                    this.$showToast('开台成功')
                    // 跳转下单
                    setTimeout(() => {
                        this.$minRouter.push({
                            name: 'redplacean-order',
                            type: 'redirectTo',
                            params: {
                                desk_id: res.opening.desk_id,
                                minim_charge: res.opening.minimum_consume
                            }
                        })
                    }, 2000)
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.stage-make {
    .main-view {
        width: 100vw;
        min-height: 100vh;
        overflow: hidden;
    }

    .top-view {
        width: 690rpx;
        margin: 20rpx auto;

        .top-title {
            font-size: 30rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 33rpx;
            padding-top: 29rpx;
            padding-bottom: 29rpx;
            padding-left: 20rpx;
        }

        .color-view {
            background: #e7e7e7;
            margin: 0 20rpx;
        }

        .user-name {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 33rpx;
        }
    }

    .btn {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
    }

    .open_desk {
        width: 690rpx;
        height: 392rpx;
        background: #FFFFFF;
        border-radius: 10rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .title {
            color: #343434;
            align-self: start;
        }

        .chioce {
            width: 650rpx;
            height: 78rpx;
            background: #FFFFFF;
            border: 1rpx solid #E7E7E7;
            border-radius: 10rpx;
            margin: 0;
            margin-bottom: 20rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20rpx;

            .t {
                font-size: 28rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #343434;
            }

            .desc {
                font-size: 24rpx;
                color: #666666;
            }
        }

        .chioce_active {
            width: 650rpx;
            height: 78rpx;
            background: #FFE002;
            border-radius: 10rpx;
            margin: 0;
            border: 1rpx solid #FFE002;
            margin-bottom: 20rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20rpx;

            .t {
                font-size: 28rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #343434;
            }

            .desc {
                font-size: 24rpx;
                color: #666666;
            }
        }
    }
}
</style>
