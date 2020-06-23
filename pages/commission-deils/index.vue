<template>
  <view class="commission p-tb-20 p-lr-30">
    <view class="view_main p-lr-20 p-bottom-20">
        <view class="top_view min-border-bottom">
          <text class="desc">提成</text>
          <text class="money">+33.20</text>
        </view>
        <view class="bottom-view">
          <view class="main min-flex min-flex-main-between m-top-20">
             <text class="c">门店</text>
             <text style="text-align:right">Simba</text>
          </view>
          <view class="main min-flex min-flex-main-between">
             <text class="c">提现类型</text>
             <text style="text-align:right">基础提成</text>
          </view>
          <view class="main min-flex min-flex-main-between">
             <text class="c">我的角色</text>
             <text style="text-align:right">订台人</text>
          </view>
          <view class="main min-flex min-flex-main-between">
             <text class="c">生成时间</text>
             <text style="text-align:right">2019-06-09 16:41:25</text>
          </view>
        </view>
    </view>
     <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom q">订单信息</view>
     <view  class="m-bottom-10 m-top-20 t " style="width:100%;display: flex;justify-content: space-between;">
          <text class="f28">台号</text>
          <text class="f26">K112 </text>
      </view>
      <view  class="m-bottom-10 m-top-20 t" style="width:100%;display: flex;justify-content: space-between;">
          <text class="f28">订台人</text>
          <text class="f26">刘小青</text>
      </view>
      <view  class="m-bottom-10 m-top-20 t" style="width:100%;display: flex;justify-content: space-between;">
          <text class="f28">下单时间</text>
          <text class="f26">2019-06-09 16:41:25</text>
      </view>
      <view  class="m-bottom-10 m-top-20 t" style="width:100%;display: flex;justify-content: space-between;">
          <text class="f28">下单人</text>
          <text class="f26">刘小青</text>
      </view>
      <view  class="m-bottom-10 m-top-20 t" style="width:100%;display: flex;justify-content: space-between;">
          <text class="f28">订单号</text>
          <text class="f26">3546841324641345654</text>
      </view>
      <view  class="m-bottom-10 m-top-20 t" style="width:100%;display: flex;justify-content: space-between;">
          <text class="f28">订单金额</text>
          <text class="f26">￥6200</text>
      </view>
      <view  class="m-bottom-10 m-top-20 t" style="width:100%;display: flex;justify-content: space-between;">
          <text class="f28">业绩</text>
          <text class="f26">￥500</text>
      </view>
      <view class="table_view">
        <min-table></min-table>
      </view>
    </view>

  </view>
</template>
<script>

export default {
  name: 'commission-deils',
  navigate: ['navigateTo'],
  data () {
    return {
      tableList: [{
        id: 0,
        name: 'VSOP*750ML*2010年/瓶',
        num: '19',
        money: '1000',
        bil: '20%',
        tichneg: '200'
      },
      {
        id: 1,
        name: 'VSOP*750ML*2010年/瓶',
        num: '19',
        money: '1000',
        tichneg: '200',
        bil: '20%'
      },
      {
        id: 2,
        name: 'VSOP*750ML*2010年/瓶',
        num: '19',
        bil: '20%',
        money: '1000',
        tichneg: '200'
      },
      {
        id: 3,
        name: 'VSOP*750ML*2010年/瓶',
        num: '19',
        bil: '20%',
        money: '1000',
        tichneg: '200'

      }
      ]

    }
  }
}
</script>
<style lang="scss" scoped>
.view_main{
  width: 100%;
  height: 385rpx;
  background: #fff;
  border-radius:10rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top_view{
    width: 100%;
    height: 150rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .desc{
       font-size:28rpx;
       color:rgba(102,102,102,1);
    }
    .money{
      font-size:60rpx;
      font-weight:bold;
      color:rgba(255,0,0,1);
      text-align: right;
    }
    text{
      width: 50%;
      height: 100%;
      display: block;
      line-height: 150rpx;
    }
  }
  .bottom-view{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex: 1;
    .c{
      color: #666666;
    }
    text{
      width: 50%;
      height: auto;
      display: block;
    }
  }
}
.card{
  margin-top: 20rpx;
  background: #fff;
  .q{
    color: #333333;
    font-weight: bold;
  }
  .t{
    text{
      color: #666666;
    }
  }
}
.table_view{
  width: 100%;
  margin: 20rpx 0;
  background: #fff;
  height: auto;
  display: block;
}

</style>
