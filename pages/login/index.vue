<template>
<view class="login">
    <!-- <image src="/static/images/login/back.png" class="bg-img" /> -->
    <view style="height: 50rpx;"></view>
    <view class="m-lr-30 p-lr-30" style="margin-top:466rpx">
        <view class="inp p-left-30 min-flex min-flex-main-start">
            <image class="icon" src="/static/images/login/user.png" />
            <input type="number" v-model="mobile" placeholder="请输入手机号码" :focus="isFouce" @focus="cnmd" maxlength="11" @blur="gnm" />
            <view :class="isFouce && mobile ? 'clear-icon-bg  clear-icon' : 'clear-icon'" @click="aa">
                <!-- <image src="/static/images/clear.png" v-if="isFouce && mobile" /> -->
            </view>
        </view>
        <view class="inp p-left-30 min-flex min-flex-main-between">
            <view class="min-flex min-flex-main-start">
                <image class="icon" src="/static/images/login/lock.png" />
                <input type="number" maxlength="6" v-model="code" placeholder="请输入验证码" />
            </view>
            <view class="code" @click="getVerificationCode" v-if="countDown === 0">获取验证码</view>
            <view v-else class="white">{{ countDown }} s</view>
        </view>
    </view>
    <view :class="addAnimation ? ' user_info  user_info_anmin m-lr-30 p-lr-30 p-top-30' : ' user_info   m-lr-30 p-lr-30 p-top-30' ">
        <!-- <min-radio @change=" ischange" v-model="a" :label="isCh" active="/static/images/active_sel.png" " /> -->
        <image :src=" src_" @click="ischange" />
        <view style="color:#666666" class="f20">我已同意夜乐<text class="d" @click="toUser(1)">《用户协议》</text>和<text class="d" @click="toUser(2)">《隐私政策》</text></view>
    </view>
    <view style="height: 70rpx"></view>
    <view class="p-lr-30">
        <min-btn @click="login" shape="circle">
            <text style="font-size:30rpx">登 录</text>
        </min-btn>
    </view>
    <!-- <min-y :isShow="isShow" /> -->
</view>
</template>

