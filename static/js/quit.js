// #ifdef APP-PLUS
if (plus.os.name === 'Android') {
  const main = plus.android.runtimeMainActivity()

  // 为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台
  // plus.runtime.quit = function () {
  //   main.moveTaskToBack(false)
  // }
  // 重写toast方法如果内容为 ‘再按一次退出应用’ 就隐藏应用，其他正常toast
  // console.log(plus.os.name)
  switch (plus.os.name) {
    case 'Android':
      plus.nativeUI.toast = function (str) {
        console.log(str)
        if (str === '再按一次退出ying用') {
          main.moveTaskToBack(false)
          return false
        } else {
          uni.showToast({
            title: '再按一次退出夜乐APP',
            icon: 'none'
          })
        }
      }
      break
    case 'iOS':
      // eslint-disable-next-line no-case-declarations
      plus.ios.import('UIApplication').sharedApplication().performSelector('exit')
      break
    default:
      console.log('运行在开发者工具上')
      break
  }
}
// plus.os.name=="Android"?plus.runtime.quit():plus.ios.import("UIApplication").sharedApplication().performSelector("exit");
// #endif
