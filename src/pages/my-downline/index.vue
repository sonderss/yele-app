<template>
  <view class="my-downline">
    <view class="top-view f26"></view>
    <view class="mid-view">
      <text class="name m-left-10">我的上线：{{list.superior.username}}{{list.superior.mobile}}</text>
      <view class="backi m-top-10">
        <view class="show-money">
          <view class="money">
            ￥
            <text class="m">{{list.grand_total_rebate}}</text>
          </view>
          <view class="desc">累计获得分佣</view>
        </view>
        <view class="btn" @click="go">去邀请</view>
      </view>
    </view>

    <view class="title-n">
      <view class="main">
        <view class="m min-border-bottom">
          <text>下线列表</text>
          <text>共{{nums}}人</text>
        </view>
      </view>
      <view class="item  min-border-bottom" v-for="(item,index) in list.subordinate" :key="index">
        <min-describe
          :leftIconValue="item.head_img"
          :leftTxtB="item.mobile"
          :leftTxt="item.username"
          :rightTxtT="item.accumulated_rebate"
          rightTxtB="累计分佣"
          :leftIcon="true"
          :leftTxtTwo="true"
        ></min-describe>
      </view>
    </view>

  </view>
</template>
<script>
export default {
  name: 'my-downline',
  navigate: ['navigateTo'],
  onNavigationBarButtonTap () {
    this.$minRouter.push({
      name: 'invitation-record',
      type: 'navigateTo',
      path: '../invitation-record/index.vue'
    })
  },
  data () {
    return {
      list: { superior: { username: '' } },
      nums: Number
    }
  },
  mounted () {
    this.$minApi.getMyDownLine({
      limit: 10,
      page: 1
    }).then(res => {
      this.list = res
      this.nums = this.list.subordinate.length
      console.log(res)
    })
  },
  methods: {
    go () {
      this.$minRouter.push({
        name: 'lnvitation-offline'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.my-downline {
  .top-view {
    width: 100%;
    height: 289rpx;
    background: #23232e;
    color: #cccccc;
  }
  .mid-view {
    position: absolute;
    top: 20rpx;
    width: 100%;
    padding: 0 24rpx;
    .name {
      color: #cccccc;
    }
    .backi {
      width: 100%;
      height: 404rpx;
      background-image: url("../../static/images/b-mydownl.png");
      background-repeat: no-repeat;
      background-size: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .show-money {
        width: 100%;
        height: 280rpx;
        font-weight: bold;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .money {
          font-size: 48rpx;
          color: #ffe001;
          .m {
            font-size: 84rpx;
            color: #ffe001;
          }
        }
        .desc {
          color: #eeeeee;
          font-size: 28rpx;

          font-weight: 400;
        }
      }
      .btn {
        width: 580rpx;
        height: 88rpx;
        background: rgba(255, 224, 1, 1);
        border-radius: 10px;
        margin-bottom: 36rpx;
        text-align: center;
        line-height: 88rpx;
      }
    }
  }
  .title-n {
    width: 100%;
    height: 88rpx;
    margin-top: 200rpx;
    padding: 0 30rpx;
    .main {
      width: 100%;
      height: 100%;
      background: #fff;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      border-radius: 10rpx 10rpx 0 0 ;
    }
    .item {
      // width: 100%;
      height: 140rpx;
      background: #fff;
      display: flex;
      align-items: center;

    }
    .i {
      width: 95%;
      height: 2rpx;
      background: #e7e7e7;
      margin: 0 auto;
    }
    .m {
      width: 690rpx;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      padding: 0 20rpx;
      border-radius: 10rpx 10rpx 0 0;
    }
  }
}
</style>
