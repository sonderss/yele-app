<template>
<view class="yele-grid min-flex min-flex-main-start min-flex-wrap-wrap m-lr-30 m-top-20">
    <view 
     v-for="(item,index) in list" :key="item.name"
     :class="itemNum ? 'grid-item-3 min-flex min-flex-dir-top' : 'grid-item min-flex min-flex-dir-top'"
     @click="goTo(index)"
     v-root="item.root"
    >
      <image class="img"  :src="item.img" />
      <view class="f24 " >{{item.text}}</view>
    </view>
</view>
</template>

<script>
export default {
  name: 'YeleGrid',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    itemNum:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    goTo (n) {
      let result = this.$getRoot(this.list[n].root)
      if(!result) return this.$showToast('抱歉，暂无权限')
      this.$minRouter.push({
        name: this.list[n].name,
        type: 'navigateTo',
        path: this.list[n].url
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.yele-grid {
  background: #FFFFFF;
  border-radius: 6px;
  .grid-item {
    padding: 30rpx 0;
    width: 25%;
  }
  .grid-item-3 {
    padding: 20rpx 0;
    width: 33.3%;
  }
  .img {
    width: 80rpx;
    height: 80rpx;
  }
}
</style>
