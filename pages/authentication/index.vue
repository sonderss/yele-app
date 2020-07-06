<template>
  <view class="authentication">
    <view class="main">
      <view class="top">
        <view class="title">身份验证</view>
        <view class="desc">请输入支付密码，以验证身份</view>
      </view>
       
      <view class="bom">
        <ul class="iul">
         <input type="number" v-model="key" :focus="isfocus" maxlength="6" />
          <li  @click.stop="getFocus">{{value}}</li>
          <li  @click="getFocus">{{value1}}</li>
          <li  @click="getFocus">{{value2}}</li>
          <li  @click="getFocus">{{value3}}</li>
          <li  @click="getFocus">{{value4}}</li>
          <li  @click="getFocus">{{value5}}</li>
        </ul>
      </view>
    </view>
  </view>
</template>

<script>
import MD5 from "../../static/js/md5.min.js";
export default {
  name: "authentication",
  navigate: ["navigateTo"],
  data() {
    return {
      current: 0,
      value: "",
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      key: "",
      isfocus: true,
      basics_id:""
    };
  },
  onLoad() {
    this.basics_id = this.$store.state.user.userInfo.basics_id
  },
  watch: {
    key(a) {
      let arr = [...a];
      this.value = arr[0];
      this.value1 = arr[1];
      this.value2 = arr[2];
      this.value3 = arr[3];
      this.value4 = arr[4];
      this.value5 = arr[5];
      if(a.length === 6){
         let str = this.value +  this.value1 + this.value2 + this.value3 + this.value4 + this.value5 
          let userpsd = MD5(this.basics_id +str)
          // MD5 ( basics_id + MD5 ( basics_id + 提现密码) )
          let post_ = MD5(this.basics_id + userpsd + '')
          this.postYz(post_)
      }
    }
  },
  methods: {
    getFocus(e) {
      console.log(e);
     this.isfocus = false
     setTimeout(() => {
        this.isfocus = true
     },20)
    },
    postYz(str) {
      this.$minApi
        .cardYanZ({
          cash_pwd: str
        })
        .then(res => {
          if(res.length === 0){
            this.$showToast('验证成功')
            if(this.$parseURL().isBind){
              setTimeout(() => {
                   this.$minRouter.push({
                     name:"redbind-bank-card",
                     type:'redirectTo'
                   })
              },2000)
              return
            }
            this.jiebang()
          }
        });
    },
    jiebang(){
       this.$minApi.jieBankCard().then(res=>{
         console.log(res);
           this.$showToast("解绑成功")
           this.$store.dispatch('user/setUserInfoAuth', res.apiAuth)
            this.$store.dispatch('status/setisGetUser',true)
           setTimeout(() => {
                uni.navigateBack({
                    delta: 1
                })
           },2000)
       })
    }
  }
};
</script>

<style lang="scss" scoped>
.authentication {
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  .main {
    width: 552rpx;
    height: 340rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 140rpx;
    .top {
      .title {
        font-size: 40rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        text-align: center;
        margin-bottom: 54rpx;
      }
      .desc {
        font-size: 32rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
    .bom {
      width: 552rpx;

      .iul {
        width: 552rpx;
        height: 93rpx;
        display: flex;
        padding: 0;
        border: 1rpx solid #e7e7e7;
        position: relative;
        li {
          list-style: none;
          width: 93rpx;
          height: 93rpx;
          border-right: 1rpx solid #e7e7e7;
          z-index: 999;
          text-align: center;
          line-height: 93rpx;
        }
        input {
          width: 1rpx;
          height: 100%;
          display: block;
          text-align: left;
          position: absolute;
          bottom: 0;
          left: 0;
          margin-left: -100%;
          text-indent: -999em;
        }
        li:nth-child(7) {
          border: none;
        }
      }
    }
  }
}
</style>
