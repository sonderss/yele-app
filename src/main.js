import Vue from 'vue'
import App from './App'
import MinRouter from './utils/min-router'
import minRouter from './router'
import MinRequest from './utils/min-request'
import minRequest from './api'
import MinCache from './utils/min-cache'
import MinCommon from './utils/min-common'
import './style/index.scss'
import './static/font/iconfont.css'

// 常用的组件注册全局(编译器问题，只能在main.js全局注册)
import MinAvatar from '@/components/min-avatar'
import MinBtn from '@/components/min-btn'
import MinCell from '@/components/min-cell'
import MinCellItem from '@/components/min-cell-item'
import MinSearch from '@/components/min-search'
import MinModal from '@/components/min-modal'
import MinActionShee from '@/components/min-action-sheet'
import MinStepper from '@/components/min-stepper'
import MinGoodsSubmit from '@/components/min-goods-submit'
import MinBadge from '@/components/min-badge'
import MinSidebar from '@/components/min-sidebar'
import MinSearchItem from '@/components/min-sidebar-item'
import MinGoods from '@/components/min-goods'
import MinGoodsItem from '@/components/min-goods-item'
import MinCard from '@/components/min-card'
import MinCheckbox from '@/components/min-checkbox'
import MinRadio from '@/components/min-radio'

Vue.component('min-avatar', MinAvatar)
Vue.component('min-btn', MinBtn)
Vue.component('min-cell', MinCell)
Vue.component('min-cell-item', MinCellItem)
Vue.component('min-search', MinSearch)
Vue.component('min-modal', MinModal)
Vue.component('min-action-sheet', MinActionShee)
Vue.component('min-stepper', MinStepper)
Vue.component('min-goods-submit', MinGoodsSubmit)
Vue.component('min-badge', MinBadge)
Vue.component('min-sidebar', MinSidebar)
Vue.component('min-sidebar-item', MinSearchItem)
Vue.component('min-goods', MinGoods)
Vue.component('min-goods-item', MinGoodsItem)
Vue.component('min-card', MinCard)
Vue.component('min-checkbox', MinCheckbox)
Vue.component('min-radio', MinRadio)

Vue.config.productionTip = false
App.mpType = 'app'

Vue.use(MinRouter)
Vue.use(MinRequest)
Vue.use(MinCache)
Vue.use(MinCommon)

const app = new Vue({
  ...App,
  minRouter,
  minRequest
})
app.$mount()
