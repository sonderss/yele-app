<template>
  <view class="myincome p-tb-20 p-lr-30">
    <view class="top-view">
      <view class="t-view">
        <text class="price">可提现金额</text>
        <view class="money">
          <text class="icon">￥</text>
          <text class="tr">{{myMoneylist.can_cash_amount ? myMoneylist.can_cash_amount : 0}}</text>
        </view>
        <text class="btn" @click="widthdraw">提现</text>
      </view>
      <view class="b-view">
        <view class="left-view">
          <text class="f22">冻结金额</text>
          <text class="f28 c">￥{{myMoneylist.all_freeze_amount ? myMoneylist.all_freeze_amount : 0}}</text>
        </view>
        <view class="right-view">
          <text class="f22">待发放金额</text>
          <text class="f28 c">￥{{myMoneylist.await_grant_amount ?  myMoneylist.await_grant_amount  :  0}}</text>
        </view>
      </view>
    </view>
    <view class="btn-view m-top-20" style="  justify-content: space-between;">
      <view class="btn" @click="commissiondetails">
        <image class="m-bottom-10" src="/static/images/ticheng.png" />
        <text>提成明细</text>
      </view>
      <view class="btn" @click="withdrawalsrecord(0)">
        <image class="m-bottom-10" src="/static/images/gongzi.png" />
        <text>收支流水</text>
      </view>
      <view class="btn" @click="withdrawalsrecord(1)">
        <image class="m-bottom-10" src="/static/images/tixian.png" />
        <text>发放记录</text>
      </view>
      <view class="btn" @click="withdrawalsrecord(2)">
        <image class="m-bottom-10" src="/static/images/mon.png" />
        <text>提现记录</text>
      </view>
    </view>
    <view class="btn-view m-bottom-20" style="padding-top:0">
      <view class="btn" @click="withdrawalsrecord(3)">
        <image class="m-bottom-10" src="/static/images/mon.png" />
        <text>转账记录</text>
      </view>
      <view class="btn m-left-25" @click="releaserecord">
        <image class="m-bottom-10" src="/static/images/zhichu.png" />
        <text>冻结记录</text>
      </view>
    </view>

    <view class="jion_view"  >
             <view class="title min-border-bottom">
                <text>我参与的方案（{{myMoneylist.store_name}}）</text>
                <view class="right" @click="showStore">
                  {{store_name}}
                  <image src="/static/images/downarrow24.png" />
                </view>
              </view>
              <view class="method-view min-border-bottom">
                <view class="left">工资方案</view>
                <view class="right">
                  <text>{{ myMoneylist.salary_scheme ? myMoneylist.salary_scheme : '暂无数据'}}</text>
                </view>
              </view>
              <view class="method-view min-border-bottom">
                <view class="left">基础提成</view>
                <view class="right">
                  <text>{{myMoneylist.royalty_template ? myMoneylist.royalty_template : '暂无数据'}}</text>
                </view>
              </view>
              <view class="method-view" v-if="myMoneylist.activity_list.length > 0">
                <view class="left">活动方案</view>
                <view class="right" v-for="(item2,index2) in myMoneylist.activity_list" :key="index2">
                  <text>{{item2.activity_name ? item2.activity_name : '暂无数据'}}</text>
                </view>
              </view>
     
    </view>
    <view class="desc">暂不支付在APP直接查看方案详细信息</view>
    <min-popup :show="show" @close="close">
      <view class="p-lr-20 p-bottom-20 content_pop">
        <view class="top_pop_view min-border-bottom">
          <text class="f26">全部门店</text>
          <text class="f22" @click="close">取消</text>
        </view>
        <view class="main_">
          <view :class="index === 49 ? 'item':' item min-border-bottom'" @click="toChange(item)" v-for="(item,index) in storeList" :key="index">
            <image :src="item.head_img ?  item.head_img : '/static/images/goods.png' " />
            <view class="right_ m-left-20">
              <view>
                <text class="f30" style="color:#333">{{item.store_name}}</text>
                <text v-if="item.store_id === $store.state.user.userInfo.store_id" class="active f20">当前门店</text>
              </view>
              <text class="f26 m-top-10" style="color:#666">可提现金额：￥{{item.can_cash_amount}}</text>
            </view>
          </view>
        </view>
      </view>
    </min-popup>
  </view>
