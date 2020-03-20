var util = require("utils/util.js");
var request = require("utils/request.js")
const updateManager = wx.getUpdateManager()

//app.js
App({
  // 小程序启动之后 触发
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  data:{
    appId: "wxdf6c869d9dd7d5bf", 
    baseURL: '',// 正式
    baseCodeUrl: '', 
  },
  onShow(){
    // request.js要获取App
    request.init(this);


    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    })
  },
  globalData: {
    userInfo: null
  }, 

  //获取用户openId
  getOpenId: function (callBack) {
    wx.login({
      success: function (res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        getApp().data.USERCODE = res.code; //获取到CODE 
        request.get('bgWxApi/getOpenId', true, false, "", {
          code: res.code
        }).then((res) => {
          getApp().data.openId = res.openid;
          getApp().data.session_key = res.session_key;
          if (callBack != null) {
            callBack();
          }
        })
      }
    })
  },


  // 登录获取用户信息
  resGetUserInfo() {
    request.get('bgWxApi/login', false, false, "", {
      "openid": getApp().data.openId
    }).then(res => {
      if (res.code == 100) {
        if (res.data) {
          //将用户信息保存 
          getApp().globalData.userInfo = res.data;

          wx.switchTab({
            url: '/pages/home/index'
          })

        } else {
          wx.navigateTo({
            url: '/register/pages/bindUser/index'
          })
        }

      }
    });
  },
 
  uploadFile(fileIds, filePath, callback) {
    let that = this;
    wx.uploadFile({
      url: that.data.baseURL + 'sysattachment/uplodAttachment',
      filePath: filePath,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      }, // 设置请求的 header
      formData: null, // HTTP 请求中其他额外的 form data
      success: function (res) {

        let datas = JSON.parse(res.data);
        if (datas.code != 100) {
          util.errorToast("上传失败");
        } else {

          fileIds[fileIds.length] = datas.data.id;
        }
        callback(true);

      },
      fail: function (e) {
        console.log(e);
        util.errorToast("上传失败");
      }

    })
  },



  util, // 公共方法
  request// 请求方法
})