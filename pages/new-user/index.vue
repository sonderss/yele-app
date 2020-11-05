<template>
<view :class="isNewUser ?  'new-user m-top-20 ': 'new-user' ">
    <view v-if="!isNewUser" class="top-view f24  m-bottom-20">已验证手机号{{user_phone}}</view>
    <view class="card p-lr-20">
        <min-desc-input desc='成员姓名' v-model="user_name" placeholder="请输入姓名" />
        <min-desc-input v-if="isNewUser" desc='联系电话' v-model="user_phone" placeholder="请输入联系电话" />
        <view @click="store_m(0)">
            <min-desc-input desc='入职门店' v-model="store_name" placeholder='请选择' disabled />
        </view>
        <min-desc-input desc='入职类型' v-model="ruzhi_type" isNewUser />
        <view @click="store_m(1)">
            <min-desc-input desc='职位信息' placeholder='请选择' disabled v-model="zhiwei_info" />
        </view>
        <min-desc-input desc='邀请码' :maxlength='4' v-if="!$parseURL().isShensStore" :border="false" placeholder="请输入邀请码" v-model="code" />
    </view>
    <view class="btn" @click="tuShen">申请审核</view>
    <min-popup :show="bis3" @close="closse" heightSize="600">
        <view class="btn_viewcjq min-border-bottom">
            <text @click.stop="cancel" class="cancl">取消</text>
            <view class="btnsss" @click.stop="sures(0)">确认</view>
        </view>
        <picker-view :indicator-style="indicatorStyle" @change="bindChange" :value="values" style="height:400rpx;">
            <picker-view-column>
                <view class="pickers item" :class="num === index ? 'active':  (index === num - 1 ? 'f36 cfz' : index === num - 2 ? 'f28 cjq': (index === num + 1 ? 'f36 cfz' : index === num + 2 ? 'f28 cjq' : 'f20' )  ) " v-for="(item,index) in datas" :key="index">{{item.store_name}}</view>
            </picker-view-column>
        </picker-view>
    </min-popup>
    <!-- 职位选择 -->
    <min-popup :show="bis2" @close="closses" heightSize="600">
        <view class="btn_viewcjq min-border-bottom">
            <text @click.stop="cancel" class="cancl">取消</text>
            <view class="btnsss" @click.stop="sures(1)">确认</view>
        </view>
        <picker-view :indicator-style="indicatorStyle" @change="bindChanges" :value="values" style="height:400rpx;">
            <picker-view-column>
                <view v-for="(items,index1s) in zhiweidatas" :key="index1s" class="pickers item">{{items.department_name}}</view>
            </picker-view-column>
            <picker-view-column>
                <view v-for="(item,index) in zhiwei" :key="index" class="pickers item">{{item.position_name}}</view>
            </picker-view-column>
        </picker-view>
    </min-popup>
</view>
</template>

