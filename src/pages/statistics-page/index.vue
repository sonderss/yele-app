<template>
<view class="statistics-page p-lr-20 p-tb-30">
  <min-navTab ref="navTab" :tabTitle="tabTitle" @changeTab="changeTab"></min-navTab>
  <view class="title_list">
      <view :class="index === indexActive ?  'item_active':  'item'" v-for="(item,index) in itemList" :key="index" @click="change(index)">
        <text class="f26">{{item.name}}</text>
        <text class="f26">{{item.num}}</text>
      </view>
  </view>
  <view class="top_view">
      <view class="top" >
        <text>{{startTime1}}</text>
        <text class="iconfont">&#xe6b2;</text>
        <text class="iconfont">&#xe622;</text>
        <text>{{endTime1}}</text>
        <text class="iconfont">&#xe6b2;</text>
      </view>
      <view class="mid_view  min-border-bottom">
         <view class="title" v-for="(item,index) in mainTitle " :key="index">{{item}}</view>
      </view>
      <view class="bom_view m-top-30" v-for="(item,index) in mainItem" :key="index">
         <view class="item">{{item.order}}</view>
         <view class="item">{{item.num}}</view>
         <view class="item">{{item.price}}</view>
      </view>
  </view>
</view>
</template>

<script>
export default {
  name: 'statistics-page',
  navigate: ['navigateTo'],
  data () {
    return {
      tabTitle: ['数据统计', '台位统计', '商品统计', '人员统计', '商品统计', '人员统计'],
      itemList: [{ name: '已开台', num: 20 }, { name: '台位数量', num: 20 }, { name: '取消订台数量', num: 632852 }, { name: '台均消费', num: 20 }, { name: '已开台', num: 20 }, { name: '已开台', num: 20 }],
      indexActive: 0,
      startTime1: '2020年3月1日',
      endTime1: '2020年3月2日',
      mainTitle: ['台位', '开台次数', '消费额'],
      mainItem: [{ order: 'K1221', num: '1231', price: '￥5000' }, { order: 'K1221', num: '1231', price: '￥5000' }, { order: 'K1221', num: '1231', price: '￥5000' }, { order: 'K1221', num: '1231', price: '￥5000' }]
    }
  },
  methods: {
    changeTab (e) {
      console.log(e)
    },
    change (index) {
      this.indexActive = index
    }
  }
}
</script>

<style lang="scss" scoped>
.statistics-page{
  .title_list{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 80rpx;
    .item{
      width:154rpx;
      background: #fff;
      margin-bottom: 20rpx;
      padding: 10rpx;border-radius:5rpx;
      text-align: center;
      margin-right: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .item_active{
      width:154rpx;
      background:#FFE001;
      margin-bottom: 20rpx;
      padding: 10rpx;border-radius:5rpx;
      text-align: center;
      margin-right: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-weight: bold;
    }
    .item_active{
      width:154rpx;
      background:#FFE001;
      margin-bottom: 20rpx;
      padding: 10rpx;border-radius:5rpx;
      text-align: center;
      margin-right: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-weight: bold;
    }
    .item_active:nth-child(4n){
      margin-right: 0;
    }
    .item:nth-child(4n){
      margin-right: 0;
    }
  }

}
.top_view{
  width: 100%;
  height: 600rpx;
  background: #fff;
  border-radius:10rpx;
  padding: 20rpx;
  .top{
    text{
      color: #666666;
    }
  }
  .mid_view{
    width: 100%;
    padding-bottom: 27rpx;
    padding-top: 27rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title{
      width: calc(100% / 3);
      text-align: center;
    }
  }
  .bom_view{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    .item{
      width: calc(100% / 3);
      text-align: center;
    }
  }
}
</style>
