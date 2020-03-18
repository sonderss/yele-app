<template>
  <view class="platform-detail p-top-20 p-lr-30">
    <!-- 空闲中组件 2 00-->
    <min-idle :idNum="id"  v-if="status === 2"></min-idle>
    <!-- 点单中 4 00-->
    <min-order :idNum="id" v-if="status === 4"></min-order>
    <!-- 已预约 3 00 -->
    <min-booked :idNum="id" v-if="status === 3"></min-booked>
    <!-- 待确认 5 00-->
    <min-confirmed :idNum="id" v-if="status === 5"></min-confirmed>
    <!-- 已停用 1 00-->
    <min-terminated :idNum="id" v-if=" status === 1"></min-terminated>
    <!-- 已开台 6 00-->
    <min-opened  :idNum="id" v-if=" status === 6"></min-opened>
    <!-- 清台中 7-->
    <min-taichung :idNum="id"  v-if=" status === 7"></min-taichung>
  </view>
</template>

<script>
export default {
  name: 'platform-detail',
  navigate: ['navigateTo'],
  data () {
    return {
      id: '',
      status: Number
    }
  },
  onLoad (option) {
    this.id = this.$parseURL().id
    this.status = this.$parseURL().status
  },
  methods: {
    // 调用接口获取台详情数据数据
    getData () {

    }
  }
}

</script>

<style lang="scss" scoped>
.platform-detail{
  position: relative;
  padding-bottom: 100rpx;
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
      .card-btns{
        margin-top: 30rpx !important;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .btns{
    width: 100vw;
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #f7f7f7;
    padding: 10rpx 30rpx;
  }
}
</style>