<script>
export default {
    name: "rednew-user",
    navigate: ['navigateTo', 'redirectTo'],
    mounted() {
        console.log(this.$parseURL().isShensStore)
    },
    data() {
        return {
            user_name: '',
            store_name: "",
            ruzhi_type: 1,
            zhiwei_info: '',
            user_phone: "",
            code: "",
            isNewUser: false,
            bis3: false,
            num: 0,
            datas: [213, 123],
            zhiweidatas: [],
            zhiwei: [],
            indicatorStyle: `height: ${Math.round(
        uni.getSystemInfoSync().screenWidth / (750 / 100)
      )+20}rpx;`,
            values: [0, 0],
            bis2: false,
            zhi: [0, 0],
            store_id: '',
            department_id: '',
            position_id: ''
        }

    },
    onLoad() {
        console.log(this.$parseURL())
        if (this.$parseURL().data) {
            this.store_name = this.$parseURL().data.store_name
            this.user_name = this.$parseURL().data.user_name
            this.user_phone = this.$parseURL().data.phone
            this.zhiwei_info = this.$parseURL().data.zhiwei_info
            this.department_id = this.$parseURL().data.department_id
            this.position_id = this.$parseURL().data.position_id
            this.code = this.$parseURL().data.invite_code
        } else {
            this.user_phone = this.$parseURL().phone ? this.$parseURL().phone : '暂无'
            this.store_name = this.$parseURL().store_name
            this.store_id = this.$parseURL().store_id
        }
        if (this.$parseURL().isShensStore) {
            this.getZhiWei(this.$parseURL().store_id)
            return
        }
        this.$minApi.getStoreListRegister().then(res => {
            console.log(res)
            this.datas = res.list
            this.store_id = this.$parseURL().data.store_id ? this.$parseURL().data.store_id : this.datas[0].id
            this.getZhiWei(this.store_id)
        })
    },
    methods: {
        // 获取职位信息
        getZhiWei(store_id) {
            this.$minApi.getPositionList({
                type: this.ruzhi_type ? 2 : 1,
                store_id
            }).then(res => {
                console.log(res)
                this.zhiweidatas = res
                if (res.length > 0) {
                    this.zhiwei = res[0].position ? res[0].position : []
                }

            })
        },
        tuShen() {
            if (!this.user_name) return this.$showToast('成员姓名错误')
            if (!this.$minCommon.checkMobile(this.user_phone)) return this.$showToast('手机号错误')
            if (this.code.length !== 4 && !this.$parseURL().isShensStore) return this.$showToast('邀请码错误')
            // if (!this.department_id ) return this.$showToast('信息错误')
            // if (!this.position_id) return this.$showToast('信息错误')
            this.$minApi.postRegisterApply({
                phone: this.user_phone,
                user_name: this.user_name,
                store_id: this.store_id,
                type: this.ruzhi_type ? 2 : 1,
                department_id: this.department_id,
                position_id: this.position_id,
                invite_code: this.code
            }).then(res => {
                console.log(res)
                if (res.length === 0) {
                    this.$minRouter.push({
                        name: 'redsubmit-success',
                        type: "redirectTo",
                        params: {
                            isLoading: true,
                            phone: this.user_phone,
                            store_name: this.store_name,
                            zhiwei_info: this.zhiwei_info,
                            isNewUsers: true,
                            isStore: this.$parseURL().isShensStore ? true : false
                        }
                    })
                }
            })
            // this.$minRouter.push({
            //     name: 'redsubmit-success',
            //     type: "redirectTo",
            //     params: {
            //         isNewUsers: true,
            //         isStore: this.$parseURL().isShensStore ? true : false
            //     }
            // })
        },
        // 选择门店
        store_m(n) {
            // 门店申请
            if (this.$parseURL().isShensStore && !n) {
                return
            }
            // 门店
            if (!n) return this.bis3 = true
            // 职位
            if (n) return this.bis2 = true
            // 选择门店
            // if (!n && !this.ruzhi_type) return this.bis3 = true
            // if (!n && this.ruzhi_type) return this.bis3 = true
            // if (n && this.ruzhi_type) return this.bis2 = true
            // if (n && !this.ruzhi_type) return false
        },
        closse() {
            this.bis3 = false
        },
        closses() {
            this.bis2 = false
        },
        bindChange(e) {
            this.num = e.detail.value[0]
        },
        bindChanges(e) {
            this.zhi = e.detail.value
            this.zhiwei = this.zhiweidatas[e.detail.value[0]].position

        },
        cancel() {
            this.closse()
        },
        sures(n) {
            if (!n) {
                this.store_name = this.datas[this.num].store_name
                this.store_id = this.datas[this.num].id
                this.getZhiWei(this.datas[this.num].id)
                this.zhiweidatas = []
                this.zhiwei = []
                return this.cancel()
            }
            if (n) {
                this.zhiwei_info = this.zhiweidatas[this.zhi[0]].department_name + " " + this.zhiwei[this.zhi[1]].position_name
                this.department_id = this.zhiweidatas[this.zhi[0]].id
                this.position_id = this.zhiwei[this.zhi[1]].id
                this.zhiwei = this.zhiweidatas[0].position
                this.closses()
            }

        }
    },
    watch: {
        ruzhi_type(a) {
            console.log('123', a)
            this.zhiwei_info = ''
            if (a === 0) {
                this.getZhiWei(this.store_id)
                // this.zhiwei_info = '外联部-外联'
            }
            if (!a && !this.$parseURL().isShensStore) {
                uni.setNavigationBarTitle({
                    title: '新成员注册'
                });
                return this.isNewUser = true
            }
            uni.setNavigationBarTitle({
                title: '填写审核信息'
            });
            return this.isNewUser = false
        }
    }
}
</script>

<style lang="scss" scoped>
.top-view {
    width: 750rpx;
    height: 60rpx;
    background: #F0D0D0;
    color: #FF0000;
    padding-left: 50rpx;
    line-height: 60rpx;
}

.card {
    width: 690rpx;
    height: auto;
    background: #FFFFFF;
    border-radius: 10rpx;
    margin: 0 auto;

}

.btn {
    width: 690rpx;
    height: 88rpx;
    background: #FFE001;
    border-radius: 10rpx;
    text-align: center;
    line-height: 88rpx;
    margin: 60rpx auto;
}

.pickers {
    text-align: center;
    line-height: 70rpx;
    width: auto;
}

.active {
    color: #333;
    font-size: 42rpx;
    font-weight: bold;
}

.btn_viewcjq {
    width: 100%;
    height: 80rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30rpx;

    .btnsss {
        height: 28rpx;
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #3C4F7D;
    }

    .cancl {
        height: 28rpx;
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
    }
}
</style>
