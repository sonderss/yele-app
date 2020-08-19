<template>
  <view class="order-list p-tb-20 p-lr-30">
    <min-order-list :list="list"></min-order-list>
    <min-pulldown :isFlag="falg" :desc="des" :loading="load" />
  </view>
</template>
<script>
export default {
  name: 'order-list',
  navigate: ['navigateTo'],
  data() {
    return {
      list: [],
      falg: false,
      des: '加载中',
      page: 2,
      load: true,
    }
  },
  onLoad() {
    this.getData(1).then(res => {
      this.list = res.list
      console.log(this.list)
      this.list.map(item => {
        if (item.order_product_list.length > 4) {
          item.order_product_list.splice(4)
        }
      })
    })
  },
  methods: {
    async getData(page, isLoading = false) {
      return await this.$minApi.getOrderListDown({
        opening_id: this.$parseURL().open_id,
        page,
        limit: 10,
        isLoading,
      })
    },
  },
  onReachBottom() {
    console.log('到底')
    this.falg = true
    this.getData(this.page, true).then(res => {
      if (res.list.length === 0) {
        this.load = false
        this.des = '暂无更多数据'
        setTimeout(() => {
          return (this.falg = false)
        }, 1000)
      }
      this.page++
      this.list = this.list.concat([...res.list])
      this.list.map(item => {
        if (item.order_product_list.length > 4) {
          item.order_product_list.splice(4)
        }
      })
    })
  },
  onPullDownRefresh() {
    this.getData(1, true).then(res => {
      this.list = res.list
      this.list.map(item => {
        if (item.order_product_list.length > 4) {
          item.order_product_list.splice(4)
        }
      })
      this.page = 2
      uni.stopPullDownRefresh()
    })
  },
}
</script>

<style lang="scss" scoped>
</style>
