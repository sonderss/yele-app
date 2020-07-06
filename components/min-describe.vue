<template>
<view class="min-describe p-lr-20">

      <view class="left-view" @click="chinceSku">
        <view class="img-view" v-if="leftIcon">
          <image :src="leftIconValue ? leftIconValue : '/static/images/goods.png' " />
        </view>
        <view :class=" leftTxtTwo ? 'txt-view': ''">
          <view class="left-txt" style="color:#333">{{leftTxt}}</view>
          <view class="left-txt" style="color:#666" v-if="leftTxtTwo">{{leftTxtB}}</view>
        </view>
      </view>
      <view class="right-view" @click="chinceSku">
         <view v-if="step">
              <min-stepper   v-model="count" :isAnimation="Animation" :max="maxStep" @change="emitEvent"  icon='/static/images/yellow-add.png'></min-stepper>
         </view>

          <text v-if="num">x {{num}}</text>
          <view v-if="sku" class="right-icon f30">{{sku}}<image src='/static/images/right-black.png' /></view>
          <view class="txt-view1" v-if="leftTxtTwo">
            <view class="left-txt" style="color:#333">{{rightTxtT}}</view>
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
      default: '/static/images/goods.png'
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
    },
    maxStep: {
      type: [String, Number],
      default: 999
    },
    value:{
       type: [String, Number],
      default: 0
    },
    Animation:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      count: 0,
      images:''
    }
  },
  created(){
    this.count = this.value
  },
  watch:{
    value(a){
      this.count = a
    }
  },
  methods: {
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
  margin: 20rpx 0;
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
