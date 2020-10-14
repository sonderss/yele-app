<template>
<view class="product-details p-tb-20 p-lr-30">
    <swiper class="swiper" :circular="true" :autoplay="true" :interval="2000" :duration="500">
        <swiper-item v-for="(item,index) in list.setmeal_images" :key="index">
            <view class="swiper-item">
                <image :src="item" @error="imgerra" />
            </view>
        </swiper-item>
    </swiper>
    <view class="goods-item p-lr-20 m-bottom-20">
        <!-- <view class="top-view f28 m-top-10 f28">{{list.product_name}}</view> -->
        <view class="f28  t" style="display:block">
            <!-- {{item2.product_name}} -->
            <view class='aaaa top-view f28' v-if="list.is_limited">
                <text :class="list.limited_activity_name ? list.limited_activity_name.length < 4 ?   'discount_  min-ellipsis f26' :' discount min-ellipsis f26' : ''">
                    {{list.limited_activity_name}}
                </text>
                <text class="t f26">{{list.product_name}} </text>

            </view>
            <!-- <view class='aaaa f26' v-if="item2.sku.is_limited">
                                                <text :class="item2.limited_activity_name ? item2.limited_activity_name.length < 4 ?   'discount_  min-ellipsis f26' :' discount min-ellipsis f26' : ''">
                                                    {{item2.limited_activity_name}}
                                                </text>
                                                <view class="t f26">{{item2.product_name}} </view>

                                            </view> -->
            <view class="top-view f28" v-else>{{list.product_name}}</view>
        </view>
        <view class="botm-view">
            <view class="f22 m-bottom-20">
                <text class="price">￥{{list.price}}</text>
            </view>
        </view>
    </view>
    <view class="introduction " v-for="(item,index) in list.combination" :key="index">
        <!-- <view v-if="item.necessary === 1">
            <view class="title min-border-bottom m-bottom-30 p-lr-20">必选商品</view>
            <view class="content p-bottom-30" v-if="item.necessary === 1">
                <min-describe class="i" v-for="(item2,index2) in item.combination_detail" :key="index2" :leftIcon='true' :leftTxt="item2.product_name +'*'+ item2.num " :leftIconValue='item2.product_img'></min-describe>

            </view>
        </view> -->
        <view v-if="item.necessary === 1">
            <view class="title min-border-bottom m-bottom-30 p-lr-20" v-if="item.necessary === 1">必选商品</view>
            <view class="content " v-if="item.necessary === 1">
                <min-describe class="i" v-for="(item2,index2) in item.combination_detail" :key="index2" :leftIcon='true' :leftTxt="item2.product_name +'*'+ item2.num " :leftIconValue='item2.product_img'></min-describe>

            </view>
            <view style="background:#f7f7f7;width:100%;height:20rpx"></view>
            <!-- <view class="title min-border-bottom m-bottom-30 p-lr-20">
                <span>
                    <span class="left-txt min-ellipsis" style="width:120rpx;display:block;float:left">{{ item.combination_name }}</span>
                    <text>{{item.combination_detail.length}}选{{ item.last_number }}</text>
                    <text class="f28">{{item.is_check === 1 ? '（不可重复选）' : ''}}</text>
                </span>
                <text v-if="type !== 3" class="right-txt f26">已选 <text class="num1">{{item.goodsCount}}</text> 份</text>
            </view>
            <view class="content p-bottom-30" v-if="item.necessary === 1">
                <min-describe class="i" v-for="(item2,index2) in item.combination_detail" :key="index2" :leftIcon='true' :maxStep="1" :value="0" @changeCount="changeCount($event,index,index2)" :leftTxt="item2.product_name +'*'+ item2.num " :leftIconValue='item2.product_img' :step='type === 3 ? false: true' :Animation="true"></min-describe>
            </view> -->
        </view>
        <view v-else>
            <view class="title min-border-bottom m-bottom-30 p-lr-20">
                <span>
                    <span class="left-txt min-ellipsis" :style="{width: item.combination_name ? item.combination_name .length > 10 ? '300rpx':'auto' : '' ,display:'block',float:'left'}">{{ item.combination_name }}</span>
                    <text>{{item.combination_detail.length}}选{{ item.last_number }}</text>
                    <!-- <text class="f28">{{item.is_check === 1 ? '（不可重复选）' : ''}}</text> -->
                </span>
                <text v-if="type !== 3" class="right-txt f26">已选 <text class="num1">{{item.goodsCount}}</text> 份</text>
            </view>
            <view class="content p-bottom-30" v-if="item.necessary !== 1">
                <min-describe :isShowNone='item.goodsCount == item.last_number' @testEvent='tet' class="i" v-for="(item2,index2) in item.combination_detail" :key="index2" :isCan="item2.isCan" :leftIcon='true' :maxStep="item.is_check !== 1 ? (item.goodsCount !== item.last_number ? item.last_number : item.last_number - item.goodsCount) : item.last_number - item.goodsCount" :value="item2.step" @changeCount="changeCount($event,index,index2)" :leftTxt="item2.product_name +'*'+ item2.num " :leftIconValue='item2.product_img' :step='type === 3 ? false: true' :Animation="true"></min-describe>
            </view>
        </view>

    </view>
    <!-- <view class="introduction">
        <view class="title min-border-bottom m-bottom-30 p-lr-20">
           <text class="left-txt">饮料3选2（不可重复选）</text>
           <text  v-if="type !== 3" class="right-txt f26">已选 <text class="num">2</text> 份</text>
        </view>
        <view class="content p-bottom-30">
          <min-describe  class="i" v-for="(item,index) in 3" :key=index :leftIcon='true' leftTxt='冰红茶*25' :step='type === 3 ? false: true'></min-describe>
        </view>
    </view> -->
    <view class="empty_view"></view>
    <view class="btn" @click="subMit">确定</view>
