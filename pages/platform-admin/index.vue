<template>
<view class="platform-admin p-lr-20 p-tb-30" @touchstart="start" @touchmove="move" @touchend="end">
    <view class="aaaa" :style="{height:`${top}rpx`,width:'100%',lineHeight:`${top}rpx`}" v-if="top">
        <view class="m-top-20 f26">
            <text class="iconfont icon-changyongicon_huaban f26" style="font-weight:blod;">&#xe616;</text>
            {{top >= 300 ? '松开':'下拉'}}查看座位分布图
        </view>
    </view>
    <scroll-view scroll-y :style="{transition: top === 0 ? 'transform 300ms':'',transform: 'translateY('+ top + 'rpx' +')'}">
        <view class="btns">
            <view :class="status === item.value ? 'btn active' : 'btn'" @click="chioceItem(item.value)" v-for="(item,index) in title" :key="index">{{item.name}}</view>
        </view>
        <view class="platform-wrap" v-if=" getMineChange && getMineChange.length > 0">
            <view class="title">我的台位</view>
            <view class="list">
                <view class="item" :class="[statusArr[item.desk_status].class,(index%4) ==0 ? 'one':'']" v-for="(item, index) in getMineChange" :key="index" @click="goDetail(item.id,item.desk_status)">
                    <view class="name">{{item.desk_name}}</view>
                    <view class="status">{{statusArr[item.desk_status].name}}</view>
                    <view class="count">{{$minCommon.getSeats(item.seats)}}</view>
                </view>
            </view>
        </view>
        <view v-for="(item,index) in getDataChange" :key="index">
            <view class="platform-wrap" v-if="item.desk_lists.length > 0">
                <view class="title">{{item.group_name}}</view>
                <view class="list">
                    <view class="item" :class="[statusArr[item2.desk_status].class,(index2%4) ==0 ? 'one':'']" v-for="(item2, index2) in item.desk_lists" :key="index2" @click="goDetail(item2.id,item2.desk_status)">
                        <view class="name">{{item2.desk_name}}</view>
                        <view class="status">{{statusArr[item2.desk_status].name}}</view>
                        <view class="count">{{$minCommon.getSeats(item2.seats)}}</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- <picker mode="date" id='abc' ref='test'  :value="date" start="2020-03-13" :end="endDate" @change="bindDateChange">

      </picker>-->
        <!-- <min-popup size="height" :show="show" @close='close'>
      <min-picker  @cancel="cancel" @sure="sure"></min-picker>
      </min-popup>-->
        <min-404 id="none" v-if="getDataChange.length === 0"></min-404>
    </scroll-view>

    <min-popup :show="show" @close="close" heightSize="600">
        <picker-view :indicator-style="indicatorStyle" @change="bindChange" :value="value" style="height:400rpx;">
            <picker-view-column>
                <view class="pickers item" :class="num === index ? 'active':  (index === num - 1 ? 'f36 cfz' : index === num - 2 ? 'f28 cjq': (index === num + 1 ? 'f36 cfz' : index === num + 2 ? 'f28 cjq' : 'f20' )  ) " v-for="(item,index) in datas" :key="index">{{item}}</view>
            </picker-view-column>
        </picker-view>
        <view class="btn_viewcjq">
            <text @click="cancel" class="cancl">取消</text>
            <view class="btn" @click.stop="sures">确认</view>
        </view>
    </min-popup>
</view>
</template>

