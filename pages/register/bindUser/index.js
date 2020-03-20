const app = getApp()
var appData = getApp().data;
const phonereg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
var timeOutTime; 

Page({
  data: {
    isUnLoad:true,
    getCodeTime:0,
    isDisabled: false,
    username: "",
    phone: "",
    code: "",
    organArr: [],
    multiIndex: "",// number
    multiArray: [],
    isshowcode: true,
    codeClass: "obtain",
    codeText: "获取验证码"

  },
  onUnload(){
    clearInterval(timeOutTime);
  },
  onLoad() {
  
  },
  
  nameInput(e) {
    this.setData({
      username: e.detail.value
    })
  },
  phoneInput(e) {
    if (phonereg.test(e.detail.value)) {
      this.setData({
        phone: e.detail.value
      })
    } else {
      this.setData({
        phone: e.detail.value
      })
    }
  },
  codeInput: function(e) {
    this.setData({
      code: e.detail.value
    })
  },

  bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },

  // 绑定账号登录
  async btnBindPhone(e) {

    if (!this.data.phone) {
      app.util.errorToast("请输入手机号码");
      return false;
    }
    if (!this.data.code) {
      app.util.errorToast("请输入验证码");
      return false;
    }
    if (!this.data.username) {
      app.util.errorToast("请输姓名");
      return false;
    }

    if ((appData.sendCodePhone != this.data.phone) || (appData.phoneCode != e.detail.value.code)) {
      app.util.errorToast("验证码校验失败");
      return;
    }

    let choseOrgan = this.data.multiIndex != ''?this.data.organArr[this.data.multiIndex].ID : '';
    

    this.setData({
      isDisabled: true
    })
 

  },
  //获取验证码
  async getCode() {
   
    if(this.data.getCodeTime > 0){
      return false;
    }
    var phone = this.data.phone;
    if (phone.length == 0) {
      app.util.errorToast("手机号码不能为空");
      return false;
    } else if (!(phonereg.test(phone))) {
      app.util.errorToast("请输入正确的手机号码");
      return false;
    }

    const {
      data
    } = await app.http.get('wxApi/sendCode', {
      mobile: phone
    });
    if (data) {
      appData.sendCodePhone = phone;
      appData.phoneCode = data;
      app.util.errorToast("发送成功");
      this.setData({
        codeClass: "obtain-cantuse"
      })
 
      this.count_down();
     

    } 
   

  },

  // 倒计时
  count_down(){
    
    this.setData({
      getCodeTime:60
    })
   
    timeOutTime = setInterval(() => {
     
      if (this.data.getCodeTime <= 0) {
        clearInterval(timeOutTime);

        this.setData({
          codeClass: "obtain",
          codeText: "获取验证码"
        }) 
        return;
      } else {
        this.setData({
          codeText: this.data.getCodeTime + "s"
        })
      }

      let times = this.data.getCodeTime-1;
      this.setData({
        getCodeTime:times
      })
    }, 1000)
  }
})