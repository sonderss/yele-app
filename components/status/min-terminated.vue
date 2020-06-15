<template>
  <view class="platform-detail">
    <view class="card p-lr-20 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">基本信息</view>
      <view class="main p-tb-20">
        <view class="status">已停用</view>
        <view>
          台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：
          <text class="emp">{{list.desk_info.desk_name}}</text>
        </view>
        <view>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：{{list.desk_info.group_name}}</view>
        <view>低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：￥{{list.desk_info.minim_charge}}</view>
        <view>座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{$minCommon.getSeats(list.desk_info.seats) }}</view>
        <view>开台条件：{{list.desk_info.minimum_consume_percent+'成低消'+ `(￥${list.desk_info.desk_open_minimum})`}}</view>
      </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">操作信息</view>
      <view class="main p-tb-20">
        <view>锁台人员：{{list.desk_info.lock_user_name}}</view>
        <view>锁台时间：{{$minCommon.formatDate(new Date(list.desk_info.lock_time*1000),'yyyy-MM-dd hh:mm:ss') }}</view>
      </view>
    </view>
    <view class="btns-confirmed">
      <view :class="index === 0 ? 'btn f28 active' :'btn f28'" @click="start_use" v-root="'desk.unlock'">启用</view>
      <view :class="index === 1 ? 'btn f28 active' :'btn f28'" @click="saveWine" v-root="'desk.saveWine'">存酒</view>
      <view :class="index === 2 ? 'btn f28 active' :'btn f28'"  @click="goGetHistory" v-root="'desk.history'">历史</view>
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
      show: false,
      index:0
    }
  },
  methods: {
    // goGetHistory () {
    //   this.$minRouter.push({
    //     name: 'platform-history',
    //     params: { id: this.idNum }
    //   })
    // },
    // 存酒
    saveWine () {
      this.index = 1
      // 跳转到选择客户页面（存酒）
      this.$minRouter.push({
        name: 'select-customers',
        params: { desk_id: this.idNum }
      })
    },
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
            this.$minApi.startUse({ desk_id: this.idNum })
              .then(res => {
                console.log(res)
                if (res.length === 0) {
                  this.$showToast('启用成功')
                  setTimeout(() => {
                    this.$minRouter.push({
                      name: 'redplatform-detail',
                      type: 'redirectTo',
                      params: { id: this.idNum, date: this.date }
                    })
                  }, 2000)
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
