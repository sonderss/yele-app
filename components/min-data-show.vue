<template>
<view class="min-data-show">
    <view class="top_search">
        <input :class="focus ? 'left' : 'center'" v-model="keyword" :placeholder="placeholder" @focus="focusValue" />
    </view>
    <view class="m-tb-20">
        <view class="nav_item min-border-bottom p-lr-20" v-if="ids !== '3'">
            <view :class="current === index ? 'nav_item_name_active' :'nav_item_name' " @click="chince(index)" v-for="(i,index) in navBar" :key="i">{{i}}</view>
        </view>
        <view class="main_data p-lr-20">
            <view class="time_desc">
                <view class=" f20 m-tb-20 " v-if="current === 0">更新时间：{{getNowTime}}</view>
                <view class="f20  m-tb-20 " v-else>更新时间：{{getStartTime}} - {{getEndTime}}</view>
                <text class="f20" v-if="ids === '0'">业绩合计：￥{{list.performance_total}}</text>
                <text class="f20" v-if="ids === '1'">订台合计：{{list.booking_total}}</text>
                <text class="f20" v-if="ids === '1'">开台合计：{{list.opening_total}}</text>
                <text class="f20" v-if="ids === '2'">开台合计：{{list.opening_total}}</text>
                <text class="f20" v-if="ids === '2'">业绩合计：￥{{list.performance_total}}</text>
                <text class="f20" v-if="ids === '7'">业绩合计：￥{{list.role_performance_total}}</text>
                <text class="f20" v-if="ids === '6'">业绩合计：￥{{list.performance_totals}}</text>
                <text class="f20" v-if="ids === '4'">业绩合计：￥{{list.sales_totals}}</text>
                <text class="f20" v-if="ids === '5'">销售额合计合计：￥{{list.sales_totals}}</text>
            </view>
            <view class="main_table">
                <view class="title_list min-border-bottom">
                    <view class="title_item" v-for="(item,index) in titles" :key="index" @click="changeSuo(ids,index)">
                        {{item.name}}
                        <image v-if="item.showSet" :class="item.animation ? 'arro animation right-arrow-a ':  'arro animation'" src='/static/images/downarrow24.png' />
                    </view>
                </view>
                <view v-if="ids === '0'">
                    <view class="test_ui" @click="toDetail(i.user_id)" v-for="(i,n) in getData.performance_list" :key="n">
                        <view class="left">
                            <text class="lefty_" style="text-align:left">{{i.user_name}}</text>
                            <text class="left_">{{i.mobile}}</text>
                            <text class="lefty_">{{i.performance}}</text>
                        </view>
                        <view class="right">
                            <text v-if="right">></text>
                        </view>
                    </view>
                </view>
                <view v-if="ids === '1'">
                    <view class="test_ui" @click="toDetail(i.user_id)" v-for="(i,n) in getData.operating_info" :key="n">
                        <view class="left">
                            <text class="lefty_" style="text-align:left">{{i.user_name}}</text>
                            <text class="left_">{{i.booking_count}}</text>
                            <text class="lefty_" style="text-align:right;padding-right:20rpx">{{i.opening_count}}</text>
                        </view>
                        <view class="right">
                            <text v-if="right">></text>
                        </view>
                    </view>
                </view>
                <view v-if="ids === '2'">
                    <view class="test_ui" v-for="(i,n) in getData.performance_list" :key="n">
                        <view class="left">
                            <text class="lefty_">{{i.role_name}}</text>
                            <text class="left_">{{i.opening_count}}</text>
                            <text class="lefty_">{{i.performance}}</text>
                        </view>
                        <view class="right">
                            <text v-if="right">></text>
                        </view>
                    </view>
                </view>
                <view v-if="ids === '3'">
                    <view class="test_ui" v-for="(i,n) in getData.no_performance_list" :key="n">
                        <view class="left">
                            <text class="lefty_" style="text-align:left;padding-left:10rpx">{{i.user_name}}</text>
                            <text class="left_" style="width:320rpx;text-align:left">{{i.last_create_time}}</text>
                            <text class="lefty_" style="text-align:left">{{i.no_performance_day}}</text>
                        </view>
                        <view class="right">
                            <text v-if="right">></text>
                        </view>
                    </view>
                </view>
                <view v-if="ids === '4'">

                    <view v-if="flag">
                        <view class="test_ui" v-for="(i,n) in listTest.product_list" :key="n" @click="toDetail(i.uid)">
                            <view class="left">
                                <text class="lefty_" style="textAlign:left">{{i.product_name}}</text>
                                <text class="left_" style="textAlign:right;padding-right:20rpx">{{i.cate_name ? i.cate_name:'暂无'}}</text>
                                <text class="left_" style="padding-left:30rpx">{{i.quantity}}</text>
                                <text class="left_" style="textAlign:right">{{i.total}}</text>
                            </view>
                        </view>
                    </view>
                    <view v-else>
                        <view class="test_ui" v-for="(i,n) in getData.product_list" :key="n" @click="toDetail(i.uid)">
                            <view class="left">
                                <text class="lefty_" style="textAlign:left">{{i.product_name}}</text>
                                <text class="left_" style="textAlign:right;padding-right:20rpx">{{i.cate_name ? i.cate_name:'暂无'}}</text>
                                <text class="left_" style="padding-left:30rpx">{{i.quantity}}</text>
                                <text class="left_" style="textAlign:right">{{i.total}}</text>
                            </view>
                        </view>
                    </view>
                </view>
                <view v-if="ids === '5'">

                    <view v-if="flag">
                        <view class="test_ui" v-for="(i,n) in listTest.set_meal_list" :key="n" @click="toDetail(i.uid)">
                            <view class="left">
                                <text class="lefty_" style="textAlign:left">{{i.setmeal_name}}</text>
                                <text class="left_" style="padding-left:60rpx">{{i.quantity}}</text>
                                <text class="left_" style="textAlign:right">{{i.total}}</text>
                            </view>
                        </view>
                    </view>
                    <view v-else>
                        <view class="test_ui" v-for="(i,n) in getData.set_meal_list" :key="n" @click="toDetail(i.uid)">
                            <view class="left">
                                <text class="lefty_" style="textAlign:left">{{i.setmeal_name}}</text>
                                <text class="left_" style="padding-left:60rpx">{{i.quantity}}</text>
                                <text class="left_" style="textAlign:right">{{i.total}}</text>
                            </view>
                        </view>
                    </view>
                </view>
                <view v-if="ids === '7'">
                    <view class="test_ui" v-for="(i,n) in getData.role_performance_list" :key="n">
                        <view class="left">
                            <text class="lefty_" style="width:200rpx;textAlign:left">{{i.role_name}}</text>
                            <text class="left_" style="textAlign:right">{{i.role_performance}}</text>
                        </view>

                    </view>
                </view>
                <view v-if="ids === '6'">
                    <view v-if="flag">
                        <view class="test_ui" v-for="(i,n) in listTest.sales_list" :key="n" @click="toDetail(i.uid)">
                            <view class="left">
                                <text class="lefty_" style="textAlign:left">{{i.user_name}}</text>
                                <text class="left_">{{i.role_name}}</text>
                                <text class="" style="textAlign:right">{{i.performance}}</text>
                            </view>
                            <view class="right">
                                <text v-if="right">></text>
                            </view>
                        </view>
                    </view>
                    <view v-else>
                        <view class="test_ui" v-for="(i,n) in getData.sales_list" :key="n" @click="toDetail(i.uid)">
                            <view class="left">
                                <text class="lefty_" style="textAlign:left">{{i.user_name}}</text>
                                <text class="left_">{{i.role_name}}</text>
                                <text class="" style="textAlign:right">{{i.performance ? i.performance : '暂无数据'}}</text>
                            </view>
                            <view class="right">
                                <text v-if="right">></text>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="no_data" v-if="a">
                    暂无数据
                </view>
            </view>
        </view>
    </view>
    <min-popup size="height" :show="show" @close='close'>
        <view v-if="ids === '6'" class="pop-XSYJ-js">
            <picker-view :indicator-style="indicatorStyle" :value="checkValue" @change="bindChange" style="height:400rpx;">
                <picker-view-column>
                    <view class="picker item" v-for="(item,index) in getData.role_list" :key="index">{{item.role_name}}</view>
                </picker-view-column>
            </picker-view>
            <view class="btn_view">
                <text @click="cancel">取消</text>
                <view class="btn" @click="sure">确认</view>
            </view>
        </view>
        <view v-if="ids === '4'" class="pop-XSYJ-js">
            <picker-view :indicator-style="indicatorStyle" :value="checkValue" @change="bindChange" style="height:400rpx;">
                <picker-view-column>
                    <view class="picker item" v-for="(item,index) in getData.cate_list" :key="index">{{item.cate_name}}</view>
                </picker-view-column>
            </picker-view>
            <view class="btn_view">
                <text @click="cancel">取消</text>
                <view class="btn" @click="sure">确认</view>
            </view>
        </view>
    </min-popup>

