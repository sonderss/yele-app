<template>
  <view class="platform-detail">
    <view class="card p-lr-20 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">基本信息</view>
      <view class="main p-tb-20">
        <view class="status">点单中</view>
        <view>
          台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：
          <text class="emp">{{list.deskInfo.desk_name}}</text>
        </view>
        <view>分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：{{list.deskInfo.group_name}}</view>
        <view>低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：{{list.deskInfo.is_minim_charge === 1 ? '￥'+list.deskInfo.minim_charge : '否'}}</view>
        <view>座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{$minCommon.getSeats(list.deskInfo.seats) }}</view>
        <view>开台条件：{{list.deskInfo.enable_minimum_consume === 0 ? '否' : list.deskInfo.minimum_consume_percent+'成低消'+ (list.deskInfo.finally_minimum_price)}}</view>
      </view>
    </view>
    <view class="card p-lr-20 p-bottom-10 m-bottom-20">
      <view class="p-tb-30 min-border-bottom">点单信息</view>
      <view class="main p-tb-20">
        <view>
          当前状态：
          <text style="color: #FF0000;">不满足开台条件</text>
        </view>
        <view>开台订单：￥600（未支付）</view>
        <view class="card-btns">
          <min-btn size="xs" @click="reorder">重新下单</min-btn>
          <view class="m-left-20"></view>
          <min-btn size="xs" type="white" border @click="applicationopening">申请开台</min-btn>
          <view class="m-left-20"></view>
          <min-btn size="xs" type="white" border class="m-left-20" @click="checkorder">查看订单</min-btn>
        </view>
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
      <view class="p-tb-30 min-border-bottom">操作信息</view>
      <view class="main p-tb-20">
        <view>营销人员：刘清清</view>
        <view>预抵时间：2020年02月15日 16:20:00</view>
      </view>
    </view>

    <view class="btns">
      <view :class="index === 0 ? 'btn active' : 'btn' "  @click="book">预约</view>
      <view :class="index === 1 ? 'btn active' : 'btn' " @click="goOrder">下单</view>
      <view  :class="index === 2 ? 'btn active' : 'btn' " @click="saveWine">存酒</view>
      <view class="badge" @click="showToastTxt"  id='testDom'>
          <text class="more" style="color: #CCCCCC;">&#xe61c;</text>
          <view class="toast anmatiin " v-if="toast">
              <view class="bag_btn" @click="del_order" >销台</view>
              <view class="bag_btn"  @click="goGetHistory">历史</view>
             <view class="bag"></view>
          </view>
      </view>
    </view>
     <min-modal ref="show"></min-modal>
  </view>
</template>
<script>
import mixin from './mixin'
export default {
  mixins: [mixin],
  props: {
    idNum: Number,
    list: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      show: false,
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
    // goGetHistory () {
    //   this.$minRouter.push({
    //     name: 'platform-history',
    //     params: { id: this.idNum }
    //   })
    // },
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
              desk_id: this.idNum
            })
              .then(res => {
                if (res.length === 0) {
                  this.$showToast('销台成功')
                }
              })
              .catch(() => {
                this.$showToast('缺少开台ID')
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
        name: 'select-customers',
        params: { desk_id: this.idNum, desk_name: this.list.deskInfo.desk_name }
      })
    },
    // 预约
    book () {
      this.$minRouter.push({
        name: 'order-make',
        params: { id: this.idNum }
      })
    },
    // 重新下单
    reorder () {
      this.$minRouter.push({
        name: 'placean-order'
      })
    },
    // 申请开台
    applicationopening () {
      this.$minRouter.push({
        name: 'apply-open'
      })
    },
    // 查看订单
    checkorder () {
      this.$minRouter.push({
        name: 'confirm-order'
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
    },
    // 下单
    goOrder () {
      this.$minRouter.push({
        name: 'placean-order'
      })
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
