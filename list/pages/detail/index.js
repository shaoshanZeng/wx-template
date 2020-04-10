// list/pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    detailList: [{
      pname: "小鸭",
      paddress: "深圳市"
    }],
    imgArr: ["https://ytmyt.yantian.org.cn/files/26817f24990b4493b4e5190e2e57073d.jpg"],
    processList: [{
        enumitemname: "登记上报",
        createddate: "04月03日 15:00",
        operatorname: "小鸭",
        reason: "测试",
        fileList: [{
          filename: "tmp_26560f5a09c7ae1bbe8e90391d486c9489146ff8532171ed.jpg",
          filepath: "https://ytmyt.yantian.org.cn/files/26817f24990b4493b4e5190e2e57073d.jpg",
          filetype: "jpg",
          id: "faf7dc9568bd48c2ba3af6c5194e3786"
        }]
    },
      {
        enumitemname: "签收",
        createddate: "04月03日 15:10",
        operatorname: "小鸭2",
        reason: "测试"
      },
      {
        enumitemname: "答复",
        createddate: "04月03日 15:20",
        operatorname: "小鸭3",
        reason: "测试"
      }
    ],
  },

  // 切换诉求tabs
  tabClick: function(e) {
    console.log(e);
    this.setData({
      activeIndex: e.currentTarget.id
    });
    wx.setNavigationBarTitle({
      title: e.currentTarget.dataset.name
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})