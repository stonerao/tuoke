// pages/module/shopping_cart/index.js
let util = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { cart_id: "1", img: "../../assets/images/tx.jpg", price: "0.02", num: 2, checked: false },
      { cart_id: "2", img: "../../assets/images/tx.jpg", price: "0.02", num: 2, checked: false },
      { cart_id: "3", img: "../../assets/images/tx.jpg", price: "0.02", num: 2, checked: false },
      { cart_id: "4", img: "../../assets/images/tx.jpg", price: "0.02", num: 2, checked: false },
    ],
    val: "",
    checkedVal: [],
    isAll: false,
    price: 0,
    thisCheckBox: []
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
    //删除购物车
    console.log(e)
    var arr = this.data.items;
    console.log(this.data.thisCheckBox);
    // Order_delect
    var _this = this;
    wx.request({
      url: util.Order_delect, //仅为示例，并非真实的接口地址
      data: {
        debug_user:util.debug_user,
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
    this.priceChange();
  },
  checkbox_items(e) {
    //点击选择
    console.log(e)
    //保存 
    this.setData({
      thisCheckBox: e.detail.value
    })
    if (e.detail.value.length==this.data.items.length){
      this.setData({
        isAll:true
      })
    }else{
      this.setData({
        isAll: false
      })
    }
    this.priceChange();
  },
  selectTap(option) {
  },
  formSubmit: function (e) {
    console.log(e)
  },
  formReset: function () {

  },
  listenCheckboxChange: function (e) {
    this.priceChange();
  },
  all_slecelt(e) {
    // 选择所有
    this.data.isAll = !this.data.isAll;
    if (this.data.isAll) {
      for (var key in this.data.items) {
        if (!this.data.items[key].cheked) {
          this.data.items[key].cheked = true;
        }
      }
    } else {
      for (var key in this.data.items) {
        if (this.data.items[key].cheked) {
          this.data.items[key].cheked = false;
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
    console.log(this.data.price,1)
    this.setData({
      price: price
    })
  },
  formBindsubmit(e) {
    //结算
    var _this = this;
    console.log(_this.data.thisCheckBox)
    wx.navigateTo({
      url: `../oder_page/index?class=1&arr=${_this.data.thisCheckBox}`
    })
    
  },
  list(e){
    console.log(e);
    let num = e.target.dataset.sort;
    this.data.items[num].cheked = !this.data.items[num].cheked
    this.priceChange();
  }
})