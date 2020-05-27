<template>
  <view class="about p-lr-20 p-tb-20">
      <min-data-show  :id="this.id" :list="list" :titles="titles" :right="rightA"/>
  </view>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      list: { data: [{ data: [{ name: '123', aa: '213', asd: '12' }] }, { data: [{ name: '123', aa: '213', asd: '321' }] }, { data: [{ name: '123', aa: '2', asd: '2' }] }] },
      titles: ['姓名', '手机号', '业绩'],
      rightA: true
    }
  },
  onLoad (option) {
    console.log(option)
    this.id = option.id
    switch (option.id) {
      case '0':
        uni.setNavigationBarTitle({
          title: '营销订台业绩统计'
        })
        break
      case '1':
        uni.setNavigationBarTitle({
          title: '营销开台业绩统计'
        })
        break
      case '2':
        uni.setNavigationBarTitle({
          title: '角色业绩统计'
        })
        this.rightA = false
        break
      case '3':
        uni.setNavigationBarTitle({
          title: '无业绩人员名单'
        })
        this.rightA = false
        break
      case '4':
        uni.setNavigationBarTitle({
          title: '单品销售统计'
        })
        break
      case '5':
        uni.setNavigationBarTitle({
          title: '套餐销售统计'
        })
        break
      case '6':
        uni.setNavigationBarTitle({
          title: '销售业绩统计'
        })
        break
      case '7':
        uni.setNavigationBarTitle({
          title: '角色销售业绩统计'
        })
        break
      default:
    }
  }
}
</script>

<style>

</style>
