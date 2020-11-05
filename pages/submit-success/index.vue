<template>
<view class="submit-success p-lr-30">
    <view v-if="!$parseURL().isNewUsers">
        <image class="icon" src="/static/images/success.png" alt="success" />
        <view class="title">提交成功</view>
        <view class="tips">请尽快电联相关人员审核</view>
        <view class="tips">{{timer}}</view>
        <min-btn class="min-btn" @click="toAdmin">回到台</min-btn>
    </view>
    <view v-else>
        <image class="icon" v-if="$parseURL().isStore" :src="$parseURL().isStore ?  '/static/images/success.png':''" alt="success" />
        <image class="icon" v-if="$parseURL().isLoading" :src="$parseURL().isLoading ?  '/static/images/shenhe.png':''" alt="success" />
        <image class="icon" v-if="$parseURL().isJujue" :src="$parseURL().isJujue ?  '/static/images/jujue.png':''" alt="success" />
        <view class="title" v-if="$parseURL().isLoading">审核中</view>
        <view class="title" v-if="$parseURL().isJujue">已拒绝</view>
        <!-- 当前账号审核未通过，请重新提交审核信息 -->
        <!-- 已提交申请，请等待门店审核通过 -->
        <view class="tips" v-if="$parseURL().isLoading">当前账号暂无法使用，请先让管理者通过审核</view>
        <view class="tips" v-if="$parseURL().isJujue">当前账号审核未通过，请重新提交审核信息</view>
        <view class="tips" v-if="$parseURL().isStore">已提交申请，请等待门店审核通过</view>
        <view class="tipss">
            <view><text class="f28" style="color:#333333">申请账号：</text><text class="f28" style="color:#FF0000">{{$parseURL().phone}}</text></view>
            <view class="m-tb-5"><text class="f28" style="color:#333333">申请门店：</text><text class="f28" style="color:#333333">{{$parseURL().store_name}}</text></view>
            <view><text class="f28" style="color:#333333">申请职位：</text><text class="f28" style="color:#333333">{{$parseURL().zhiwei_info}}</text></view>
        </view>
        <min-btn v-if="$parseURL().isJujue" class="min-btns" @click="toAdmins">重新申请审核</min-btn>
        <view v-if="$parseURL().isStore" class="store_">
            <min-btn class="btn m-right-20" @click="toIndex">回到首页</min-btn>
            <min-btn class="btn" @click="viewList">查看记录</min-btn>
        </view>
    </view>
    <view v-if="$parseURL().isNewUsers" class="f22 desc">如有疑问，请咨询门店后台管理者</view>
</view>
</template>

<script>
export default {
    name: 'redsubmit-success',
    navigate: ['navigateTo', 'redirectTo'],
    data() {
        return {
            timer: ''
        }
    },
    mounted() {
        this.timer = this.$minCommon.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
        console.log(this.$parseURL().isNewUsers)
    },
    methods: {
        toAdmin() {
            // this.$minRouter.push({
            //     name: 'platform-admin'
            // })
            this.$minRouter.push({
                name: 'redplatform-detail',
                type: "redirectTo",
                params: {
                    id: this.$parseURL().desk_id,
                    date: this.$store.state.status.date.date
                },
            })
            // uni.navigateBack({
            //     delta: 2
            // });
        },
        toAdmins() {
            console.log(this.$parseURL())
            this.$minRouter.push({
                name: 'rednew-user',
                type: 'redirectTo',
                params: {
                    data: this.$parseURL()
                }
            })
        },
        // 回到首页
        toIndex() {
            uni.reLaunch({
                url: '../index/index',
                animationType: 'pop-in',
                animationDuration: 200
            });
        },
        // 查看记录
        viewList() {
            // uni.redirectTo({
            //     url: '../apply-log/index',
            //     animationType: 'pop-in',
            //     animationDuration: 200
            // });
            this.$minRouter.push({
                name: 'apply-log',
                type: 'navigateTo',
                path: '/pages/apply-log/index'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.submit-success {
    position: relative;
    overflow: hidden;
    width: 100vw;
    height: 100%;

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
        color: rgba(51, 51, 51, 1);
        text-align: center;
        margin-top: 38rpx;
        margin-bottom: 40rpx;
    }

    .tips {
        font-size: 28rpx;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 40rpx;
        text-align: center;
    }

    .tipss {
        width: 690rpx;
        height: 180rpx;
        background: #FFFFFF;
        border-radius: 10rpx;
        margin-top: 40rpx;
        padding: 30rpx;
    }

    .min-btn {
        margin-top: 80rpx;
    }

    .min-btns {
        width: 690rpx;
        height: 88rpx;
        background: #FFE001;
        border-radius: 10rpx;
        margin-top: 40rpx;
    }

    .desc {
        width: 100%;
        position: fixed;
        bottom: 60rpx;
        color: #666666;
        text-align: center;
    }

    .store_ {
        height: 150rpx;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 40rpx;

        .btn {
            width: 48%;
            height: 88rpx;
            margin: 0;
        }
    }
}
</style>
