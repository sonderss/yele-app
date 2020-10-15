<template>
<view class="detail" :class="type !== 1 ? ' p-lr-10':''">
    <view class="p-lr-20 p-tb-20" v-if="type === 2">
        <view class="item_viwe m-tb-20" v-for="(item,index) in list" :key="index" @click="toAbout(type,index)">
            <view class="left">
                <view class="title">{{item.name}}</view>
                <view class="desc m-top-20" v-if="item.type === 1">最TOP营销 ：{{item.outstanding_list.title}} 业绩：{{item.outstanding_list.behavior}}元</view>
                <view class="desc m-top-20" v-if="item.type === 2">开台冠军 ：{{item.outstanding_list.title}} 业绩：{{item.outstanding_list.behavior}}张</view>
                <view class="desc m-top-20" v-if="item.type === 3">最TOP团队 ：{{item.outstanding_list.title}} 业绩：{{item.outstanding_list.behavior}}元</view>
                <view class="desc m-top-20" v-if="item.type === 4">营销Loser：{{item.outstanding_list.title}} 无业绩天数：{{item.outstanding_list.behavior}}天</view>
            </view>
            <view class="right">
                <image src="/static/images/arrow.png" />
            </view>
        </view>
    </view>

    <view class="p-lr-20 p-tb-20" v-if="type === 3">
        <view class="item_viwe m-tb-20" v-for="(item,index) in list" :key="index" @click="toAbout(type,index)">
            <view class="left">
                <view class="title">{{item.name}}</view>
                <view class="desc m-top-20" v-if="item.type === 1">最TOP营销：{{item.outstanding_list.title}}&nbsp; 业绩：{{item.outstanding_list.behavior}}元</view>
                <view class="desc m-top-20" v-if="item.type === 3">最TOP团队：{{item.outstanding_list.title}} &nbsp; 业绩：{{item.outstanding_list.behavior}}元</view>
            </view>
            <view class="right">
                <image src="/static/images/arrow.png" />
            </view>
        </view>
    </view>

    <view class="p-lr-20 p-tb-20" v-if="type === 4">
        <view class="item_viwe m-tb-20" v-for="(item,index) in list" :key="index" @click="toAbout(type,index)">
            <view class="left">
                <view class="title">{{item.name}}</view>
                <view class="desc m-top-20" v-if="item.type === 1">畅销冠军单品：{{item.outstanding_list.title}} 销量：{{item.outstanding_list.behavior}}</view>
                <view class="desc m-top-20" v-if="item.type === 2">畅销冠军套餐：{{item.outstanding_list.title}} 销量：{{item.outstanding_list.behavior}}</view>
            </view>
            <view class="right">
                <image src="/static/images/arrow.png" />
            </view>
        </view>
    </view>

    <view class="p-lr-20 p-tb-20" v-if="type === 0">
        <view class="nav">
            <view class="nav_item min-border-bottom">
                <view :class="current === index ? 'nav_item_name_active' :'nav_item_name' " @click="chince(index)" v-for="(i,index) in navBar" :key="i">{{i}}</view>
            </view>
            <view class="main_data1">
                <text class="time" v-if="current === 0">更新时间：{{getNowTime}}</text>
                <text class="time" v-else>更新时间：{{getStartTime}} - {{getEndTime}}</text>

                <view class="main_data_item">
                    <view class="item_box one">
                        <text class="name">营业额</text>
                        <text class="desc">{{yingye.business_total}}</text>
                    </view>
                    <view class="item_box">
                        <text class="name">实收合计</text>
                        <text class="desc">{{yingye.actual_total}}</text>
                    </view>
                    <view class="item_box one">
                        <text class="name">待收合计</text>
                        <text class="desc">{{yingye.unpay_total}}</text>
                    </view>
                    <view class="item_box">
                        <text class="name">退款合计</text>
                        <text class="desc">{{yingye.refund_total}}</text>
                    </view>
                </view>
            </view>
            <view class="btm_view">
                <view class="item_box">
                    <text class="name">抹零合计</text>
                    <text class="desc m-top-20">￥{{yingye.wipe_zero_total}}</text>
                </view>
                <view class="item_box">
                    <text class="name">活动优惠</text>
                    <text class="desc m-top-20">￥{{yingye.activity_discount}}</text>
                </view>
                <view class="item_box">
                    <text class="name">赠送合计</text>
                    <text class="desc m-top-20">￥{{yingye.give_away_total}}</text>
                </view>
                <view class="item_box">
                    <text class="name">签折优惠</text>
                    <text class="desc m-top-20">￥{{yingye.signoff_discount}}</text>
                </view>
            </view>
        </view>
        <view class="method_desc">支付方式</view>
        <canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
    </view>

    <view v-if="type === 1">
        <view class="top_view">
            <view class="main_">
                <view class="left">
                    <view class="image_" :style="{backgroundImage: `url(/static/images/back_data1.png)`}">
                        <text class="m-top-20" style="color:#fff;font-size:58rpx;font-weight:blod">{{zhuotai.desk_info.idle_desk}}</text>
                        <text class="f22" style="color:#fff;">空闲中</text>
                    </view>
                </view>
                <view class="mid">
                    <view class="image_" :style="{backgroundImage: `url(/static/images/back_data.png)`}">
                        <text class="m-top-20" style="color:#fff;font-size:58rpx;font-weight:blod">{{zhuotai.desk_info.opened_desk}}</text>
                        <text class="f22" style="color:#fff;">开台中</text>
                    </view>
                </view>
                <view class="right">
                    <view class="image_" :style="{backgroundImage: `url(/static/images/back_data1.png)`}">
                        <text class="m-top-20" style="color:#fff;font-size:58rpx;font-weight:blod">{{zhuotai.desk_info.lock_desk}}</text>
                        <text class="f22" style="color:#fff;">已停用</text>
                    </view>
                </view>
            </view>
            <view class="f20 m-tb-20" style="color:#999999">更新时间：{{getNowTime}}</view>
        </view>

        <view class="m-lr-20 m-tb-20" style="background:#FFF;height:auto;border-radius:20rpx">
            <view class="main_data">
                <view class="nav_item p-lr-20 min-border-bottom" style="height:auto;border-radius:10rpx">
                    <view :class="current === index ? 'nav_item_name_active' :'nav_item_name' " @click="chince(index)" v-for="(i,index) in navBar" :key="i">{{i}}</view>
                </view>
                <view class="time f20 m-tb-20 p-left-20" v-if="current === 0">更新时间：{{getNowTime}}</view>
                <text class="time m-tb-20 p-left-20" v-else>更新时间：{{getStartTime}} - {{getEndTime}}</text>
                <view class="main_data_item min-border-bottom">
                    <view class="item_box_" style="width:30%">
                        <text class="name">订台数</text>
                        <text class="desc">{{zhuotai.desk_statistics.booking_count}}</text>
                    </view>
                    <view class="item_box_ one" style="width:30%">
                        <text class="name">订台开台数</text>
                        <text class="desc">{{zhuotai.desk_statistics.booking_opened_count}}</text>
                    </view>
                    <view class="item_box_" style="width:30%">
                        <text class="name">取消订台数</text>
                        <text class="desc">{{zhuotai.desk_statistics.cancel_booking_count}}</text>
                    </view>
                </view>
                <view class="main_data_item min-border-bottom">
                    <view class="item_box_" style="width:30%">
                        <text class="name">超时订台数</text>
                        <text class="desc">{{zhuotai.desk_statistics.overdue_booking_count}}</text>
                    </view>
                    <view class="item_box_ one" style="width:30%">
                        <text class="name">总开台次数</text>
                        <text class="desc">{{zhuotai.desk_statistics.opening_total_count}}</text>
                    </view>
                    <view class="item_box_" style="width:30%">
                        <text class="name">台均消费</text>
                        <text class="desc">{{zhuotai.desk_statistics.average_consumption}}</text>
                    </view>
                </view>
                <view class="main_data_item" style="border-radius:10rpx">
                    <view class="item_box_ one" style="width:30%">
                        <text class="name">平均开台时长</text>
                        <text class="desc">{{zhuotai.desk_statistics.average_duration}}小时</text>
                    </view>
                    <view class="item_box_" style="width:30%">
                        <text class="name">翻台率</text>
                        <text class="desc">{{zhuotai.desk_statistics.average_opening}}%</text>
                    </view>
                    <view class="item_box_ one" style="width:30%;">
                        <text class="name"></text>
                        <text class="desc"></text>
                    </view>
                </view>
            </view>
        </view>

        <view class="taiwei m-lr-20 m-top-30" v-if=" zhuotai.consumption_rank.length !== 0">
            <view class="top_view">
                <view class="mid_view min-border-bottom">桌台消费排行榜</view>
                <view class="top_title m-top-20 p-lr-30">
                    <text>台号</text>
                    <text style="padding-left:40rpx">营销</text>
                    <text style="padding-right:60rpx">消费额</text>
                </view>
                <view class="bom_view m-top-30" v-for="(item,index) in zhuotai.consumption_rank" :key="index" @click="toDeatiBill(item.opening_id,item.desk_id)">
                    <view class="item p-right-20" style="width:150rpx">{{item.desk_name ? item.desk_name : '暂无数据'}}</view>
                    <view class="item p-left-10">{{item.sales_user_name ? item.sales_user_name : '暂无数据'}}</view>
                    <view class="item min-flex  min-flex-main-center">
                        <view style="text-align:center;flex:1">￥{{item.receivable_price}}</view>
                        <image class="item p-left-10" src="/static/images/arrow.png" style="width:24rpx;height:24rpx" />
                    </view>

                </view>
            </view>
        </view>
    </view>
