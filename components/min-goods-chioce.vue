<template>
  <view class="min-goods-chioce">
    <view class="item">
        <view class="goods"  >
          <!-- @click="goodsAdd(index,index2)" -->
          <view class="image-view-com">
            <view class="badge" v-if="badge">{{badgeTxt}}</view>
            <image mode="aspectFit" :src="imageSrc === 'error' ? '/static/images/produced.png' : image"  @error='imgerr' />
          </view>
          <view class="content-view">
            <view class="right-view-title" >
              <view class="f28 t">
                  <text v-if="discount" class="discount f26">限时特惠</text>
                  <text class=""> {{title}}</text> 
              </view>
              <text class="f26 abc" v-if="isSku" style="color:#666666">{{desc}}</text>
            </view>
            <view class="right-view-bottom">
              <view class="right-view-bottom-desc" >
                <text v-if="price != 'null'" class="f20 t">￥<text  style="color:#FF0000;font-size:30">{{price}}</text></text>
              </view>
              <view class="steper">
                <min-stepper :isFlag="isFlag" v-if="isFlag"  v-model="count" @change="changeChioce"></min-stepper>
                <view v-else class="m-right-10" style="width:40rpx;height:40rpx;" @click.stop="changeChioceT">
                    <image src="/static/images/yellow-add.png"  style="width:100%"/>
                </view>
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
      type: [Number, String],
      default: 0
    },
    value: {
      type: [Number, String],
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
      type: [Boolean, Number],
      default: false
    },
    showBtn:{
      type:Boolean,
      default:false
    },
    isFlag:{
      type:Boolean,
      default:false
    }
  },
  created () {
    this.count = this.value
  },
  watch: {
    value(a){
       this.count = a
       console.log(this.count);
    }
  },
  data () {
    return {
      count: 0,
      imageSrc: String,
      s:true,
      flag:false,
      showBtns:false
    }
  },
  computed: {},
  methods: {
    changeChioce (e) {
      this.count = e
      console.log(e)
      this.$emit('input', e)
      this.$emit('changes', e)
    },
    imgerr (e) {
      this.imageSrc = e.type
    },
    changeChioceT(){
       this.$emit('changesPop')
    }
  }
}
</script>
<style lang="scss" scoped>
.min-goods-chioce{
// .item{
//   width: 100%;
//   margin-bottom: 20rpx;
//   background: red;
// }

.goods{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  margin-bottom: 20rpx;
  background: #fff;
  width: 100%;
  height: 200rpx;
  padding: 20rpx;
   position: relative;
  .image-view-com{
      width: 160rpx;
      height: 160rpx;
      margin-right: 16rpx;
      .badge{
        width:80rpx;
        height:40rpx;
        background:rgba(3,3,19,1);
        border-radius:0rpx 20rpx 20rpx 0rpx;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        font-size:26rpx;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(255,224,1,1);
        text-align: center;
        line-height: 40rpx;
      }
      &>image{
        width:100%;
        height: 100%;
        display: block;
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
      .abc{
            width: 300rpx;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
      }
      .t{
          font-weight: bold;
          width: 300rpx;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        .discount{
          width:86rpx;
          height:26rpx;
          font-size:22rpx;
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
          display: flex;
          .t{
            font-weight: bold;
            color: #F80409;
          }
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
}

</style>
