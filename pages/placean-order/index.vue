<template>
<view class="list_box">
    <view class="left" @touchmove.stop.prevent="moveHandle" v-if="mainArray.length !== 0">
        <scroll-view :scroll-into-view="scrollIntoleft" scroll-y="true" :show-scrollbar="false" :style="{height:scrollHeight,  width: '160rpx'}" scroll-with-animation="true">
            <!-- <view style="height:80rpx"></view> -->
            <list>
                <cell :id="`itemleft-${index}`" v-for="(item,index) in mainArray" :key="item.id" class="item" @tap="leftTap(index)" :class="{ 'active':index==leftIndex }" :data-index="index">{{item.cate_name}}</cell>
            </list>
            <!-- <view :id="`itemleft-${index}`" v-for="(item,index) in mainArray" :key="item.id" class="item" @tap="leftTap(index)" :class="{ 'active':index==leftIndex }" :data-index="index">{{item.cate_name}}</view> -->
            <view style="height:120rpx"></view>
        </scroll-view>
    </view>
    <view class="main" @touchmove.stop.prevent="moveHandle">
        <scroll-view @scrolltoupper='isTopDom' :show-scrollbar="false" :style="{ 'height':scrollHeight}" @scrolltolower="testBottom" scroll-y="true" @scroll="mainScroll" :scroll-into-view="scrollInto" scroll-with-animation="true">
            <!-- <view style="height:20rpx"></view> -->
            <list style="width: 100%;height: 800rpx">
                <cell v-for="(item,index) in mainArray" :key="index" :id="`item-${index}`">
                    <cell class="item_name">{{item.cate_name}}</cell>
                    <cell v-for="(item2,index2) in item.product" :key="index2" @click.stop="goDetails(index,index2)">
                        <min-goods-chioce :producetype='item2.type' style="margin-right:25rpx" :image="item2.product_img" :discountdesc="item2.limited_activity_name" :discountPrice="item2.original_price" :discount="item2.is_limited === 1 ? true: false " :title="item2.product_name" :badgeTxt="item2.type === 'setmeal' ? '套餐': '' " :badge="item2.type === 'setmeal'? true : false " @changes="changeChioce(index,index2)" v-model="item2.step" @changesPop="changesPopNoStep(index,index2,item2.type)" :desc="item2.sku.length >=1 ? `规格：${item2.sku[0].sku}` : item2.info " :price="item2.price" :isFlag="item2.isFlag">
                        </min-goods-chioce>
                    </cell>
                </cell>

            </list>
            <view style="height:120rpx;"></view>
        </scroll-view>

    </view>
    <!-- 底部按钮 -->
    <view class="bottom-view" v-if="mainArray.length !== 0">
        <min-goods-submit icon="/static/images/cart.png" bottomcolot="#666" @leftClick="selectedEvent" :totalAmount="totalAmountE" :totalLabel="$parseURL().is_open_desk ? '' :totalLabel" :goodsCount="countNums" buttonText="去下单" @submit="submit" leftV="90" topV="20"></min-goods-submit>
    </view>
    <!-- 选择规格 -->
    <min-popup :show="isSelSku" @close="closeSelectedSkuPop" :heightSize="skuObj.sku.length < 3 ? '700' : '850' ">
        <view>
            <view class="skuTop">
                <view class="leftView">
                    <view class="img-view">
                        <image :src="skuObj.sku[chioceIndex].sku_img" @error="imageErro2" />
                    </view>
                    <!-- sku信息 -->
                    <view class="sku-view">
                        <view class="f24 dissss" :style="{width: skuObj.limited_activity_name.length < 4 ?  '100rpx':'' }" v-if="skuObj.sku[chioceIndex].is_limited">{{this.skuObj.limited_activity_name}}</view>
                        <text class="f24 t">{{skuObj.product_name}}</text>
                        <text class="f24 m-tb-10 t">已选："{{skuObj.sku[chioceIndex].sku_full_name}}"</text>
                        <text class="f30 m">
                            ￥
                            <text class="money">{{skuObj.sku[chioceIndex].sku_price}}</text>
                            <text class="dissss_d" v-if="skuObj.sku[chioceIndex].is_limited">￥{{skuObj.sku[chioceIndex].original_price}}</text>
                        </text>
                    </view>
                </view>
            </view>
            <view class="min-border-bottom m-lr-30"></view>
            <scroll-view :class=" skuObj.sku.length < 3 ? 'sku-item-num' : 'sku-item'" scroll-y :style="{ transition: top === 0 ? 'transform 300ms' : '',transform: 'translateY(' + top + 'rpx' + ')',height:skuObj.sku.length >= 3 ? '280rpx':''}">
                <!-- 可选择规格项 -->
                <view>
                    <view class="f26">规格</view>
                    <view class="item-view p-right-20">
                        <!--  chioceIndex === index ?   ' t' : 'item t'  -->
                        <view :style="{'margin-right': (index+1) % 3===0 ? '0' : '20rpx'}" :class="['t' ,{'item-active': chioceIndex === index ? true :false ,'item':  chioceIndex !== index} ]" @click="chioceO(index)" v-for="(item,index) in skuObj.sku" :key="index">{{item.sku}}</view>
                    </view>
                </view>
            </scroll-view>
            <view class="min-border-bottom m-lr-30"></view>
            <!-- 数量 -->
            <view class="sku-item1">
                <view class="f26">数量</view>
                <view class="m-tb-30">
                    <min-stepper :isAnimation="false" :min='1' v-model="skuObj.step"></min-stepper>
                </view>
            </view>
            <view class="btn-sku" @click="skuChioce">确定</view>
        </view>
    </min-popup>
    <!-- 已选商品 -->
    <!-- <min-popup :show="selected" @close="closeSelectedPop">
        <view class="popview">
            <view class="p-lr-20">
                <view class="top-view min-border-bottom">
                    <text>已选商品</text>
                    <view class="right-view" @click.stop="delAll">
                        <view class="icon-del m-right-10">
                            <image src="/static/images/del.png" />
                        </view>
                        <text class="f22 clear">清空</text>
                    </view>
                </view>
            </view>
            <view class="main-sel-view p-lr-30 m-top-20" style="margin-bottom:300rpx" @touchstart="start" @touchmove="move" @touchend="end">
                <scroll-view scroll-y :style="{ transition: top === 0 ? 'transform 300ms' : '',transform: 'translateY(' + top + 'rpx' + ')','height':'600rpx'}">
                    <view class="item" v-for="(item2,n) in selArr" :key="n">
                        <image :src="item2.type !== 'setmeal' ? (item2.sku.sku_img ? item2.sku.sku_img  : item2.product_img  ):item2.product_img " @error="imageErro($event,n)" />
                        <view class="content-view">
                            <view class="right-view-title">
                                <view class="f28 t" style="display:block">{{item2.product_name}}</view>
                                <view class="f24 t m-top-10" style="color:#666666;display:block;font-weight:normal" v-if="item2.type === 'product'">规格：{{item2.sku.sku_full_name}}</view>
                                <view class="f24 t m-top-10" style="color:#666666;display:block;font-weight:normal" v-if="item2.type === 'setmeal'">
                                    规格：
                                    <template v-for="(desc,aa) in item2.combination">
                                        <view :key="aa">
                                            <template v-for="(desc1,abc) in desc.combination_detail">
                                                <view :key="abc" class="m-left-10">{{desc1.name}}*{{desc1.num_}}</view>
                                            </template>
                                        </view>

                                    </template>

                                </view>
                                <text class="f26 t  m-top-10" style="color:#666666;display:block;font-weight:normal" v-if="item2.type === 'service'">规格：{{ item2.info }}</text>
                            </view>
                            <view class="right-view-bottom">
                                <view class="right-view-bottom-desc">
                                    <view class="f20 t" v-if="item2.type === 'product'">
                                        ￥
                                        <text style="color:#FF0000;font-size:30">{{item2.is_limited || item2.sku.sku_price ?  item2.sku.sku_price  :  item2.price}}</text>
                                    </view>
                                    <view class="f20 t" v-if="item2.type === 'service'">
                                        ￥
                                        <text style="color:#FF0000;font-size:30">{{item2.price}}</text>
                                    </view>
                                    <view class="f20 t" v-if="item2.type === 'setmeal'">
                                        ￥
                                        <text style="color:#FF0000;font-size:30">{{item2.price}}</text>
                                    </view>
                                </view>
                                <view class="steper">
                                    <min-stepper :isAnimation="false" v-model="item2.step" @change="alDel($event,n)"></min-stepper>
                                </view>
                            </view>
                        </view>
                    </view>

                </scroll-view>
            </view>
            <view class="bottom-view-t">
                <min-goods-submit icon="/static/images/cart.png" style="position:fixed" :totalAmount="totalAmountE" :goodsCount="countNums" buttonText="去下单" @submit="submit" leftV="90" topV="20"></min-goods-submit>
            </view>
        </view>
    </min-popup> -->
    <!-- 测试 -->
    <view class="aaaaaaa">
        <view class="min-popup" v-if="selected" :class="[selected ? 'min-show' : 'min-hide']" @touchmove.stop.prevent="moveHandless">
            <view class="min-overlay" @click.stop="closess"></view>
            <view class="min-content">
                <view class="popview">
                    <view class="p-lr-20">
                        <view class="top-view min-border-bottom">
                            <text>已选商品</text>
                            <view class="right-view" @click.stop="delAll">
                                <view class="icon-del m-right-10">
                                    <image src="/static/images/del.png" />
                                </view>
                                <text class="f22 clear">清空</text>
                            </view>
                        </view>
                    </view>
                    <view class="main-sel-view p-lr-30 m-top-20" style="margin-bottom:300rpx" @touchstart="start" @touchmove="move" @touchend="end">
                        <scroll-view scroll-y :style="{ transition: top === 0 ? 'transform 300ms' : '',transform: 'translateY(' + top + 'rpx' + ')','height':'600rpx'}">
                            <view class="item" v-for="(item2,n) in selArr" :key="n">
                                <image :src="item2.type !== 'setmeal' ? (item2.sku.sku_img ? item2.sku.sku_img  : item2.product_img  ):item2.product_img " @error="imageErro($event,n)" />
                                <view class="content-view">
                                    <view class="right-view-title">
                                        <view class="f28  t" style="display:block">
                                            <!-- {{item2.product_name}} -->
                                            <view class='aaaa f26' v-if="item2.is_limited || item2.sku.is_limited">
                                                <text :class="item2.limited_activity_name ? item2.limited_activity_name.length < 4 ?   'discount_  min-ellipsis f26' :' discount min-ellipsis f26' : ''">
                                                    {{item2.limited_activity_name}}
                                                </text>
                                                <text class="t f26">{{item2.product_name}} </text>

                                            </view>
                                            <!-- <view class='aaaa f26' v-if="item2.sku.is_limited">
                                                <text :class="item2.limited_activity_name ? item2.limited_activity_name.length < 4 ?   'discount_  min-ellipsis f26' :' discount min-ellipsis f26' : ''">
                                                    {{item2.limited_activity_name}}
                                                </text>
                                                <view class="t f26">{{item2.product_name}} </view>

                                            </view> -->
                                            <view class="t f26" v-else>{{item2.product_name}}</view>
                                        </view>
                                        <view class="f24 t m-top-10" style="color:#666666;display:block;font-weight:normal" v-if="item2.type === 'product'">规格：{{item2.sku.sku}}</view>
                                        <view class="f24 t m-top-10" style="color:#666666;display:block;font-weight:normal" v-if="item2.type === 'setmeal'">
                                            规格：
                                            <template v-for="(desc,aa) in item2.combination">
                                                <text :key="aa">
                                                    <template v-for="(desc1,abc) in desc.combination_detail">
                                                        <text style="color:#666666;font-weight:normal" :key="abc" class="f24  m-left-10">{{desc1.name}}*{{desc1.num_}}</text>
                                                    </template>
                                                </text>

                                            </template>

                                        </view>
                                        <text class="f26 t  m-top-10" style="color:#666666;display:block;font-weight:normal" v-if="item2.type === 'service'">规格：{{ item2.info }}</text>
                                    </view>
                                    <view class="right-view-bottom">
                                        <view class="right-view-bottom-desc">
                                            <view class="f20 t" v-if="item2.type === 'product'">

                                                <text style="color:#FF0000;font-size:30">￥{{item2.is_limited || item2.sku.sku_price ?  item2.sku.sku_price  :  item2.price}}</text>
                                            </view>
                                            <view class="f20 t" v-if="item2.type === 'service'">

                                                <text style="color:#FF0000;font-size:30"> ￥{{item2.price}}</text>
                                            </view>
                                            <view class="f20 t" v-if="item2.type === 'setmeal'">
                                                <text style="color:#FF0000;font-size:30"> ￥{{item2.price}}</text>
                                            </view>
                                            <view v-if="item2.sku.is_limited && item2.type === 'product'">
                                                <text class="f24 tha"> ￥{{item2.sku.original_price}}</text>
                                            </view>
                                            <view v-if="item2.is_limited  && item2.type !== 'product'">
                                                <text class="f24 tha"> ￥{{item2.original_price}}</text>
                                            </view>
                                        </view>
                                        <view class="steper">
                                            <min-stepper :isAnimation="false" v-model="item2.step" @change="alDel($event,n)"></min-stepper>
                                        </view>
                                    </view>
                                </view>
                                <!-- 套餐标识 -->
                                <view class="isTaocan" v-if="item2.type === 'setmeal'">套餐</view>
                            </view>

                        </scroll-view>
                    </view>
                    <!-- <view class="empty-view"></view> -->
                    <view class="bottom-view-t">
                        <min-goods-submit icon="/static/images/cart.png" style="position:fixed" :totalAmount="totalAmountE" :goodsCount="countNums" buttonText="去下单" @submit="submit" leftV="90" topV="20"></min-goods-submit>
                    </view>
                </view>
            </view>
        </view>

    </view>
    <!-- 测试 -->
    <view class="data_bull" v-if="mainArray.length === 0">
        <min-404 id="none" />
    </view>
