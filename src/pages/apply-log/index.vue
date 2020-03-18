<template>
  <view class="apply-log p-lr-30 p-tb-30">
    <min-cell>
      <min-cell-item
        v-for="(item, index) in list" :key="index"
        :img="item.head_img"
        :title="item.store_name"
        :label="`申请时间：${$minCommon.formatDate(new Date(item.create_time * 1000), 'yyyy-MM-dd hh:mm:ss')}`"
        :tail="status[item.status].statusText"
        :tailType="status[item.status].color"
        :border="list.length !== index + 1"
      ></min-cell-item>
    </min-cell>
    <view class="nodata-wrap" v-if="list.length === 0">
      <image class="nodata" src="../../static/images/nodata.png" />
      <view class="text">暂无</view>
    </view>
  </view>
</template>

<script>
const status = {
  1: { statusText: '待审核', color: 'green' },
  2: { statusText: '已通过', color: 'black' },
  3: { statusText: '未通过', color: 'red' }
}

export default {
  name: 'apply-log',
  navigate: ['navigateTo', 'switchTab'],
  data () {
    return {
      status,
      list: [],
      total: -1,
      params: {
        page: 1,
        limit: 10
      }
    }
  },
  onReachBottom () { // 下拉翻页
    this.getApplyLog()
  },
  onPullDownRefresh () { // 上拉刷新
    this.params.page = 1
    this.getApplyLog('shuaxin')
    setTimeout(() => {
      uni.stopPullDownRefresh() // 停止下拉刷新动画
    }, 2000)
  },
  mounted () {
    this.getApplyLog()
  },
  methods: {
    getApplyLog (shuaxin) {
      if (this.total === this.list.length) return // 没有更多数据了
      this.$minApi.applyLog(this.params).then(res => {
        if (shuaxin) this.list = []
        this.list = this.list.concat(res.list)
        this.total = res.list.total
        this.params.page++
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
