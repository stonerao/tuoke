// pages/module/order_list/index.js
let util = require('../../../config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ['全部', '代付款', '待发货', '待收货', '待评价', '待换货', '待拼团'],
    listActive: 0,
    page: 1,
    datas: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      listActive: options.active
    })
    this.ajaxData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page: this.data.page+1
    })
    console.log(this.data.page)
    this.ajaxData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  headList(e) {
    // 当前点击索引
    let index = e.target.dataset.num;
    this.setData({
      listActive: index
    });
    // 判断当前点击位置
    console.log(index)
    switch (index) {
      case 0:
        break;
        ;
      default:
        ;
    }
    this.ajaxData();
  },
  ajaxData() {
    var index = this.data.listActive - 1;
    index == -1 ? index = '' : '';
    console.log(index)
    // list状态值
    var _this = this;
    wx.request({
      url: util.order_list,
      data: {
        debug_user: util.debug_user,
        type: index,
        p: this.data.page
      },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        for(var key in res.data.data){
          _this.data.datas.push(res.data.data[key]);
        }
        _this.setData({
          datas:  _this.data.datas
        })
         
      },
      fail: function (res) { },
    })
  },
  quit_order(e){
    //取消
  }
})