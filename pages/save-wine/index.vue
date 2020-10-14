<template>
<view class="save-wine p-tb-20 p-lr-20">
    <view class="goods-wrap p-lr-20">
        <view class="p-tb-30 min-border-bottom">来源于订单</view>
        <view class="goods-list p-t-10 p-bottom-20" v-if="list.from_order.length > 0">
            <view class="p-top-20" v-for="(item,index) in list.from_order" :key="index">
                <view style="background: #fff;">
                    <view class="goods-item">
                        <min-checkbox v-model="item.flag"></min-checkbox>
                        <image class="goods-icon" :src="item.product_img" @error="imgError($event,index,0)" />
                        <view class="goods-content">
                            <view class="goods-name">{{item.sku_full_name}}</view>
                            <view class="count-weap">
                                <view class="slider">
                                    <min-slider v-if="item.storage_type === 2" v-model="item.num" :max="100" />
                                </view>
                                <view class="stepper">
                                    <min-stepper v-if="item.storage_type === 2" :isAnimation="false" v-model="item.num" max="100" unit="%" />
                                    <view v-if="item.storage_type === 1">整瓶存</view>
                                </view>
                            </view>
                            <!-- <view class="goods-price">剩余50%</view> -->
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="none" v-else>暂无</view>
    </view>
    <!-- 来源于取酒 -->
    <!-- <view class="goods-wrap m-top-20 p-lr-20">
        <view class="p-tb-30 min-border-bottom">来源于取酒</view>
        <view class="goods-list p-t-10 p-bottom-20" v-if="list.from_fetch.length > 0">
            <view class="p-top-20" v-for="(item,index) in list.from_fetch" :key="index">
                <view style="background: #fff;">
                    <view class="goods-item">
                        <min-checkbox v-model="item.flag"></min-checkbox>
                        <image class="goods-icon" :src="item.product_img" @error="imgError($event,index,1)" />
                        <view class="goods-content">
                            <view class="goods-name">{{item.sku_full_name}}</view>
                            <view class="count-weap">
                                <view class="slider">
                                    <min-slider v-if="item.storage_type === 2" v-model="item.num" max="100" />
                                </view>
                                <view class="stepper">
                                    <min-stepper v-if="item.storage_type === 2" :isAnimation="false" v-model="item.num" max="100" unit="%" />
                                    <view v-if="item.storage_type === 1">整瓶存</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="none" v-else>暂无</view>
    </view> -->
    <view class="client_desc p-lr-20 m-top-20">
        <min-desc-input sign="*" desc="客户姓名" v-model="name"></min-desc-input>
        <min-desc-input sign="*" :border="false" desc="联系方式" v-model="phone" :maxlength="11"></min-desc-input>
    </view>
    <view class="btn" @click="save">提交</view>
</view>
</template>

<script>
export default {
    name: 'save-wine',
    navigate: ['navigateTo'],
    onLoad() {
        console.log(this.$parseURL())
        this.$minApi.getSaveWineList({
                opening_id: this.$parseURL().open_id
            })
            .then(res => {
                res.from_order.map(item => {
                    item.num = 100
                })
                res.from_fetch.map(item => {
                    item.num = 100
                })
                this.list = res
                console.log(this.list)
                if (this.$parseURL().name || this.$parseURL().phone) {
                    this.name = this.$parseURL().name
                    this.phone = this.$parseURL().phone
                    return
                }
                this.name = res.client_name
                this.phone = res.client_mobile
            })
    },
    data() {
        return {
            count: 100,
            list: {
                from_order: [],
                from_fetch: []
            },
            imgErro: false,
            name: '',
            phone: ''
        }
    },
    methods: {
        imgError(e, index, n) {
            if (n) {
                if (e.type === 'error') {
                    // this.imgErro = true
                    this.$set(this.list.from_fetch[index], 'product_img', '/static/images/goods.png')
                }
            }
            if (!n) {
                if (e.type === 'error') {
                    // this.imgErro = true
                    this.$set(this.list.from_order[index], 'product_img', '/static/images/goods.png')
                }
            }

        },
        save() {
            // saveWinePost
            /**
             * order_id 订单ID   opening_id apply_data  client_name:this.name,client_mobile:this.phone
             * [{"sku_id":"27","ratio":"100"}]
             */
            if (!this.name) return this.$showToast("客户名称错误")
            if (!this.$minCommon.checkMobile(this.phone)) return this.$showToast("手机号填写错误")
            if (this.list.from_order.length <= 0) return this.$showToast("暂无可存的酒")
            const options = {
                apply_data: []
            }
            this.list.from_order.map((item, index) => {
                if (item.flag) {
                    options.order_id = item.order_id
                    options.apply_data.push({
                        sku_id: item.sku_id,
                        // ratio: item.quantity,
                        ratio: item.num,
                        // unique_code: item.unique_code
                    })
                }
            })
            // this.list.from_fetch.map((item, index) => {
            //     if (item.flag) {
            //         options.order_id = item.order_id
            //         // options.apply_data.push(item.sku_id + item.quantity)
            //         options.apply_data.push({
            //             sku_id: item.sku_id,
            //             // ratio: item.quantity,
            //             ratio: item.num,
            //             unique_code: item.unique_code
            //         })
            //     }
            // })

            options.client_name = this.name
            options.client_mobile = this.phone
            options.opening_id = this.$parseURL().open_id
            console.log(options);
            this.$minApi.saveWinePost({
                    client_name: this.name,
                    client_mobile: this.phone,
                    order_id: options.order_id,
                    opening_id: options.opening_id,
                    apply_data: JSON.stringify(options.apply_data)
                })
                .then(res => {
                    console.log(res)
                    if (res.length === 0) {
                        uni.showToast({
                            title: '提交成功',
                            icon: 'none',
                            duration: 2000
                        })
                        setTimeout(() => {
                            this.$minRouter.push({
                                name: 'platform-admin'
                            })
                        }, 2000)
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.goods-wrap {
    background: #fff;
    margin-bottom: 10rpx;

    .goods-item {
        display: flex;

        .goods-icon {
            height: 140rpx;
            flex: 0 0 140rpx;
        }

        .goods-content {
            flex: 1;
            display: block;
            padding-left: 10rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;

            .goods-name {
                font-size: 28rpx;
            }

            .goods-price {
                font-size: 24rpx;
                color: #FF0000;
            }

            .goods-size {
                color: #666;
                font-size: 24rpx;

                .count {
                    color: #666;
                    font-size: 24rpx;
                    float: right;
                }
            }
        }

        .count-weap {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-left: -20rpx;

            .slider {
                flex: 0 0 60%;
            }
        }
    }
}

.btn {
    width: 100%;
    height: 98rpx;
    background: rgba(255, 224, 1, 1);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    text-align: center;
    line-height: 98rpx;
}

.client_desc {
    width: 100%;
    height: 200rpx;
    background: #fff;
    margin-bottom: 140rpx;
}

.none {
    width: 100%;
    height: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
