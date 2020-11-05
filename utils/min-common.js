class MinCommon {
  /**
   * @description 隐藏部分手机号码
   */
  static hideTel (value) {
    return value.replace(/(.{3}).+(.{4})/, '$1****$2')
  }

  /**
   * @description 隐藏部分身份证号码
   */
  static hideIdCar (value) {
    return value.replace(/(.{3}).+(.{4})/, '$1*********$2')
  }

  /**
   * @description 每隔 4位 加 ' '
   */
  static pattern4Right (value, pattern = ' ') {
    return value.replace(/\B(?=(\d{4})+(?!\d))/g, pattern)
  }

  /**
   * @description 每隔 4位 减少 ' '
   */
  static reduction4 (value) {
    return value.replace(/\$\s?|( *)/g, '')
  }

  /**
   * @description 清除两边的空格
   */
  static trim (value) {
    return value.trim()
  }

  /**
   * @description 判断是否是11位电话号码
   */
  static checkMobile (mobile) {
    return (/^1[345789]\d{9}$/.test(mobile))
  }

  /**
   * @description 时间格式化
   * date: 时间对象
   * fmt: 转换格式： yyyy-MM-dd hh:mm:ss 或 yyyy/MM/dd hh:mm:ss
   */
  static formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        const str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
      }
    }
    return fmt
  }

  /**
   * @param callback 回调函数
   * @param countdown 倒计时时间 默认 60s
   * @param interval 时间间隔 默认1000ms
   * @description 倒计时
   */
  static setCountDown (callback, countdown = 59, interval = 1000) {
    callback(countdown)
    const timer = setInterval(() => {
      countdown--
      if (countdown < 1) {
        clearInterval(timer)
      }
      callback(countdown, timer)
    }, interval)
  }

  /**
   * @description 防抖
   * @param callback 回调函数
   * @param interval 时间间隔 默认500ms
   * @param immediate true 表立即执行，false 表非立即执行 默认true
   */
  static debounce (callback, interval = 500, immediate = true) {
    let timer
    return function () {
      const args = arguments
      if (timer) clearTimeout(timer)
      if (immediate) {
        const flag = !timer
        timer = setTimeout(() => {
          timer = null
        }, interval)
        if (flag) callback.apply(this, args)
      } else {
        timer = setTimeout(() => {
          callback.apply(this, args)
        }, interval)
      }
    }
  }

  /**
   * 数组去重
  */
  static arrSet (arr) {
    return Array.from(new Set(arr))
  }

  /**
   *  返回星期几
   *
  */
  static getDay (num) {
    switch (num) {
      case 0:
        return '星期日'
      case 1:
        return '星期一'

      case 2:
        return '星期二'

      case 3:
        return '星期三'

      case 4:
        return '星期四'

      case 5:
        return '星期五'

      case 6:
        return '星期六'
    }
  }

  // 返回自定义的skuID
  static getMySkuID(str){
    if(str.length <= 0) throw console.error('str错误');
    let newArr = str.split('_')
    let arr = []
    let s = ''
    newArr.map(item => {
       if(item.length >= 1){
          arr.push(item*1)
       }
    })
    arr = arr.sort((a,b) => {
       return a - b
    })
    s += [...arr]
    s = s.replace(/,/g,'_')
    return s 
  }

  /**
   *  返回座位数
   *
   */
  static getSeats (num) {
    // 座位数量:0 - 未选,1 - 1座，2 - 2座，3 - 3座，4 - 4座，5 - 6座，6 - 8座，7 - 10座，8 - 12座，9 - 12座以上
    switch (num) {
      case 1:
        return '1座'

      case 2:
        return '2座'

      case 3:
        return '3座'

      case 4:
        return '4座'

      case 5:
        return '6座'

      case 6:
        return '8座'
      case 7:
        return '10座'
      case 8:
        return '12座'
      case 9: {
        return '12座以上'
      }
    }
  }

  // 返回订单状态
  static getOrderStatus (num) {
    // 订单状态（0：待付款，1：待确认，2：待出品，3：出品中，4：已出品，5：已完成，-1：待补差价，-2：已取消，-3：已退单，-4：改价作废，-5：换货作废，-6：退货作废）
    /**
     *   { desc: '待付款', color: 'red' },
        { desc: '待确认', color: 'green' },
        { desc: '待出品', color: 'red' },
        { desc: '出品中', color: 'blue' },
        { desc: '已出品', color: 'blue' },
        { desc: '已完成', color: 'origin' }
     *
     */
    switch (num) {
      case 0:
        return { desc: '待付款', color: 'red' }

      case 1:
        return { desc: '待确认', color: 'green' }

      case 2:
        return { desc: '待出品', color: 'green' }

      case 3:
        return { desc: '出品中', color: 'blue' }

      case 4:
        return { desc: '已出品', color: 'blue' }

      case 5:
        return { desc: '已完成', color: 'origin' }

      case -1:
        return { desc: '待补差价', color: 'red' }

      case -2:
        return { desc: '已取消', color: 'tcolor' }

      case -3:
        return { desc: '已退单', color: 'fcolor' }

      case -4:
        return { desc: '改价作废', color: 'blue' }

      case -5:
        return { desc: '换货作废', color: 'origin' }

      case -6:
        return { desc: '退货作废', color: 'green' }
      default:
        return { desc: '暂无', color: '' }
    }
  }

  // 付款方式
  static getPayMethod (payType) {
    switch (payType) {
      case '0':
        return 'alipay_scan_code'

      case '1':
        return 'wechat_scan_code'

      case '2':
        return 'credit_card'

      case '3':
        return 'cash'

      case '4':
        return 'postpay'
    }
  }

  // 支付ICON 
  static getIcon(id){
    switch(id){
        case 1:
        return '/static/images/alipay-pay.png'
        case 2:
        return '/static/images/wx-pay.png'
        case 3:
        return '/static/images/cash-pay.png'
        case 4:
        return '/static/images/card-pay.png'
        case 5:
        return '/static/images/later-pay.png'
        default:
        return ''
    }
  }

  // 获取手机号后四位
  static getPhoneLastNum(bank_card_num){
          let arr = bank_card_num.split('')
          let card = [...arr]
          let a = [4, 3, 2, 1]
          let str = ''
          a.map(item => {
             str += card[card.length - item]
          })
          return str
  }

  // 获取银行卡对应的图标
  static getBankIcon(card_code){
    switch (card_code + ''){
      case '01021':
        return '/static/images/bank/gongshang.png'
      case '01022':
        return '/static/images/bank/gongshang.png'
      case '0102':
        return '/static/images/bank/gongshang.png'
      case '0103':
        return '/static/images/bank/nongye.png'
      case '0104':  
        return '/static/images/bank/zhongguo.png'
      case '0105':
        return '/static/images/bank/jianshe.png'
      case '0301':
        return '/static/images/bank/jiaotong.png'
      case '0100':
        return '/static/images/bank/youzheng.png'
      case '0305':
        return '/static/images/bank/minsheng.png'
      case '0310':
        return '/static/images/bank/pufa.png'
      case '0306':
        return '/static/images/bank/guangfa.png'
      case '0302':
        return  '/static/images/bank/zhongxin.png'
      case '0303':
        return  '/static/images/bank/guangda.png'
      case '0308':
        return'/static/images/bank/zhaoshang.png'
      case '0309':
        return  '/static/images/bank/xingye.png'
      case '0304':
        return  '/static/images/bank/huaxia.png'
      case '0307':
        return  '/static/images/bank/pingan.png'
      case '4012900':
        return  '/static/images/bank/shanghai.png'
      case '04504520':
        return  '/static/images/bank/qingdao.png'
      default:
        return'/static/images/bank/zhaoshang.png'
    }
  }
}

MinCommon.install = function (Vue) {
  Vue.prototype.$minCommon = MinCommon
}

export default MinCommon
