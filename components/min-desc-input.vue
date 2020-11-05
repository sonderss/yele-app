<template>
<view class="min-desc-input">
    <view :class="border ? 'min-view-item min-flex min-flex-main-between f28 min-border-bottom' :'min-view-item min-flex min-flex-main-between f28'">
        <text class="desc-width">{{sign}}{{desc}}</text>
        <view class="right-view">
            <input v-if="!isNewUser" class="oinput" :type="typeinput" :password="isMi" :placeholder="placeholder" :maxlength="maxlength" @input="input" :value='value' :disabled="disabled" @blur="onBlur" placeholder-style="color:#999" />
            <!--  :class="animation ? 'animation' : 'right-arrow-a animation' " -->
            <image class="right-arrow p-left-10" v-if="isRightRrrow" :class="animation ? 'right-arrow-a animation' : 'animation' " src="/static/images/arrow.png" />
            <view v-if="isNewUser" class="min-flex">
                <!-- :icon="$minCommon.getIcon(item.id)" v-model="isw" -->
                <min-radio title="外联成员" :label="isws" v-model="a" />
                <min-radio title="普通成员" class="p-left-30" :label="iswss" v-model="a" />
            </view>
        </view>

    </view>
</view>
</template>

<script>
export default {
    props: {
        desc: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请输入信息'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        sign: {
            type: String,
            default: ''
        },
        maxlength: {
            type: Number,
            default: 999
        },
        value: {
            type: [String, Number],
            default: ''
        },
        border: {
            type: Boolean,
            default: true
        },
        isRightRrrow: {
            type: Boolean,
            default: false
        },
        animation: {
            type: Boolean
        },
        typeinput: {
            type: String,
            default: "test"
        },
        isMi: {
            type: Boolean,
            default: false
        },
        isNewUser: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        a(a) {
            this.$emit('input', a)
        }
    },
    data() {
        return {
            isws: 0,
            iswss: 1,
            a: 1
        }
    },
    methods: {
        input(e) {
            // console.log(e.detail.value)
            this.$emit('value', e.detail.value)
            this.$emit('input', e.detail.value)
        },
        onBlur(e) {
            // console.log(e);
            this.$emit('loseBlue')
        }
    }
}
</script>

<style lang="scss" scoped>
.min-desc-input {
    background: #fff;
    flex: 1;

    .min-view-item {
        height: 98rpx;

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

        .right-view {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            .oinput {
                width: 100%;
                text-align: right;
                height: 98rpx;
                display: block;
                color: #333;
            }
        }
    }

    .right-arrow-a {
        transform: rotate(90deg);
    }

    .animation {
        transition-property: all;
        transition-duration: 0.5s;
        transition-timing-function: ease;
    }
}

.new-user-chioce {
    width: 50%;
}
</style>
