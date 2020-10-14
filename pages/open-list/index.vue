<template>
<view class="platform-history p-top-20 p-lr-30">
    <view class="card p-lr-20 p-top-30 m-bottom-20" v-for="(item,index) in list" :key='index'>
        <view class="main p-bottom-30">
            <view>客户姓名：为</view>
            <view>联系电话：器</view>
            <view>营销人员：去</view>
            <view>台<span style="padding-left:55rpx">号</span>：请问</view>
            <view>开台方式：请问</view>
            <view>申请状态：<text :class="item.iss ? 'status_succeess':'status_loading'">请问</text></view>
            <view v-if="!item.iss">申请时间：{{$minCommon.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss') }}</view>
            <view v-if="item.iss">通过人员：为</view>
            <view v-if="item.iss">当班主管：器</view>
            <view v-if="item.iss">通过时间：{{$minCommon.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss') }}</view>
        </view>
        <view class="footer min-border-top p-tb-20" v-if="item.iss">
            <view class="amount"></view>
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
            list: [{
                iss: false
            }, {
                iss: true
            }],
            falg: false,
            nums: 2,
            des: "加载中",
            load: true,
        }
    },
    onLoad() {

    },
    onReachBottom() {
        console.log('到底')

    },
    onPullDownRefresh() {

        uni.stopPullDownRefresh();
    },
    methods: {
        viewOrder(id) {

        },
        viewBill(id) {

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
