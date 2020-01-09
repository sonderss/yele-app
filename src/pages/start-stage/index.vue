<template>
  <view class="start-stage p-lr-30 p-tb-20">
    <radio-group @change="radioChange">
      <view class="top-view-start p-tb-30 bg-white radius-6 p-lr-20">
        <radio value="-1" color="#FE0000" class="radio" />
        <text class="text">自带客</text>
      </view>
      <min-cell class="m-top-20">
        <view class="title p-tb-30">营销带客</view>
        <min-search placeholder="请输入营销姓名/手机号搜索" bgcolor="#f7f7f7"></min-search>
        <min-cell-item
          v-for="(item,index) in list"
          :key="index"
          :img="item.headUrl"
          :title="`${item.name} | ${item.position}`"
          :label="item.phone"
        >
          <radio slot="icon" :value="`${index}`" color="#FE0000" class="radio" />
        </min-cell-item>
      </min-cell>
      <view class="btn">
        <min-btn :long="true" @click="toAddUserInfo">下一步</min-btn>
      </view>
    </radio-group>
  </view>
</template>

<script>
export default {
  name: 'start-stage',
  data () {
    return {
      value: '',
      isChecked: false,
      checks: [0, 1, 2],
      list: [
        {
          headUrl: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg',
          name: '林平之',
          position: '营销',
          phone: '15866666666'
        },
        {
          headUrl: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg',
          name: '任我行',
          position: '营销',
          phone: '15866666666'
        },
        {
          headUrl: 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg',
          name: '令狐冲',
          position: '营销',
          phone: '15866666666'
        }
      ]
    }
  },
  methods: {
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
