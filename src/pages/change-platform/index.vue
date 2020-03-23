<template>
  <view class="change-platform p-tb-20 p-lr-30">
    <min-search v-model="search" placeholder="请输入桌台号搜索"/>
    <view class="platform-wrap p-top-20" v-for="(item,index) in getData" :key="index">
      <view class="title">{{item.group_name}}</view>
      <view class="list">
        <view :class="active1 == index && active2 === index2 ? 'item in-order': 'item leisure' " @click="chioce1(index,index2)" v-for="(item2, index2) in item.desk_lists" :key="index2">
          <view class="name">{{item2.desk_name}}</view>
          <view class="status">{{statusArr[item2.desk_status].name }}</view>
          <view class="count">{{$minCommon.getSeats(item2.seats)}}</view>
        </view>
      </view>
    </view>
    <!-- <view class="platform-wrap p-top-20">
      <view class="title">雅座区</view>
      <view class="list">
        <view :class="active2 == index ? 'item in-order': 'item leisure' "  @click="chioce2(index)" v-for="(item, index) in 6" :key="index">
          <view class="name">K222</view>
          <view class="status">空闲中</view>
          <view class="count">6座</view>
        </view>
      </view>
    </view> -->
    <view class="empty-view"></view>
    <view class="btn-wrap">
      <min-btn shape="flat" :opacity="false" @click="submit">转台</min-btn>
    </view>
    <min-modal ref='test'></min-modal>
    <!-- <view >{{getData}}</view> -->
  </view>
</template>

<script>
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
export default {
  name: 'change-platform',
  navigate: ['navigateTo'],
  onLoad () {
    this.data = this.$parseURL()
  },
  mounted () {
    const month = new Date().getMonth() + 1
    const day = new Date().getDate()
    const year = new Date().getFullYear()
    const date = year + '-' + month + '-' + day
    this.$minApi.GetTableList({ date })
      .then(res => {
        this.list = res.desks
      })
  },
  computed: {
    getData () {
      let indexA = []
      const idnexBrr = []
      this.list.map((item, index) => {
        item.desk_lists.map((item2, index2) => {
          if (item2.desk_status === 2) {
            indexA.push(index)
            idnexBrr.push(item2)
          }
        })
      })
      indexA = this.$minCommon.arrSet(indexA)
      const arr = []
      indexA.map(item => {
        const obj = {
          id: this.list[item].id,
          group_name: this.list[item].group_name,
          desk_lists: []
        }
        arr.push(obj)
      })
      arr.map(item => {
        idnexBrr.map(item2 => {
          if (item.id === item2.group_id) {
            item.desk_lists.push(item2)
          }
        })
      })
      // console.log(arr)
      return arr
    }
  },
  data () {
    return {
      statusArr,
      data: {},
      search: '',
      active1: Number,
      active2: Number,
      list: []
    }
  },
  methods: {
    chioce1 (index, index2) {
      // this.active2 = Number
      this.active1 = index
      this.active2 = index2
      console.log(index, index2)
    },
    submit () {
      // console.log(this.data.old_id)
      // console.log(this.active1, this.active2)
      // console.log(this.getData[this.active1].desk_lists[this.active2])
      this.$minApi.changeOrder({
        id: this.data.old_id,
        to_id: this.getData[this.active1].desk_lists[this.active2].id
      })
        .then(res => {
          console.log(res)
        })
    }
  }
}

</script>

<style lang="scss" scoped>
.change-platform{
  .platform-wrap{
    background: #fff;
    padding: 30rpx 20rpx;
    margin-top: 20rpx;
    .title{
      font-size: 30rpx;
      padding-bottom: 30rpx;
    }
    .list{
      .item{
        display: inline-block;
        width: 140rpx;
        border-radius:10rpx;
        padding: 20rpx 0;
        text-align: center;
        margin-left: 30rpx;
        &:nth-child(5n){
          margin: 0;
          margin-top: 20rpx;
        }
        &:first-child{
          margin: 0;
        }
        &>view{
          font-size: 28rpx;
          color: #fff
        }
        .status{
          margin: 4rpx 0;
        }
        &.reserved{ // 已预约
          background:#0090ff;
          &>view{
            color: #fff
          }
        }
        &.been-open{ // 已开台
          background:#ff0000;
        }
        &.be-confirm, .clearing{ // 待确认  清台中
          background:#39ba01;
        }
        &.in-order{ // 点单中
          background:#ff9c00;
        }
        &.leisure{ // 空闲中
          background:#eeeeee;
          &>view{
            color: #666
          }
        }
        &.disabled{ // 已停用
          background:#eeeeee;
          &>view{
            color: #ccc
          }
        }
      }
    }
  }
  .active1{
      background: #ff9c00
  }
  .empty-view{
    width: 100%;
    height: 120rpx;
  }
  .btn-wrap{
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
}
</style>
