<template>
<view class="give-away" @touchmove.stop.prevent="moveHandle">
    <view v-if="list.length > 0 || isFlag ">
        <min-navTab ref="navTab" class="navtabs" :tabTitle="list" @changeTab="changeTab"></min-navTab>
        <view class="desc_info m-tb-20 f20">可赠送额度：{{personal_remaining_quota === -1 ? '无限制': personal_remaining_quota}}</view>
        <view style="padding-top:80rpx"></view>
        <swiper style="width:100vw;height:100vh" :current="currentTab" @change="swiperTab" @touchmove.stop.prevent="moveHandle">
            <swiper-item v-for="(listItem,listIndex) in list" :key="listItem.id">
                <scroll-view style="height:85vh" id="scol" scroll-y @scrolltolower="lower1" :scroll-into-view="toView">
                    <view :id="'top'+listIndex"></view>
                    <view class="main p-lr-30" v-if="listItem.product.length > 0">
                        <view class="item">
                            <view class="goods" v-for="(item,index) in listItem.product" :key="index" @click.stop="toDetail(item)">
                                <image lazy-load :src="item.product_img.length>10 ?  item.product_img : '/static/images/goods.png' " />
                                <view class="content-view">
                                    <view class="right-view-title">
                                        <view class="f28 aaaa">{{item.product_name}}</view>
                                        <text class="f26 t" v-if="item.sku.length > 0 && item.sku[0].sku_full_name" style="display:block;font-weight:400">规格：{{item.sku[0].sku}}</text>
                                        <text class="f26" style="color:#666666">可赠数量：{{item.commodity_count}}</text>
                                    </view>
                                    <view class="right-view-bottom">
                                        <view class="right-view-bottom-desc">
                                            <text class="f20 t">
                                                <text style="color:#FF0000;font-size:30;font-weight:700">￥{{item.sku.length === 1 ?  item.sku[0].deduction_limit :  item.deduction_limit}}</text>
                                            </text>
                                        </view>
                                        <view class="steper">
                                            <min-stepper v-model="item.step" @lesss="lesss($event,item)" :max="item.commodity_count" v-if="(item.type === 'setmeal') ? false : true " :showBtn="item.type === 'setmeal' ? true : false" @change="changeItem(item)" :isFlag="item.isFlag">
                                            </min-stepper>
                                            <view class="m-right-10" v-else style="width:40rpx;height:40rpx;" @click.stop="changeChioceT(item)">
                                                <image lazy-load src="/static/images/yellow-add.png" style="width:100%" />
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>

                    </view>

                    <min-404 v-else></min-404>

                </scroll-view>
            </swiper-item>
        </swiper>

        <!-- 已选商品 -->
        <min-popup :show="selected" @close='closeSelectedPop'>
            <view class="popview">
                <view class="top-view min-border-bottom ">
                    <view>已选商品</view>
                    <view class="right-view" @click="delAll">
                        <view class="icon-del m-right-10">
                            <image src='/static/images/del.png' />
                        </view>
                        <view class="f22 clear">清空</view>
                    </view>
                </view>

                <view class="main-sel-view p-lr-30 p-tb-30">
                    <scroll-view scroll-y :style="{ transition: top === 0 ? 'transform 300ms' : '',transform: 'translateY(' + top + 'rpx' + ')','height':'600rpx'}">
                        <view class="item" v-for="(item2,n) in selArr" :key="n">
                            <image :src="errImg ? '/static/images/goods.png': item2.product_img" mode="" @error="imageErro1" />
                            <view class="content-view">
                                <view class="right-view-title">
                                    <text class="f28 t" style="display:block">{{item2.product_name}}</text>
                                    <text class="f26 t" style="color:#666666;display:block;font-weight:400;width:400rpx" v-if="item2.type === 'product'">规格：{{item2.sku[0].sku}}</text>
                                </view>
                                <view class="right-view-bottom">
                                    <view class="right-view-bottom-desc">
                                        <text class="f20 t"><text style="color:#FF0000;font-size:30">￥{{item2.sku.length >= 1 ? item2.sku[0].deduction_limit :item2.deduction_limit}}</text></text>

                                    </view>
                                    <view class="steper">

                                        <min-stepper :isAnimation='false' v-model="item2.step" :max="item2.commodity_count" :min='0' @change="alDel($event,n)"></min-stepper>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </scroll-view>

                </view>
                <!-- <view class="empty-view"></view> -->
                <view class="bottom-view-t">
                    <min-goods-submit style="position:fixed" :totalLabel="personal_remaining_quota === -1 ? '赠送额度：无限制': totalLabel " icon="/static/images/cart.png" :totalAmount='moneySum' :goodsCount="num" buttonText='确定赠送' @submit="submit"></min-goods-submit>
                </view>
            </view>
        </min-popup>

        <min-goods-submit style="position:fixed" :totalLabel="personal_remaining_quota === -1 ? '赠送额度：无限制': totalLabel" @leftClick='selectedEvent' icon="/static/images/cart.png" :totalAmount='moneySum' :goodsCount="num" buttonText='确定赠送' @submit='submit'></min-goods-submit>
        <min-modal ref="test"></min-modal>
    </view>
    <min-404 v-else />