</template>
<script>
export default {
  name: "redmy-income",
  navigate: ["navigateTo", "redirectTo"],
  data() {
    return {
      show: false,
      storeList: [],
      nowStoreId: "",
      myMoneylist:{activity_list:[]},
      store_name:'全部门店'
    };
  },
  mounted() {
    // 当前门店ID
    this.nowStoreId = this.$store.state.user.userInfo.store_id;
    this.$minApi.getStoreList().then(res => {
      // 门店列表  暂时获取门店列表
      console.log(res.list);
      this.storeList = res.list;
    });
    this.getData()
  },
  methods: {
    // 我的收入
    getData(id){
        this.$minApi.getMyMoney({
        store_id: id ? id : this.nowStoreId
          }).then(res =>  {
            console.log(res);
            this.myMoneylist = res
        })
    },
    // 提成明细
    commissiondetails() {
      this.$minRouter.push({
        name: "commission-details"
      });
    },
    // 工资明细
    salary() {
      this.$minRouter.push({
        name: "salary-breakdown"
      });
    },
    // 提现记录
    withdrawalsrecord(n) {
      this.$minRouter.push({
        name: "withdrawals-record",
        params: { type: n }
      });
    },
    // 冻结记录
    releaserecord() {
      this.$minRouter.push({
        name: "release-record"
      });
    },
    // 提现
    widthdraw() {
      this.$minRouter.push({
        name: "redwidth-draw",
        type: "redirectTo"
      });
    },
    close() {
      this.show = false;
    },
    // 展示底部抽屉
    showStore() {
      this.show = true;
    },
    // 切换门店
    toChange(item){
      console.log(item);
      this.store_name = item.store_name
      this.getData(item.store_id)
      this.close()
    }
  }
};
</script>
<style lang="scss" scoped>
.top-view {
  width: 100%;
  height: 481rpx;
  background: #030313;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10rpx;
  overflow: hidden;
  .t-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .price {
      width: auto;
      height: 26rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(204, 204, 204, 1);
      line-height: 26rpx;
      margin-top: 85rpx;
    }
    .money {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 40rpx 0;
      margin-top: 20rpx;
      .tr {
        display: block;
        font-size: 84rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(255, 224, 1, 1);
      }
      .icon {
        display: block;
        font-size: 48rpx;
        color: rgba(255, 224, 1, 1);
      }
    }
    .btn {
      width: 580rpx;
      height: 88rpx;
      background: rgba(255, 224, 1, 1);
      border-radius: 10rpx;
      text-align: center;
      line-height: 88rpx;
      margin-bottom: 20rpx;
    }
  }
  .b-view {
    height: 122rpx;
    background: rgba(55, 52, 69, 1);
    border-radius: 0px 0px 10rpx 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text {
      color: #fff;
      color: rgba(204, 204, 204, 1);
    }
    .c {
      color: #ffe001;
      font-weight: bold;
    }
    .left-view {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .right-view {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
}
.btn-view {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  padding: 20rpx 0;
  image {
    width: 44rpx;
    height: 44rpx;
    display: block;
  }
  .btn {
    width: 157rpx;
    height: 100%;
    border-radius: 10rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text {
      font-size: 26rpx;
    }
  }
}
.jion_view {
  width: 100%;
  height: auto;
  background: #fff;
  padding-left: 33rpx;
  padding-right: 40rpx;
  color: rgba(51, 51, 51, 1);
  text {
    color: rgba(51, 51, 51, 1);
  }
  .title {
    width: 100%;
    height: 98rpx;
    line-height: 98rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
      width: 200rpx;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      image {
        width: 24rpx;
        height: 24rpx;
        padding-left: 10rpx;
      }
    }
  }
  .method-view {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 36rpx 0;
    .left {
      width: 50%;
    }
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;

      text {
        display: block;
        margin-bottom: 20rpx;
      }
    }
  }
}
.desc {
  width: 100%;
  height: 20rpx;
  font-size: 20rpx;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 9rpx;
  padding-left: 30rpx;
}
.view_main {
  width: 100%;
  height: 100%;
  padding: 0 30rpx;
  overflow: auto;
  .li {
    width: 100%;
    height: 138rpx;
  }
  .top-view_ {
    width: 100%;
    height: 84rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.content_pop{
  display: flex;
  flex-direction: column;
  .top_pop_view {
    width: 100%;
    height: 84rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .item {
  width: 100%;
  height: 120rpx;
  margin: 30rpx 0;
  padding-bottom: 30rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  image {
    width: 80rpx;
    height: 80rpx;
  }
  .right_ {
    flex: 1;
    display: flex;
    flex-direction: column;
    .active {
      padding: 2rpx;
      background: #fff100;
      border-radius: 10rpx;
      display: inline-block;
      margin-left: 20rpx;
    }
  }
}
 .main_{
    height:716rpx;
    overflow: auto;
  }
}

</style>
