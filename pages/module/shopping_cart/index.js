// pages/module/shopping_cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: "names1", img: "../../assets/images/tx.jpg", price: "0.02", num: 2 },
      { name: "names2", img: "../../assets/images/tx.jpg", price: "0.02", num: 2 },
      { name: "names3", img: "../../assets/images/tx.jpg", price: "0.02", num: 2 },
      { name: "names4", img: "../../assets/images/tx.jpg", price: "0.02", num: 2 },
    ],
    val:"",
    checkedVal:[]
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
  delect_set(option){
    console.log(option)
    var arr = this.data.items; 
    /*this.setData({
      items:arr
    })*/
  },
  checkbox_items(e){
    console.log(e);
  }
})