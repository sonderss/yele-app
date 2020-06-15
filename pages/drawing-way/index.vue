<template>
  <view class="drawing-way m-lr-30 p-top-20">
     <view class="card p-lr-20" v-if="userInfo.bank_card_num" @click="jiebang">
      <view class="left">
          <image class="icon" src="/static/images/goods.png" />
          <p class="m-left-20 f30">{{userInfo.bank_card_name}}({{lastString}})</p>
      </view>
      <view style="color:#FF0000;font-size:25rpx">解绑</view>
     </view>
    <view class="nodata-wrap" style="padding-top:130rpx" v-else>
      <image class="nodata" src="/static/images/nodata.png"  />
      <view class="text">尚未绑定银行卡</view>
      <view class="bn">
          <view class="btn" @click="toBangding">绑定银行卡</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'drawing-way',
  navigate: ['navigateTo'],
  data () {
    return {
      userInfo:{},
      lastString:""
    }
  },
  onShow(){
    this.lastString = ''
    this.$minApi.getUserInfo().then(res => {
      console.log(res)
      this.userInfo = res
       this.getCardLast(this.userInfo.bank_card_num)
    })
  },
  methods: {
     // 获取银行卡后四位
    getCardLast(bank_card_num){
      if( this.lastString.length !== 4){
          let card = [...bank_card_num]
          let a = [4,3,2,1]
          a.map(item => {
              this.lastString+= card[card.length-item]
          })
      }
      
    },
    toBangding () {
      this.$minRouter.push({
        name: 'authentication',
        params:{isBind:true}
      })
    },
    jiebang(){
      this.$minRouter.push({
        name:"authentication"
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.drawing-way{
  .card{
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 102rpx;
    border-radius:10rpx;
    .left{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon{
        width: 44rpx;
        height: 44rpx;
      }
    }

  }
}
.bn{
  display: flex;
  justify-content: center;
  align-items: center;
.btn{
  width:330rpx;
  height:88rpx;
  background:rgba(255,224,0,1);
  border-radius:10rpx;
  line-height: 88rpx;
  text-align: center;
  margin-top:20rpx ;
  align-self: center;
  }
}

</style>
