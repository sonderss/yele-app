<template>
  <view class="switch-stores m-lr-30 p-top-20">
    <min-search placeholder="请输入门店名称搜索" @search="search" v-model="keys" />
    <view class="m-bottom-20"></view>
    <min-cell :card="false">
      <min-cell-item
        v-for="(item, index) in getValue"
        :key="index"
        :img="item.head_img"
        :title="item.store_name"
        :label="item.address"
        :border="elseStoreList.length !== index + 1"
      >
        <min-btn size="xs" slot="tail" @click="applyStores(item, index)">申请</min-btn>
      </min-cell-item>
    </min-cell>
    <min-modal ref="showModal"></min-modal>
    <min-404 v-if="getValue.length === 0"></min-404>

     <min-pulldown :isFlag="falg" :desc="des" :loading="load"/>
  </view>
</template>

<script>
export default {
  name: 'apply-stores',
  navigate: ['navigateTo', 'switchTab'],
  data () {
    return {
      falg:false,
      nums:2,
      des:"加载中",
      load:true,
      keys:'',
      elseStoreList: [],
      total: -1
    }
  },
  computed: {
    getValue () {
      let data = []
      if (this.keys) {
       this.elseStoreList.filter(item => {
          if (item.store_name.includes(this.keys)) {
            data.push(item)
          }
        })
      } else {
        data = this.elseStoreList
      }
      return data
    }
  },
  mounted () {
    this.getData(1,10).then(res => {
      this.elseStoreList = res.list
    })
  },
  onNavigationBarButtonTap (e) {
    this.$minRouter.push({
      name: 'apply-log',
      type: 'navigateTo',
      path: '/pages/apply-log/index'
    })
  },
  onReachBottom(){
      this.falg = true
      this.getData(this.nums,10,true).then(res => {
        if(res.list.length === 0) {
          this.load = false
          this.des = '暂无更多数据'
          setTimeout(() => {
            return this.falg = false
          },1000) 
        }   
        this.nums++
        this.elseStoreList =  this.elseStoreList.concat([...res.list])
      })
  },
  onPullDownRefresh() {
    // console.log('refresh');
    this.getData(1,10,true).then(res => {
       this.list =  res.list
       this.nums = 2
        uni.stopPullDownRefresh();
    })
  },
  methods: {
    async getData (page,limit,isLoading) {
      //  if (this.total === this.elseStoreList.length) return // 没有更多数据了
       return  await  this.$minApi.getElseStoreList({page,limit,isLoading})
    },
    search () {
      // this.params.page = 1
      // this.total = -1
      // this.getElseStoreList('shuaxin')
    },
    // eslint-disable-next-line camelcase
    applyStores ({ id, store_name }, index) {
      this.$refs.showModal.handleShow({
        title: '提示',
        // eslint-disable-next-line camelcase
        content: `是否确认申请成为${store_name}的外联`,
        contentCenter:true,
        success: res => {
          if (res.id !== 1) return
          this.$minApi.applyStores({ store_id: id }).then(res => {
            this.$showToast('申请成功')
            this.elseStoreList.splice(index, 1)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
page {
  background-color: #f7f7f7;
}
</style>
