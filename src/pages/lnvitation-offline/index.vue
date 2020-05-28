<template>
  <view class="lnvitation-offline p-lr-30 p-tb-20">
    <min-search bgcolor="#EEEEEE" v-model="key" placeholder="请输入营销姓名/手机号搜索"></min-search>
    <min-cell class="m-tb-20" :card="false">
      <view class="title min-border-bottom">可邀请的下线</view>

     <view class="items" :key="i"  v-for="(n,i) in getValue">
         <min-checkbox v-model="n.f"></min-checkbox>
         <view class="test">
                <min-describe
                :leftIconValue="n.head_img"
                  :leftTxtB="n.mobile"
                  :leftTxt="n.sales_name"
                  :rightTxtT="n.position_name"
                  :rightTxtB="n.rightTxtB"
                  :leftIcon="true"
                  :leftTxtTwo="true"
                   @chincesku="test(i)"
                >

                </min-describe>
         </view>

      </view>

    </min-cell>
    <view style="height:100rpx"></view>
    <view class="btn" @click="toPost">提交申请</view>
    <min-404 v-if="isNone" pTop="200rpx"></min-404>
  </view>
</template>
<script>
export default {
  name: 'lnvitation-offline',
  navigate: ['navigateTo'],
  data () {
    return {
      list: [],
      key: '',
      isNone: false
    }
  },
  computed: {
    getValue () {
      let data = []
      if (this.key) {
        this.list.filter(item => {
          if (item.sales_name.includes(this.key) || item.mobile.includes(this.key)) {
            data.push(item)
          }
        })
      } else {
        data = this.list
      }
      return data
    }
  },
  watch: {
    getValue (a) {
      if (a.length === 0) {
        this.isNone = true
      }
    }
  },
  mounted () {
    this.$minApi
      .getPleaseDownLineList({
        page: 1,
        limitL: 10
      })
      .then(res => {
        this.list = res.list
        this.list.map(item => {
          this.$set(item, 'f', false)
        })
      })
  },
  methods: {
    toPost () {
      return this.$showToast('正在开发中')
    },
    test (n) {
      this.list[n].f = !this.list[n].f
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  height: 88rpx;
  line-height: 88rpx;
}
.items{
     width: 100%;
      height: auto;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .test{
      width: 89%;
      }
}
.btn {
  width: 100%;
  height: 98rpx;
  background: rgba(255, 224, 1, 1);
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  line-height: 98rpx;
}
</style>
