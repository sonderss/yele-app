<template>
  <view class="person p-lr-20 p-tb-20">
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">客户信息</view>
      <view class="main p-tb-20">
        <view>客户姓名：刘小青</view>
        <view>联系电话：13563250000</view>
        <view>汇总周期：是</view>
        <view>预抵时间：2020年02月15日 16:20:00</view>
      </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">操作信息</view>
      <view class="main p-tb-20">
        <view>营销人员：刘清清</view>
        <view>预抵时间：2020年02月15日 16:20:00</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  onLoad (option) {
    console.log(option)
    switch (option.id) {
      case '0':
        uni.setNavigationBarTitle({
          title: '个人营销业绩汇总'
        })
        break
      case '1':
        uni.setNavigationBarTitle({
          title: '个人营销开台汇总'
        })
        break
      default:
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
    background: #fff;
    border-radius: 10rpx;
    .main{
      position: relative;
      &>view{
        margin-bottom: 10rpx;
        &:last-child{
          margin: 0;
        }
      }
      .emp{
        display: inline-block;
        font-weight: bold;
        color: #FE0000;
      }
      .status{
        position: absolute;
        top: 20rpx;
        right: 0;
        color: #FE0000;
      }
      .reserved {
        // 已预约
        position: absolute;
        top: 20rpx;
        right: 0;
        color: #0090ff;
      }
      .been-open {
        // 已开台
        position: absolute;
        top: 20rpx;
        right: 0;
        color: #ff0000;
      }
      .be-confirm {
        // 待确认
        position: absolute;
        top: 20rpx;
        right: 0;
        color: #39ba01;
      }
      .clearing{
        // 清台中
        background: #39ba01;
      }
      .in-order {
        // 点单中
        background: #ff9c00;
      }
      .leisure {
        // 空闲中
        background: #eeeeee;
        & > view {
          color: #666;
        }
      }
      .disabled {
        // 已停用
        background: #eeeeee;
        & > view {
          color: #ccc;
        }
      }
      .card-btns{
        margin-top: 30rpx !important;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
