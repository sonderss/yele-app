<template>
  <view class="with-draw p-tb-20 p-lr-30">
     <view class="main p-lr-20">
       <view class="top min-border-bottom">
         <view>提现到</view>
         <view class="methods">

            <text class="m-lr-10 f28">{{info.bank_card_name ? `${info.bank_card_name}(${lastString})` :'尚未绑定银行卡'}}</text>
         </view>
       </view>
       <view class="bottom">
         <view class="top f28">提现金额</view>
         <view class="money">
            <text class="icon">￥</text>
            <input type="number" maxlength="10" v-model="money"/>
            <text class="allin">全部提现</text>
         </view>
       </view>

     </view>
    <text class="warn">手续费：￥0.5</text>
     <view class="submit" @click="submit">提现</view>
  </view>
</template>
<script>
export default {
  name: 'redwidth-draw',
  navigate: ['navigateTo','redirectTo'],
  data(){
    return {
       info:{},
       lastString:'',
       money:''
    }
  },
  onLoad(){
    console.log(this.$store.state.user.userInfo);
    this.$minApi.getUserInfo().then(res => {
      this.info = res
      if(this.info.bank_card_num){
          this.getCardLast(this.info.bank_card_num)
      }
    })
  },
  methods: {
    toChioce () {
      this.$minRouter.push({
        name: 'drawing-way',
        params:{card_name:this.info.bank_card_name,card:this.lastString}
      })
    },
    // 获取银行卡后四位
    getCardLast(bank_card_num){
      let card = [...bank_card_num]
      let a = [4,3,2,1]
      a.forEach(item => {
          this.lastString+= card[card.length-item]
      })
    },
    // 提现
    submit () {
      if(!this.lastString) return this.$showToast('你尚未绑定银行卡')
      if(this.money * 1 < 0.5) return this.$showToast('不能低于手续费')
      if(this.money * 1 < 1) return this.$showToast('最少提现一块钱')
      this.$minRouter.push({
        name: 'redwithdrawal-success',
        type:"redirectTo"
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main{
  width: 100%;
  height: 258rpx;
  background: #fff;
  border-radius:10rpx;
  display: flex;
  flex-direction: column;
  .top{
    height: 90rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .methods{
       width: 85%;
       height: 100%;
       display: flex;
       justify-content:flex-end;
       align-items: center;
       image{width: 44rpx;height: 44rpx; }
    }
  }
  .bottom{
    flex: 1;
    display: flex;
    flex-direction: column;
    .top{
      flex: 1;
    }
    .money{
      height: 110rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      input{
        flex: 1;
        height: 100%;
        font-size:52rpx;
        font-weight:bold;
        color:rgba(51,51,51,1);

      }
      .icon{
        font-size:57rpx;
        color:rgba(51,51,51,1);
      }
    }
  }
}
.submit{
  width:580rpx;
  height:88rpx;
  background:rgba(255,224,1,1);
  border-radius:10rpx;
  margin: 80rpx auto;
  line-height: 88rpx;
  text-align: center;
}
.warn{
  width: 100%;
  height: 50rpx;
  display: block;
  color: red;
  font-size: 22rpx;
  line-height: 50rpx;
  text-align: right;
  padding: 0 20rpx;
}
</style>
