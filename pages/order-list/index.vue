<template>
  <view class="order-list p-tb-20 p-lr-30">

      <min-order-list :list="list" ></min-order-list>
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
      this.list.map(item => {
        if (item.order_product_list.length > 4) {
          item.order_product_list.splice(4)
        }
      })
    })
  },
  data () {
    return {
      list: []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
