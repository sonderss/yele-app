<template>
<view class="storing-liquor-detail p-tb-20 p-lr-30">
    <view v-if="list.client_name">
        <view class="card p-lr-20">
            <view class="top p-tb-30 min-border-bottom">
                <view>客户信息</view>
                <view :class="statusData[list.deposit_status?list.deposit_status:0].status">{{statusData[list.deposit_status?list.deposit_status:0].name}}</view>
            </view>
            <view class="main p-tb-30">
                <view class="item">客户姓名：{{list.client_name}}</view>
                <view class="item">联系电话：{{list.client_mobile}}</view>
            </view>
        </view>
        <view class="goods-wrap m-top-20 p-lr-20">
            <view class="p-tb-30 min-border-bottom">存酒信息</view>
            <view class="goods-list p-t-10 p-bottom-20">
                <view class="p-top-20" v-for="(item,index) in list.detail" :key="index">
                    <view style="background: #fff;">
                        <view class="goods-item">
                            <image class="goods-icon" :src="item.sku_img" />
                            <view class="goods-content">
                                <view class="goods-name">{{item.sku_full_name}}</view>
                                <!-- <view class="count-weap">
                    <view class="slider">
                      <min-slider v-model="item.retention_ratio" max="100"/>
                    </view>
                    <view class="stepper">
                      <min-stepper :isAnimation="false" v-model="item.retention_ratio" max="100" unit="%"/>
                    </view>
                  </view> -->
                                <view class="goods-price">剩余{{item.retention_ratio}}%</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="card p-lr-20 m-top-20">
            <view class="top p-tb-30 min-border-bottom">其他信息</view>
            <view class="main p-tb-30">
                <view class="item">存酒单号：{{list.deposit_sn}}</view>
                <view class="item">存酒人员：{{list.deposit_name}}</view>
                <view class="item">存酒台号：{{list.desk_name}}</view>
                <view class="item">确认人员：{{list.confirm_name}}</view>
                <view class="item">存酒时间：{{list.create_time}}</view>
                <view class="item">生效时间：{{list.confirm_time}}</view>
                <view class="item">到期时间：{{list.expires_time}}</view>
            </view>
        </view>
    </view>
    <min-404 v-else id="none"></min-404>
    <view class="btn-wrap" @click="todetail" v-if="$parseURL().isFromQu">取酒</view>
</view>
</template>

<script>
// 1待确认，2已存酒，3已过期，4已回仓，5已作废，6已取酒
const statusData = [{},
    {
        name: '待确认',
        status: 'confirmed'
    },
    {
        name: '已存酒',
        status: 'end'
    },
    {
        name: '已过期',
        status: 'expired'
    },
    {
        name: '已回仓',
        status: 'force'
    },
    {
        name: '已作废',
        status: 'expired'
    },
    {
        name: '已取酒',
        status: 'force'
    }
]
export default {
    name: 'storing-liquor-detail',
    navigate: ['navigateTo'],
    onLoad() {
        this.id = this.$parseURL().id
        console.log(this.id)
        this.$minApi.getWinestoragedetails({
            id: this.id
        }).then(res => {
            this.list = res
            console.log(this.list)
        })
    },
    data() {
        return {
            statusData,
            count: 0,
            id: Number,
            list: {}
        }
    },
    methods: {
        todetail() {
            console.log(this.$parseURL())
            this.$minRouter.push({
                name: 'liquor-code',
                params: {
                    info: this.$parseURL().info,
                    client_name: this.$parseURL().client_name,
                    client_mobile: this.$parseURL().client_mobile,
                    id: this.$parseURL().id,
                    opening_id: this.$parseURL().opening_id
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.storing-liquor-detail {
    padding-bottom: 100rpx;

    .card {
        background: #fff;
        border-radius: 10rpx;

        .top {
            display: flex;
            justify-content: space-between;

            .confirmed {
                color: #0090FF;
            }

            .confirmed {
                color: #ff0101;
            }

            .end {
                color: #39ba01;
            }

            .force {
                color: #0090ff;
            }

            .expired {
                color: #666666;
            }
        }

        .main {
            .item {
                margin-top: 10rpx;

                &:first-child {
                    margin: 0;
                }
            }
        }
    }

    .goods-wrap {
        background: #fff;
        margin-bottom: 10rpx;

        .goods-item {
            display: flex;

            .goods-icon {
                height: 140rpx;
                flex: 0 0 140rpx;
            }

            .goods-content {
                flex: 1;
                display: block;
                padding-left: 20rpx;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                box-sizing: border-box;

                .goods-name {
                    font-size: 28rpx;
                }

                .goods-price {
                    font-size: 24rpx;
                    color: #FF0000;
                }

                .goods-size {
                    color: #666;
                    font-size: 24rpx;

                    .count {
                        color: #666;
                        font-size: 24rpx;
                        float: right;
                    }
                }
            }

            .count-weap {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-left: -20rpx;

                .slider {
                    flex: 0 0 68%;
                }
            }
        }
    }

    .card {
        background: #fff;
        border-radius: 10rpx;

        .top {
            display: flex;
            justify-content: space-between;
        }

        .main {
            .item {
                margin-top: 10rpx;

                &:first-child {
                    margin: 0;
                }
            }
        }
    }

    .btn-wrap {
        width: 100%;
        height: 90rpx;
        background: #FFDF01;
        position: fixed;
        left: 0;
        bottom: 0;
        line-height: 90rpx;
        text-align: center;
    }
}
</style>
