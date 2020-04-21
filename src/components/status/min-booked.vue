<template>
  <view class="platform-detail">
    <view class="card p-lr-20 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">基本信息</view>
      <view class="main p-tb-20">
        <view class="reserved">已预约</view>
        <view>
          台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：
          <text class="emp">{{list.baseInfo.desk_name}}</text>
        </view>
        <view>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：{{list.baseInfo.group_name}}</view>
        <view>低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：{{list.baseInfo.is_minim_charge === 1 ? '￥'+list.baseInfo.minim_charge : '否'}}</view>
        <view>座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{$minCommon.getSeats(list.baseInfo.seats) }}</view>
        <view >开台条件： {{list.baseInfo.enable_minimum_consume === 0 ? '否' : list.baseInfo.minimum_consume_percent+'成低消'+ (list.baseInfo.finally_minimum_price)}}</view>
      </view>
    </view>
     <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">客户信息</view>
      <view class="main p-tb-20">
        <view>客户姓名：{{list.bookingInfo.client_name}}</view>
        <view>联系电话：{{list.bookingInfo.client_mobile}}</view>
        <view>当天生日：{{list.bookingInfo.is_birthday  === 0 ? '否' : '是'}}</view>
        <view>预抵时间：{{$minCommon.formatDate(new Date(list.bookingInfo.arrival_time*1000),'yyyy-MM-dd hh:mm:ss') }}</view>
        <view style="display:flex;justify-content: space-between;" v-if="list.bookingInfo.remark">
          <view style="width:130rpx">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注 :</view>
          <view style="margin-left:18rpx;flex:1">{{list.bookingInfo.remark}}</view>
        </view>

      </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">操作信息</view>
      <view class="main p-tb-20">
        <view>营销人员：{{list.bookingInfo.sales_name}}</view>
        <view>预约时间：{{$minCommon.formatDate(new Date(list.bookingInfo.create_time*1000),'yyyy-MM-dd hh:mm:ss')}}</view>
      </view>
    </view>
    <view class="btns">
      <view :class="index === 0 ? 'btn active' : 'btn' "  @click="book">预约</view>
      <view :class="index === 1 ? 'btn active' : 'btn' " @click="startOrder">开台</view>
      <view  :class="index === 2 ? 'btn active' : 'btn' " @click="saveWine">存酒</view>
      <view class="badge" @click="showToastTxt"  id='testDom'>
          <text class="more" style="color: #CCCCCC;" >&#xe61c;</text>
          <view class="toast anmatiin "   v-if="toast">
              <view class="bag_btn" @click="backBook">推迟到店</view>
              <view class="bag_btn" @click="cancel">取消订台</view>
              <view class="bag_btn"  @click="goGetHistory">历史</view>
             <view class="bag"></view>
          </view>
      </view>
    </view>
     <min-modal ref='show'></min-modal>
  </view>
</template>
<script>
import mixin from './mixin'
export default {
  mixins: [mixin],
  props: {
    idNum: {
      type: Number
    },
    status: {
      type: Number
    },
    list: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      toast: false,
      index: Number
    }
  },
  mounted () {
    // 监听关闭事件
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
  },
  methods: {
    // 历史
    // goGetHistory () {
    //   this.$minRouter.push({
    //     name: 'platform-history',
    //     params: { id: this.idNum }
    //   })
    // },
    // 预约
    book () {
      this.index = 0
      this.$minRouter.push({
        name: 'order-make',
        params: { id: this.idNum }
      })
    },
    // 开台
    startOrder () {
      this.index = 1
      this.$minRouter.push({
        name: 'stage-make',
        params: { booking_id: this.list.bookingInfo.booking_id, id: this.idNum }
      })
    },
    // 推迟到店
    backBook () {
      this.$refs.show.handleShow({
        title: `确定将用户的预抵时间推迟${this.list.storeSetting.booking_delay_setting.delay_time}分钟`,
        content: '',
        contentCenter: true,
        cancelText: '点错了',
        confirmText: '确认',
        confirmColor: 'red',
        cancelColor: '#0090ff',
        success: (e) => {
          if (e.id === 1) {
            this.$minApi.backBooked({ booking_id: this.list.bookingInfo.booking_id })
              .then(res => {
                console.log(res)
                if (res.length === 0) {
                  this.$showToast('预抵时间推迟成功')
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
        }
      })
    },
    // 取消订台
    cancel () {
      this.$refs.show.handleShow({
        title: '是否取消当前预定',
        content: '',
        contentCenter: true,
        cancelText: '点错了',
        confirmText: '确认',
        confirmColor: 'red',
        cancelColor: '#0090ff',
        success: (e) => {
          if (e.id === 1) {
            this.$minApi.cancelBooked({ booking_id: this.list.bookingInfo.booking_id })
              .then(res => {
                console.log(res)
                if (res.length === 0) {
                  this.$showToast('取消成功')
                  setTimeout(() => {
                    uni.redirectTo({
                      url: '/pages/platform-admin/index'
                    })
                  }, 2000)
                } else {
                  console.log('取消订台判断事件出错')
                }
              })
          }
        }
      })
    },
    // 存酒
    saveWine () {
      this.index = 2
      // 跳转到选择客户页面（存酒）
      this.$minRouter.push({
        name: 'select-customers'
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
@import './index.scss';
.a{
  flex-wrap: nowrap;
}
</style>
