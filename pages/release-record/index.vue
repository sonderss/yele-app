<template>
  <view class="release-record p-lr-30 p-tb-20">
      <view
        v-for="(item,index) in list"
        :key="item.id"
        class="cell-item min-flex min-flex-main-between p-tb-30 p-lr-20 min-border-bottom"
      >
        <view class="min-flex" >
          <view>
            <view class="f28" >冻结{{item.amount}}元</view>
            <view class="label m-top-20 f24 assist-text min-ellipsis">{{$minCommon.formatDate(new Date(item.create_time*1000),'yyyy/MM/dd hh:mm:ss')  }}</view>
          </view>
        </view>
        <view class="iii min-flex flex-end min-flex-dir-top">
          <view class="">{{item.store_name}}</view>
          <view class="m-top-20" @click="showToast(index)">
            <image src="/static/images/wen.png" style="width:40rpx;height:40rpx"/>
          </view>
          <view class="toast" v-if="showToasts === index">{{item.remark}}</view>
        </view>
      </view>
     <min-404 v-if="list.length === 0" />
     <min-pulldown :isFlag="falg" :desc="des" :loading="load"/>
  </view>
</template>
<script>
export default {
  name: 'release-record',
  navigate: ['navigateTo'],
  data () {
    return {
      list:[],
      showToasts:Number,
      falg:false,
      nums:2,
      des:"加载中",
      load:true
    }
  },
  mounted() {
    this.getData(1)
  },
  onPullDownRefresh() {
    console.log('refresh');
       this.$minApi.getDJlist({
        page:1,
        limit:10,
        isLoading:true
      }).then(res => {
        this.list = res.list
        uni.stopPullDownRefresh();
      })
  },
  onReachBottom(){
      console.log('到底')
      this.$minApi.getDJlist({
        page:this.nums,
        limit:10,
        isLoading:true
      }).then(res => {
          if(res.list.length === 0) {
            this.load = false
            this.des = '暂无更多数据'
            setTimeout(() => {
              return this.falg = false
            },1000) 
          }   
          this.list = this.list.concat([...res.list])
          this.nums++
      })
  },
  methods: {
    getData(page, isLoading = false,limit = 10){
      this.$minApi.getDJlist({
        page,
        limit,
        isLoading
      }).then(res => {
        this.list = res.list
        console.log(this.list)
      })
    },
    toDeatil () {
      this.$minRouter.push({
        name: 'release-details'
      })
    },
    closedrawer () {
      this.showdrawer = false
    },
    showToast(item){
      if(this.showToasts === item) return this.showToasts = Number
      this.showToasts = item
    }
  }
}
</script>
<style lang="scss" scoped>
.top_view {
  width: 100%;
  margin-bottom: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
 .top {
    width: 100%;
    height: 35rpx;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    text {
      margin: 0 5rpx;
      display: block;
      color: #666;
    }
  }
}
.cell-item {
  background: #fff;
   position: relative;

  .label {
  }
  .ablack {
    color: #333;
    font-weight: bold;
  }
  .ared {
    color: #ff0000;
    font-weight: bold;
  }
  .green{
    color: green;
    font-weight: bold;

  }
  .bom {
    font-size: 24rpx;
    color: rgba(102, 102, 102, 1);
  }
}
.iii{
  width:600rpx;
  align-items: flex-end;
  overflow: hidden;
  .toast{
    width: auto;
    height: auto;
    padding: 20rpx;
    background: #000;
    opacity: 0.5;
    color: #fff;
    border-radius: 15rpx;
    position: absolute;
    right: 40rpx;
    top: 130rpx;
    z-index: 9999;
  }
}
</style>
