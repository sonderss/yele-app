
<template>
  <view class="invitation-record p-lr-30">

      <min-cell-item
        v-for="(item, index) in list" :key="index"
        :img="item.head_img.length>10 ? item.head_img : '/static/images/headurl60.png' "
        :title="item.sales_name"
        :label="'申请时间：'+ $minCommon.formatDate(new Date(item.create_time*1000),'yyyy/MM/dd hh:mm:ss')"
        :tailcolor="true"
        :tail="status[item.status].statusText"
        :tailType="status[item.status].color"
        :border="false"
        mtb
        plr
        bradius
      ></min-cell-item>

    <view class="nodata-wrap" v-if="list.length === 0">
      <image class="nodata" src="/static/images/nodata.png" />
      <view class="text">暂无</view>
    </view>
  </view>
</template>
<script>
const status = {
  1: { statusText: '待审核', color: 'red' },
  2: { statusText: '已通过', color: 'green' },
  3: { statusText: '未通过', color: 'red' }
}

export default {
  name: 'invitation-record',
  navigate: ['navigateTo', 'switchTab'],
  mounted () {
    this.getData({
      page:1,
      limit:10
    }).then(res => {
       this.list = res.list
    })
  },
  data () {
    return {
      status,
      list: [],
      falg:false,
      des:"加载中",
      page:2,
      load:true
    }
  },
  onReachBottom () { 
     console.log('到底')
      this.falg = true
      this.getData(this.page,10,true).then(res => {
        if(res.list.length === 0) {
          this.load = false
          this.des = '暂无更多数据'
          setTimeout(() => {
            return this.falg = false
          },1000) 
        }   
        this.page++
        this.list =  this.list.concat([...res.list])
      })
  },
  onPullDownRefresh () { 
     this.getData(1,10,true).then(res => {
       this.list =  res.list
       this.page = 2
        uni.stopPullDownRefresh();
    })
  },
  methods: {
    async getData(page,limit,isLoading) {
      return await this.$minApi.getPlaseList({page,limit,isLoading})
    }
    // getApplyLog (shuaxin) {
    //   if (this.total === this.list.length) return // 没有更多数据了
    //   this.$minApi.applyLog(this.params).then(res => {
    //     if (shuaxin) this.list = []
    //     this.list = this.list.concat(res.list)
    //     this.total = res.list.total
    //     this.params.page++
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>
