class MinSocket {
  constructor () {
    this._config = {
      url: 'wss://api.store.dev.yeleonline.com:20021',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text'
    }
  }

  createSocket () {
    let obj = {}
    obj = this._config
    return new Promise((resolve, reject) => {
      obj.success = (res) => {
        resolve(res)
      }
      obj.fail = (err) => {
        reject(err)
      }
      uni.connectSocket({ ...obj })
    })
  }

  socketOpen () {
    return new Promise((resolve) => {
      uni.onSocketOpen((res) => {
        resolve(res)
      })
    })
  }

  socketError () {
    uni.onSocketError((res) => {
      console.log('WebSocket连接打开失败，请检查:', res)
    })
  }

  sendSocketMessage (data) {
    return new Promise((resolve, reject) => {
      const obj = {
        data: JSON.stringify(data),
        success: (res) => {
          resolve(res)
        },
        reject: (err) => {
          reject(err)
        }
      }
      uni.sendSocketMessage(obj)
    })
  }

  socketMonitor () {
    return new Promise((resolve) => {
      uni.onSocketMessage((res) => {
        resolve(res.data)
      })
    })
  }

  socketClose () {
    uni.onSocketClose((res) => {
      console.log('WebSocket 已关闭！')
    })
  }
}

export default MinSocket
