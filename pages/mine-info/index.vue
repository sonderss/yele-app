<template>
<view class="mine-info" @touchstart="start" @touchmove="move" @touchend="end">
    <scroll-view scroll-y :style="{
        transition: top === 0 ? 'transform 300ms' : '',
        transform: 'translateY(' + top + 'rpx' + ')'
      }">
        <view class="cell-wrap p-lr-30 p-tb-20">
            <min-cell :card="false">
                <min-cell-item :img="userInfo.head_img ? userInfo.head_img : '/static/images/head.png'" tail="头像" imgSize="sm" :border="true" @eventParent="changeHeadImg" arrow></min-cell-item>
                <min-cell-item title="名字" :tail="userInfo.user_name" :border="true"></min-cell-item>
                <picker @change="bindPickerChange" :value="index" :range="sex">
                    <min-cell-item title="性别" :tail="sex[index]" :border="true" arrow></min-cell-item>
                </picker>
                <picker @change="bindPickerChange1" :value="index1" :range="minzu">
                    <min-cell-item title="民族" :tail="minzu[index1]" :border="true" arrow></min-cell-item>
                </picker>
                <!-- <picker mode='multiSelector' :value="index2" :range="dates" @change="bindPickerChange2">
                    <min-cell-item title="出生日期" :tail="date" :border="true" arrow></min-cell-item>
                </picker> -->
                <min-cell-item title="出生日期" @eventParent="bindPickerChange3" :tail="date" :border="true" arrow></min-cell-item>
                <min-cell-item title="手机" :tail="$minCommon.hideTel(userInfo.mobile ? userInfo.mobile : '暂无')" :border="false" @eventParent="setPhone"></min-cell-item>
            </min-cell>
            <view class="m-top-20"></view>
            <min-cell :card="false">
                <min-cell-item title="实名认证" :tailcolor="userInfo.is_certify === 1 ? false: true " :tail="userInfo.is_certify === 1 ? '已认证':'未认证'" :border="true" arrow tailType="red" @eventParent="toFace"></min-cell-item>
                <min-cell-item title="提现银行卡" :tailcolor="userInfo.bank_card_name ?  false : true " tailType="red" :isWidth="false" :border="true" arrow :tail="userInfo.bank_card_name ? userInfo.bank_card_name+`(${lastString})` : '未绑定'" @eventParent="payMethods(userInfo.bank_card_num)"></min-cell-item>
                <min-cell-item title="提现密码" :tailcolor="userInfo.is_cash_pwd ? false  : true" tailType="red" :border="false" arrow :tail="userInfo.is_cash_pwd ? '已设置':'未设置'" @eventParent="toSetPsd"></min-cell-item>
            </min-cell>
        </view>
        <view class="cell-wrap p-lr-30">
            <min-cell :card="false">
                <min-cell-item title="版本" :border="false" :isWidth="false" :tail="version ? `v ${version}` : 'H5无法获取' "></min-cell-item>
            </min-cell>
        </view>

        <view class="m-top-30 p-lr-30">
            <min-btn type="white" @click="quit">退出登录</min-btn>
        </view>
    </scroll-view>
    <view style="height:200rpx"></view>
    <min-modal ref="show"></min-modal>
    <min-popup heightSize="500" :show="bis3" @close='closse'>
        <min-p :isValue="date" :startTime="[1920,1,1]" :endTime="new Date().getFullYear()" @cancel="cancels" @sure="sures" />
    </min-popup>

</view>
</template>

