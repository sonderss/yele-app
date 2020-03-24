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
  // 获取桌台详情
  getOrderDetail: data => minRequest.get('/5e1da82751805', data),
  // 获取预约记录
  getBookList: data => minRequest.get('/5e7334b369aae', data),
  // 取消订台
  cancelBooked: data => minRequest.post('/5e708fbae877f', data),
  // 推迟到店
  backBooked: data => minRequest.post('/5e71d3ee848e2', data),
  // 启用
  startUse: data => minRequest.get('/5e71c9488f983', data),
  // 开台
  startOrder: data => minRequest.post('/5e1ef9d780d5e', data),
  // 停用
  stopUse: data => minRequest.get('/5e1efa0402ded', data),
  // 转台
  changeOrder: data => minRequest.post('/5e73119ddb7eb', data),
  // 清台
  clearOrder: data => minRequest.get('/5e71d5877cf60', data),
  // 销台
  delOrder: data => minRequest.get('/5e71d58cd6f3c', data),
  // 获取预约详情
  getBookedDetail: data => minRequest.get('/5e7985d26f15e', data),
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
