<template>
  <view class="stage-make p-lr-30 p-tb-20">
    <min-cell class="top-view" :shadow="false" :card="false">
      <view class="top-title">客户信息</view>
      <view class="min-border-bottom color-view"></view>
      <view class="m-left-20 p-top-20 min-flex min-flex-dir-top min-flex-align-top">
        <view class="min-flex m-bottom-10">
          <text class="user-name">客户姓名: {{data.client_name}}</text>
        </view>
        <view class="min-flex m-bottom-30">
          <text class="user-name">联系电话: {{data.client_mobile}}</text>
        </view>
      </view>
    </min-cell>
    <view class="m-bottom-20"></view>
    <min-cell class="top-view" :card="false">
      <min-cell-item title="营销信息"></min-cell-item>
      <view class="min-border-bottom color-view"></view>
      <min-cell-item
        :img="data.head_img"
        :title="`${data.user_name}  | ${data.position_name}`"
        :label="data.mobile"
      ></min-cell-item>
    </min-cell>
    <view class="btn">
      <min-btn :long="true" @click="postBookedOpen">下一步</min-btn>
    </view>
  </view>
</template>

<script>
export default {
  name: 'stage-make',
  navigate: ['navigateTo'],
  onLoad () {
     console.log(this.$parseURL())
    this.booking_id = this.$parseURL().booking_id
    this.id = this.$parseURL().id
    this.$minApi.getBookedDetail({ booking_id: this.booking_id }).then(res => {
      console.log(res)
      this.data = res
    })
  },
  data () {
    return {
      name: '林平之',
      phone: 15836666666,
      data: {},
      booking_id: '',
      id: ''
    }
  },
  methods: {
    postBookedOpen () {
      this.$minApi.startOrder({
        desk_id: this.id,
        booking_id: this.booking_id,
        sales_uid:this.data.sales_uid,
        client_name: this.data.client_name,
        client_mobile: this.data.client_mobile
      })
        .then(res => {
          console.log(res)
            this.$showToast('开台成功')
            // 跳转下单
            setTimeout(() => {
              this.$minRouter.push({
                name: 'placean-order',
                params: { desk_id: res.opening.desk_id, minim_charge: res.opening.minimum_consume }
              })
            }, 2000)
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.stage-make {
  .main-view {
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
  }
  .top-view {
    width: 690rpx;
    margin: 20rpx auto;
    .top-title {
      font-size: 30rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 33rpx;
      padding-top: 29rpx;
      padding-bottom: 29rpx;
      padding-left: 20rpx;
    }
    .color-view {
      background: #e7e7e7;
      margin: 0 20rpx;
    }
    .user-name {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 33rpx;
    }
  }
  .btn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>
