<template>
  <view class="min-goods-chioce">
      <view class="item">
        <view class="goods"  >
          <!-- @click="goodsAdd(index,index2)" -->
          <view class="image-view-com">
            <view class="badge" v-if="badge">{{badgeTxt}}</view>
            <image :src="image" mode="" ></image>
          </view>
          <view class="content-view">
            <view class="right-view-title" >
              <text class="f28 t" style="display:block"><text v-if="discount" class="discount f20">限时特惠</text>{{title}}</text>
              <text class="f26" v-if="isSku" style="color:#666666">{{desc}}</text>
            </view>
            <view class="right-view-bottom">
              <view class="right-view-bottom-desc" >
                <text class="f20 t">￥<text  style="color:#FF0000;font-size:30">{{price}}</text></text>
              </view>
              <view class="steper">
                <min-stepper  v-if="step" v-model="count" :min='0' @change="changeChioce"></min-stepper>
                <!-- <view class="isSku f24" v-if="step" @click="selSku(index,index2)">选规格</view> -->
              </view>
            </view>
          </view>
        </view>
      </view>
  </view>
</template>
<script>
export default {
  props: {
    step: {
      type: Boolean,
      default: true
    },
    image: {
      type: String,
      default: '/static/images/produced.png'
    },
    title: {
      type: String,
      default: '暂无商品标题'
    },
    desc: {
      type: String,
      default: '暂无商品描述'
    },
    price: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    },
    isSku: {
      type: Boolean,
      default: true
    },
    badge: {
      type: Boolean,
      default: false
    },
    badgeTxt: {
      type: String,
      default: ''
    },
    discount: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.count = this.value
  },
  watch: {
    count: function (a) {
      // console.log('count' + a)
      // this.count = a
    }
  },
  data () {
    return {
      count: 0
    }
  },
  computed: {},
  methods: {
    changeChioce (e) {
      this.count = e
      this.$emit('input', e)
      this.$emit('change', e)
    }
  }
}
</script>
<style lang="scss" scoped>

// .isSku{
//   width: 100rpx;
//   height: 48rpx;
//   background: #FFE001;
//   border-radius:24rpx;
//   color: #333333;
//   text-align: center;
//   line-height: 48rpx;
// }
.item{
  width: 100%;
  margin-bottom: 20rpx;
}

.goods{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  margin-bottom: 20rpx;
  background: #fff;
  height: 200rpx;

  padding: 20rpx;
  .image-view-com{
      width: 160rpx;
      height: 160rpx;
      margin-right: 16rpx;
      position: relative;
      .badge{
        width:80rpx;
        height:40rpx;
        background:rgba(3,3,19,1);
        border-radius:0rpx 20rpx 20rpx 0rpx;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        font-size:20rpx;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(255,224,1,1);
        text-align: center;
        line-height: 40rpx;
      }
      &>image{
        width:100%;
        height: 100%;

      }
  }

  .content-view{
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
    color: #333333;
    .right-view-title{
      .t{
        width: 100%;
        .discount{
          width:78rpx;
          height:19rpx;
          font-size:20rpx;
          font-family:PingFang SC;
          font-weight:bold;
          color:#fff;
          background: #F80409;
          padding: 5rpx;
          margin-right: 10rpx;
        }
      }

    }
    .right-view-bottom{
        height: 48rpx;
        display: flex;
        // position: relative;
        justify-content: space-between;
        .right-view-bottom-desc{
          display: flex
        }
        .steper{
          // position: absolute;
          // right:0;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
    }
  }
}
</style>
