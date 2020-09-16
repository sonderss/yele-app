<template>
<view class="product-details p-tb-20 p-lr-30">
    <swiper class="swiper" :indicatorDots="false" :circular="true" :autoplay="autoplay" :interval="interval" :duration="duration">
        <swiper-item v-for="(item,index) in list.setmeal_images" :key="index">
            <view class="swiper-item">
                <image :src="item" />
            </view>
        </swiper-item>
    </swiper>
    <view class="goods-item p-lr-20 m-bottom-20">
        <view class="top-view f28 m-top-10 f28">{{list.product_name}}</view>
        <view class="botm-view">
            <view class="f28" style="color:#fe432a;font-weight:700">
                ￥
                <text class="price">{{list.price}}</text>
            </view>
            <!-- <min-stepper v-if="list.step" @change='changeChioce($event,list.id)' v-model="list.step"></min-stepper> -->
            <view class="m-right-10 m-bottom-20" style="width:40rpx;height:40rpx;" @click.stop="toDeatil">
                <image src="/static/images/yellow-add.png" style="width:100%" />
            </view>
        </view>
    </view>
    <min-describe @chincesku="toDeatil" :sku2="list.combination[0].combination_name" leftTxt="套餐组合"></min-describe>
    <view class="introduction m-top-20 p-lr-20">
        <view class="title min-border-bottom m-bottom-30">详细介绍</view>
        <view class="content p-bottom-30">
            {{list.info}}
        </view>
    </view>

    <min-goods-submit @leftClick='selectedEvent' @submit="submit" :goodsCount="countNums" buttonText='赠送' icon="/static/images/cart.png" :totalAmount="totalAmountE"></min-goods-submit>
    <!-- 已选商品 -->
    <min-popup :show="selected" @close='closeSelectedPop'>
        <view class="popview">
            <view class="top-view min-border-bottom ">
                <view>已选商品</view>
                <view class="right-view" @click="delAll">
                    <view class="icon-del m-right-10">
                        <image src='../../static/images/del.png' />
                    </view>
                    <view class="f22 clear">清空</view>
                </view>
            </view>

            <view class="main-sel-view p-lr-30 p-tb-30">
                  <scroll-view scroll-y :style="{ transition: top === 0 ? 'transform 300ms' : '',transform: 'translateY(' + top + 'rpx' + ')','height':'600rpx'}">

                      
                <view class="item" v-for="(item2,n) in selArr" :key="n">
                    <image :src="item2.product_img" mode="" />
                    <view class="content-view">
                        <view class="right-view-title">
                            <text class="f28 t" style="display:block">{{item2.product_name}}</text>
                            <text class="f26" style="color:#666666" v-if="item2.type === 'product' ">规格：{{item2.sku[0].sku_full_name}}</text>
                        </view>
                        <view class="right-view-bottom">
                            <view class="right-view-bottom-desc">
                                <text class="f20 t" v-if="item2.type === 'product'"><text style="color:#FF0000;font-size:30">￥{{item2.sku[0].sku_price}}</text></text>
                                <text class="f20 t" v-if="item2.type === 'service'"><text style="color:#FF0000;font-size:30">￥{{item2.price}}</text></text>
                                <text class="f20 t" v-if="item2.type === 'setmeal'"><text style="color:#FF0000;font-size:30">￥{{item2.price}}</text></text>

                            </view>
                            <view class="steper">
                                <min-stepper :isAnimation='false' v-model="item2.step" :min='0' @change="alDel($event,n)"></min-stepper>
                            </view>
                        </view>
                    </view>
                </view>
                  </scroll-view>

            </view>

        </view>
    </min-popup>
</view>
</template>

