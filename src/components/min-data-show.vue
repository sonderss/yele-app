<template>
  <view class="min-data-show">
    <view class="top_search">
      <input :class="focus ? 'left' : 'center'" :placeholder="placeholder" @focus="focusValue" />
    </view>
    <view class="m-tb-20">
      <view class="nav_item min-border-bottom p-lr-20">
        <view
          :class="current === index ? 'nav_item_name_active' :'nav_item_name' "
          @click="chince(index)"
          v-for="(i,index) in navBar"
          :key="i"
        >{{i}}</view>
      </view>
      <view class="main_data p-lr-20">
        <view class="time_desc">
          <text class="f20">统计时间：2020.02.23-04.23</text>
          <text class="f20">业绩合计：￥24654121.00</text>
        </view>
        <view class="main_table">
          <view class="title_list min-border-bottom">
            <view class="title_item" v-for="(title,index) in titles" :key="index">{{title}}</view>
          </view>
          <view
            :class="index === list.data.length-1 ? 'main_list_table' : 'main_list_table min-border-bottom'"
            v-for="(item,index) in list.data"
            :key="index"
            @click="toDetail"
          >
            <view class="left" v-for="(i,n) in item.data" :key="n">
              <text>{{i.name}}</text>
              <text>{{i.aa}}</text>
              <text>{{i.asd}}</text>
            </view>
            <view class="right">
              <text v-if="right">></text>
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
    list: {
      type: Object,
      default: () => {}
    },
    titles: {
      type: Array,
      default: () => []
    },
    right: {
      type: Boolean,
      default: true
    },
    id: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      focus: false,
      placeholder: '请输入姓名/手机号搜索',
      navBar: ['实时', '昨天', '本周', '上周', '本月', '今年'],
      current: 0
    }
  },
  methods: {
    // 修改文本位置
    focusValue (e) {
      this.focus = true
      this.placeholder = ''
    },
    chince (i) {
      this.current = i
    },
    toDetail (index) {
      if (this.id === '0') {
        console.log(123)
        uni.navigateTo({
          url: '/pages/statistics/person?id=' + this.id
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.min-data-show {
  .top_search {
    height: 60rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 10rpx;
    input {
      height: 60rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 60rpx;
      padding-left: 20rpx;
    }
    .center {
      text-align: center;
    }
    .left {
      text-align: left;
    }
  }
  .nav_item {
    background: #fff;
    width: 100%;
    display: flex;
    height: 88rpx;
    justify-content: space-between;
    align-items: center;
    .nav_item_name {
      font-size: 30rpx;
      height: 100%;
      line-height: 88rpx;
    }
    .nav_item_name_active {
      font-size: 30rpx;
      font-weight: bold;
      color: #333;
      height: 100%;
      line-height: 88rpx;
      position: relative;
    }
    .nav_item_name_active::after {
      content: "";
      height: 4rpx;
      width: 100%;
      background: #000000;
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
  .main_data {
    width: 100%;
    height: auto;
    background: #fff;
    padding-bottom: 20rpx;
    .time_desc {
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: 50rpx;
      align-items: center;
      text {
        color: #333333;
      }
    }
    .main_table {
      width: 100%;
      height: auto;
      .title_list {
        width: 100%;
        height: 100rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 60rpx;
        padding-left: 40rpx;
        .title_item {
          text {
            font-size: 30rpx;
            font-weight: 800;
            color: #333;
          }
        }
      }
      .main_list_table {
        width: 100%;
        height: 84rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 0 30rpx;
        }
        .right {
          width: 25rpx;
          height: 25rpx;
          line-height: 25rpx;
        }
      }
    }
  }
}
</style>
