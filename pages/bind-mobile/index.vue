<template>
<view class="bind-mobile">
    <view class="tips">验证码将发送至尾号为{{$minCommon.getPhoneLastNum($parseURL().phone)}}的手机号</view>
    <view class="p-lr-30">
        <view class="inp p-left-30 p-tb-35 min-flex min-flex-main-between min-border-bottom">
            <view class="min-flex min-flex-main-start">
                <input type="number" v-model="phoneCode" maxlength="11" placeholder="请输入验证码">
            </view>
            <view class="f26  btn" @click="getVerificationCode" v-if="code === 0">获取验证码</view>
            <view v-else class="theme-text">{{code}} s</view>
        </view>
    </view>
    <view class="btnss" @click="yanzheng">验证手机号</view>
    <!-- <view class="p-lr-30">
      <view class="inp p-lr-30 p-tb-35 min-flex min-flex-main-start min-border-bottom">
        <input type="number" v-model="phoneCode" placeholder="请输入验证码" maxlength="6">
      </view>
    </view> -->
</view>
</template>

<script>
export default {
    name: 'bind-mobile',
    navigate: ['navigateTo'],
    data() {
        return {
            code: 0,
            newPhone: '',
            phoneCode: '',
            oldPhone: ''
        }
    },
    onNavigationBarButtonTap() {
        if (this.phoneCode.length !== 6) return this.$showToast('请输入验证码')
        // 修改手机号
        this.$minApi.setPhone({
            old_mobile: this.oldPhone,
            new_mobile: this.newPhone,
            msg_code: this.phoneCode
        }).then(res => {
            console.log('请求修改手机号接口', res)
            if (res.length === 0) {
                // 修改全局变量
                this.$store.state.user.userInfo.mobile = this.newPhone
                console.log(this.$store.state.user.userInfo)
                this.$showToast('修改手机号成功')
                setTimeout(() => {
                    this.$minRouter.push({
                        name: 'mine-info',
                        type: 'redirectTo'
                    })
                }, 2000)
            }
        })
    },
    onLoad() {
        this.oldPhone = this.$parseURL().phone
    },
    methods: {
        yanzheng() {
            // if (this.phoneCode.length !== 6 && this.phoneCode.length !== 5) return this.$showToast('请输入验证码')
            this.$minApi.banddingPhoneL({
                msg_code: this.phoneCode
            }).then(res => {
                this.$showToast('验证手机号成功')
                setTimeout(() => {
                    this.$minRouter.push({
                        name: "verify-name",
                        params: {
                            id_card: this.$parseURL().id_card,
                            is_certify: this.$parseURL().is_certify,
                            name: this.$parseURL().user_name,
                            phone: this.$parseURL().mobile,
                        },
                    });
                }, 2000)

            })
        },
        getVerificationCode() { // 获取验证码
            if (!this.$minCommon.checkMobile(this.$parseURL().phone)) {
                this.$showToast('请输入正确的手机号码')
                return
            }
            // 通联验证码
            this.$minApi.getTongLianCode({
                phone: this.$parseURL().phone,
                type: 9 // 绑定手机号
            }).then(res => {
                this.$showToast('发送成功')
                this.$minCommon.setCountDown((num) => { // 倒计时
                    this.code = num
                })
            })
        },
        countDown() {
            if (!this.$minCommon.checkMobile(this.newPhone)) return this.$showToast('请输入正确的手机号')

            this.$minApi.getVerificationCode({
                mobile: this.newPhone
            }).then(res => {
                this.$showToast('发送成功')
                this.$minCommon.setCountDown((num) => {
                    this.code = num
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
uni-page-body {
    background: #fff;
    height: 100%;
    width: 100%;
}

.bind-mobile {
    .tips {
        padding: 18rpx 32rpx;
        color: #FF0000;
        background: #F0D0D0;
        font-size: 24rpx;
    }

    .inp {
        font-size: 30rpx;
    }

    .icon {
        width: 40rpx;
        height: 40rpx;
    }

    .btn {
        width: 174rpx;
        height: 68rpx;
        border: 1rpx solid rgba(204, 204, 204, 1);
        border-radius: 10rpx;
        text-align: center;
        line-height: 68rpx;
    }

    .theme-text {
        width: 174rpx;
        height: 68rpx;

        border-radius: 10rpx;
        text-align: center;
        line-height: 68rpx;
    }

    .btnss {
        width: 690rpx;
        height: 88rpx;
        background: #FFE001;
        border-radius: 10rpx;
        margin: 40rpx auto;
        line-height: 88rpx;
        text-align: center;
    }
}
</style>
