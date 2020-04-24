<template>
  <view class="order-list p-tb-20 p-lr-30">

      <min-order-list :list="list">
      </min-order-list>

  </view>
</template>
<script>
export default {
  name: 'order-list',
  navigate: ['navigateTo'],
  mounted () {
    this.$minApi.getOrderListDown({
      opening_id: 31
    }).then(res => {
      console.log(res)
      this.list = res.list
    })
  },
  data () {
    return {
      list: [{
        platform: true, isSetMeal: true, order_sn: '201901021532', status: { num: 2, desc: '待补差价' }, pic: [{ img: '/static/images/goods.png' }, { img: '/static/images/goods.png' }], price: '666.00', timer: '2019-12-10  12:35:65', result: '未付清'
      }, {
        platform: false, isSetMeal: false, order_sn: '201901021532', status: { num: 3, desc: '待确认' }, pic: [{ img: '/static/images/goods.png' }], price: '666.00', timer: '2019-12-10  12:35:65', num: 5, title: '2020年元旦跨年夜百威兄弟 终极套餐12瓶', desc: 'VSOP*750ml*2010年*/瓶VSOP*750ml*2010年*/瓶', result: '未付清'
      }, {
        platform: true, isSetMeal: true, sign: '换货单', order_sn: '201901021532', status: { num: 5, desc: '已出品' }, pic: [{ img: '/static/images/goods.png' }, { img: '/static/images/goods.png' }, { img: '/static/images/goods.png' }], price: '666.00', timer: '2019-12-10  12:35:65', num: 5, title: '2020年元旦跨年夜百威兄弟 终极套餐12瓶', desc: 'VSOP*750ml*2010年*/瓶', result: '已付清'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
