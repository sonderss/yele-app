<template>
<view class="min-goods-chioce">
    <view class="item">
        <view class="goods">
            <!-- @click="goodsAdd(index,index2)" -->
            <view class="image-view-com">
                <view class="badge" v-if="badge">{{badgeTxt}}</view>
                <!-- imageSrc === 'error' ? '/static/images/goods.png' :  -->
                <image mode="aspectFit" lazy-load :src="imageSrc === 'error' ? '/static/images/goods.png' : image" @error="imgerr" />
            </view>
            <view class="content-view">
                <view class="right-view-title">
                    <view class="f28 t">

                        <view class='aaaa f26'> <text v-if="discount" :class="discountdesc.length < 4 ?   'discount_  min-ellipsis f26' :' discount min-ellipsis f26'">{{discountdesc}}</text>{{title}}</view>
                    </view>
                    <text class="f26 abc m-top-10" v-if="isSku" style="color:#666666">{{desc}}</text>
                </view>
                <view class="right-view-bottom" @click.stop="ads">
                    <view class="right-view-bottom-desc">
                        <text v-if="price != 'null'" class="f20 t">
                            ￥
                            <text style="color:#FF0000;font-size:30">{{price}}</text>
                        </text>
                    </view>
                    <view class="steper">
                        <min-stepper :isAnimation="count > 0 ? false : true " :isFlag="isFlag" v-if="isFlag" v-model="count" @change="changeChioce"></min-stepper>
                        <view v-else class="m-right-10" style="width:48rpx;height:48rpx;" @click.stop="changeChioceT">
                            <image lazy-load src="/static/images/yellow-add.png" style="width:100%" />
                        </view>
                        <!-- <view class="isSku f24" v-if="step" @click="selSku(index,index2)">选规格</view> -->
                    </view>
                </view>
            </view>
        </view>
    </view>
</view>
</template>

<script>
export default {
    props: {
        step: {
            type: Boolean,
            default: true,
        },
        image: {
            type: String,
            default: '/static/images/produced.png',
        },
        title: {
            type: String,
            default: '暂无商品标题',
        },
        desc: {
            type: String,
            default: '暂无商品描述',
        },
        price: {
            type: [Number, String],
            default: 0,
        },
        value: {
            type: [Number, String],
            default: 0,
        },
        isSku: {
            type: Boolean,
            default: true,
        },
        badge: {
            type: Boolean,
            default: false,
        },
        badgeTxt: {
            type: String,
            default: '',
        },
        discount: {
            type: [Boolean, Number],
            default: false,
        },
        showBtn: {
            type: Boolean,
            default: false,
        },
        isFlag: {
            type: Boolean,
            default: false,
        },
        discountdesc: {
            type: String,
            default: "限时优惠"
        }
    },
    created() {
        this.count = this.value
    },
    watch: {
        value(a) {
            this.count = a
        },
    },
    data() {
        return {
            count: 0,
            imageSrc: String,
            s: true,
            flag: false,
            showBtns: false,
        }
    },
    computed: {},
    methods: {
        changeChioce(e) {
            this.count = e
            console.log(e)
            this.$emit('input', e)
            this.$emit('changes', e)
        },
        imgerr(e) {
            this.imageSrc = e.type
        },
        changeChioceT() {
            this.$emit('changesPop')
        },
        ads() {
            return true
        },
    },
}
</script>

<style lang="scss" scoped>
.min-goods-chioce {

    // .item{
    //   width: 100%;
    //   margin-bottom: 20rpx;
    //   background: red;
    // }
    .goods {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        align-content: center;
        margin-bottom: 20rpx;
        background: #fff;
        width: 100%;
        height: 210rpx;
        padding: 20rpx;
        position: relative;

        .image-view-com {
            width: 160rpx;
            height: 160rpx;
            margin-right: 16rpx;

            .badge {
                width: 80rpx;
                height: 40rpx;
                background: rgba(3, 3, 19, 1);
                border-radius: 0rpx 20rpx 20rpx 0rpx;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(255, 224, 1, 1);
                text-align: center;
                line-height: 40rpx;
            }

            &>image {
                width: 100%;
                height: 100%;
                display: block;
            }
        }

        .content-view {
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: space-between;
            color: #333333;

            .right-view-title {
                width: 300rpx;

                .abc {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: block;
                }

                .aaaa {
                    font-size: 28rpx;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    word-wrap: break-word;
                    word-break: break-all;
                    font-weight: 700;
                }

                .t {
                    font-weight: bold;
                    // white-space: nowrap;
                    // overflow: hidden;
                    // text-overflow: ellipsis;
                    display: flex;
                    align-items: center;

                    .discount {
                        width: 120rpx;
                        height: 100%;
                        font-size: 22rpx;
                        font-family: PingFang SC;
                        font-weight: bold;
                        color: #fff;
                        background: #f80409;
                        padding: 5rpx;
                        margin-right: 10rpx;
                        // display: block;
                        line-height: 26rpx;
                    }

                    .discount_ {
                        width: auto;
                        height: 100%;
                        font-size: 22rpx;
                        font-family: PingFang SC;
                        font-weight: bold;
                        color: #fff;
                        background: #f80409;
                        padding: 5rpx;
                        margin-right: 10rpx;
                        // display: block;
                        line-height: 26rpx;
                    }
                }
            }

            .right-view-bottom {
                height: 48rpx;
                display: flex;
                // position: relative;
                justify-content: space-between;

                .right-view-bottom-desc {
                    display: flex;

                    // width: 200rpx;
                    .t {
                        font-weight: bold;
                        color: #f80409;
                    }
                }

                .steper {
                    // position: absolute;
                    // right:0;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }
            }
        }
    }
}
</style>
