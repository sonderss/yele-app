<template>
<view class="lnvitation-offline p-lr-30 p-tb-20">
    <min-search bgColor="#EEEEEE" v-model="key" placeholder="请输入营销姓名/手机号搜索"></min-search>
    <min-cell class="m-tb-20" :card="false">
        <view class="title">可邀请的下线</view>

        <view :class="i === getValue.length-1?  'items':'items min-border-bottom' " :key="i" v-for="(n,i) in getValue">
            <min-radio active='/static/images/active_.png' size="50" :label="i" v-model="isFlag" />
            <view class="test">
                <min-describe :leftIconValue="n.head_img" errImage='/static/images/head.png' isCirl :leftTxtB="n.mobile" isPadding="p-lr-10" :leftTxt="n.sales_name" :rightTxtT="n.department_name" :rightTxtB="n.position_name" rightTxtBSize="26rpx" :leftIcon="true" :leftTxtTwo="true" @chincesku="test(i)">
                </min-describe>
            </view>

        </view>

    </min-cell>
    <view style="height:100rpx"></view>
    <view class="btn" @click="toPost">提交申请</view>
    <min-404 v-if="isNone" pTop="200rpx"></min-404>
</view>
</template>

<script>
export default {
    name: 'lnvitation-offline',
    navigate: ['navigateTo'],
    data() {
        return {
            list: [],
            key: '',
            isNone: false,
            isFlag: ''
        }
    },
    computed: {
        getValue() {
            let data = []
            if (this.key) {
                this.list.filter(item => {
                    if (item.sales_name.includes(this.key) || item.mobile.includes(this.key)) {
                        data.push(item)
                    }
                })
            } else {
                data = this.list
            }
            return data
        }
    },
    watch: {
        getValue(a) {
            if (a.length === 0) {
                this.isNone = true
            } else {
                this.isNone = false
            }
        }
    },
    mounted() {
        this.$minApi
            .getPleaseDownLineList({
                page: 1,
                limitL: 10
            })
            .then(res => {
                this.list = res.list
                this.list.map((item, index) => {
                    this.$set(item, 'f', index)
                })
            })
    },
    methods: {
        toPost() {
            if (!this.myIsNaN(this.isFlag)) return this.$showToast('请选择下线')
            this.$minApi.postInviteOffline({
                id: this.list[this.isFlag].id
            }).then(res => {
                if (res.length === 0) {
                    this.$showToast('邀请成功')
                    setTimeout(() => {
                        uni.navigateBack({
                            delta: 1
                        });
                    }, 2000)
                }
            })
            // return this.$showToast('正在开发中')
        },
        test(n) {
            this.isFlag = n
        },
        myIsNaN(value) {
            return typeof value === 'number' && !isNaN(value)
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    height: 88rpx;
    line-height: 88rpx;
}

.items {
    width: 100%;
    height: auto;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .test {
        width: 100%;
    }
}

.btn {
    width: 100%;
    height: 98rpx;
    background: rgba(255, 224, 1, 1);
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;
    line-height: 98rpx;
}
</style>
