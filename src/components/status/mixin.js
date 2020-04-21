export default {
  data () {
    return {

    }
  },
  methods: {
    // 历史
    goGetHistory () {
      this.$minRouter.push({
        name: 'platform-history',
        params: { id: this.idNum }
      })
    }
  },
  mounted () {
    console.log('公共部分')
  }
}
