var util = require("./util.js")

class Request {
  constructor(parms) {
    this.withBaseURL = parms.withBaseURL
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
        url: this.withBaseURL ? this.app.data.baseURL + url : this.app.data.baseURL1 + url,
        data,
        method: 'GET',
        header: header,
        success(res) {
          const {
            data,
            code,
            status,
            msg
          } = res.data;

          if (commonHandle) {
            resolve(res.data);
          } else {

            if (code == '100') {
              resolve(res.data);
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
        url: this.withBaseURL ? this.app.data.baseURL + url : this.app.data.baseURL1 + url,
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

          if(commonHandle) {
            if (code == '100') {
              resolve(res.data);
            } else {
              util.showMsg('提示', msg == null ? "未知错误" : msg, null, null);
            }
          }else{
            resolve(res.data);
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
        url: this.withBaseURL ? this.app.data.baseURL + url : this.app.data.baseURL1 + url,
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
              resolve(res.data);
            } else {
              util.showMsg('提示', msg == null ? "未知错误" : msg, null, null);
            }
          } else {
            resolve(res.data);
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


const request = new Request({
  withBaseURL: true
})





module.exports = request