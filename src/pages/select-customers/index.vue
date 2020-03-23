<template>
  <view class="select-customers  p-tb-20 p-lr-30">
    <view  v-for="(item,index) in list" :key="index" class="m-bottom-20">
        <min-cell>
          <view class="main min-flex min-flex-dir-top min-flex-align-top f28">
            <text class="m-top-20">客户姓名：{{item.name}}</text>
            <text>联系电话：{{item.phone}}</text>
            <text>当前台号：{{item.num}}</text>
            <text>开台时间：{{item.startTime}}</text>
            <text v-if="item.del">销台时间：{{item.del}}</text>
            <text>台位低消：￥{{item.lowPrice}}</text>
            <text class="p-bottom-30">消费金额：￥{{item.price}}</text>
            <view class="btn-view min-border-top" @click="save_wine">
                <view class="btn f26">存酒</view>
            </view>
          </view>
        </min-cell>
    </view>

  </view>
</template>

<script>
export default {
  name: 'select-customers',
  navigate: ['navigateTo'],
  data () {
    return {
      list: [{
        name: '刘晓庆', phone: '13563250000', num: '788', startTime: '2019年12月05日 16:30:00', lowPrice: '10000', price: '1056300'
      },
      {
        name: '刘晓庆', phone: '13563250000', num: 'K1112', startTime: '2019年12月05日 16:30:00', del: '2019年12月05日 16:30:00', lowPrice: '10000', price: '1056300'
      }]
    }
  },
  methods: {
    save_wine () {
      this.$minRouter.push({
        name: 'save-wine'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.select-customers{
  .main{
    text{
       margin-bottom: 10rpx;
    }
    .btn-view{
      width: 100%;
      height: 98rpx;
      display: flex;
      justify-content: flex-end;
      align-items:center;
      .btn{
        width:142rpx;
        height:58rpx;
        border-radius:10rpx;
        text-align: center;
        line-height: 58rpx;
        border: 1rpx solid #E7E7E7
      }
      .btn:hover{
        width:142rpx;
        height:58rpx;
        background:rgba(255,224,1,1);
        border-radius:10rpx;
        text-align: center;
        line-height: 58rpx;
        border: none
      }
    }
  }
}

</style>