</view>
</template>

<script>
import uCharts from "../../components/ucharts/u-charts.min.js";
var _self;
var canvaPie = null;

export default {
    data() {
        return {
            list: [],
            cWidth: "",
            cHeight: "",
            pixelRatio: 1,
            navBar: ["实时", "昨天", "本周", "上周", "本月", "上月", "今年"],
            type: 0,
            current: 0,
            // 数据总览
            chartData: {
                series: [{
                        name: "支付宝",
                        data: 50,
                        color: "#3288FD"
                    },
                    {
                        name: "微信",
                        data: 30,
                        color: "#8280FF"
                    },
                    {
                        name: "刷卡",
                        data: 20,
                        color: "#FFD43B"
                    },
                    {
                        name: "现金",
                        data: 18,
                        color: "#FF0000"
                    }
                ],
                actual_total: 0
            },
            yingye: {},
            isYYFlag: true,
            zhuotai: {
                desk_info: {
                    idle_desk: ""
                },
                desk_statistics: {
                    booking_count: 0
                },
                consumption_rank: []
            },
            yingxiao: []
        };
    },
    computed: {
        getNowTime() {
            const t = this.$minCommon.formatDate(
                new Date(Date.now()),
                "yyyy/MM/dd hh:mm:ss"
            );
            return t;
        },
        getStartTime() {
            let t = "";
            if (this.type === 0) {
                t = this.$minCommon.formatDate(
                    new Date(this.yingye.statistics_time.start_time * 1000),
                    "yyyy/MM/dd"
                );
            } else if (this.type === 1) {
                t = this.$minCommon.formatDate(
                    new Date(this.zhuotai.statistics_time.start_time * 1000),
                    "yyyy/MM/dd"
                );
            } else {
                t = "暂无";
            }
            return t;
        },
        getEndTime() {
            let t = "";
            if (this.type === 0) {
                t = this.$minCommon.formatDate(
                    new Date(this.yingye.statistics_time.end_time * 1000),
                    "yyyy/MM/dd"
                );
            } else if (this.type === 1) {
                t = this.$minCommon.formatDate(
                    new Date(this.zhuotai.statistics_time.end_time * 1000),
                    "yyyy/MM/dd"
                );
            } else {
                t = "暂无";
            }
            return t;
        }
    },
    methods: {
        chince(i) {
            this.current = i;
            if (this.type === 0) {
                this.getYingYe(i);
            } else if (this.type === 1) {
                this.getZhuoTai(i);
            }
        },
        touchPie(e) {
            if (this.isYYFlag) return this.$showToast("暂无数据");
            const xx = canvaPie.getCurrentDataIndex(e);
            var text = "";
            var value = "";
            var color = "";
            switch (xx) {
                case 0:
                    text = "支付宝";
                    value = this.yingye.pay_method.ali_pay;
                    color = "#3288FD";
                    break;
                case 1:
                    text = "微信";
                    value = this.yingye.pay_method.wx_pay;
                    color = "#8280FF";
                    break;
                case 2:
                    text = "刷卡";
                    value = this.yingye.pay_method.swipe_pay;
                    color = "#FFD43B";
                    break;
                case 3:
                    text = "现金";
                    value = this.yingye.pay_method.cash_pay;
                    color = "#FF0000";
                    break;
                default:
                    text = "";
                    value = "";
            }
            // 自定义点击展示数据
            const textList = [{
                    text: text,
                    color: color
                },
                {
                    text: `实收金额: ${value}（元）`,
                    color: null
                },
                {
                    text: `金额占比: ${(value / this.yingye.actual_total).toFixed(2) *
            100}%`,
                    color: null
                }
            ];
            canvaPie.showToolTip(e, {
                textList
            });
        },
        // 环形
        showPie(canvasId, chartData, showLend, ringWidth) {
            // eslint-disable-next-line new-cap
            canvaPie = new uCharts({
                $this: _self,
                canvasId: canvasId,
                type: "ring",
                fontSize: 11,
                legend: {
                    show: showLend,
                    position: "right",
                    padding: 5,
                    margin: 20,
                    lineHeight: 20,
                    orient: "vertical",
                    itemGap: 5
                },
                title: {
                    name: (chartData.actual * 1).toFixed(2), // 标题
                    color: "#000"
                },
                subtitle: {
                    name: "实收金额(元)", // 副标题
                    color: "#999999",
                    fontSize: 10
                },
                dataPointShape: true, // dataLabel
                extra: {
                    candle: {
                        color: {
                            upLine: "#f04864",
                            upFill: "#f04864",
                            downLine: "#2fc25b",
                            downFill: "#2fc25b"
                        },
                        average: {
                            show: true,
                            name: ["MA5", "MA10", "MA30"],
                            day: [5, 10, 30],
                            color: ["#1890ff", "#2fc25b", "#facc14"]
                        }
                    },
                    pie: {
                        offsetAngle: -45,
                        ringWidth: ringWidth
                    },
                    tooltip: {
                        bgColor: "#000000",
                        bgOpacity: 0.7,
                        gridType: "dash",
                        dashLength: 5,
                        gridColor: "#1890ff",
                        fontColor: "#FFFFFF",
                        horizentalLine: true,
                        xAxisLabel: true,
                        yAxisLabel: true,
                        labelBgColor: "#DFE8FF",
                        labelBgOpacity: 0.95,
                        labelAlign: "left",
                        labelFontColor: "#666666"
                    }
                    // tooltip: {
                    //   bgColor: '#000000', // 主体背景颜色
                    //   gridType: 'dash', // 辅助线类型（虚线）
                    //   dashLength: 5, // 虚线单段长度
                    //   gridColor: '#1890ff', // 辅助线颜色
                    //   horizentalLine: true, // 是否显示横向辅助线
                    //   xAxisLabel: true, // 是否显示X轴辅助标签
                    //   yAxisLabel: true, // 是否显示Y轴辅助标签
                    //   labelBgColor: '#DFE8FF', // 标签背景颜色
                    //   labelBgOpacity: 0.95, // 背景颜色透明度
                    //   labelFontColor: '#666666', // 标签文字颜色
                    //   showBox: true, // 是否显示半透明黑色的提示区域
                    //   bgOpacity: 0.7, // 背景颜色透明度
                    //   fontColor: '#FFFFFF' // 主体文字颜色
                    // }
                },
                background: "#FFFFFF",
                pixelRatio: _self.pixelRatio,
                categories: chartData.categories,
                series: chartData.series,
                animation: true,
                width: _self.cWidth * _self.pixelRatio,
                height: _self.cHeight * _self.pixelRatio,
                disablePieStroke: true,
                dataLabel: false
            });
            // canvaPie.stopAnimation()
            // canvaPie.addEventListener('renderComplete', () => {
            //   console.log('渲染完成')
            // })
        },
        toAbout(type, index) {
            if (type === 2 && index === 0) {
                uni.navigateTo({
                    url: "./about?id=" + 0
                });
            } else if (type === 2 && index === 1) {
                uni.navigateTo({
                    url: "./about?id=" + 1
                });
            } else if (type === 2 && index === 2) {
                uni.navigateTo({
                    url: "./about?id=" + 2
                });
            } else if (type === 2 && index === 3) {
                uni.navigateTo({
                    url: "./about?id=" + 3
                });
            } else if (type === 3 && index === 0) {
                uni.navigateTo({
                    url: "./about?id=" + 6
                });
            } else if (type === 3 && index === 1) {
                uni.navigateTo({
                    url: "./about?id=" + 7
                });
            } else if (type === 4 && index === 0) {
                uni.navigateTo({
                    url: "./about?id=" + 4
                });
            } else if (type === 4 && index === 1) {
                uni.navigateTo({
                    url: "./about?id=" + 5
                });
            }
        },
        // 营业统计获取数据
        getYingYe(n) {
            this.$minApi.getBusinessStatistics({
                date_range: n
            }).then(res => {
                this.yingye = res;
                this.chartData.series.map((item, index) => {
                    switch (index) {
                        case 0:
                            item.data = this.yingye.pay_method.ali_pay * 1;
                            break;
                        case 1:
                            item.data = this.yingye.pay_method.wx_pay * 1;
                            break;
                        case 2:
                            item.data = this.yingye.pay_method.swipe_pay * 1;
                            break;
                        case 3:
                            item.data = this.yingye.pay_method.cash_pay * 1;
                            break;
                        default:
                            item.data = 0;
                    }
                });
                const Pie = {
                    series: [],
                    actual: 123
                };
                Pie.series = this.chartData.series;
                Pie.actual = this.yingye.actual_total ?
                    this.yingye.actual_total :
                    "暂无";
                this.isYYFlag = !this.yingye.actual_total;
                console.log(this.yingye);
                this.showPie("canvasPie", Pie, true, 25);
            });
        },
        // 桌台数据
        getZhuoTai(n) {
            this.$minApi.getTablestatistics({
                date_range: n
            }).then(res => {
                console.log(res);
                this.zhuotai = res;
            });
        },
        // 营销数据
        getYingXiao() {
            this.$minApi.getYxData().then(res => {
                console.log(res);
                this.list = res;
            });
        },
        // 销售数据
        getXiShowData() {
            this.$minApi.getXiShow().then(res => {
                console.log(res);
                this.list = res;
            });
        },
        // 商品统计
        getSPTj() {
            this.$minApi.getProductTJ().then(res => {
                console.log(res);
                this.list = res;
            });
        },
        //桌台账单详情
        toDeatiBill(openId, desk_id) {
            this.$minRouter.push({
                name: "desk-bill",
                params: {
                    open_id: openId,
                    desk_id
                }
            });
        }
    },
    mounted() {
        _self = this;
        // 营业统计
        if (this.type === 0) {
            this.cWidth = uni.upx2px(700);
            this.cHeight = uni.upx2px(450);
            this.$nextTick(() => {
                // 初始化图表
                this.getYingYe(0);
            });
        } else if (this.type === 1) {
            // this.getZhuoTai(0)
        }
    },
    onLoad(option) {
        this.type = option.type * 1;
        switch (option.type) {
            case "0":
                uni.setNavigationBarTitle({
                    title: "营业统计"
                });

                break;
            case "1":
                uni.setNavigationBarTitle({
                    title: "桌台统计"
                });
                this.getZhuoTai(0);
                break;
            case "2":
                // this.list = yingxiao
                uni.setNavigationBarTitle({
                    title: "营销统计"
                });
                this.getYingXiao();
                break;
            case "3":
                uni.setNavigationBarTitle({
                    title: "销售统计"
                });
                this.getXiShowData();
                break;
            case "4":
                uni.setNavigationBarTitle({
                    title: "商品统计"
                });
                this.getSPTj();
                break;
            default:
                this.list = [];
        }
    }
};
</script>

