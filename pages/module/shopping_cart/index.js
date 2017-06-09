// pages/module/shopping_cart/index.js
let util = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { cart_id: "names1", img: "../../assets/images/tx.jpg", price: "0.02", num: 2, checked: false },
      { cart_id: "names2", img: "../../assets/images/tx.jpg", price: "0.02", num: 2, checked: false },
      { cart_id: "names3", img: "../../assets/images/tx.jpg", price: "0.02", num: 2, checked: false },
      { cart_id: "names4", img: "../../assets/images/tx.jpg", price: "0.02", num: 2, checked: false },
    ],
    val: "",
    checkedVal: [],
    isAll: false,
    price: 0,
    thisCheckBox:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.request({
      url: util.cart_list, // 
      data: {
        debug_user: `169`
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        _this.setData({
          items: res.data.data
        })
      }
    })
    this.priceChange()
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
  delect_set(e) {
    console.log(e)
    var arr = this.data.items;
    console.log(this.data.thisCheckBox);
    // Order_delect
    var _this = this;
    wx.request({
      url: util.Order_delect, //仅为示例，并非真实的接口地址
      data: {
        debug_user: "169",
        id: _this.data.thisCheckBox
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
      }
    })
    /*this.setData({
      items:arr
    })*/
  },
  checkbox_items(e) {
    console.log(e)
    this.setData({
      thisCheckBox: e.detail.value
    })
    console.log(e.detail.value)
  },
  selectTap(option) {
  },
  formSubmit: function (e) {
    console.log(e)
  },
  formReset: function () {

  }, 
  listenCheckboxChange: function (e) {
    console.log('当checkbox-group中的checkbox选中或者取消是我被调用');
    //打印对象包含的详细信息
    console.log(e);
    


  },
  all_slecelt(e) {
    this.data.isAll = !this.data.isAll;
    if (this.data.isAll) {
      for (var key in this.data.items) {
        if (!this.data.items[key].cheked) {
          this.data.items[key].cheked = true;
          console.log(this.data.items[key].cheked)
        }
      }
    } else {
      for (var key in this.data.items) {
        if (this.data.items[key].cheked) {
          this.data.items[key].cheked = false;
          console.log(this.data.items[key].cheked)
        }
      }
    }
    this.setData({
      items: this.data.items
    })
    this.priceChange();
  },
  priceChange() {
    var price = 0;
    for (var key in this.data.items) {
      if (this.data.items[key].cheked) {
        price += parseFloat((this.data.items[key].price2 ? this.data.items[key].price2 : this.data.items[key].price)).toFixed(2) * parseInt(this.data.items[key].num)
      }
    }
    price = parseFloat(price).toFixed(2);
    this.setData({
      price: price
    })
  },
  formBindsubmit(e){
    
    wx.request({
      method:"POST",
      url: util.Order_go, //仅为示例，并非真实的接口地址
      data: {
        debug_user:"169",
        checkbox: this.data.thisCheckBox
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})