export default class Chat {

  constructor(app) {
    this.chat_id = null // chat_id
    this.connectStatus = 0 // websocket 连接状态 0：未连接，1：已连接
    this.heartListen = null // 心跳
    this.watcherList = [] // 订阅者
    this.app = app // 方便在Chat内部操作app
  }

  /* 初始化连接 */
  connectSocket() {
    this.chat_id = new Date().getTime()
    console.log('开始连接')
    // websocket连接
    wx.connectSocket({
      url: `${this.app.data.wsURL}${this.app.globalData.userInfo.id}/70b59721-0b99-46e9-9762-e9a906051954`,
      header: {
        headerToken: this.app.globalData.userInfo.token
      },
      success: () => {
        console.log('连接成功')
        // 设置连接状态
        this.connectStatus = 1
        // 心跳
        clearInterval(this.heartListen)
        this.heartListen = setInterval(() => {
          if (this.connectStatus === 0) {
            console.log('监听到没心跳了，抢救一下')
            clearInterval(this.heartListen);
            this.reconnect();
          } else { 
           // console.log('连接中')
          }
        }, 3000)
      },
      fail: err => {
        console.error('连接失败')
      }
    })
    // 监听webSocket错误
    wx.onSocketError(res => {
      console.log('监听到 WebSocket 打开错误，请检查！', res)
      // 修改连接状态
      this.connectStatus = 0
    })
    // 监听WebSocket关闭
    wx.onSocketClose(() => {
      console.log('监听到 WebSocket 已关闭！')
      this.connectStatus = 0
    })
    // websocket打开
    wx.onSocketOpen(() => {
      console.log('监听到 WebSocket 连接已打开！')
    })
    // 收到websocket消息
    wx.onSocketMessage(res => {
      this.getSocketMsg(res)
    })

  }

  /* 重连 */
  reconnect() {
    console.log('尝试重连')
    wx.closeSocket() // 重连之前手动关闭一次
    this.connectSocket();
  }

  /* 关闭websocket */
  closeSocket() {
    wx.closeSocket({
      success: res => {
        // code
      }
    })
  }

  /* 添加watcher */
  addWatcher(fn) {
    this.watcherList.push(fn)
    return this.watcherList.length - 1 // 返回添加位置的下标，Page unload的时候方便删除List成员
  }

  /* 删除watcher */
  delWatcher(index) {
    this.watcherList.splice(index, 1)
    // console.log('销毁watcher', this.watcherList)
  }

  /* 收到消息 */
  getSocketMsg(result) {
    console.log("收到消息", result)
    // 可以设置哪些界面不收到接听等操作
    // 给每个订阅者发消息
    this.watcherList.forEach(item => {
      item(result);
    })
  }
}