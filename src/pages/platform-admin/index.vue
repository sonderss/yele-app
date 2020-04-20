<template>
  <view class="platform-admin p-tb-20 p-lr-30">
    <view class="btns">
      <view :class="status === item.value ? 'btn active' : 'btn'" @click="chioceItem(item.value)" v-for="(item,index) in title" :key="index">{{item.name}}</view>

    </view>
    <view class="platform-wrap" v-if="mines.length !== 0">
      <view class="title">我的台位</view>
      <view class="list">
        <view class="item" :class="statusArr[item.desk_status].class" v-for="(item, index) in list.mines" :key="index"  @click="goDetail(item.id,item.desk_status)">
          <view class="name">{{item.desk_name}}</view>
          <view class="status">{{statusArr[item.desk_status].name}}</view>
          <view class="count">{{$minCommon.getSeats(item.seats)}}</view>
        </view>
      </view>
    </view>
    <view  v-for="(item,index) in getDataChange" :key="index">
        <view class="platform-wrap"   v-if="item.desk_lists.length > 0">
          <view class="title" >{{item.group_name}}</view>
          <view class="list">
            <view
              class="item"
              :class="statusArr[item2.desk_status].class"
              v-for="(item2, index2) in item.desk_lists"
              :key="index2"
              @click="goDetail(item2.id,item2.desk_status)"
            >
              <view class="name">{{item2.desk_name}}</view>
              <view class="status">{{statusArr[item2.desk_status].name}}</view>
              <view class="count">{{$minCommon.getSeats(item2.seats)}}</view>
            </view>
          </view>
        </view>
    </view>
    <!-- <picker mode="date" id='abc' ref='test'  :value="date" start="2020-03-13" :end="endDate" @change="bindDateChange">

    </picker> -->
    <min-popup size="height" :show="show" @close='close'>
      <min-picker  @cancel="cancel" @sure="sure"></min-picker>
    </min-popup>
   <min-404 id="none" v-if="!getDataChange"></min-404>
  </view>
</template>

<script>
// eslint-disable-next-line no-unused-vars
const statusArr = [
  // 1 - 已停用, || 2 - 空闲,|| 3 - 已预约,|| 4 - 点单中,|| 6 - 已开台,  ||  5 - 待确认  7 - 清台中
  { name: 'null', class: '' },
  { name: '已停用', class: 'disabled' },
  { name: '空闲中', class: 'leisure' },
  { name: '已预约', class: 'reserved' },
  { name: '点单中', class: 'in-order' },
  { name: '待确认', class: 'be-confirm' },
  { name: '已开台', class: 'been-open' },
  { name: '清台中', class: 'clearing' }
]
// 座位数量:0 - 未选,1 - 1座，2 - 2座，3 - 3座，4 - 4座，5 - 6座，6 - 8座，7 - 10座，8 - 12座，9 - 12座以上
export default {
  name: 'platform-admin',
  navigate: ['navigateTo', 'switchTab'],
  data () {
    return {
      statusArr,
      list: [],
      mines: [],
      show: false,
      date: '',
      title: [],
      num: 0,
      status: 999,
      testArrabc: []
    }
  },
  onLoad () {
    const month = new Date().getMonth() + 1
    const day = new Date().getDate()
    // const year = new Date().getFullYear()
    // this.date = year + '-' + month + '-' + day
    this.date = this.$minCommon.formatDate(new Date(), 'yyyy-MM-dd')
    // #ifdef APP-PLUS
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    const currentWebview = page.$getAppWebview()
    const titleObj = currentWebview.getStyle().titleNView
    titleObj.buttons[0].text = `${month}月${day}日`
    currentWebview.setStyle({
      titleNView: titleObj
    })
    // #endif
  },
  mounted () {
    this.getData(this.date)
    // this.getData('2020-3-18')
  },
  onNavigationBarButtonTap () {
    this.show = !this.show
  },
  computed: {
    // 返回数组
    getDataChange () {
      let arr = this.list.desks
      const brr = []
      let indexArr = []
      const indexBrr = []
      if (this.status === 999) {
        arr = this.list.desks
      } else {
        this.list.desks.map((item, index) => {
          item.desk_lists.map((item2, index2) => {
            if (this.status === item2.desk_status) {
              indexArr.push(index)
              indexBrr.push(index2)
            }
          })
        })
        if (indexArr.length === 0 && indexBrr.length === 0) {
          return false
        }
        const itemArr = []
        const itemBrr = []
        indexArr = this.$minCommon.arrSet(indexArr)
        indexArr.map(item => {
          itemArr.push(this.list.desks[item])
        })
        itemArr.map(item => {
          item.desk_lists.map((item2, index) => {
            if (this.status === item2.desk_status) {
              itemBrr.push(item2)
            }
          })
        })
        itemArr.map(item => {
          itemBrr.map(item2 => {
            if (item.id === item2.group_id) {
              const op = []
              op.push(item2)
              const obj = {
                id: item.id,
                group_name: item.group_name,
                desk_lists: op
              }
              brr.push(obj)
            }
          })
        })
        arr = brr
        console.log(brr)

        arr = this.testArr(arr)
        console.log(arr)
      }
      return arr
    }
  },
  methods: {
    testArr (arr) {
      let p = []
      arr.forEach((item, index) => {
        if (p.length !== 0) {
          p.forEach((item2, index2) => {
            if (item2.id !== item.id) {
              p.push(item)
            } else if (item2.id === item.id) {
              item2.desk_lists = item2.desk_lists.concat(item.desk_lists)
            }
          })
        } else {
          p.push(item)
        }
      })
      p = this.$minCommon.arrSet(p)

      return p
    },
    // 导航选中事件
    chioceItem (status) {
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
    getData (date) {
      this.$minApi.GetTableList({ date })
        .then(res => {
          this.list = res
          this.desks = res.desks
          this.mines = res.mines
          this.title = res.title
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          console.log('桌台列表获取失败')
        })
    },
    // 台详情
    goDetail (id, status) {
      this.$minRouter.push({
        name: 'platform-detail',
        params: { id: id, status: status, date: this.date }
      })
    },
    // 日期选择器关闭
    close () {
      this.show = false
    },
    // 日期选择器取消
    cancel () {
      this.close()
    },
    // 日期选择器确认
    sure (e) {
      this.date = e.b + '月' + e.c + '日'
      console.log(this.date)
      // #ifdef APP-PLUS
      const pages = getCurrentPages()
      const page = pages[pages.length - 1]
      const currentWebview = page.$getAppWebview()
      const titleObj = currentWebview.getStyle().titleNView
      titleObj.buttons[0].text = this.date
      currentWebview.setStyle({
        titleNView: titleObj
      })
      // #endif
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
