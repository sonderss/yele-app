<template>
  <view>
      <min-collapse :list="list" v-model="tsetvalue" :isNotitle="true"></min-collapse>
  </view>
</template>
<script>
export default {
  data () {
    return {
      list: ['8:00', '23:00', '9:00', '20:00', '20:00', '20:00', '20:00', '8:00', '23:00', '9:00', '20:00', '20:00', '8:00', '23:00', '9:00'],
      tsetvalue: ''
    }
  },
  watch: {
    tsetvalue (a) {
      console.log(a)
    }
  },
  mounted () {
    // const num = this.list.length / 5
    console.log(Math.round(this.list.length / 5) + 1)
  }
}
</script>
<style lang="scss" scoped>

</style>
