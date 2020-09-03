<template>
<view class="forfeiture-record p-tb-20 p-lr-30">
    <view class="card p-lr-20 m-bottom-20" v-for="(item,index) in list" :key="index">
        <view class="top p-tb-30 min-border-bottom" @click="goDetail(index)">
            <view>单号：{{item.order_sn}}</view>
            <view :class="item.friend_status==='待确认' ? 'status confirmed' :  (item.friend_status ==='已确认' ? 'status end' : 'status expired' )">{{item.friend_status}}</view>
        </view>
        <view :class="item.isMore ?  'main p-top-20': 'main1 p-tb-20 '" @click="goDetail(index)">
            <view class="item" v-for="(item2,index2) in item.detail" :key="index2">
                <text class="f28">{{item2.product_name+item2.product_sku}}</text>
                <text class="f28">*{{item2.product_num}}</text>
            </view>
        </view>
        <view class="over-view" @click="showMore(index)" v-if="item.detail.length >3  ">
            {{item.isMore ? '展开更多' : '收起'}}
            <text :class="item.isMore ? ' f22 botm1' : ' f22 botm'"></text>
        </view>
        <view class="timer p min-border-top">{{item.friend_create_time}}</view>
    </view>
    <min-404 v-model="intNet" v-if="list.length === 0" id='none'></min-404>
    <min-pulldown :isFlag="falg" :desc="des" :loading="load" />
</view>
</template>

<script>
export default {
    name: 'forfeiture-record',
    navigate: ['navigateTo', 'switchTab'],
    mounted() {
        this.getWineList(1, 10)
            .then(res => {
                this.list = res.list
                this.page++
                this.list.map(item => {
                    if (item.detail.length > 3) {
                        this.$set(item, 'isMore', true)
                    } else {
                        this.$set(item, 'isMore', false)
                    }
                })
                console.log(this.list)
            })
            // eslint-disable-next-line handle-callback-err
            .catch(err => {
                console.log(err)
            })
    },
    onReachBottom() {
        console.log('到底')
        this.falg = true
        this.getWineList(this.page, 10, true).then(res => {
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
        this.getWineList(1, 10, true).then(res => {
            this.list = res.list
            this.page = 2
            uni.stopPullDownRefresh();
        })
    },
    watch: {
        intNet: function (a) {
            if (!a) {
                uni.hideLoading()
            } else {
                // 请求数据
                this.getWineList(1, 10)
                    .then(res => {
                        this.list = res.list
                        this.list.map(item => {
                            if (item.detail.length > 3) {
                                item.isMore = true
                            } else {
                                item.isMore = false
                            }
                        })
                    })
            }
        }
    },
    data() {
        return {
            isMore: false,
            txt: true,
            list: [],
            intNet: Boolean,
            falg: false,
            des: "加载中",
            page: 2,
            load: true
        }
    },
    methods: {
        showMore(index2) {
            if (this.list[index2].isMore) {
                this.$set(this.list[index2], 'isMore', false)
            } else {
                this.$set(this.list[index2], 'isMore', true)
            }
        },
        getWineList(page, limit, isLoading) {
            const option = {
                page,
                limit,
                isLoading
            }
            return new Promise((resolve, reject) => {
                this.$minApi
                    .getConfiscatedWinereCords(option)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        // eslint-disable-next-line prefer-promise-reject-errors
                        reject('promise返回错误' + err)
                    })
            })
        },
        // 调到详情页
        goDetail(index) {
            this.$minRouter.push({
                name: 'confwine-details',
                type: 'navigateTo',
                path: '/pages/confwine-details/index',
                params: {
                    id: this.list[index].id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@font-face {
    font-family: test;
    src: url("../../static/font/test.ttf");
}

.forfeiture-record {
    .card {
        background: #fff;
        border-radius: 10rpx;

        .top {
            display: flex;
            justify-content: space-between;
        }

        .main1 {
            height: auto;
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
                color: #666;
            }
        }

        .main {
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

        .status {
            font-size: 26rpx;

            &.confirmed {
                color: #ff0101;
            }

            &.end {
                color: #39ba01;
            }

            &.force {
                color: #0090ff;
            }

            &.expired {
                color: #666666;
            }
        }

        .timer {
            width: 100%;
            height: 76rpx;
            line-height: 76rpx;
            font-size: 24rpx;
            color: #666666;
        }
    }
}
</style>
