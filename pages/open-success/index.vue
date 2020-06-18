<template>
  <view class="open-success p-lr-30">
    <image class="icon" src="/static/images/success.png" alt="success" />
    <view class="title">开台成功</view>
    <view class="card f28 p-tb-30 p-lr-30">
      <view>台号：<text>{{$parseURL().desk_name}}</text></view>
      <view>客户姓名：{{$parseURL().client_name?$parseURL().client_name:'暂无数据'}}</view>
      <view>客户手机号：{{$parseURL().client_mobile? $parseURL().client_mobile:'暂无数据'}}</view>
    </view>
    <view class="btns">
      <min-btn @click="toDesk">回到台</min-btn>
      <min-btn type="white" @click="goIndex">返回首页</min-btn>
    </view>
  </view>
</template>

<script>
export default {
  name: 'redopen-success',
  navigate: ['navigateTo','redirectTo'],
  mounted () {
    console.log(this.$parseURL())
  },
  methods: {
    toDesk () {
      this.$minRouter.push({
        name: 'redplatform-detail',
        type:'redirectTo',
        params: { id: this.$parseURL().desk_id, date:this.$store.state.status.date.date }
      })
    },
    goIndex () {
      this.$minRouter.push({
        name: 'index'
      })
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
.open-success{
  .icon{
      display: block;
      width: 200rpx;
      height: 200rpx;
      margin: 0 auto;
      margin-top: 117rpx;
    }
    .title{
      font-size:32rpx;
      font-weight:bold;
      color:rgba(51,51,51,1);
      text-align: center;
      margin-top: 38rpx;
    }
  .card{
    background: #FFF;
    border-radius: 10rpx;
    margin-top: 105rpx;
    text{
      color: #FF0000;
    }
    &>view{
      margin-bottom: 10rpx;
      &:last-child{
        margin: 0;
      }
    }
  }
  .btns{
    display: flex;
    justify-content: space-between;
    margin-top: 40rpx;
    .min-btn{
      width: 330rpx;
      margin: 0;
    }
  }
}

</style>