<script>
export default {
    name: "redmine-info",
    navigate: ["navigateTo", "redirectTo"],
    data() {
        return {
            minzu: [
                "汉族",
                "壮族",
                "满族",
                "回族",
                "苗族",
                "维吾尔族",
                "土家族",
                "彝族",
                "蒙古族",
                "藏族",
                "布依族",
                "侗族",
                "瑶族",
                "朝鲜族",
                "白族",
                "哈尼族",
                "哈萨克族",
                "黎族",
                "傣族",
                "畲族",
                "傈僳族",
                "仡佬族",
                "东乡族",
                "高山族",
                "拉祜族",
                "水族",
                "佤族",
                "纳西族",
                "羌族",
                "土族",
                "仫佬族",
                "锡伯族",
                "柯尔克孜族",
                "达斡尔族",
                "景颇族",
                "毛南族",
                "撒拉族",
                "布朗族",
                "塔吉克族",
                "阿昌族",
                "普米族",
                "鄂温克族",
                "怒族",
                "京族",
                "基诺族",
                "德昂族",
                "保安族",
                "俄罗斯族",
                "裕固族",
                "乌孜别克族",
                "门巴族",
                "鄂伦春族",
                "独龙族",
                "塔塔尔族",
                "赫哲族",
                "珞巴族",
            ],
            sex: ["不限", "男", "女"],
            index: 0,
            index1: 0,
            dates: [
                [],
                [],
                [],
            ],
            dayLength: 0,
            date: "2020/3/20",
            userInfo: {},
            phone: "",
            lastString: "",
            version: "",
            lastY: '',
            top: '',
            bis3: false
        };
    },
    onLoad() {
        const time = new Date()
        const year = time.getFullYear()
        const month = time.getMonth() + 1
        this.getDaysInOneMonth(year, month)
        this.getYears()
        this.getMonth()
        this.getDays()
        // #ifdef APP-PLUS
        // 获取本地应用资源版本号
        plus.runtime.getProperty(plus.runtime.appid, (inf) => {
            this.version = inf.version;
            console.log(inf);
        });
        // #endif
    },
    onBackPress() {
        const pages = getCurrentPages(); //当前页
        const beforePage = pages[pages.length - 2]; //上个页面
        const page = pages[pages.length - 1]; //页面)

        console.log(pages, beforePage.route, page.route);
        if (beforePage.route === page.route) {
            //  uni.navigateBack({
            //       delta: 2
            //   });
            //   return true
        }
        // uni.navigateBack({
        //     delta: 2
        // });
    },
    onShow() {
        if (!this.$store.state.status.isGetUser) {
            this.userInfo = this.$store.state.user.userInfos;
            console.log("不获取", this.userInfo);
            this.userInfo.birthday = this.userInfo.birthday
                .split("")
                .splice(0, 11)
                .join("");
            if (this.userInfo.bank_card_num) {
                this.getCardLast(this.userInfo.bank_card_num);
            }
            this.minzu.map((item, index) => {
                if (item === this.userInfo.nation) {
                    this.index1 = index;
                }
            });
            this.sex.map((item, index) => {
                this.index = this.userInfo.sex;
            });
            this.date = this.userInfo.birthday.replace(/-/g, "/");
            return;
        }
        this.$minApi.getUserInfo().then((res) => {
            console.log(res);
            this.userInfo = res;
            this.$store.dispatch('user/setUserInfos', res)
            this.userInfo.birthday = this.userInfo.birthday
                .split("")
                .splice(0, 11)
                .join("");

            if (this.userInfo.bank_card_num) {
                this.getCardLast(this.userInfo.bank_card_num);
            }
            this.minzu.map((item, index) => {
                if (item === this.userInfo.nation) {
                    this.index1 = index;
                }
            });
            this.sex.map((item, index) => {
                this.index = this.userInfo.sex;
            });
            this.date = this.userInfo.birthday.replace(/-/g, "/");
            this.$store.dispatch("status/setisGetUser", false);
        });
    },
    methods: {
        changeHeadImg() {
            uni.chooseImage({
                count: 1, //默认9
                success: (chooseImageRes) => {
                    const tempFilePaths = chooseImageRes.tempFilePaths;
                    uni.uploadFile({
                        url: process.env.VUE_APP_UPLOADFILE_URL,
                        filePath: tempFilePaths[0],
                        name: "file",
                        header: {
                            "access-token": "HPkSFqbVhWpCRxVRpOTkyEubusFxBEEd",
                            "api-auth": this.$store.state.user.userInfo.apiAuth,
                        },
                        success: (uploadFileRes) => {
                            this.$showToast(JSON.parse(uploadFileRes.data).msg);
                            this.userInfo.head_img = JSON.parse(
                                uploadFileRes.data
                            ).data[0].http_dir;
                            this.$store.dispatch('status/setisReloadUserInfo', true)
                            this.setUserInfo();
                        },
                    });
                },
            });
        },
        // 修改个人资料
        setUserInfo() {
            let data = {
                head_img: this.userInfo.head_img,
                sex: this.index,
                nation: this.minzu[this.index1],
                birthday: new Date(this.date).getTime() / 1000,
            };
            console.log(data);
            // uoDateuserInfo  API
            this.$minApi.setPersonInfo(data).then((res) => {
                console.log(res);
                this.$showToast("修改成功");
                this.$store.dispatch("user/setUserInfoAuth", res.apiAuth);
                this.$store.dispatch("status/setisGetUser", true);
            });
        },
        bindPickerChange1(e) {
            this.index1 = e.target.value;
            this.setUserInfo();
        },
        bindPickerChange: function (e) {
            this.index = e.target.value;
            this.setUserInfo();
        },
        bindPickerChange2: function (e) {
            console.log(e)
            this.date = e.target.value.replace(/-/g, "/");
            this.setUserInfo();
        },
        bindPickerChange3: function (e) {
            this.bis3 = true
        },
        // 获取银行卡后四位
        getCardLast(bank_card_num) {
            if (this.lastString.length !== 4) {
                let card = [...bank_card_num];
                let a = [4, 3, 2, 1];
                a.map((item) => {
                    this.lastString += card[card.length - item];
                });
            }
        },
        setPhone() {
            // this.$minRouter.push({
            //   name: 'modify-mobile',
            //   params: { mobile: this.userInfo.mobile }
            // })
        },
        toFace() {
            // verify-name
            if (this.userInfo.is_certify === 1) {
                this.$minRouter.push({
                    name: "verify-name",
                    params: {
                        id_card: this.userInfo.id_card,
                        is_certify: this.userInfo.is_certify,
                        name: this.userInfo.user_name,
                        phone: this.userInfo.mobile,
                    },
                });
                return
            }
            if (this.userInfo.is_bind_mobile) {
                // 已绑定但未实名
                this.$minRouter.push({
                    name: "verify-name",
                    params: {
                        id_card: this.userInfo.id_card,
                        is_certify: this.userInfo.is_certify,
                        name: this.userInfo.user_name,
                        phone: this.userInfo.mobile,
                    },
                });
                return
            }
            this.$minRouter.push({
                name: "bind-mobile",
                params: {
                    id_card: this.userInfo.id_card,
                    is_certify: this.userInfo.is_certify,
                    name: this.userInfo.user_name,
                    phone: this.userInfo.mobile,
                },
            });

        },
        // payMethods drawing-way
        payMethods(item) {
            if (this.userInfo.is_certify !== 1) return this.$showToast('请先实名认证')
            this.$minRouter.push({
                name: "drawing-way",
                params: {
                    card_name: item,
                    card: this.lastString
                },
            });
        },
        toSetPsd() {
            this.$minRouter.push({
                name: "set-cardpsd",
                params: {
                    phone: this.userInfo.mobile
                },
            });
        },
        quit() {
            this.$refs.show.handleShow({
                title: "确认退出？",
                success: function (res) {
                    if (res.id === 1) {
                        uni.removeStorage({
                            key: "minvuexcache",
                            success: function (res) {
                                console.log("success");
                            },
                        });
                        uni.reLaunch({
                            url: "../login/index",
                        });
                    }
                },
            });
        },
        start(e) {
            this.lastY = e.changedTouches[0].pageY
        },
        move(e) {
            let currentY = e.changedTouches[0].pageY
            if (this.top < currentY - this.lastY) {
                // 像下滚动
                this.top = currentY - this.lastY
            } else {
                // 向上滚动
                this.top = currentY - this.lastY
            }
        },
        end() {
            return (this.top = 0)
        },
        // 获得年份
        getYears() {

            for (let i = 1920; i <= new Date().getFullYear(); i++) {
                this.dates[0].push(i)
            }
        },
        // 获取月份
        getMonth() {
            // const time = new Date()
            for (let i = 1; i <= 12; i++) {
                this.dates[1].push(i)
            }
        },
        getDays() {
            this.days = []
            for (let i = 1; i <= this.dayLength; i++) {
                this.dates[2].push(i)
            }
        },
        // 获取某年某月多少天
        getDaysInOneMonth(year, month) {
            month = parseInt(month, 10)
            var d = new Date(year, month, 0)
            this.dayLength = d.getDate()
            this.getDays()
            return d.getDate()
        },
        cancels(e) {
            this.closse()
        },
        sures(e) {
            this.date = e.a + '/' + e.b + '/' + e.c
            this.setUserInfo();
        },
        closse() {
            this.bis3 = false
        }
    },
};
</script>

<style lang="scss" scoped>
.mine-info {
    width: 100%;
    height: 100vh;
    overflow: auto;
}
</style>