<script>
export default {
    name: 'package-details',
    navigate: ['navigateTo'],
    data() {
        return {
            item: [
                '../../static/images/bid-goods.png',
                '../../static/images/bid-goods.png',
                '../../static/images/bid-goods.png'
            ],
            indicatorDots: true,
            autoplay: true,
            interval: 2000,
            duration: 500,
            totalLabel: '2',
            buttonText: '2',
            count: 0,
            product_type: '',
            list: {
                combination: [{
                    combination_name: ''
                }]
            },
            selAllcaonimade: [],
            selArr1: [],
            selArr: [],
            selected: false,
            tcNum: 0,
            taocanItem: {
                combination: []
            },
            product: [],
            setmeal_id: '',
            desk_id: '',
            parseproducts: {},
            top:0
            // isDel: true
        }
    },
    onBackPress(options) {

        const pages = getCurrentPages(); //当前页
        const beforePage = pages[pages.length - 2]; //上个页面
        const page = pages[pages.length - 1]; //页面
        console.log(beforePage.route, page.route);
        if (options.from === 'backbutton') {
            console.log('navigateBack');
            if (beforePage.route !== page.route) {
                this.back(1);
                return true;
            } else {
                this.back(2);
                return true;
            }
        }
    },
    onLoad(option) {
        console.log(option)
        this.setmeal_id = option.setmeal_id
        this.desk_id = option.desk_id
        console.log(option.product)
        this.parseproducts = option.product
    },
    watch: {
        // selArr: {
        //     handler(a, b) {
        //         a.map((item, index) => {
        //             if (item.step === 0) {
        //                 return this.delArr.push(index)
        //             }
        //         })
        //         this.$store.dispatch('goods/setStoreSelArr', a)
        //     },
        //     deep: true
        // },
        // delArr(a) {
        //     a.map(item => {
        //         this.selArr.splice(item, 1)
        //     })
        // }
    },
    onShow() {
        this.selArr = this.$store.state.goods.storeSelArr
    },
    mounted() {
        this.$minApi.getOriderPackageDetails({
                setmeal_id: this.setmeal_id
            })
            .then(res => {
                res.info.combination.map(item => {
                    item.combination_detail.map(item2 => {
                        item2.step = 0
                    })
                })
                this.list = res.info
                this.list.commodity_count = this.commodity_count
                this.list.type = 'setmeal'
                if (this.parseproducts && this.parseproducts.length > 0) {
                    this.product = this.parseproducts
                    this.list.step = 1
                    const obj = {}
                    Object.assign(obj, this.list)
                    obj.combination = this.product
                    this.addGoods(obj)
                }
                if (this.list.setmeal_images.length <= 0) {
                    this.list.setmeal_images.push(this.list.product_img)
                }
                console.log(this.list)
            })
    },
    computed: {
        // 合计金额
        totalAmountE() {
            let sum = 0
            this.selArr.map(item => {
                if (item.type === 'product') {
                    sum += item.step * item.sku[0].sku_price
                } else {
                    sum += item.step * item.price
                }
            })
            return sum.toFixed(2)
        },
        countNums() {
            let num = 0
            for (let i = 0; i < this.selArr.length; i++) {
                num += this.selArr[i].step
            }
            return num
        }
    },
    methods: {
        // 套餐2级
        toDeatil() {
            // this.$minRouter.push({
            //   name: 'setmealdetail',
            //   params: { data: this.$parseURL() }
            // })
            uni.navigateTo({
                url: '/pages/give-away/setmealdetail?setmeal_id=' + this.setmeal_id + '&desk_id=' + this.desk_id
            })
        },
        back(a) {
            uni.navigateBack({
                delta: a
            });
        },
        addGoods(obj) {
            if (this.selArr.length === 0) return this.selArr.push(obj)
            const result = this.selArr.some(item => {
                // if (item.type === 'setmeal') {
                if (item.id !== obj.id) {
                    return true
                } else if (item.id === obj.id) {
                    // 这里是ID相同的情况
                    // item.combination = obj.combination
                    const aaaa = item.combination.some(objItem => {
                        const bbbb = obj.combination.some(itemItem => {
                            if (objItem.id !== itemItem.id) {
                                return true
                            } else if (objItem.id === itemItem.id) {
                                return objItem.combination_detail.some(detail => {
                                    return itemItem.combination_detail.some(combination_detail => {
                                        if (detail.sku_id !== combination_detail.sku_id) {
                                            return true
                                        }
                                    })
                                })
                            }
                        })
                        return bbbb
                    })
                    if (aaaa) return true
                }
                // }
            })
            if (result) {
                this.selArr.push(obj)
                this.selArr = this.$minCommon.arrSet(this.selArr)
                this.$store.dispatch('goods/setStoreSelArr', this.selArr)
            }
        },
        /** 已选商品弹出事件 */
        selectedEvent() {
            this.selected = true
        },
        /** 关闭已选商品弹出层 */
        closeSelectedPop() {
            this.selected = false
        },
        // 步进器
        changeChioce(e, id) {
            // this.taocanItem.quantity = e
            console.log(this.product)
            if (this.product.length === 0) return this.$showToast('请先选择套餐组合')
            this.selArr.map((item, index) => {
                if (item.id === id) {
                    item.step = e
                }
            })
            this.$store.dispatch('goods/setStoreSelArr', this.selArr)
        },
        delAll() {
            let arr = []
            for (let i = this.selArr.length - 1; i >= 0; i--) {
                arr.push(i)
            }
            arr.map(item => {
                this.selArr.splice(item, 1)
                this.$store.dispatch('goods/setStoreSelArr', this.selArr)
            })

            // this.selArr = []
        },
        // 已选弹出层删除事件
        alDel(n, index) {
            if (this.selArr[index].type === 'setmeal') {
                this.list.step = n
            }
            if (n === 0) {
                this.$nextTick(() => {
                    this.selArr.splice(index, 1)
                    this.$store.dispatch('goods/setStoreSelArr', this.selArr)
                })

            }
        },
        // 提交
        submit() {
            if (this.selArr.length === 0) return this.$showToast('请选择商品')
            const products = []
            this.selArr.map(item => {
                const obj = {}
                // 类型为商品
                if (item.type === 'product') {
                    obj.id = item.id
                    obj.type = item.type
                    obj.quantity = item.step
                    obj.combination = []
                    obj.sku_id = item.sku.id
                }
                // 类型为服务商品
                if (item.type === 'service') {
                    obj.id = item.id
                    obj.type = item.type
                    obj.quantity = item.step
                    obj.combination = []
                }
                // 类型为套餐
                if (item.type === 'setmeal') {
                    obj.id = item.id
                    obj.type = item.type
                    obj.quantity = item.step
                    obj.combination = item.combination
                }
                products.push(obj)
            })
            console.log(products)
            this.selArr = []
            this.$store.dispatch('goods/setStoreSelArr', this.selArr)
            this.$minApi.giveAwayOrder({
                desk_id: this.desk_id,
                products: JSON.stringify(products)
            }).then(res => {
                if (res.orderId) {
                    this.$showToast('提交成功')
                    console.log('获取到赠送单ID', this.orderId)
                    setTimeout(() => {
                        uni.navigateTo({
                            url: './giveawayorder?order_id=' + res.orderId
                        })
                    }, 2000)
                }
            })
        },
        // 删除选择项
        delItem(n) {
            this.selArr.splice(n, 1)
            this.$store.dispatch('goods/setStoreSelArr', this.selArr)
        },
        // 未选状态step按钮
        changeChioceT() {
            this.$showToast("请选择套餐组合")
        },
    }
}
</script>

