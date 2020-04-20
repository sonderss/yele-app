<template>
<view class="min-describe p-lr-20">
    <view class="left-view" @click="chinceSku">
      <view class="img-view" v-if="leftIcon">
        <image :src="imageErro ?  '../../static/images/goods.png' : leftIconValue " @error="imgerro"/>
      </view>
      <view :class=" leftTxtTwo ? 'txt-view': ''">
         <view class="left-txt" style="color:#333">{{leftTxt}}</view>
         <view class="left-txt" style="color:#666" v-if="leftTxtTwo">{{leftTxtB}}</view>
      </view>
    </view>
    <view class="right-view" @click="chinceSku">
        <min-stepper v-if="step"  v-model="count" @change="emitEvent" :min='0' icon='/static/images/yellow-add.png'></min-stepper>
        <text v-if="num">x {{num}}</text>
        <view v-if="sku" class="right-icon f30">{{sku}}<image src='../../static/images/right-black.png' /></view>
        <view class="txt-view1" v-if="leftTxtTwo">
          <view class=".left-txt" style="color:#333">{{rightTxtT}}</view>
          <view class="left-txt" style="color:#666">{{rightTxtB}}</view>
        </view>
    </view>
</view>
</template>
<script>
export default {
  props: {
    leftIcon: {
      type: Boolean,
      default: false
    },
    leftIconValue: {
      type: String,
      default: ''
    },
    leftTxt: {
      type: String,
      default: '暂无商品名'
    },
    step: {
      type: Boolean,
      default: false
    },
    num: {
      type: String,
      default: ''
    },
    sku: {
      type: String,
      default: ''
    },
    leftTxtTwo: {
      type: Boolean,
      default: false
    },
    rightTxtT: {
      type: [String, Number],
      default: ''
    },
    rightTxtB: {
      type: [String, Number],
      default: ''
    },
    leftTxtB: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      count: 0,
      imageErro: false
    }
  },
  methods: {
    imgerro (e) {
      if (e.type === 'error') {
        this.imageErro = true
      }
    },
    chinceSku () {
      this.$emit('chincesku')
    },
    emitEvent (n) {
      this.$emit('changeCount', n)
    }
  }
}
</script>
<style lang="scss" scoped>
.min-describe{
  width: 100%;
  height: 100rpx;
  display: flex;
  background: #fff;
  justify-content: space-between;
  .left-view{
    display: flex;
    align-items: center;
    .txt-view{
      text-align: left;
      display: flex;
      flex-direction: column;
       height:80rpx;
      justify-content: space-between;
        .left-txt{
          color: #333;
        }
    }

    .img-view{
      width: 100rpx;
      height: 100rpx;
      margin-right: 20rpx;
      border-radius: 50%;
      image{width: 100%;height: 100%;}
    }
  }
  .right-view{
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666;
     .txt-view1{
        text-align: left;
        display: flex;
        flex-direction: column;
        height:85rpx;
        justify-content: space-between;
        text-align: right;
          .left-txt{
            color: red;
        }
    }
    .right-icon{
      image{width:20rpx;height: 22rpx;margin-left: 18rpx;color: #666666;}
    }
  }
}
</style>
