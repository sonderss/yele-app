<template>
<view class="platform-detail" @click="getDom">
    <view class="card p-lr-20 m-bottom-20">
        <view class="p-tb-30 min-border-bottom">基本信息</view>
        <view class="main p-tb-20">
            <view class="status been-open">已开台</view>
            <view>
                台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：
                <text class="emp">{{list.desk_info.desk_name}}</text>
            </view>
            <view>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：{{list.desk_info.group_name}}</view>
            <view>低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：￥{{list.desk_info.minim_charge}}<text class="f28" style="color:#FE0000" v-if="!list.desk_info.is_enough_consume">（未够低消）</text></view>
            <view>座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{$minCommon.getSeats(list.desk_info.seats) }}</view>
            <view>开台条件：{{list.desk_info.minimum_consume_percent+'%低消'+ `(￥${list.desk_info.desk_open_minimum})`}}</view>
        </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
        <view class="p-tb-30 min-border-bottom">客户信息</view>
        <view class="main p-tb-20">
            <view>客户姓名：{{list.desk_info.client_name?list.desk_info.client_name:'暂无数据'}}</view>
            <view>联系电话：{{list.desk_info.client_mobile?list.desk_info.client_mobile:'暂无数据' }}</view>
            <view>当天生日：{{list.desk_info.is_birthday === 0 ? "否":"是"}}</view>
            <view v-if="list.desk_info.arrival_time">预抵时间：{{$minCommon.formatDate(new Date(list.desk_info.arrival_time * 1000), 'yyyy-MM-dd hh:mm:ss') }}</view>
        </view>
    </view>
    <view class="card p-lr-20 m-bottom-20">
        <view class="top p-tb-30 min-border-bottom">
            <view>订单信息</view>
        </view>
        <view class="main1 p-top-20">
            <view class="m-bottom-10" v-for="i in list.order_list" :key="i.order_sn" style="width:100%;display: flex;justify-content: space-between;">
                <text class="f28">{{i.order_sn}}</text>
                <text :class="i.pay_status === 0 ? 'f26 red':'f26' ">{{i.pay_status === 0 ? `待付￥${i.unpay_price}`:'已支付'}}</text>
            </view>
        </view>
        <view class="min-top-border"></view>
        <view class="timer min-top-border p-bottom-20" style="font-size:28rpx">待付合计:<text style="font-size:28rpx;margin-left:15rpx">￥{{list.payable_total}}</text></view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20" style="margin-bottom:200rpx">
        <view class="p-tb-30 min-border-bottom">操作信息</view>
        <view class="main p-tb-20">
            <view v-if="list.desk_info.booking_id">营销人员：{{list.desk_info.book_user_name?list.desk_info.book_user_name:"暂无数据"}}</view>
            <view v-if='list.desk_info.booking_id'>预约时间：{{$minCommon.formatDate(new Date(list.desk_info.book_time * 1000), 'yyyy-MM-dd hh:mm:ss')  }}</view>
            <view>开台人员：{{list.desk_info.open_user_name}}</view>
            <view>开台时间：{{$minCommon.formatDate(new Date(list.desk_info.open_time *1000),'yyyy-MM-dd hh:mm:ss') }}</view>
        </view>
    </view>

    <view class="btns">
        <view :class="index === 0 ? 'btn active' : 'btn' " @click="book">预约</view>
        <view :class="index === 1 ? 'btn active' : 'btn' " @click="changeOrder">转台</view>
        <view :class="index === 2 ? 'btn active' : 'btn' " @click="goOrder">下单</view>
        <view class="badge">
            <text class="more" style="color: #CCCCCC;" @click="showToastTxt" id='testDom'>&#xe61c;</text>
            <view class="toast anmatiin " v-if="toast">
                <view class="bag_btn" @click="saveWine">存酒</view>
                <view class="bag_btn" @click="bill">账单</view>
                <view class="bag_btn" @click="order">订单</view>
                <view class="bag_btn" @click="getWine">取酒</view>
                <view class="bag_btn" @click="clear_order">清台</view>
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
            index: 0,
            toast: false
        }
    },
    mounted() {
        // 监听关闭事件
        this.$nextTick(() => {
            // document.querySelector('body').addEventListener('click', this.handleBodyClick)
        })
        console.log('已开台详情', this.list)
    },
    methods: {
        // goGetHistory () {
        //   this.$minRouter.push({
        //     name: 'platform-history',
        //     params: { id: this.idNum }
        //   })
        // },
        // 预约
        // book () {
        //   let a = this.$getRoot('desk.book')
        //   if(!a) return this.$showToast('抱歉，暂无权限')
        //   this.$minRouter.push({
        //     name: 'order-make',
        //     params: { id: this.idNum }
        //   })
        // },
        // 展示剩余按钮
        showToastTxt() {
            this.toast = !this.toast
        },
        // 转台
        changeOrder() {
            let a = this.$getRoot('desk.transfer')
            if (!a) return this.$showToast('抱歉，暂无权限')
            this.$minRouter.push({
                name: 'change-platform',
                params: {
                    old_id: this.idNum,
                    bill_price: this.list.desk_info.bill_price
                }
            })
        },
        // 账单
        bill() {
            let a = this.$getRoot('desk.bill')
            if (!a) return this.$showToast('抱歉，暂无权限')
            // 这里需要传开台记录id 台位ID 
            this.$minRouter.push({
                name: 'desk-bill',
                params: {
                    open_id: this.list.desk_info.opening_id,
                    desk_id: this.idNum
                }
            })
        },
        // 订单
        order() {
            this.$minRouter.push({
                name: 'order-list',
                params: {
                    open_id: this.list.desk_info.opening_id
                }
            })
        },
        // 存酒
        saveWine() {
            let a = this.$getRoot('desk.saveWine')
            if (!a) return this.$showToast('抱歉，暂无权限')
            // 跳转到选择客户页面（存酒）
            this.$minRouter.push({
                name: 'save-wine',
                params: {
                    open_id: this.list.desk_info.opening_id
                }
            })
        },
        // 取酒
        getWine() {
            let a = this.$getRoot('desk.fetchWine')
            if (!a) return this.$showToast('抱歉，暂无权限')
            this.$minRouter.push({
                name: 'fetch-liquor',
                params: {
                    desk_name: this.list.desk_info.desk_name,
                    name: this.list.desk_info.client_name,
                    phone: this.list.desk_info.client_mobile
                }
            })
        },
        // 下单
        goOrder() {
            let a = this.$getRoot('desk.order')
            if (!a) return this.$showToast('抱歉，暂无权限')
            this.$minRouter.push({
                name: 'order-entry',
                params: {
                    desk_id: this.idNum,
                    open_id: this.list.desk_info.opening_id,
                    is_open_desk: true,
                    desk_info: {
                        name: this.list.desk_info.desk_name,
                        charge: this.list.desk_info.minim_charge,
                        price: this.list.payable_total,
                        group_name: this.list.desk_info.group_name
                    }
                }
            })
        },
        // 清台
        clear_order() {
            let a = this.$getRoot('desk.clean')
            if (!a) return this.$showToast('抱歉，暂无权限')
            console.log(this.list.payable_total);
            let text = ''
            if (this.list.payable_total > 0) {
                text = '当前仍有订单尚未结清，确定要清台？'
            } else {
                text = '是否确认账单已清，并开始清台'
            }
            this.$refs.show.handleShow({
                title: '',
                content: text,
                contentCenter: true,
                cancelText: '否',
                confirmText: '是',
                confirmColor: 'red',
                cancelColor: '#0090ff',
                success: (e) => {
                    if (e.id === 1) {
                        this.$minApi.clearOrder({
                                desk_id: this.idNum
                            })
                            .then(res => {
                                console.log(res)
                                if (res.length === 0) {
                                    this.$showToast('清台成功')
                                    setTimeout(() => {
                                        this.$minRouter.push({
                                            name: 'redplatform-detail',
                                            type: 'redirectTo',
                                            params: {
                                                id: this.idNum,
                                                date: this.date
                                            }
                                        })
                                    }, 2000)
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }
                }
            })
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
        }
    },
    beforeDestroy() {
        // 事件销毁
        // document.querySelector('body').removeEventListener('click', this.handleBodyClick)
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
