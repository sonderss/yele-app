import MinRequest from '@/utils/min-request'

const minRequest = new MinRequest()

// 设置默认配置
minRequest.setConfig((config) => {
  config.baseURL = 'http://api.app-store.dev.yeleonline.com/api/'
  return config
})

// 请求拦截器
minRequest.interceptors.request((request) => {
  return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
  return response.data
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
