<template>
<view class="forfeiture-record p-tb-20 p-lr-30">
    <view class="card p-lr-20 m-bottom-20" v-for="(item,index) in list" :key="index">
        <view class="top p-tb-30 min-border-bottom">
            <view class="ordern">{{item.desk_name}}</view>
            <view class="status confirmed">顾客：{{item.client_name ? item.client_name : '暂无数据'}}</view>
        </view>
        <view v-if="item.product.length!==0" :class="item.isMore ? 'main1 p-top-20 ': 'main p-top-20 ' ">
            <view class="item" v-for="(item2,index2) in item.product" :key="index2">
                <text class="min-ellipsis">{{item2.commodity_detail_name}}*{{item2.commodity_quantity}}</text>
                <text>￥{{item2.commodity_price}}</text>
            </view>
        </view>
        <view v-if="item.product.length > 3 " class="over-view min-border-bottom p-tb-20" @click="showMore(index)">
            {{item.isMore ? '展开更多' : '收起'}}<text :class="item.isMore ? ' f22 botm1' : ' f22 botm'"></text>
        </view>
        <view class="timer  min-border-top m-top-20">
            <text class="f24">{{item.create_time}}</text>
            <text class="bfont f28">合计：￥{{item.order_price}}</text>
        </view>
    </view>
    <min-404 v-if="list.length === 0"></min-404>
    <min-pulldown :isFlag="falg" :desc="des" :loading="load" />
</view>
</template>

<script>
export default {
    name: 'presentation-records',
    navigate: ['navigateTo'],
    data() {
        return {
            isMore: false,
            txt: true,
            list: [],
            falg: false,
            des: "加载中",
            page: 1,
            load: true
        }
    },
    onReachBottom() {
        console.log('到底')
        this.falg = true
        this.getData(10, this.page, true).then(res => {
            if (res.list.length === 0) {
                this.load = false
                this.des = '暂无更多数据'
                setTimeout(() => {
                    return this.falg = false
                }, 1000)
            }
            this.page++
            this.list = this.list.concat([...res.list])
        })
    },
    onPullDownRefresh() {
        console.log('refresh');
        this.getData(10, 1, true).then(res => {
            this.list = res.list
            this.page = 2
            uni.stopPullDownRefresh();
        })
    },
    mounted() {
        this.getData(10, 1).then(res => {
            console.log(res);
            this.list = res.list
            this.page++
            this.list.map(item => {
                if (item.product.length > 3) {
                    this.$set(item, 'isMore', true)
                } else {
                    this.$set(item, 'isMore', false)
                }
            })
        })
    },
    methods: {
        async getData(limit, page, isLoading) {
            return await this.$minApi.giveAwayList({
                limit,
                page,
                isLoading
            })
        },
        showMore(index2) {
            if (this.list[index2].isMore) {
                this.$set(this.list[index2], 'isMore', false)
            } else {
                this.$set(this.list[index2], 'isMore', true)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@font-face {
    font-family: test;
    src: url('../../static/font/test.ttf');
}

.forfeiture-record {
    .card {
        background: #fff;
        border-radius: 10rpx;

        .top {
            display: flex;
            justify-content: space-between;

            .ordern {
                font-weight: bold
            }
        }

        .main1 {
            height: 180rpx;
            overflow: hidden;

            .item {
                margin-top: 20rpx;
                font-size: 28rpx;
                display: flex;
                justify-content: space-between;

                &:first-child {
                    margin: 0;
                }
            }
        }

        .over-view {
            width: 100%;
            height: 50rpx;
            font-size: 22rpx;
            color: #666666;
            display: flex;
            justify-content: center;
            align-items: center;

            .botm1::before {
                font: normal normal normal 14upx/1 test;
                content: "\e646";
                font-size: 28upx;
                color: #666;
            }

            .botm:before {
                font: normal normal normal 14upx/1 test;
                content: "\e642";
                font-size: 28upx;
                color: #666
            }
        }

        .main {
            .item {
                margin-top: 10rpx;
                font-size: 28rpx;
                display: flex;
                justify-content: space-between;

                &:first-child {
                    margin: 0;
                }
            }
        }

        .status {
            font-size: 26rpx;

            &.confirmed {
                color: #FF0202
            }

            &.end {
                color: #39BA01
            }

            &.force {
                color: #0090FF
            }

            &.expired {
                color: #666666
            }
        }

        .timer {
            width: 100%;
            height: 76rpx;
            line-height: 76rpx;
            font-size: 24rpx;
            color: #666666;
            display: flex;
            justify-content: space-between;

            .bfont {
                font-weight: bold;
            }
        }
    }
}
</style>
