<template>
<view class="min-modal min-modal-flex" :class="{'min-modal-show': show}" @touchmove.stop.prevent="()=>{}">
    <view class="min-modal-mask" @touchmove.stop="()=>{}" @click="handleMaskClick"></view>
    <view class="min-modal-main" :class="{'min-modal-main-show': show}">
        <view :class="contentCenter ? 'min-modal-content-center':  'min-modal-content'">
            <!-- isSetTitie -->
            <view class="min-modal-title" v-if="title">{{title}}</view>
            <!-- 这里为转台特意增加 -->
            <view v-if="isSetTitie" class="min-modal-title-set">
                <text>{{setDeskTop}}</text>
                <view class="m-top-10">{{setDeskTop2}}</view>
            </view>
            <!-- end -->
            <!-- 这里为申请原因特意增加 -->
            <view v-if="isReson" class="min-modal-title-set" style="padding:0;text-align: left;">
                <min-remarks title='申请原因' maxlength='100' textAlign='center' color='#999' placeholder='请填写申请原因...' v-model='resonValue'></min-remarks>
            </view>
            <!-- end -->
            <view class="min-modal-body" v-if="content">
                <scroll-view v-if="zengs" scroll-y='true' style="height:300rpx">
                    <view :class="isPading ? 'content_isPading':'content' " v-html="content"></view>

                </scroll-view>
                <view v-else :class="isPading ? 'content_isPading':'content' " v-html="content"></view>
            </view>
            <view class="min-modal-body" v-else>
                <slot></slot>
            </view>
            <view class="min-modal-actions min-modal-line-top" v-if="actions.length">
                <view :class="{'min-modal-flex': actionMode}">
                    <view class="min-modal-item min-modal-flex" v-for="(item, index) in actions" :key="index" :class="[actions.length === index + 1 ? 'min-modal-item-last' : '',
              actionMode ? 'min-modal-line-right' : 'min-modal-line-top']" :style="[item.color ? {color: item.color} : '']" @click="handleClick(index)">
                        <view class="min-modal-icon min-modal-loading" v-if="item.loading === 1"></view>
                        <image class="min-modal-icon" :src="item.image" v-if="item.image"></image>
                        <view class="min-modal-icon" :class="item.icon" v-if="item.icon"></view>
                        <view>{{item.name}}</view>
                    </view>
                </view>
            </view>
            <view class="min-modal-actions min-modal-line-top" v-else>
                <view class="min-modal-flex">
                    <view class="min-modal-item min-modal-flex min-modal-line-right" v-if="showCancel" @click="handleClick(0)" :style="[cancelColor ? {color: cancelColor} : '']">
                        {{cancelText}}
                    </view>
                    <view class="min-modal-item min-modal-item-last min-modal-flex" @click="handleClick(1)" :style="[confirmColor ? {color: confirmColor} : '']">
                        {{confirmText}}
                    </view>
                </view>
            </view>
        </view>
    </view>
</view>
</template>

