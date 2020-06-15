<template>
  <view class="add-userinfo p-lr-30 p-tb-20">

          <min-cell :card="false" >
            <view class="f30 p-tb-30" >营销信息 {{$parseURL().type === 0 ? '（自来客）' : ''}}</view>
            <min-cell-item
              :img="data.seil.head_img ? data.seil.head_img : 'http://img3.imgtn.bdimg.com/it/u=2641512116,3445406201&fm=26&gp=0.jpg' "
              :title="data.seil.sales_name + ' | '+  data.seil.position_name"
              :label="data.seil.mobile"
              :border="false"
              v-if="$parseURL().type === 0 ? false : true"
            ></min-cell-item>

          </min-cell>

    <view class="m-tb-20"></view>
    <min-cell :card="false" class="mid-view">
      <min-desc-input desc="客户姓名" value="刘轻丽" v-model="isName" placeholder="请输入客户姓名"></min-desc-input>
      <min-desc-input desc="联系电话" :maxlength="11" v-model="isPhone" placeholder="请输入联系电话"></min-desc-input>
      <min-switch desc="是否当天生日" v-model="isShengri"></min-switch>
    </min-cell>
    <view class="m-tb-20"></view>
    <min-remarks v-model='value'></min-remarks>
    <view class="btn">
      <min-btn :long="true" @click="next">下一步</min-btn>
    </view>
  </view>
</template>

<script>
export default {
  name: 'redadd-userinfo',
  navigate: ['navigateTo',"redirectTo"],
  data () {
    return {
      isShengri: true,
      isPhone: '',
      isName: '',
      value: '',
      data: {}
    }
  },
  onLoad () {
    console.log(this.$parseURL())
    this.data = this.$parseURL()
  },
  mounted () {
    // console.log(this.$route.params.name)

  },
  watch: {
    isPhone (a) {
      // console.log(a)
    },
    isName (a) {
      // console.log(a)
    }
  },
  methods: {
    next () {
      // console.log('电话：', this.isPhone)
      const obj = {}
      // 自来客 2 - 空闲,3 - 已预约
      if (this.data.type === 0) {
        obj.sales_uid = 0
        obj.booking_id = ''
      } else {
        obj.sales_uid = this.$parseURL().seil.id
        obj.booking_id = ''
      }
      this.$minApi.startOrder({
        desk_id: this.data.msg.desk_id,
        booking_id: this.$parseURL().msg.status === 3 ? '' : '',
        sales_uid: this.data.type === 1 ? this.$parseURL().seil.id : '',
        client_name: this.isName,
        client_mobile: this.isPhone,
        is_birthday: this.isShengri ? 1 : 0,
        remark: this.value
      }).then(res => {
        console.log(res)

        this.$showToast('开台成功')
        // 跳转下单
        setTimeout(() => {
          this.$minRouter.push({
            name: 'redplacean-order',
            type:"redirectTo",
            params: { desk_id: res.opening.desk_id, minim_charge: res.opening.minimum_consume }
          })
        }, 2000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-userinfo {
  .btn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .oinput1 {
    text-align: right;
  }
}
</style>
