import { minRequest } from './index'

export default {
  // 获取验证码
  getVerificationCode: data => minRequest.get('/5e1d7e2b7dac6', data),
  // 登录
  login: data => minRequest.post('/5e1d5bf907854', data),
  // 获取充公酒列表
  getWineList: () => minRequest.get('/5e424cc4ded0a'),
  // 获取充公酒记录5e424f7f8c0c0?page=1&limit=100
  getConfiscatedWinereCords: data => minRequest.get('/5e424f7f8c0c0', data),
  // 获取充公酒详情
  getWinereDetail: data => minRequest.get('/5e424fd3c4f69?id=', data),

  // 添加充公酒记录
  addWinePubList: data => minRequest.post('/5e424fff89293', data),
  // 获取桌台列表
  GetTableList: data => minRequest.get('/5e1da2053a047?date=', data),
  // 获取台位历史
  getStationHistory: data => minRequest.get('/5e1eae7d5198f', data),
  // 获取营销列表
  getMarketingList: data => minRequest.get('/5e2156e70e285',data),
  // 预约 （订台预览）
  getBookingPreview: data => minRequest.get('/5e1ed699a2e11', data),
  // 订台
  addBooked: data => minRequest.post('/5e1edf43a5e78', data),
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
  getWinekeepingrecord: data => minRequest.get('/5e85b1140a67a', data),
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
  getWindeList: data => minRequest.get('/5e86f19546fa3', data),
  // 取酒记录详情
  getWineDetail: data => minRequest.get('/5e86ff46c9c1d', data),
  //  下单记录
  getOrderList: data => minRequest.get('/5e87093063fea', data),
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
  giveAwayList: data => minRequest.get('/5e9d781dd92c9', data),
  // 赠送商品下单 5e9d7817aea4c
  giveAwayOrder: data => minRequest.post('/5e9d7817aea4c', data),
  // 赠送订单预览  5e9ea4671e89c/?order_id=223
  gerOrderList: data => minRequest.get('/5e9ea4671e89c', data),
  // 确认赠送  5e9f9e0ee9a86?order_id=215
  postOrderGet: data => minRequest.get('/5e9f9e0ee9a86', data),
  // 个人资料
  getUserInfo: data => minRequest.get('/5e9fe880cb610', data),
  // 编辑个人资料 5ed5bbf54de7a
  setPersonInfo: data => minRequest.post('/5ed5bbf54de7a', data),
  // 文件上传 5ebdf23feeba7
  upLoadFile: data => minRequest.post('/5ebdf23feeba7', data),
  // 修改手机号 5ea00df607233
  setPhone: data => minRequest.post('/5ea00df607233', data),
  // 实名认证 5ea01b1597aa8
  postNameTrue: data => minRequest.post('/5ea01b1597aa8', data),
  // 我的下线信息
  getMyDownLineInfo: data => minRequest.get('/5f350503a283f', data),
  // 返佣记录 5f1ba83c1e066?rebate_uid=6&limit=10&page=1
  getRecode: data => minRequest.get('/5f1ba83c1e066', data),
  // 我的下线 5e9facde8be76?limit=10&page=1
  getMyDownLine: data => minRequest.get('/5e9facde8be76', data),
  // 邀请记录 5e9fbfc58bb01
  getPlaseList: data => minRequest.get('/5e9fbfc58bb01', data),
  // 邀请下线 Invite offline 5e9fe52f40729
  postInviteOffline: data => minRequest.post('/5e9fe52f40729', data),
  // 可邀请下线列表
  getPleaseDownLineList: data => minRequest.get('/5e9fbb7d8f017', data),
  // 订单列表
  getOrderListDown: data => minRequest.get('/5ea16642aa64e', data),
  // 订单详情
  getOrderDetailDown: data => minRequest.get('/5ea16648a957f', data),
  // 获取支付方式
  getPayMethods: data => minRequest.get('/5ea06896a701e', data),
  // 创建订单5e9915d513f53
  setOrder: data => minRequest.post('/5e9915d513f53', data),
  // 预览订单 5e942d8d68ea6 / ?order_id=263&desk_id=13&open_status=0
  previewOrder: data => minRequest.get('/5e942d8d68ea6', data),
  // 确认订单 5ea062b985018
  confirmOrder: data => minRequest.post('/5ea062b985018', data),
  // 取消订单 5ea7f3bce55df
  cancelOrder: data => minRequest.post('/5ea7f3bce55df', data),
  // 获取支付状态 5ed706dd7e94f?transaction_id=1
  getPayTStatus: data => minRequest.get('/5ed706dd7e94f', data),
  /**
   * @description post请求
   */
  puniapp(data) {
    return minRequest.post('/s', data)
  },
  // 获取门店配置 5f28c78bdd3c8
  getStoreSet: data => minRequest.get('/5f28c78bdd3c8', data),
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
  getTablestatistics: data => minRequest.get('/5ec5effc112a0', data),
  // 营销统计 5ec791bf1905a
  getYxData: () => minRequest.get('/5ec791bf1905a'),
  /// 营销订台业绩 5ec7a6a1d98b4?date_range=6&condition=&limit=10&page=1
  getYXdingTai: data => minRequest.get('/5ec7a6a1d98b4', data),
  // 营销业绩汇总 5ecc95fc5cff6?uid=26&date_range=6&limit=10&page=1
  getYXyeJhuiZong: data => minRequest.get('/5ecc95fc5cff6', data),
  // 营销开台数统计 5ecccba6841c1?date_range=6&condition=&limit=10&page=1
  getYXKaiTai: data => minRequest.get('/5ecccba6841c1', data),
  // 营销开台汇总 5ecccbae6d3a6?uid=3&date_range=6
  getYXkaiTaiHuiz: data => minRequest.get('/5ecccbae6d3a6', data),
  // 角色业绩汇总 5eccdb9d35a3a?date_range=6&condition=&limit=10&page=1
  getJS: data => minRequest.get('/5eccdb9d35a3a', data),
  // 无业绩人员名单 5eccf185d164f
  getNOList: () => minRequest.get('/5eccf185d164f'),
  // 销售统计数据 5ed0772c2545c
  getXiShow: () => minRequest.get('/5ed0772c2545c'),
  // 角色销售业绩统计 5ed0773e404dc?condition=&date_range=6&limit=10&page=1
  getJSXSTJ: data => minRequest.get('/5ed0773e404dc', data),
  // 销售统计数据详情 5ed07731d34bf
  getXISHOUDea: data => minRequest.get('/5ed07731d34bf', data),
  // 销售业绩汇总 5ed0773910f50
  getXSYJHZ: data => minRequest.get('/5ed0773910f50', data),
  // 预览账单 5ed626b967004?bill_id=29
  getBillInfo: data => minRequest.get('/5ed626b967004', data),
  // 发起支付5ed610f19bfe0
  postPay: data => minRequest.post('/5ed610f19bfe0', data),
  // 获取支付状态 5ebf538b3fbe7?order_id=440
  getPayStatus: data => minRequest.get('/5ebf538b3fbe7', data),
  // 商品统计 5ed5abf07b62b
  getProductTJ: () => minRequest.get('/5ed5abf07b62b'),
  // 单品销售统计5ed5abf8ddbf5?date_range=6&cate_id=0&condition=&order_field=2&limit=10&page=1
  getDPTj: data => minRequest.get('/5ed5abf8ddbf5', data),
  // 套餐5ed5abfe4e4b0?date_range=6&condition=&order_field=1&limit=10&page=1
  getTCtj: data => minRequest.get('/5ed5abfe4e4b0', data),
  // 切换门店  5ed6264de8652
  changeStore: data => minRequest.post('/5ed6264de8652', data),
  // 转台记录  5ed8bbc6dd1ed?page=1&limit=
  changeStoreList: data => minRequest.get('/5ed8bbc6dd1ed', data),
  // 发放记录列表 5ede025dd130e?date=2020-06&page=1&limit=20
  faFangList: data => minRequest.get('/5ede025dd130e', data),
  // 发放记录详情 5edf04c01ab0c?group_id=80
  faFangDetail: data => minRequest.get('/5edf04c01ab0c', data),
  // 审核详情 5edf32ee906ea?remuneration_id=60
  getAuditdetails: data => minRequest.get('/5edf32ee906ea', data),
  // 工资详情 5edf32e863e02?remuneration_id=72
  getSelaDetail: data => minRequest.get('/5edf32e863e02', data),
  // 设置提现密码 5edf3da4e9599
  setTXpsd: data => minRequest.post('/5edf3da4e9599', data),
  // 解绑银行卡 5ee05bdb90e53
  jieBankCard: () => minRequest.post('/5ee05bdb90e53'),
  // 身份验证 5edf3dab635c0
  cardYanZ: data => minRequest.post('/5edf3dab635c0', data),
  // 获取发卡行信息 5edf641c4199d?bank_card_num=4323132135444121
  getCardInfo: data => minRequest.get('/5edf641c4199d', data),
  // 请求绑定 getCnm 5f2d26999e5e6
  getBangding: data => minRequest.post('/5f2d26999e5e6', data),
  // 绑定银行卡 5edf3db074e13
  postCard: data => minRequest.post('/5edf3db074e13', data),
  // 用户权限 5ee8747279279
  getApiPross: () => minRequest.get('/5ee8747279279'),
  // 提现记录 5ef8496fdd743?date=2020-06&limit=10&page=1
  getTiXian: data => minRequest.get('/5ef8496fdd743', data),
  // 提现详情 5ef997bece0dc?record_id=3
  getTiXianDetail: data => minRequest.get('/5ef997bece0dc', data),
  // 转账记录
  getZhBill: data => minRequest.get('/5ef835cb9a4d3', data),
  // 转账详情 5ef997b695eb0?record_id=3
  getZhBillDetail: data => minRequest.get('/5ef997b695eb0', data),
  // 收支流水 5ef96d39abb97?date=2020-06&limit=10&page=1
  getShouZ: data => minRequest.get('/5ef96d39abb97', data),
  // 提成明细 5efdadcdbf005
  getTCList: data => minRequest.get('/5efdadcdbf005', data),
  // 获取提成合计 5efef2e1ab099?start_time=2020-06-17&end_time=2020-08-01&store_id=1
  getTCAll: data => minRequest.get('/5efef2e1ab099', data),
  // 我的收入 5f02c7420e9c6
  getMyMoney: data => minRequest.get('/5f02c7420e9c6', data),
  // 提成详情 5efdadd6ef134?commission_id=81
  getTcDatail: data => minRequest.get('/5efdadd6ef134', data),
  // 冻结明细 {{hosts}}5f1bd2065a53d?page=1
  getDJlist: data => minRequest.get('/5f1bd2065a53d', data),
  //  会员协议 5f2a30778aafd
  getUserVip: data => minRequest.get('/5f2a30778aafd', data),
  // 提现  5f2d17be7ff89
  getTxian: data => minRequest.get('/5f2d17be7ff89', data),
  // 提现申请 5f2d17e1695b5
  tixianshenqing: data => minRequest.post('/5f2d17e1695b5', data),
  //  获取座位分布图 5f3b9b2999739
  getSeatList: data => minRequest.get('/5f3b9b2999739', data),
  // 会员电子协议查询 5f585a2806cd5
  getVipUserI: data  => minRequest.get('/5f585a2806cd5',data),
  // 获取通联验证码 5f2d266fc2e9f
  getTongLianCode: data => minRequest.get('/5f2d266fc2e9f',data)
}
