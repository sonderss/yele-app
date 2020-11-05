<template>
<view class="add-userinfo p-lr-30 p-tb-20" @touchstart="start" @touchmove="move" @touchend="end">
    <scroll-view scroll-y :style="{
        transition: top === 0 ? 'transform 300ms' : '',
        transform: 'translateY(' + top + 'rpx' + ')'
      }">

        <min-cell :card="false">
            <view class="f30 p-tb-30">营销信息 {{$parseURL().type === 0 ? '（自来客）' : ''}}</view>
            <min-cell-item :img="data.seil.head_img ? data.seil.head_img : 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg' " :title="data.seil.sales_name + ' | '+  data.seil.position_name" :label="data.seil.mobile" :border="false" v-if="$parseURL().type === 0 ? false : true"></min-cell-item>

        </min-cell>
        <view class="m-tb-20"></view>
        <min-cell :card="false" class="mid-view">
            <min-desc-input desc="客户姓名" :maxlength="11" v-model="isName" placeholder="请输入客户姓名"></min-desc-input>
            <min-desc-input desc="联系电话" :maxlength="11" v-model="isPhone" typeinput="number" placeholder="请输入联系电话"></min-desc-input>
            <min-switch desc="是否当天生日" v-model="isShengri"></min-switch>
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
        <min-remarks v-model='value'></min-remarks>
        <view style="height:200rpx"></view>
    </scroll-view>

    <view class="btn">
        <min-btn :long="true" @click="next">{{btn_name}}</min-btn>
    </view>
    <min-modal ref="show" />
</view>
</template>

<script>
export default {
    name: 'redadd-userinfo',
    navigate: ['navigateTo', "redirectTo"],
    data() {
        return {
            isShengri: false,
            isPhone: '',
            isName: '',
            value: '',
            data: {},
            top: 0,
            lastY: '',
            i: 0,
            btn_name: '预开台',
            test: false,
            desk_open_minimum: ''
        }
    },
    onLoad() {
        console.log(this.$parseURL())
        this.data = this.$parseURL()
        if (this.$parseURL().desk_open_minimum.split('.')[1] === '00') {
            let a = this.$parseURL().desk_open_minimum.split('.')[0]
            this.desk_open_minimum = a
            return
        }
        this.desk_open_minimum = this.$parseURL().desk_open_minimum
    },
    mounted() {
        // console.log(this.$route.params.name)

    },
    watch: {
        isPhone(a) {
            // console.log(a)
        },
        isName(a) {
            // console.log(a)
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
        start(e) {
            this.lastY = e.changedTouches[0].pageY
        },
        move(e) {
            let currentY = e.changedTouches[0].pageY
            if (this.top < currentY - this.lastY) {
                // 像下滚动
                this.top = currentY - this.lastY
            } else {
                // 向上滚动
                //  this.top = 0
                this.top = currentY - this.lastY
            }
        },
        end(e) {
            return (this.top = 0)
        },
        next() {
            if (this.isPhone && this.isPhone.length !== 11 && !this.$minCommon.checkMobile(this.isPhone)) return this.$showToast("手机号填写错误")
            const obj = {}
            // 自来客 2 - 空闲,3 - 已预约
            if (this.data.type === 0) {
                obj.sales_uid = 0
                obj.booking_id = ''
            } else {
                obj.sales_uid = this.$parseURL().seil.id
                obj.booking_id = ''
            }
            // 预开台
            if (this.i === 0) {

                this.$minApi.yuStartOrder({
                    desk_id: this.data.msg.desk_id,
                    booking_id: this.$parseURL().msg.status === 3 ? '' : '',
                    sales_uid: this.data.type === 1 ? this.$parseURL().seil.id : '',
                    client_name: this.isName,
                    client_mobile: this.isPhone,
                    is_birthday: this.isShengri ? 1 : 0,
                    remark: this.value
                }).then(res => {
                    this.$showToast('预开台成功')
                    setTimeout(() => {
                        this.$minRouter.push({
                            name: 'redplatform-detail',
                            type: 'redirectTo',
                            params: {
                                id: this.data.msg.desk_id,
                                status: 4,
                                date: this.$store.state.status.date.date
                            },
                        })
                    }, 2000)

                })
                // this.$minApi.startOrder({
                //     desk_id: this.data.msg.desk_id,
                //     booking_id: this.$parseURL().msg.status === 3 ? '' : '',
                //     sales_uid: this.data.type === 1 ? this.$parseURL().seil.id : '',
                //     client_name: this.isName,
                //     client_mobile: this.isPhone,
                //     is_birthday: this.isShengri ? 1 : 0,
                //     remark: this.value
                // }).then(res => {
                //     this.$showToast('预开台成功')
                //     setTimeout(() => {
                //         this.$minRouter.push({
                //             name: 'redplatform-detail',
                //             type: 'redirectTo',
                //             params: {
                //                 id: this.data.msg.desk_id,
                //                 status: 4,
                //                 date: this.$store.state.status.date.date
                //             },
                //         })
                //     }, 2000)
                // })
                return
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
                                desk_id: this.data.msg.desk_id,
                                reason: res.resonValue,
                                booking_id: this.$parseURL().msg.status === 3 ? '' : '',
                                sales_uid: this.data.type === 1 ? this.$parseURL().seil.id : '',
                                client_name: this.isName,
                                client_mobile: this.isPhone,
                                is_birthday: this.isShengri ? 1 : 0,
                                remark: this.value
                            }).then(res => {
                                // if (res.length === 0) {
                                this.$showToast('提交成功')
                                setTimeout(() => {
                                    this.$minRouter.push({
                                        name: 'redsubmit-success',
                                        params: {
                                            desk_id: this.data.msg.desk_id,
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
                // this.$minRouter.push({
                //     name: 'redapply-open',
                //     type: 'redirectTo',
                //     params: {
                //         isOrder: true,
                //         desk_id: this.data.msg.desk_id,
                //         type: this.$parseURL().type,
                //         seil: this.$parseURL().seil,
                //         data: {
                //             order_info: {
                //                 client_mobile: this.isPhone,
                //                 client_name: this.isName,
                //                 booking_id: '',
                //                 remark: this.value,
                //                 is_birthday: this.isShengri ? 1 : 0,
                //                 minimum_percent: this.$parseURL().minimum_percent,
                //                 minim_charge: this.$parseURL().minm,
                //                 desk_open_minimum: this.$parseURL().desk_open_minimum,
                //                 is_can_open: 0
                //             }
                //         }
                //     },
                // })
                // return
            }
            if (this.i === 1) {
                this.$minApi.startOrder({
                    desk_id: this.data.msg.desk_id,
                    booking_id: this.$parseURL().msg.status === 3 ? '' : '',
                    sales_uid: this.data.type === 1 ? this.$parseURL().seil.id : '',
                    client_name: this.isName,
                    client_mobile: this.isPhone,
                    is_birthday: this.isShengri ? 1 : 0,
                    remark: this.value
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

        }
    }
}
</script>

<style lang="scss" scoped>
.add-userinfo {
    overflow: auto;

    .btn {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
    }

    .oinput1 {
        text-align: right;
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
