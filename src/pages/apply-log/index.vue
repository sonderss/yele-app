<template>
  <view class="apply-log p-lr-30 p-tb-30">
    <min-cell>
      <min-cell-item
        v-for="(item, index) in list" :key="index"
        :img="item.img"
        :title="item.title"
        :label="item.subtitle"
        :tail="item.tail"
        :tailType="status[item.status]"
        :border="list.length !== index + 1"
      ></min-cell-item>
    </min-cell>
  </view>
</template>

<script>
const status = ['green', 'red', 'black']

export default {
  name: 'apply-log',
  navigate: ['navigateTo', 'switchTab'],
  data () {
    return {
      status,
      list: [{
        img: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg',
        title: 'SIMBA',
        subtitle: '申请时间：2019-12-5 14:01:25',
        tail: '待审核',
        status: 0
      }, {
        img: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg',
        title: 'SIMBA',
        subtitle: '申请时间：2019-12-5 14:01:25',
        tail: '未通过',
        status: 1
      }, {
        img: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg',
        title: 'SIMBA',
        subtitle: '申请时间：2019-12-5 14:01:25',
        tail: '已通过',
        status: 2
      }]
    }
  },
  onReachBottom () { // 下拉触底
    console.log('下拉触底')
  },
  onPullDownRefresh () { // 下拉刷新
    console.log('下拉刷新')
    setTimeout(() => {
      uni.stopPullDownRefresh()
    }, 2000)
  }
}
</script>

<style lang="scss" scoped>
</style>
