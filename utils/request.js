var util = require("./util.js")

export default class Request {
  constructor(param) {
    console.log(param)
  }
  // 获取app实例
  init(app) {

    if (this.app) {
      return this.app
    } else {
      this.app = app;
    }
  }


  get(url, commonHandle, isLoading, loadingText, data) {
    let header = {
      "Content-Type": "application/x-www-form-urlencoded"
    }
    if (this.app.globalData.userInfo) {
      header.userIds = this.app.globalData.userInfo.id;
      header.userId = this.app.globalData.userInfo.openid;
      header.userToken = this.app.globalData.userInfo.token;
    }
    if (isLoading) {
      wx.showLoading({
        title: loadingText,
      })
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.app.data.baseURL + url,
        data,
        method: 'GET',
        header: header,
        success(res) {
          console.log(res);
          const {
            data,
            code,
            status,
            msg
          } = res.data;

          if (commonHandle) {
            console.log("commonhandle")
            resolve(res.data);
          } else {
            if (code == '100') {
              resolve(data);
            } else {
              util.showMsg('提示', msg == null ? "未知错误" : msg, null, null);
            }
          }
        },
        fail(e) {
          util.showMsg('提示', "请求失败", null, null);
        },
        complete: () => {
          if (isLoading) {
            wx.hideLoading();
          }
        }
      })
    })
  }

  post(url, commonHandle, isLoading, loadingText, data) {
    if (isLoading) {
      wx.showLoading({
        title: loadingText,
      })
    }

    header["Content-Type"] = "application/x-www-form-urlencoded";

    if (this.app.globalData.userInfo) {
      header.userIds = this.app.globalData.userInfo.id;
      header.userId = this.app.globalData.userInfo.openid;
      header.userToken = this.app.globalData.userInfo.token;
    }
    return new Promise((resolve, reject) => {

      wx.request({
        url: this.app.data.baseURL + url,
        data,
        method: 'POST',
        header: header,
        success(res) {
          const {
            data,
            code,
            status,
            msg
          } = res.data;

          if (commonHandle) {
            if (code == '100') {
              resolve(data);
            } else {
              util.showMsg('提示', msg == null ? "未知错误" : msg, null, null);
            }
          } else {
            resolve(data);
          }
        },
        fail() {
          util.showMsg('提示', "请求失败", null, null);
        },
        complete: () => {
          if (isLoading) {
            wx.hideLoading();
          }
        }
      })
    })
  }

  // 提交表单
  postForm(url, commonHandle, isLoading, loadingText, data) {
    if (isLoading) {
      wx.showLoading({
        title: loadingText,
      })
    }
    data = JSON.stringify(data);
    header["Content-Type"] = "application/json";

    if (this.app.globalData.userInfo) {
      header.userIds = this.app.globalData.userInfo.id;
      header.userId = this.app.globalData.userInfo.openid;
      header.userToken = this.app.globalData.userInfo.token;
    }
    return new Promise((resolve, reject) => {

      wx.request({
        url: this.app.data.baseURL + url,
        data,
        method: 'POST',
        header: header,
        success(res) {
          const {
            data,
            code,
            status,
            msg
          } = res.data;

          if (commonHandle) {
            if (code == '100') {
              resolve(data);
            } else {
              util.showMsg('提示', msg == null ? "未知错误" : msg, null, null);
            }
          } else {
            resolve(data);
          }
        },
        fail() {
          util.showMsg('提示', "请求失败", null, null);
        },
        complete: () => {
          if (isLoading) {
            wx.hideLoading();
          }
        }
      })
    })
  }

}
// const request = new Request() 
// module.exports = request