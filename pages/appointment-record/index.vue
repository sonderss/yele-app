<template>
<view class="appointment-record">
    <view class="top-view" v-if="list.length !== 0">
        <view class="top-v" @click="change1">
            <text :class="num === 0 ? 'status end f30' : 'status f30' ">预约时间</text>
            <image :class="animation ? 'arro animation right-arrow-a':  'arro animation'" src="/static/images/downarrow24.png" />
        </view>
        <view class="top-v" @click="change">
            <text :class="num === 1 ? 'status end f30' : 'status f30' ">消费金额</text>
            <image :class="animation1 ? 'arro  animation right-arrow-a'  :  'arro  animation'" src="/static/images/downarrow24.png" />
        </view>
    </view>
    <view class="main p-tb-20 m-tb-20 m-lr-30 p-lr-20" v-for="(item,index) in list" :key="index" @click.stop="toDetail(item)">
        <view class="item">客户姓名：{{item.client_name}}</view>
        <view class="item phone">
            <text>联系电话：{{item.client_mobile}}</text>
            <view class="image-view">
                <image src="/static/images/phone.png" @click.stop="makePhone(item.client_mobile)" />
            </view>
        </view>

        <view class="item">台 <text style="padding-left:60rpx">号：</text>{{ item.desk_name}}</view>
        <view class="item">
            台位状态：
            <text :class="item.desk_status !== 2  ? 'status': 'status confirmed'">{{desk_status[item.desk_status] }}</text>
        </view>
        <view class="item" v-if="item.desk_status !== 1  ">消费金额：￥{{item.bill_price}}</view>
        <view class="item">预约时间：{{ $minCommon.formatDate(new Date( item.create_time * 1000), "yyyy-MM-dd hh:mm:ss")}}</view>
        <view class="item">预抵时间：{{$minCommon.formatDate(new Date( item.arrival_time * 1000), "yyyy-MM-dd hh:mm:ss")}}</view>
        <view class="item" v-if="item.desk_status === 0">销台时间：{{$minCommon.formatDate(new Date( item.close_time * 1000), "yyyy-MM-dd hh:mm:ss")}}</view>
        <view class="btm-view min-border-top m-top-20" v-if="item.desk_status !== 1 ">
            <view class="o" @click.stop="queryOrder(item)">查看订单</view>
            <view class="o" @click.stop="queryDist(item)">查看账单</view>
        </view>
        <view style="height:30rpx" v-else></view>
    </view>
    <min-404 v-if="list.length === 0" />
    <min-pulldown :isFlag="falg" :desc="des" :loading="load" />
</view>
</template>