</view>
</template>

<script>
export default {
    props: {
        list: {
            type: Object,
            default: () => {}
        },
        titles: {
            type: Array,
            default: () => []
        },
        right: {
            type: Boolean,
            default: true
        },
        ids: {
            type: [String, Number],
            default: ''
        },
        showSet: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            focus: false,
            placeholder: '请输入姓名/手机号搜索',
            navBar: ['实时', '昨天', '本周', '上周', '本月', '上月', '今年'],
            current: 0,
            animation: false,
            show: false,
            indicatorStyle: `height: ${Math.round(
        uni.getSystemInfoSync().screenWidth / (750 / 100)
      )}rpx;`,
            checkValue: [],
            abc: [],
            num: 0,
            rol: '',
            a: false,
            keyword: '',
            listTest: {},
            flag: false
        }
    },
    watch: {
        getData(a) {
            if (this.ids === '1') {
                if (a.operating_info.length === 0) {
                    this.a = true
                } else {
                    this.a = false
                }
            } else if (this.ids === '0') {
                if (a.performance_list.length === 0) {
                    this.a = true
                } else {
                    this.a = false
                }
            } else if (this.ids === '2') {
                if (a.performance_list.length === 0) {
                    this.a = true
                } else {
                    this.a = false
                }
            } else if (this.ids === '3') {
                if (a.no_performance_list.length === 0) {
                    this.a = true
                } else {
                    this.a = false
                }
            } else if (this.ids === '4' && !this.flag) {
                if (a.product_list.length === 0) {
                    this.a = true
                } else {
                    this.a = false
                }
            } else if (this.ids === '5') {
                if (a.set_meal_list.length === 0 && !this.flag) {
                    this.a = true
                } else {
                    this.a = false
                }
            } else if (this.ids === '7') {
                if (a.role_performance_list.length === 0) {
                    this.a = true
                } else {
                    this.a = false
                }
            } else if (this.ids === '6') {
                if (a.sales_list.length === 0) {
                    this.a = true
                } else {
                    this.a = false
                }
            }

        },
        rol(a) {
            console.log(a)
            let data = {
                sales_list: [],
                product_list: []
            }
            this.listTest = this.list
            if (this.ids === '6') {
                this.listTest.sales_list.map(item => {
                    if (item.role_id === a.id) {
                        this.flag = true
                        data.sales_list.push(item)
                        data.role_list = this.listTest.role_list
                    }
                })
            }
            if (this.ids === '4') {
                this.listTest.product_list.map(item => {
                    if (item.cate_id === a.cate_id) {
                        this.flag = true

                        data.product_list.push(item)
                        data.cate_list = this.listTest.cate_list
                    }
                })
            }
            this.listTest = data

        }
    },
    methods: {
        // 修改文本位置
        focusValue(e) {
            this.focus = true
            this.placeholder = ''
            this.flag = false
        },
        chince(i) {
            this.current = i
            this.$emit('change', i)
        },
        toDetail(uid) {
            if (this.ids === '4' || this.ids === '5') return true
            uni.navigateTo({
                url: '/pages/statistics/person?id=' + this.ids + '&uid=' + uid + '&current=' + this.current
            })
        },
        changeSuo(ids, index) {
            console.log(ids, index)
            if (ids === '4' && index === 1) {
                this.show = true
                this.titles[index].animation = !this.titles[index].animation
            }
            if (ids === '4' && index === 2) {
                this.flag = true
                this.$minApi.getDPTj({
                    date_range: this.current,
                    condition: '',
                    order_field: 1
                }).then(res => {
                    console.log(res)
                    this.listTest = res
                })
            } else if (ids === '4' && index === 3) {
                this.flag = true
                this.$minApi.getDPTj({
                    date_range: this.current,
                    condition: '',
                    order_field: 2
                }).then(res => {
                    console.log(res)
                    this.listTest = res
                })
            }
            if (ids === '6' && index === 1) {
                this.show = true
                this.titles[index].animation = !this.titles[index].animation
            }
            if (ids === '5' && index === 1) {
                this.flag = true
                this.$minApi.getTCtj({
                    date_range: this.current,
                    condition: '',
                    order_field: 1
                }).then(res => {
                    console.log(res)
                    this.listTest = res
                })
            } else if (ids === '5' && index === 2) {
                this.flag = true
                this.$minApi.getTCtj({
                    date_range: this.current,
                    condition: '',
                    order_field: 2
                }).then(res => {
                    console.log(res)
                    this.listTest = res
                })
            }
        },
        close() {
            this.show = false
        },
        bindChange(e) {
            //  console.log(e.detail.value)
            this.num = e.detail.value[0]
        },
        sure() {
            // 销售业绩统计 角色
            if (this.ids === '6') {
                this.rol = this.getData.role_list[this.num]
            }
            if (this.ids === '4') {
                this.rol = this.getData.cate_list[this.num]
            }
            this.num = 0
            this.show = false
        },
        cancel() {
            this.close()
        }
    },
    computed: {
        getNowTime() {
            const t = this.$minCommon.formatDate(new Date(Date.now()), 'yyyy/MM/dd hh:mm:ss')
            return t
        },
        getStartTime() {
            let t = this.$minCommon.formatDate(new Date(this.list.statistics_time.start_time * 1000), 'yyyy/MM/dd')
            return t
        },
        getEndTime() {
            let t = this.$minCommon.formatDate(new Date(this.list.statistics_time.end_time * 1000), 'MM/dd')
            return t
        },
        getData() {
            this.flag = false
            let data = {
                performance_list: [],
                operating_info: [],
                no_performance_list: [],
                sales_list: [],
                role_performance_list: [],
                product_list: []
            }
            if (this.keyword) {
                if (this.ids === '0') {
                    this.list.performance_list.filter(item => {
                        if (item.user_name.includes(this.keyword) || item.mobile.includes(this.keyword)) {
                            data.performance_list.push(item)
                        }
                    })
                } else if (this.ids === '1') {
                    this.list.operating_info.filter(item => {
                        if (item.user_name.includes(this.keyword)) {
                            data.operating_info.push(item)
                        }
                    })
                } else if (this.ids === '2') {
                    this.list.performance_list.filter(item => {
                        if (item.role_name.includes(this.keyword)) {
                            data.performance_list.push(item)
                        }
                    })
                } else if (this.ids === '3') {
                    this.list.no_performance_list.filter(item => {
                        if (item.user_name.includes(this.keyword)) {
                            data.no_performance_list.push(item)
                        }
                    })
                } else if (this.ids === '6') {
                    this.list.sales_list.filter(item => {
                        if (item.user_name.includes(this.keyword)) {
                            data.sales_list.push(item)
                        }
                    })
                } else if (this.ids === '7') {
                    this.list.role_performance_list.filter(item => {
                        if (item.role_name.includes(this.keyword)) {
                            data.role_performance_list.push(item)
                        }
                    })
                } else if (this.ids === '4') {
                    this.list.product_list.filter(item => {
                        if (item.product_name.includes(this.keyword)) {
                            data.product_list.push(item)
                        }
                    })
                }
            } else {
                data = this.list
            }

            return data
        }
    },
}
</script>

