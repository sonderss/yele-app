<template>
<view class="bind-bank-card p-lr-30 p-tb-20">
    <min-cell class="mid-view" :card="false">
        <min-desc-input desc="持卡人" v-model="name" placeholder="请输入持卡人姓名" :maxlength="8"></min-desc-input>
        <min-desc-input desc="银行卡号" v-model="card" @loseBlue="sBlue" placeholder="请输入银行卡号" :maxlength="20" typeinput="number"></min-desc-input>
        <min-desc-input desc="银行" v-model="bank" disabled placeholder="请输入银行"></min-desc-input>
        <min-desc-input desc="预留手机号码" v-model="phone" placeholder="请输入银行预留手机号码" typeinput="number" :maxlength="11"></min-desc-input>
        <view class="btm_desc">
            <view class="top_view">
                <text>验证码</text>
                <view class="code" @click="getVerificationCode" v-if="countDown === 0">获取验证码</view>
                <view v-else>{{countDown}} s</view>
            </view>
            <input maxlength="6" v-model="code" class="m-top-20" placeholder="输入验证码" />
        </view>
    </min-cell>
    <view class="btn" @click="submit">绑定银行卡</view>
</view>
</template>

<script>
export default {
    name: 'redbind-bank-card',
    navigate: ['navigateTo', 'redirectTo'],
    data() {
        return {
            name: '',
            card: '',
            bank: '',
            phone: '',
            code: '',
            countDown: 0,
            info: {},
        }
    },
    methods: {
        getVerificationCode() {
            // 获取验证码
            if (!this.$minCommon.checkMobile(this.phone)) {
                this.$showToast('请输入正确的手机号码')
                return
            }
            this.$minApi.getVerificationCode({
                mobile: this.phone
            }).then(res => {
                this.$showToast('发送成功')
                this.$minCommon.setCountDown(num => {
                    // 倒计时
                    this.countDown = num
                })

                this.$minApi
                    .getBangding({
                        cardholder: this.name,
                        bank_card_num: this.card,
                        phone: this.phone,
                    })
                    .then(res => {
                        console.log(res)
                        this.info = res
                    })
                return
            })

            this.$minCommon.setCountDown(num => {
                // 倒计时
                this.countDown = num
            })
        },
        // 银行卡输入完毕做判断
        sBlue() {
            if (this.card.length < 5) return this.$showToast('银行卡输入有误')
            this.$minApi
                .getCardInfo({
                    bank_card_num: this.card,
                })
                .then(res => {
                    console.log(res)
                    this.bank = res.issue_bank
                })
        },
        submit() {
            if (!this.name) return this.$showToast('请输入持卡人姓名')
            if (!this.$minCommon.checkMobile(this.phone))
                return this.$showToast('请输入正确的手机号码')
            if (!this.card) return this.$showToast('请输入银行卡号')
            if (this.code.length !== 6) return this.$showToast('请输入验证码')
            this.$minApi
                .postCard({
                    bank_code: this.info.bankCode, // 银行代码
                    bank_card_num: this.card,
                    bank_name: this.info.bankName, // 银行名称
                    trance_num: this.info.tranceNum, // 流水号
                    card_type: this.info.cardType, // 银行卡类型
                    phone: this.phone,
                    verification_code: this.code,
                })
                .then(res => {
                    console.log(res)
                    this.$store.dispatch('user/setUserInfoAuth', res.apiAuth)
                    this.$store.dispatch('status/setisGetUser', true)
                    this.$store.dispatch('user/setisNeed', true)
                    this.$showToast('绑定成功')
                    setTimeout(() => {
                        uni.navigateBack({
                            delta: 1,
                        })
                    }, 2000)
                })
        },
    },
}
</script>

<style lang="scss" scoped>
.btm_desc {
    margin: 20rpx 0;
    padding-bottom: 20rpx;

    .top_view {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.btn {
    width: 690rpx;
    height: 88rpx;
    background: rgba(255, 224, 0, 1);
    border-radius: 10rpx;
    text-align: center;
    line-height: 88rpx;
    margin-top: 50rpx;
}
</style>
