// 把一些常用的组件注册全局
import Vue from 'vue'

// import MinTopNav from './top-nav/index.vue'
import MinAvatar from './min-avatar.vue'
import MinBtn from '@/components/min-btn'
import MinCell from '@/components/min-cell'
import MinCellItem from '@/components/min-cell-item'
import MinSearch from '@/components/min-search'

Vue.component('MinAvatar', MinAvatar)
Vue.component('MinBtn', MinBtn)
Vue.component('MinCell', MinCell)
Vue.component('MinCellItem', MinCellItem)
Vue.component('MinSearch', MinSearch)
