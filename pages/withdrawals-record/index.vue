<template>
  <view class="withdrawals-record p-lr-30 p-tb-20">
    <view class="top_view">
      <view class="botm">
        <text class="f30" style="color:#333">{{time}}</text>
        <text class="f26" @click="changeTime">切换时间 ></text>
      </view>
    </view>
   <view class=" bg">
      <view
        v-for="(item,index) in list"
        :key="index"
        class="cell-item min-flex min-flex-main-between p-tb-30 p-lr-20 min-border-bottom"
        @click="toDeatil(item)"
      >
       <!--发放记录-->
        <view class="min-flex">
          <view class style="width:300rpx" v-if="type === 1">
            <view class="f28">{{item.grant_name}}{{list.grant_type === 2 ? '提成发放':'工资发放'}}</view>
            <view class="label m-top-10 f24 assist-text min-ellipsis">{{$minCommon.formatDate(new Date(item.grant_time*1000),"yyyy/MM/dd hh:mm:ss") }}</view>
          </view>
        </view>
        <view class="min-flex flex-end min-flex-dir-top"  v-if="type === 1"> 
          <view :class="item.total_amount *1 > 0 ? 'ared' : 'ablack'">{{item.total_amount *1 > 0 ? '+' : '-'}}{{item.total_amount}}</view>
          <view class="bom">{{faStatus[item.grant_status]}}</view>
        </view>
        <!---->
      </view>
    </view>
    <min-404 v-if="list.length === 0" />
    <min-popup :show="show" @close="close" heightSize="600">
      <picker-view
        :indicator-style="indicatorStyle"
        :value="value"
        @change="bindChange"
        style="height:400rpx;"
      >
        <picker-view-column>
          <view class="picker item" v-for="(item,index) in data" :key="index">{{item}}</view>
        </picker-view-column>
      </picker-view>
      <view class="btn_view">
        <text @click="cancel">取消</text>
        <view class="btn" @click="sure">确认</view>
      </view>
    </min-popup>
  </view>
</template>
<script>
// 发放1：已制单，2：已发放，3：已到账）
const faStatus = ["","已制单","已发放","已到账"]
export default {
  name: 'withdrawals-record',
  navigate: ['navigateTo'],
  data () {
    return {
      faStatus,
      time: '',
      show: false,
      value: [],
      data: [],
      years: [],
      months: [],
      num: 0,
      indicatorStyle: `height: ${Math.round(
        uni.getSystemInfoSync().screenWidth / (750 / 100)
      )}rpx;`,
      type:0,
      list:[]
    }
  },
  onLoad(){
    console.log(this.$parseURL().type);
    this.type = this.$parseURL().type
    switch(this.$parseURL().type){
        case 0:
          uni.setNavigationBarTitle({
              title: '收支流水'
          });
        break;
        case 1:
          uni.setNavigationBarTitle({
              title: '发放记录'
          });
          this.getFaFangList(this.getTime())
        break;
        case 3:
          uni.setNavigationBarTitle({
              title: '转账记录'
          });
        break;
    }
  },
  mounted () {
    this.getYears()
    this.getMonth()
    this.time = new Date().getFullYear() + '年'+ (new Date().getMonth()+1) +"月"
    for (const va of this.years) {
      for (const val of this.months) {
        this.data.push(va + '年' + val + '月')
      }
    }
  },
  methods: {
    getTime(time){
      // 获取时间
      if(!time)return new Date().getFullYear() + '-'+ (new Date().getMonth()+1)
    
      time = time.replace("年","-")
      time = time.replace("月","")
      return  time 
    },
    toDeatil (item) {
      switch (this.type) {
        // 发放记录详情
        case 1:
            this.$minRouter.push({
              name: 'withdrawals-d',
              params:{type: this.type,id:item.group_id}
            })
        return
      }
     this.$minRouter.push({
        name: 'withdrawals-d',
        params:{type: this.type}
      })
    },
    // 获取发放记录
    getFaFangList(date){
      this.$minApi.faFangList({
        date
      }).then(res=>{
        console.log(res);
        this.list = res.list
      })
    },
    changeTime () {
      this.show = !this.show
    },
    bindChange (e) {
      this.num = e.detail.value[0]
    },
    close () {
      this.show = false
    },
    // 获得年份
    getYears () {
      const time = new Date()
      for (let i = 2020; i <= time.getFullYear(); i++) {
        this.years.push(i)
      }
    },
    // 获取月份
    getMonth () {
      for (let i = 1; i <= 12; i++) {
        this.months.push(i)
      }
    },
    sure () {
      this.time = this.data[this.num]
      this.value = []
      this.value.push(this.num)
      this.show = false
      // console.log(this.time);
      // 发放记录
      this.getFaFangList(this.getTime(this.time )
)
    },
    cancel () {
      this.show = false
    }
  }
}
</script>
<style lang="scss" scoped>
.top_view {
  width: 100%;
  height: 100rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top {
    width: 100%;
    height: 35rpx;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    text {
      margin: 0 5rpx;
      display: block;
    }
  }
  .botm {
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 5rpx;
    display: flex;
    justify-content: space-between;
    text {
      color: rgba(102, 102, 102, 1);
    }
  }
}
.cell-item {
  background: #fff;
  .label {
    width: 410rpx;
  }
  .ablack {
    color: #333;
    font-weight: bold;
  }
  .ared {
    color: #ff0000;
    font-weight: bold;
  }
  .bom {
    font-size: 24rpx;
    color: rgba(102, 102, 102, 1);
  }
}
.picker {
  text-align: center;
  line-height: 50rpx;
  width: auto;
}
.btn_view {
  width: 100%;
  height: 100rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 50rpx;
  left: 0;
  text {
    font-size: 36rpx;
    color: rgba(190, 190, 190, 1);
  }
  .btn {
    width: 394rpx;
    height: 100rpx;
    background: rgba(255, 224, 1, 1);
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    line-height: 100rpx;
    text-align: center;
    color: #333;
    font-size: 36rpx;
  }
}
</style>
