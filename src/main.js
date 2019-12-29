import Vue from 'vue'
import App from './App'
import MinRouter from './utils/min-router'
import minRouter from './router'
import MinRequest from './utils/min-request'
import minRequest from './api'
import MinCache from './utils/min-cache'
import MinCommon from './utils/min-common'
import './components/index.js'
import './style/index.scss'
import './static/font/iconfont.css'

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