<style lang="scss" scoped>
.min-data-show {
    .top_search {
        height: 88rpx;
        background: rgba(255, 255, 255, 1);
        border-radius: 10rpx;

        input {
            height: 88rpx;
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 88rpx;
            padding-left: 20rpx;
        }

        .center {
            text-align: center;
        }

        .left {
            text-align: left;
        }
    }

    .nav_item {
        background: #fff;
        width: 100%;
        display: flex;
        height: 88rpx;
        justify-content: space-between;
        align-items: center;

        .nav_item_name {
            font-size: 30rpx;
            height: 100%;
            line-height: 88rpx;
        }

        .nav_item_name_active {
            font-size: 30rpx;
            font-weight: bold;
            color: #333;
            height: 100%;
            line-height: 88rpx;
            position: relative;
        }

        .nav_item_name_active::after {
            content: "";
            height: 4rpx;
            width: 100%;
            background: #000000;
            position: absolute;
            left: 0;
            bottom: 0;
        }
    }

    .main_data {
        width: 100%;
        height: auto;
        background: #fff;
        padding-bottom: 20rpx;

        .time_desc {
            width: 100%;
            display: flex;
            justify-content: space-between;
            height: 50rpx;
            align-items: center;

            text {
                color: #333333;
            }
        }

        .main_table {
            width: 100%;
            height: auto;

            .title_list {
                width: 100%;
                height: 100rpx;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 30rpx;
                padding-left: 30rpx;

                .title_item {
                    display: flex;
                    align-items: center;

                    text {
                        font-size: 30rpx;
                        font-weight: 800;
                        color: #333;
                    }
                }
            }

            .test_ui {
                display: flex;
                height: 86rpx;
                align-items: center;

                .left {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    padding: 0 30rpx;

                    .left_ {
                        display: block;
                        width: 40%;
                        text-align: center;
                        line-height: 100%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .lefty_ {
                        display: block;
                        width: 20%;
                        text-align: center;
                        line-height: 100%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }

                .right {
                    width: 25rpx;
                    height: 25rpx;
                    line-height: 25rpx;
                }

            }

        }
    }
}

.arro {
    width: 18rpx;
    height: 13rpx;
    margin-left: 5rpx
}

.arrw {
    transform: rotate(-180deg);
}

.right-arrow-a {
    transform: rotate(180deg);
}

.animation {
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: ease;
}

// 销售业绩 角色
.pop-XSYJ-js {
    width: 100%;
    height: 100%;

    .btn_view {
        width: 100%;
        height: 100rpx;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        bottom: 50rpx;
        left: 0;

        text {
            font-size: 36rpx;
            color: rgba(190, 190, 190, 1);
        }

        .btn {
            width: 394rpx;
            height: 100rpx;
            background: rgba(255, 224, 1, 1);
            border-radius: 16rpx 16rpx 16rpx 16rpx;
            line-height: 100rpx;
            text-align: center;
            color: #333;
            font-size: 36rpx;
        }
    }
}

.picker {
    text-align: center;
    line-height: 50rpx;
    width: auto;
}

.no_data {
    width: 100%;
    height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
