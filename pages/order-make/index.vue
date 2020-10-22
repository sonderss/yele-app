<template>
<view @touchstart="start" @touchmove="move" @touchend="end">
    <scroll-view scroll-y :style="{transition: top === 0 ? 'transform 300ms' : '',transform: 'translateY(' + top + 'rpx' + ')'}">
        <view class="order-make p-lr-30 p-tb-20" v-if="isData">
            <min-cell class="top-view" :card="false">
                <view class="top-title-view min-flex min-flex-main-between">
                    <text class="f34 left-title">{{deskInfo.desk_name}}</text>
                    <view class="min-flex min-flex-align-center min-flex-main-center">
                        <!-- ../../static/images/headurl60.png -->
                        <min-avatar size="nm" v-if="storeInfo.head_img !== undefined" :url="storeInfo.head_img  ? storeInfo.head_img : '/static/images/headurl60.png' "></min-avatar>
                        <text class="f28 p-left-20">{{storeInfo.store_name}}</text>
                    </view>
                </view>
                <view class="min-border-bottom"></view>
                <view class="main-view min-flex min-flex-dir-top min-flex-align-top">
                    <view class="m-top-30 m-bottom-10">分&nbsp;&nbsp;&nbsp;&nbsp;组：{{deskInfo.group_name}}</view>
                    <view class="m-bottom-10">低&nbsp;&nbsp;&nbsp;&nbsp;消：￥{{deskInfo.minim_charge}}</view>
                    <view class="m-bottom-30">座&nbsp;&nbsp;&nbsp;&nbsp;位：{{txt}}</view>
                </view>
            </min-cell>
            <view class="m-tb-20"></view>
            <min-cell class="mid-view" :card="false">
                <min-desc-input desc="客户姓名" v-model="name1" sign=" " :maxlength="5" placeholder="请输入姓名"></min-desc-input>
                <min-desc-input desc="联系电话" v-model="phone" sign=" " :maxlength="11" placeholder="请输入联系电话"></min-desc-input>

                <view @click="goChioce">
                    <min-desc-input sign="*" desc="预约日期" :isRightRrrow="true" :value="dates" placeholder="请选择预约日期" :disabled="true"></min-desc-input>
                </view>
                <!-- <min-desc-input desc="预抵时间" sign="*"  :border="false" :value='shopDate' :isRightRrrow="true" placeholder="请选择到店日期" :disabled="true"></min-desc-input> -->
                <min-collapse :list="date" v-model="tsetvalue" @chioce="chioce" :nightArr="nightArr" :isKua="storeSetting.is_store_across"></min-collapse>
                <view class="min-border-bottom"></view>
                <min-switch desc="是否当天生日" v-model="isShengri"></min-switch>
            </min-cell>
            <view class="m-tb-20"></view>
            <min-remarks v-model='value' @click="click" @blur="blur"></min-remarks>
            <view class="empty-view"></view>

            <!-- <min-modal ref="test"></min-modal> -->
        </view>
        <min-404 v-if="!isData"></min-404>
    </scroll-view>
    <view class="btn">
        <min-btn :long="true" @click="submit" :opacity='false'>提交</min-btn>
    </view>

</view>
</template>

