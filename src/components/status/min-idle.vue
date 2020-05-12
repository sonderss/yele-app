<template>
  <view class="idle platform-detail">
    <view class="card p-lr-20 m-bottom-20">
        <view class="p-tb-30 min-border-bottom">基本信息</view>
        <view class="main p-tb-20">
          <view class="status">空闲中</view>
          <view>
            台&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<text class="emp">{{list.desk_info.desk_name}}</text>
          </view>
          <view>
            分&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;组：{{list.desk_info.group_name}}
          </view>
          <view>
            低&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;消：￥{{list.desk_info.minim_charge}}
          </view>
          <view>
            座&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{$minCommon.getSeats(list.desk_info.seats)}}
          </view>
          <view>
            开台条件：{{list.desk_info.minimum_consume_percent+'成低消'+ (list.desk_info.desk_open_minimum)}}
          </view>
        </view>
    </view>

     <view class="btns">
      <view :class="index === 0 ? 'btn active' : 'btn' "   @click="book">预约</view>
      <view :class="index === 1 ? 'btn active' : 'btn' "  @click="startOrder">开台</view>
      <view :class="index === 2 ? 'btn active' : 'btn' " @click="saveWine">存酒</view>
      <view class="badge" @click="showToastTxt"  id='testDom'>
          <text class="more" style="color: #CCCCCC;">&#xe61c;</text>
          <view class="toast anmatiin " v-if="toast">
              <view class="bag_btn"  @click="goGetHistory">历史</view>
              <view  class="bag_btn"  @click="stopUse">停用</view>
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
  // 空闲中
  props: {
    idNum: Number,
    date: String,
    list: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    console.log(this.list)
    // 监听关闭事件
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click', this.handleBodyClick)
    })
  },
  data () {
    return {
      toast: false,
      index: Number
    }
  },
  methods: {
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
      // console.log(this.idNum)
      this.$minRouter.push({
        name: 'start-stage',
        params: { desk_id: this.idNum, status: this.list.desk_info.status }
      })
    },
    // 停用
    stopUse () {
      this.$refs.show.handleShow({
        title: '',
        content: '是否确认停用此台',
        contentCenter: true,
        cancelText: '点错了',
        confirmText: '停用',
        confirmColor: 'red',
        cancelColor: '#0090ff',
        success: (e) => {
          if (e.id === 1) {
            this.$minApi.stopUse({ desk_id: this.idNum })
            // 停用成功
              .then(res => {
                console.log(res)
                if (res.length === 0) {
                  this.$showToast('停用成功')
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
    },
    // 存酒
    saveWine () {
      this.index = 2
      // 跳转到选择客户页面（存酒）
      this.$minRouter.push({
        name: 'select-customers',
        params: { desk_id: this.idNum }
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
</style>
