<template>
  <view class="switch-stores m-lr-30 p-top-20">
    <view class="add-stores">
      <view class="add-icon"/>
      <view class="text">申请加入其他门店</view>
    </view>
    <view class="m-top-20"></view>
    <min-cell>
      <min-cell-item
        v-for="(item, index) in list" :key="index"
        :img="item.img"
        :title="item.title"
        :label="item.subtitle"
        arrow
      ></min-cell-item>
    </min-cell>
  </view>
</template>

<script>
export default {
  name: 'switch-stores',
  data () {
    return {
      list: [{
        img: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg',
        title: 'SIMBA',
        subtitle: '广州市天河区元岗横路智汇parkB303室',
        tail: '待审核'
      }, {
        img: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg',
        title: 'SIMBA',
        subtitle: '广州市天河区元岗横路智汇parkB303室',
        tail: '未通过'
      }, {
        img: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg',
        title: 'SIMBA',
        subtitle: '广州市天河区元岗横路智汇parkB303室',
        tail: '已通过'
      }, {
        img: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg',
        title: 'SIMBA',
        subtitle: '广州市天河区元岗横路智汇parkB303室',
        tail: '未通过'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
page {
  background-color: #F7F7F7;
}
.switch-stores{

  .add-stores{
    background: #fff;
    border-radius: 10rpx;
    padding: 30rpx 20rpx;
    .add-icon{
      display: inline-block;
      vertical-align: middle;
      height: 0;
      padding: 20rpx 10rpx;
      background:rgba(255,50,7,1);
      border-radius:2px;
      position: relative;
      border-radius: 100%;
      &::before{
        content: "";
        display: inline-block;
        width: 20rpx;
        height: 4rpx;
        background:#fff;
        vertical-align: top;
        margin-top: -2rpx;
      }
      &::after{
        content: "";
        display: inline-block;
        width: 4rpx;
        height: 20rpx;
        background:#fff;
        vertical-align: top;
        position: absolute;
        top: 11rpx;
        left: 18rpx;
      }
    }
    .text{
      display: inline-block;
      vertical-align: middle;
      margin-left: 20rpx;
    }
  }
}
</style>
