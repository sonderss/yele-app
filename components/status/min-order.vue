<template>
<view class="platform-detail">
    <view class="card p-lr-20 m-bottom-20">
        <view class="p-tb-30 min-border-bottom">基本信息</view>
        <view class="main p-tb-20">
            <view class="status">点单中</view>
            <view>
                台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：
                <text class="emp">{{list.desk_info.desk_name}}</text>
            </view>
            <view>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：{{list.desk_info.group_name}}</view>
            <view>低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：￥{{list.desk_info.minim_charge}}</view>
            <view>座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{$minCommon.getSeats(list.desk_info.seats) }}</view>
            <view>开台条件：{{list.desk_info.minimum_consume_percent+'%低消'+ `(￥${list.desk_info.desk_open_minimum})`}}</view>
        </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
        <view class="p-tb-30 min-border-bottom">点单信息</view>
        <view class="main p-tb-20">
            <view>
                当前状态：
                <text style="color: #FF0000;">{{list.order_info.is_can_open === 0 ?  '不满足开台条件' : '已够开台条件'}}</text>
            </view>
            <view>开台订单：{{list.order_info.order_id === 0 ? '未进行点单':'￥'+list.order_info.order_total}}{{list.order_info.is_can_open === 0 ? '' : '（未支付）' }}</view>
            <view class="card-btns">
                <min-btn size="xs" v-if="list.order_info.is_can_open !== 1" @click="reorder">重新下单</min-btn>
                <view class="m-left-20"></view>
                <min-btn size="xs" v-if="list.order_info.is_can_open !== 1" type="white" border @click="applicationopening(list.order_info.is_can_open)">申请开台</min-btn>
                <view class="m-left-20"></view>
                <min-btn size="xs" type="white" border class="m-left-20" @click="checkorder(list.order_info.is_can_open)">查看订单</min-btn>
            </view>
        </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
        <view class="p-tb-30 min-border-bottom">客户信息</view>
        <view class="main p-tb-20">
            <view>客户姓名：{{list.desk_info.client_name ? list.desk_info.client_name : '暂无'}}</view>
            <view>联系电话：{{list.desk_info.client_mobile ? list.desk_info.client_mobile : '暂无'}}</view>
            <view>当天生日：{{list.desk_info.is_birthday ? '是' : '否'}}</view>
            <view v-if="list.desk_info.arrival_time">预抵时间：{{$minCommon.formatDate(new Date(list.desk_info.arrival_time*1000),'yyyy-MM-dd hh:mm:ss') }}</view>
        </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20" v-if="list.desk_info.booking_id !== 0">
        <view class="p-tb-30 min-border-bottom">操作信息</view>
        <view class="main p-tb-20">
            <view>营销人员：{{list.desk_info.book_user_name}}</view>
            <view>预约时间：{{$minCommon.formatDate(new Date(list.desk_info.book_time*1000),'yyyy-MM-dd hh:mm:ss') }}</view>
        </view>
    </view>

    <view class="btns">
        <view :class="index === 0 ? 'btn active' : 'btn' " @click="book">预约</view>
        <view :class="index === 1 ? 'btn active' : 'btn' " @click="goOrder">下单</view>
        <view :class="index === 2 ? 'btn active' : 'btn' " @click="saveWine">存酒</view>
        <view class="badge" @click="showToastTxt" id='testDom'>
            <text class="more" style="color: #CCCCCC;">&#xe61c;</text>
            <view class="toast anmatiin " v-if="toast">
                <view class="bag_btn" @click="del_order">销台</view>
                <view class="bag_btn" @click="goGetHistory">历史</view>
                <view class="bag"></view>
            </view>
        </view>
    </view>
    <min-modal ref="show"></min-modal>
</view>
</template>

