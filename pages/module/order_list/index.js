// pages/module/order_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ['全部', '待收货', '待发货', '代收款', '待评价'],
    listActive: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    switch (index) {
      case 0:
        console.log(1)
        break;
        ;
      default:
        ;
    }
  }
})