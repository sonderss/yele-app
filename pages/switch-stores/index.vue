<template>
  <view class="switch-stores m-lr-30 p-top-20">
    <view class="add-stores" @click="navigateTo">
      <image src='/static/images/yellow-add.png' class="add-icon" />
      <view class="text">申请加入其他门店</view>
    </view>
    <view class="m-top-20"></view>
    <min-cell :card="false">
      <min-cell-item
        v-for="(item, index) in storeList" :key="index"
        :img="item.head_img"
        :title="item.store_name"
        :label="item.address"
        :border="index === storeList.length -1 ? false : true"
        arrow
        @eventParent="changestore(item.store_id)"
      ></min-cell-item>
    </min-cell>
    <view class="nodata-wrap" v-if="storeList.length === 0">
      <image class="nodata" src="/static/images/nodata.png" />
      <view class="text">暂无</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'switch-stores',
  navigate: ['navigateTo', 'switchTab'],
  data () {
    return {
      params: {
        page: 1,
        limit: 10
      },
      total: -1, // 总数
      storeList: []
    }
  },
  mounted () {
    this.getStoreList()
  },
  onReachBottom () { // 下拉翻页
    this.getStoreList()
  },
  onPullDownRefresh () { // 上拉刷新
    this.params.page = 1
    this.getStoreList('shuaxin')
    setTimeout(() => {
      uni.stopPullDownRefresh() // 停止下拉刷新动画
    }, 2000)
  },
  methods: {
    navigateTo () {
      this.$minRouter.push({
        name: 'apply-stores',
        type: 'navigateTo',
        path: '/pages/switch-stores/index'
      })
    },
    changestore(id){
        this.$minApi.changeStore({
          store_id:id
        }).then(res=>{
          console.log(res)
          this.$showToast('切换成功')
           this.$store.dispatch('user/setUserInfoAuth', res.apiAuth)
          setTimeout(() => {
              this.$minRouter.push({
                name:'index'
              })
          },2000)
        })
    },
    getStoreList (shuaxin) {
      if (this.total === this.storeList.length) return // 没有更多数据了
      this.$minApi.getStoreList(this.params).then(res => {
        if (shuaxin) this.storeList = []
        this.storeList = this.storeList.concat(res.list)
        this.total = res.list.total
        this.params.page++
      })
    }
  }
}
</script>

<style lang="scss" scoped>
page {
  background-color: #F7F7F7;
}
.switch-stores{
  .add-stores{
    background: #fff;
    border-radius: 10rpx;
    padding: 30rpx 20rpx;
    display: flex;
    align-items: center;
    .add-icon{
      display: inline-block;
      width: 44rpx;
      height: 44rpx;
    }
    .text{
      display: inline-block;
      vertical-align: middle;
      margin-left: 20rpx;
    }
  }
}
</style>
