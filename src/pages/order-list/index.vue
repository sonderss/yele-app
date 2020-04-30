<template>
  <view class="order-list p-tb-20 p-lr-30">

      <min-order-list :list="list"></min-order-list>

  </view>
</template>
<script>
export default {
  name: 'order-list',
  navigate: ['navigateTo'],
  onLoad () {
    this.$minApi.getOrderListDown({
      opening_id: this.$parseURL().open_id
    }).then(res => {
      this.list = res.list
      console.log(this.list)
    })
  },
  data () {
    return {
      list: [{
        platform: true, isSetMeal: true, order_sn: '201901021532', status: { num: 2, desc: '待补差价' }, pic: [{ img: '/static/images/goods.png' }, { img: '/static/images/goods.png' }], price: '666.00', timer: '2019-12-10  12:35:65', result: '未付清'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