<style lang="scss" scoped>
.item_viwe {
    width: 100%;
    height: 200rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30rpx;

    .left {
        .title {
            color: #333333;
            font-weight: 500;
            font-size: 36rpx;
        }

        .desc {
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #666666;
        }
    }

    .right {
        width: 24rpx;
        height: 24rpx;

        image {
            width: 100%;
            height: 100%;
        }
    }
}

.nav {
    width: 100%;
    height: auto;
    background: rgba(255, 255, 255, 1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0 20rpx;
    border-radius: 10rpx;

    .nav_item {
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

    .main_data1 {
        width: 100%;
        height: 370rpx;

        .time {
            color: #666;
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            width: 100%;
            background: #fff;
            display: block;
            display: block;
        }

        .main_data_item {
            height: 160rpx;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            background: #fff;

            .item_box {
                width: 50%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 1rpx solid #e7e7e7;
                flex-direction: column;
                position: relative;

                .name {
                    font-size: 26rpx;
                    color: #666666;
                }

                .desc {
                    font-size: 30rpx;
                    font-weight: bold;
                    color: #333;
                }
            }

            .item_box_ {
                width: 30%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                position: relative;

                .name {
                    font-size: 22rpx;
                    color: #666666;
                }

                .desc {
                    font-size: 30rpx;
                    font-weight: bold;
                    color: #333;
                }
            }

            .one::after {
                content: "";
                position: absolute;
                right: 0;
                top: 25%;
                height: 100%;
                transform: scale(0.5);
                transform-origin: 0 0;
                pointer-events: none;
                box-sizing: border-box;
                border: 1rpx solid #e7e7e7;
            }
        }
    }

    .btm_view {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 30rpx;

        .item_box {
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            .name {
                font-size: 26rpx;
                color: #666666;
            }

            .desc {
                font-size: 24rpx;
                font-weight: bold;
                color: #333;
            }
        }
    }
}

.method_desc {
    width: 100%;
    background: #fff;
    margin-top: 20rpx;
    padding: 20rpx;
    border-radius: 10rpx;
}

.charts {
    width: 100%;
    height: 500rpx;
    background-color: #ffffff;
}

.top_view {
    width: 100%;
    height: 480rpx;
    background: rgba(3, 3, 19, 1);
    padding: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;

    .main_ {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    padding: 0 30rpx;

    .left {
        width: 208rpx;
        height: 233rpx;
        display: flex;
        align-items: flex-end;
    }

    .mid {
        width: 230rpx;
        height: 270rpx;
        align-items: center;
    }

    .right {
        width: 208rpx;
        height: 233rpx;
        display: flex;
        align-items: flex-end;
    }

    .image_ {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
}

.main_data {
    width: 100%;

    .time {
        color: #666;
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        width: 100%;
        background: #fff;
        display: block;
    }

    .main_data_item {
        height: 160rpx;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        background: #fff;

        .item_box {
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1rpx solid #e7e7e7;
            flex-direction: column;
            position: relative;

            .name {
                font-size: 26rpx;
                color: #666666;
            }

            .desc {
                font-size: 30rpx;
                font-weight: bold;
                color: #333;
            }
        }

        .item_box_ {
            width: 33%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: relative;

            .name {
                font-size: 22rpx;
                color: #666666;
            }

            .desc {
                font-size: 30rpx;
                font-weight: bold;
                color: #333;
            }
        }

        .one::after {
            content: "";
            position: absolute;
            right: -20rpx;
            top: 25%;
            height: 100%;
            transform: scale(0.5);
            transform-origin: 0 0;
            pointer-events: none;
            box-sizing: border-box;
            border: 1rpx solid #e7e7e7;
        }

        .one::before {
            content: "";
            position: absolute;
            left: -20rpx;
            top: 25%;
            height: 100%;
            transform: scale(0.5);
            transform-origin: 0 0;
            pointer-events: none;
            box-sizing: border-box;
            border: 1rpx solid #e7e7e7;
        }
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

// 台位统计
.taiwei {
    margin-bottom: 50rpx;

    .top_view {
        width: 100%;
        height: auto;
        background: #fff;
        border-radius: 10rpx;
        padding: 20rpx;

        .top {
            text {
                color: #666666;
            }
        }

        .mid_view {
            width: 100%;
            padding-bottom: 27rpx;
            // padding-top: 27rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
                width: calc(100% / 3);
                text-align: center;
            }
        }

        .bom_view {
            width: 100%;
            height: auto;
            display: flex;
            justify-content: space-between;

            .item {
                width: calc(100% / 3);
                text-align: center;

            }
        }
    }

    .top_title {
        display: flex;
        width: 100%;
        justify-content: space-between;

        text {
            font-weight: bolder;
        }
    }
}
</style>
