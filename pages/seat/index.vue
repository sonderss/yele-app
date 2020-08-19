<template>
  <view class="seat">
    <movable-area class="mains">
      <movable-view
        class="max"
        direction="all"
        scale
        inertia
        :out-of-bounds="true"
        x="-150"
        y="150"
      >
        <!-- <view class="max" v-for="(item2,index2) in back" :key="index2" :style="{backgroundImage:url(`${item2}`)}"></view> -->
        <view class="main">
          <view
            class="item"
            v-for="(item,index) in list"
            :key="index"
            @click="toDetail(item.id,item.status)"
            :style="{
                        left:`${item.cord.x  }rpx`,
                        top:`${item.cord.y }rpx`,
                        width:`${item.cord.w*2}rpx`,
                        height:`${item.cord.h*2}rpx`,
                         backgroundImage: `url(${back[item.status]})`,
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
// import list from '../../static/seat/seat.json'
// 1 - 已停用, || 2 - 空闲,|| 3 - 已预约,|| 4 - 点单中,|| 6 - 已开台,  ||  5 - 待确认  7 - 清台中
export default {
  name: 'seat',
  navigate: ['navigateTo'],
  mounted() {
    console.log(this.$store.state.status.myDate)
    console.log(this.$parseURL().url)
    console.log(this.$store.state.status.seatList)
    this.list = JSON.parse(this.$store.state.status.seatList.desk_coordinate)
    this.back.push(this.$store.state.status.seatList.desk_lock_img)
    this.back.push(this.$store.state.status.seatList.desk_base_img)
    this.back.push(this.$store.state.status.seatList.desk_book_img)
    this.back.push(this.$store.state.status.seatList.desk_order_img)
    this.back.push(this.$store.state.status.seatList.desk_confirm_img)
    this.back.push(this.$store.state.status.seatList.desk_open_img)
    this.back.push(this.$store.state.status.seatList.desk_clean_img)
    this.back.push(this.$store.state.status.seatList.desk_select_img)
  },
  data() {
    return {
      list: [],
      back: [''],
    }
  },
  methods: {
    close() {
      if (this.$parseURL().url === 'platform-admin') {
        uni.redirectTo({
          url: `../${this.$parseURL().url}/index`,
        })
        return
      }

      // this.$minRouter.push({
      //   name: this.$parseURL().url,
      // })
      uni.navigateBack({
        delta: 1,
      })
    },
    toDetail(id, status) {
      console.log(id, status)
      this.$minRouter.push({
        name: 'platform-detail',
        params: { id, status, date: this.$store.state.status.myDate },
      })
    },
  },
}
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
    width: 1286rpx;
    height: 910rpx;
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
    transform-origin: 0 0 0;
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