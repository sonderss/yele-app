<template>
<view class="list_box">
    <view class="left" v-if="mainArray.length !== 0">
        <scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
            <view class="item" v-for="(item,index) in mainArray" :key="index" :class="{ 'active':index==leftIndex }" :data-index="index" @tap="leftTap(index)">{{item.cate_name ? item.cate_name : 'null'}}</view>
        </scroll-view>
    </view>

    <view class="main">
        <scroll-view scroll-y="true" :style="{ 'height':scrollHeight}" @scroll="mainScroll" @scrolltolower="test" :scroll-into-view="scrollInto" scroll-with-animation="true">
            <view style="height:20rpx"></view>

            <view class="item" v-for="(item,index) in mainArray" :key="index" :id="'item-'+index">
                <view class="goods" v-for="(item2,index2) in item.list" :key="index2">
                    <image lazy-load :src="item2.product_img" mode="aspectFit" @error="imgerr($event,index,index2)" />
                    <view class="content-view">
                        <view class="right-view-title">
                            <text class="f28 t" style="display:block">{{item2.product_name}}</text>
                            <text class="f26 t" v-if="item2.sku.length >= 1" style="color:#666666">规格：{{item2.sku[0].sku}}</text>
                        </view>
                        <!-- <view class="describe">第{{index2+1}}个商品的描述内容</view>
              <view class="money">第{{index2+1}}个商品的价格</view>-->
                        <view class="right-view-bottom">
                            <view class="right-view-bottom-desc">
                                <text class="f20 t">
                                    提成： <text style="color:red" class="f22">￥</text>
                                    <text style="color:#FF0000;font-size:30">{{item2.sku.length >= 1 ? item2.sku[0].amount : item2.min_amount}}</text>
                                </text>
                            </view>
                            <view class="steper">
                                <min-stepper psize="20rpx" v-if="item2.sku.length <= 1" v-model="item2.step" @change="changeChioce($event,index,index2)"></min-stepper>
                                <!-- <view v-if="item2.sku.length <= 1 && item2.min_amount*1 <= 0" class="m-right-10" style="width:40rpx;height:40rpx;" @click.stop="changeChioceT">
                                    <image lazy-load src="/static/images/yellow-add.png" style="width:100%" />
                                </view> -->
                                <view class="isSku f24" v-if="item2.sku.length > 1 " @click="selSku(index,index2)">选规格</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view style="height:120rpx;"></view>
        </scroll-view>
    </view>

    <view class="bottom-view" v-if="mainArray.length !== 0">
        <min-goods-submit leftText="已选" :bgcolor="selArr.length >= 1 ? 'rgba(255, 224, 0, 1)' :'#CCCCCC'" @leftClick="selectedEvent" @submit="submit" :totalAmount="totalAmountE" :goodsCount="countNums" buttonText="提交"></min-goods-submit>
    </view>
    <!-- 已选商品 -->
    <min-popup :show="selected" @close="closeSelectedPop">
        <view class="popview">
            <view class="top-view min-border-bottom p-lr-30">
                <view>已选商品</view>
                <view class="right-view" @click="delAll">
                    <view class="icon-del m-right-10">
                        <image src="/static/images/del.png" />
                    </view>
                    <view class="f22 clear">清空</view>
                </view>
            </view>
            <view class="main-sel-view p-lr-30 m-top-20" style="margin-bottom:300rpx" @touchstart="start" @touchmove="move" @touchend="end">
                <scroll-view scroll-y :style="{transition: top === 0 ? 'transform 300ms' : '',transform: 'translateY(' + top + 'rpx' + ')','height':'600rpx'}">
                    <view class="item" v-for="(item2,n) in selArr" :key="n" @longpress="longTatch(n)">
                        <image :src="item2.product_img" />
                        <view class="content-view">
                            <view class="right-view-title">
                                <text class="f28 t" style="display:block">{{item2.product_name}}</text>
                                <text class="f24 t" style="color:#666666" v-if="item2.sku.length > 1">规格：{{item2.sku[item2.index].sku_full_name}}</text>
                                <text class="f24 t" style="color:#666666" v-if="item2.sku.length === 1">规格：{{item2.sku[0].sku_full_name}}</text>
                            </view>
                            <view class="right-view-bottom">
                                <view class="right-view-bottom-desc">
                                    <text class="f20 t">
                                        提成： <text style="color:red" class="f22">￥</text>
                                        <text style="color:#FF0000;font-size:30">{{item2.sku.length > 1 ? item2.sku[item2.index].amount : item2.min_amount}}</text>
                                    </text>
                                </view>
                                <view class="steper">
                                    <!-- @change="changeIndex($event,n)" -->
                                    <min-stepper :isAnimation="false" v-if="isDel" v-model="item2.step" :min="0" @change="alDel($event,n)"></min-stepper>
                                    <view v-if="!isDel" @click="delItem(n)">删除</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </view>
            <!-- <view class="empty-view"></view> -->
            <view class="bottom-view-t">
                <min-goods-submit style="position:fixed" :bgcolor="selArr.length >= 1 ? 'rgba(255, 224, 0, 1)' :'#CCCCCC'" leftText="已选" @submit="submit" :totalAmount="totalAmountE" :goodsCount="countNums" buttonText="提交"></min-goods-submit>
            </view>
        </view>
    </min-popup>
    <!-- 选择规格 -->
    <min-popup :show="isSelSku" @close="closeSelectedSkuPop" :heightSize="skuObj.sku.length < 3 ? '700' : '830'">
        <!--  -->
        <view class="skuPop">
            <view class="skuTop">
                <view class="leftView">
                    <view class="img-view">
                        <image :src="skuObj.product_img" />
                    </view>
                    <!-- sku信息 -->
                    <view class="sku-view">
                        <text class="f22 a">{{skuObj.product_name}}</text>
                        <text class="f22 m-tb-10 a">已选："{{skuObj.sku[chioceIndex].sku}}"</text>
                        <text class="f22 m">
                            提成:
                            <text style="color:red" class="f22">￥</text>
                            <text class="money">{{skuObj.sku[chioceIndex].amount}}</text>
                        </text>
                    </view>
                </view>
            </view>
            <view class="min-border-bottom m-lr-30"></view>
            <scroll-view :class=" skuObj.sku.length < 3 ? 'sku-item-num' : 'sku-item'" scroll-y :style="{ transition: top === 0 ? 'transform 300ms' : '',transform: 'translateY(' + top + 'rpx' + ')'}">
                <!-- 可选择规格项 -->
                <view>
                    <view class="f26">规格</view>
                    <view class="item-view">
                        <view :class="chioceIndex ===index ?   'item-active t' : 'item t' " @click="chioceO(index)" v-for="(item,index) in skuObj.sku" :key="index">{{item.sku}}</view>
                    </view>
                </view>
            </scroll-view>
            <view class="min-border-bottom m-lr-30"></view>
            <!-- 数量 -->
            <view class="sku-item1">
                <view class="f26">数量</view>
                <view class="m-tb-30">
                    <min-stepper :isAnimation="false" :min="1" v-model="skuObj.step"></min-stepper>
                </view>
            </view>
            <view class="btn-sku" @click="skuChioce">确定</view>
        </view>
    </min-popup>
    <view class="data_bull" v-if="mainArray.length === 0">
        <min-404 v-model="intNet" id="none"></min-404>
    </view>
