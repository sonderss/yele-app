<template>
  <view class="platform-detail">
      <view class="card p-lr-20 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">基本信息</view>
      <view class="main p-tb-20">
        <view class="status reserved">清台中</view>
        <view>
          台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：
          <text class="emp">K112</text>
        </view>
        <view>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：卡座</view>
        <view>低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：￥500</view>
        <view>座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：4座</view>
        <view>开台条件：6成低消（￥600）</view>
      </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">客户信息</view>
      <view class="main p-tb-20">
        <view>客户姓名：刘小青</view>
        <view>联系电话：13563250000</view>
        <view>当天生日：是</view>
        <view>预抵时间：2020年02月15日 16:20:00</view>
      </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">订单信息</view>
     <view  class="m-bottom-10 m-top-20" style="width:100%;display: flex;justify-content: space-between;">
          <text class="f28">订 单 号 ：65798254864346</text>
          <text class="f26">已支付 </text>
      </view>
      <view  class="m-bottom-10 m-top-20" style="width:100%;display: flex;justify-content: space-between;">
          <text class="f28">订 单 号 ：65798254864346</text>
          <text class="f26">已支付 </text>
      </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">操作信息</view>
      <view class="main p-tb-20">
        <view>客户姓名：刘小青</view>
        <view>联系电话：13563250000</view>
        <view>当天生日：是</view>
        <view>预抵时间：2020年02月15日 16:20:00</view>
      </view>
    </view>

     <view class="btns">
      <view :class="index === 0 ? 'btn active' : 'btn' "  @click="book">预约</view>
      <view :class="index === 1 ? 'btn active' : 'btn' " @click="saveWine">存酒</view>
      <view  :class="index === 2 ? 'btn active' : 'btn' " >订单</view>
      <view class="badge" @click="showToastTxt"  id='testDom'>
          <text class="more" style="color: #CCCCCC;">&#xe61c;</text>
          <view class="toast anmatiin " v-if="toast">
              <view class="bag_btn" @click="bill">账单</view>
              <view class="bag_btn" @click="del_order">销台</view>
              <view class="bag_btn"  @click="goGetHistory">历史</view>
             <view class="bag"></view>
          </view>
      </view>
    </view>
    <min-modal ref="show"></min-modal>
  </view>
</template>
<script>
export default {
  props: {
    idNum: Number
  },
  data () {
    return {
      show: false,
      index: Number,
      toast: false
    }
  },
  mounted () {
    // 监听关闭事件
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
  },
  methods: {
    goGetHistory () {
      this.$minRouter.push({
        name: 'platform-history',
        params: { id: this.idNum }
      })
    },
    // 预约
    book () {
      this.index = 0
      this.$minRouter.push({
        name: 'order-make',
        params: { id: this.idNum }
      })
    },
    // 存酒
    saveWine () {
      this.index = 1
      // 跳转到选择客户页面（存酒）
      this.$minRouter.push({
        name: 'select-customers'
      })
    },
    // 销台
    del_order () {
      this.$refs.show.handleShow({
        title: '',
        content: '是否销台',
        contentCenter: true,
        cancelText: '否',
        confirmText: '是',
        confirmColor: 'red',
        cancelColor: '#0090ff',
        success: (e) => {
          if (e.id === 1) {
            // 销台接口
            this.$minApi.delOrder({
              id: this.idNum
            })
              .then(res => {
                if (res.length === 0) {
                  this.$showToast('销台成功')
                }
              })
          }
        }
      })
    },
    // 账单
    bill () {
      // 这里需要传开台记录id 台位ID
      this.$minRouter.push({
        name: 'desk-bill'
      })
    },
    // 展示剩余按钮
    showToastTxt () {
      this.toast = !this.toast
    },
    // 关闭剩余按钮显示
    handleBodyClick (e) {
      const targetDom = document.getElementById('testDom')
      if (targetDom) {
        const flag = targetDom.contains(e.target)
        if (!flag) {
          this.toast = false
        }
      }
    }
  },
  beforeDestroy () {
    // 事件销毁
    document.querySelector('body').removeEventListener('click', this.handleBodyClick)
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss'
</style>
