import Vue from 'vue'
import App from './App'
import MinRouter from './utils/min-router'
import minRouter from './router'
import MinRequest from './utils/min-request'
import minRequest from './api'
import MinCache from './utils/min-cache'
import MinCommon from './utils/min-common'
// import './style/index.scss'
// import './static/font/iconfont.css'
// import './static/font/iconfont.ttf'
import store from './store/index'

// 常用的组件注册全局(编译器问题，只能在main.js全局注册)
import MinAvatar from '@/components/min-avatar'
import MinBtn from '@/components/min-btn'
import MinCell from '@/components/min-cell'
import MinCellItem from '@/components/min-cell-item'
import MinSearch from '@/components/min-search'
import MinModal from '@/components/min-modal'
import MinMessage from '@/components/min-message'
import MinActionShee from '@/components/min-action-sheet'
import MinStepper from '@/components/min-stepper'
import MinGoodsSubmit from '@/components/min-goods-submit'
import MinBadge from '@/components/min-badge'
import MinSidebar from '@/components/min-sidebar'
import MinSearchItem from '@/components/min-sidebar-item'
import MinGoods from '@/components/min-goods'
import MinGoodsItem from '@/components/min-goods-item'
import MinCard from '@/components/min-card'
import MinCheckboxGroup from '@/components/min-checkbox-group'
import MinCheckbox from '@/components/min-checkbox'
import MinRadio from '@/components/min-radio'
import MinPopup from '@/components/min-popup'
import MinSwitch from '@/components/min-switch'
import MinDescInput from '@/components/min-desc-input'
import MinRemarks from '@/components/min-remarks'
import minCollapse from '@/components/min-collapse'
import MinSlider from '@/components/min-slider'
import MinOrderList from '@/components/min-order-list'
import MinShowOrder from '@/components/min-show-order'
import MinGoodsChioce from '@/components/min-goods-chioce'
import MinDescribe from '@/components/min-describe'
import MinNavTab from '@/components/min-navTab'
import Min404 from '@/components/min-404'
import MinPicker from '@/components/min-picker'
import MinIdle from '@/components/status/min-idle'
import MinOrder from '@/components/status/min-order'
import MinBooked from '@/components/status/min-booked'
import MinConfirmed from '@/components/status/min-confirmed'
import MinTerminated from '@/components/status/min-terminated'
import MinOpened from '@/components/status/min-opened'
import MinTaichung from '@/components/status/min-taichung'
import MinDrawer from '@/components/min-drawer'
import MinSteps from '@/components/min-steps'
import MinDataShow from '@/components/min-data-show'
import MinDucharts from '@/components/min-ducharts'
import MinTable from '@/components/t-table/table.vue'
import MinPay from '@/components/min-pay.vue'
import MinPullDown from '@/components/min-pulldown.vue'
import MinRefush from '@/components/min-refush.vue'
Vue.component('min-avatar', MinAvatar)
Vue.component('min-btn', MinBtn)
Vue.component('min-cell', MinCell)
Vue.component('min-cell-item', MinCellItem)
Vue.component('min-search', MinSearch)
Vue.component('min-modal', MinModal)
Vue.component('min-message', MinMessage)
Vue.component('min-action-sheet', MinActionShee)
Vue.component('min-stepper', MinStepper)
Vue.component('min-goods-submit', MinGoodsSubmit)
Vue.component('min-badge', MinBadge)
Vue.component('min-sidebar', MinSidebar)
Vue.component('min-sidebar-item', MinSearchItem)
Vue.component('min-goods', MinGoods)
Vue.component('min-goods-item', MinGoodsItem)
Vue.component('min-card', MinCard)
Vue.component('min-checkbox-group', MinCheckboxGroup)
Vue.component('min-checkbox', MinCheckbox)
Vue.component('min-radio', MinRadio)
Vue.component('min-popup', MinPopup)
Vue.component('min-switch', MinSwitch)
Vue.component('min-desc-input', MinDescInput)
Vue.component('min-remarks', MinRemarks)
Vue.component('min-collapse', minCollapse)
Vue.component('min-slider', MinSlider)
Vue.component('min-order-list', MinOrderList)
Vue.component('min-show-order', MinShowOrder)
Vue.component('min-goods-chioce', MinGoodsChioce)
Vue.component('min-describe', MinDescribe)
Vue.component('min-navTab', MinNavTab)
Vue.component('min-404', Min404)
Vue.component('min-picker', MinPicker)
Vue.component('min-idle', MinIdle)
Vue.component('min-order', MinOrder)
Vue.component('min-booked', MinBooked)
Vue.component('min-confirmed', MinConfirmed)
Vue.component('min-terminated', MinTerminated)
Vue.component('min-opened', MinOpened)
Vue.component('min-taichung', MinTaichung)
Vue.component('min-drawer', MinDrawer)
Vue.component('min-steps', MinSteps)
Vue.component('min-ducharts', MinDucharts)
Vue.component('min-table', MinTable)
Vue.component('min-data-show', MinDataShow)
Vue.component('min-pay',MinPay)
Vue.component('min-pulldown',MinPullDown)
Vue.component('min-refush',MinRefush)
Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(MinRouter)
Vue.use(MinRequest)
Vue.use(MinCache)
Vue.use(MinCommon)

Vue.prototype.$store = store

Vue.directive('root', {
   inserted:  (el, bind) => {
    if (!test(bind.value)) {
      // el.parentNode.removeChild(el)
    }
    function test (root) {
      const data = store.state.user.userInfo.access
      for (const i of data) {
        if (i === root) {
          return true
        }
      }
      return false
    }
  }
})

Vue.prototype.$showToast = (title, icon = 'none', duration = 2000) => {
  uni.showToast({
    title,
    icon,
    duration
  })
}

const app = new Vue({
  ...App,
  minRouter,
  minRequest,
  store
})
app.$mount()
