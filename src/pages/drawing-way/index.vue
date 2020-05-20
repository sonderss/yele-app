<template>
  <view class="drawing-way m-lr-30 p-top-20">
     <view class="card p-lr-20" v-if="is_Bank">
      <view class="left">
          <image class="icon" src="/static/images/goods.png"/>
          <p class="m-left-20 f30">招商银行（0459）</p>
      </view>
      <view style="color:#FF0000;font-size:25rpx">解绑</view>
     </view>
    <view class="nodata-wrap"  v-else>
      <image class="nodata" src="/static/images/nodata.png"  />
      <view class="text">尚未绑定银行卡</view>
      <view class="bn">
          <view class="btn" @click="toBangding">绑定银行卡</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'drawing-way',
  navigate: ['navigateTo'],
  props: {
    is_Bank: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
    toBangding () {
      this.$minRouter.push({
        name: 'bind-bank-card'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.drawing-way{
  .card{
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 102rpx;
    border-radius:10rpx;
    .left{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon{
        width: 44rpx;
        height: 44rpx;
      }
    }

  }
}
.bn{
  display: flex;
  justify-content: center;
  align-items: center;
.btn{
  width:330rpx;
  height:88rpx;
  background:rgba(255,224,0,1);
  border-radius:10rpx;
  line-height: 88rpx;
  text-align: center;
  margin-top:20rpx ;
  align-self: center;
  }
}

</style>
