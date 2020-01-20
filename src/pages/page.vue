<template>
  <view>
    <min-checkbox-group/>
    <button v-for="(item, index) in pages" :key="index" @click="link(item.path)">{{item.style.navigationBarTitleText || '未设标题'}}</button>
  </view>
</template>

<script>
export default {
  data () {
    return {
      value: ['1'],
      pages: [
        {
          path: 'pages/components-doc/index',
          style: {
            navigationBarTitleText: '路由页面'
          }
        },
        {
          path: 'pages/platform-admin/index',
          style: {
            navigationBarTitleText: '桌台管理'
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
    this.$store.commit('user/setTest', 123)
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

<style>
</style>
