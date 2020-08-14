<template>
  <view class="my-downline">
    <view class="top-view f26"></view>
    <view class="mid-view">
      <text
        class="name m-left-10"
      >我的上线：{{list.superior.superior ?list.superior.superior:'暂无'}}{{list.superior.mobile}}</text>
      <view class="backi m-top-10" :style="{backgroundImage:`url(${n})`,backgroundSize: 'cover'}">
        <view class="show-money">
          <view class="money">
            ￥
            <text class="m">{{list.superior.grand_total_rebate}}</text>
          </view>
          <view class="desc">累计获得分佣</view>
        </view>
        <view class="btn" @click="go">去邀请</view>
      </view>
    </view>

    <view class="title-n">
      <view class="bg-white p-lr-20" style="height:80rpx">
        <!--  <view class="min-flex min-border-bottom min-flex min-flex-main-between " style="width:100%;height:80rpx"> 
                    <view class="f30">下线列表</view>
                    <view class="f28  p-right-20" style="color:#333">共{{nums}}人</view>
        </view>-->
        <view style="width:100%;height:100%;" class="min-flex min-flex-main-between">
          <view class="f30">下线列表</view>
          <view class="f28" style="color:#333">共{{nums}}人</view>
        </view>
      </view>
      <view v-if="list.subordinate.length !== 0">
        <view
          class="item p-lr-20"
          v-for="(item,index) in list.subordinate"
          :key="index"
          @click="torefund(item.id,item.user_name)"
        >
          <view class="cell-item min-flex min-flex-main-between bg-white p-tb-30 min-border-bottom">
            <view class="min-flex">
              <view>
                <min-avatar
                  size="xs"
                  :url="item.head_img ? item.head_img : '/static/images/goods.png'"
                ></min-avatar>
              </view>
              <view class="m-left-20" style="width:400rpx">
                <view class="f28 min-ellipsis">{{item.user_name}}</view>
                <view class="label m-top-10 f24 assist-text min-ellipsis">{{item.mobile}}</view>
              </view>
            </view>
            <view class="min-flex min-flex-dir-top">
              <view class="f28 tail" style="color:#333">{{item.accumulated_rebate}}</view>
              <view class="f26" style="color:#666">累计分佣</view>
            </view>
          </view>
        </view>
      </view>
      <view class="item p-lr-20" style="padding-bottom:30rpx" v-else>
        <view class="min-border-top">
          <min-404 pTop="30rpx" />
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import backs from '../../static/images/b-mydownl.png'
export default {
  name: 'my-downline',
  navigate: ['navigateTo'],
  onNavigationBarButtonTap() {
    this.$minRouter.push({
      name: 'invitation-record',
      type: 'navigateTo',
      path: '../invitation-record/index.vue',
    })
  },
  data() {
    return {
      list: { superior: {}, subordinate: [] },
      nums: 0,
      n: backs,
    }
  },
  mounted() {
    this.$minApi.getMyDownLineInfo().then(res => {
      console.log(res)
      this.list.superior = res
    })
    this.$minApi
      .getMyDownLine({
        limit: 10,
        page: 1,
      })
      .then(res => {
        this.list.subordinate = res.list
        console.log(res)
        this.nums = this.list.subordinate.length
        console.log(res)
      })
  },
  methods: {
    go() {
      this.$minRouter.push({
        name: 'lnvitation-offline',
      })
    },
    torefund(id, name) {
      console.log(id)
      this.$minRouter.push({
        name: 'refund-record',
        params: { id, name },
      })
    },
  },
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
      font-size: 28rpx;
    }
    .backi {
      width: 700rpx;
      height: 404rpx;
      // background-image: url('~@/static/images/b-mydownl.png');
      background-repeat: no-repeat;
      background-size: cover;
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
    width: 100vw;
    height: 100rpx;
    margin-top: 200rpx;
    padding: 0 30rpx;
    .main {
      width: 100%;
      height: 88rpx;
      background: #fff;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      border-radius: 10rpx 10rpx 0 0;
      padding: 20rpx 0;
    }
    .item {
      height: auto;
      background: #fff;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
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
