<template>
  <view class="uni-steps">
    <view :class="[direction==='column'?'uni-steps__column':'uni-steps__row']">
      <view
        :class="[direction==='column'?'uni-steps__column-text-container':'uni-steps__row-text-container']"
      >
        <view
          v-for="(item,index) in options"
          :key="index"
          :class="[direction==='column'?'uni-steps__column-text':'uni-steps__row-text']"
        >
          <text
            :style="{color:index<active?deactiveTxtColor:activeTxtColor}"
            :class="[direction==='column'?'uni-steps__column-title':'uni-steps__row-title']"
          >{{item.title}}</text>
          <text
            :style="{color:index<active?deactiveTxtColor:activeTxtColor}"
            :class="[direction==='column'?'uni-steps__column-desc':'uni-steps__row-desc']"
          >{{item.desc}}</text>
        </view>
      </view>
      <view
        :class="[direction==='column'?'uni-steps__column-container':'uni-steps__row-container']"
      >
        <view
          :class="[direction==='column'?'uni-steps__column-line-item':'uni-steps__row-line-item']"
          v-for="(item,index) in options"
          :key="index"
        >
          <view
            :class="[direction==='column'?'uni-steps__column-line':'uni-steps__row-line',direction==='column'?'uni-steps__column-line--before':'uni-steps__row-line--before']"
            :style="{backgroundColor:index<=active&&index!==0?activeColor:index===0?'transparent':deactiveColor}"

          ></view>
          <view
            :class="[direction==='column'?'uni-steps__column-check':'uni-steps__row-check']"
            v-if="index === active"
          >
            <image style="width:64rpx;height:64rpx;z-index:9999" :src="img"/>
            <!-- <uni-icons :color="activeColor" type="checkbox-filled" size="14"></uni-icons> -->
          </view>
          <view
            :class="[direction==='column'?'uni-steps__column-circle':'uni-steps__row-circle']"
            v-else
            :style="{backgroundColor:index<active?activeColor:deactiveColor}"
          ></view>
          <view
            :class="[direction==='column'?'uni-steps__column-line':'uni-steps__row-line',direction==='column'?'uni-steps__column-line--after':'uni-steps__row-line--after']"
            :style="{backgroundColor:index<active&&index!==options.length-1?activeColor:index===options.length-1?'transparent':deactiveColor}"
          ></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'UniSteps',
  props: {
    direction: {
      // 排列方向 row column
      type: String,
      default: 'row'
    },
    activeColor: {
      // 激活状态颜色
      type: String,
      default: '#FFE001'
    },
    deactiveColor: {
      // 未激活状态颜色
      type: String,
      default: '#FFE001'
    },
    // 激活文本颜色
    activeTxtColor: {
      type: String,
      default: '#333333'
    },
    // 未激活文本颜色
    deactiveTxtColor: {
      type: String,
      default: '#666'
    },
    active: {
      // 当前步骤
      type: Number,
      default: 0
    },
    options: {
      type: Array,
      default: () => []
    } // 数据
  },
  data () {
    return {
      img: '/static/images/no_chioce.png'
    }
  },
  watch: {
    active (a) {
      if (a !== this.options.length - 1) {
        this.img = '/static/images/no_chioce.png'
      } else {
        this.img = '/static/images/active_.png'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.uni-steps {
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
}

.uni-steps__row {
  display: flex;
  flex-direction: column;
}

.uni-steps__column {
  display: flex;
  flex-direction: row-reverse;
  position: relative;
}

.uni-steps__row-text-container {

  display: flex;

  flex-direction: row;
}

.uni-steps__column-text-container {

  display: flex;

  flex-direction: column;
  flex: 1;
  margin-left:100rpx ;
}

.uni-steps__row-text {

  display: inline-flex;

  flex: 1;
  flex-direction: column;
}

.uni-steps__column-text {
  padding: 6px 0px;
  height: 135rpx;
  // border-bottom-style: solid;
  // border-bottom-width: 1px;
  // border-bottom-color: $uni-border-color;

  display: flex;

  flex-direction: column;
}

.uni-steps__row-title {
  font-size: $uni-font-size-base;
  line-height: 16px;
  text-align: center;
}

.uni-steps__column-title {
  font-size: $uni-font-size-base;
  text-align: left;
  line-height: 18px;
}

.uni-steps__row-desc {
  font-size: 12px;
  line-height: 14px;
  text-align: center;
}

.uni-steps__column-desc {
  font-size: $uni-font-size-sm;
  text-align: left;
  line-height: 18px;
  margin-top: 10rpx;
}

.uni-steps__row-container {

  display: flex;

  flex-direction: row;
}

.uni-steps__column-container {

  display: inline-flex;

  width: 30px;
  flex-direction: column;
  position: absolute;
  top:-100rpx;
  left: 0;
}

.uni-steps__row-line-item {

  display: inline-flex;

  flex-direction: row;
  flex: 1;
  height: 14px;
  line-height: 14px;
  align-items: center;
  justify-content: center;
}

.uni-steps__column-line-item {

  display: flex;

  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;

}

.uni-steps__row-line {
  flex: 1;
  height: 1px;
  background-color: $uni-text-color-grey;
}

.uni-steps__column-line {
  width: 1px;
  background-color: $uni-text-color-grey;
}

.uni-steps__row-line--after {
  transform: translateX(1px);
}

.uni-steps__column-line--after {
  flex: 1;
  transform: translate(0px, 1px);
}

.uni-steps__row-line--before {
  transform: translateX(-1px);
}

.uni-steps__column-line--before {
  height:100rpx;
  transform: translate(0px, -1px);
}

.uni-steps__row-circle {
  width: 5px;
  height: 5px;
  border-radius: 100px;
  background-color: $uni-text-color-grey;
  margin: 0px 3px;
}

.uni-steps__column-circle {
  width: 5px;
  height: 5px;
  border-radius: 100px;
  background-color: $uni-text-color-grey;
  margin: 4px 0px 5px 0px;
}

.uni-steps__row-check {
  margin: 0px 6px;
}

.uni-steps__column-check {
  height: 64rpx;
  width: 64rpx;
}
</style>