<script>
import mixin from './mixin'
export default {
    mixins: [mixin],
    props: {
        idNum: Number,
        date: String,
        list: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            show: false,
            toast: false,
            index: Number
        }
    },
    mounted() {
        // 监听关闭事件
        this.$nextTick(() => {
            // document.querySelector('body').addEventListener('click', this.handleBodyClick)
        })
    },
    methods: {
        // goGetHistory () {
        //   this.$minRouter.push({
        //     name: 'platform-history',
        //     params: { id: this.idNum }
        //   })
        // },
        // 销台
        // del_order () {
        //    let a = this.$getRoot('desk.close')
        //   if(!a) return this.$showToast('抱歉，暂无权限')
        //   this.$refs.show.handleShow({
        //     title: '',
        //     content: '是否销台',
        //     contentCenter: true,
        //     cancelText: '否',
        //     confirmText: '是',
        //     confirmColor: 'red',
        //     cancelColor: '#0090ff',
        //     success: (e) => {
        //       if (e.id === 1) {
        //         // 销台接口
        //         this.$minApi.delOrder({
        //           desk_id: this.idNum
        //         })
        //           .then(res => {
        //             if (res.length === 0) {
        //               this.$showToast('销台成功')
        //               setTimeout(() => {
        //                 this.$minRouter.push({
        //                   name: 'redplatform-detail',
        //                   type: 'redirectTo',
        //                   params: { id: this.idNum, date: this.date }
        //                 })
        //               }, 2000)
        //             }
        //           })
        //           .catch(() => {
        //             this.$showToast('缺少开台ID')
        //           })
        //       }
        //     }
        //   })
        // },
        // 存酒
        saveWine() {
            let a = this.$getRoot('desk.saveWine')
            if (!a) return this.$showToast('抱歉，暂无权限')
            this.index = 2
            // 跳转到选择客户页面（存酒）
            this.$minRouter.push({
                name: 'select-customers',
                params: {
                    desk_id: this.idNum,
                    desk_name: this.list.desk_info.desk_name
                }
            })
        },
        // 预约
        // book () {
        //   this.$minRouter.push({
        //     name: 'order-make',
        //     params: { id: this.idNum }
        //   })
        // },
        // 重新下单
        reorder() {
            // 取消该单
            this.$minApi.cancelOrder({
                order_id: this.list.order_info.order_id
            }).then(res => {
                console.log(res);
                this.$showToast('订单已取消')
            })
            setTimeout(() => {
                this.$minRouter.push({
                    name: 'placean-order',
                    params: {
                        desk_id: this.list.desk_info.desk_id,
                        minim_charge: this.list.desk_info.minim_charge
                    }
                })
            }, 2000)
        },
        // 申请开台
        applicationopening(n) {
            if (this.list.order_info.order_id) {
                this.$minRouter.push({
                    name: 'apply-open',
                    params: {
                        desk_id: this.idNum,
                        order_id: this.list.order_info.order_id,
                        open_status: 0
                    }
                })
            } else {
                this.$minRouter.push({
                    name: 'apply-open',
                    params: {
                        desk_id: this.idNum,
                        isOrder: this.list.order_info.order_id ? false : true,
                        data: {
                            order_info: {
                                client_mobile: this.list.desk_info.client_mobile,
                                client_name: this.list.desk_info.client_name,
                                minimum_percent: this.list.desk_info.minimum_consume_percent,
                                minim_charge: this.list.desk_info.minim_charge,
                                desk_open_minimum: this.list.desk_info.desk_open_minimum,
                                is_can_open: this.list.order_info.is_can_open
                            }
                        }
                    }
                })
            }
        },
        // 查看订单
        checkorder(n) {
            if (this.list.order_info.order_id) {
                this.$minRouter.push({
                    name: 'confirm-order',
                    params: {
                        desk_id: this.idNum,
                        order_id: this.list.order_info.order_id,
                        open_status: 0
                    }
                })
            } else {
                this.$minRouter.push({
                    name: 'confirm-order',
                    params: {
                        desk_id: this.idNum,
                        isOrder: this.list.order_info.order_id ? false : true,
                        data: {
                            order_info: {
                                client_mobile: this.list.desk_info.client_mobile,
                                client_name: this.list.desk_info.client_name,
                                minimum_percent: this.list.desk_info.minimum_consume_percent,
                                minim_charge: this.list.desk_info.minim_charge,
                                desk_open_minimum: this.list.desk_info.desk_open_minimum,
                                is_can_open: this.list.order_info.is_can_open
                            }
                        }
                    }
                })
            }
        },
        // 展示剩余按钮
        showToastTxt() {
            this.toast = !this.toast
        },
        // 关闭剩余按钮显示
        handleBodyClick(e) {
            const targetDom = document.getElementById('testDom')
            if (targetDom) {
                const flag = targetDom.contains(e.target)
                if (!flag) {
                    this.toast = false
                }
            }
        },
        // 下单
        goOrder() {
            let a = this.$getRoot('desk.order')
            if (!a) return this.$showToast('抱歉，暂无权限')
            this.$minRouter.push({
                name: 'placean-order',
                params: {
                    desk_id: this.list.desk_info.desk_id,
                    minim_charge: this.list.desk_info.minim_charge
                }
            })
        }
    },

    beforeDestroy() {
        // 事件销毁
        // document.querySelector('body').removeEventListener('click', this.handleBodyClick)
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