</view>
</template>

<script>
export default {
    name: "confiscated-wine",
    navigate: ["navigateTo", "switchTab"],
    data() {
        return {
            scrollHeight: "1000px",
            leftArray: [],
            mainArray: [],
            topArr: [],
            leftIndex: 0,
            scrollInto: "",
            chioceIndex: 0, // 默认选中第一项
            imageSrc: "", // 判断图片是否失效
            isDel: true, //  所需删除的已选列表中对应项
            selNum: [],
            top: "",
            lastY: '',
            isSkuNum: 0, // 选择规格弹出层的数量
            skuObj: {
                sku: [{
                    sku_full_name: ""
                }]
            }, // 选择规格项
            isSelSku: false, // 选择规格
            // indexDel: Number, // 所需删除的已选列表中的索引
            selArr: [], // 已选商品列表
            selected: false, // 已选商品弹出层
            chioceSkuIndex: 0, // 选择规格的索引
            selItemArr: [], // 提交已选商品数组
            skuIndex: {},
            delIndex: Number,
            lastArr: [],
            intNet: Boolean // 网络状态
        };
    },
    onLoad() {
        uni.getSystemInfo({
            success: res => {
                /* 设置当前滚动容器的高，若非窗口的高度，请自行修改 */
                this.scrollHeight = `${res.windowHeight}px`;
            }
        });
    },
    mounted() {
        this.getData();
    },
    computed: {
        // 合计金额
        totalAmountE() {
            let sum = 0;
            this.selArr.map(item => {
                sum += item.step * item.min_amount;
            });
            return sum > 0 ? sum.toFixed(2) : sum
        },
        // 监听所选数量
        countNums() {
            let num = 0;
            for (let i = 0; i < this.selArr.length; i++) {
                num += this.selArr[i].step;
            }
            return num;
        }
    },
    watch: {
        // selArr: {
        //     handler(a, b) {
        //         a.map((item, index) => {
        //             if (item.step === 0) {
        //                 this.$nextTick(() => {
        //                     this.selArr.splice(index, 1);
        //                     this.selNum.splice(index, 1);
        //                 })

        //             }
        //         });
        //     },
        //     deep: true
        // },
        intNet: function (a) {
            if (!a) {} else {
                // 请求数据
                this.getData();
            }
        }
    },
    methods: {
        /* 获取列表数据 */
        getData() {
            this.$minApi.getWineList().then(res => {
                this.mainArray = res;
                this.mainArray.map(item => {
                    item.list.map(item2 => {
                        item2.step = 0;
                    });
                });
                this.$nextTick(() => {
                    this.getElementTop();
                });
            });
        },
        imgerr(e, index, index2) {
            if (e.type === "error") {
                this.mainArray[index].list[index2].product_img =
                    "/static/images/goods.png";
            }
        },
        /* 获取元素顶部信息 */
        getElementTop() {
            /* Promise 对象数组 */
            // eslint-disable-next-line camelcase
            const p_arr = [];

            /* 新建 Promise 方法 */
            // eslint-disable-next-line camelcase
            const new_p = selector => {
                return new Promise((resolve, reject) => {
                    const view = uni.createSelectorQuery().select(selector);
                    view
                        .boundingClientRect(data => {
                            resolve(data.top);
                        })
                        .exec();
                });
            };

            /* 遍历数据，创建相应的 Promise 数组数据 */
            this.mainArray.forEach((item, index) => {
                p_arr.push(new_p(`#item-${index}`));
            });

            /* 所有节点信息返回后调用该方法 */
            Promise.all(p_arr).then(data => {
                this.topArr = data;
            });
        },
        /* 主区域滚动监听 */
        mainScroll(e) {
            const top = e.detail.scrollTop;
            if (top === 0) {
                this.leftIndex = 0;
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
        },
        /* 左侧导航点击 */
        leftTap(index) {
            this.scrollInto = `item-${index}`;
            this.leftIndex = index;
        },
        /** 监听底部 */
        test(EventHandle) {
            if (EventHandle.target.direction === "bottom") {
                this.leftIndex = this.mainArray.length - 1;
            }
        },
        // 关闭规格选择框
        closePop() {
            this.closeSelectedPop();
        },
        /** 点击商品事件(进入详情) */
        goodsAdd(index, index2) {
            // this.addGoods(index, index2)
        },
        /** 已选商品弹出事件 */
        selectedEvent() {
            if (this.mainArray.length === 0) return;
            this.selected = true;
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
        /** 添加商品事件 */
        addGoods(index, index2) {
            console.log(this.mainArray[index].list[index2])
            // if (this.mainArray[index].list[index2].min_amount * 1 === 0) return this.$showToast('提成为0，添加失败')
            const a = index + "" + index2;
            // // 判断选择项是否重复
            if (!this.selNum.includes(a)) {
                this.selNum.push(a);
                this.selArr.push(this.mainArray[index].list[index2]);
                this.selArr = this.$minCommon.arrSet(this.selArr)
            } else {
                console.log("aaaaaaaaaaaaaaaaaaaaaa")
            }
        },
        /** 已选商品提交所需项 */
        // eslint-disable-next-line vue/no-dupe-keys
        selItem(index, index2) {
            const obj = {};
            this.selArr.map(item => {
                obj.id = item.sku[index2].confiscate_product_id;
                obj.product_num = item.sku[index2].step;
                if (!this.selItemArr.includes(obj.id)) {
                    this.selItemArr.push(obj);
                }
            });
        },
        /** 清空已选商品 */
        delAll() {
            this.selArr = [];
            this.selNum = [];
            this.selItemArr = []
            this.mainArray.map(item => {
                item.list.map(item2 => {
                    if (item2.step > 0) {
                        this.$set(item2, "step", 0);
                    }
                });
            });
        },
        /** 关闭已选商品弹出层 */
        closeSelectedPop() {
            this.selected = false;
        },
        /**  关闭选择规格弹出层 */
        closeSelectedSkuPop() {
            this.isSelSku = false;
            this.chioceIndex = 0
        },
        // 删除选择项
        delItem(n) {
            this.selArr.splice(n, 1);
            this.selNum.splice(n, 1);
            this.isDel = true;
        },
        // 长按事件触发删除
        longTatch(n) {
            // this.isDel = false;
        },
        // 已选弹出层删除事件
        alDel(n, index) {
            if (n === 0) {
                for (let i = this.selArr.length - 1; i >= 0; i--) {
                    if (index === i) {
                        this.$nextTick(() => {
                            this.selArr.splice(i, 1);
                        })
                    }
                }
                for (let i = this.selNum.length - 1; i >= 0; i--) {
                    if (index === i) {
                        this.$nextTick(() => {
                            this.selNum.splice(i, 1);
                        })
                    }
                }
                // this.selArr.splice(index, 1);
                // this.selNum.splice(index, 1);

            }
        },
        // 选择规格事件
        selSku(index, index2) {
            this.isSelSku = true;
            this.skuObj = this.mainArray[index].list[index2];
            this.skuObj.step = 1;
            this.skuIndex.index = index;
            this.skuIndex.index2 = index2;
            console.log(this.skuObj)
        },
        changeChioce(e, index, index2) {
            if (e === 0) {
                this.selArr.splice(index, 1);
                this.selNum.splice(index, 1);
                return
            }
            this.addGoods(index, index2);
            const params = {};
            params.id = this.mainArray[index].list[index2].sku[0].confiscate_product_id;
            params.product_num = this.mainArray[index].list[index2].step + 1;
            this.postItem(params);
        },
        // 选择规格
        chioceO(index) {
            this.chioceIndex = index;
        },
        checkIndex(e) {
            if (this.selArr.length === 0) {
                this.selArr.push(e);
                return;
            }
            const result = this.selArr.some(item => {
                console.log(item)
                console.log(e)

                if (item.id !== e.id) {
                    return false
                } else {
                    if (item.sku[item.index].confiscate_product_id === e.sku[e.index].confiscate_product_id) {
                        item.step = e.step;
                        return true

                    }
                }
            });
            if (!result) {
                this.selArr.push(e);
            }
        },
        // 选择规格确定
        skuChioce() {
            const obj = {};
            obj.id = this.skuObj.sku[this.chioceIndex].confiscate_product_id;
            obj.product_num = this.skuObj.step;
            this.postItem(obj);
            this.skuObj.index = this.chioceIndex;
            this.skuObj.min_amount = this.skuObj.sku[this.chioceIndex].amount;
            let test = {};
            test = Object.assign(test, this.skuObj);
            this.checkIndex(test);
            this.closeSelectedSkuPop();
        },
        // 提交项
        postItem(params) {
            if (this.selItemArr.length === 0) return this.selItemArr.push(params);
            const ids = this.selItemArr.map((item, index) => item.id);
            if (ids.includes(params.id)) {
                this.selItemArr.map((item, index) => {
                    if (params.id === item.id) {
                        item.product_num = params.product_num;
                    }
                });
            } else {
                this.selItemArr.push(params);
            }
        },
        // 提交
        submit(e) {
            if (this.mainArray.length === 0)
                return this.$showToast("系统错误，请稍后重试");
            if (this.selArr.length === 0) {
                this.$showToast("请选择商品");
                return;
            }
            console.log('this.selArr', this.selArr)
            this.selArr.map(item => {
                const obj = {};
                if (item.index) {
                    obj.id = item.sku[item.index].confiscate_product_id;
                    obj.product_num = item.step;
                    this.postItem(obj);
                } else {
                    obj.id = item.sku[0].confiscate_product_id;
                    obj.product_num = item.step;
                    this.postItem(obj);
                }
            });
            const goods = JSON.stringify(this.selItemArr);
            // eslint-disable-next-line camelcase
            const total_commission = this.totalAmountE;
            // const a = this.chioceItem
            this.selected = this.isSelSku = false;
            this.$minApi.addWinePubList({
                goods,
                total_commission
            }).then(res => {
                if (res.length === 0) {
                    this.$showToast("提交成功");

                    this.selItemArr = [];
                    this.selArr = [];
                    this.selNum = [];
                    this.mainArray.map(item => {
                        item.list.map(item2 => {
                            if (item2.step > 0) {
                                this.$set(item2, "step", 0);
                            }
                        });
                    });

                    setTimeout(() => {
                        uni.redirectTo({
                            url: '../index/index'
                        });
                    }, 2000);
                }
            });
        }
    }
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
