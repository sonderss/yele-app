<template>
  <view class="change-platform p-tb-20 p-lr-30">

        <min-search v-model="search" placeholder="请输入桌台号搜索"/>
         <view v-if="getNewData.length > 0">
            <view class="platform-wrap p-top-20" v-for="(item,index) in getNewData" :key="index">
              <view class="title">{{item.group_name}}</view>
              <view class="list">
                <view :class="active1 == index && active2 === index2 ? 'item in-order': 'item leisure' " @click="chioce1(index,index2)" v-for="(item2, index2) in item.desk_lists" :key="index2">
                  <view class="name">{{item2.desk_name}}</view>
                  <view class="status">{{statusArr[item2.desk_status].name }}</view>
                  <view class="count">{{$minCommon.getSeats(item2.seats)}}</view>
                </view>
              </view>
            </view>
        <view class="empty-view"></view>
         </view>
        <view class="btn-wrap">
          <view :class="isdisabled ? 'btn_dis':'btn' "  @click="submit">转台</view>
        </view>

    <min-404 id='my' desc="搜索其他台试试？" v-if="getNewData.length ===  0"></min-404>
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
    this.getData()
  },
  computed: {
    getNewData () {
      let data = []
      if (this.search) {
        const obj = {}
        this.newList.map(item => {
          item.desk_lists.map(item2 => {
            if (item2.desk_name.includes(this.search)) {
              Object.assign(obj, item)
              obj.desk_lists = []
              obj.desk_lists.push(item2)
              data.push(obj)
            }
          })
        })
      } else {
        data = this.newList
      }
      data = this.$minCommon.arrSet(data)
      return data
    }
  },
  watch: {
    getNewData: {
      handler (a) {
        if (a.length === 0) {
          this.isdisabled = true
        } else {
          this.isdisabled = false
        }
      },
      deep: true
    }
  },
  data () {
    return {
      statusArr,
      data: {},
      search: '',
      active1: 0,
      active2: 0,
      list: [],
      newList: [],
      isdisabled: false
    }
  },
  methods: {
    getData () {
      const month = new Date().getMonth() + 1
      const day = new Date().getDate()
      const year = new Date().getFullYear()
      const date = year + '-' + month + '-' + day
      this.$minApi.GetTableList({ date })
        .then(res => {
          this.list = res.desks
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
          this.newList = arr
          console.log(this.newList)
        })
    },
    chioce1 (index, index2) {
      this.active1 = index
      this.active2 = index2
    },
    submit () {
      if (!this.isdisabled) {
        if(this.data.old_id === this.newList[this.active1].desk_lists[this.active2].id)return this.$showToast('该台与原台位相同')
        this.$minApi.changeOrder({
          desk_id: this.data.old_id,
          to_id: this.newList[this.active1].desk_lists[this.active2].id
        })
          .then(res => {
             console.log(res)
             this.$showToast('转台成功!')
             setTimeout(() => {
                uni.navigateBack({
                    delta: 2
                });
             },2000)
             
          })
      }
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
      padding-left: 20rpx;
      .item{
        display: inline-block;
        width: 140rpx;
        border-radius:10rpx;
        padding: 20rpx 0;
        text-align: center;
        // margin-left: 30rpx;
        &:nth-child(n){
          // margin: 0;
          // margin-top: 20rpx;
          margin-right: 20rpx;
          margin-bottom: 20rpx;
        }

        &:nth-child(4n){
          // margin: 0;
          // margin-top: 20rpx;
          margin-right: 0;
          margin-bottom: 20rpx;
        }
        &:first-child{
          // margin: 0;
          margin-right: 20rpx;
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
    .btn{
      width:100%;
    height:98rpx;
    background:rgba(255,224,1,1);
    text-align: center;
    line-height: 98rpx;
    }.btn_dis{
        width:100%;
    height:98rpx;
    background:#EEEEEE;
    text-align: center;
    line-height: 98rpx;
    }
  }
}
</style>
