export default {
  data () {
    return {

    }
  },
  methods: {
    // 历史
    goGetHistory () {
     let a  =  this.getRoot('desk.history')
     if(!a) return this.$showToast('抱歉，暂无权限')
      this.$minRouter.push({
        name: 'platform-history',
        params: { id: this.idNum, open_id: this.list.desk_info.opening_id }
      })
      // console.log('id', this.idNum, this.list.desk_info.opening_id)
    },
    // 预约
    book () {
      let a = this.getRoot('desk.book')
      if(!a) return this.$showToast('抱歉，暂无权限')
      this.index = 0
      this.$minRouter.push({
        name: 'order-make',
        params: { id: this.idNum }
      })
    },
    // 销台
    del_order () {
      let a = this.getRoot('desk.close')
     if(!a) return this.$showToast('抱歉，暂无权限')
     this.$refs.show.handleShow({
       title: '',
       content: '是否销台',
       contentCenter: true,
       cancelText: '否',
       confirmText: '是',
       confirmColor: 'red',
       cancelColor: '#0090ff',
       success: (e) => {
         if (e.id === 1) {
           // 销台接口
           this.$minApi.delOrder({
             desk_id: this.idNum
           })
             .then(res => {
               if (res.length === 0) {
                 this.$showToast('销台成功')
                 setTimeout(() => {
                   this.$minRouter.push({
                     name: 'redplatform-detail',
                     type: 'redirectTo',
                     params: { id: this.idNum, date: this.date }
                   })
                 }, 2000)
               }
             })
             .catch(() => {
               this.$showToast('缺少开台ID')
             })
         }
       }
     })
   },
    getRoot(root){
      const data = this.$store.state.user.userInfo.access
      for (const i of data) {
        if (i === root) {
          return true
        }
      }
      return false
    },
    // 全局隐藏toast
    getDom(e) {
      // console.log(e.target)
      if (e.target.id !== 'testDom') return this.toast = false
    }
  }, 
  mounted () {
    console.log('公共部分')
  }
}
