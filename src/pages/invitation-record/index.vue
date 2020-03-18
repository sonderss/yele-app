
<template>
  <view class="invitation-record p-lr-30 p-tb-30">

      <min-cell-item
        v-for="(item, index) in 2" :key="index"
        :img="item.head_img ? item.head_img : '../../static/images/headurl60.png' "
        title="刘大大"
        label="申请时间：2019-12-05  14:05:36"
        :tail="status[1].statusText"
        :tailType="status[1].color"
        :border="list.length !== index + 1"
        class="m-bottom-20"
      ></min-cell-item>

    <view class="nodata-wrap" v-if="list.length === 0">
      <image class="nodata" src="../../static/images/nodata.png" />
      <view class="text">暂无</view>
    </view>
  </view>
</template>
<script>
const status = {
  1: { statusText: '待审核', color: 'red' },
  2: { statusText: '已通过', color: 'green' },
  3: { statusText: '未通过', color: 'red' }
}

export default {
  name: 'invitation-record',
  navigate: ['navigateTo', 'switchTab'],
  data () {
    return {
      status,
      list: [1],
      total: -1,
      params: {
        page: 1,
        limit: 10
      }
    }
  },
  onReachBottom () { // 下拉翻页
    // this.getApplyLog()
  },
  onPullDownRefresh () { // 上拉刷新
    // this.params.page = 1
    // this.getApplyLog('shuaxin')
    // setTimeout(() => {
    //   uni.stopPullDownRefresh() // 停止下拉刷新动画
    // }, 2000)
  },
  mounted () {
    // this.getApplyLog()
  },
  methods: {
    // getApplyLog (shuaxin) {
    //   if (this.total === this.list.length) return // 没有更多数据了
    //   this.$minApi.applyLog(this.params).then(res => {
    //     if (shuaxin) this.list = []
    //     this.list = this.list.concat(res.list)
    //     this.total = res.list.total
    //     this.params.page++
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>
