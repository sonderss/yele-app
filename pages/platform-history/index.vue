<template>
<view class="platform-history p-top-20 p-lr-30">
    <view class="card p-lr-20 p-top-30 m-bottom-20" v-for="(item,index) in list" :key='index'>
        <view class="main p-bottom-30">
            <view>客户姓名：{{item.client_name ? item.client_name : '暂无'}}</view>
            <view>联系电话：{{item.client_mobile ? item.client_mobile : '暂无'}}</view>
            <view>开台时间：{{$minCommon.formatDate(new Date(item.opened_time * 1000), 'yyyy-MM-dd hh:mm:ss') }}</view>
            <view v-if="item.opening_status === -1">销台时间：{{$minCommon.formatDate(new Date(item.closed_time * 1000), 'yyyy-MM-dd hh:mm:ss') }}</view>
            <view>营销人员：{{item.sales_name}}</view>
            <view>账单金额：￥{{item.bill_price}}</view>
            <view>应付金额：￥{{item.receivable_price}}</view>
            <view>已付金额：￥{{item.pay_price}}</view>
        </view>
        <view class="footer min-border-top p-tb-20">
            <view v-if="item.pay_status === 0 && item.unpay_price*1" :class="item.pay_status === 0 ? 'amount': 'tips'">
                待付金额：￥{{item.unpay_price}}
            </view>
            <view v-if="item.pay_status === 1" class="tips">
                已结清
            </view>
            <view v-else class="amount"></view>
            <view class="btns">
                <min-btn size="xs" type="white" border @click="viewOrder(item.id)">查看订单</min-btn>
                <view style='width:20rpx'></view>
                <min-btn size="xs" type="white" border class="m-left-20" @click="viewBill(item.id)">查看账单</min-btn>
            </view>
        </view>
    </view>
    <min-404 v-if="list.length === 0" id='none'></min-404>
    <min-pulldown :isFlag="falg" :desc="des" :loading="load" />
</view>
</template>

<script>
export default {
    name: 'platform-history',
    navigate: ['navigateTo'],
    data() {
        return {
            list: [],
            falg: false,
            nums: 2,
            des: "加载中",
            load: true,
        }
    },
    mounted() {},
    onLoad() {
        this.getData(this.$parseURL().id)
    },
    onReachBottom() {
        console.log('到底')
        this.falg = true
        this.$minApi.getStationHistory({
            desk_id: this.$parseURL().id,
            page: this.nums,
            limit: 10,
            isLoading: true
        }).then(res => {
            if (res.list.length === 0) {
                this.load = false
                this.des = '暂无更多数据'
                setTimeout(() => {
                    return this.falg = false
                }, 1000)
            }
            this.list = this.list.concat([...res.list])
            this.nums++
        })
    },
    onPullDownRefresh() {
        this.$minApi.getStationHistory({
            desk_id: this.$parseURL().id,
            page: 1,
            limit: 10,
            isLoading: true
        }).then(res => {
            this.list = res.list

            this.nums = 2
            this.falg = false
            uni.stopPullDownRefresh();
        })
    },
    methods: {
        getData(id) {
            this.$minApi.getStationHistory({
                    desk_id: id,
                    page: 1,
                    limit: 10,
                })
                .then(res => {
                    this.list = res.list
                })
        },
        // 查看订单
        viewOrder(id) {
            this.$minRouter.push({
                name: 'order-list',
                params: {
                    open_id: id
                }
            })
        },
        // 查看账单
        viewBill(id) {
            this.$minRouter.push({
                name: 'desk-bill',
                params: {
                    desk_id: this.$parseURL().id,
                    open_id: id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.platform-history {
    .card {
        background: #fff;
        border-radius: 10rpx;

        .main {
            &>view {
                margin-bottom: 10rpx;

                &:last-child {
                    margin: 0;
                }
            }
        }

        .footer {
            display: flex;
            justify-content: space-between;

            .amount {
                color: #FF0000;
                font-size: 24rpx;
                line-height: 68rpx;
                font-weight: bold;
            }

            .tips {
                line-height: 68rpx;
                font-size: 24rpx;
            }

            .btns {
                display: flex;
                justify-content: center;
            }
        }
    }
}
</style>
