<template>
  <view>
    <button v-for="(item, index) in pages" :key="index" @click="link(item.path)">{{item.style.navigationBarTitleText || '未设标题'}}</button>
  </view>
</template>

<script>

export default {
  data () {
    return {
      count: 0,
      pages: [
        {
          path: 'pages/components-doc/index',
          style: {
            navigationBarTitleText: '路由页面'
          }
        },
        {
          path: 'pages/pay-order/index',
          style: {
            navigationBarTitleText: '支付订单'
          }
        },
        {
          path: 'pages/order-detail/index',
          style: {
            navigationBarTitleText: '订单详情'
          }
        },
        {
          path: 'pages/storing-liquor-detail/index',
          style: {
            navigationBarTitleText: '存酒详情'
          }
        },
        {
          path: 'pages/pickup-details/index',
          style: {
            navigationBarTitleText: '取酒详情'
          }
        },
        {
          path: 'pages/statistics-page/index',
          style: {
            navigationBarTitleText: '数据统计'
          }
        },
        {
          path: 'pages/product-sales/index',
          style: {

            navigationBarTitleText: '单品销售排行'

          }
        },
        {
          path: 'pages/confiscated-wine/index',
          style: {
            navigationBarTitleText: '充公酒'
          }
        },
        {
          path: 'pages/my-downline/index',
          style: {
            navigationBarTitleText: '我的下线'
          }
        },
        {
          path: 'pages/lnvitation-offline/index',
          style: {
            navigationBarTitleText: '邀请下线'
          }
        },
        {
          path: 'pages/invitation-record/index',
          style: {
            navigationBarTitleText: '邀请记录'
          }
        },
        {
          path: 'pages/forfeiture-record/index',
          style: {
            navigationBarTitleText: '充公记录'
          }
        },
        // {
        //   path: 'pages/confwine-details/index',
        //   style: {
        //     navigationBarTitleText: '充公酒详情'
        //   }
        // },
        {
          path: 'pages/placean-order/index',
          style: {
            navigationBarTitleText: '下单'
          }
        },
        {
          path: 'pages/order-entry/index',
          style: {
            navigationBarTitleText: '下单赠送入口'
          }
        },
        {
          path: 'pages/product-details/index',
          style: {
            navigationBarTitleText: '商品详情'
          }
        },
        {
          path: 'pages/package-details/index',
          style: {
            navigationBarTitleText: '套餐详情'
          }
        },
        {
          path: 'pages/packages-detail/index',
          style: {
            navigationBarTitleText: '套餐详情2级'
          }
        },
        {
          path: 'pages/presentation-records/index',
          style: {
            navigationBarTitleText: '赠送记录'
          }
        },
        {
          path: 'pages/give-away/index',
          style: {
            navigationBarTitleText: '赠送列表'
          }
        },
        {
          path: 'pages/appointment-record/index',
          style: {
            navigationBarTitleText: '预约记录'
          }
        },
        {
          path: 'pages/order-record/index',
          style: {
            navigationBarTitleText: '订单记录'
          }
        },
        {
          path: 'pages/desk-bill/index',
          style: {
            navigationBarTitleText: '台位账单'
          }
        },
        {
          path: 'pages/bill-settlement/index',
          style: {
            navigationBarTitleText: '账单结算'
          }
        },
        {
          path: 'pages/change-platform/index',
          style: {
            navigationBarTitleText: '转台'
          }
        },
        {
          path: 'pages/save-wine/index',
          style: {
            navigationBarTitleText: '选择要存的酒'
          }
        },
        {
          path: 'pages/fetch-record/index',
          style: {
            navigationBarTitleText: '取酒记录'
          }
        },
        {
          path: 'pages/wine-record/index',
          style: {
            navigationBarTitleText: '存酒记录'
          }
        },
        {
          path: 'pages/fetch-liquor/index',
          style: {
            navigationBarTitleText: '取酒'
          }
        },
        {
          path: 'pages/electronic-menu/index',
          style: {
            navigationBarTitleText: '电子菜单'
          }
        },
        {
          path: 'pages/platform-admin/index',
          style: {
            navigationBarTitleText: '桌台管理'
          }
        },
        {
          path: 'pages/my-income/index',
          style: {
            navigationBarTitleText: '我的收入'
          }
        },
        {
          path: 'pages/salary-breakdown/index',
          style: {
            navigationBarTitleText: '工资明细'
          }
        },
        {
          path: 'pages/salary-details/index',
          style: {
            navigationBarTitleText: '工资详情'
          }
        },
        {
          path: 'pages/withdrawals-record/index',
          style: {
            navigationBarTitleText: '提现记录'
          }
        },
        {
          path: 'pages/withdrawals-d/index',
          style: {
            navigationBarTitleText: '提现详情'
          }
        },
        {
          path: 'pages/withdrawal-success/index',
          style: {
            navigationBarTitleText: '提现成功'
          }
        },
        {
          path: 'pages/release-record/index',
          style: {
            navigationBarTitleText: '发放记录'
          }
        },
        {
          path: 'pages/release-details/index',
          style: {
            navigationBarTitleText: '发放详情'
          }
        },
        {
          path: 'pages/width-draw/index',
          style: {
            navigationBarTitleText: '提现'
          }
        },
        {
          path: 'pages/commission-details/index',
          style: {
            navigationBarTitleText: '提成明细'
          }
        },
        {
          path: 'pages/commission-deils/index',
          style: {
            navigationBarTitleText: '提成详情'
          }
        },
        {
          path: 'pages/order-make/test',
          style: {
            navigationBarTitleText: '测试'
          }
        },
        {
          path: 'pages/order-list/index',
          style: {
            navigationBarTitleText: '订单列表'
          }
        },
        {
          path: 'pages/platform-detail/index',
          style: {
            navigationBarTitleText: '台详情'
          }
        },
        {
          path: 'pages/platform-history/index',
          style: {
            navigationBarTitleText: '台位历史'
          }
        },
        {
          path: 'pages/confirm-order/index',
          style: {
            navigationBarTitleText: '确认订单'
          }
        },
        {
          path: 'pages/apply-open/index',
          style: {
            navigationBarTitleText: '申请开台'
          }
        },
        {
          path: 'pages/reservation-date/index',
          style: {
            navigationBarTitleText: '预约日期'
          }
        },
        {
          path: 'pages/reservation-success/index',
          style: {
            navigationBarTitleText: '订台成功'
          }
        },
        {
          path: 'pages/liquor-code/index',
          style: {
            navigationBarTitleText: '验证码取酒'
          }
        },
        {
          path: 'pages/stage-make/index',
          style: {
            navigationBarTitleText: '预约开台'
          }
        },
        {
          path: 'pages/add-userinfo/index',
          style: {
            navigationBarTitleText: '填写客户信息'
          }
        },
        {
          path: 'pages/order-make/index',
          style: {
            navigationBarTitleText: '预约'
          }
        },
        {
          path: 'pages/start-stage/index',
          style: {
            navigationBarTitleText: '开台'
          }
        },
        {
          path: 'pages/submit-success/index',
          style: {
            navigationBarTitleText: '提交成功'
          }
        },
        {
          path: 'pages/open-success/index',
          style: {
            navigationBarTitleText: '开台成功'
          }
        },
        {
          path: 'pages/drawing-way/index',
          style: {
            navigationBarTitleText: '提现方式'
          }
        },
        {
          path: 'pages/verify-name/index',
          style: {
            navigationBarTitleText: '实名认证'
          }
        },
        {
          path: 'pages/select-customers/index',
          style: {
            navigationBarTitleText: '客户选择'
          }
        },
        {
          path: 'pages/mine-info/index',
          style: {
            navigationBarTitleText: '个人资料'
          }
        },
        {
          path: 'pages/switch-stores/index',
          style: {
            navigationBarTitleText: '切换门店'
          }
        },
        {
          path: 'pages/apply-stores/index',
          style: {
            navigationBarTitleText: '申请加入其它门店',
            titleNView: {
              buttons: [
                {
                  text: '申请记录',
                  fontSize: '28rpx',
                  width: '200rpx'
                }
              ]
            }
          }
        },
        {
          path: 'pages/apply-log/index',
          style: {
            navigationBarTitleText: '申请记录',
            enablePullDownRefresh: true,
            onReachBottomDistance: 50,
            backgroundTextStyle: 'dark'
          }
        },
        {
          path: 'pages/bind-mobile/index',
          style: {
            navigationBarTitleText: '绑定手机号码'
          }
        },
        {
          path: 'pages/modify-mobile/index',
          style: {
            navigationBarTitleText: '修改手机号码'
          }
        },
        {
          path: 'pages/index/index',
          style: {
            'app-plus': { titleNView: false }
          }
        },
        {
          path: 'pages/login/index',
          style: {
            'app-plus': { titleNView: false }
          }
        },
        {
          path: 'pages/home/index',
          style: {
            navigationBarTitleText: 'home'
          }
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
    link (path) {
      uni.navigateTo({
        url: '/' + path
      })
    }
  }
}

</script>

<style lang="scss" scoped>
</style>
