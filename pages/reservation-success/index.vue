<template>
<view class="reserve-success p-lr-30">
    <image class="icon" src="/static/images/success.png" alt="success" />
    <view class="title">预约成功</view>
    <view class="tips">记得提醒客户准时到店哦</view>
    <view class="card f28 p-tb-30 p-lr-30">
        <view>预定台号：<text>{{data.desk_name}}</text></view>
        <view>客户姓名：{{data.client_name}}</view>
        <view>联系电话：{{data.client_mobile}}</view>
        <view>预抵时间：{{data.arrival_time}}</view>

    </view>
    <view class="btns">
        <view class="btn" @click="goOn">继续预约</view>
        <view class="btn_w" @click="backIndex">返回首页</view>
    </view>
</view>
</template>

<script>
export default {
    name: 'reserve-success',
    navigate: ['navigateTo'],
    data() {
        return {
            data: {}
        }
    },
    onLoad(option) {
        console.log(option);
        const date = new Date(JSON.parse(option.data).arrival_time * 1000)
        const day = this.$minCommon.getDay(date.getDay())

        let time = this.$minCommon.formatDate(date, 'yyyy/MM/dd hh:mm')
        this.data = JSON.parse(option.data)
        time = time + ' ' + day
        this.data.arrival_time = time
    },
    methods: {
        goOn() {
            uni.navigateBack({
                delta: 2
            });
        },
        backIndex() {
            uni.navigateBack({
                delta: 3
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.reserve-success {
    .icon {
        display: block;
        width: 200rpx;
        height: 200rpx;
        margin: 0 auto;
        margin-top: 117rpx;
    }

    .title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
        text-align: center;
        margin-top: 38rpx;
    }

    .tips {
        font-size: 28rpx;
        font-weight: 400;
        color: #666666;
        text-align: center;
        margin-top: 20rpx;
    }

    .card {
        background: #FFF;
        border-radius: 10rpx;
        margin-top: 40rpx;

        text {
            color: #FF0000;
        }

        view {
            margin-bottom: 10rpx;

            &:last-child {
                margin: 0;
            }
        }
    }

    .btns {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 40rpx;

        .btn {
            width: 330rpx;
            height: 88rpx;
            background: rgba(255, 224, 1, 1);
            border-radius: 10rpx;
            text-align: center;
            line-height: 88rpx;
        }

        .btn_w {
            width: 330rpx;
            height: 88rpx;
            background: rgba(255, 255, 255, 1);
            border-radius: 10rpx;
            text-align: center;
            line-height: 88rpx;
        }
    }
}
</style>
