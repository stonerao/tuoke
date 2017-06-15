// pages/module/order_list/index.js
let util = require('../../../config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ['全部','代付款', '待发货', '待收货', '待评价', '待换货', '待拼团'],
    listActive: 0,
    page: 1,
    datas: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      listActive: options.active!=''?options.active:''
    })
    console.log(this.data.listActive)
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
    this.data.page = 1;
    this.setData({
      listActive: index
    });
    this.setData({
      datas:[]
    }) 
    
    this.ajaxData();
  },
  ajaxData() {
    var index = this.data.listActive ;
    index == -1 ? index = '' : '';
    console.log(index)
    // list状态值
    var _this = this;
    wx.request({
      url: _this.data.listActive != 3 ? util.order_list : util.comment_list,
      data: {
        debug_user: util.debug_user,
        type: index==0?'':parseInt(index)-1,
        p: this.data.page
      },
      // header: { "Content-Type": "application/x-www-form-urlencoded" },
      method: 'GET',
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
    console.log(e);
    var obj = e.target.dataset;
    // list状态值
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: util.quit_order,
            data: {
              debug_user: util.debug_user,
              order_sn: obj.order_sn,
              status: 4
            },
            method: 'GET',
            dataType: 'json',
            success: function (res) {
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 2000
              })

            },
            fail: function (res) { },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  orderInfo(e){
    // 列表详情跳转
    var obj = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../order_info/index?order_id=${obj.order_id}&order_sn=${obj.order_sn}`,
    })
  }
})