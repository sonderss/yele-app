<template>
  <view class="platform-detail p-top-20 p-lr-30">
    <!-- 空闲中组件 2 00-->
    <min-idle :idNum="id" :status="2" v-if="status === 2" :data="data"></min-idle>
    <!-- 点单中 4 00-->
    <min-order :idNum="id" v-if="status === 4"></min-order>
    <!-- 已预约 3 00 -->
    <min-booked :idNum="id"  v-if="status === 3" :data="data"></min-booked>
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
      status: Number,
      date: '',
      data: {
        baseInfo: { desk_name: '' },
        clientInfo: { client_name: '' }
      }
    }
  },
  onLoad (option) {
    this.id = this.$parseURL().id
    // 暂时使用获取到的详情状态数据
    // this.status = this.$parseURL().status

    this.date = this.$parseURL().date
    this.getData()
  },
  methods: {
    // 调用接口获取台详情数据数据
    getData () {
      // const date = this.$minCommon.formatDate(new Date(), 'yyyy-MM-dd')
      this.$minApi.getOrderDetail({ desk_id: this.id, date: this.date })
        .then(res => {
          this.data = res
          this.status = res.baseInfo.status
          console.log(this.data)
          console.log('详情状态', this.status)
        })
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
