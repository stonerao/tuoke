// pages/module/index/index.js
let util = require('../../../config.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index_head: true,
    datas: [{}, {}, {}, {}],
    item: [],
    title:{},
    host:util.host
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // option id 

    app.getOpentId(util.getLogin,util.sid)










    var _this = this;
    wx.request({
      url: util.diy,
      data: {
        id:util.index_id,
      },
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log(res)
        var datas = res.data.data.LModules;
        _this.setData({ 
          items: datas
        })
      }
    })
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
    console.log(2)
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

  },
  over_head() {
    this.setData({
      index_head: false
    })
  }
})