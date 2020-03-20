// list/pages/detail/index.js
import address from '../../../js/address.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems: [{
        name: "接受/处理",
        value: 20,
        checked: true
      },
      {
        name: "处理中",
        value: 30,
        checked: false
      },
      {
        name: "已完成",
        value: 40,
        checked: false
      }
    ],
    // 报修机构
    bxjgObject: [],
    bxjgArray: [],
    bxjgIndex: "",
    // 故障位置 
    gzwzAddress: "",
    selectList: [],
    selectIndex: [0, 0, 0],
    selectData: null,

    // 解决方案
    txtjjfa: "",
    // 故障主题
    txtgzzt: "",

    //图片
    files:[]
  },

  // 提交
  submit() {
    console.log(this.data.txtgzzt)
  },
  txtjjfaInput(e) {
    this.setData({
      txtjjfa: e.detail.value
    })
  },
  gzwzAddressInput(e) {
    this.setData({
      gzwzAddress: e.detail.value
    })
  },
  txtgzztInputInput(e) {
    this.setData({
      txtgzzt: e.detail.value
    })
  },

  // 获取故障位置
  getAddress() {
    let data = address[0].children; 
    if (data) {
      let list1 = [];
      let list2 = [];
      let list3 = [];
      data.forEach((item, index) => {
        list1.push(item.label)
        if (this.data.selectIndex[0] == index && (item.children && item.children.length != 0)) {
          list2 = item.children.map(item => item.label)
          item.children.forEach((items, i) => {
            if (this.data.selectIndex[1] == i && (items.children && items.children.length != 0)) {
              list3 = items.children.map(item => item.label)
            }
          })
        }
      });
      this.setData({
        selectData: data,
        selectList: [list1, list2, list3]
      }) 
  }
},

//
  pickerChange(e){
    let text1 = this.data.selectList[0][e.detail.value[0]] || '';
    let text2 = this.data.selectList[1][e.detail.value[1]] || '';
    let text3 = this.data.selectList[2][e.detail.value[2]] || '';
    this.setData({
      gzwzAddress: `${text1} ${text2} ${text3}`
    }) 
  },

 // 滑动第二行
  bindColumnChange(e){
    let newSelectIndex = this.data.selectIndex;
    switch (e.detail.column) {
      case 0:
        newSelectIndex[0] = e.detail.value;
        newSelectIndex[1] = 0;
        newSelectIndex[2] = 0;
        break;
      case 1:
        newSelectIndex[1] = e.detail.value;
        newSelectIndex[2] = 0;
        break;
      case 2:
        newSelectIndex[2] = e.detail.value;
        break;
    }

    let list1 = [];
    let list2 = [];
    let list3 = [];
    this.data.selectData.forEach((item, index) => {
      list1.push(item.label)
      if (newSelectIndex[0] == index && (item.children && item.children.length != 0)) {
        list2 = item.children.map(item => item.label)
        item.children.forEach((items, i) => {
          if (newSelectIndex[1] == i && (items.children && items.children.length != 0)) {
            list3 = items.children.map(item => item.label)
          }
        })
      }
    })

    this.setData({
      selectList: [list1, list2, list3],
      selectIndex: newSelectIndex
    }) 
  }, 


  // 上传图片

  predivImage(e) {
    console.log(this.files);
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.files // 需要预览的图片http链接列表
    });
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var len =
          parseInt(res.tempFilePaths.length) + parseInt(that.files.length);
        if (
          res.tempFilePaths.length > 5 ||
          that.files.length >= 5 ||
          len > 5
        ) {
          that.$util.errorToast("附件图片不能超过5张");
          return false;
        }
        that.files = that.files.concat(res.tempFilePaths);

        var i = 0; //初始值为0
        that.upImage(i, res.tempFilePaths); //上传图片
      }
    });
  },
  //上传多张图片时递归处理
  upImage: function (i, tempFilePaths) {
    var that = this;
    that.uploadFile(that.fileIds, tempFilePaths[i], function (isUpSuccess) {
      if (isUpSuccess == true) {
        i++;
        if (i < tempFilePaths.length) {
          that.upImage(i, tempFilePaths);
        }
      }
    });
  },

  closeImage: function (e) {  
    var that = this,
      id = e.currentTarget.dataset.id,
      images = that.files,
      fileIds = that.fileIds;
    for (var i = 0; i < images.length; i++) {
      if (id == images[i]) {
        images.splice(i, 1);
        fileIds.splice(i, 1);
        break;
      }
    }
    that.files = images;
  },

  uploadFile: function (fileIds, filePath, callback) {
    var that = this;
    wx.uploadFile({
      url: "",
      filePath: filePath,
      name: "file",
      header: {
        "content-type": "multipart/form-data"
      }, // 设置请求的 header
      formData: null, // HTTP 请求中其他额外的 form data
      success: function (res) {
        res.data = JSON.parse(res.data);
        fileIds[fileIds.length] = res.data.data.split("@@")[0];
      }
    });
  },



/**
 * 生命周期函数--监听页面加载
 */
onLoad: function(options) {
  this.getAddress();
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