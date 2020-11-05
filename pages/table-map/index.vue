<template>
  <view class="content">
    <movable-area scale-area :style="{width:areaWidth, height:areaHeight}">
      <movable-view direction="all" :style="{width:viewHeight, height:viewWidth}" @scale="onScale" :scale-value="scale"
        :x="x" :y="y" scale-min="0.8" scale-max="3" scale inertia>
        <div :style="{width:viewWidth, height:viewHeight, top:viewTop , left:viewLeft}" class="map-container">
          <image :src="this.$store.state.status.seatList.desk_base_img" @load="onImgLoad"></image>
          <view v-for="(item,index) in list" :key="index" :style="getTableStyle(item.cord,item.status)" @click="toDetail(item.id,item.status)"
            class="map-table"></view>
        </div>
      </movable-view>
    </movable-area>
    <view class=" close" @click.stop="close"></view>
    <view v-if="isShow" class="huifu" @click.stop="resetSeale">回到原点</view>
  </view>
</template>

<script>
  export default {
    name: 'TableMap',
    navigate: ['navigateTo'],
    mounted() {
      const sysInfo = uni.getSystemInfoSync()
      this.winWidth = sysInfo.windowWidth;
      this.winHeight = sysInfo.windowHeight;

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
        winWidth: 0, // 屏幕可示度
        winHeight: 0, // 屏幕可示高度
        winRatio: 1, // 像素比
        screenWidth: 0, // 屏幕容器宽度
        screenHeight: 0, // 屏幕容器高
        viewTop: '0',
        viewLeft: '0',
        imgWidth: 0, // 图片宽度
        imgHeight: 0, // 图片高度
        isShow: false,
        x: 0,
        y: 0,
        scale: 1,
        old: {
          x: 0,
          y: 0,
          scale: 1
        },
        init: {
          x: 0,
          y: 0,
          scale: 1
        },
        list: [],
        back: [''],
      }
    },
    computed: {
      viewWidth() {
        return this.screenWidth.toFixed(2) + 'px';
      },
      viewHeight() {
        return this.screenHeight.toFixed(2) + 'px';
      },
      areaWidth() {
        return this.winWidth + 'px';
      },
      areaHeight() {
        return this.winHeight + 'px';
      }
    },
    methods: {
      // 调置可缩放区域位置大小
      setAreaSize() {
        if (this.winWidth && this.winHeight && this.imgWidth && this.imgHeight) {
          if (this.imgWidth > this.winHeight || this.imgHeight > this.winWidth) {
            // 计算图片缩放可示的比例的最小值
            const scale = Math.min(this.winWidth / this.imgHeight, this.winHeight / this.imgWidth);
            this.winRatio = scale;
            // 真实显示图片尺寸
            this.screenWidth = this.imgWidth * scale
            this.screenHeight = this.imgHeight * scale
          } else {
            this.screenWidth = this.imgWidth
            this.screenHeight = this.imgHeight
          }

          this.x = (this.winWidth - this.screenHeight) / 2
          this.y = (this.winHeight - this.screenWidth) / 2
          this.viewTop = ((this.screenWidth - this.screenHeight) / 2).toFixed(2) + 'px'
          this.viewLeft = ((this.screenHeight - this.screenWidth) / 2).toFixed(2) + 'px'

          this.init = Object.assign(this.init, {
            x: this.x,
            y: this.y
          })
        }
      },
      // 图片加载完成后处理
      onImgLoad(e) {
        const imgSize = e.detail
        this.imgWidth = imgSize.width;
        this.imgHeight = imgSize.height;
        this.setAreaSize();
      },
      // 桌台样式位置状态
      getTableStyle(cord, status) {
        const left = (cord.x * this.winRatio).toFixed(2);
        const top = (cord.y * this.winRatio).toFixed(2)
        return {
          left: `${left}px`,
          top: `${top}px`,
          width: `${(cord.w * this.winRatio).toFixed(2)}px`,
          height: `${(cord.h * this.winRatio).toFixed(2)}px`,
          backgroundImage: `url('${this.back[status]}')`,
          backgroundPosition: `-${left}px  -${top}px`,
          backgroundSize: `${this.viewWidth} ${this.viewHeight}`
        }
      },
      onChange(e) {
        this.old.x = e.detail.x
        this.old.y = e.detail.y
      },
      onScale(e) {
        this.old.scale = e.detail.scale
        if (e.detail.scale == this.init.scale) {
          this.resetOffset();
          this.isShow = false;
        } else {
          this.isShow = true;
        }
      },
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
      resetOffset() {
        // 解决view层不同步的问题
        this.x = this.old.x
        this.y = this.old.y
        this.$nextTick(function() {
          const offet = Object.assign({}, this.init);
          this.x = offet.x
          this.y = offet.y
        })
      },
      resetSeale() {
        this.scale = this.old.scale
        this.$nextTick(function() {
          const offet = Object.assign({}, this.init);
          this.scale = offet.scale
        })
      },
      toDetail(id, status) {
        this.$minRouter.push({
          name: 'platform-detail',
          params: {
            id,
            status,
            date: this.$store.state.status.myDate
          },
        })
      },
    }
  }
</script>

<style scoped>
  .content {
    width: 100%;
    height: 100vh;
  }

  movable-view {
    display: block;
  }

  movable-area {
    background-color: #A8A8A8;
    overflow: hidden;
  }

  .map-container {
    position: absolute;
    transform: rotate(90deg);
  }

  .map-table {
    display: block;
    position: absolute;
    /* border: 1rpx #DD524D solid; */
  }

  .close {
    position: fixed;
    right: 20rpx;
    top: 80rpx;
    width: 34rpx;
    height: 34rpx;
    font-size: 40rpx;
    font-weight: bold;
    background-image: url('/static/images/close_seat.png');
    background-size: contain;
    background-repeat: no-repeat;
    transform: rotate(90deg);
  }

  .huifu {
    position: fixed;
    left: 20rpx;
    bottom: 80rpx;
    width: auto;
    height: 50rpx;
    transform: rotate(90deg);
    border-radius: 50rpx;
    background-color: #eee;
    color: #3276fd;
    padding: 0 20rpx;
    font-size: 24rpx;
    line-height: 50rpx;
    /* background-image: url('/static/images/s.png'); */
    /* background-size: contain; */
    /* background-repeat: no-repeat; */
  }
</style>
