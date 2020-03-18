import MinRequest from '@/utils/min-request'
import store from '../store/index'

const minRequest = new MinRequest()

// 设置默认配置
minRequest.setConfig((config) => {
  config.baseURL = 'http://api.app-store.dev.yeleonline.com/api'
  return config
})

// 请求拦截器
minRequest.interceptors.request((request) => {
  const userInfo = store.state.user.userInfo
  if (userInfo) request.header['api-auth'] = userInfo.apiAuth
  request.header['access-token'] = 'HPkSFqbVhWpCRxVRpOTkyEubusFxBEEd'
  return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
  const { code, data, msg } = response.data
  // 统一处理响应请求，后续完善
  if (code !== 1) {
    uni.showToast({
      title: msg,
      duration: 2000,
      icon: 'none'
    })
    // setTimeout(() => {
    //   uni.navigateTo({
    //     url: '/pages/index/index'
    //   })
    // }, 2000)
    // 登录过期
    if (code === 1000011) {
      store.dispatch('user/setUserInfo', {})
      uni.reLaunch({
        url: '/pages/login/index'
      })
    }
    return Promise.reject(data)
  }
  return data
})

let apis = {}
const apiFiles = require.context('./', true, /\.js$/)
apiFiles.keys().forEach(path => {
  if (path !== './index.js') {
    const apiContent = apiFiles(path).default
    apis = Object.assign({}, apis, apiContent)
  }
})

export { minRequest }

export default {
  ...apis
}