<style lang="scss" scoped>
//
.product-details {
    .swiper {
        width: 690rpx;
        height: 690rpx;

        .swiper-item {
            width: 100%;
            height: 100%;
        }
    }

    .goods-item {
        width: 100%;
        height: 118rpx;
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .top-view {
            color: #333333;
            font-weight: bold;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .botm-view {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .price {
                color: #ff0006;
                font-size: 28rpx;
                font-weight: bold;
            }
        }
    }

    .introduction {
        width: 100%;
        background: #fff;
        margin-bottom: 100rpx;

        .title {
            width: 100%;
            height: 86rpx;
            line-height: 86rpx;
        }
    }
}

// 已选商品的弹出层
.popview {
    .top-view {
        width: 100%;
        height: 83rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 83rpx;
        background-color: #fff;
        padding: 0 30rpx;

        .clear {
            color: #666
        }

        .right-view {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 83rpx;

            .icon-del {
                width: 22rpx;
                height: 22rpx;
                display: flex;
                justify-content: center;
                align-items: center;

                image {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }

    }

    .main-sel-view {
        width: 100%;
        overflow: hidden;

        .item {
            display: flex;
            margin-bottom: 10rpx;
            height: 140rpx;

            &>image {
                width: 140rpx;
                height: 140rpx;
                margin-right: 16rpx;
            }

            .content-view {
                flex: 1;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: space-between;
                color: #333333;
                align-content: space-between;
                margin-bottom: 120rpx;

                .right-view-title {
                    .t {
                        width: 100%
                    }
                }

                .right-view-bottom {
                    height: 48rpx;
                    display: flex;
                    // position: relative;
                    justify-content: space-between;

                    .right-view-bottom-desc {
                        display: flex;
                        align-items: center;
                    }

                    .steper {
                        // position: absolute;
                        // right:0;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                    }
                }
            }
        }

    }

    .bottom-view-t {
        position: fixed;
        left: 0;
        bottom: 0;

    }

    .empty-view {
        width: 100%;
        height: 50rpx;
    }
}
</style>
