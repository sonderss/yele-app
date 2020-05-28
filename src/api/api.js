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
  // 开台申请
  orderGetRoot: data => minRequest.post('/5e7b1643442ff', data),
  // 获取预约详情
  getBookedDetail: data => minRequest.get('/5e7985d26f15e', data),
  // 账单汇总
  billAllin: data => minRequest.get('/5e79c3d01c709', data),
  // 获取商品列表
  getProductList: () => minRequest.get('/5e8595f31c800'),
  // 获取商品详情 ?product_id=14
  getProductDetail: data => minRequest.get('/5e8595057ddee', data),
  // 获取服务详情 ?service_id=1
  getServeDetail: data => minRequest.get('/5e85950939108', data),
  // 存酒记录 5e85b1140a67a
  getWinekeepingrecord: () => minRequest.get('/5e85b1140a67a'),
  // 存酒详情 5e85b92de7139?id=1
  getWinestoragedetails: data => minRequest.get('/5e85b92de7139', data),
  // 获取开台历史 5e1eae7d5198f?desk_id=1
  getOrderHistory: data => minRequest.get('/5e8e84493a034', data),
  // 可存酒商品列表 ?opening_id=20
  getSaveWineList: data => minRequest.get('/5e84512c9a1a9', data),
  // 存酒申请 5e8562fae4f8e
  saveWinePost: data => minRequest.post('/5e8562fae4f8e', data),
  // 取酒申请 5e86e83e75b5d
  getWinePost: data => minRequest.post('/5e86e83e75b5d', data),
  // 获取套餐详情 5e8ee33b60dcb?setmeal_id=5
  getPackageDetails: data => minRequest.get('/5e8ee33b60dcb', data),
  // 取酒记录
  getWindeList: () => minRequest.get('/5e86f19546fa3'),
  // 取酒记录详情
  getWineDetail: (data) => minRequest.get('/5e86ff46c9c1d', data),
  //  下单记录
  getOrderList: () => minRequest.get('/5e87093063fea'),
  // 获取下单商品列表
  getOrderProduceList: () => minRequest.get('/5e842f516f7ac'),
  // 获取下单商品详情
  getOriderProductDetail: data => minRequest.get('/5e85946842267', data),
  // 获取下单套餐详情 5e8ee2eb1a402?setmeal_id=5
  getOriderPackageDetails: data => minRequest.get('/5e8ee2eb1a402', data),
  // 获取下单服务详情 5e8594a8c2717?service_id=1
  getOriderServeDetail: data => minRequest.get('/5e8594a8c2717', data),
  // 赠送商品列表 5e96c98a65377?opening_id=23
  getGiveAwayList: data => minRequest.get('/5e96c98a65377', data),
  // 赠送商品详情 5e9805f6d81e4?sku_id=12
  getGiveAwayProductDetail: data => minRequest.get('/5e9805f6d81e4', data),
  // 赠送服务详情 5e98065f4d8c4?service_id=1
  getGiveAwayServeDetail: data => minRequest.get('/5e98065f4d8c4', data),
  // 赠送套餐详情 5e98065704a3f?setmeal_id=10
  getGiveAwaySetmealDetail: data => minRequest.get('/5e98065704a3f', data),
  // 赠送记录列表 5e9d781dd92c9
  giveAwayList: () => minRequest.get('/5e9d781dd92c9'),
  // 赠送商品下单 5e9d7817aea4c
  giveAwayOrder: data => minRequest.post('/5e9d7817aea4c', data),
  // 赠送订单预览  5e9ea4671e89c/?order_id=223
  gerOrderList: data => minRequest.get('/5e9ea4671e89c', data),
  // 确认赠送  5e9f9e0ee9a86?order_id=215
  postOrderGet: data => minRequest.get('/5e9f9e0ee9a86', data),
  // 个人资料
  getUserInfo: () => minRequest.get('/5e9fe880cb610'),
  // 修改手机号 5ea00df607233
  setPhone: data => minRequest.post('/5ea00df607233', data),
  // 实名认证 5ea01b1597aa8
  postNameTrue: data => minRequest.post('/5ea01b1597aa8', data),
  // 我的下线 5e9facde8be76?limit=10&page=1
  getMyDownLine: data => minRequest.get('/5e9facde8be76', data),
  // 邀请记录 5e9fbfc58bb01
  getPlaseList: () => minRequest.get('/5e9fbfc58bb01'),
  // 邀请下线 Invite offline 5e9fe52f40729
  postInviteOffline: data => minRequest.post('/5e9fe52f40729', data),
  // 可邀请下线列表
  getPleaseDownLineList: data => minRequest.get('/5e9fbb7d8f017', data),
  // 订单列表
  getOrderListDown: data => minRequest.get('/5ea16642aa64e', data),
  // 订单详情
  getOrderDetailDown: data => minRequest.get('/5ea16648a957f', data),
  // 获取支付方式
  getPayMethods: () => minRequest.get('/5ea06896a701e'),
  // 创建订单5e9915d513f53
  setOrder: data => minRequest.post('/5e9915d513f53', data),
  // 预览订单 5e942d8d68ea6 / ?order_id=263&desk_id=13&open_status=0
  previewOrder: data => minRequest.get('/5e942d8d68ea6', data),
  // 确认订单 5ea062b985018
  confirmOrder: data => minRequest.post('/5ea062b985018', data),
  // 取消订单 5ea7f3bce55df
  cancelOrder: data => minRequest.post('/5ea7f3bce55df', data),
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
  applyLog: data => minRequest.get('/5e5f4935600ae', data),
  // 数据统计 5ec4991910d14?type=0
  getDataTJ: () => minRequest.get('/5ec4991910d14'),
  // 营业统计 5ec4df549584c?date_range=2
  getBusinessStatistics: data => minRequest.get('/5ec4df549584c', data),
  // 桌台统计 5ec5effc112a0?date_range=6
  getTablestatistics: data => minRequest.get('/5ec5effc112a0', data)
}
