// pages/module/member/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    static: [{
      name: "待付款",
      number: "0",
      url: ""
    }, {
      name: "待发货",
      number: "1",
      url: ""
    }, {
      name: "待收货",
      number: "2",
      url: ""
    }, {
      name: "待评价",
      number: "3",
      url: ""
    }, {
      name: "待换货",
      number: "4",
      url: ""
    }],
    check:[
      {name:"话题推广",img:"../../assets/images/08.png",url:""},
      {name:"话题推广",img:"../../assets/images/08.png",url:""},
      {name:"话题推广",img:"../../assets/images/08.png",url:""},
      {name:"话题推广",img:"../../assets/images/08.png",url:""},
      {name:"话题推广",img:"../../assets/images/08.png",url:""},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
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
    var a = getCurrentPages()
    console.log(a[0].route)
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