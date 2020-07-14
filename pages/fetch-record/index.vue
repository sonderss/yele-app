<template>
  <view class="fetch-record p-tb-20 p-lr-30">
    <view class="card p-lr-20 m-bottom-20" v-for="(item,index) in list" :key="index" @click="goDeatail(item.id)">
      <view class="top p-tb-30 min-border-bottom">
        <view>单号：{{item.fetch_sn}}</view>
        <view :class="item.product_count === 1 ? 'status confirmed':'status end'">{{list.product_count === 1 ? '待确认': '已取酒'}}</view>
      </view>
      <view class="main p-top-20">
        <view class="item">客户姓名：{{item.client_name}}</view>
        <view class="item">联系电话：{{item.client_mobile}}</view>
        <view class="item p-bottom-20 min-border-bottom">存酒数量：{{item.product_count}}</view>
      </view>
      <view class="timer">{{item.create_time}}</view>
    </view>
    <min-404 v-if="list.length === 0"></min-404>
      <min-pulldown :isFlag="falg" :desc="des" :loading="load"/>
  </view>
</template>

<script>

export default {
  name: 'fetch-record',
  navigate: ['navigateTo', 'switchTab'],
  data () {
    return {
      list: [],
      falg:false,
      des:"加载中",
      page:2,
      load:true
    }
  },
  onReachBottom(){
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
  onPullDownRefresh() {
    console.log('refresh');
    this.getData(1,10,true).then(res => {
       this.list =  res.list
       this.page = 2
        uni.stopPullDownRefresh();
    })
  },
  mounted () {
     this.getData(1,10).then(res => {
        this.list = res.list
        console.log(this.list)
      })
  },
  methods: {
    async getData(page,limit,isLoading){
        return await this.$minApi.getWindeList({page,limit,isLoading})
    },
    goDeatail (id) {
      // 取酒记录id
      this.$minRouter.push({
        name: 'pickup-details',
        params: { id: id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fetch-record{
 .card{
    background: #fff;
    border-radius: 10rpx;
    .top{
      display: flex;
      justify-content: space-between;
    }
    .main{
      .item{
        margin-top: 20rpx;
        font-size: 28rpx;
        &:first-child{
          margin: 0;
        }
      }
    }
    .status{
      font-size: 26rpx;
      &.confirmed{
        color: #FF0101
      }
      &.end{
        color: #39BA01
      }
      &.force{
        color: #0090FF
      }
      &.expired{
        color: #666666
      }
    }
    .timer{
      width: 100%;
      height: 76rpx;
      line-height: 76rpx;
      font-size: 24rpx;
      color: #666666
    }
  }
}

</style>
