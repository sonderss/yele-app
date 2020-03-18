import { minRequest } from './index'

export default {
  // 获取验证码
  getVerificationCode: data => minRequest.get('/5e1d7e2b7dac6', data),
  // 登录
  login: data => minRequest.post('/5e1d5bf907854', data),
  // 获取充公酒列表
  getWineList: () => minRequest.get('/5e424cc4ded0a'),
  // 获取充公酒记录5e424f7f8c0c0?page=1&limit=100
  getConfiscatedWinereCords: (data) => minRequest.get('/5e424f7f8c0c0', data),
  // 获取充公酒详情
  getWinereDetail: (data) => minRequest.get('/5e424fd3c4f69?id=', data),

  // 添加充公酒记录
  addWinePubList: data => minRequest.post('/5e424fff89293', data),
  // 获取桌台列表
  GetTableList: data => minRequest.get('/5e1da2053a047?date=', data),
  // 获取台位历史
  getStationHistory: (data) => minRequest.get('/5e1eae7d5198f', data),
  // 获取营销列表
  getMarketingList: () => minRequest.get('/5e2156e70e285'),
  // 预约 （订台预览）
  getBookingPreview: (data) => minRequest.get('/5e1ed699a2e11', data),
  // 订台
  addBooked: (data) => minRequest.post('/5e1edf43a5e78', data),

  /**
   * @description post请求
   */
  puniapp (data) {
    return minRequest.post('/s', data)
  },

  // 获取门店列表
  getStoreList: data => minRequest.get('/5e5e2a5b3c50a', data),
  // 获取其他门店列表
  getElseStoreList: data => minRequest.get('/5e5e30f3809da', data),
  // 申请加入门店
  applyStores: data => minRequest.get('/5e5f1fc84a61b', data),
  // 申请门店记录
  applyLog: data => minRequest.get('/5e5f4935600ae', data)

}
