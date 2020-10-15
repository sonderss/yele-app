<template>
<view class="platform-history p-top-20 p-lr-30">
    <view class="card p-lr-20 p-top-30 m-bottom-20" v-for="(item,index) in list" :key='index'>
        <view class="main p-bottom-30">
            <view>客户姓名：{{item.client_name ? item.client_name :'暂无数据'}}</view>
            <view>联系电话：{{item.client_mobile ? item.client_mobile:'暂无数据'}}</view>
            <view>营销人员：{{item.sales_user_name ? item.sales_user_name :'暂无数据'}}</view>
            <view>台<span style="padding-left:55rpx">号</span>：{{item.desk_name}}</view>
            <view>开台方式：{{item.open_type === 1 ?  '下单开台': '申请开台'}}</view>
            <view>申请状态：
                <text :class="item.status === 1 ? 'status_succeess':'status_loading'">{{item.status === -1 ? '下单开台': item.status === 0 ? '申请中': '已通过' }}</text>
            </view>
            <view v-if="!item.status === 1">申请时间：{{$minCommon.formatDate(new Date(item.apply_time*1000), 'yyyy-MM-dd hh:mm:ss') }}</view>
            <view v-if="item.status === 1">通过人员：{{item.operator_user_name ? item.operator_user_name : '暂无数据'}}</view>
            <view v-if="item.status === 1">当班主管：{{item.manager_user_name ? item.manager_user_name : '暂无数据'}}</view>
            <view v-if="item.status === 1">通过时间：{{$minCommon.formatDate(new Date(item.audit_time*1000), 'yyyy-MM-dd hh:mm:ss') }}</view>
        </view>
        <view class="footer min-border-top p-tb-20" v-if="item.status === 1">
            <view class="amount"></view>
            <view class="btns">
                <min-btn size="xs" type="white" border @click="viewOrder(item.id)">查看订单</min-btn>
                <view style='width:20rpx'></view>
                <min-btn size="xs" type="white" border class="m-left-20" @click="viewBill(item.id,item.desk_id)">查看账单</min-btn>
            </view>
        </view>
    </view>
    <min-404 v-if="list.length === 0" id='none'></min-404>
    <min-pulldown :isFlag="falg" :desc="des" :loading="load" />
</view>
</template>

<script>
//申请状态（-1：下单开台，0：申请中，1：已通过）

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
    onLoad() {
        this.getData(1, 10).then(res => {
            console.log(res)
            this.list = res.list
        })
    },
    onReachBottom() {
        console.log('到底')
        this.falg = true
        this.getData(this.nums, 10, true).then(res => {
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
        this.getData(1, 10, true).then(res => {
            this.list = res.list
            this.nums = 2
            this.falg = false
            uni.stopPullDownRefresh();
        })
    },
    methods: {
        async getData(page, limit, isLoading = false) {
            return this.$minApi.openList({
                page,
                limit,
                isLoading: isLoading
            })
        },
        viewOrder(id) {
            this.$minRouter.push({
                name: 'order-list',
                params: {
                    open_id: id
                }
            })
        },
        viewBill(id, desk_id) {
            this.$minRouter.push({
                name: 'desk-bill',
                params: {
                    desk_id: desk_id,
                    open_id: id
                }
            })
        }
    },
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

        .status_loading {
            color: #FF0000;
        }

        .status_succeess {
            color: #39BA01;
        }
    }
}
</style>
