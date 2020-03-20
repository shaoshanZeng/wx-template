var app = getApp();
var appData = getApp().data;
var request = require("../../utils/request.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDisabled:false,
    openId: null,
    userInfo: null,
    isauth: false,
    propertyId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
   
    //  let q = decodeURIComponent(options.q); //获取从微信扫一扫传过来的二维码信息 
    //   if (q != null && q != "undefined") { //微信扫码报修
    //     if (q.indexOf("/sys/code/") != -1) { //判断是否是报修的二维码
    //       var strs = new Array();
    //       strs = q.split("/");
         
    //       app.globalData.meetingId = strs[strs.length - 1]; 
    //       wx.showLoading({
    //         title: '数据加载中...',
    //       });
       
    //     }
    //   } 
      
     this.onGotUserInfo();
  
  },

  onUnload(){
    this.setData({
      isDisabled: false
    })
  },
  onHide() {
    this.setData({
      isDisabled: false
    })
  },
  
 // 点击立即登录
  submitLogin(){
    this.setData({
      isDisabled:true
    })
    this.onGotUserInfo();
  },
  
  // 获取用户授权信息
  getUserInfos(func){

    // 获取用户信息
    wx.getSetting({
      success: res => {
        this.isauth = res.authSetting['scope.userInfo'];
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo;
              app.globalData.headimg = res.userInfo.avatarUrl;
              this.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }

              if (func != null) {
                func(true);
              }
            }

          })
        } else {
          func(false);
        }
      }
    })

  },
  onGotUserInfo() {
   

    // 获取用户openId
    app.getOpenId(()=> {
      // 是否授权
      this.getUserInfos((isauth)=> {
        if (isauth) {
          this.setData({
            isDisabled: true
          })
          if (app.globalData.userInfo) {
            // 登录
           app.resGetUserInfo();
           
          } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo = res.userInfo
                app.globalData.headimg = res.userInfo.avatarUrl;
              }
            })
           
          }

        } 

      });
    });
  },

 

  
})