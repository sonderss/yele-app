<template>
  <view class="reservation-date p-lr-30 p-tb-20">
    <min-cell  >
      <min-cell-item
         v-for="(item,index) in list"
        :key="index"
        :title="item.title"
        :tail="item.is_booked === 0 ? '可预约' : item.sales_name"
        :tailcolor="item.is_booked === 0 ? true : false"
        tailType='red'
        :border="true"
        @eventParent="backBook(index)"
      ></min-cell-item>
    </min-cell>
  </view>
</template>

<script>

export default {
  name: 'reservation-date',
  navigate: ['navigateTo'],
  data () {
    return {
      list: [],
      times: ''
    }
  },
  methods: {

    backBook (index) {
      if (this.list[index].is_booked !== 1) {
        this.times = this.list[index].title
        console.log(this.times)
        const pages = getCurrentPages() // 获取所有页面栈实例列表
        const prevPage = pages[pages.length - 2] // 上一页页面实例
        prevPage.$vm.dates = this.times// 修改上一页data里面的city参数值为123
        uni.navigateBack({ // uni.navigateTo跳转的返回，默认1为返回上一级
          delta: 1
        })
      }
    }
  },
  onLoad () {
    this.list = this.$parseURL().data
    console.log(this.list)
    this.list.map((item, index) => {
      const time = new Date(item.booking_time * 1000)
      const f = '星期' + '日一二三四五六'.charAt(time.getDay())
      const a = this.$minCommon.formatDate(time, 'yyyy-MM-dd')
      item.title = '' + a + ' ' + f
      if (item.is_booked === 1) {
        item.title += '( 已预约 )'
      }
    })
  }
}

</script>

<style lang="scss" scoped>

</style>
