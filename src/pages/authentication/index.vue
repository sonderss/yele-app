<template>
  <view class="authentication">
    <view class="main">
      <view class="top">
          <view class="title">添加银行卡</view>
          <view class="desc">请输入支付密码，以验证身份</view>
      </view>
      <view class="bom">

         <ul class="iul">
             <li>
                  <input v-model="value"  type="number" :focus="current === 0 ? true : false"  maxlength='1' @input="inputValueChange($event,0)"/>
             </li>
             <li>
                  <input v-model="value1"  type="number" :focus="current === 1 ? true : false"  maxlength='1' @input="inputValueChange($event,1)"/>
             </li>
             <li>
                  <input v-model="value2" type="number" :focus="current === 2 ? true : false"  maxlength='1' @input="inputValueChange($event,2)"/>
             </li>
             <li>
                  <input v-model="value3"  type="number" :focus="current === 3 ? true : false"  maxlength='1' @input="inputValueChange($event,3)"/>
             </li>
             <li>
                  <input v-model="value4" type="number" :focus="current === 4 ? true : false"  maxlength='1' @input="inputValueChange($event,4)"/>
             </li>
             <li>
                  <input v-model="value5"  type="number" :focus="current === 5 ? true : false"  maxlength='1' @input="inputValueChange($event,5)"/>
             </li>
         </ul>
      </view>

    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      current: 0,
      value: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: ''
    }
  },
  watch: {
    value (a) {
      if (a.length === 1) {
        this.current = 1
      }
    },
    value1 (a) {
      if (a.length === 1) {
        this.current = 2
      }
    },
    value2 (a) {
      if (a.length === 1) {
        this.current = 3
      }
    },
    value3 (a) {
      if (a.length === 1) {
        this.current = 4
      }
    },
    value4 (a) {
      if (a.length === 1) {
        this.current = 5
      }
    }
  },
  methods: {
    inputValueChange (e, n) {
      if (n === 5) {
        if (e.target.value.length === 0) {
          this.current = 4
          return
        }
      }
      if (n === 4) {
        if (e.target.value.length === 0) {
          this.current = 3
          return
        }
      }
      if (n === 3) {
        if (e.target.value.length === 0) {
          this.current = 2
          return
        }
      }
      if (n === 2) {
        if (e.target.value.length === 0) {
          this.current = 1
          return
        }
      }
      if (n === 1) {
        if (e.target.value.length === 0) {
          this.current = 0
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.authentication{
width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  .main{
      width: 552rpx;
      height: 340rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-top: 140rpx;
      .top{
        .title{
          font-size:40rpx;
          font-family:PingFang SC;
          font-weight:bold;
          color:rgba(51,51,51,1);
          text-align: center;
          margin-bottom: 54rpx;
        }
        .desc{
            font-size:32rpx;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(51,51,51,1);
        }
      }
      .bom{
      width: 552rpx;
        .iul{
           width: 552rpx;
          height: 93rpx;
          display: flex;
          padding: 0;
          border: 1rpx solid #e7e7e7;
          li{
            list-style: none;
            width: 93rpx;
            height: 93rpx;
            border-right: 1rpx solid  #e7e7e7;
            input{
              width: 100%;
              height: 100%;
              display: block;
              text-align: center;
            }
          }
          li:nth-child(6)
          {
              border: none;
          }
        }
      }
  }
}
</style>
