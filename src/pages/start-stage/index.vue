<template>
  <view class="start-stage p-lr-30 p-tb-20">
    <radio-group @change="radioChange">
      <view class="top-view-start p-tb-30 bg-white radius-6 p-lr-20">
        <radio value="-1" color="#FE0000" class="radio" />
        <text class="text">自来客</text>
      </view>
      <min-cell :card="false" class="m-top-20">
        <view class="title p-tb-30">营销带客</view>
        <min-search v-model="value" placeholder="请输入营销姓名/手机号搜索" bgColor="#f7f7f7"></min-search>
        <view style="height:20rpx"></view>
        <min-cell-item
          v-for="(item,index) in getValue"
          :key="index"
          :img="item.head_img ? item.head_img: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg' "
          :title="`${item.sales_name} | ${item.position_name}`"
          :label="item.mobile"
        >
          <radio slot="icon" :value="`${index}`" color="#FE0000" class="radio" />
        </min-cell-item>
      </min-cell>
      <view class="btn">
        <min-btn :long="true" @click="toAddUserInfo">下一步</min-btn>
      </view>
    </radio-group>
    <min-404 v-if="isNone" pTop="200rpx"></min-404>
  </view>
</template>

<script>
export default {
  name: 'start-stage',
  navigate: ['navigateTo'],
  data () {
    return {
      value: '',
      isChecked: false,
      checks: [0, 1, 2],
      list: [],
      isNone: false
    }
  },
  computed: {
    getValue () {
      let data = []
      if (this.value) {
        this.list.filter(item => {
          if (item.sales_name.includes(this.value)) {
            data.push(item)
          }
        })
      } else {
        data = this.list
      }
      return data
    }
  },
  watch: {
    getValue (a) {
      if (a.length === 0) {
        this.isNone = true
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$minApi.getMarketingList()
        .then(res => {
          console.log(res)
          this.list = res.list
        })
    },
    toAddUserInfo () {
      uni.navigateTo({
        url: '../add-userinfo/index'
      })
    },
    radioChange (e) {
      console.log(e)
    }
  }
}
</script>

<style lang='scss' scoped>
.start-stage {
  .radio {
    transform: scale(0.834);
  }
  .top-view-start {
    background: #fff;
    margin-bottom: 20rpx;
    .radio,
    .text {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .btn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>