<script>
import '../../static/js/quit'
export default {
    name: 'login',
    navigate: ['navigateTo', 'reLaunch'],
    data() {
        return {
            countDown: 0,
            code: '',
            mobile: '',
            flag: false,
            isFouce: false,
            test: false,
            ndsl: false,
            isChangeSel: false,
            addAnimation: false,
            isShow: false
        }
    },
    computed: {
        src_() {
            return this.isChangeSel ? '/static/images/active_sel.png' : '/static/images/no_sel.png'
        }
    },
    onLoad() {
        uni.getStorage({
            key: 'userInfo',
            success: res => {
                this.mobile = JSON.parse(res.data).phone
            }
        })
    },
    watch: {
        code(newValue) {
            // #ifdef APP-PLUS
            if (newValue.length === 6) return uni.getSystemInfoSync().platform === 'ios' ? '' : uni.hideKeyboard()
            // #endif
            // #ifdef H5
            newValue.length === 6 && uni.hideKeyboard()
            // #endif
        }
    },
    methods: {
        gnm() {
            this.isFouce = false

        },
        cnmd() {
            this.isFouce = true
        },
        aa() {
            this.isFouce = false
            this.mobile = ''
        },
        getVerificationCode() {
            // 获取验证码
            if (!this.$minCommon.checkMobile(this.mobile)) {
                this.$showToast('请输入正确的手机号码')
                return
            }
            this.$minApi.getVerificationCode({
                mobile: this.mobile,
                type: 1
            }).then(res => {
                this.$showToast('发送成功')
                this.$minCommon.setCountDown(num => {
                    // 倒计时
                    this.countDown = num
                })
            })
        },
        toUser(n) {
            this.$minRouter.push({
                name: 'user-agreement',
                params: {
                    n
                }
            })
        },
        login() {

            // #ifdef APP-PLUS
            if (this.$store.state.status.intNet) return this.$showToast('无网络连接')
            // #endif
            if (!this.$minCommon.checkMobile(this.mobile) || this.code.length !== 6) return this.$showToast('请正确填写信息')
            if (!this.isChangeSel) {
                this.addAnimation = true
                this.$showToast('请先同意《用户协议》和《隐私政策》')
                setTimeout(() => {
                    this.addAnimation = false
                }, 500)
                return
            }
            if (this.flag) return
            this.flag = true
            this.$minApi
                .login({
                    mobile: this.mobile,
                    code: this.code
                })
                .then(res => {
                    this.$showToast('登录成功')
                    this.flag = false

                    uni.setStorage({
                        key: 'userInfo',
                        data: JSON.stringify({
                            phone: this.mobile
                        }),
                        success: function () {
                            console.log('success')
                        }
                    })
                    setTimeout(() => {
                        this.$store.dispatch('user/setUserInfo', res)
                        this.$store.dispatch('status/setisGetUser', true) // 个人资料页重新获取数据
                        // this.$minRouter.push({
                        //     name: 'index'
                        // })
                        uni.redirectTo({
                            url: '../index/index'
                        })
                    }, 1000)
                })
                .catch(err => {
                    console.log(err)
                    if (err.code === 1100001) {
                        // 用户未注册
                        // setTimeout(() => {
                        this.$minRouter.push({
                            name: 'new-user',
                            params: {
                                phone: this.mobile
                            }
                        })
                        // }, 2000)
                    }
                    if (err.code === 1100002) {
                        // 等待审核通过
                        // setTimeout(() => {
                        this.$minRouter.push({
                            name: 'submit-success',
                            params: {
                                isLoading: true,
                                phone: this.mobile,
                                store_name: err.data.store_name,
                                zhiwei_info: err.data.department_name + ' ' + err.data.position_name,
                                isNewUsers: true
                            }
                        })
                        // }, 2000)
                    }
                    if (err.code === 1100003) {
                        // 审核不通过
                        // setTimeout(() => {
                        this.$minRouter.push({
                            name: 'submit-success',
                            params: {
                                phone: this.mobile,
                                user_name: err.data.name,
                                position_id: err.data.position_id,
                                department_id: err.data.department_id,
                                store_id: err.data.store_id,
                                store_name: err.data.store_name,
                                zhiwei_info: err.data.department_name + ' ' + err.data.position_name,
                                isNewUsers: true,
                                invite_code: err.data.invite_code,
                                isJujue: true
                            }
                        })
                        // }, 2000)
                    }
                    this.flag = false
                })

        },
        ischange() {
            this.isChangeSel = !this.isChangeSel
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    background: #030313;
    width: 100vw;
    min-height: 100vh;
    background-image: url('/static/images/login/back.png');
    background-position: top;
    background-size: 100% 466rpx;
    background-repeat: no-repeat;

    .bg-img {
        width: 100%;
        height: 466rpx;
    }

    .inp {
        margin-top: 50rpx;
        height: 66rpx;
        font-size: 30rpx;
        position: relative;
        border-bottom: 1rpx solid #333;

        input {
            padding-left: 56rpx;
            width: 400rpx;
            color: #ffffff;
        }

        .code {
            color: #ffe001;
        }

        .clear-icon {
            width: 66rpx;
            height: 66rpx;
            padding: 20rpx;
            position: absolute;
            right: 0rpx;
            top: -4rpx;
            background-repeat: no-repeat;
            background-size: 50%;
            background-position: center;
        }

        .clear-icon-bg {
            background-image: url('/static/images/clear.png');
        }
    }

    .icon {
        width: 40rpx;
        height: 40rpx;
    }

    .user_info {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        image {
            width: 25rpx;
            height: 25rpx;
            display: inline-block;
            margin-right: 10rpx;
            margin-left: 37rpx;
        }

        .d {
            color: #3699FF;
            font-size: 20rpx;
        }
    }

    .user_info_anmin {
        animation: test 0.15s linear infinite;
    }

    @keyframes test {
        0% {
            transform: translateX(rpx);
        }

        50% {
            transform: translateX(20rpx);
        }

        100% {
            transform: translateX(0rpx);
        }
    }
}
</style>
