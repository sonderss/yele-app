<template>
<view class="person p-lr-20 p-tb-20">
    <view class="card p-lr-20 m-bottom-20">

        <view class="main p-tb-20">
            <view>营销姓名：{{list.user_name}}</view>
            <view>联系电话：{{list.mobile}}</view>
            <view v-if="ids === '0' || ids === '6' ">汇总周期：{{this.$minCommon.formatDate(new Date(this.list.statistics_time.start_time * 1000), 'yyyy/MM/dd')}}-{{this.$minCommon.formatDate(new Date(this.list.statistics_time.end_time * 1000), 'MM/dd')}}</view>
            <view v-if="ids !== '6'">开台数量：{{list.opening_count}}张</view>
            <view class="view_desc" v-if="ids === '6'">订单合计: &nbsp;￥{{list.order_totals}}</view>
            <view class="view_desc" v-if="ids === '6'">实收合计: &nbsp;￥{{list.actual_totals}}</view>
            <view class="view_desc" v-if="ids === '6'">赠送合计: &nbsp;￥{{list.presentation_totals}}</view>
            <view class="view_desc" v-if="ids === '6'">签折合计: &nbsp;￥{{list.signoff_totals}}</view>
            <view class="view_desc" v-if="ids === '1'">订台数量: &nbsp;{{list.booking_count}}张</view>
            <view class="view_desc" v-if="ids === '1'">取消订台: &nbsp;{{list.cancel_count}}张</view>
            <view class="view_desc" v-if="ids === '1'">超时订台: &nbsp;{{list.expire_count}}张</view>
            <view class="view_desc" v-if="ids !== '1' && ids !== '6'">业绩合计：￥{{list.performance_total}}</view>
        </view>
    </view>

    <view v-if="ids === '0'">
        <view class="card p-lr-20 p-bottom-10 m-bottom-20" v-for="(item,index) in list.opening_info" :key="index">
            <view class="p-tb-30 min-border-bottom">订单信息</view>
            <view class="main p-tb-20">
                <view>桌台号码：{{item.desk_name}}</view>
                <view>开台时间：{{$minCommon.formatDate(new Date(item.open_time*1000),'yyyy/MM/dd hh:mm:ss') }}</view>
                <view v-if="item.close_time*1">销台时间：{{$minCommon.formatDate(new Date(item.close_time*1000),'yyyy/MM/dd hh:mm:ss') }}</view>
                <view>有效业绩：￥{{item.pay_price}}</view>
                <view>账单金额：￥{{item.bill_price}}</view>
            </view>
            <view class="card-btns min-border-top">
                <view class="btn f26" @click="toBil(item.desk_id,item.id)">查看账单</view>
            </view>
        </view>
    </view>
    <view v-if="ids === '1' ">
        <view class="card p-lr-20 p-bottom-10 m-bottom-20" v-for="(item,index) in list.opening_info" :key="index">
            <view class="p-tb-30 min-border-bottom">订单信息</view>
            <view class="main p-tb-20">
                <view>桌台号码：{{item.desk_name}}</view>
                <view>当前状态：{{$minCommon.getOrderStatus(item.desk_status).desc }}</view>
                <view>开台时间：{{$minCommon.formatDate(new Date(item.open_time*1000),'yyyy-MM-dd hh:mm:ss') }}</view>
                <view v-if="item.close_time*1">销台时间：{{$minCommon.formatDate(new Date(item.close_time*1000),'yyyy-MM-dd hh:mm:ss') }}</view>
                <view>有效业绩：￥{{item.pay_price}}</view>
                <view>账单金额：￥{{item.bill_price}}</view>
            </view>
            <view class="card-btns min-border-top">
                <view class="btn f26" @click="toBil(item.desk_id,item.id)">查看账单</view>
            </view>
        </view>
    </view>
    <view v-if="ids === '6'">
        <min-order-list :list="list.order_list"></min-order-list>
    </view>
</view>
</template>

<script>
export default {
    data() {
        return {
            ids: '',
            list: {
                statistics_time: {
                    start_time: ''
                }
            }
        }
    },
    methods: {
        getYingXiY(uid, date_range) {
            this.$minApi.getYXyeJhuiZong({
                uid,
                date_range
            }).then(res => {
                console.log(res)
                this.list = res
            })
        },
        // 营销开台汇总
        getYXkaitaihui(uid, date_range) {
            this.$minApi.getYXkaiTaiHuiz({
                uid,
                date_range
            }).then(res => {
                console.log(res)
                this.list = res
            })
        },
        // 销售业绩汇总
        getXShz(uid, date_range) {
            this.$minApi.getXSYJHZ({
                uid,
                date_range
            }).then(res => {
                console.log(res)
                this.list = res
            })
        },
        // 查看账单
        toBil(desk_id, id) {
            console.log(desk_id, id)
            // 这里需要传开台记录id 台位ID
            this.$minRouter.push({
                name: 'desk-bill',
                params: {
                    open_id: id,
                    desk_id: desk_id
                }
            })
        }
    },
    onLoad(option) {
        console.log(option)
        this.ids = option.id
        switch (option.id) {
            case '0':
                uni.setNavigationBarTitle({
                    title: '个人营销业绩汇总'
                })
                this.getYingXiY(option.uid, option.current)
                break
            case '1':
                uni.setNavigationBarTitle({
                    title: '个人营销开台汇总'
                })
                this.getYXkaitaihui(option.uid, option.current)
                break
            case '6':
                uni.setNavigationBarTitle({
                    title: '销售业绩汇总'
                })
                this.getXShz(option.uid, option.current)
                break
            default:
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    background: #fff;
    border-radius: 10rpx;

    .main {
        view {
            margin-bottom: 10rpx;
        }

    }

    .card-btns {
        height: 90rpx;
        display: flex;
        justify-content: flex-end;

        align-items: center;

        .btn {
            width: 142rpx;
            height: 58rpx;
            background: rgba(255, 255, 255, 1);
            border: 1rpx solid rgba(231, 231, 231, 1);
            border-radius: 10rpx;
            line-height: 58rpx;
            text-align: center;
        }
    }
}

.view_desc {
    display: flex;
    justify-content: flex-start;
}
</style>