</view>
</template>

<script>
export default {
    name: 'redpackages-detail',
    navigate: ['navigateTo', 'redirectTo'],
    data() {
        return {
            items: [],
            autoplay: true,
            interval: 2000,
            duration: 500,
            num: 0,
            num1: 2,
            num_prducts: 0,
            type: Number,
            list: {
                combination: [{
                    last_number: '',
                    combination_detail: []
                }]
            },
            selArr: [],
            selArr_in: [],
            detail: [{
                combination_detail: []
            }],
            delArr: [],
            testiD: {},
            isHaveBi: false,
            list_in: {}
        }
    },
    onLoad() {
        console.log(this.$parseURL())
    },
    mounted() {
        this.getData()
    },
    computed: {
        getCount() {
            let cou = 0
            this.list.combination.map(item => {
                item.combination_detail.map(item2 => {
                    cou += item2.step
                })
            })
            return cou
        }
    },
    watch: {
        selArr: {
            handler(a) {
                a.map((item, index) => {
                    if (item.combination_detail.length === 0) {
                        this.delArr.push(index)
                    }
                })
            },
            deep: true
        },
        delArr(a) {
            a.map(item => {
                this.selArr.splice(item)
            })
        },
        // list: {
        //     handler(a) {
        //         a.combination.map(item111 => {
        //             item111.combination_detail.map(item222222 => {
        //                 console.log(item222222)
        //                 this.aaaaaaa += item222222.step
        //             })
        //             // this.selArr.map(item => {
        //             //     console.log("123123123", item)
        //             //     if (item.id === item111.id) {
        //             //         this.$set(item111, "last_number", item111.last_number - item.combination_detail.length)
        //             //     }
        //             // })
        //         })

        //     },
        //     deep: true
        // }
    },
    methods: {
        getData() {
            this.$minApi.getOriderPackageDetails({
                    setmeal_id: this.$parseURL().data.product_id
                })
                .then(res => {
                    res.info.combination.map(item => {
                        item.combination_detail.map(item2 => {
                            item2.step = 0
                        })
                    })
                    this.list = res.info
                    if (this.list.setmeal_images.length <= 0) {
                        this.list.setmeal_images.push(this.list.product_img)
                    }
                    this.list.combination.map((item, index) => {
                        this.$set(item, 'goodsCount', 0)
                        // if (item.necessary === 1) {
                        //     item.combination_detail.map((item2, index2) => {
                        //         this.changeCount(1, index, index2)
                        //     })
                        // }
                        if (item.necessary) {
                            this.isHaveBi = true
                        }
                    })
                })
        },
        changeCount(n, index, index2) {
            // this.num_prducts = n
            this.list.combination[index].combination_detail[index2].step = n
            // this.list.combination[index].goodsCount += 1
            let num = 0
            this.list.combination[index].combination_detail.map(item2 => {
                num += item2.step
            })
            this.list.combination[index].goodsCount = num

            const item = {
                id: ''
            }

            // obj.combination = []
            item.id = this.list.combination[index].combination_detail[index2].comb_id
            item.combination_detail = []
            const item2 = {
                id: ''
            }
            item2.id = this.list.combination[index].combination_detail[index2].product_id
            item2.type = this.list.combination[index].combination_detail[index2].comb_type === 1 ? 'product' : 'service'
            item2.quantity = this.list.combination[index].combination_detail[index2].step
            item2.sku_id = this.list.combination[index].combination_detail[index2].sku_id
            item2.name = this.list.combination[index].combination_detail[index2].product_name
            item2.num_ = this.list.combination[index].combination_detail[index2].num
            item.combination_detail.push(item2)
            // let myIsSetID = {}
            // item.combination_detail.map(testDom => {
            //     myIsSetID.sku_id = item.id + '_' + testDom.sku_id + '_'
            //     myIsSetID.quantity = testDom.quantity + ''
            // })
            // item.myIsSetID = myIsSetID

            item.necessary = this.list.combination[index].necessary
            item.last_number = this.list.combination[index].last_number
            console.log(item)
            this.addGoods(item)
        },
        imgerra(e) {
            if (e.type === 'error') {
                this.list.setmeal_images.push('/static/images/bid-goods.png')
            }
        },
        tet() {
            console.log(12321123321)
            this.$showToast('已达上限/不可再选')
        },
        addGoods(obj) {
            if (this.selArr.length === 0) {
                this.selArr.push(obj)
                return
            }
            const resultF = this.selArr.some(item => {
                if (obj.id === item.id) {
                    const result = item.combination_detail.some(item2 => {
                        if (item2.sku_id === obj.combination_detail[0].sku_id) {
                            item2.quantity = obj.combination_detail[0].quantity
                            return true
                        }
                    })

                    if (!result) {
                        item.combination_detail.push(obj.combination_detail[0])
                        // this.selArr.push(obj)
                    }
                    if (item.id === obj.id) {
                        return true
                    }
                }

            })
            if (!resultF) {
                this.selArr.push(obj)
            }
        },
        addGoods_in(obj) {
            console.log("这里是obj", obj)
            if (this.$store.state.goods.orderSelArr.length === 0) return this.$store.state.goods.orderSelArr.push(obj)
            let a = true
            this.$store.state.goods.orderSelArr.map((item, index) => {
                // if (item.type === 'setmeal') {
                if (item.aaaaa === obj.aaaaa) {
                    this.$set(item, "step", item.step += 1)
                    return a = false
                }
            })
            if (a) {
                this.$store.state.goods.orderSelArr.push(obj)
                this.$store.state.goods.orderSelArr = this.$minCommon.arrSet(this.$store.state.goods.orderSelArr)
                this.$store.dispatch('goods/setOrderSelArr', this.$store.state.goods.orderSelArr)
                console.log("我的serlArr", this.$store.state.goods.orderSelArr)
            }
        },
        subMit() {
            const tempArr = JSON.parse(JSON.stringify(this.selArr))
            tempArr.map((item, index) => {
                item.combination_detail.map((item2, index2) => {
                    if (item2.quantity === 0) {
                        this.selArr[index].combination_detail.splice(index2, 1)
                    }
                })
            })
            this.list.combination.map((item, index) => {
                if (item.necessary === 1) {
                    item.combination_detail.map((item2, index2) => {
                        console.log('asddsadsaaaaaaaaaaaaaaaaaaaaaaaaa.00')
                        this.changeCount(1, index, index2)
                    })
                }

            })
            let myIsSetID = {}
            let u = []
            let lastStr = ''
            this.selArr.map((iytem, index) => {
                iytem.combination_detail.map((ite, ina) => {
                    u.push({
                        sku_id: iytem.id + '_' + ite.sku_id + '_',
                        quantity: ite.quantity + ''
                    })
                })
                u.map(itemq => {
                    lastStr += itemq.sku_id + itemq.quantity + '_'
                })
                iytem.myIsSetID = this.$minCommon.getMySkuID(lastStr)
            })
            // 有必选的情况
            if (this.isHaveBi) {
                // 这里默认添加必须商品
                // this.list.combination.map((item, index) => {
                //     if (item.necessary === 1) {
                //         item.combination_detail.map((item2, index2) => {
                //             console.log('asddsadsaaaaaaaaaaaaaaaaaaaaaaaaa.00')
                //             this.changeCount(1, index, index2)
                //         })
                //     }

                // })
                console.log("这里默认添加必须商品")
                const result = this.selArr.some(item => {
                    if (item.necessary && item.last_number === item.combination_detail.length) return true

                })
                if (!result) return this.$showToast('请选择必选商品')
            }
            if (this.selArr.length === 0) return this.$showToast('请选择符合要求的份数')
            // 没有必选的情况
            const result11 = this.selArr.some(item => {
                if (!item.necessary) {
                    console.log(item)
                    let count = 0
                    item.combination_detail.map(itemA => {
                        count += itemA.quantity
                    })
                    if (item.last_number !== count) return true
                }
            })
            const result22 = this.list.combination.some((item, index) => {
                if (!item.necessary) {
                    if (item.last_number !== item.goodsCount) {
                        return true
                    }

                }
            })
            if (result11) return this.$showToast('请选择符合要求的份数')
            if (result22) return this.$showToast('请选择完整套餐')
            if (this.$parseURL().data.isIndex) {
                // 添加购物车  并返回首页
                this.$minApi.getOriderPackageDetails({
                        setmeal_id: this.$parseURL().data.product_id
                    })
                    .then(res => {
                        this.list_in = res.info
                        this.list_in.type = 'setmeal'
                        this.list_in.step = 1
                        const obj = {}
                        Object.assign(obj, this.list_in)
                        obj.combination = this.selArr
                        let aaaaa = ''
                        obj.combination.map((item1, index1) => {
                            // aaaaa += item1.myIsSetID.quantity + '_' + item1.myIsSetID.sku_id
                            aaaaa = item1.myIsSetID
                        })
                        obj.aaaaa = aaaaa
                        this.addGoods_in(obj)
                        uni.navigateBack({
                            delta: 1
                        });
                        // this.$minRouter.push({
                        //     name: 'redplacean-order',
                        //     params: {
                        //         minim_charge: this.$parseURL().minim_charge,
                        //         desk_id: this.$parseURL().desk_id,
                        //         is_open_desk: this.$parseURL().is_open_desk,
                        //     }
                        // })
                    })
                return
            }
            this.$minRouter.push({
                name: 'redpackage-details',
                type: 'redirectTo',
                params: {
                    product_type: this.$parseURL().data.product_type,
                    minim_charge: this.$parseURL().data.minim_charge,
                    product_id: this.$parseURL().data.product_id,
                    desk_id: this.$parseURL().data.desk_id,
                    is_open_desk: this.$parseURL().data.is_open_desk,
                    product: this.selArr,
                    toPage: 1
                }
            })
        }
    }

}
</script>

