<template>
  <view class="nodata-wrap" @click="oLoad" :style="{'padding-top':pTop}">
    <image class="nodata" :src="src"  />
    <view class="text">{{txt}}</view>
  </view>
</template>
<script>

export default {
  props: {
    id: {
      type: String,
      default: 'none'
    },
    pTop: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      status: 'none'
    }
  },
  created () {
    this.status = this.id
    this.isNetworkCanUse(usable => {
      if (!usable) {
        this.status = 'net'
      }
    })

    uni.onNetworkStatusChange(res => {
      if (!res.isConnected) {
        this.status = 'net'
        this.$emit('input', false)
      } else {
        // 重新请求数据
        this.status = 'none'
        this.$emit('input', true)
      }
    })
  },
  methods: {
    isNetworkCanUse (callback) {
      uni.getNetworkType({
        success: res => {
          if (res.networkType === '2g' || res.networkType === 'none') {
            // eslint-disable-next-line standard/no-callback-literal
            callback(false)
          } else {
            // eslint-disable-next-line standard/no-callback-literal
            callback(true)
          }
        },
        fail () {
          // eslint-disable-next-line standard/no-callback-literal
          callback(false)
        }
      })
    },
    oLoad () {
      this.$emit('input', true)
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    txt () {
      let t = ''
      switch (this.status) {
        case ('none'):
          t = '暂无数据'
          break
        case ('net'):
          t = '网络意外断开，请检查网络'
          break
        default:
          t = '暂无收藏'
      }
      return t
    },
    src () {
      let s = ''
      switch (this.status) {
        case ('none'):
          s = '../../static/images/nodata.png'
          break
        case ('net'):
          s = '../../static/images/netDown.png'
          break
        default:
          s = '../../static/images/favorite.png'
      }
      return s
    }
  }
}
</script>
<style lang="scsss" scoped>

</style>
