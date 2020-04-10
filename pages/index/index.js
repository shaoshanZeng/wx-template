Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [{
        src: "iconfont icon-shouce",
        name: "工单查询",
        url: "/"
      },
      {
        src: "iconfont icon-minqing",
        name: "资产管理",
        url: "/"
      },
      {
        src: "iconfont icon-phone1",
        name: "业务咨询",
        url: "/"
      }
    ],
    newNoticeList: [1, 1, 1, 1, 1, 1, 1],
    bannerList: []

  },


  // 处理收到websocket消息
  async websocketResponse(result) {
    console.log('这是在 home 页面中收到后端推送的消息，进行一些操作', result)
    if (result.data == "flushhomelbt") {
      this.getBanner();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 在这界面添加监听者，接收socket消息
    const watcherIndex = getApp().socket.addWatcher(this.websocketResponse);
    this.setData({
      watcherIndex
    })
    this.getBanner();
  },
  onHide() {
    getApp().socket.delWatcher(this.data.watcherIndex)
  },

  // 获取首页轮播图
  async getBanner() { 
    const {
      data 
      } = await getApp().request.get('/common/getLbtList', false, false, '', {});
    if (data) {
      this.setData({
        bannerList: res.data
      })
    }
  }
})