<script>
// 1：'已预约',2：'已过期',3：'已开台',4：'已取消',5：'已销台'
const status = ["未知", "已预约", "已过期", "已开台", "已取消", "已销台"];
// 台位状态（0已销台，1预约中，2已开台）
const desk_status = ["已销台", "预约中", "已开台"];
export default {
    name: "appointment-record",
    navigate: ["navigateTo"],
    data() {
        return {
            list: [],
            status,
            num: 0,
            animation: false,
            animation1: false,
            falg: false,
            des: "加载中",
            page: 2,
            load: true,
            desk_status
        };
    },
    onReachBottom() {
        this.falg = true;
        this.$minApi
            .getBookList({
                order: this.animation ? "time" : "price",
                sort: this.animation ? "desc" : "asc",
                page: this.page,
                limit: 10
            })
            .then(res => {
                if (res.list.length === 0) {
                    this.load = false;
                    this.des = "暂无更多数据";
                    setTimeout(() => {
                        return (this.falg = false);
                    }, 1000);
                }
                this.page++;
                this.list = this.list.concat([...res.list]);
                // this.list.map(item => {
                //     item.arrival_time = this.$minCommon.formatDate(new Date(item.arrival_time * 1000), "yyyy-MM-dd hh:mm:ss");
                //     item.create_time = this.$minCommon.formatDate(new Date(item.create_time * 1000), "yyyy-MM-dd hh:mm:ss");
                // });
            });
    },
    onPullDownRefresh() {
        this.$minApi
            .getBookList({
                order: "time",
                sort: "desc",
                page: 1,
                limit: 10
            })
            .then(res => {
                this.list = res.list;
                this.page = 2;
                uni.stopPullDownRefresh();
            });
    },
    mounted() {
        const data = {
            order: "time",
            sort: "desc",
            page: 1,
            limit: 10
        };
        this.getData(data);
    },
    methods: {
        getData(data) {
            this.$minApi.getBookList(data).then(res => {
                console.log(res);
                this.list = res.list;
                // this.list.map(item => {
                //     item.arrival_time = this.$minCommon.formatDate(
                //         new Date(item.arrival_time * 1000),
                //         "yyyy-MM-dd hh:mm:ss"
                //     );
                //     item.create_time = this.$minCommon.formatDate(
                //         new Date(item.create_time * 1000),
                //         "yyyy-MM-dd hh:mm:ss"
                //     );
                // });
            });
        },
        change() {
            this.num = 1;
            this.animation1 = !this.animation1;
            if (this.animation1) {
                const data = {
                    order: "price",
                    sort: "asc",
                    page: 1,
                    limit: 10
                };
                this.getData(data);
            } else {
                const data = {
                    order: "price",
                    sort: "desc",
                    page: 1,
                    limit: 10
                };
                this.getData(data);
            }
        },
        toDetail(item) {
            console.log("item", item)
            if (item.desk_status === 1) {
                // 桌台详情 并且有具体的日期
                this.$minRouter.push({
                    name: 'platform-detail',
                    params: {
                        id: item.desk_id,
                        status: item.desk_status,
                        date: item.business_date
                    },
                })
                return
            }
            // 账单详情页
            this.queryDist(item)
        },
        change1() {
            this.num = 0;
            this.animation = !this.animation;
            // desc：倒序，asc：顺序（默认）
            if (this.animation) {
                const data = {
                    order: "time",
                    sort: "asc",
                    page: 1,
                    limit: 10
                };
                this.getData(data);
            } else {
                const data = {
                    order: "time",
                    sort: "desc",
                    page: 1,
                    limit: 10
                };
                this.getData(data);
            }
        },
        makePhone(phone) {
            uni.makePhoneCall({
                phoneNumber: phone
            });
        },
        // 查看订单
        queryOrder(item) {
            console.log(item);
            this.$minRouter.push({
                name: "order-list",
                params: {
                    open_id: item.opening_id
                }
            });
        },
        // 查看账单
        queryDist(item) {
            this.$minRouter.push({
                name: "desk-bill",
                params: {
                    open_id: item.opening_id,
                    desk_id: item.desk_id
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.top-view {
    background: #fff;
    height: 90rpx;
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;

    .top-v {
        display: block;
        width: 50%;
        line-height: 90rpx;
        text-align: center;

        .arro {
            width: 20rpx;
            height: 20rpx;
            margin-left: 5rpx;
        }

        .arrw {
            transform: rotate(-180deg);
        }
    }
}

.main {
    height: auto;
    background: #fff;
    padding-bottom: 0;

    .item {
        margin-bottom: 10rpx;
    }

    .phone {
        display: flex;
        justify-content: space-between;

        .image-view {
            width: 44rpx;
            height: 44rpx;

            image {
                width: 100%;
                height: 100%;
            }
        }
    }

    .btm-view {
        height: 98rpx;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .o {
            width: 142rpx;
            height: 58rpx;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(231, 231, 231, 1);
            border-radius: 10rpx;
            margin-left: 20rpx;
            text-align: center;
            line-height: 58rpx;
        }
    }
}

.status {
    font-size: 26rpx;
    font-weight: 700;
    padding-right: 8rpx;

    &.confirmed {
        color: #ff0000;
    }

    &.end {
        color: #ff2c00;
    }

    &.force {
        color: #0090ff;
    }

    &.expired {
        color: #666666;
    }
}

.right-arrow-a {
    transform: rotate(180deg);
}

.animation {
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: ease;
}

// p-tb-20 p-lr-30
</style>