<script>
// 座位数量:0 - 未选,1 - 1座，2 - 2座，3 - 3座，4 - 4座，5 - 6座，6 - 8座，7 - 10座，8 - 12座，9 - 12座以上
const nums = [{
        txt: '未选'
    },
    {
        txt: '1座'
    },
    {
        txt: '2座'
    },
    {
        txt: ' 3座'
    },
    {
        txt: '4座'
    },
    {
        txt: '6座'
    },
    {
        txt: '8座'
    },
    {
        txt: '10座'
    },
    {
        txt: '12座'
    },
    {
        txt: '12座以上'
    }
]
export default {
    name: 'order-make',
    navigate: ['navigateTo'],
    data() {
        return {
            date: [],
            nightArr: [],
            current: Number,
            // nextCurrent: Number,
            isShengri: false,
            name1: '',
            phone: '',
            value: '',
            shopDate: '',
            tsetvalue: '',
            windowHeight: '',
            table: true,
            url: 'wss://api.store.dev.yeleonline.com:20021',
            socketOpen: false,
            socketMsgQueue: [],
            id: '',
            deskInfo: {
                desk_name: 'null',
                seats: 0,
                group_name: 'null',
                minim_charge: 'null'
            },
            storeInfo: {
                head_img: '../../static/images/headurl60.png',
                store_name: 'null'
            },
            bookingDate: {},
            storeSetting: {},
            nums,
            dates: '',
            isKua: Number,
            isData: 123,
            top: '',
            lastY: '',
            isToady: false
        }
    },
    computed: {
        txt() {
            const value = this.nums[this.deskInfo.seats].txt
            return value
        }
    },
    onLoad() {
        this.id = this.$parseURL().id
    },
    onShow() {
        this.getData(this.id)
            .then(res => {
                uni.showLoading({
                    title: '加载中'
                });
                console.log(res)
                this.deskInfo = res.deskInfo
                this.storeInfo = res.storeInfo
                this.bookingDate = res.bookingDate
                this.storeSetting = res.storeSetting
                if (this.isToady) return this.getDate(this.getNowYing(), this.storeSetting.store_business_time.end)
                this.getDate(this.storeSetting.store_business_time.start, this.storeSetting.store_business_time.end)
            })
    },
    watch: {
        dates(a) {
            let t = a.split(' ')[0]
            console.log(t)
            let nowTime = this.$minCommon.formatDate(new Date(Date.now()), 'yyyy-MM-dd hh:mm').split(' ')[0]
            console.log(nowTime)
            // 2020-09-23 
            if (t === nowTime) return this.isToady = true
            return this.isToady = false
            // let aaa = t.replace(/-/g, '/')
            // console.log(aaa)
        }
    },
    methods: {
        // 获取时间
        getDate(start, end) {
            let result = this.setTimePrint(start, end)
            console.log(result)
            start = result.start
            end = result.end
            const ia = 30 * 60 * 1000
            if (start === '23:59') {
                this.storeSetting.is_store_across = 0
                start = "00:00"
            }

            if (this.storeSetting.is_store_across !== 1) {
                // 没有跨天
                const startime1 = '2020/3/18' + ' ' + start
                const endTie1 = '2020/3/18' + ' ' + end
                const startimeDate1 = new Date(startime1).getTime()
                const endTiemeDate1 = new Date(endTie1).getTime()
                const arr1 = []

                for (let i = startimeDate1; i <= endTiemeDate1; i += ia) {
                    const eq = new Date(i)
                    const a = this.$minCommon.formatDate(eq, 'hh:mm')
                    arr1.push(a)
                }
                uni.hideLoading();
                return this.date = arr1
            }
            let startime = '2020/3/18' + ' ' + start
            let endTie = '2020/3/19' + ' ' + end
            const endTiemeDate = new Date(endTie)
            const startimeDate = new Date(startime)
            let night = new Date('2020/3/18 23:59:59')
            let tom = new Date('2020/3/19 00:00:00')
            const nightLine = night.getTime()
            const tommorw = tom.getTime()
            // 开始的时间戳
            start = startimeDate.getTime()
            // 结束的时间戳
            end = endTiemeDate.getTime()
            const arr = []
            for (let i = start; i < nightLine; i += ia) {
                const eq = new Date(i)
                const a = this.$minCommon.formatDate(eq, 'hh:mm')
                arr.push(a)
            }
            const brr = []
            for (let i = tommorw; i <= end; i += ia) {
                const eq = new Date(i)
                const a = this.$minCommon.formatDate(eq, 'hh:mm')
                brr.push(a)
            }
            this.date = arr
            this.nightArr = brr
            uni.hideLoading();
        },
        getData(id) {
            return new Promise((resolve, reject) => {
                this.$minApi.getBookingPreview({
                        desk_id: id
                    })
                    .then(res => {
                        this.isData = true
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        setTimeout(() => {
                            this.isData = false
                        }, 2000)
                    })
            })
        },
        chioce(n) {
            this.isKua = n
        },
        // 将日期改为整数
        setTimePrint(startime, endtime) {
            let start = startime.split(':')
            let end = endtime.split(':')

            if (start[1] * 1 !== 30 && start[1] !== '00') {
                console.log("开始时间", start[1])
                if (start[1] * 1 < 30) {
                    console.log("小于30")
                    start = start[0] + ':' + '30'
                }
                if (start[1] * 1 > 30) {
                    console.log("大于30")
                    if (start[0] * 1 < 23) {
                        start = start[0] * 1 + 1 + ':' + '00'
                    }
                    if (start[0] * 1 == 23) {
                        start = '23:' + '59'
                    }
                }
            } else {
                start = startime
            }
            if (end[1] * 1 !== 30 && end[1] !== '00') {
                console.log("结束时间", end[1])
                if (end[1] * 1 < 30) {
                    console.log("小于30")
                    end = end[0] + ':' + '00'
                }
                if (end[1] * 1 > 30) {
                    console.log("大于30")
                    if (end[0] * 1 < 23) {
                        end = end[0] * 1 + ':' + '30'
                    }
                    if (end[0] * 1 == 23) {
                        end = '23:' + '30'
                    }
                }
            } else {
                end = endtime
            }
            return {
                start,
                end
            }
        },
        // 获取营业时间以内的当前时间段
        getNowYing() {
            // this.storeSetting.store_business_time.start, this.storeSetting.store_business_time.end
            let now = this.$minCommon.formatDate(new Date(), 'hh:mm') // 11:56
            const ia = 30 * 60 * 1000
            let startime = '2020/3/18' + ' ' + this.storeSetting.store_business_time.start
            let endTie = '2020/3/19' + ' ' + this.storeSetting.store_business_time.end
            let nowtime = '2020/3/18' + ' ' + now

            const endTiemeDate = new Date(endTie)
            const startimeDate = new Date(startime)
            const nowtimeDate = new Date(nowtime)
            let night = new Date('2020/3/18 23:59:59')
            let tom = new Date('2020/3/19 00:00:00')
            const nightLine = night.getTime()
            const tommorw = tom.getTime()
            // // 开始的时间戳
            // start = startimeDate.getTime()
            // // 结束的时间戳
            // end = endTiemeDate.getTime()
            const arr = []
            for (let i = startimeDate.getTime(); i < nightLine; i += ia) {
                const eq = new Date(i)
                if (eq.getTime() >= nowtimeDate.getTime()) {
                    let a = this.$minCommon.formatDate(eq, 'hh:mm')
                    arr.push(a)
                }

            }
            return arr[0]
        },
        // 提交
        submit() {
            /**
             * 桌子Id  客户姓名  客户手机号  预约日期（例 2020-01-01）  预抵时间 （例 20:00）  是否生日（1否，2：是）  备注  是否跨天
             */
            let dates = this.dates
            const datesNum = this.dates.indexOf(' ')
            dates = dates.slice(0, datesNum)
            const data = {
                desk_id: this.id,
                client_name: this.name1,
                client_mobile: this.phone,
                business_date: dates,
                arrival_time: this.tsetvalue,
                is_birthday: this.isShengri ? 1 : 0,
                remark: this.value,
                is_across: this.isKua
            }
            // if (!data.client_name) {
            //     uni.showToast({
            //         title: '请输入姓名',
            //         icon: 'none'
            //     })
            // } else if (data.client_name.indexOf('&') !== -1) {
            //     uni.showToast({
            //         title: '姓名含有非法字符',
            //         icon: 'none'
            //     })
            // } 
            // if (!this.$minCommon.checkMobile(data.client_mobile)) {
            //     uni.showToast({
            //         title: '请输入有效电话姓名',
            //         icon: 'none'
            //     })
            // } 
           if (!data.business_date) {
                uni.showToast({
                    title: '请选择预定日期',
                    icon: 'none'
                })
            } else if (!data.arrival_time) {
                uni.showToast({
                    title: '请选择预达时间',
                    icon: 'none'
                })
            } else {
                this.addData(data).then(res => {
                    uni.redirectTo({
                        url: '../reservation-success/index?data=' + JSON.stringify(res)
                    })
                })
            }
        },
        start(e) {
            this.lastY = e.changedTouches[0].pageY
        },
        move(e) {
            let currentY = e.changedTouches[0].pageY
            if (this.top < currentY - this.lastY) {
                // 像下滚动
                this.top = currentY - this.lastY
            } else {
                // 向上滚动
                this.top = currentY - this.lastY
            }
        },
        end() {
            return (this.top = 0)
        },
        // 提交
        addData(data) {
            return new Promise((resolve, reject) => {
                this.$minApi.addBooked({
                        remark: data.remark,
                        is_across: data.is_across,
                        desk_id: data.desk_id,
                        client_name: data.client_name,
                        client_mobile: data.client_mobile,
                        business_date: data.business_date,
                        arrival_time: data.arrival_time,
                        is_birthday: data.is_birthday
                    })
                    .then(res => {
                        console.log(res)
                        resolve(res)
                    })
            })
        },
        click() {
            this.table = false
        },
        blur() {
            console.log(this.table)
            this.table = true
        },
        // 选择预约日期
        goChioce() {
            this.$minRouter.push({
                name: 'reservation-date',
                params: {
                    data: this.bookingDate
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.order-make {
    .top-view {
        width: 690rpx;
        height: 286rpx;

        .top-title-view {
            height: 86rpx;

            .left-title {
                color: #ff0000;
            }
        }

        .main-view {
            background: #f0f0;
        }
    }

    .mid-view {
        width: 690rpx;
        height: auto;
    }

    .oinput {
        text-align: right;
        line-height: 98rpx;
    }

    .ophone {
        padding-right: 34rpx;
    }

    .right-arrow {
        width: 24rpx;
        height: 24rpx;
        padding-top: 5rpx;
    }

    .desc-width {
        width: 200rpx;
    }

    .chioce-date {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;

        .chioce-date-item {
            width: 112rpx;
            height: 58rpx;
            border: 1rpx solid #e7e7e7;
            border-radius: 10rpx;
            font-size: 28rpx;
            text-align: center;
            line-height: 58rpx;
        }

        .chioce-date-item-active {
            width: 112rpx;
            height: 58rpx;
            background: rgba(255, 224, 1, 1);
            border-radius: 10rpx;
            font-size: 28rpx;
            text-align: center;
            line-height: 58rpx;
        }

        .chioce-date-item:nth-child(5n) {
            margin: 0;
        }

        .chioce-date-item-active:nth-child(5n) {
            margin: 0;
        }
    }

    position: relative;
}

.btn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
}

.empty-view {
    height: 140rpx;
}
</style>
