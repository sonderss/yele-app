<template>
  <view class="components-doc m-lr-30 p-top-20">
     <web-view :src='src'></web-view>
  </view>
</template>

<script>
export default {
  name: 'components-doc',
  data () {
    return {
      src: 'http://showdoc.yeleonline.com/web/#/15',
      count: 0

    }
  },
  mounted () {
    // this.$refs.test.open({
    //   content: '123456'
    // })
  },
  methods: {
    // test () {
    //   console.log(123)
    // }
  }
}
</script>

<style lang="scss" scoped>

</style>
