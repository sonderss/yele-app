<template>
<view class="index" @touchstart="start" @touchmove="move" @touchend="end">
    <scroll-view scroll-y :style="{
        transition: top === 0 ? 'transform 300ms' : '',
        transform: 'translateY(' + top + 'rpx' + ')'
      }">
        <view class="m-top-20 toasta f26" style="color:#fff;" v-if="top && flag">
            <text class="iconfont icon-changyongicon_huaban" style="color:#fff;font-weight:blod;f26">&#xe616;</text>
            {{ top >= 300 ? '松开' : '下拉' }}查看座位分布图
        </view>
        <view class="back-img-box">
            <view style="height: 178rpx;"></view>
            <view class="info min-flex min-flex-main-between m-lr-30">
                <view class="min-flex min-flex-main-start" @click="toUSER">
                    <min-avatar size="md" :url="userInfo.head_img ? userInfo.head_img  :'/static/images/head.png'"></min-avatar>
                    <view class="m-left-20">
                        <view class="f30" style="font-weight:bold">{{ userInfo.user_name }}</view>
                        <view class="f24 m-top-20  min-ellipsis" style="width:400rpx">{{ userInfo.store_name }} | {{ userInfo.position_name }}</view>
                    </view>
                </view>
                <view class="min-flex min-flex-main-center" @click="navigateTo('changeStore')">
                    <view class="f24">切换门店</view>
                    <view class="right_arrow"></view>
                </view>
            </view>
            <view style="height: 70rpx;"></view>
            <view class="bar m-lr-30 min-flex min-flex-main-start">
                <view class="left" @click="toPlatform('desk')">
                    <view class="yele-grid2">
                        <view class="left_item">
                            <image class="img" src="/static/images/index/bar.png" />
                        </view>
                        <view class="right_item">
                            <view class="f32 weight">桌台管理</view>
                            <view class="f28 assist-text">预约、下单、开台、存酒</view>
                        </view>
                    </view>
                </view>
                <view class="right m-left-20" @click="toCwine('confiscate')">
                    <view class="yele-grid1">
                        <view class="min-flex min-flex-dir-top">
                            <image class="img" src="/static/images/index/bar1.png" />
                            <view class="f28">充公酒</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <yele-grid :list="grid2"></yele-grid>
        <yele-grid :list="grid3"></yele-grid>
        <yele-grid :list="grid4"></yele-grid>
    </scroll-view>
</view>
</template>

