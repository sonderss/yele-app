<template>
<view :class=" 'min-describe  ' + isPadding" @click="chinceSku">
    <view class="left-view">
        <view :class="isCirl ?  'img-view-over' : 'img-view'" v-if="leftIcon">
            <image :src="leftIconValue ? leftIconValue : errImage " />
        </view>
        <view :class=" leftTxtTwo ? 'txt-view': ''">
            <view class="left-txt" style="color:#333;">{{leftTxt}}</view>
            <view class="left-txt f28" :style="{color:'#666'}" v-if="leftTxtTwo">{{leftTxtB}}</view>
        </view>
    </view>
    <view class="right-view" :style="sku2 ? 'justify-content: flex-end;':''">
        <view v-if="step">
            <min-stepper v-model="count" :isShowNone="isShowNone" :isAnimation="Animation" :max="maxStep" @change="emitEvent" icon="/static/images/yellow-add.png"></min-stepper>
            <!-- <image src='/static/images/yellow-add.png' v-if="isShowNone" @click.stop="tests" class="testaaa" /> -->
        </view>

        <text v-if="num">x {{num}}</text>
        <view v-if="sku" class="right-icon f30">
            <text class="t">{{sku}}</text>
            <image src="/static/images/right-black.png" />
        </view>
        <view v-if="sku2" class="right-icon2 f30">
            <text class="t" style="">{{sku2}}</text>
            <image src="/static/images/right-black.png" />
        </view>
        <view class="txt-view1" v-if="leftTxtTwo">
            <view class="left-txt" style="color:#333">{{rightTxtT}}</view>
            <view class="left-txt" :style="{color:'#666',fontSize:rightTxtBSize} ">{{rightTxtB}}</view>
        </view>
    </view>
</view>
</template>

<script>
export default {
    props: {
        leftIcon: {
            type: Boolean,
            default: false,
        },
        leftIconValue: {
            type: String,
            default: '/static/images/goods.png',
        },
        leftTxt: {
            type: String,
            default: '暂无商品名',
        },
        step: {
            type: Boolean,
            default: false,
        },
        num: {
            type: String,
            default: '',
        },
        sku: {
            type: String,
            default: '',
        },
        leftTxtTwo: {
            type: Boolean,
            default: false,
        },
        rightTxtT: {
            type: [String, Number],
            default: '',
        },
        rightTxtB: {
            type: [String, Number],
            default: '',
        },
        rightTxtBSize: {
            type: String,
            default: '28rpx'
        },
        leftTxtB: {
            type: [String, Number],
            default: '',
        },
        maxStep: {
            type: [String, Number],
            default: 999,
        },
        value: {
            type: [String, Number],
            default: 0,
        },
        Animation: {
            type: Boolean,
            default: false,
        },
        isPadding: {
            type: String,
            default: 'p-lr-20'
        },
        isCirl: {
            type: Boolean,
            default: false
        },
        sku2: {
            type: String,
            default: ''
        },
        errImage: {
            type: String,
            default: '/static/images/goods.png'
        },
        isShowNone: {
            type: Boolean,
            defalut: false
        }
    },
    data() {
        return {
            count: 0,
            images: '',
        }
    },
    created() {
        this.count = this.value
    },
    watch: {
        value(a) {
            this.count = a
        }
    },
    methods: {
        chinceSku() {
            this.$emit('chincesku')
        },
        emitEvent(n) {
            this.$emit('changeCount', n)
        },
        tests() {
            this.$emit('testEvent')
        }
    },
}
</script>

<style lang="scss" scoped>
.min-describe {
    width: 100%;
    height: 100rpx;
    display: flex;
    background: #fff;
    justify-content: space-between;
    margin: 20rpx 0;

    .left-view {
        display: flex;
        align-items: center;

        .txt-view {
            text-align: left;
            display: flex;
            flex-direction: column;
            height: 80rpx;
            justify-content: space-between;

            .left-txt {
                color: #333;
            }
        }

        .img-view {
            width: 100rpx;
            height: 100rpx;
            margin-right: 20rpx;
            border-radius: 50%;

            image {
                width: 100%;
                height: 100%;
            }
        }

        .img-view-over {
            width: 100rpx;
            height: 100rpx;
            margin-right: 20rpx;
            border-radius: 50%;
            overflow: hidden;

            image {
                width: 100%;
                height: 100%;
            }
        }
    }

    .right-view {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666666;
        position: relative;

        .testaaa {
            position: absolute;
            right: 0rpx;
            top: 16rpx;
            padding: 10rpx;
            width: 48rpx;
            height: 48rpx;
            // background: url('/static/images/add.png') no-repeat;
            // background-position: center center;
            // background: url('/static/images/yellow-add.png') no-repeat;
            // // background-position: center center;
            // background-size: 48rpx 48rpx;
        }

        .txt-view1 {
            display: flex;
            flex-direction: column;
            height: 85rpx;
            justify-content: space-between;
            text-align: right;

            .left-txt {
                color: red;
            }
        }

        .right-icon {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .t {
                width: 540rpx;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                display: block;
            }

            image {
                width: 20rpx;
                height: 22rpx;
                margin-left: 18rpx;
                color: #666666;
            }
        }

        .right-icon2 {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .t {
                width: 350rpx;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                display: block;
                text-align: right;
            }

            image {
                width: 20rpx;
                height: 22rpx;
                margin-left: 18rpx;
                color: #666666;
            }
        }
    }
}
</style>
