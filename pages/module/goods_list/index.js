// pages/module/goods_list/index.js
let util = require('../../../config.js');
console.log(util)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_style:false,//切换列表样式
    slect_alert:false,//购物车模态框
    cartVal:1,//购物车选择数量,
    items:[],
    animationData: {},
    alert:{
      slect_alert: false,
      cartVal: 1,
      animationData: {}
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.showLoading({
      title: '加载中',
    })
    let _this = this;
    // 列表数据
    wx.request({
      url: util.goods_list, // 
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        _this.setData({
          items:res.data
        })
        console.log(_this.data.items)
      }
    })
    
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading();
    
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
  search_btn(){
    // 搜索

  },
  shopping_style(option){
    // 点击商品样式
    this.setData({
      is_style: !this.data.is_style
    })
  },
  select_over(){
    // 关闭选择模态框
    this.setData({
      slect_alert:false
    })
  },
  cartTap(){
    // 购物车
    this.setData({
      animationData:{}
    })
    this.setData({
      slect_alert: true
    })
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.bottom(0).step()

    this.setData({
      animationData: animation.export()
    })
    animation.step()
    
  },
  cartValNum(option){ 
    //选择数量
    let val = this.data.cartVal;
    let num = option.target.dataset.static;
    if(num==0){
        val>1?val--:'';
    }else{
      val++
    }
    console.log(val)
    this.setData({
      cartVal: val,
    })
  },
  select_class(option){
    //选择种类
    let data = option.target.dataset.items;
    console.log(option)
  }
})