<script>
// eslint-disable-next-line no-unused-vars
const statusArr = [
    // 1 - 已停用, || 2 - 空闲,|| 3 - 已预约,|| 4 - 点单中,|| 6 - 已开台,  ||  5 - 待确认  7 - 清台中
    {
        name: 'null',
        class: ''
    },
    {
        name: '已停用',
        class: 'disabled'
    },
    {
        name: '空闲中',
        class: 'leisure'
    },
    {
        name: '已预约',
        class: 'reserved'
    },
    {
        name: '点单中',
        class: 'in-order'
    },
    {
        name: '待确认',
        class: 'be-confirm'
    },
    {
        name: '已开台',
        class: 'been-open'
    },
    {
        name: '清台中',
        class: 'clearing'
    },
]
// 座位数量:0 - 未选,1 - 1座，2 - 2座，3 - 3座，4 - 4座，5 - 6座，6 - 8座，7 - 10座，8 - 12座，9 - 12座以上
export default {
    name: 'platform-admin',
    navigate: ['navigateTo', 'switchTab'],
    data() {
        return {
            statusArr,
            list: [],
            mines: [],
            show: false,
            date: '',
            title: [],
            num: 0,
            status: 999,
            testArrabc: [],
            top: '',
            lastY: '',
            flag: true,
            datas: [],
            newData: [],
            value: [],
            isPayS: "",
            indicatorStyle: `height: ${Math.round(
        uni.getSystemInfoSync().screenWidth / (750 / 100)
      )+20}rpx;`,
        }
    },
    onBackPress(options) {
        if (this.isPayS === 'true') {
            // 下单支付成功特殊处理
            uni.reLaunch({
                url: '../index/index'
            });
            return true
        }
        const pages = getCurrentPages() //当前页
        const beforePage = pages[pages.length - 2] //上个页面
        const page = pages[pages.length - 1] //页面
        if (options.from === 'backbutton') {
            if (beforePage.route !== 'pages/platform-admin/index') {
                this.back(1)
                return true
            } else {
                uni.navigateBack({
                    delta: 2,
                })
                // uni.redirectTo({
                //   url: '../index/index',
                // })
                // this.$minRouter.push({
                //   name: 'index',
                // })
                return true
            }
        }
    },
    onLoad(option) {
        console.log(option)
        this.isPayS = option.isPayscuess
        const month = new Date().getMonth() + 1
        const day = new Date().getDate()
        // const year = new Date().getFullYear()
        // this.date = year + '-' + month + '-' + day
        this.date = this.$minCommon.formatDate(new Date(), 'yyyy-MM-dd')
        this.$store.dispatch('status/setMyDate', this.date)
        // #ifdef APP-PLUS
        const pages = getCurrentPages()
        const page = pages[pages.length - 1]
        const currentWebview = page.$getAppWebview()
        currentWebview.setTitleNViewButtonStyle(0, {
            text: `${month}月${day}日${this.$minCommon.getDay(new Date(this.date).getDay())}  `,
        })
        // const titleObj = currentWebview.getStyle().titleNView
        // titleObj.buttons[0].text = `${month}月${day}日`
        // currentWebview.setStyle({
        //   titleNView: titleObj
        // })
        // #endif
        // this.getData(this.date)
        if (this.$store.state.status.bookTime && this.$store.state.status.bookTime[0] === this.$minCommon.formatDate(new Date(), 'yyyy-MM-dd')) {
            return (this.datas = this.$store.state.status.bookTime)
        }
        let arr = []
        this.$minApi.getStoreSet({
            isLoading: true
        }).then(res => {
            this.newData = res.book.date
            res.book.date.map(item => {
                let a = item.split('-')[1] + '月' + item.split('-')[2] + '日' + ' ' + this.$minCommon.getDay(new Date(item).getDay())
                arr.push(a)
            })
            this.datas = arr
            // console.log(this.datas)
            this.$store.dispatch('status/setBookTime', arr)
        })
    },
    onShow() {
        this.getData(this.date)
    },
    mounted() {
        // this.getData('2020-3-18')
    },
    updated() {},
    onNavigationBarButtonTap() {
        this.show = !this.show
    },
    computed: {
        // 返回桌台数组
        getDataChange() {
            const a = this.filterData(this.list.desks ? this.list.desks : [])
            return a
        },
        // 我的桌台
        getMineChange() {
            let arr = []
            // 定义一个分组，任何改变都根据这个分组来操作]
            const newListDesk = []
            if (this.status === 999) {
                // 全部桌台信息
                arr = this.list.mines
            } else {
                this.list.mines.map(item => {
                    if (item.desk_status === this.status) {
                        newListDesk.push(item)
                    }
                })
                arr = newListDesk
            }
            return arr
        },
    },
    methods: {
        back(a) {
            uni.navigateBack({
                delta: a,
            })
        },
        newArr(arr) {
            let brr = {}
            const newArr = []
            arr.map(item => {
                if (brr.id !== item.id) {
                    brr = item
                    newArr.push(brr)
                }
            })
            return newArr
        },
        // 封装一个筛选函数
        filterData(array) {
            let arr = []
            // 定义一个分组，任何改变都根据这个分组来操作]
            let newListDesk = []
            if (this.status === 999) {
                // 全部桌台信息
                arr = array // this.list.desks
            } else {
                array.map((item, index) => {
                    item.desk_lists.map((item2, index2) => {
                        if (item2.desk_status === this.status) {
                            newListDesk.push(array[index])
                        }
                    })
                })
                // 去除新组重复的项
                newListDesk = this.newArr(newListDesk)
                let arrData = []
                // 去除具体项不符合的条件
                newListDesk.map((item, index) => {
                    const obj = {
                        desk_lists: [],
                        id: item.id,
                        group_name: item.group_name,
                    }
                    item.desk_lists.map(item2 => {
                        if (item2.desk_status === this.status) {
                            obj.desk_lists.push(item2)
                            arrData.push(obj)
                        }
                    })
                })
                // 去重
                arrData = this.newArr(arrData)
                arr = arrData
            }
            return arr
        },
        // 导航选中事件
        chioceItem(status) {
            // 已预约 status 3
            this.status = status
            /**
             *  传进去标题所代表的的状态码
             *  根据状态码找到对应的数据对象
             *  根据数据对象的组id反拿到组的数据
             *  把新数据给到一个变量赋值给list
             */
        },
        // 获取数据
        getData(date) {
            this.$minApi
                .GetTableList({
                    date
                })
                .then(res => {
                    this.list = res
                    this.desks = res.desks
                    this.mines = res.mines
                    this.title = res.title
                    this.getSeatData()
                })
                // eslint-disable-next-line handle-callback-err
                .catch(err => {
                    console.log('桌台列表获取失败')
                })
        },
        getSeatData() {
            let arr = []
            let brr = []
            this.$minApi.getSeatList({
                isLoading: true
            }).then(res => {
                this.list.desks.map(item => {
                    item.desk_lists.map(item2 => {
                        arr.push({
                            id: item2.id,
                            desk_status: item2.desk_status
                        })
                    })
                })
                JSON.parse(res.desk_coordinate).map(item => {
                    arr.map(item2 => {
                        if (item.id === item2.id) {
                            item.status = item2.desk_status
                            return brr.push(item)
                        }
                    })
                })
                res.desk_coordinate = JSON.stringify(brr)
                this.$store.dispatch('status/setSeatList', res)
            })
        },
        // 台详情
        goDetail(id, status) {
            this.$minRouter.push({
                name: 'platform-detail',
                params: {
                    id: id,
                    status: status,
                    date: this.date
                },
            })
        },
        // 日期选择器关闭
        close() {
            this.show = false
        },
        // 日期选择器取消
        cancel() {
            this.close()
        },
        bindChange(e) {
            this.num = e.detail.value[0]
            console.log(this.num)
        },
        // 日期选择器确认
        sures() {
            // 2020-05-29
            let a = this.newData[this.num]
            this.$store.dispatch('status/setMyDate', this.date)
            this.date = a
            let ti = this.date.split('-')
            let ass = this.date.split('-')[1] + '月' + this.date.split('-')[2] + '日' + ' ' + this.$minCommon.getDay(new Date(this.date).getDay()) + ' '
            // let t = ti[1] + '月' + ti[2] + '日'
            let t = ass
            this.value = []
            this.value.push(this.num)
            this.show = false
            // #ifdef APP-PLUS
            const pages = getCurrentPages()
            const page = pages[pages.length - 1]
            const currentWebview = page.$getAppWebview()
            const titleObj = currentWebview.getStyle().titleNView
            titleObj.buttons[0].text = ''
            titleObj.buttons[0].text = t
            currentWebview.setStyle({
                titleNView: titleObj,
            })
            // #endif
            this.getData(this.date)
        },
        start(e) {
            this.lastY = e.changedTouches[0].pageY
        },
        move(e) {
            let currentY = e.changedTouches[0].pageY
            if (this.top < currentY - this.lastY) {
                // 像下滚动
                this.top = currentY - this.lastY
                this.flag = true
            } else {
                // 向上滚动
                //  this.top = 0
                this.flag = false
            }

            // console.log(this.top)
            // var pages = getCurrentPages();
            // var page = pages[pages.length - 1];
            // var currentWebview = page.$getAppWebview();

            // var tn = currentWebview.getStyle().titleNView;
            // console.log(tn)
        },
        end(e) {
            if (this.top >= 300 && this.flag) {
                this.$minRouter.push({
                    name: 'seat',
                    params: {
                        url: 'platform-admin'
                    },
                })
            }
            // var pages = getCurrentPages();
            // var page = pages[pages.length - 1];
            // var currentWebview = page.$getAppWebview();

            // var tn = currentWebview.getStyle().titleNView;
            // console.log(tn)
            // // backgroundColor  titleColor
            // tn.backgroundColor = "#030313"
            // tn.titleColor = "#FFE001"
            // tn.buttons[0].color  = "#FFE001"
            // currentWebview.setStyle({
            //     titleNView: tn
            // });
            // this.a  = 0.00
            return (this.top = 0)
        },
    },
}
</script>

<style lang="scss" scoped>
@import './index.scss';

.aaaa {
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
}
</style>
