<template>
  <view class="mine-info">
    <view class="cell-wrap p-lr-30 p-tb-20">
      <min-cell :card="false">
        <min-cell-item
          :img="userInfo.head_img"
          tail="头像"
          imgSize="sm"
          :border="true"
          @eventParent="changeHeadImg"
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
      <min-cell :card="false">
        <min-cell-item
          title="实名认证" :tail="userInfo.is_certify === 1 ? '已认证':'未认证'"
          :border="true" arrow
          tailType="red"
           @eventParent="toFace"
        ></min-cell-item>
        <min-cell-item
          title="提现银行卡"
          :isWidth="false"
          :border="true" arrow
          :tail="userInfo.bank_card_name ? userInfo.bank_card_name+`(${lastString})` : '未绑定'"
          @eventParent="payMethods(userInfo.bank_card_name)"
        ></min-cell-item>
        <min-cell-item
          title="提现密码"
          :border="false" arrow
          :tail="userInfo.is_cash_pwd ? '已设置':'未设置'"
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
  name: 'redmine-info',
  navigate: ['navigateTo','redirectTo'],
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
      phone: '',
      lastString:''
    }
  },
  onLoad () {
    // this.phone = this.$store.state.user.userInfo.mobile
  },
  mounted () {
    this.$minApi.getUserInfo().then(res => {
      console.log(res)
      this.userInfo = res
      this.userInfo.birthday =  this.userInfo.birthday.split('').splice(0,11).join('')
      this.getCardLast(this.userInfo.bank_card_num)

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
   changeHeadImg(){
      uni.chooseImage({
          count: 1, //默认9
          success: (chooseImageRes) => {
              const tempFilePaths = chooseImageRes.tempFilePaths;
              uni.uploadFile({
                  url: 'http://api.app-store.dev.yeleonline.com/api/5ebdf23feeba7',
                  filePath: tempFilePaths[0],
                  name: 'file',
                  header:{
                      "access-token" : 'HPkSFqbVhWpCRxVRpOTkyEubusFxBEEd',
                      "api-auth": this.$store.state.user.userInfo.apiAuth
                  },
                  success: (uploadFileRes) => {
                      this.$showToast(JSON.parse(uploadFileRes.data).msg)
                       this.userInfo.head_img =JSON.parse(uploadFileRes.data).data[0].http_dir
                      this.setUserInfo()
                  }
              });
          }
      });
    },
    // 修改个人资料
    setUserInfo(){
        let data = {
          head_img:this.userInfo.head_img,
          sex:this.index,
          nation:this.minzu[ this.index1],
          birthday: new Date(this.date).getTime()/1000
        }
        // uoDateuserInfo  API
        this.$minApi.setPersonInfo(data).then(res=>{
          this.$showToast('重新登录后，修改生效')
        })
    },
    bindPickerChange1 (e) {
      this.index1 = e.target.value
         this.setUserInfo()
    },
    bindPickerChange: function (e) {
      this.index = e.target.value
         this.setUserInfo()
    },
    bindPickerChange2: function (e) {
      this.date = e.target.value.replace(/-/g, '/')
         this.setUserInfo()
    },
    // 获取银行卡后四位
    getCardLast(bank_card_num){
      let card = [...bank_card_num]
      let a = [4,3,2,1]
      a.forEach(item => {
          this.lastString+= card[card.length-item]
      })
    },
    setPhone () {
      // this.$minRouter.push({
      //   name: 'modify-mobile',
      //   params: { mobile: this.userInfo.mobile }
      // })
    },
    toFace () {
      // verify-name
      this.$minRouter.push({
        name: 'verify-name',
        params: { id_card: this.userInfo.id_card, is_certify: this.userInfo.is_certify, name: this.userInfo.user_name, phone: this.userInfo.mobile }
      })
    },
    // payMethods drawing-way
    payMethods (item) {
      this.$minRouter.push({
        name: 'drawing-way',
        params:{card_name:item,card:this.lastString}
      })
    },
    toSetPsd () {
      this.$minRouter.push({
        name: 'redset-cardpsd',
        type:'redirectTo',
        params:{phone:this.userInfo.mobile}
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