<style lang="scss" scoped>
.product-details {
    .swiper {
        width: 690rpx;
        height: 690rpx;

        .swiper-item {
            width: 100%;
            height: 100%;

            image {
                width: 100%;
                height: 100%;
            }
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

        .aaaa {
            font-weight: bold;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .discount {
            width: 120rpx;
            height: 100%;
            font-size: 22rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #fff;
            background: #f80409;
            padding: 5rpx;
            margin-right: 10rpx;
            // display: block;
            line-height: 26rpx;
        }

        .discount_ {
            width: auto;
            height: 100%;
            font-size: 22rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #fff;
            background: #f80409;
            padding: 5rpx;
            margin-right: 10rpx;
            // display: block;
            line-height: 26rpx;
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
        margin-bottom: 20rpx;

        .title {
            width: 100%;
            height: 86rpx;
            line-height: 86rpx;
            display: flex;
            justify-content: space-between;

            .right-txt {
                color: #666666;

                .num {
                    color: #333;
                    font-weight: bold;
                    padding: 0 5rpx;
                }

                .num1 {
                    padding: 0 5rpx;
                }
            }
        }

        .i {
            margin: 20rpx 0;
        }
    }

    .btn {
        width: 100%;
        height: 98rpx;
        background: rgba(255, 224, 1, 1);
        position: fixed;
        bottom: 0;
        left: 0;
        font-size: 32rpx;
        color: rgba(51, 51, 51, 1);
        line-height: 98rpx;
        text-align: center;
    }
}

.empty_view {
    width: 100%;
    height: 100rpx;
}
</style>
