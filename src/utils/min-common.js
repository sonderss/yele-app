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
}

MinCommon.install = function (Vue) {
  Vue.prototype.$minCommon = MinCommon
}

export default MinCommon
