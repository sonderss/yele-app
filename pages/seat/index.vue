<template>
  <view class="seat">
    <movable-area class="mains">
      <movable-view class="max" direction="all" scale inertia :out-of-bounds="true" x="-150" y="400">
        <!-- <view class="max" v-for="(item2,index2) in back" :key="index2" :style="{backgroundImage:url(`${item2}`)}"></view> -->
        <view class="main">
          <view
            class="item"
            v-for="(item,index) in list"
            :key="index"
            :style="{
                        left:`${item.cord.x  }rpx`,
                        top:`${item.cord.y }rpx`,
                        width:`${item.cord.w*2}rpx`,
                        height:`${item.cord.h*2}rpx`,
                         backgroundImage: `url(${back[item.cord.num]})`,
                        backgroundPosition:`-${item.cord.x}px  -${item.cord.y}px`
                      }"
          ></view>
        </view>
      </movable-view>
    </movable-area>
    <view class="close" @click.stop="close">x</view>
  </view>
</template>

<script>
import list from "../../static/seat/seat.json";
export default {
  name: "seat",
  navigate: ["navigateTo"],
  mounted() {
    console.log(this.$parseURL().url)
  },
  data() {
    return {
      list,
      back: ["/static/seat/base.png",
            "/static/seat/book.png",
             "/static/seat/lock.png",
              "/static/seat/mine.png",
               "/static/seat/open.png",
               "/static/seat/select.png"
            ]
    };
  },
  methods: {
    close() {
      this.$minRouter.push({
         name: this.$parseURL().url
     });
      // uni.navigateBack({
      //   delta: 1
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
.seat {
  .mains {
    width: 100vw;
    height: 100vh;
  }
  .max {
    width: auto;
    height: auto;
  }
  .main {
    width:1286rpx;
    height: 910rpx;
    background-image: url("/static/seat/base.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    position: relative;
    transform: rotate(90deg);
  }

  .item {
    background-repeat: no-repeat;
    position: absolute;
    transform: scale(0.5);
    transform-origin: 0 0 0 
  }
  .close {
    position: fixed;
    right: 20rpx;
    top: 80rpx;
    width: 50rpx;
    height: 50rpx;
    font-size: 40rpx;
    font-weight: bold;
     transform: rotate(90deg);
  }
}
</style>