</view>
</template>

<script>
export default {
    name: 'redplacean-order',
    navigate: ['navigateTo', 'redirectTo'],
    data() {
        return {
            scrollHeight: '1000px',
            leftArray: [],
            mainArray: [],
            topArr: [],
            leftIndex: 0,
            chioceIndex: 0,
            buttonLabel: '', // 已开台
            totalLabel: '', // 台位低消
            scrollInto: '',
            scrollIntoleft: '',
            skuObj: {
                sku: [{
                    sku_full_name: ''
                }]
            }, // 选择规格项
            isDel: true, //  所需删除的已选列表中对应项
            errImg: false,
            isSkuNum: 0, // 选择规格弹出层的数量
            isSelSku: false, // 选择规格
            // indexDel: Number, // 所需删除的已选列表中的索引
            selArr: [], // 已选商品列表
            android: '',
            testIndex: Number,
            delArr: [], // 所需删除索引
            selected: false, // 已选商品弹出层
            tempId: {
                index: '',
                index2: ''
            },
            load: '',
            top: '',
            lastY: '',
            isaaaa: true,
            colors: '#666'
        }
    },
    onLoad() {
        uni.getSystemInfo({
            success: res => {
                /* 设置当前滚动容器的高，若非窗口的高度，请自行修改 */
                this.scrollHeight = `${res.windowHeight}px`
            },
        })
        this.android = uni.getSystemInfoSync().platform
        // this.totalLabel = `台位低消：${this.$parseURL().minim_charge}`
        // if (this.$store.state.goods.orderTempData.length > 0) {
        //     uni.showLoading({
        //         title: '加载中'
        //     })
        //     this.mainArray = this.$store.state.goods.orderTempData
        //     this.$nextTick(() => {
        //         this.getElementTop1()
        //     })
        //     return
        // }
        this.$nextTick(() => {
            this.getListData()
        })
    },
    onBackPress() {
        this.selArr = []
        this.$store.dispatch('goods/setOrderSelArr', [])
    },
    computed: {
        // 合计金额
        totalAmountE() {
            let sum = 0
            this.selArr.map(item => {
                if (item.type === 'product') {
                    console.log(item)
                    if (item.is_limited || item.sku.sku_price) {
                        sum += item.step * item.sku.sku_price // item2.is_limited ?  item2.sku.sku_price  :  item2.price
                    } else {
                        sum += item.step * item.price
                    }
                } else {
                    sum += item.step * item.price
                }
                this.$store.dispatch('goods/setOrderSelArr', this.selArr)
            })
            return sum.toFixed(2)
        },
        // 监听所选数量
        countNums() {
            let num = 0
            for (let i = 0; i < this.selArr.length; i++) {
                num += this.selArr[i].step
            }
            return num
        },
    },
    onShow() {
        this.selArr = this.$store.state.goods.orderSelArr
    },
    watch: {
        selArr: {
            handler(a, b) {
                if (a.length === 0) {
                    console.log('asddsdsadsaaaaaaaaaaaa')
                    this.mainArray.map(item => {
                        if (item.product && item.product.length > 0) {
                            item.product.map((item2, index2) => {
                                this.$set(item2, 'step', 0)
                                // this.$nextTick(() => {
                                //     item2.step = 0
                                // })
                            })
                        }
                    })
                    // return
                }
                a.map((item, index) => {
                    if (item.step === 0) {
                        this.$nextTick(() => {
                            a.splice(index, 1)
                            console.log('123133333333333')
                        })
                        console.log(a)
                        this.$store.dispatch('goods/setOrderSelArr', a)
                        this.mainArray.map(item1 => {
                            if (item1.product && item1.product.length > 0) {
                                item1.product.map((item2, index2) => {
                                    // if (item2.type === 'product' && item2.step === 0 && item2.sku.length > 1) {
                                    //     console.log(132213231213312231)
                                    //     if (item.id && item.id === item2.sku[0].id) {
                                    //         // 重置多规格商品
                                    //         item2.isFlag = false
                                    //     }
                                    // }
                                    // type == product 且商品只有一个一下的sku
                                    if (item2.type === 'product' && item2.id === item.id && item2.sku.length <= 1) {
                                        return this.$set(item2, 'step', 0)
                                    }
                                    // type == product 且商品不止一个sku
                                    if (item2.type === 'product' && item2.id === item.id && item2.sku.length > 1) {
                                        item2.isFlag = false
                                        return this.$set(item2, 'step', 0)
                                    }
                                    if (item2.type === 'service' && item2.id === item.id) {
                                        return this.$set(item2, 'step', 0)
                                    }
                                })
                            }
                        })
                    } else {

                        this.test(item.step, item.id, item.type)
                    }
                })
            },
            deep: true,
        },
        mainArray(a) {
            a.map((item, index) => {
                if (item.product.length === 0) {
                    a.splice(index, 1)
                }
                item.product.map(item2 => {
                    if (item2.type === 'product' && item2.sku.length > 1) {
                        this.$set(item2, 'isFlag', false)
                        this.$set(item2, 'isPro', true)
                    } else if (item2.type === 'setmeal') {
                        this.$set(item2, 'isFlag', false)
                    } else {
                        this.$set(item2, 'isFlag', true)
                    }
                })
            })
        },
    },
    methods: {
        test(step, id, type) {
            this.mainArray.map(item => {
                if (item.product && item.product.length > 0) {
                    item.product.map((item2, index2) => {
                        if (
                            item2.type === 'product' &&
                            type === 'product' &&
                            item2.sku.length > 0 &&
                            id == item2.id
                        ) {
                            // 禁止多规格恢复按钮
                            // item2.isFlag = true
                            item2.step = step
                        }
                        if (
                            item2.type === 'service' &&
                            type === 'service' &&
                            id == item2.id
                        ) {
                            item2.step = step
                        }
                    })
                }
            })
        },
        /* 获取列表数据 getProductList */
        getListData() {
            this.b()
        },
        moveHandle() {

        },
        b(images) {
            // console.log("images", images)
            this.$minApi.getOrderProduceList({
                isLoading: true
            }).then(res => {
                uni.showLoading({
                    title: '加载中'
                });
                // let temp = []
                // for (const val of res.list) {
                //     val.product.map(item2 => {
                //         // if (images.indexOf(item2.product_img.split('/')[6])) {
                //         //     console.log("item2.product_img.split('/')[6]")
                //         //     console.log("item3", images.indexOf(item2.product_img.split('/')[6]))
                //         //     this.$set(item2, 'product_img', item3)
                //         // }
                //         // if (item2.product_img.split('/')[6] == item3.split('/')[3]) {
                //         //     console.log("item2.product_img.split('/')[6]")
                //         //     console.log("item3", item3)
                //         //     this.$nextTick(() => {
                //         //         this.$set(item2, 'product_img', item3)
                //         //     })
                //         //     return
                //         // }
                //         if (item2.type === 'product' && item2.sku.length > 1) {
                //             this.$set(item2, 'isFlag', false)
                //             this.$set(item2, 'isPro', true)
                //         } else if (item2.type === 'setmeal') {
                //             this.$set(item2, 'isFlag', false)
                //         } else {
                //             this.$set(item2, 'isFlag', true)
                //         }
                //     })
                //     //  else {
                //     //     return isRestart = true
                //     // }
                //     // switch (item2.product_img.split('/')[6]) {
                //     //     case item3.split('/')[3]:
                //     //         this.$set(item2, 'product_img', item3)
                //     //         break
                //     // }
                //     //       images.map(item3 => {
                //     // })
                // }
                // // if (isRestart) {
                // //     uni.removeStorage({
                // //         key: 'images',
                // //         success: (res) => {
                // //             this.a()
                // //         }
                // //     });
                // // }

                this.mainArray = res.list
                console.log(this.mainArray)
                this.$store.dispatch('goods/seOrderTempData', res.list)
                this.$nextTick(() => {
                    this.getElementTop()
                    uni.hideLoading();
                })
            })
        },
        a() {
            this.$minApi.getOrderProduceList().then(res => {
                this.mainArray = res.list
                this.$store.dispatch('goods/seOrderTempData', res.list)
                let temp = []
                uni.getStorage({
                    key: 'images',
                    complete: res => {
                        console.log(res)
                        if (res.data) {
                            console.log(JSON.parse(res.data))
                            this.b(JSON.parse(res.data))
                            return
                        } else {
                            for (const val of this.mainArray) {
                                val.product.map(item2 => {
                                    // #ifdef APP-PLUS
                                    uni.downloadFile({
                                        url: item2.product_img,
                                        success: res => {
                                            temp.push(res.tempFilePath)
                                            uni.setStorage({
                                                key: 'images',
                                                data: JSON.stringify(temp),
                                                success: function () {
                                                    console.log('success')
                                                },
                                            })
                                            console.log("res.tempFilePath", res.tempFilePath)
                                            this.$set(item2, 'product_img', res.tempFilePath ? res.tempFilePath : item2.product_img)
                                        },
                                    })
                                    // #endif
                                    if (item2.type === 'product' && item2.sku.length > 1) {
                                        this.$set(item2, 'isFlag', false)
                                        this.$set(item2, 'isPro', true)
                                    } else if (item2.type === 'setmeal') {
                                        this.$set(item2, 'isFlag', false)
                                    } else {
                                        this.$set(item2, 'isFlag', true)
                                    }
                                })
                            }
                            this.$nextTick(() => {
                                this.getElementTop()
                            })
                        }
                    },
                })
            })
        },
        /* 获取元素顶部信息 */
        async getElementTop1() {
            /* Promise 对象数组 */
            // eslint-disable-next-line camelcase
            const p_arr = []
            /* 新建 Promise 方法 */
            // eslint-disable-next-line camelcase
            const new_p = selector => {
                return new Promise((resolve, reject) => {
                    const view = uni.createSelectorQuery().select(selector)
                    view
                        .boundingClientRect(data => {
                            resolve(data.top)
                        })
                        .exec()
                })
            }
            /* 遍历数据，创建相应的 Promise 数组数据 */
            this.mainArray.forEach((item, index) => {
                p_arr.push(new_p(`#item-${index}`))
            })
            /* 所有节点信息返回后调用该方法 */
            await Promise.all(p_arr).then(data => {
                this.topArr = data
            })
            uni.hideLoading()
        },
        /* 获取元素顶部信息 */
        async getElementTop() {
            /* Promise 对象数组 */
            // eslint-disable-next-line camelcase
            const p_arr = []
            /* 新建 Promise 方法 */
            // eslint-disable-next-line camelcase
            const new_p = selector => {
                return new Promise((resolve, reject) => {
                    const view = uni.createSelectorQuery().select(selector)
                    view
                        .boundingClientRect(data => {
                            resolve(data.top)
                        })
                        .exec()
                })
            }
            /* 遍历数据，创建相应的 Promise 数组数据 */
            this.mainArray.forEach((item, index) => {
                p_arr.push(new_p(`#item-${index}`))
            })
            /* 所有节点信息返回后调用该方法 */
            await Promise.all(p_arr).then(data => {
                this.topArr = data
            })
        },
        /* 主区域滚动监听 */
        mainScroll(e) {
            // this.$minCommon.debounce(this.testHua(e))
            const top = e.detail.scrollTop;
            if (top === 0) {
                this.leftIndex = 0;
                this.scrollIntoleft = `itemleft-${0}`
                return
            }
            let index = 0;
            /* 查找当前滚动距离 */
            for (let i = this.topArr.length - 1; i >= 0; i--) {
                if (top + 100 >= this.topArr[i]) {
                    index = i;
                    break;
                }
            }
            this.leftIndex = index < 0 ? 0 : index;
            this.scrollIntoleft = `itemleft-${index}`
        },
        isTopDom(e) {
            console.log(e)
            this.$nextTick(() => {
                this.leftIndex = 0
                this.scrollIntoleft = `itemleft-${0}`
            })

        },
        // 测试滑动
        testHua(e) {
            const top = e.detail.scrollTop;
            if (top === 0) {
                this.leftIndex = 0;
            }
            let index = 0;
            /* 查找当前滚动距离 */
            for (let i = this.topArr.length - 1; i >= 0; i--) {
                if (top - 2 >= this.topArr[i]) {
                    index = i;
                    break;
                }
            }
            this.leftIndex = index < 0 ? 0 : index;
        },
        /* 左侧导航点击 */
        leftTap(index) {
            this.scrollInto = `item-${index}`
            this.leftIndex = index
            // this.$minCommon.debounce(this.testLH(index))
        },
        testLH(index) {
            this.scrollInto = `item-${index}`
            this.leftIndex = index
        },
        // 底部
        testBottom(EventHandle) {
            // if (EventHandle.target.direction === "bottom") {
            //     this.leftIndex = this.mainArray.length - 1;
            //     this.scrollIntoleft = `itemleft-${this.mainArray.length - 1}`
            // }
        },
        /** 已选商品弹出事件 */
        selectedEvent() {
            this.selected = true
        },
        // 图片错误
        imageErro(e, n) {
            console.log("wocaonima", e, n)
            if (e.type === 'error') {
                // this.skuObj.product_img = '/static/images/goods.png'
                this.$set(this.selArr[n], 'product_img', '/static/images/goods.png')
                // this.errImg = true
            }
        },
        imageErro2(e) {
            if (e.type === 'error') {
                this.skuObj.sku[this.chioceIndex].sku_img = '/static/images/goods.png'
            }
        },
        /** 清空已选商品 */
        delAll() {
            // for (let i = 0; i < this.selArr.length; i++) {
            //     this.selArr.splice(i, 1)
            //     this.$store.dispatch('goods/setOrderSelArr', this.selArr)
            // }
            let arr = []
            for (let i = this.selArr.length - 1; i >= 0; i--) {
                arr.push(i)
            }
            arr.map(item => {
                this.selArr.splice(item, 1)
                this.$store.dispatch('goods/setOrderSelArr', this.selArr)
            })
            // this.selArr = []
            this.selected = false
            this.getListData()
        },
        /** 关闭已选商品弹出层 */
        closeSelectedPop() {
            this.selected = false
        },
        /**  关闭选择规格弹出层 */
        closeSelectedSkuPop() {
            this.isSelSku = false
            this.chioceIndex = 0 // 初始化选中索引
        },
        // 删除选择项
        delItem(n) {
            this.selArr.splice(n, 1)
            this.isDel = true
            this.$store.dispatch('goods/setOrderSelArr', this.selArr)
        },
        // 已选弹出层删除事件
        alDel(n, index) {
            let id = Number
            if (this.selArr[index].type === 'service') {
                id = this.selArr[index].id
            }
            if (this.selArr[index].type === 'product') {
                id = this.selArr[index].sku.id
            }
            this.mainArray.map(item_m => {
                if (item_m.product && item_m.product.length > 0) {
                    item_m.product.map(item2 => {
                        if (this.selArr[index].type === 'service' && id === item2.id) {
                            this.$set(item2, 'step', n)
                        }
                        if (
                            this.selArr[index].type === 'product' &&
                            item2.sku.length === 1 &&
                            id === item2.sku[0].id
                        ) {
                            this.$set(item2, 'step', n)
                        }
                        if (
                            this.selArr[index].type === 'product' &&
                            item2.sku.length > 1 &&
                            id === item2.sku[this.chioceIndex].id
                        ) {
                            this.$set(item2, 'step', n)
                        }
                    })
                }
            })
        },
        // 选择规格事件
        selSku(index, index2) {
            this.isSelSku = true
            this.skuObj = this.mainArray[index].product[index2]
            console.log(this.skuObj)
            // 已选商品如果存在该商品，就默认加上已选商品的数量
            let abc = 1
            this.selArr.map((item, index1) => {
                if (item.type === 'product' && item.id === this.skuObj.id) {
                    if (this.skuObj.sku[this.chioceIndex].id === item.sku.id) {
                        abc = item.step
                    }
                    // this.skuObj.sku.map((item2, index2) => {
                    //     if (item2.id === item.sku.id) {
                    //         this.skuObj.step = item.step
                    //     }
                    // })
                }
            })

            this.skuObj.step = abc

        },
        changesPopNoStep(index, index2, type) {
            this.tempId.index = index
            this.tempId.index2 = index2
            if (type === 'product') {
                console.log("changesPopNoStep")
                this.selSku(index, index2)
            } else if (type === 'setmeal') {
                console.log(123213123123123)
                let data = {
                    page_type: 'order',
                    is_open_desk: this.$parseURL().is_open_desk,
                    desk_id: this.$parseURL().desk_id,
                    minim_charge: this.$parseURL().minim_charge,
                    product_id: this.mainArray[index].product[index2].id,
                    product_type: this.mainArray[index].product[index2].type,
                    isIndex: true
                }
                // 直接进入选择套餐
                this.$minRouter.push({
                    name: 'packages-detail',
                    params: {
                        data,
                        minim_charge: this.$parseURL().minim_charge,
                        desk_id: this.$parseURL().desk_id,
                        is_open_desk: this.$parseURL().is_open_desk,
                    }
                })
                // // 进入商品套餐详情
                // this.$minRouter.push({
                //     name: 'package-details',
                //     params: {
                //         page_type: 'order',
                //         is_open_desk: this.$parseURL().is_open_desk,
                //         desk_id: this.$parseURL().desk_id,
                //         minim_charge: this.$parseURL().minim_charge,
                //         product_id: this.mainArray[index].product[index2].id,
                //         product_type: this.mainArray[index].product[index2].type,
                //     },
                // })
            } else {
                console.log('fuwu ', type)
            }
        },
        start(e) {
            this.lastY = e.changedTouches[0].pageY
        },
        move(e) {
            let currentY = e.changedTouches[0].pageY
            if (this.top < currentY - this.lastY) {
                // 像下滚动
                this.top = currentY - this.lastY
            } else {
                // 向上滚动
                //  this.top = 0
                this.top = currentY - this.lastY
            }
        },
        end(e) {
            return (this.top = 0)
        },
        changeChioce(index, index2) {
            console.log("changesPopNoStep")
            this.tempId.index = index
            this.tempId.index2 = index2
            // 服务商品
            if (this.mainArray[index].product[index2].type === 'service') {
                // 直接放入已选商品
                console.log('服务商品', this.mainArray[index].product[index2])
                this.addGoods(this.mainArray[index].product[index2])
                return
            }
            // 套餐
            if (this.mainArray[index].product[index2].type === 'setmeal') {
                // 进入套餐详情页
                // 进入商品套餐详情
                this.$minRouter.push({
                    name: 'package-details',
                    params: {
                        page_type: 'order',
                        is_open_desk: this.$parseURL().is_open_desk,
                        desk_id: this.$parseURL().desk_id,
                        minim_charge: this.$parseURL().minim_charge,
                        product_id: this.mainArray[index].product[index2].id,
                        product_type: this.mainArray[index].product[index2].type,
                    },
                })
                return
            }
            if (this.mainArray[index].product[index2].type === 'product') {
                if (!this.mainArray[index].product[index2].isFlag || this.mainArray[index].product[index2].sku.length > 1) {
                    const obj = {}
                    let skuOne = {}
                    if (this.mainArray[index].product[index2].suoyin >= 0) {
                        skuOne = this.mainArray[index].product[index2].sku[this.mainArray[index].product[index2].suoyin]
                    } else {
                        skuOne = this.mainArray[index].product[index2].sku[this.chioceIndex]
                    }
                    Object.assign(obj, this.mainArray[index].product[index2])
                    obj.sku = skuOne
                    this.addGoods(obj)
                } else {
                    if (this.mainArray[index].product[index2].sku.length > 1) {
                        return this.selSku(index, index2)
                    } else {
                        const obj = {}
                        const skuOne = this.mainArray[index].product[index2].sku[0]
                        Object.assign(obj, this.mainArray[index].product[index2])
                        obj.sku = skuOne
                        this.addGoods(obj)
                    }
                }
            }
        },
        // 选择规格
        chioceO(index) {
            this.chioceIndex = index
            let abc = 1
            this.selArr.map((item, index1) => {
                if (item.type === 'product' && item.id === this.skuObj.id) {
                    if (this.skuObj.sku[this.chioceIndex].id === item.sku.id) {
                        abc = item.step
                    }
                    // this.skuObj.sku.map((item2, index2) => {
                    //     if (item2.id === item.sku.id) {
                    //         this.skuObj.step = item.step
                    //     }
                    // })
                }
            })

            this.skuObj.step = abc

        },
        // 已选商品统一列表方法
        addGoods(obj) {
            const result = this.selArr.some(item => {
                if (obj.type === 'service' && item.type === 'service') {
                    if (item.id === obj.id) {
                        item.step = obj.step
                        return true
                    }
                } else if (obj.type === 'product' && item.type === 'product') {
                    if (item.sku.id === obj.sku.id) {
                        item.step = obj.step
                        return true
                    }
                }
            })
            if (!result) {
                this.selArr.push(obj)
                this.$store.dispatch('goods/setOrderSelArr', this.selArr)
            }
        },
        closess() {
            this.selected = false
        },
        moveHandless() {
            // To Do Something
        },
        // 选择规格确定
        skuChioce() {
            const obj = {}
            Object.assign(obj, this.skuObj)
            obj.sku = this.skuObj.sku[this.chioceIndex]
            // this.mainArray[index].product[index2].suoyin
            this.$set(this.mainArray[this.tempId.index].product[this.tempId.index2], "suoyin", this.chioceIndex)
            console.log(obj)
            this.addGoods(obj)
            // this.mainArray[this.tempId.index].product[ this.tempId.index2].sku = this.mainArray[this.tempId.index].product[ this.tempId.index2].sku[this.chioceIndex]
            this.closeSelectedSkuPop()
            // console.log('选择规格确定', this.selArr)
            //     let skuo = this.mainArray[this.tempId.index].product[ this.tempId.index2].sku[this.chioceIndex]
            //     this.mainArray[this.tempId.index].product[ this.tempId.index2].sku = []
            //     this.mainArray[this.tempId.index].product[ this.tempId.index2].sku.push(skuo)
        },
        // 提交
        submit() {
            console.log('已选商品')
            console.log(this.$parseURL())
            if (this.selArr.length === 0) return this.$showToast('请选择商品')
            console.log('准备提交', this.selArr)
            // [{"id":1,"type":"service","quantity":1,"sku_id":0,"combination":[]}
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
            this.$minApi
                .setOrder({
                    desk_id: this.$parseURL().desk_id,
                    products: JSON.stringify(products),
                })
                .then(res => {
                    this.selArr = []
                    this.$store.dispatch('goods/setOrderSelArr', [])
                    if (res.orderId) {
                        this.$showToast('提交成功')
                        setTimeout(() => {
                            // 判断是否为已开台，已开台有签折信息
                            if (this.$parseURL().is_open_desk) {
                                // 已开台
                                console.log(
                                    res.orderId,
                                    this.$parseURL().desk_id,
                                    this.$parseURL().is_open_desk
                                )
                                uni.navigateTo({
                                    url: './orderstart?order_id=' +
                                        res.orderId +
                                        '&desk_id=' +
                                        this.$parseURL().desk_id +
                                        '&open_status=' +
                                        1,
                                })
                                return
                            }
                            this.$minRouter.push({
                                    name: 'redconfirm-order',
                                    type: 'redirectTo',
                                    params: {
                                        order_id: res.orderId,
                                        desk_id: this.$parseURL().desk_id,
                                        open_status: this.$parseURL().is_open_desk ? 1 : 0,
                                        isNewMasT: this.$parseURL().isNewMasT ? true : false
                                    },
                                },
                                2000
                            )
                        })
                    }
                })
        },
        // 商品详情
        goDetails(index, index2) {
            const _self = this
            // let type
            if (_self.mainArray[index].product[index2].type === 'setmeal') {
                console.log(_self.$store.state.goods.orderSelArr)
                console.log(_self.mainArray)
                // 进入商品套餐详情
                _self.$minRouter.push({
                    name: 'package-details',
                    params: {
                        page_type: 'order',
                        is_open_desk: _self.$parseURL().is_open_desk,
                        desk_id: _self.$parseURL().desk_id,
                        minim_charge: _self.$parseURL().minim_charge,
                        product_id: _self.mainArray[index].product[index2].id,
                        product_type: _self.mainArray[index].product[index2].type,
                    },
                })
                return
            }
            // if (this.mainArray[index].product[index2].type === 'product') {
            //   //  代表商品详情
            //   type = 'product'
            // } else if (this.mainArray[index].product[index2].type === 'service') {
            //   //  代表服务商品详情
            //   type = 'service'
            // }
            this.$minRouter.push({
                name: 'product-details',
                params: {
                    page_type: 'order',
                    is_open_desk: this.$parseURL().is_open_desk,
                    desk_id: this.$parseURL().desk_id,
                    minim_charge: this.$parseURL().minim_charge,
                    product_id: this.mainArray[index].product[index2].id,
                    product_type: this.mainArray[index].product[index2].type,
                },
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.list_box {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
    align-content: flex-start;
    font-size: 28rpx;
    height: 100%;
    overflow: hidden;

    .left {
        width: 160rpx;
        background-color: #fff;
        font-size: 32rpx;
        // position: fixed;
        // left: 0;
        // top: 80rpx;
        // box-sizing: border-box;

        // height: 100%;
        // overflow: hidden;
        // .left_view {
        //     overflow: auto;
        //     width: 100%;
        //     height: auto;
        // }
        .item {
            position: relative;
            text-align: center;
            height: 88rpx;
            box-sizing: border-box;
            color: #666666;
            width: 100%;
            padding-left: 10rpx;
            font-size: 26rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            word-wrap: break-word;
            word-break: break-all;
            padding: 15rpx;

            &.active {
                color: #333333;
                background-color: #f7f7f7;
                font-weight: bold;
                font-size: 26rpx;

                &::after {
                    content: '';
                    width: 6rpx;
                    height: 50rpx;
                    background: #030313;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }

    .main {
        width: 72%;
        padding-left: 20rpx;
        flex-grow: 1;
        // margin-left: 160rpx;
        // position: fixed;
        // left: 165rpx;
        // top: -30rpx;
        // bottom: 50rpx;
        // overflow: hidden;
        // height: 100%;
        // flex: 1;

        .title {
            line-height: 64rpx;
            font-size: 24rpx;
            font-weight: bold;
            color: #666;
            background-color: #fff;
            position: sticky;
            top: 0;
            z-index: 19;
        }

        .item_name {
            height: 50rpx;
            color: #333333;
            background-color: #f7f7f7;
            font-weight: bold;
            font-size: 26rpx;
            display: block;
            padding-top: 20rpx;
        }
    }

    // 选择规格弹出
    .skuTop {
        width: 100%;
        height: 180rpx;
        margin: 30rpx 0;
        display: flex;
        padding: 0 30rpx;

        .leftView {
            flex: 1;
            display: flex;

            .img-view {
                width: 180rpx;
                height: 180rpx;
                margin-right: 20rpx;

                image {
                    width: 100%;
                    height: 100%;
                }
            }

            .sku-view {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-content: flex-end;

                .t {
                    width: 400rpx;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .dissss {
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: #fff;
                    background: #f80409;
                    display: inline-block;
                    width: 120rpx;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: block;
                }

                .m {
                    color: #ff0000;

                    .money {
                        font-weight: bold;
                        color: #ff0000;
                    }

                    .dissss_d {
                        color: #999;
                        font-size: 20rpx;
                        display: inline-block;
                        padding-left: 20rpx;
                        text-decoration: line-through
                    }
                }
            }
        }

        .rightView {
            width: 34rpx;
            height: 34rpx;

            image {
                width: 100%;
                height: 100%;
            }
        }
    }

    .sku-item1 {
        margin: 0 30rpx;
        padding: 30rpx 0;
        padding-bottom: 10rpx;
        height: 130rpx;
    }

    .sku-item {

        margin: 0 15rpx;
        margin-left: 10rpx;
        padding: 30rpx 0;
        padding-bottom: 10rpx;
        overflow: auto;
        height: 220rpx;

        .item-view {
            margin-top: 20rpx;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: wrap;

            .t {
                width: 230rpx;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .item {
                padding: 0 18rpx;
                word-wrap: none;
                height: 58rpx;
                border: 1px solid rgba(51, 51, 51, 1);
                border-radius: 10rpx;
                margin-right: 40rpx;
                margin-bottom: 20rpx;
                text-align: center;
                line-height: 58rpx;
                font-size: 26rpx;
            }

            .item-active {
                padding: 0 18rpx;
                word-wrap: none;
                height: 58rpx;
                border: 1px solid #fe432a;
                border-radius: 10rpx;
                margin-right: 40rpx;
                margin-bottom: 20rpx;
                text-align: center;
                line-height: 58rpx;
                color: #fe432a;
                font-size: 26rpx;
            }
        }
    }

    .sku-item-num {
        margin: 0 15rpx;
        margin-left: 10rpx;
        padding: 30rpx 0;
        padding-bottom: 10rpx;
        height: 130rpx;

        .item-view {
            margin-top: 20rpx;
            width: 100%;
            display: flex;
            flex-wrap: wrap;

            .t {
                width: 320rpx;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .item {
                padding: 0 10rpx;
                word-wrap: none;
                height: 58rpx;
                border: 1px solid rgba(51, 51, 51, 1);
                border-radius: 10rpx;
                margin-right: 20rpx;
                margin-bottom: 20rpx;
                text-align: center;
                line-height: 58rpx;
            }

            .item-active {
                padding: 0 10rpx;
                word-wrap: none;
                height: 58rpx;
                border: 1px solid #fe432a;
                color: #fe432a;
                border-radius: 10rpx;
                margin-right: 20rpx;
                margin-bottom: 20rpx;
                text-align: center;
                line-height: 58rpx;
            }
        }
    }

    .btn-sku {
        width: 100%;
        height: 98rpx;
        position: fixed;
        bottom: 0;
        left: 0;
        background: #ffe001;
        text-align: center;
        line-height: 98rpx;
        font-size: 32rpx;
        color: #333;
    }

    .data_bull {
        width: 100%;
        height: 100vh;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        top: 0;
        left: 0;
    }
}

.do {
    position: absolute;
    width: 100rpx;
    height: 50rpx;
    background: red;
    z-index: 9999;
    right: 100rpx;
    top: 10rpx;
}

.popview {
    .top-view {
        width: 100%;
        height: 83rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .clear {
            color: #666;
        }

        .right-view {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;

            .icon-del {
                width: 22rpx;
                height: 22rpx;
                display: flex;
                justify-content: center;
                align-items: center;

                image {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    .main-sel-view {
        width: 100%;
        // height: 620rpx;
        overflow: auto;

        .item {
            display: flex;
            margin-bottom: 20rpx;
            height: 140rpx;
            position: relative;

            &>image {
                width: 140rpx;
                height: 140rpx;
                margin-right: 16rpx;
            }

            .isTaocan {
                width: 80rpx;
                height: 40rpx;
                background: rgba(3, 3, 19, 1);
                border-radius: 0rpx 20rpx 20rpx 0rpx;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(255, 224, 1, 1);
                text-align: center;
                line-height: 40rpx;
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
                        font-weight: bold;
                        width: 500rpx;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;

                        .aaaa {
                            font-weight: bold;
                            width: 500rpx;
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

                        .tha {
                            color: #999;
                            font-size: 20rpx;
                            display: inline-block;
                            padding-left: 10rpx;
                            text-decoration: line-through;
                        }
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

.aaaaaaa {
    .min-popup {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 700;

        &.min-hide {
            .min-content {
                animation: hide 0.5s linear forwards;
            }

            .min-content-height {
                animation: hide 0.5s linear forwards;
            }

            .min-overlay {
                opacity: 0;
            }
        }

        &.min-show {
            // .min-content {
            //     animation: show 0.5s;
            // }

            // .min-content-height {
            //     animation: show 0.5s;
            // }

            .min-overlay {
                opacity: 1;
            }
        }

        .min-overlay {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.6);
            z-index: 200;
            transition: 0.5s;
        }

        .min-content {
            width: 100%;
            height: 800rpx;
            background: #fff;
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 9999;
            overflow: hidden;
            border-radius: 20rpx 20rpx 0 0;
        }

        .min-content-height {
            width: 100%;
            height: 600rpx;
            background: #fff;
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 300;
            overflow: hidden;
        }

        @keyframes hide {
            0% {
                transform: translateY(0);
            }

            100% {
                transform: translateY(100%);
            }
        }

        @keyframes show {
            0% {
                transform: translateY(100%);
            }

            100% {
                transform: translateY(0);
            }
        }
    }
}
</style>
