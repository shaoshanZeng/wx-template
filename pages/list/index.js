// pages/list/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: false,
    activedIndex: 0,
    scrollLeft: 0,
    scrollTop: 0,
    orderList: [{
      "fwt": "28383b0320ce43558a7912158229845a",
      "orderno": "gz202003180037",
      "title": "工单",
      "id": 1
    },
    {
      "fwt": "28383b0320ce43558a7912158229845a",
      "orderno": "gz202003180037",
      "title": "工单",
      "id": 2
    },
    {
      "fwt": "28383b0320ce43558a7912158229845a",
      "orderno": "gz202003180037",
      "title": "工单",
      "id": 3
    },
    {
      "fwt": "28383b0320ce43558a7912158229845a",
      "orderno": "gz202003180037",
      "title": "工单",
      "id": 4
    }
    ],
    tabs: [{
      name: "新任务",
      count: 0,
      status: 10,
      "id": 3
    },
    {
      name: "待处理",
      count: 0,
      status: 20
    },
    {
      name: "处理中",
      count: 0,
      status: 30
    },
    {
      name: "已完成",
      count: "",
      status: 40
    }
    ]
  },
  tabClick(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      activedIndex: index,
      scrollTop: 0
    })
  },

  // 滑动模块
  swiperChange(e) {
    let current = e.detail.current;
    this.setData({
      activedIndex: current,
      scrollLeft: current * 80,
      scrollTop: 0
    })
    // this.pageNum = 1;
    // this.isFinish = false;
    // this.orderList = [];

    // if (current == 0) { this.status = 10 }
    // else if (current == 1) { this.status = 20 }
    // else if (current == 2) { this.status = 30 }
    // else if (current == 3) { this.status = 40 }
    // this.getPage();
    // this.getCount();
  },


  // onLoad() {
  //   this.resetPage();
  // },
  // // 每次进来工单列表 重置当前状态的数据
  // onTabItemTap(e) {
  //   if (!this.isInit) {
  //     this.resetPage();
  //   }
  // },
  // // 重置列表
  // resetPage() {
  //   this.userid = wx.getStorageSync("access-user").id;
  //   wx.pageScrollTo({
  //     scrollTop: 0
  //   });
  //   this.pageNum = 1;
  //   this.isFinish = false;
  //   this.orderList = [];
  //   this.getPage();
  //   this.getCount();
  // },

  // // 秒级倒计时  
  // count_down() {
  //   timer1 = setInterval(() => {
  //     this.orderList.map((item) => {
  //       item.second -= 1;
  //       item.second1 = this.formatSecond(item.second, item.djs)
  //       return item;
  //     })

  //   }, 1000)
  // },
  // // 触底事件
  // onReachBottom() {
  //   let total = this.total;
  //   let totalPage = total % 10 == 0 ? total / 10 : parseInt(total / 10) + 1;
  //   if (this.pageNum < totalPage) {
  //     this.pageNum = this.pageNum + 1;
  //     this.getPage();
  //   } else {
  //     if (this.orderList.length != 0) {
  //       this.isFinish = true;
  //       this.$util.errorToast("数据加载完成");
  //     }
  //   }
  // },
  // // 当前界面被销毁时清除定时
  // onHide() {
  //   clearInterval(this.timer1);
  // },

  // 获取列表
  async getPage() {
    let param = {};

    // postForm用于提交表单
    const { data, code } = await getApp().request.postForm('url', true, true, '加载中...', param);

    // const {data,code} = await getApp().request.post('url', true, true, '加载中...', param);
    // 若第二个参数为true，返回的结果统一处理
    if (data) {
      // code为100的情况的操作
      getApp.util.errorToast("加载完成");
    }
    // 若第二个参数为false，返回的结果再单独判断code
    // if(code == 100){

    // }else if(code == 101){

    // }
  },
  // 获取状态
  getStatus() {
    getApp().request.get('url', true, false, '', {}).then((res) => {
      if (res.code == 100) {
        // 执行操作
      }
    })
  },

  // 去详情
  goToDetail(e) {
    console.log(e);
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/list/pages/detail/index?id=${id}`,
    })
  }



})