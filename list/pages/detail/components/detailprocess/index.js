 
Component({
  options: {
  },
  /**
   * 组件的属性列表
   */
  properties: {
    processList: {
      type: Object 
    }, 
    imgArr: {
      type: Array 
    } 
  },

  /**
   * 组件的初始数据
   */
  data: {
    isHide:true
  },



  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    moved: function () { },
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 诉求追踪-查看更多
    showMore(e) {
      this.setData({
        isHide: !this.data.isHide
      }) 
    },

    // 放大图片
    previewImg: function (e) {
      console.log(e.currentTarget.dataset.index);
      var path = e.currentTarget.dataset.path;
      var imgArr = this.data.imgArr;
      wx.previewImage({
        current: path,     //当前图片地址
        urls: imgArr,               //所有要预览的图片的地址集合 数组形式
        success: function (res) { }
      })
    },
  }
})