<template>
<view class="fetch-record p-tb-20 p-lr-30">
    <min-search placeholder="客户姓名/手机号搜索" v-model="key" />

    <view v-if="getKeyData.length !== 0">
        <view class="card p-lr-20 m-tb-20 " v-for="(item,index) in getKeyData" :key="index" @click="goDertail(item.id)">
            <view class="top p-tb-30 min-border-bottom">
                <view class="f26">单号：{{item.deposit_sn}}</view>
                <view :class="item.deposit_status ? 'status ' + statusData[item.deposit_status].status : 'status '">{{statusData[item.deposit_status].name }}</view>
            </view>
            <view class="main p-top-20">
                <view class="item">客户姓名：{{item.client_name}}</view>
                <view class="item">联系电话：{{item.client_mobile}}</view>
                <view class="item p-bottom-20 min-border-bottom">存酒数量：{{item.product_count}}</view>
            </view>
            <view class="timer">{{item.create_time}}<text class="f24" style="color:#666666">存酒人：{{item.deposit_name}}</text></view>
        </view>
    </view>
    <min-404 v-else />
    <min-pulldown :isFlag="falg" :desc="des" :loading="load" />

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
    name: 'wine-record',
    navigate: ['navigateTo', 'switchTab'],
    data() {
        return {
            statusData,
            list: [],
            falg: false,
            des: "加载中",
            page: 1,
            load: true,
            key: ''
        }
    },
    computed: {
        getKeyData() {
            let d = [];
            if (this.key) {
                this.list.filter(item => {
                    if (
                        item.client_name
                        .toLowerCase()
                        .includes(this.key.toLowerCase())
                    ) {
                        d.push(item);
                    } else if (
                        item.client_mobile.toLowerCase().includes(this.key.toLowerCase())
                    ) {
                        d.push(item);
                    }
                });
            } else {
                d = this.list;
            }
            return d;
        }
    },
    onReachBottom() {
        console.log('到底')
        this.falg = true
        this.getData(this.page, 10, true).then(res => {
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
        this.getData(1, 10, true).then(res => {
            this.list = res.list
            this.page = 2
            uni.stopPullDownRefresh();
        })
    },
    methods: {
        // storing-liquor-detail
        goDertail(id) {
            this.$minRouter.push({
                name: 'storing-liquor-detail',
                params: {
                    id
                }
            })
        },
        async getData(page, limit, isLoading) {
            return await this.$minApi.getWinekeepingrecord({
                page,
                limit,
                isLoading
            })
        }
    },
    mounted() {
        this.getData(1, 10).then(res => {
            this.list = res.list
        })
    }
}
</script>

<style lang="scss" scoped>
.fetch-record {
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
                font-size: 28rpx;

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
            padding: 20rpx 0;
            font-size: 24rpx;
            color: #666666;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
}
</style>
