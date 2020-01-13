<template>
<view class="min-collapse">
  <view class="card" >
      <view class="min-flex min-flex-main-between f28" @click="test" >
        <min-desc-input :desc="desc" v-model="value" :sign="sign" :border="border"  :placeholder="placeholder" :disabled="disabled"></min-desc-input>
        <!-- <image class="right-arrow p-left-10"  :src="isShow ? '../../static/images/downarrow24.png' : '../../static/images/arrow.png'" /> -->
        <image class="right-arrow p-left-10"  :class="isShow ? 'animation' : 'right-arrow-a animation' "  src="../../static/images/arrow.png" />
      </view>
      <view v-if="isArray">
        <view class="content"  :class="isShow ? 'animation': 'show animation' "  :style="{'height':isShow? `${list.length%5 == 0 ? list.length / 5 : Math.round(list.length/5) + 1}00`-50+'rpx' :'0'}">
          <text  class="m-right-20" @click="chioce(index)" :class="current === index ? 'chioce-date-item-active' : 'chioce-date-item' " v-for="(item,index) in list" :key="index">{{item}}</text>
        </view>
      </view>
      <view v-if="!isArray">
        <view class="content-txt"  :class="isShow ? 'animation content-txt': 'content-txt animation' " :style="{'maxHeight':isShow? '120rpx' :'0'}">
          <text  class=" txt" >{{list}}</text>
        </view>
      </view>
      <!-- <text class="m-bottom-20" style="display:block">凌晨</text>
      <view class="content" :class="isShow ? 'animation': 'show animation' "  :style="{'height':isShow? `${list.length%5 == 0 ? list.length / 5 : Math.round(list.length/5) + 1}00rpx` :'0'}">
        <text  class="m-right-20" @click="chioce(index)" :class="current === index ? 'chioce-date-item-active' : 'chioce-date-item' " v-for="(item,index) in data" :key="index">{{item}}</text>
      </view> -->
  </view>
</view>
</template>
<script>
export default {
  props: {
    list: {
      type: [Array, String, Number],
      default: () => []
    },
    desc: {
      type: String,
      default: '预抵时间'
    },
    sign: {
      type: String,
      default: '*'
    },
    placeholder: {
      type: String,
      default: '请选择到店日期'
    },
    disabled: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShow: true,
      current: Number,
      value: ''
      // data: ['8:00', '23:00', '9:00']
    }
  },
  computed: {
    isArray () {
      if (toString.call(this.list) === '[object Array]') {
        return true
      }
      return false
    }
  },
  methods: {
    test () {
      this.isShow = !this.isShow
    },
    chioce (n) {
      this.current = n
      this.value = this.list[n]
      this.$emit('input', this.list[n])
    }
  }
}
</script>
<style lang="scss" scoped>
.min-collapse{
  .right-arrow{
    width: 24rpx;
    height: 24rpx;
    padding-top: 5rpx;
    transform: rotate(90deg);
  }
  .right-arrow-a{
    transform:rotate(7deg);
  }
  .card{
    background: #fff;
    border: none;
  }
  .content{
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .chioce-date-item {
      width: 112rpx;
      height: 58rpx;
      border: 1rpx solid #e7e7e7;
      border-radius: 10rpx;
      font-size: 28rpx;
      text-align: center;
      line-height: 58rpx;
      display: block;
    }
    .chioce-date-item:nth-child(5n) {
      margin: 0;
    }
    .chioce-date-item-active{
      width: 112rpx;
      height: 58rpx;
      background: rgba(255, 224, 1, 1);
      border-radius: 10rpx;
      font-size: 28rpx;
      text-align: center;
      line-height: 58rpx;
    }
    .chioce-date-item-active:nth-child(5n) {
      margin: 0;
    }
  }
  //在txt中修改左右间距，默认使用父组件外容器的边距
  .content-txt{
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      max-height: 0;
      .txt{
        word-break: break-all;
        white-space: normal;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        // padding:0 20rpx;
        padding-bottom: 20rpx;
      }
  }
  .show{
    height: 0;
  }
  .animation {
    transition-property: all;
    transition-duration: 0.5s;
    transition-timing-function: ease;
  }
}

</style>