</view>
</template>

<script>
export default {
    name: 'give-away',
    navigate: ['navigateTo'],
    data() {
        return {
            currentPage: 'index',
            toView: '', // 回到顶部id
            step: 0,
            countNums: 0,
            totalLabel: '',
            selected: false,
            content: '',
            tabTitle: [], // 导航栏格式 --导航栏组件
            currentTab: 0, // sweiper所在页
            pages: [1, 1, 1, 1], // 第几个swiper的第几页
            list: [],
            imgErrType: false,
            selArr: [],
            allArr: [],
            chinceIndex: 0,
            chinceIndex2: 0,
            orderId: '',
            top: "",
            errImg: false,
            desk_remaining_quota: '',
            personal_remaining_quota: '',
            isFlag: false
        }
    },
    onShow() {
        this.$nextTick(() => {
            return this.selArr = this.$store.state.goods.storeSelArr
        })
    },
    watch: {
        selArr: {
            handler(a) {
                if (a.length === 0) {
                    this.list.map(listItem => {
                        listItem.product.map(item => {
                            item.step = 0
                        })
                    })
                    // return
                }
                a.map((item, index) => {
                    console.log("item", item)
                    this.list.map(item1 => {
                        if (item1.product && item1.product.length > 0) {
                            item1.product.map((item2, index2) => {
                                console.log("item2", item2)
                                if (item2.id === item.id) {
                                    if (item2.sku.length >= 1) {
                                        if (item2.sku[0].id === item.sku[0].id) {
                                            this.$nextTick(() => {
                                                item2.step = item.step

                                            })
                                        }
                                    }

                                }
                            })
                        }
                    })
                })
            },
            deep: true
        }
    },
    onBackPress(options) {

        this.selArr = []
        this.$store.dispatch('goods/setStoreSelArr', [])
        // this.selArr = []
        // this.$store.dispatch('goods/setStoreSelArr', [])
        // console.log(this.list)
        // this.list.map(item => {
        //     item.product.map(item2 => {
        //         this.$set(item2, "step", 0)
        //     })
        // })
    },
    mounted() {
        console.log("我说", this.$parseURL().res)
        let res = this.$parseURL().res
        if (this.$parseURL().res.list.length > 0) {
            res.list.map((item, index) => {
                item.product.map(item2 => {
                    item2.step = 0

                })
            })
            // this.tabTitle = res.list
            console.log(res)
            this.list = res.list
            this.desk_remaining_quota = res.desk_remaining_quota
            this.personal_remaining_quota = res.personal_remaining_quota
            this.content = `
          1. 当前台消费金额￥${res.consumption_amount}，根据赠送方案，可赠送的商品金额为￥${res.desk_presentation_limit}。<br />
          2. 当前用户的赠送额度为￥${res.personal_presentation_limit}，不能超过此额度。<br />
          3. 不同商品的可赠数量不同，不能超过最高可赠数量。 <br />
      `
            this.$store.dispatch('goods/setselected_giveAwayInfo', {
                consumption_amount: res.consumption_amount,
                desk_presentation_limit: res.desk_presentation_limit,
                personal_presentation_limit: res.personal_remaining_quota
            })
            this.totalLabel = `赠送额度：${res.personal_remaining_quota}`
            console.log(this.list, this.totalLabel)
            console.log('已选赠送商品全局变量', this.$store.state.goods.storeSelArr)
            console.log(this.$store.state.goods.giveAwayInfo)
        } else {
            this.isFlag = true
        }
        //     this.$minApi.getGiveAwayList({
        //         desk_id: this.$parseURL().desk_id
        //     }).then(res => {
        //         res.list.map((item, index) => {
        //             item.product.map(item2 => {
        //                 item2.step = 0

        //             })
        //         })
        //         // this.tabTitle = res.list
        //         console.log(res)
        //         this.list = res.list
        //         this.desk_remaining_quota = res.desk_remaining_quota
        //         this.personal_remaining_quota = res.personal_remaining_quota
        //         this.content = `
        //       1. 当前台消费金额￥${res.consumption_amount}，根据赠送方案，可赠送的商品金额为￥${res.desk_presentation_limit}。<br />
        //       2. 当前用户的赠送额度为￥${res.personal_presentation_limit}，不能超过此额度。<br />
        //       3. 不同商品的可赠数量不同，不能超过最高可赠数量。 <br />
        //   `
        //         this.$store.dispatch('goods/setselected_giveAwayInfo', {
        //             consumption_amount: res.consumption_amount,
        //             desk_presentation_limit: res.desk_presentation_limit,
        //             personal_presentation_limit: res.personal_remaining_quota
        //         })
        //         this.totalLabel = `赠送额度：${res.personal_remaining_quota}`
        //         console.log(this.list, this.totalLabel)
        //         console.log('已选赠送商品全局变量', this.$store.state.goods.storeSelArr)
        //         console.log(this.$store.state.goods.giveAwayInfo)
        //         // eslint-disable-next-line handle-callback-err
        //     }).catch(err => {
        //         this.isFlag = true
        //         // setTimeout(() => {
        //         //     uni.navigateBack({
        //         //         delta: 1
        //         //     })
        //         // }, 2000)
        //     })
    },
    // onNavigationBarButtonTap(e) {
    //     this.$refs.test.handleShow({
    //         title: e.text,
    //         content: this.content,
    //         showCancel: false,
    //         success: (e) => {
    //             console.log(e) // 这里拿到的是modalID: "modal"，id: 1
    //         }
    //     })
    // },
    computed: {
        num() {
            let counts = 0
            this.selArr.map(item => {
                counts += item.step
            })
            return counts
        },
        moneySum() {
            let sum = 0
            this.selArr.map(item => {
                if (item.type === 'setmeal') {
                    sum += item.deduction_limit * item.step
                }
                if (item.type === 'service') {
                    sum += item.deduction_limit * item.step
                }
                if (item.type === 'product') {
                    sum += item.sku[0].deduction_limit * item.step

                }
                this.$store.dispatch('goods/setStoreSelArr', this.selArr)
            })
            return sum.toFixed(2)
        }
    },
    methods: {
        toDetail(item) {
            console.log(item)
            console.log("草噢噢噢噢哦哦哦", this.$store.state.goods.storeSelArr)
            if (item.type === 'service') {
                // 跳到赠送商品详情product-detail-giveaway
                uni.navigateTo({
                    url: '/pages/give-away/produdetail?product_id=' + item.id + '&desk_id=' + this.$parseURL().desk_id + '&product_type=' + item.type + '&commodity_count=' + item.commodity_count
                })
            } else if (item.type === 'product') {
                // 跳到赠送商品详情
                uni.navigateTo({
                    url: '/pages/give-away/produdetail?product_id=' + item.sku[0].id + '&desk_id=' + this.$parseURL().desk_id + '&product_type=' + item.type + '&commodity_count=' + item.commodity_count
                })
            } else if (item.type === 'setmeal') {
                // 跳到套餐商品详情
                uni.navigateTo({
                    url: '/pages/give-away/taocan?setmeal_id=' + item.id + '&desk_id=' + this.$parseURL().desk_id + '&product_type=' + item.type + '&commodity_count=' + item.commodity_count
                })
            }
        },
        // 开启已选商品弹出层
        selectedEvent() {
            this.selected = true
        },
        /** 关闭已选商品弹出层 */
        closeSelectedPop() {
            this.selected = false
        },
        // 点击增加按钮
        getStep(e, index, index2) {
            this.addGoods(e)
        },
        // 图片错误
        imageErro1(e) {
            if (e.type === 'error') {
                // this.skuObj.product_img = '../../static/images/goods.png'
                this.errImg = true
            }
        },
        lesss(e, item) {
            // 数量为0时从已选商品中删除掉该商品
            for (let i = 0; i < this.selArr.length; i++) {
                if (this.selArr[i].id === item.id && e === 0) {
                    if (this.selArr[i].sku[0].id === item.sku[0].id) {
                        this.selArr.splice(i, 1)
                        this.$store.dispatch('goods/setStoreSelArr', this.selArr)
                    }

                }
            }
        },
        moveHandle() {

        },
        changeItem(e) {
            console.log(e)
            if (e.type === 'setmeal') {
                console.log('到套餐详情,', e)
                // 跳到套餐商品详情
                uni.navigateTo({
                    url: '/pages/give-away/setmealdetail?setmeal_id=' + e.id + '&desk_id=' + this.$parseURL().desk_id + '&product_type=' + e.type + '&commodity_count=' + e.commodity_count
                })
                return
            }
            this.addGoods(e)
            // for (let i = 0; i < this.selArr.length; i++) {
            //   if (this.selArr[i].id === e.id) {
            //     this.$nextTick(() => {
            //       this.selArr[i].step = e.step
            //     })
            //   }
            // }
        },
        // 已选弹出层删除事件
        alDel(n, index) {
            console.log(this.selArr)
            if (n === 0) {
                this.$nextTick(() => {
                    this.selArr.splice(index, 1)
                    this.$store.dispatch('goods/setStoreSelArr', this.selArr)
                })

            }
        },
        changeChioceT(item) {
            uni.navigateTo({
                url: '/pages/give-away/taocan?setmeal_id=' + item.id + '&desk_id=' + this.$parseURL().desk_id + '&product_type=' + item.type + '&commodity_count=' + item.commodity_count
            })
        },
        // 添加到已选商品
        addGoods(e) {
            console.log(e)
            // 无可赠次数
            if (e.commodity_count === 0) return this.$showToast('该商品无可送次数')
            if (this.selArr.length === 0) {
                this.selArr.push(e)
                this.$store.dispatch('goods/setStoreSelArr', this.selArr)
                console.log('已选赠送商品全局变量', this.$store.state.goods.storeSelArr)
                return
            }
            const result = this.selArr.some(item => {
                if (item.type === 'service' && e.type === 'service') {
                    if (item.id === e.id) {
                        item.step = e.step
                        return true
                    }
                } else if (item.type === 'product' && e.type === 'product') {
                    // console.log(item, e)
                    if (item.sku[0].id === e.sku[0].id) {
                        item.step = e.step
                        return true
                    }
                } else if (item.type === 'setmeal' && e.type === 'setmeal') {
                    if (item.id === e.id) {
                        item.step = e.step
                        return true
                    }
                }
            })
            if (!result) {
                this.selArr.push(e)
                // 存到全局变量
                this.$store.dispatch('goods/setStoreSelArr', this.selArr)
                console.log('已选赠送商品全局变量', this.$store.state.goods.storeSelArr)
            }
            console.log(this.selArr)
        },
        // 提交赠送商品
        submit() {
            if (this.selArr.length === 0) return this.$showToast('请选择赠送商品')
            console.log('准备提交', this.selArr)
            // [{"id":1,"type":"service","quantity":1,"sku_id":0,"combination":[]}
            const products = []
            this.selArr.map(item => {
                const obj = {}
                if (item.type === 'setmeal') {
                    obj.combination = item.combination
                    obj.id = item.id
                    obj.quantity = item.step
                    obj.type = item.type
                    obj.sku_id = 0
                }
                if (item.type === 'service') {
                    obj.id = item.id
                    obj.sku_id = 0
                    obj.type = item.type
                    obj.quantity = item.step
                } else if (item.type === 'product') {
                    obj.id = item.id
                    obj.sku_id = item.sku[0].id
                    obj.type = item.type
                    obj.quantity = item.step
                }
                products.push(obj)
            })
            console.log(products)
            this.postOrder(products)
        },
        // 请求提交数据
        postOrder(products) {

            this.$minApi.giveAwayOrder({
                desk_id: this.$parseURL().desk_id,
                products: JSON.stringify(products)
            }).then(res => {
                this.orderId = res.orderId
                this.$showToast('提交成功')

                console.log('获取到赠送单ID', this.orderId)
                setTimeout(() => {

                    this.selArr = []
                    this.$store.dispatch('goods/setStoreSelArr', [])
                    console.log(this.list)
                    this.list.map(item => {
                        item.product.map(item2 => {
                            this.$set(item2, "step", 0)
                        })
                    })
                    uni.navigateTo({
                        url: './giveawayorder?order_id=' + this.orderId
                    })
                }, 2000)
            })
        },
        /** 清空已选商品 */
        delAll() {
            // this.selArr = []
            this.selArr.map((item, index) => {
                this.selArr.splice(index, 1)
                this.$store.dispatch('goods/setStoreSelArr', this.selArr)
            })
            this.selArr = []
            this.list.map(item => {
                item.product.map((item2, index) => {
                    if (item2.step > 0) {
                        console.log('需要更新', item2)
                        item2.isFlag = true
                        // this.$set(item2,"step",0)
                        setTimeout(() => {
                            item2.isFlag = false
                        }, 200)
                    }

                })
            })
        },
        changeTab(e) {
            this.currentTab = e
        },
        // swiper 滑动
        swiperTab: function (e) {
            var index = e.detail.current // 获取索引
            this.$refs.navTab.longClick(index)
        },
        throttle(fn, gapTime) {
            if (gapTime == null || gapTime === undefined) {
                gapTime = 1500
            }

            let _lastTime = null

            // 返回新的函数
            return function () {
                const _nowTime = +new Date()
                if (_nowTime - _lastTime > gapTime || !_lastTime) {
                    fn.apply(this, arguments) // 将this和参数传给原函数
                    _lastTime = _nowTime
                }
            }
        },
        // 加载更多 util.throttle为防抖函数
        lower1() {
            this.throttle(function (e) {
                console.log(`加载${this.currentTab}`) // currentTab表示当前所在页数 根据当前所在页数发起请求并带上page页数
                uni.showLoading({
                    title: '加载中',
                    mask: true
                })
                this.isRequest().then(res => {
                    const tempList = this.list
                    tempList[this.currentTab] = tempList[this.currentTab].concat(res)
                    console.log(tempList)
                    this.list = tempList
                    this.$forceUpdate() // 二维数组，开启强制渲染
                })
            }, 300)
        },
        imageErro(e, n) {
            if (e.type === 'error') {
                this.selArr[n].product_img = '../../static/images/goods.png'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.swiper {
    margin-top: 72rpx;

}

.main {
    width: 100%;
    // margin-top: 72rpx;
    flex-grow: 1;
    box-sizing: border-box;
    overflow: hidden;

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

    .isSku {
        width: 100rpx;
        height: 48rpx;
        background: #ffe001;
        border-radius: 24rpx;
        color: #333333;
        text-align: center;
        line-height: 48rpx;
    }

    .item {
        width: 100%;
        // margin-bottom: 20rpx;
        padding-bottom: 0 0 5rpx;
        height: 100%;
        overflow: hidden;
    }

    .goods {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        align-content: center;
        margin-bottom: 20rpx;
        background: #fff;
        height: 230rpx;
        width: 100%;
        padding: 20rpx;

        &>image {
            width: 160rpx;
            height: 160rpx;
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

            .right-view-title {
                width: 500rpx;

                .t {
                    font-weight: bold;
                    width: 500rpx;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .aaaa {
                    width: 500rpx;
                    font-size: 28rpx;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    word-wrap: break-word;
                    word-break: break-all;
                    font-weight: 700;
                }
            }

            .right-view-bottom {
                height: 48rpx;
                display: flex;
                // position: relative;
                justify-content: space-between;

                .right-view-bottom-desc {
                    display: flex;
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

.goods {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    margin-bottom: 20rpx;
    background: #fff;
    height: 230rpx;
    width: 100%;
    padding: 20rpx;

    &>image {
        width: 160rpx;
        height: 160rpx;
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

        .right-view-title {
            width: 500rpx;

            .t {
                font-weight: bold;
                width: 500rpx;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .aaaa {
                width: 500rpx;
                font-size: 28rpx;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                word-wrap: break-word;
                word-break: break-all;
                font-weight: 700;
            }
        }

        .right-view-bottom {
            height: 48rpx;
            display: flex;
            // position: relative;
            justify-content: space-between;

            .right-view-bottom-desc {
                display: flex;
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

.none-view {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    image {
        width: 485rpx;
        height: 291rpx;
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
            color: #666;
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
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    .main-sel-view {
        width: 100%;
        height: 620rpx;

        .item {
            display: flex;
            margin-bottom: 20rpx;
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
                        width: 500rpx;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-weight: bold;

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

.navtabs {
    // #ifdef H5
    margin-top: 80rpx;
    // #endif
}

.desc_info {

    height: 19rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 30rpx;
    margin-top: 100rpx;
    padding: 0 30rpx;
    // #ifdef H5
    margin-top: 80rpx;
    padding: 0 30rpx;
    // #endif
    position: fixed;
    top: 100rpx;
    left: 30rpx;
}

#scol {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
}
</style>
