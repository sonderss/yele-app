<template>
  <view class="select-customers  p-tb-20 p-lr-30">
    <view v-if="list.length >0">
        <view  v-for="(item,index) in list" :key="index" class="m-bottom-20">
        <min-cell >
          <view class="main min-flex min-flex-dir-top min-flex-align-top f28">
            <text class="m-top-20">客户姓名：{{item.client_name}}</text>
            <text>联系电话：{{item.client_mobile}}</text>
            <text>当前台号：{{desk_name}}</text>
            <text>开台时间：{{item.create_time}}</text>
            <text v-if="item.close_time">销台时间：{{item.close_time}}</text>
            <text>台位低消：￥{{item.minimum_consume}}</text>
            <text class="p-bottom-30">消费金额：￥{{item.pay_price}}</text>
            <view class="btn-view min-border-top" @click="save_wine(index)">
                <view class="btn f26" >存酒</view>
            </view>
          </view>
        </min-cell>
      </view>
    </view>

    <min-404 v-else></min-404>
  </view>
</template>

<script>
export default {
  name: 'select-customers',
  navigate: ['navigateTo'],
  data () {
    return {
      list: [],
      desk_name: ''
    }
  },
  onLoad () {
    this.id = this.$parseURL().desk_id
    this.desk_name = this.$parseURL().desk_name
    console.log(this.id)
  },
  mounted () {
    // 桌台ID暂时为15测试
    this.$minApi.getOrderHistory({ desk_id: this.id })
      .then(res => {
        this.list = res
      })
  },
  methods: {
    save_wine (index) {
      this.$minRouter.push({
        name: 'save-wine',
        params: { open_id: this.list[index].id }
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
