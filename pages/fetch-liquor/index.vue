<template>
  <view class="fetch-liquor p-tb-20 p-lr-30">
    <min-search v-model="search" placeholder="客户姓名/手机号查询"/>
    <view class="list p-top-20" v-for="(item,index) in getNewData" :key="index">
      <view class="card p-lr-20">
        <view class="top p-tb-30 min-border-bottom">
          <view class="order-num">单号：{{item.deposit_sn}}</view>
          <view class="status">已生效</view>
        </view>
        <view class="main p-tb-30">
          <view class="item">客户姓名：{{item.client_name}}</view>
          <view class="item">联系电话：{{item.client_mobile}}</view>
          <view class="item">存酒数量：{{item.product_count}}</view>
        </view>
        <view class="bottom p-tb-20 min-border-top">
          <view class="date">{{item.create_time}}</view>
          <min-btn size="xs" type="white" @click="toGetWine(index)" border>取酒</min-btn>
        </view>
      </view>
    </view>
    <min-404 v-if="getNewData.length === 0 "></min-404>
  </view>
</template>

<script>
export default {
  name: 'fetch-liquor',
  navigate: ['navigateTo'],
  data () {
    return {
      search: '',
      list: [],
      clentInfo: {},
      arr: []
    }
  },
  computed: {
    getNewData () {
      const newData = []
      this.list.filter(item => {
        if (item.client_name.indexOf(this.search) >= 0 || item.client_mobile.indexOf(this.search) >= 0) {
          newData.push(item)
        }
      })
      return newData
    }
  },

  mounted () {
    // 获取存酒记录
    this.$minApi.getWinekeepingrecord()
      .then(res => {
        this.list = res
        console.log(this.list)
      })
    this.clentInfo = {
      name: this.$parseURL().name,
      phone: this.$parseURL().phone
    }
  },
  methods: {

    toGetWine (index) {
      this.$minRouter.push({
        name: 'liquor-code',
        params: { info: this.clentInfo, client_name: this.list[index].client_name, client_mobile: this.list[index].client_mobile, id: this.list[index].id, opening_id: this.list[index].opening_id }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.fetch-liquor{
  .list{
    .card{
      background: #fff;
      border-radius: 10rpx;
      .top{
        display: flex;
        justify-content: space-between;
        .status{
          color: #0090FF;
        }
      }
    }
    .main{
      .item{
        margin-top: 10rpx;
        &:first-child{
          margin: 0;
        }
      }
    }
    .bottom{
      display: flex;
      justify-content: space-between;
      .date{
        font-size: 24rpx;
        color: #666666;
        line-height: 68rpx;
      }
    }
  }
}

</style>