<script>
export default {
    name: 'min-modal',
    data() {
        return {
            modalID: 'modal',
            show: false,
            maskClose: false,
            title: '',
            content: '',
            showCancel: true,
            cancelColor: '',
            cancelText: '取消',
            confirmColor: '#007aff',
            confirmText: '确定',
            actions: [],
            actionMode: true,
            isClick: true,
            success: () => {},
            timer: null,
            contentCenter: false,
            isSetTitie: false,
            setDeskTop: '',
            setDeskTop2: '',
            isPading: false,
            zengs: false,
            isReson: false,
            resonValue: ''
        }
    },
    methods: {
        handleShow({
            title = '',
            content = '',
            modalID = 'modal',
            showCancel = true,
            cancelColor = '',
            cancelText = '取消',
            confirmColor = '#007aff',
            confirmText = '确定',
            actions = [],
            contentCenter = false,
            actionMode = true,
            maskClose = false,
            isSetTitie = false,
            setDeskTop = '',
            setDeskTop2 = '',
            isPading = false,
            zengs = false,
            isReson = false,
            resonValue = '',
            success = () => {}
        }) {
            clearTimeout(this.timer)
            this.show = true
            this.modalID = modalID
            this.title = title
            this.content = content
            this.showCancel = showCancel
            this.cancelColor = cancelColor
            this.cancelText = cancelText
            this.confirmColor = confirmColor
            this.confirmText = confirmText
            this.actions = actions
            this.actionMode = actionMode
            this.maskClose = maskClose
            this.success = success
            this.contentCenter = contentCenter
            this.isSetTitie = isSetTitie
            this.setDeskTop2 = setDeskTop2
            this.setDeskTop = setDeskTop
            this.isPading = isPading
            this.zengs = zengs
            this.isReson = isReson
        },
        handleHide() {
            this.show = false
            this.timer = setTimeout(() => {
                this.title = ''
                this.content = ''
                this.showCancel = true
                this.cancelColor = ''
                this.cancelText = '取消'
                this.confirmColor = '#007aff'
                this.confirmText = '确定'
                this.actions = []
                this.maskClose = false
                this.actionMode = true
                this.contentCenter = false
                this.modalID = 'modal'
                this.isClick = true
                this.setDeskTop2 = ''
                this.setDeskTop = ''
                this.isSetTitie = false
                this.isPading = false
                this.zengs = false
                this.isReson = false
                this.success = () => {}
            }, 300)
        },
        handleMaskClick() {
            if (!this.isClick) return
            this.maskClose && this.handleHide()
        },
        handleClick(id) {
            if (!this.isClick) return
            if (this.actions[id]) {
                if (this.actions[id].loading === 0) {
                    this.actions[id].loading = 1
                    this.success({
                        modalID: this.modalID,
                        id,
                        handleHide: this.handleHide
                    })
                    this.isClick = false
                    return
                }
            }
            this.success({
                modalID: this.modalID,
                id,
                resonValue: this.resonValue
            })
            this.handleHide()
        }
    }
}
</script>

<style lang="scss" scoped>
.min-modal-flex {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}

.min-modal-line-right::before,
.min-modal-line-top::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform: scale(.5);
    transform-origin: 0 0;
    box-sizing: border-box;
}

.min-modal-line-right::before {
    border-right: 1px solid #e9eaec;
}

.min-modal-line-top::before {
    border-top: 1px solid #e9eaec;
}

.min-modal-loading {
    background: transparent;
    border-radius: 50%;
    border: 2px solid #e5e5e5;
    border-left-color: #aaaaaa;
    animation: loading 1s linear infinite;
}

.min-modal,
.min-modal-mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

.min-modal {
    z-index: 1000;
    visibility: hidden;
}

.min-modal-show {
    visibility: visible;
}

.min-modal-mask {
    background: rgba(0, 0, 0, 0.5);
}

.min-modal-main {
    width: 600rpx;
    position: relative;
    visibility: hidden;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.3s;
}

.min-modal-main-show {
    visibility: visible;
    opacity: 1;
    transform: scale(1);
}

.min-modal-content {
    border-radius: 6px;
    padding-top: 30rpx;
    position: relative;
    background-color: #fff;
    border: 0;
    background-clip: padding-box;
    /* text-align: center; */
    height: 100%;
    overflow: hidden;
}

/* 内容文本中心显示 */
.min-modal-content-center {
    border-radius: 6px;
    padding-top: 30rpx;
    position: relative;
    background-color: #fff;
    border: 0;
    background-clip: padding-box;
    text-align: center;
    height: 100%;
    overflow: hidden;
}

.min-modal-title {
    padding: 12rpx 30rpx 30rpx 30rpx;
    margin: 0;
    font-size: 36rpx;
    line-height: 1;
    color: #1c2438;
    text-align: center;
}

.min-modal-body {
    margin-bottom: 30rpx;
    padding: 0 30rpx;
    max-height: 300rpx;
    font-size: 28rpx;
    color: #80848f;
    height: 100%;
    line-height: 1.5;
    overflow: auto;
    display: block;
}

.min-modal-item {
    position: relative;
    flex: 1;
    height: 88rpx;
    font-size: 28rpx;
    color: #1c2438;
}

.min-modal-item-last::after {
    border-right: none;
}

.min-modal-actions {
    position: relative;
}

.min-modal-icon {
    margin-right: 12rpx;
    width: 28rpx;
    height: 28rpx;
}

.min-modal-title-set {
    padding: 12rpx 30rpx 20rpx 30rpx;
    margin: 0;
    font-size: 36rpx;
    line-height: 1;
    color: #1c2438;
    text-align: center;
    font-weight: 700;
}

.content_isPading {
    padding-left: 80rpx;
}

@keyframes loading {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
