<template>
  <view class="platform-detail">
    <view class="card p-lr-20 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">基本信息</view>
      <view class="main p-tb-20">
        <view class="status been-open">已开台</view>
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
     <view class="card p-lr-20 m-bottom-20">
      <view class="top p-tb-30 min-border-bottom">
        <view>订单信息</view>
      </view>
      <view class="main1 p-top-20">
        <view class="item">客户姓名：刘小青</view>
        <view class="item">联系电话：135 5352 0135</view>
        <view class="item">存酒数量：12356</view>
      </view>
      <view class="min-top-border"></view>
      <view class="timer min-top-border">待付合计：1000</view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20" style="margin-bottom:200rpx">
      <view class="p-tb-30 min-border-bottom">操作信息</view>
      <view class="main p-tb-20">
        <view>营销人员：刘清清</view>
        <view>预抵时间：2020年02月15日 16:20:00</view>
      </view>
    </view>

    <view class="btns">
      <view :class="index === 0 ? 'btn active' : 'btn' "  @click="book">预约</view>
      <view :class="index === 1 ? 'btn active' : 'btn' "  @click="changeOrder">转台</view>
      <view  :class="index === 2 ? 'btn active' : 'btn' " @click="goOrder" >下单</view>
      <view class="badge" @click="showToastTxt"  id='testDom'>
          <text class="more" style="color: #CCCCCC;">&#xe61c;</text>
          <view class="toast anmatiin " v-if="toast">
              <view class="bag_btn" >存酒</view>
              <view class="bag_btn" @click="bill">账单</view>
              <view class="bag_btn" >订单</view>
               <view class="bag_btn" @click="getWine">取酒</view>
              <view class="bag_btn" @click="clear_order">清台</view>
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
      this.$minRouter.push({
        name: 'order-make',
        params: { id: this.idNum }
      })
    },
    // 展示剩余按钮
    showToastTxt () {
      this.toast = !this.toast
    },
    // 转台
    changeOrder () {
      this.$minRouter.push({
        name: 'change-platform',
        params: { old_id: this.idNum }
      })
    },
    // 账单
    bill () {
      // 这里需要传开台记录id 台位ID
      this.$minRouter.push({
        name: 'desk-bill'
      })
    },
    // 取酒
    getWine () {
      // 这里将客户信息传过去,暂时写死
      this.$minRouter.push({
        name: 'fetch-liquor',
        params: { name: '刘小青', phone: '15811112222' }
      })
    },
    // 下单
    goOrder () {
      this.$minRouter.push({
        name: 'order-entry'
      })
    },
    // 清台
    clear_order () {
      this.$refs.show.handleShow({
        title: '',
        content: '是否确认账单已清，并开始清台',
        contentCenter: true,
        cancelText: '否',
        confirmText: '是',
        confirmColor: 'red',
        cancelColor: '#0090ff',
        success: (e) => {
          if (e.id === 1) {
            this.$minApi.clearOrder({
              id: this.idNum
            })
              .then(res => {
                console.log(res)
                if (res.length === 0) {
                  this.$showToast('清台成功')
                  setTimeout(() => {
                    this.$minRouter.push({
                      name: 'platform-admin'
                    })
                  }, 2000)
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
        }
      })
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
@import './index.scss';
</style>
