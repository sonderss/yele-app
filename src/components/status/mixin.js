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
        params: { id: this.idNum, open_id: this.list.desk_info.opening_id }
      })
      console.log('id', this.idNum, this.list.desk_info.opening_id)
    }
  },
  mounted () {
    console.log('公共部分')
  }
}
