<template>
  <view class="mine-info">
    <view class="cell-wrap p-lr-30 p-tb-20">
      <min-cell>
        <min-cell-item
          :img="userInfo.head_img"
          :title="userInfo.store_name"
          imgSize="sm"
          :border="true"
          arrow
        ></min-cell-item>
        <min-cell-item
          title="名字" :tail="userInfo.user_name"
          :border="true" arrow
        ></min-cell-item>
        <picker @change="bindPickerChange" :value="index" :range="sex">
        <min-cell-item
          title="性别"  :tail="sex[index]"
          :border="true" arrow
        ></min-cell-item>
        </picker>
        <picker @change="bindPickerChange1" :value="index1" :range="minzu">
          <min-cell-item
            title="民族" :tail="minzu[index1]"
            :border="true" arrow
          ></min-cell-item>
        </picker>
        <picker mode="date"  @change="bindPickerChange2" >
          <min-cell-item
            title="出生日期" :tail="date"
            :border="true" arrow
          ></min-cell-item>
        </picker>
        <min-cell-item
          title="手机" :tail="$minCommon.hideTel(userInfo.mobile ? userInfo.mobile : '15888888888')"
          :border="false" arrow
          @eventParent="setPhone"
        ></min-cell-item>
      </min-cell>
      <view class="m-top-20"></view>
      <min-cell>
        <min-cell-item
          title="实名认证" :tail="userInfo.is_certify === 1 ? '已认证':'未认证'"
          :border="true" arrow
          tailType="red"
           @eventParent="toFace"
        ></min-cell-item>
        <min-cell-item
          title="提现银行卡"
          :border="true" arrow
          tail="招商银行(0415)"
          @eventParent="payMethods"
        ></min-cell-item>
        <min-cell-item
          title="提现密码"
          :border="true" arrow
          tail="未设定"
          @eventParent="toSetPsd"
        ></min-cell-item>
      </min-cell>
    </view>
    <view class="m-top-30 p-lr-30">
      <min-btn type="white" @click="quit">退出登录</min-btn>
    </view>
    <min-modal ref="show"></min-modal>
  </view>
</template>

<script>
export default {
  name: 'mine-info',
  navigate: ['navigateTo'],
  data () {
    return {
      minzu: ['汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '土家族', '彝族', '蒙古族', '藏族', '布依族', '侗族', '瑶族', '朝鲜族', '白族', '哈尼族',
        '哈萨克族', '黎族', '傣族', '畲族', '傈僳族', '仡佬族', '东乡族', '高山族', '拉祜族', '水族', '佤族', '纳西族', '羌族', '土族', '仫佬族', '锡伯族',
        '柯尔克孜族', '达斡尔族', '景颇族', '毛南族', '撒拉族', '布朗族', '塔吉克族', '阿昌族', '普米族', '鄂温克族', '怒族', '京族', '基诺族', '德昂族', '保安族',
        '俄罗斯族', '裕固族', '乌孜别克族', '门巴族', '鄂伦春族', '独龙族', '塔塔尔族', '赫哲族', '珞巴族'],
      sex: ['不限', '男', '女'],
      index: 0,
      index1: 0,
      date: '2020/3/20',
      userInfo: {},
      phone: ''
    }
  },
  onLoad () {
    // this.phone = this.$store.state.user.userInfo.mobile
  },
  mounted () {
    this.$minApi.getUserInfo().then(res => {
      console.log(res)
      this.userInfo = res
      this.userInfo.birthday = this.userInfo.birthday.replace(/00:00:00/g, '')
      this.minzu.map((item, index) => {
        if (item === this.userInfo.nation) {
          this.index1 = index
        }
      })
      this.sex.map((item, index) => {
        this.index = this.userInfo.sex
      })
      this.date = this.userInfo.birthday.replace(/-/g, '/')
    })
  },
  methods: {
    bindPickerChange1 (e) {
      this.index1 = e.target.value
    },
    bindPickerChange: function (e) {
      this.index = e.target.value
    },
    bindPickerChange2: function (e) {
      this.date = e.target.value.replace(/-/g, '/')
    },
    setPhone () {
      this.$minRouter.push({
        name: 'modify-mobile',
        params: { mobile: this.userInfo.mobile }
      })
    },
    toFace () {
      // verify-name
      this.$minRouter.push({
        name: 'verify-name',
        params: { id_card: this.userInfo.id_card, is_certify: this.userInfo.is_certify, name: this.userInfo.user_name, phone: this.userInfo.mobile }
      })
    },
    // payMethods drawing-way
    payMethods () {
      this.$minRouter.push({
        name: 'drawing-way'
      })
    },
    toSetPsd () {
      this.$minRouter.push({
        name: 'set-cardpsd'
      })
    },
    quit () {
      this.$refs.show.handleShow({
        title: '确认退出？',
        success: function (res) {
          if (res.id === 1) {
            uni.removeStorage({
              key: 'minvuexcache',
              success: function (res) {
                console.log('success')
              }
            })
            uni.reLaunch({
              url: '../login/index'
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
