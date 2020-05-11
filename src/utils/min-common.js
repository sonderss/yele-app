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
}

export default MinCommon
