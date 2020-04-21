<template>
  <view class="platform-detail">
    <view class="card p-lr-20 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">基本信息</view>
      <view class="main p-tb-20">
        <view class="status">已停用</view>
        <view>
          台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：
          <text class="emp">{{list.baseInfo.desk_name}}</text>
        </view>
        <view>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：{{list.baseInfo.group_name}}</view>
        <view>低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：{{list.baseInfo.is_minim_charge === 1 ? '￥'+list.baseInfo.minim_charge : '否'}}</view>
        <view>座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{$minCommon.getSeats(list.baseInfo.seats) }}</view>
        <view>开台条件： {{list.baseInfo.enable_minimum_consume === 0 ? '否' : list.baseInfo.minimum_consume_percent+'成低消'+ (list.baseInfo.finally_minimum_price)}}</view>
      </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">操作信息</view>
      <view class="main p-tb-20">
        <view>锁台人员：{{list.baseInfo.lock_user_name}}</view>
        <view>锁台时间：{{$minCommon.formatDate(new Date(list.baseInfo.lock_time*1000),'yyyy-MM-dd hh:mm:ss') }}</view>
      </view>
    </view>
    <view class="btns-confirmed">
      <min-btn class="btn" @click="start_use">启用</min-btn>
      <min-btn type="white" class="btn">存酒</min-btn>
      <min-btn type="white" @click="goGetHistory" class="btn">历史</min-btn>
    </view>
      <min-modal ref='show'></min-modal>
  </view>
</template>
<script>
import mixin from './mixin'
export default {
  mixins: [mixin],
  props: {
    idNum: Number,
    date: String,
    list: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    // goGetHistory () {
    //   this.$minRouter.push({
    //     name: 'platform-history',
    //     params: { id: this.idNum }
    //   })
    // },
    start_use () {
      this.$refs.show.handleShow({
        title: '确认启用？',
        content: '',
        contentCenter: true,
        cancelText: '点错了',
        confirmText: '确认',
        confirmColor: 'red',
        cancelColor: '#0090ff',
        success: (e) => {
          if (e.id === 1) {
            this.$minApi.startUse({ id: this.idNum })
              .then(res => {
                console.log(res)
                if (res.length === 0) {
                  this.$showToast('启用成功')
                  this.$minRouter.push({
                    name: 'platform-detail',
                    params: { id: this.idNum, date: this.date }
                  })
                }
              })
          }
        }

      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss'
</style>
