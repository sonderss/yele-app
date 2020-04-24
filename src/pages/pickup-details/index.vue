<template>
  <view class="storing-liquor-detail p-tb-20 p-lr-30">
    <view class="card p-lr-20" v-if="this.list.fetch_product_info.length !== 0">
      <view class="top p-tb-30 min-border-bottom">
        <view>取酒客户信息</view>
      </view>
      <view class="main p-tb-30" >
        <view class="item">客户姓名：{{list.fetch_info.client_name}}</view>
        <view class="item">联系电话：{{list.fetch_info.client_mobile}}</view>
        <view class="item">取酒台号：<text class="item spectio">{{list.fetch_info.desk_name}}</text></view>
        <view class="item">取酒单号：{{list.fetch_info.fetch_sn}}</view>
        <view class="item">取酒人员：{{list.fetch_info.fetch_name}}</view>
        <view class="item">取酒时间：{{$minCommon.formatDate(new Date(list.fetch_info.create_time*1000),'yyyy-MM-dd hh:mm:ss')}}</view>
        <view class="item">确认人员：{{list.fetch_info.confirm_name}}</view>
        <view class="item">确认时间：{{list.fetch_info.confirm_time != 0 ? $minCommon.formatDate(new Date(list.fetch_info.confirm_time*1000),'yyyy-MM-dd hh:mm:ss'):'0'}}</view>
      </view>
    </view>
    <view class="goods-wrap m-top-20 p-lr-20" v-if="this.list.fetch_product_info.length !== 0">
      <view class="p-tb-30 min-border-bottom">取酒信息</view>
      <view class="goods-list p-t-10 p-bottom-20">
        <view class="p-top-20" v-for="(item,index) in list.fetch_product_info" :key="index">
          <view style="background: #fff;">
            <view class="goods-item">
              <image class="goods-icon" :src="item.sku_img"/>
              <view class="goods-content">
                <view class="goods-name">{{item.sku_full_name}}</view>
                <view class="count-weap">
                  <!-- <view class="slider">
                    <min-slider v-model="count" max="100"/>
                  </view>
                  <view class="stepper">
                    <min-stepper :isAnimation="false" v-model="count" max="100" unit="%"/>
                  </view> -->
                </view>
                <view class="goods-price">剩余{{item.retention_ratio}}%</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="card p-lr-20 m-top-20" v-if="this.list.fetch_product_info.length !== 0">
      <view class="top p-tb-30 min-border-bottom">存酒信息</view>
      <view class="main p-tb-30">
        <view class="item">客户姓名：{{list.deposit_info.client_name}}</view>
        <view class="item">联系电话：{{list.deposit_info.client_mobile}}</view>
        <view class="item">存酒单号：{{list.deposit_info.deposit_sn}}</view>
        <view class="item">存酒人员：{{list.deposit_info.deposit_name}}</view>
        <view class="item">存酒台号：{{list.deposit_info.desk_name}}</view>
        <view class="item">确认人员：{{list.deposit_info.confirm_name}}</view>
        <view class="item">存酒时间：{{list.deposit_info.create_time}}</view>
        <view class="item">生效时间：{{list.deposit_info.confirm_time}}</view>
        <view class="item">到期时间：{{list.deposit_info.expires_time}}</view>

      </view>
    </view>
    <!-- <view class="btn-wrap">
      <min-btn shape="flat" :opacity="false">取酒</min-btn>
    </view> -->
    <min-404 v-if="this.list.fetch_product_info.length === 0"></min-404>
  </view>
</template>

<script>
export default {
  name: 'pickup-details',
  navigate: ['navigateTo'],
  onLoad () {
    this.$minApi.getWineDetail({ id: this.$parseURL().id }).then(res => {
      this.list = res
      console.log(this.list)
    })
  },
  data () {
    return {
      count: 0,
      list: { fetch_info: { client_name: '' }, deposit_info: { client_name: '' }, fetch_product_info: [] }
    }
  }
}

</script>

<style lang="scss" scoped>
.storing-liquor-detail{
  padding-bottom: 100rpx;
  .card{
    background: #fff;
    border-radius: 10rpx;
    .top{
      display: flex;
      justify-content: space-between;
    }
    .main{
      .item{
        margin-top: 10rpx;
        &:first-child{
          margin: 0;
        }
        &.spectio{
          color: #FF0000
        }
      }
    }
  }
  .goods-wrap{
    background: #fff;
    margin-bottom: 10rpx;
    .goods-item{
      display: flex;
      .goods-icon{
        height: 140rpx;
        flex: 0 0 140rpx;
      }
      .goods-content{
        flex: 1;
        display: block;
        padding-left: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        .goods-name{
          font-size: 28rpx;
        }
        .goods-price{
          font-size: 24rpx;
          color: #FF0000;
        }
        .goods-size{
          color: #666;
          font-size: 24rpx;
          .count{
            color: #666;
            font-size: 24rpx;
            float: right;
          }
        }
      }
      .count-weap{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: -20rpx;
        .slider{
          flex: 0 0 68%;
        }
      }
    }
  }
  .card{
    background: #fff;
    border-radius: 10rpx;
    .top{
      display: flex;
      justify-content: space-between;
    }
    .main{
      .item{
        margin-top: 10rpx;
        &:first-child{
          margin: 0;
        }
      }
    }
  }
  .btn-wrap{
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }
}
</style>
