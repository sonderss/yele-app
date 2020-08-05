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
        <view class="min-flex" v-if="type === 1">
          <view class style="width:300rpx" >
            <view class="f28">{{item.grant_name}}{{list.grant_type === 2 ? '提成发放':'工资发放'}}</view>
            <view class="label m-top-10 f24 assist-text min-ellipsis">{{$minCommon.formatDate(new Date(item.grant_time*1000),"yyyy/MM/dd hh:mm:ss") }}</view>
          </view>
        </view>
        <view class="min-flex flex-end min-flex-dir-top"  v-if="type === 1"> 
          <view :class="item.total_amount *1 > 0 ? 'ared' : 'ablack'">{{item.total_amount *1 > 0 ? '+' : '-'}}{{item.total_amount}}</view>
          <view class="bom">{{faStatus[item.grant_status]}}</view>
        </view>
        <!---->
        <!--提现记录-->
         <view class="min-flex" v-if="type === 2">
          <view >
            <view class="f28">银行卡提现</view>
            <view class="label m-top-10 f24 assist-text min-ellipsis">{{$minCommon.formatDate(new Date(item.create_time*1000),"yyyy/MM/dd hh:mm:ss")  }}</view>
          </view>
        </view>
        <view class="min-flex flex-end min-flex-dir-top bpa"  v-if="type === 2"> 
          <view :class="item.cash_amount *1 > 0 ? 'ared' : 'ablack'">-{{item.amount}}</view>
          <view class="bom f24 m-top-10">{{item.transaction_status === 0 ? '提现中' : (item.transaction_status === 1 ? '提现成功' : '提现失败' )}}</view>
        </view>
        <!---->
        <!--转账记录-->
         <view class="min-flex"  v-if="type === 3">
          <view >
            <view class="f28">{{item.account_name}}转账</view>
            <view class="label m-top-10 f24 assist-text min-ellipsis">{{$minCommon.formatDate(new Date(item.create_time*1000),"yyyy/MM/dd hh:mm:ss")  }}</view>
          </view>
        </view>
        <view class="min-flex flex-end min-flex-dir-top"  v-if="type === 3"> 
          <view :class="item.amount *1 > 0 ? 'ared' : 'ablack'">{{item.amount *1 > 0 ?  `+${item.amount}`: `-${item.amount}` }}</view>
          <view class="bom f24 m-top-10">{{item.transaction_status === 0 ? '入账中' : (item.transaction_status === 1 ? '已到账' : '入账失败' )}}</view>
        </view>
        <!---->
        <!--收支流水-->
         <view class="min-flex"  v-if="type === 0">
          <view >
            <view class="f28">{{item.item_name}}</view>
            <view class="label m-top-10 f24 assist-text min-ellipsis">{{$minCommon.formatDate(new Date(item.create_time*1000),"yyyy/MM/dd hh:mm:ss")  }}</view>
          </view>
        </view>
        <view class="min-flex flex-end min-flex-dir-top"  v-if="type === 0"> 
          <view :class="item.fund_direction ===  2 ? 'ared' : 'ablack'">{{item.fund_direction ===  1  ?  `-${item.amount}`: `+${item.amount}` }}元</view>
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
    <min-pulldown :isFlag="falg" :desc="des" :loading="load"/>
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
      falg:false,
      nums:2,
      des:"加载中",
      load:true,
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
  onPullDownRefresh() {
    console.log('refresh');
     this.getData()
  },
  onReachBottom(){
      console.log('到底')
      this.falg = true
      switch(this.$parseURL().type){
        case 0:
          // 收支流水
          this.$minApi.getShouZ({
              date:this.getTime(this.time) ,
              page:this.nums,
              limit:10,
              isLoading:true
          }).then(res => {
              if(res.list.length === 0) {
                this.load = false
                this.des = '暂无更多数据'
                setTimeout(() => {
                  return this.falg = false
                },1000) 
              }   
              console.log('收支流水',res);
              this.list = this.list.concat([...res.list])
              this.nums++
          })
        break;
        case 1:
          // 发放记录
          // this.getFaFangList(this.getTime())
        break;
        case 2:
          // 提现记录
            this.$minApi.getTiXian({
              date:this.getTime(this.time) ,
              page:this.nums,
              limit:10,
              isLoading:true
            }).then(res => {
              if(res.list.length === 0) {
                this.load = false
                this.des = '暂无更多数据'
                setTimeout(() => {
                  return this.falg = false
                },1000) 
              }   
              console.log('提现记录',res);
              this.list = this.list.concat([...res.list])
              this.nums++
            })
        break;
        case 3:
        // 转账记录
          // this.getZhBill(this.getTime())
           this.$minApi.getZhBill({
              date:this.getTime(this.time) ,
              page:this.nums,
              limit:10,
              isLoading:true
          }).then(res => {
            if(res.list.length === 0) {
                this.load = false
                this.des = '暂无更多数据'
                setTimeout(() => {
                  return this.falg = false
                },1000) 
              }   
            console.log('转账记录',res);
            this.list = this.list.concat([...res.list])
            this.nums++
          })
        break;
    }
  },
  watch:{
    nums(a){
      console.log(a);
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
          this.getShouS(this.getTime(),1)
        break;
        case 1:
          uni.setNavigationBarTitle({
              title: '发放记录'
          });
          this.getFaFangList(this.getTime(),1)
        break;
        case 2:
          // 提现记录
          this.getTiXians(this.getTime(),1)
        break;
        case 3:
          uni.setNavigationBarTitle({
              title: '转账记录'
          });
          this.getZhBill(this.getTime())
        break;
    }
  },
  mounted () {
    this.getYears()
    this.getMonth()
    this.time = new Date().getFullYear() + '年'+ (new Date().getMonth()+1 <= 9 ? `0${new Date().getMonth()+1}` : new Date().getMonth()+1 ) +"月"
    for (const va of this.years) {
      for (const val of this.months) {
        if(val <= 9){
          val = '0'+val
        }
        this.data.push(va + '年' + val + '月')
      }
    }
  },
  methods: {
    // 自定义方法
    getData(){
      switch(this.$parseURL().type){
        case 0:
          this.$minApi.getShouZ({
            date:this.getTime(this.time),
            page:1,
            limit:10,
            isLoading:true
          }).then(res => {
            console.log(res)
            this.list = res.list
            this.nums = 2
            uni.stopPullDownRefresh();
          })
        break;
        case 1:
          this.$minApi.faFangList({
            date:this.getTime(this.time),
            page:1,
            limit:10,
            isLoading:true
          }).then(res => {
            console.log(res)
            this.list = res.list
            this.nums = 2
            uni.stopPullDownRefresh();
          })
        break;
        case 2:
          // 提现记录
         this.$minApi.getTiXian({
            date:this.getTime(this.time),
            page:1,
            limit:10,
            isLoading:true
          }).then(res => {
            console.log(res)
            this.list = res.list
            this.nums = 2
            uni.stopPullDownRefresh();
          })
        break;
        case 3:
            this.$minApi.getZhBill({
                date:this.getTime(this.time),
                page:1,
                limit:10,
                isLoading:true
            }).then(res => {
            console.log(res)
            this.list = res.list
            this.nums = 2
            uni.stopPullDownRefresh();
          })
        break;
      }
    },
    getTime(time){
      // 获取时间
      if(!time) return this.$minCommon.formatDate(new Date(),'yyyy-MM')
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
        break;
        // 提现记录详情
        case 2:
            this.$minRouter.push({
              name: 'withdrawals-d',
              params:{type: this.type,id:item.id}
            })
        break;
        // 转账记录详情
        case 3:
            this.$minRouter.push({
              name: 'withdrawals-d',
              params:{type: this.type,id:item.id}
            })
        break;
      }
    },
    // 获取发放记录
    getFaFangList(date,page,limit = 10){
      this.$minApi.faFangList({
        date,
        page,
        limit
      }).then(res=>{
        console.log('发放记录',res);
        this.list = res.list
      })
    },
    // 获取提现记录
    getTiXians(date,page,limit = 10){
      this.$minApi.getTiXian({
        date,
        page,
        limit
      }).then(res => {
        console.log('提现记录',res);
         this.list = res.list
      })
    },
    // 获取转账记录
    getZhBill(date,page = 1, limit = 10){
      this.$minApi.getZhBill({
        date,
        page,
        limit
      }).then(res => {
        console.log('转账记录',res);
        this.list = res.list
      })
    },
    // 获取收支流水
    getShouS(date,page = 1, limit = 10){
      this.$minApi.getShouZ({
        date,
        page,
        limit
      }).then(res => {
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
    getType(type){
      // v收支类型 1-门店提成发放,2-门店转账,3-银行卡提现,4-提现手续费
       return  type ===  1 ?  '门店提成发放' :   type ===  2 ? '门店转账' : type ===  3 ? "银行卡提现" : type ===  4 ? "提现手续费" :''
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
      switch (this.type) {
        // 收支流水
        case 0:
         this.getShouS(this.getTime(this.time),1)
         this.nums = 2
        break;
        // 发放记录详情
        case 1:
              // 发放记录
              this.getFaFangList(this.getTime(this.time ),1)
        break;
        // 提现记录
        case 2:
            this.getTiXians(this.getTime(this.time),1)
            this.nums = 2
        break;
        // 转账记录
        case 3:
            this.getZhBill(this.getTime(this.time))
            this.nums = 2
        break;
      }
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
    width: auto;
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
.bpa{
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>