<script>
import back from '@/static/images/index/back.png'
import MinAvatar from '@/components/min-avatar'
import YeleGrid from '@/components/page/yele-grid'
export default {
    navigate: ['navigateTo', 'reLaunch'],
    name: 'index',
    components: {
        MinAvatar,
        YeleGrid
    },
    mounted() {
        this.getPay(true)
        this.$minApi.getUserInfo({
            isLoading: true
        }).then(res => {
            this.$store.dispatch('user/setUserInfos', res)
        })
        this.$store.dispatch(
            'status/setMyDate',
            this.$minCommon.formatDate(new Date(Date.now()), 'yyyy-MM-dd')
        )
    },
    onShow() {
        // uni.request({
        //   url: "http://api.app-store.dev.yeleonline.com/api/5ee8747279279",
        //   header: {
        //     "access-token": "HPkSFqbVhWpCRxVRpOTkyEubusFxBEEd",
        //     "api-auth": this.$store.state.user.userInfo.apiAuth
        //   },
        //   success: res => {
        //     const { code, data, msg } = res.data;
        //     // 统一处理响应请求，后续完善
        //     if (code !== 1) {
        //       uni.showToast({
        //         title: msg,
        //         duration: 2000,
        //         icon: "none"
        //       });
        //       // 登录过期
        //       if (code === 1000011) {
        //         this.$store.dispatch("user/setUserInfo", {});
        //         uni.reLaunch({
        //           url: "/pages/login/index"
        //         });
        //       }
        //       return;
        //     }
        //     if (
        //       this.$store.state.user.userInfo.access.length !==
        //       res.data.data.permission.length
        //     ) {
        //       this.$showToast("权限有变更，请重新登录");
        //       setTimeout(() => {
        //         uni.reLaunch({
        //           url: "../login/index"
        //         });
        //       }, 2000);
        //     }
        //     if (res.data.data.permission.length === 0) {
        //       this.$showToast("没有任何权限，请联系管理员");
        //       setTimeout(() => {
        //         uni.reLaunch({
        //           url: "../login/index"
        //         });
        //       }, 2000);
        //     }
        //   }
        // });
    },
    data() {
        return {
            back,
            top: '',
            lastY: '',
            flag: Boolean,
            testArr: [],
            isT: false,
            grid2: [{
                    url: '../order-record/index.vue',
                    name: 'order-record',
                    img: '/static/images/index/order.png',
                    text: '下单记录',
                    root: 'orderRecord'
                },
                {
                    url: '../appointment-record/index.vue',
                    name: 'appointment-record',
                    img: '/static/images/index/station.png',
                    text: '预约记录',
                    root: 'bookRecord'
                },
                {
                    url: '../presentation-records/index.vue',
                    name: 'presentation-records',
                    img: '/static/images/index/gift.png',
                    text: '赠送记录',
                    root: 'presentationRecord'
                },
                {
                    name: 'wine-record',
                    url: '../wine-record/index.vue',
                    img: '/static/images/index/bar2.png',
                    text: '存酒记录',
                    root: 'saveWineRecord'
                },
                {
                    name: 'fetch-record',
                    url: '../fetch-record/index.vue',
                    img: '/static/images/index/qu.png',
                    text: '取酒记录',
                    root: 'fetchWineRecord'
                },
                {
                    name: 'forfeiture-record',
                    url: '../forfeiture-record/index.vue',
                    img: '/static/images/index/confiscated.png',
                    text: '充公记录',
                    root: 'confiscateRecord'
                },
                {
                    img: '/static/images/index/seat.png',
                    text: '转台记录',
                    name: 'turntable-record',
                    root: 'transferRecord'
                },
                {
                    img: '/static/images/index/take.png',
                    text: '开台记录',
                    name: 'open-list',
                    root: 'openingRecord'
                },
                {
                    img: '',
                    text: '',
                    name: '',
                    root: '',
                    empty: true
                }
            ],
            grid3: [

                {
                    img: '/static/images/index/ti.png',
                    name: 'commission-details',
                    url: 'commission-details',
                    text: '我的提成',
                    root: 'statistics'
                }, {
                    img: '/static/images/index/shou.png',
                    name: 'withdrawals-record',
                    url: 'withdrawals-record',
                    text: '收支流水',
                    root: 'statistics',
                    params: {
                        type: 0
                    }
                },
                {
                    name: 'my-income',
                    img: '/static/images/index/wallet.png',
                    text: '我的收入',
                    root: 'finance',
                    url: 'my-income'
                }
            ],
            grid4: [{
                    img: '/static/images/index/chart.png',
                    name: 'statistics',
                    url: 'statistics',
                    text: '数据统计',
                    root: 'statistics'
                },
                {
                    name: 'my-downline',
                    img: '/static/images/index/my_d.png',
                    text: '我的下线',
                    root: 'myOffline'
                },
                {
                    url: '../mine-info/index',
                    name: 'mine-info',
                    img: '/static/images/index/people.png',
                    text: '个人资料',
                    root: 'userInfo'
                }
            ]
        }
    },
    onShow() {
        // console.log(this.$parseURL())
        // if(this.$parseURL().store_name){
        //     let obj =  this.$store.state.user.userInfo
        //     obj.store_id = this.$parseURL().store_id
        //     obj.store_name =  this.$parseURL().store_name
        //     this.$store.dispatch('user/setUserInfo', obj)
        //     // this.$minApi.getUserInfo({isLoading:true}).then(res => {
        //     //             console.log(res)
        //     //                                    this.$store.dispatch('user/setUserInfo', res)
        //     // }) 
        // }
        if (this.$store.state.status.isReloadUserInfo) {
            this.$minApi.getUserInfo({
                isLoading: true
            }).then(res => {
                console.log("this.$store.state.user.userInfo.apiAuth", this.$store.state.user.userInfo.apiAuth)
                res.apiAuth = this.$store.state.user.userInfo.apiAuth
                this.$store.dispatch('user/setUserInfo', res)
                this.$store.dispatch('status/setisReloadUserInfo', false)
            })
            this.getData()
        }
    },
    computed: {
        userInfo() {
            // 用户信息
            return this.$store.state.user.userInfo
        }
    },
    onBackPress(options) {
        const pages = getCurrentPages(); //当前页
        const beforePage = pages[pages.length - 2]; //上个页面
        // if (beforePage.route === 'pages/login/index') return true
    },
    methods: {
        navigateTo(root) {
            let result = this.$getRoot(root)
            if (!result) return this.$showToast('抱歉，暂无权限')
            this.$minRouter.push({
                name: 'switch-stores',
                type: 'navigateTo',
                path: '/pages/switch-stores/index'
            })
        },
        refresh() {
            this.$nextTick(() => {
                this.$refs.pullScroll.refresh()
            })
        },
        toUSER() {
            this.$minRouter.push({
                name: 'mine-info'
            })
        },
        toCwine(root) {
            let result = this.$getRoot(root)
            if (!result) return this.$showToast('抱歉，暂无权限')
            this.$minRouter.push({
                name: 'confiscated-wine'
            })
        },
        toPlatform(root) {
            let result = this.$getRoot(root)
            if (!result) return this.$showToast('抱歉，暂无权限')
            this.$minRouter.push({
                name: 'platform-admin',
                type: 'navigateTo',
                path: '/pages/platform-admin/index'
            })
        },
        // 获取数据
        getData() {
            this.$minApi
                .GetTableList({
                    date: this.$minCommon.formatDate(new Date(), 'yyyy-MM-dd')
                })
                .then(res => {
                    console.log(res)
                    this.getSeatData(res)
                })
                // eslint-disable-next-line handle-callback-err
                .catch(err => {
                    console.log('桌台列表获取失败')
                })
        },
        getSeatData(list) {
            let arr = []
            let brr = []
            this.$minApi.getSeatList({
                isLoading: true
            }).then(res => {
                list.desks.map(item => {
                    item.desk_lists.map(item2 => {
                        arr.push({
                            id: item2.id,
                            desk_status: item2.desk_status
                        })
                    })
                })
                JSON.parse(res.desk_coordinate).map(item => {
                    arr.map(item2 => {
                        if (item.id === item2.id) {
                            item.status = item2.desk_status
                            return brr.push(item)
                        }
                    })
                })
                res.desk_coordinate = JSON.stringify(brr)
                this.$store.dispatch('status/setSeatList', res)

            })
        },
        start(e) {
            this.lastY = e.changedTouches[0].pageY
        },
        move(e) {
            let currentY = e.changedTouches[0].pageY
            if (this.top < currentY - this.lastY) {
                // 像下滚动
                this.top = currentY - this.lastY
                this.flag = true
            } else {
                // 向上滚动
                //  this.top = 0
                this.top = currentY - this.lastY
                this.flag = false
            }
        },
        end(e) {
            if (this.top >= 300) {
                this.$minApi
                    .GetTableList({
                        date: this.$minCommon.formatDate(new Date(), 'yyyy-MM-dd'),
                        isLoading: true
                    })
                    .then(res => {
                        console.log(res)
                        this.getSeatData(res)
                        this.$minRouter.push({
                            name: 'table-map',
                            params: {
                                url: 'index'
                            }
                        })
                    })

            }
            return (this.top = 0)
        },
        getPay(isLoading) {
            this.$minApi.getPayMethods({
                isLoading: true
            }).then(res => {
                this.$store.dispatch('status/setPayMethods', res.list)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.back-img-box {
    width: 100%;
    // height: 490rpx;
    background-size: 100% 436rpx;
    background-position: 0 0;
    background-repeat: no-repeat;

    // margin-top: 200rpx;
    .info {

        view,
        text {
            color: #ffffff;
        }
    }

    .bar {
        justify-content: space-between;
        align-items: center;

        .left {
            background: #fff;
            border-radius: 10rpx;
            flex: 1;
        }

        .right {
            background: #fff;
            border-radius: 10rpx;
            width: 20%;
        }
    }
}

.white-item {
    background: #ffffff;
    border-radius: 6px;
}

.img {
    width: 80rpx;
    height: 80rpx;
}

.activity-item {
    position: relative;
    width: 330rpx;
    height: 158rpx;

    .bimg {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
    }

    .word {
        position: relative;
        z-index: 2;
        font-size: 45rpx;
        color: #ffffff;
        font-weight: 700;
    }
}

.index {
    background: #030313;
    width: 100vw;
    min-height: 100vh;
    padding-bottom: 20rpx;
    overflow: hidden;
    background-image: url('/static/images/index/back.png');
    background-position: top center;
    background-size: 100% 490rpx;
    background-repeat: no-repeat;
}

.right_arrow {
    width: 23rpx;
    height: 23rpx;
    background-image: url('../../static/images/right-white-arrow.png');
    background-repeat: no-repeat;
    background-size: cover;
    float: right;
    margin-left: 5rpx;
}

.yele-grid1 {
    display: flex;
    height: 144rpx;
    justify-content: center;
    align-items: center;
    border-radius: 10rpx;
    background: #fff;
}

.yele-grid2 {
    display: flex;
    height: 144rpx;

    align-items: center;
    border-radius: 10rpx;
    background: #fff;

    .left_item {
        width: 150rpx;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10rpx 0;
        padding-left: 30rpx;

        .img {
            width: 80rpx;
            height: 80rpx;
            display: block;
        }
    }

    .right_item {
        padding-right: 20rpx;

        .assist-text {
            display: flex;
            padding-top: 10rpx;
            color: #666;
        }
    }
}

.min-refush {
    width: 100%;
    height: 490rpx;
    background-image: url('/static/images/index/back.png');
    background-position: top center;
    background-size: cover;
    background-repeat: no-repeat;
}

.oswiper {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.oitem {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.toasta {
    width: 100%;
    height: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
