<template>
  <view class="turntable-record p-lr-20 p-tb-20">
   <view class="top_view m-bottom-20">
        <min-search placeholder="请输入桌台号搜索" v-model="key" />
      </view>
    <view v-if="getKeyData.length !== 0">
      <min-cell class="main m-bottom-20" :card="false" v-for="item in getKeyData" :key="item.id" @click="toDeskBill(item.opening_id,item.transfer_desk_id)">
        <view class="top f30 min-border-bottom">操作人员：{{item.transfer_user_name}}</view>
        <view class="mid min-border-bottom">
          <view class="left">
            <image src="/static/images/seats.png" />
            <view class="m-top-20">{{item.origin_desk_name}}</view>
          </view>
          <view class="mid_c">
            <view class="m-bottom-20" style="font-weight:400">转到</view>
            <image src="/static/images/xz.png" />
          </view>
          <view class="left">
            <image src="/static/images/seats.png" />
            <view class="m-top-20">{{item.transfer_desk_name}}</view>
          </view>
        </view>
        <view class="bottm">
          <view
            class="_left"
          >{{$minCommon.formatDate(new Date(item.create_time*1000),"yyyy/MM/dd hh:mm:ss") }}</view>
          <view class="_right">营销人员：{{item.sales_user_name}}</view>
        </view>
      </min-cell>
    </view>
    <min-404 v-else />
    <min-pulldown :isFlag="falg" :desc="des" :loading="load"/>
  </view>
</template>

<script>
export default {
  name: "turntable-record",
  navigate: ["navigateTo"],
  data() {
    return {
      list: [],
      key: "",
      falg:false,
      num:2,
      des:"加载中",
      load:true
    };
  },
  methods: {
    async getData(page,limit = 10,isLoading){
      return await this.$minApi.changeStoreList({limit,page,isLoading})
    },
    toDeskBill(id,desk_id){
      this.$minRouter.push({
        name:"desk-bill",
        params:{open_id:id,desk_id}
      })
    }
  },
  mounted() {
    // {limit:10,page:1,}
    // this.list =  this.getData().list
    this.getData().then(res => {
      this.list =  res.list
      this.num++ 
    })
  },
  onReachBottom(){
      console.log('到底')
      this.falg = true
      this.getData(this.num,10,true).then(res => {
        if(res.list.length === 0) {
          this.load = false
          this.des = '暂无更多数据'
          setTimeout(() => {
            return this.falg = false
          },1000) 
        }   
        this.num++
        this.list =  this.list.concat([...res.list])
      })
  },
  onPullDownRefresh() {
    console.log('refresh');
    this.getData(1,10,true).then(res => {
       this.num = 2
       this.list =  res.list
        uni.stopPullDownRefresh();
    })
  },
  computed: {
    getKeyData() {
      let d = [];
      if (this.key) {
        this.list.filter(item => {
          if (
            item.transfer_desk_name
              .toLowerCase()
              .includes(this.key.toLowerCase())
          ) {
            d.push(item);
          } else if (
            item.origin_desk_name.toLowerCase().includes(this.key.toLowerCase())
          ) {
            d.push(item);
          }
        });
      } else {
        d = this.list;
      }
      return d;
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 390rpx;

  .top {
    height: 88rpx;
    line-height: 88rpx;
    color: #333;
  }
  .mid {
    font-weight: bold;
    color: #333;
    height: 212rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100rpx;
      image {
        width: 42rpx;
        height: 42rpx;
      }
    }
    .mid_c {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 80rpx;
      image {
        width: 126rpx;
        height: 12rpx;
      }
    }
  }
  .bottm {
    height: 90rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ._left {
      color: #666;
      font-size: 26rpx;
    }
    ._right {
      color: #333;
      font-size: 26rpx;
    }
  }
}
</style>