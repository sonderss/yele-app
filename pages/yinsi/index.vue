<template>
<view class="yinsi p-lr-30">
    <view class="title">
        欢迎使用夜乐门店
        <view class="btm"></view>
    </view>
    <view class="desc">
        为了给您带来更好的使用体验，某些产品功能可能会申请一下权限（未得到您的授权，这些权限不会默认开启）：
    </view>
    <view class="quanxain">
        <ul style="padding-left:40rpx">
            <li style="margin-bottom:40rpx">
                相册权限
                <view style="color:#999999;font-size:28rpx">用于设置和更换头像</view>
            </li>
            <li style="margin-bottom:40rpx">电话权限 <view style="color:#999999;font-size:28rpx">拨打电话用于快捷联系客户</view>
            </li>
            <li style="margin-bottom:40rpx">定位权限 <view style="color:#999999;font-size:28rpx">
                    用于快速获取到附近门店信息
                </view>
            </li>
        </ul>
    </view>
    <view class="btm_view">
        <view class="btm_dwesc">
            您也可以在系统设置中修改授权，单可能会影响部分功能的使用。请在使用前查看并同意
            <text style="font-size:28rpx;color:#FFE100" @click="toUser(1)">《用户协议》</text>和
            <text @click="toUser(2)" style="font-size:28rpx;color:#FFE100">
                《隐私政策》
            </text>
        </view>
        <view class="btn" @click="argee">同意</view>
        <view class="zai" @click="zaixiang">再想想</view>
    </view>
</view>
</template>

<script>
export default {
    methods: {
        argee() {
            // #ifdef APP-PLUS
            // 同意并跳转到登陆页
            plus.runtime.agreePrivacy()
            // #endif
            uni.reLaunch({
                url: '../login/index'
            });

        },
        zaixiang() {
            // #ifdef APP-PLUS
            // 关闭APP
            plus.runtime.disagreePrivacy()
            plus.runtime.quit()
            // #endif
        },
        toUser(n) {
            this.$minRouter.push({
                name: 'user-agreement',
                params: {
                    n
                }
            })
        }

    },
}
</script>

<style lang="scss" scoped>
.yinsi {
    width: 100vw;
    height: 100vh;
    background: #030313;
    overflow: hidden;

    .title {
        width: 100%;
        height: 58rpx;
        color: #FFE001;
        font-size: 58rpx;
        font-family: PingFang SC;
        font-weight: bold;
        margin-top: 94rpx;
        position: relative;
        margin-left: 49rpx;
        margin-bottom: 27rpx;

        .btm {
            width: 547rpx;
            height: 21rpx;
            background: #F7F7F7;
            opacity: 0.2;
            position: absolute;
            bottom: -14rpx;
            left: 0;
        }
    }

    .desc {
        margin-left: 49rpx;
        width: 642rpx;
        height: 94rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #CCCCCC;
    }

    .quanxain {
        width: 420rpx;
        height: 363rpx;
        margin-top: 68rpx;
        margin-left: 49rpx;

        li {
            color: white;
            font-size: 34rpx;
        }
    }

    .btm_view {
        position: absolute;
        bottom: 80rpx;

        .btm_dwesc {
            width: 690rpx;
            height: 93rpx;
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #999999;
        }

        .btn {
            width: 690rpx;
            height: 98rpx;
            background: #FFE001;
            border-radius: 49rpx;
            text-align: center;
            line-height: 98rpx;
            margin-top: 50rpx;
        }

        .zai {
            width: 690rpx;
            height: 98rpx;
            line-height: 98rpx;
            color: #999999;
            text-align: center;
        }
    }

}
</style>
