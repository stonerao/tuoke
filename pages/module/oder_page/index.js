
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    index: 1,
    is_alert:false,//弹出框
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    console.log(option)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
   
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    console.log(options)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function (options) {
    console.log(options)
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
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  alert_good(){
    this.setData({
      is_alert: !this.data.is_alert
    })
  },
})