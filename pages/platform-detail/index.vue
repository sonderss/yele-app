<template>
  <view class="platform-detail p-top-20 p-lr-30">
    <view v-if="list.desk_info.desk_name">
        <!-- 空闲中组件 2 00-->
        <min-idle :idNum="id" :date="date" :status="2" v-if="status === 2" :list="list"></min-idle>
        <!-- 点单中 4 00-->
        <min-order :idNum="id" :date="date" v-if="status === 4" :list="list"></min-order>
        <!-- 已预约 3 00 -->
        <min-booked :idNum="id" :date="date" v-if="status === 3" :list="list"></min-booked>
        <!-- 待确认 5 00-->
        <min-confirmed :idNum="id" :date="date" v-if="status === 5" :list="list"></min-confirmed>
        <!-- 已停用 1 00-->
        <min-terminated :idNum="id" :date="date" v-if=" status === 1" :list="list"></min-terminated>
        <!-- 已开台 6 00-->
        <min-opened  :idNum="id" :date="date" v-if=" status === 6" :list="list" ></min-opened>
        <!-- 清台中 7-->
        <min-taichung :idNum="id" :date="date"  v-if=" status === 7" :list="list"></min-taichung>
    </view>

    <min-404 v-model="intNet" v-if="!list.desk_info.desk_name"></min-404>

  </view>
</template>

<script>
export default {
  name: 'redplatform-detail',
  navigate: ['navigateTo', 'redirectTo'],
  data () {
    return {
      id: '',
      status: Number,
      intNet: Boolean,
      date: '',
      list: {
        desk_info: { desk_name: '' }
      }
    }
  },
  watch: {
    intNet: function (a) {
      if (a) {
        // 请求数据
        this.getData()
      }
    }
  },
  onBackPress(options) {  
    
          const pages = getCurrentPages();//当前页
          const beforePage = pages[pages.length - 2];//上个页面
          const  page = pages[pages.length - 1];//页面
      if (options.from === 'backbutton') {
          if(beforePage.route !== page.route) {
              this.back(1);  
              return true;  
          }else {
               this.back(2);  
              return true;  
          }
      }
  },  
  onLoad (option) {
    this.id = this.$parseURL().id
    // 暂时使用获取到的详情状态数据
    // this.status = this.$parseURL().status
    this.date = this.$parseURL().date
    this.$store.dispatch('status/setDate',{id:this.id,date:this.date})
  },
  onShow(){
     this.getData()
  },
  methods: {
    back(a) {  
        uni.navigateBack({  
            delta:a 
        });  
    },
    // 调用接口获取台详情数据数据
    getData () {
      // const date = this.$minCommon.formatDate(new Date(), 'yyyy-MM-dd')
      this.$minApi.getOrderDetail({ desk_id: this.id, date: this.date })
        .then(res => {
          this.list = res
          this.status = res.desk_info.status
        })
    }
  }
}

</script>

<style lang="scss" scoped>
.platform-detail{
  position: relative;
  padding-bottom: 100rpx;
  .card{
    background: #fff;
    border-radius: 10rpx;
    .main{
      position: relative;
      &>view{
        margin-bottom: 10rpx;
        &:last-child{
          margin: 0;
        }
      }
      .emp{
        display: inline-block;
        font-weight: bold;
        color: #FE0000;
      }
      .status{
        position: absolute;
        top: 20rpx;
        right: 0;
        color: #FE0000;
      }
      .card-btns{
        margin-top: 30rpx !important;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .btns{
    width: 100vw;
    display: flex;
    justify-content: space-between;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #f7f7f7;
    padding: 10rpx 30rpx;
  }
}
</style>
