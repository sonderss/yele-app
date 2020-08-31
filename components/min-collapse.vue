<template>
<view class="min-collapse">
    <view class="card">
        <view class @click="test">
            <min-desc-input :desc="desc" :value="value" :sign="sign" :border="border" :isRightRrrow="true" :animation="isShow" :placeholder="placeholder" :disabled="disabled"></min-desc-input>
            <!-- <image class="right-arrow p-left-10"  :src="isShow ? '../../static/images/downarrow24.png' : '../../static/images/arrow.png'" /> -->
            <!-- <image class="right-arrow p-left-10"  :class="isShow ? 'animation' : 'right-arrow-a animation' "  src="../../static/images/arrow.png" /> -->
            <!-- transition: top === 0 ? 'transform 300ms' : '',
                                                        transform: 'translateY(' + top + 'rpx' + ')'  `${list.length%5 == 0 ? list.length / 5 : Math.floor(list.length/5) + 1}00`-140+'rpx'-->
        </view>
        <view v-if="isArray">
            <!-- <view class="content" :class="isShow ? 'animation': 'show animation' " :style="{'height':isShow? `${list.length%5 == 0 ? list.length / 5 : Math.floor(list.length/5) + 1}00`-140+'rpx' :'0','padding-bottom':ism +'rpx'}">
                <text class="m-right-20" @click="chioce(index)" :class="current === index ? 'chioce-date-item-active' : 'chioce-date-item' " v-for="(item,index) in list" :key="index">{{item}}</text>
            </view> -->
            <view class="content" :class="isShow ? 'animation': 'show animation' " :style="{'height':isShow? (list.length <=5 ? '100rpx' :  `${ ( (Math.floor(list.length / 5) +1 )* 58) + ( (Math.floor(list.length / 5) +1 ) *20)}rpx` )  :'0','margin-bottom':isShow ?  `${list.length <=5 ? '0': '10px'}` :'0'}">
                <text class="m-right-20" @click="chioce(index)" :class="current === index ? 'chioce-date-item-active' : 'chioce-date-item' " v-for="(item,index) in list" :key="index">{{item}}</text>
            </view>
            <view class="content night" style="margin-bottom:10rpx" v-if="isShow && isKua">次日</view>
            <view class="content" v-if="isKua === 1 || isKua === '1'" :class="isShow ? 'animation': 'show animation' " :style="{'height':isShow? (nightArr.length <= 5 ? '100rpx' :  `${ ( (Math.floor(nightArr.length / 5) +1 )* 58) + ( (Math.floor(nightArr.length / 5) +1 ) *20) }rpx` )  :'0','margin-bottom':isShow ?  `${nightArr.length <=5 ? '0': '10px'}` :'0'}">
                <text class="m-right-20 m-bottom-20" @click="chioce1(index)" :class="current1 === index ? 'chioce-date-item-active' : 'chioce-date-item' " v-for="(item,index) in nightArr" :key="index">{{item}}</text>
            </view>
        </view>
        <view v-if="!isArray">
            <view class="content-txt" :class="isShow ? 'animation content-txt': 'content-txt animation' " :style="{'maxHeight':isShow? '120rpx' :'0'}">
                <text class="txt">{{list}}</text>
            </view>
        </view>
    </view>
</view>
</template>

<script>
export default {
    props: {
        list: {
            type: [Array, String, Number],
        },
        nightArr: {
            type: Array,
            default: () => [],
        },
        isKua: {
            type: [Number, String],
        },
        desc: {
            type: String,
            default: '预抵时间',
        },
        sign: {
            type: String,
            default: '*',
        },
        placeholder: {
            type: String,
            default: '请选择到店日期',
        },
        disabled: {
            type: Boolean,
            default: true,
        },
        border: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isShow: true,
            current: Number,
            value: '',
            current1: Number,
            ism: '',
            // data: ['8:00', '23:00', '9:00']
        }
    },
    watch: {
        list(a) {
            console.log((Math.round(a.length / 5) * 58) + (Math.round(a.length / 5) * 20))
            if (a.length < 3) {
                this.ism = 20
            }
        },
    },
    computed: {
        isArray() {
            if (toString.call(this.list) === '[object Array]') {
                return true
            }
            return false
        },
    },
    methods: {
        test() {
            console.log(123131321123)
            // if (this.list.length > 3) {
            this.isShow = !this.isShow
            // }
        },
        chioce(n) {
            this.current = n
            this.current1 = null
            this.value = this.list[n]
            this.$emit('input', this.list[n])
            this.$emit('chioce', 0)
        },
        chioce1(n) {
            this.current1 = n
            this.current = null
            this.value = this.nightArr[n]
            this.$emit('input', this.nightArr[n])
            this.$emit('chioce', 1)
        },
    },
}
</script>

<style lang="scss" scoped>
.min-collapse {
    .right-arrow {
        width: 24rpx;
        height: 24rpx;
        padding-top: 5rpx;
        transform: rotate(90deg);
    }

    .right-arrow-a {
        transform: rotate(7deg);
    }

    .card {
        background: #fff;
        border: none;
    }

    .content {
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        height: auto;

        .chioce-date-item {
            width: 112rpx;
            height: 58rpx;
            border: 1rpx solid #e7e7e7;
            border-radius: 10rpx;
            font-size: 28rpx;
            text-align: center;
            line-height: 58rpx;
            display: block;
            margin: 10rpx;
        }

        .chioce-date-item:nth-child(5n) {
            margin-right: 0;
        }

        .chioce-date-item:nth-child(5n+1) {
            margin-left: 5rpx;
        }

        .chioce-date-item-active {
            width: 112rpx;
            height: 58rpx;
            background: rgba(255, 224, 1, 1);
            border: 1rpx solid rgba(255, 224, 1, 1);
            border-radius: 10rpx;
            font-size: 28rpx;
            text-align: center;
            line-height: 58rpx;
            display: block;
            margin: 10rpx;
        }

        .chioce-date-item-active:nth-child(5n) {
            margin-right: 0;
        }

        .chioce-date-item-active:nth-child(5n+1) {
            margin-left: 5rpx;
        }
    }

    //在txt中修改左右间距，默认使用父组件外容器的边距
    .content-txt {
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        max-height: 0;

        .txt {
            word-break: break-all;
            white-space: normal;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            // padding:0 20rpx;
            // padding-bottom: 20rpx;
        }
    }

    .show {
        height: 0;
    }

    .animation {
        transition-property: all;
        transition-duration: 0.5s;
        transition-timing-function: ease;
    }

    .right-view {
        width: 100%;
        background: #f00;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
}
</style>
